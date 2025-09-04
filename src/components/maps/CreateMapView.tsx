import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";

const CreateMapView = (container:any, options = {}) => {
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

  // Valores predeterminados - Vista alejada para ver Colombia y países vecinos
  const defaultOptions = {
    basemap: customBasemap, // Usar basemap estándar
    center: [-74.2973, 4.5709], // Centro de Colombia
    zoom: 3, // Zoom muy alejado para ver región sudamericana
  };

  const config = { ...defaultOptions, ...options };

  // Crear el mapa
  const map = new Map({
    basemap: config.basemap,
  });

  // Crear la vista del mapa
  return new MapView({
    map: map,
    container: container,
    center: config.center,
    zoom: config.zoom,
    ui: {
      // Ejemplos de widgets: "attribution", "zoom", "compass", "navigation-toggle"
      // Si deseas ocultar la atribución, quita "attribution" del arreglo o déjalo vacío
      components: ["zoom"]
    }
  });
};

export default CreateMapView;
