

module "resource-group" {
  source              = "../../modules/infra/general/resourcegroup"
  resource_group_name = var.resource_group_name
  location            = var.location
}

module "vnet" {
  source              = "../../modules/infra/vnet"
  location            = var.location
  te_vnet_name        = var.te_vnet_name
  te_container_apps_subnet_name = var.te_container_apps_subnet_name
  te_db_subnet_name   = var.te_db_subnet_name
  te_cache_subnet_name = var.te_cache_subnet_name
  db_link_name        = var.db_link_name
  resource_group_name = var.resource_group_name
  depends_on          = [module.resource-group]
}


module "db-and-cache" {
  source                      = "../../modules/infra/compute/db_and_cache"
  resource_group_name         = var.resource_group_name
  location                    = var.location
  te_redis_name               = var.te_redis_name
  te_postgres_name            = var.te_postgres_name
  backend_container_name      = var.backend_container_name
  frontend_container_name     = var.frontend_container_name
  te_container_apps_subnet_id = module.vnet.te_container_apps_subnet_id
  te_db_subnet_id             = module.vnet.te_db_subnet_id
  te_cache_subnet_id          = module.vnet.te_cache_subnet_id
  te_private_dns_zone_db_id   = module.vnet.te_private_dns_zone_db_id
  key_vault_id                = module.keys.key_vault_id
  depends_on                  = [module.vnet, module.resource-group, module.storage]
}

module "storage" {
  source = "../../modules/infra/storage"
  resource_group_name=var.resource_group_name
  location=var.location
  depends_on = [module.resource-group]
}

module "container-env" {
  source                       = "../../modules/infra/compute/container_env"
  resource_group_name          = var.resource_group_name
  location                     = var.location
  te_container_app_env_name     = var.te_container_app_env_name
  backend_container_name       = var.backend_container_name
  frontend_container_name      = var.frontend_container_name
  te_container_apps_subnet_id  = module.vnet.te_container_apps_subnet_id
  key_vault_id                 = module.keys.key_vault_id
  db_fqdn                      = module.db-and-cache.db_fqdn
  redis_hostname               = module.db-and-cache.redis_hostname
  redis_primary_key            = module.db-and-cache.redis_primary_key
  storage_account_name         = module.storage.storage_account_name
  BLOB_URL                     = module.storage.BLOB_URL
  depends_on                   = [module.vnet, module.db-and-cache]

}

module "keys" {
    source = "../../modules/infra/keys"
    resource_group_name=var.resource_group_name
    location=var.location
    db_password = var.db_password
    db_name = var.db_name
    db_port = var.db_port
    db_username = var.db_username
    db_admin_username = var.db_admin_username
    db_admin_password = var.db_admin_password
    secret_key = var.secret_key
    email_host_user = var.email_host_user
    email_host_password = var.email_host_password
    django_settings_module = var.django_settings_module
    url = var.url
    auth_user_model = var.auth_user_model
    depends_on          = [module.resource-group]
}


