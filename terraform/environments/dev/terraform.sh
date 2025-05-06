#!/bin/bash
set -a
source .azure_dev_env
set +a

terraform "$@"