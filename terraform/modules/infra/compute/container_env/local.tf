locals {
  encoded_db_password = replace(
    replace(
      replace(
        replace(
          var.db_admin_password,
          "@", "%40"
        ),
        ":", "%3A"
      ),
      "=", "%3D"
    ),
    "/", "%2F"
  )
  db_url = "postgres://${var.db_admin_username}:${local.encoded_db_password}@${var.db_fqdn}:${var.db_port}/${var.db_name}"

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