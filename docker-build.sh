# 1. Extract the name & version from package.json and validate
version=$(jq -r '.version' package.json)
image_name=$(jq -r '.name' package.json)

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

# 2. Build and tag the docker image with version and environment

docker build -t $image_name:$version .
docker tag $image_name:$version $image_name:develop

# 3. Clean uop dangling images

dangling_images=$(docker images -f "dangling=true" -q 2>/dev/null)

if [ ! -z "$dangling_images" ]; then
    docker image prune -f > /dev/null 2>&1
    echo "Dangling Docker images were successfully removed."
fi

# 4. Validate the image has been built and tagged

echo "Docker image '$image_name' has been built and tagged."
echo "Docker image is tagged as '$version' and environment 'develop'."

# use this command build/tag docker image from the command line
# ./docker-build.sh