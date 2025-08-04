variable "tf_state_container_blob" {
  description = "Name of blob storage"
  default     = "trueeffectscontainertfstate"
}

variable "tf_state_account_blob" {
  description = "Name of account storage"
  default     = "trueeffectstfstate"
}

variable "tf_state_lock_table" {
  description = "Name of the CosmosDB table for TF state locking"
  default     = "trueffectslock"
}

variable "project" {
  description = "Project name for tagging resources"
  default     = "true-effects"
}