variable "resource_group_name" {
  type= string
  description = "This defines the name of the resource group"
}

variable "location" {
  type= string
  description = "This defines the location of the resource group and the resources"
}

variable "mime_types" {
  type = map(string)
  default = {
    html = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    json = "application/json"
    png  = "image/png"
    jpg  = "image/jpeg"
    svg  = "image/svg+xml"
    ico  = "image/x-icon"
    txt  = "text/plain"
  }
}

variable "storage_account_name" {
  type = string
}
variable "BLOB_URL" {
  type = string
}