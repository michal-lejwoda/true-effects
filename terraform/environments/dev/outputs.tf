output "check_db_password" {
  value     = var.db_password
  sensitive = false
}

output "check_db_username" {
  value = var.db_username
  sensitive = false
}
