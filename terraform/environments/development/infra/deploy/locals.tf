locals {
  # Postgres
  db_fqdn                = azurerm_postgresql_flexible_server.db.fqdn
  db_port                = 5432
  db_name                = "true-effects-postgres-db-1"
  db_admin_username      = "importantuser"
  db_admin_password      = "importantpassword"
  secret_key             = "ASDASDHJASDKNHIKSANIKNAJKFGBNJKSABNFHJIE"
  email_host_user        = "walt.kowalski345@gmail.com"
  email_host_password    = "jwocebncjwftrsxp"
  django_settings_module = "backend.settings.local"
  url                    = "http://0.0.0.0:3000"
  auth_user_model        = "authorization.CustomUser"
  encoded_db_password = replace(
    replace(
      replace(
        replace(
          local.db_admin_password,
          "@", "%40"
        ),
        ":", "%3A"
      ),
      "=", "%3D"
    ),
    "/", "%2F"
  )

  db_url = "postgresql://${local.db_admin_username}:${local.encoded_db_password}@${local.db_fqdn}:${local.db_port}/${local.db_name}"

  # Redis
  redis_hostname    = azurerm_redis_cache.redis.hostname
  redis_primary_key = azurerm_redis_cache.redis.primary_access_key

  encoded_redis_key = replace(
    replace(
      replace(
        replace(
          local.redis_primary_key,
          "@", "%40"
        ),
        "=", "%3D"
      ),
      ":", "%3A"
    ),
    "/", "%2F"
  )

  redis_url = "rediss://:${local.encoded_redis_key}@${local.redis_hostname}:6380/0"
}