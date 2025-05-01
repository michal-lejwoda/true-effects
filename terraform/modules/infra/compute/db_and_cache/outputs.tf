output "te_redis_name" {
  value = azurerm_redis_cache.redis.name
}

output "te_postgres_name" {
  value = azurerm_postgresql_flexible_server.db.name
}

output "db_fqdn" {
  value = azurerm_postgresql_flexible_server.db.fqdn
}