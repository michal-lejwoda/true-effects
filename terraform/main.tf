# module "resource-group" {
#     source = "modules/infra/general/resourcegroup"
#     resource_group_name = var.resource_group_name
#     location = var.location
# }
#
# module "vnet" {
#     source = "modules/infra/vnet"
#     location = var.location
#     resource_group_name = var.resource_group_name
#     depends_on = [ module.resource-group ]
# }
#
#
# module "db-and-cache" {
#     source="modules/infra/compute/db_and_cache"
#     resource_group_name=var.resource_group_name
#     location=var.location
#     backend_container_name=var.backend_container_name
#     frontend_container_name = var.frontend_container_name
#     te_container_apps_subnet_id = module.vnet.te_container_apps_subnet_id
#     te_db_subnet_id = module.vnet.te_db_subnet_id
#     te_cache_subnet_id = module.vnet.te_cache_subnet_id
#     te_private_dns_zone_db_id = module.vnet.te_private_dns_zone_db_id
#     depends_on = [ module.vnet ]
# }
#
# module "container-env" {
#     source="modules/infra/compute/container_env"
#     resource_group_name=var.resource_group_name
#     location=var.location
#     backend_container_name=var.backend_container_name
#     frontend_container_name = var.frontend_container_name
#     te_container_apps_subnet_id = module.vnet.te_container_apps_subnet_id
#     db_fqdn = module.db-and-cache.db_fqdn
#     depends_on = [ module.vnet ]
# }