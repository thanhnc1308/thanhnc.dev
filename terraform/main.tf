terraform {
  required_version = ">= 1.9"

  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "1.25.0"
    }
  }
}

provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

data "mongodbatlas_roles_org_id" "org" {}

# ------------------------------------------------------------------------------
# MONGODB ATLAS PROJECT
# ------------------------------------------------------------------------------
resource "mongodbatlas_project" "default" {
  name   = var.project_name
  org_id = data.mongodbatlas_roles_org_id.org.org_id

  dynamic "teams" {
    for_each = var.teams
    content {
      team_id    = teams.value.team_id
      role_names = teams.value.role_names
    }
  }

  dynamic "limits" {
    for_each = var.limits
    content {
      name  = limits.value.name
      value = limits.value.value
    }
  }

  with_default_alerts_settings                     = var.with_default_alerts_settings
  is_collect_database_specifics_statistics_enabled = var.is_collect_database_specifics_statistics_enabled
  is_data_explorer_enabled                         = var.is_data_explorer_enabled
  is_extended_storage_sizes_enabled                = var.is_extended_storage_sizes_enabled
  is_performance_advisor_enabled                   = var.is_performance_advisor_enabled
  is_realtime_performance_panel_enabled            = var.is_realtime_performance_panel_enabled
  is_schema_advisor_enabled                        = var.is_schema_advisor_enabled
}

# ------------------------------------------------------------------------------
# MONGODB CLUSTER https://registry.terraform.io/providers/mongodb/mongodbatlas/latest/docs/resources/advanced_cluster
# ------------------------------------------------------------------------------
resource "mongodbatlas_advanced_cluster" "default" {
  project_id             = data.mongodbatlas_project.default.id
  name                   = var.cluster_name
  cluster_type           = var.cluster_type

  replication_specs {
    dynamic "region_configs" {
      for_each = var.region_configs
      content {
        provider_name = region_configs.value.provider_name
        backing_provider_name = region_configs.value.backing_provider_name
        priority      = region_configs.value.priority
        region_name   = region_configs.value.region_name
        electable_specs {
          instance_size = region_configs.value.electable_specs.instance_size
          node_count    = region_configs.value.electable_specs.node_count
        }
      }
    }
  }
}

# ------------------------------------------------------------------------------
# DATABASE USER
# ------------------------------------------------------------------------------
resource "mongodbatlas_database_user" "default" {
  project_id         = data.mongodbatlas_project.default.id
  username           = var.mongodbatlas_username
  password           = var.mongodbatlas_password
  auth_database_name = var.auth_database_name
  dynamic "roles" {
    for_each = var.roles
    content {
      role_name       = try(roles.value["role_name"], null)
      database_name   = try(roles.value["database_name"], null)
      collection_name = try(roles.value["collection_name"], null)
    }
  }
  dynamic "scopes" {
    for_each = var.scope
    content {
      name = scopes.value["name"]
      type = scopes.value["type"]
    }
  }
  dynamic "labels" {
    for_each = local.tags
    content {
      key   = labels.key
      value = labels.value
    }
  }
}

locals {
  private_connection_srv    = mongodbatlas_advanced_cluster.default.connection_strings[0].standard_srv
  cluster_uri               = trimprefix(local.private_connection_srv, "mongodb+srv://")
}

output "private_connection_string" {
  value = "mongodb+srv://${mongodbatlas_database_user.default.username}:${mongodbatlas_database_user.default.password}@${local.cluster_uri}/${var.auth_database_name}?${var.uri_options}"
  sensitive = true
}
