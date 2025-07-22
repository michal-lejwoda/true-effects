# data "azurerm_key_vault_secret" "db_admin_username" {
#   name         = "db-admin-username"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "db_admin_password" {
#   name         = "db-admin-password"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "db_name" {
#   name         = "db-name"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "db_port" {
#   name         = "db-port"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "secret_key" {
#   name         = "secret-key"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "email_host_user" {
#   name         = "email-host-user"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "email_host_password" {
#   name         = "email-host-password"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "django_settings_module" {
#   name         = "django-settings-module"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "url" {
#   name         = "url"
#   key_vault_id = var.key_vault_id
# }
#
# data "azurerm_key_vault_secret" "auth_user_model" {
#   name         = "auth-user-model"
#   key_vault_id = var.key_vault_id
# }


resource "azurerm_container_app_environment" "te_container_app_env" {
  name                = var.te_container_app_env_name
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
  }
  ingress {
        external_enabled = false
        target_port      = 8000
        transport        = "auto"

        traffic_weight {
          latest_revision = true
          percentage      = 100
        }
  }
}
#TODO Blob Storage + Private Endpoint + CDN
# Azure CDN /       │ Azure Front Door    │



# resource "azurerm_container_app" "frontend_nginx" {
#   name                         = var.frontend_container_name
#   container_app_environment_id = azurerm_container_app_environment.te_container_app_env.id
#   resource_group_name          = var.resource_group_name
#   revision_mode                = "Single"
#   template {
#     container {
#       name   = "frontend"
#       image  = "saxatachi/trueeffects_nginx:dev"
#       cpu    = 0.5
#       memory = "1.0Gi"
#       env {
#         name  = "BLOB_URL"
#         value = var.BLOB_URL
#       }
#
#     }
#
#   }
#   ingress {
#     external_enabled = true
#     target_port      = 80
#     transport        = "auto"
#     traffic_weight {
#       latest_revision = true
#       percentage      = 100
#     }
#   }
# }
