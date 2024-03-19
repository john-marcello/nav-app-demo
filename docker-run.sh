#!/bin/bash

# 1. Extract the name & version from package.json and validate

version=$(jq -r '.version' package.json)
image_name=$(jq -r '.name' package.json)
container_name=$(jq -r '.name' package.json)-develop

if [ -z "$version" ]; then
  echo "Extraction failed. Check version in package.json is correctly formatted."
  exit 1
else
    echo "Extracted version as '$version'"
fi

if [ -z "$image_name" ]; then
  echo "Extraction failed. Check name in package.json is correctly formatted."
  exit 1
else
    echo "Extracted image name as '$image_name'"
fi

if [ -z "$container_name" ]; then
  echo "Extraction failed. Check name in package.json is correctly formatted."
  exit 1
else
    echo "Extracted container name as '$container_name'"
fi

# 2. Check if container exists, recreate and run or create and run

current_dir=$(pwd) # Get the current directory to use as the bind mount source

if docker inspect "$container_name" &>/dev/null; then 
  docker stop "$container_name" 2>/dev/null || true
  docker rm "$container_name"
  echo "The container has been stopped & removed."
  docker run -d -p 3000:3000 -v "$current_dir:/app" --name "$container_name" "$image_name:$version"
  echo "The existing Docker container '$container_name' has been recreated."
else
  docker run -d -p 3000:3000 -v "$current_dir:/app" --name "$container_name" "$image_name:$version"
  echo "A new Docker container '$container_name' has been created."
fi

# 3. Provide the user with a link to access the app

dangling_images=$(docker images -f "dangling=true" -q 2>/dev/null)

if [ ! -z "$dangling_images" ]; then
    docker image prune -f > /dev/null 2>&1
    echo "Dangling Docker images were successfully removed."
fi

# 4. Validate the container is running and identify the image used

container_info=$(docker inspect $container_name)
is_running=$(echo "$container_info" | jq -r '.[0].State.Running')
image_used=$(echo "$container_info" | jq -r '.[0].Config.Image')

if [ "$is_running" == "true" ]; then
  echo "Docker container '$container_name' is successfully running."
  echo "Docker image being used is '$image_used'."
else
  echo "Docker container '$container_name' is not running."
fi

printf "You can access the app at \e]8;;http://localhost:3000\ahttp://localhost:3000\e]8;;\a\n"
