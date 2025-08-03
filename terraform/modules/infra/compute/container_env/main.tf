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
locals {
  frontend_fqdn = replace(replace(var.frontend_static_website_url, "^https?://", ""), "/$", "")
}


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
      image  = "docker.io/saxatachi/trueeffects_backend:azure_dev"
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
        external_enabled = true
        target_port      = 80
        transport        = "auto"

        traffic_weight {
          latest_revision = true
          percentage      = 100
        }
  }
}
#TODO Blob Storage + Private Endpoint + CDN
# Azure CDN /       │ Azure Front Door    │
resource "azurerm_public_ip" "appgw_public_ip" {
  name                = "appgw-public-ip"
  location            = var.location
  resource_group_name = var.resource_group_name
  allocation_method   = "Static"
  sku                 = "Standard"

  domain_name_label = var.public_ip_dns_name
}


resource "azurerm_application_gateway" "appgw" {
  name                = "appgw-myapp"
  location            = var.location
  resource_group_name = var.resource_group_name

  sku {
    name     = "WAF_v2"
    tier     = "WAF_v2"
    capacity = 1
  }

  gateway_ip_configuration {
    name      = "appgw-ip-config"
    subnet_id = var.te_container_apps_subnet_id
  }

  frontend_port {
    name = "frontendPort"
    port = 80
  }

  frontend_ip_configuration {
    name                 = "frontendIP"
    public_ip_address_id = azurerm_public_ip.appgw_public_ip.id
  }

  backend_address_pool {
  name = "backendPool"

  fqdns = [azurerm_container_app.backend.latest_revision_fqdn]
}

  backend_http_settings {
  name                  = "backendHttpSettings"
  cookie_based_affinity = "Disabled"
  port                  = 80
  protocol              = "Http"

  # probe {
  #   name                = "backendHealthProbe"
  #   host                = azurerm_container_app.backend.latest_revision_fqdn
  #   path                = "/health"
  #   interval            = 30
  #   timeout             = 30
  #   unhealthy_threshold = 3
  #   protocol            = "Http"
  # }
}

backend_address_pool {
  name  = "frontendPool"
  fqdns = [local.frontend_fqdn]
}

  backend_http_settings {
    name                  = "frontendHttpSettings"
    cookie_based_affinity = "Disabled"
    port                  = 80
    protocol              = "Http"
  }

  # probe {
  #   name                = "backendHealthProbe"
  #   host                = azurerm_container_app.backend.latest_revision_fqdn
  #   path                = "/health"
  #   interval            = 30
  #   timeout             = 30
  #   unhealthy_threshold = 3
  #   protocol            = "Http"
  # }

  http_listener {
    name                           = "httpListener"
    frontend_ip_configuration_name = "frontendIP"
    frontend_port_name             = "frontendPort"
    protocol                       = "Http"
  }

  url_path_map {
    name               = "urlPathMap"
    default_backend_address_pool_name  = "frontendPool"
    default_backend_http_settings_name = "frontendHttpSettings"

    path_rule {
      name                       = "apiRule"
      paths                      = ["/api/*"]
      backend_address_pool_name  = "backendPool"
      backend_http_settings_name = "backendHttpSettings"
    }
  }

  request_routing_rule {
    name               = "apiRoutingRule"
    rule_type          = "PathBasedRouting"
    http_listener_name = "httpListener"
    url_path_map_name  = "urlPathMap"
  }
}

output "application_gateway_url" {
  value = "http://${azurerm_public_ip.appgw_public_ip.fqdn}"
  description = "URL do Twojego Application Gateway"
}





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
