variable "prefix" {
  description = "Prefix for resources in aws"
  default     = "te"
}
variable "project" {
  description = "Project name for tagging resources"
  default     = "true-effects"
}

variable "ARM_SUBSCRIPTION_ID" {
        type = string
}
variable "ARM_CLIENT_ID" {
        type = string
}
variable "ARM_CLIENT_SECRET" {
        type = string
}
variable "ARM_TENANT_ID" {
        type = string
}