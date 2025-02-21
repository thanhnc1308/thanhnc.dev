# ------------------------------------------------------------------------------
# MONGODB PROJECT
# ------------------------------------------------------------------------------
variable "mongodbatlas_public_key" {
  type = string
}

variable "mongodbatlas_private_key" {
  type = string
}

variable "teams" {
  description = <<HEREDOC
   The list of teams that belong to the project.
   The roles can be:
   Organization:
       ORG_OWNER
       ORG_MEMBER
       ORG_GROUP_CREATOR
       ORG_BILLING_ADMIN
       ORG_READ_ONLY
   Project:
       GROUP_CLUSTER_MANAGER
       GROUP_DATA_ACCESS_ADMIN
       GROUP_DATA_ACCESS_READ_ONLY
       GROUP_DATA_ACCESS_READ_WRITE
       GROUP_OWNER
       GROUP_READ_ONLY
   HEREDOC
  type = list(object({
    team_id    = string
    role_names = list(string)
  }))
  default = []
}

variable "is_collect_database_specifics_statistics_enabled" {
  description = <<HEREDOC
   If true, Atlas collects and stores database-specific statistics for the specified project.
   HEREDOC
  type        = bool
  default     = false
}

variable "is_data_explorer_enabled" {
  description = <<HEREDOC
   If true, Atlas enables Data Explorer for the specified project.
   HEREDOC
  type        = bool
  default     = true
}

variable "is_extended_storage_sizes_enabled" {
  description = <<HEREDOC
   If true, Atlas enables extended storage sizes for the specified project.
   HEREDOC
  type        = bool
  default     = false
}

variable "is_performance_advisor_enabled" {
  description = <<HEREDOC
   If true, Atlas enables Performance Advisor for the specified project.
   HEREDOC
  type        = bool
  default     = false
}


variable "is_realtime_performance_panel_enabled" {
  description = <<HEREDOC
   If true, Atlas enables the Real Time Performance Panel for the specified project.
   HEREDOC
  type        = bool
  default     = false
}


variable "is_schema_advisor_enabled" {
  description = <<HEREDOC
   If true, Atlas enables Schema Advisor for the specified project.
   HEREDOC
  type        = bool
  default     = true
}


variable "with_default_alerts_settings" {
  description = <<HEREDOC
   If true, Atlas enables default alerts settings for the specified project.
   HEREDOC
  type        = bool
  default     = false
}


variable "limits" {
  description = <<HEREDOC
   Allows one to configure a variety of limits to a Project. The limits attribute is optional.
   https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Projects/operation/setProjectLimit
   HEREDOC
  type = list(object({
    name  = string
    value = string
  }))


  default = []
}


variable "project_name" {
  description = "The name of the Atlas project"
  type        = string
}

# ------------------------------------------------------------------------------
# MONGODB CLUSTER
# ------------------------------------------------------------------------------

variable "cluster_name" {
  description = "The name of the Atlas cluster"
  type        = string
}

variable "cluster_type" {
  description = <<HEREDOC
Optional - Specifies the type of the cluster that you want to modify. You cannot convert
a sharded cluster deployment to a replica set deployment. Accepted values include:
REPLICASET for Replica set, SHARDED for Sharded cluster, and GEOSHARDED for Global Cluster
HEREDOC
  default     = "REPLICASET"
}

variable "region_configs" {
  description = <<HEREDOC
Required - Physical location of the region. Each regionsConfig document describes
the region’s priority in elections and the number and type of MongoDB nodes Atlas
deploys to the region. You can be set that parameters:
- region_name - Optional - Physical location of your MongoDB cluster. The region you choose can affect network latency for clients accessing your databases.
- electable_nodes - Optional - Number of electable nodes for Atlas to deploy to the region. Electable nodes can become the primary and can facilitate local reads. The total number of electableNodes across all replication spec regions must total 3, 5, or 7. Specify 0 if you do not want any electable nodes in the region. You cannot create electable nodes in a region if priority is 0.
- priority - Optional - Election priority of the region. For regions with only read-only nodes, set this value to 0. For regions where electable_nodes is at least 1, each region must have a priority of exactly one (1) less than the previous region. The first region
must have a priority of 7. The lowest possible priority is 1. The priority 7 region identifies the Preferred Region of the cluster. Atlas places the primary node in the Preferred Region. Priorities 1 through 7 are exclusive - no more than one region per cluster can be assigned a given priority. Example: If you have three regions, their priorities would be 7, 6, and 5 respectively. If you added two more regions for supporting electable nodes, the priorities of those regions would be 4 and 3 respectively.
- read_only_nodes - Optional - Number of read-only nodes for Atlas to deploy to the region.
Read-only nodes can never become the primary, but can facilitate local-reads. Specify 0 if you do not want any read-only nodes in the region.
- analytics_nodes - Optional - The number of analytics nodes for Atlas to deploy to the region.
Analytics nodes are useful for handling analytic data such as reporting queries from BI Connector for Atlas. Analytics nodes are read-only, and can never become the primary. If you do not specify this option, no analytics nodes are deployed to the region.
HEREDOC
  type        = any
}

# ------------------------------------------------------------------------------
# DATABASE USER
# ------------------------------------------------------------------------------
variable "mongodbatlas_username" {
  description = "The username of the database user"
  type        = string
}

variable "mongodbatlas_password" {
  description = "The password of the database user"
  type        = string
}

variable "auth_database_name" {
  description = "The name of the database in which the user is created"
  type        = string
  default     = "admin"
}

variable "roles" {
  description = <<HEREDOC
    Required - One or more user roles blocks.
    HEREDOC
  type        = list(map(string))
}

variable "scope" {
  description = "The scopes to assign to the user"
  type = list(object({
    name = string
    type = string
  }))
  default = []
}

variable "labels" {
  type        = map(any)
  default     = null
  description = "A JSON containing additional labels"
}

variable "uri_options" {
  type        = string
  default     = "retryWrites=true&w=majority&readPreference=secondaryPreferred"
  description = "A string containing additional URI configs"
}

variable "application" {
  description = <<HEREDOC
    Optional - Key-value pairs that tag and categorize the cluster for billing and organizational purposes.
    HEREDOC
  type        = string
}

variable "environment" {
  description = <<HEREDOC
    Optional - Key-value pairs that tag and categorize the cluster for billing and organizational purposes.
    HEREDOC
  type        = string
}
