#!/bin/bash

# Settings
GEOSERVER_DATA_DIR=/data
GEOSERVER_CONTAINER_NAME=geoserver
GEOSERVER_PORT=8080
GEOSERVER_ADMIN_USER=admin
GEOSERVER_ADMIN_PASSWORD=geoserver

echo "Dowload docker...."
# Pull the GeoServer Docker image
docker pull kartoza/geoserver

echo "Run docker...."
# Start GeoServer container
docker run -d -p $GEOSERVER_PORT:8080 --name $GEOSERVER_CONTAINER_NAME -e GEOSERVER_ADMIN_USER=$GEOSERVER_ADMIN_USER -e GEOSERVER_ADMIN_PASSWORD=$GEOSERVER_ADMIN_PASSWORD -v $GEOSERVER_DATA_DIR:/opt/geoserver/data_dir kartoza/geoserver

# Wait for GeoServer to start up
echo "Waiting for GeoServer to start up..."
until curl --output /dev/null --silent --head --fail http://localhost:$GEOSERVER_PORT/geoserver; do
  printf '.'
  sleep 5
done
echo "GeoServer started."

read -p "Do you want to download vietnam provices data? (y/n): " choice

# Check the user's choice
if [[ $choice == "y" || $choice == "Y" ]]; then
  # Set the Dropbox shared link (replace "shared_link" with the actual shared link)
  GEO_LINK="https://www.dropbox.com/scl/fi/0p6mehdh0etvkc6ya2vbs/diaphantinh.zip?rlkey=iw2zq1m9ufj3uxzz3g9tx8w84&st=cfj5090p&dl=1"

  echo "Dowload data...."

  # Download the file using curl
  curl -sSL -o diaphantinh.zip $GEO_LINK

  sleep 3

  unzip -d . diaphantinh.zip

  # Create a directory for GeoServer data if it doesn't exist
  docker cp diaphantinh.shp geoserver:/opt/geoserver/data_dir
  docker cp diaphantinh.prj geoserver:/opt/geoserver/data_dir
  docker cp diaphantinh.dbf geoserver:/opt/geoserver/data_dir
  docker cp diaphantinh.shx geoserver:/opt/geoserver/data_dir
  docker cp diaphantinh.cpg geoserver:/opt/geoserver/data_dir

  sleep 5

  curl -u admin:geoserver -X POST http://localhost:8080/geoserver/rest/workspaces -H "accept: text/html" -H "content-type: application/json" -d "{  \"workspace\": {    \"name\": \"vietnam\"  }}"

  sleep 1

  curl -u admin:geoserver -X POST http://localhost:8080/geoserver/rest/workspaces/vietnam/datastores -H "accept: application/xml" -H "content-type: application/json" -d "{  \"dataStore\": {    \"name\": \"vietnam_store\",    \"connectionParameters\": {      \"entry\": [        {\"@key\":\"url\",\"$\":\"file:diaphantinh.shp\"}      ]    }  }}"

  sleep 1

  curl -u admin:geoserver -X POST http://localhost:8080/geoserver/rest/workspaces/vietnam/datastores/vietnam_store/featuretypes -H "accept: application/json" -H "content-type: application/json" -d "{  \"featureType\": {    \"name\": \"diaphantinh\",    \"nativeName\": \"diaphantinh\",    \"title\": \"diaphantinh\",    \"srs\": \"EPSG:4326\"  }}"

  sleep 1
elif [[ $choice == "n" || $choice == "N" ]]; then
  # If user chooses not to download
  echo "continue install geoserver"
fi

echo "GeoServer setup complete. You can access it at http://localhost:$GEOSERVER_PORT/geoserver"
