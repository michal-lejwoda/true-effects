resource "azurerm_log_analytics_workspace" "logs" {
  name                = "true-effects-logs"
  location            = "West Europe"
  resource_group_name = "true-effects-rgp"
  sku                 = "PerGB2018"
  retention_in_days   = 1
}
resource "azurerm_container_app_environment" "true_effect_environment" {
  name                       = "true-effects-environment"
  location                   = "West Europe"
  resource_group_name        = "true-effects-rgp"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.logs.id
  infrastructure_subnet_id = azurerm_subnet.private_a.id
}

resource "azurerm_container_app" "example" {
  name                         = "example-app"
  container_app_environment_id = azurerm_container_app_environment.true_effect_environment.id
  resource_group_name          = "true-effects-rgp"
  revision_mode                = "Single"
  location                     = "Eu"

   template {
    container {
      name   = "backend"
      # image  = "docker.io/saxatachi/trueeffects_backend:azure_dev"
      image = var.TF_VAR_acr_app_image
      cpu    = 0.5
      memory = "1.0Gi"
      env {
    name  = "DATABASE_URL"
    value = var.db_url
  }
      env {
    name  = "REDIS_URL"
    value = var.redis_url
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

  }

  ingress {
    external_enabled = true
    target_port      = 8000
    transport        = "auto"
  }
}



