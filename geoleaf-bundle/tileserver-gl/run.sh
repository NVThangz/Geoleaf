#!/bin/bash

read -p "Do you want to download vietnam map data? (y/n): " choice

# Check the user's choice
if [[ $choice == "y" || $choice == "Y" ]]; then

  # Set the Dropbox shared link (replace "shared_link" with the actual shared link)
  GEO_LINK="https://www.dropbox.com/scl/fi/zi4zce527s0b1byu5iu6c/osm-2020-02-10-v3.11_asia_vietnam.mbtiles?rlkey=q3gkklgar1n2fkdm9vlx0s6m4&st=b7o4xfxb&dl=0"

  # Modify the shared link to obtain the direct download link
  DOWNLOAD_LINK="${GEO_LINK/\?dl=0/?dl=1}"

  # Download the file using curl
  curl -LOJ "$DOWNLOAD_LINK"

elif [[ $choice == "n" || $choice == "N" ]]; then
  # If user chooses not to download
  echo "continue install tileserver-gl"
fi

docker pull klokantech/tileserver-gl

docker run -it -v $(pwd):/data -p 8081:80 klokantech/tileserver-gl

echo "TileServer GL setup complete. You can access it at http://localhost:8081"
