resource "azurerm_container_app" "example" {
  name                         = "example-app"
  container_app_environment_id = azurerm_container_app_environment.example.id
  resource_group_name          = azurerm_resource_group.example.name
  revision_mode                = "Single"
  location                     = azurerm_resource_group.example.location

   template {
    container {
      name   = "backend"
      # image  = "docker.io/saxatachi/trueeffects_backend:azure_dev"
      image = var.TF_VAR_acr_app_image
      cpu    = 0.5
      memory = "1.0Gi"
      env {
    name  = "DATABASE_URL"
    value = local.db_url
  }
      env {
    name  = "REDIS_URL"
    value = local.redis_url
  }
      env{
        name="SECRET_KEY"
        value = var.secret_key
      }
      env{
        name="EMAIL_HOST_USER"
        value = var.email_host_user
      }
      env{
        name="EMAIL_HOST_PASSWORD"
        value = var.email_host_password
      }
      #TODO BACK HERE
      env{
        name="URL"
        value = var.url
      }
      env{
        name="DJANGO_SETTINGS_MODULE"
        value = var.django_settings_module
      }
      env{
        name="AUTH_USER_MODEL"
        value = var.auth_user_model
      }
    }

    container {
      name   = "proxy"
      image  = var.TF_VAR_acr_proxy_image
      cpu    = 0.25
      memory = "0.5Gi"


      env {
        name  = "PROXY_SETTING"
        value = "some_value"
      }
    }

    scale {
      min_replicas = 1
      max_replicas = 3
    }
  }

  ingress {
    external_enabled = true
    target_port      = 8000  # port na którym proxy/app nasłuchuje
    transport        = "auto"
  }
}

    # scale {
    #   min_replicas = 0
    #   max_replicas = 1
    # }
  }

  ingress {
    external_enabled = true
    target_port      = 8000
    transport        = "auto"
  }
}

resource "azurerm_container_app_environment" "example" {
  name                       = "Example-Environment"
  location                   = azurerm_resource_group.example.location
  resource_group_name        = azurerm_resource_group.example.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.example.id
}

resource "azurerm_log_analytics_workspace" "example" {
  name                = "acctest-01"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}