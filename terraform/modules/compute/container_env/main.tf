resource "azurerm_container_app_environment" "te_container_app_env" {
  name                = "te-container-app-env"
  location            = var.location
  resource_group_name = var.resource_group_name
  internal_load_balancer_enabled = false
  infrastructure_subnet_id = var.te_container_apps_subnet_id

}
resource "azurerm_container_app" "backend" {
  name                         = var.backend_container_name
  container_app_environment_id = azurerm_container_app_environment.te_container_app_env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  template {
    container {
      name   = "backend"
      image  = "docker.io/saxatachi/trueeffects_backend:dev"
      cpu    = 0.5
      memory = "1.0Gi"

      env {
        name  = "ENV"
        value = "dev"
      }

      # env {
      #   name  = "DATABASE_URL"
      #   value = "postgres://user:password@my-db-host:5432/dbname"
      # }
    }


  }
}

resource "azurerm_container_app" "frontend" {
  name                         = var.frontend_container_name
  container_app_environment_id = azurerm_container_app_environment.te_container_app_env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  template {
    container {
      name   = "frontend"
      image  = "docker.io/saxatachi/trueeffects_frontend:dev"
      cpu    = 0.5
      memory = "1.0Gi"

      env {
        name  = "ENV"
        value = "dev"
      }
    }

    # ingress {
    #   external_enabled = true
    #   target_port      = 3000
    # }
  }
}