module "resource-group" {
    source = "./modules/general/resourcegroup"
    resource_group_name = var.resource_group_name
    location = var.location
}

module "vnet" {
    source = "./modules/vnet"
    location = var.location
    resource_group_name = var.resource_group_name
}
