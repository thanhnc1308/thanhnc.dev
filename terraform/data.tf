data "mongodbatlas_project" "default" {
  name = var.project_name
}


data "mongodbatlas_advanced_cluster" "default" {
  project_id = data.mongodbatlas_project.default.id
  name       = var.cluster_name
}
