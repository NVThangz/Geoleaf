# GeoLeaf

GeoLeaf supports the development of GIS application software. With GeoLeaf, users can effortlessly install GIS software and access preloaded data for Vietnam, thanks to the **GeoLeaf Bundle** feature. Additionally, GeoLeaf supports both Leaflet.js and React.js libraries, ensuring flexible and efficient map integration with the **GeoLeaf Library** feature.

## Features

- **GeoLeaf Bundle - /geoleaf-bundle**: Automatic installation of GIS software like GeoServer and TileServer-GL with preloaded data for Vietnam.
- **GeoLeaf Library - /src/lib**: Support for Leaflet.js and React.js for easy integration and customization.

## Requirements

- [Node.js](https://nodejs.org/): v18.17.0 or above.
- [Docker](https://docs.docker.com/get-docker/): v24.0.5 or above.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NVThangz/GeoLeaf.git
   ```

2. Install GeoServer:

```bash
./geoleaf-bundle/geoserver/run.sh
```

run `chmod +x geoleaf-bundle/geoserver/run.sh` if comand above not work

3. Install TileServer-GL:

```bash
./geoleaf-bundle/tileserver-gl/run.sh
```

run `chmod +x geoleaf-bundle/tileserver-gl/run.sh` if comand above not work

4. run template:

```bash
npm run dev
```
