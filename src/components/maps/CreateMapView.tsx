import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";

const CreateMapView = (container: any) => {

  // Capa de imagen satelital
  const satelliteLayer = new TileLayer({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
  });

  // Capa de referencias, aquí es donde se suelen mostrar los nombres de los barrios
  const referenceLayer = new TileLayer({
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer",
    visible: true  // Desactivamos la visibilidad para ocultar las etiquetas
  });

  const customBasemap = new Basemap({
    baseLayers: [satelliteLayer, referenceLayer]
  });

  const map = new Map({
    basemap: customBasemap
  });

  return new MapView({
    map: map,
    container: container,
    center: [-74.2973, 4.5709],
    zoom: 5
  });
};

export default CreateMapView;
