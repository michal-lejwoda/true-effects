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

module "container-env" {
  source                       = "../../modules/infra/compute/container_env"
  resource_group_name          = var.resource_group_name
  location                     = var.location
  te_container_app_env_name     = var.te_container_app_env_name
  backend_container_name       = var.backend_container_name
  frontend_container_name      = var.frontend_container_name
  te_container_apps_subnet_id  = module.vnet.te_container_apps_subnet_id
  depends_on                   = [module.vnet]
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
  depends_on                  = [module.vnet]
}
