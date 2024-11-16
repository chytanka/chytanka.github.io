#!/bin/bash

# Default directory if not provided
DEFAULT_DIR="@site-modules"

# Check if the module name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <module-name> [dir]"
  exit 1
fi

MODULE_NAME=$1
DIR=${2:-$DEFAULT_DIR} # Use second argument or default to @site-modules

echo "Creating module $MODULE_NAME in directory $DIR..."

# Generate the module with routing
ng g m "$DIR/$MODULE_NAME" --routing

# Generate the shell component
ng g c "$DIR/$MODULE_NAME/$MODULE_NAME-shell" --no-standalone

# Generate the service for data-access
ng g s "$DIR/$MODULE_NAME/data-access/$MODULE_NAME"

echo "Module $MODULE_NAME successfully created in $DIR."