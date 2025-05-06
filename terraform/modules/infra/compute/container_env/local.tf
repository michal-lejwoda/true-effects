locals {
  encoded_db_password = replace(
    replace(
      replace(
        replace(
          data.azurerm_key_vault_secret.db_admin_password.value,
          "@", "%40"
        ),
        ":", "%3A"
      ),
      "=", "%3D"
    ),
    "/", "%2F"
  )
  db_url = "postgres://${data.azurerm_key_vault_secret.db_admin_username.value}:${local.encoded_db_password}@${var.db_fqdn}:${data.azurerm_key_vault_secret.db_port.value}/${data.azurerm_key_vault_secret.db_name.value}"

  encoded_redis_key = replace(
    replace(
      replace(
        replace(
          var.redis_primary_key,
          "@", "%40"
        ),
        "=", "%3D"
      ),
      ":", "%3A"
    ),
    "/", "%2F"
  )

  redis_url = "rediss://:${local.encoded_redis_key}@${var.redis_hostname}:6380/0"
}