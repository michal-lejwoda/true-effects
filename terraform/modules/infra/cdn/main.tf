resource "azurerm_cdn_profile" "frontend-cdn-profile" {
  name                = "frontend-cdn-profile"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "Standard_Akamai"
}

resource "azurerm_cdn_endpoint" "frontend-cdn-endpoint" {
  name                = "frontend-cdn-endpoint"
  profile_name        = azurerm_cdn_profile.frontend-cdn-profile.name
  location            = var.location
  resource_group_name = var.resource_group_name
  is_https_allowed = true
  is_http_allowed = false
  origin_host_header = "tefrontendstorage.blob.core.windows.net"
  origin_path         = "/frontend"


  origin {
    name      = "storage-origin"
    host_name = "tefrontendstorage.blob.core.windows.net"
    http_port  = 80
    https_port = 443
}
}
