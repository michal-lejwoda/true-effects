module "resource-group" {
    source = "./modules/general/resourcegroup"
    resource_group_name = var.resource_group_name
    location = var.location
}

module "vnet" {
    source = "./modules/vnet"
    location = var.location
    resource_group_name = var.resource_group_name
    depends_on = [ module.resource-group ]
}
module "container-env" {
    source="./modules/compute/container_env"
    resource_group_name=var.resource_group_name
    location=var.location
    backend_container_name=var.backend_container_name
    frontend_container_name = var.frontend_container_name
    te_container_apps_subnet_id = module.vnet.te_container_apps_subnet_id
    depends_on = [ module.vnet ]
}