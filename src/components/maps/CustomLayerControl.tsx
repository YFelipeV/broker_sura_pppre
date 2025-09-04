import { useEffect, useRef, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import "./argis.css"; // Archivo CSS para estilos personalizados, como el tooltip
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";

// Componente principal que maneja la capa de gráficos y el tooltip
const CustomLayerControl = ({ view, data }: { view: any, data: any }) => {
  const [tooltip, setTooltip] = useState({
    visible: false, // Estado para mostrar/ocultar el tooltip
    x: 0, // Posición X del tooltip
    y: 0, // Posición Y del tooltip
    content: "" // Contenido dinámico del tooltip
  });

  const graphicsLayerRef = useRef(new GraphicsLayer()); // Capa de gráficos para el mapa

  useEffect(() => {
    if (view) {
      view.popup.autoOpenEnabled = false; // Deshabilita el popup nativo del mapa
      if (!view.map.layers.includes(graphicsLayerRef.current)) {
        view.map.add(graphicsLayerRef.current); // Agrega la capa de gráficos al mapa
      }
      const layerIndex = view.map.layers.length - 1;
      view.map.reorder(graphicsLayerRef.current, layerIndex); // Asegura que la capa esté encima

      // Agrega los gráficos al mapa
      addGraphicsToMap();

      // Configura eventos del mapa
      //view.on("pointer-move", handlePointerMove); // Muestra tooltip al mover el mouse
      view.on("click", handleClickOnMap); // Maneja clics sobre los gráficos
    }

    // Limpia la capa al desmontar el componente
    return () => {
      graphicsLayerRef.current?.removeAll();
    };
  }, [view, data]);

  // Función para agregar gráficos al mapa basados en los datos
  const addGraphicsToMap = () => {
    graphicsLayerRef.current.removeAll(); // Limpia gráficos existentes

    data && Array.isArray(data) && data.forEach((item) => {
      if (item && item.latitude && item.longitude && item.type === "empresa") {
        const { latitude, longitude, name, region, employees, id } = item;

        // Crear un punto simple para la empresa
        const point = new Point({
          longitude: Number(longitude),
          latitude: Number(latitude)
        });

        // Usar PictureMarkerSymbol con el marcador rojo de Google
        const symbol = new PictureMarkerSymbol({
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          width: "14px",
          height: "14px"
        });

        const graphic = new Graphic({
          geometry: point,
          symbol,
          attributes: { latitude, longitude, name, region, employees, id }
        });

        graphicsLayerRef.current.add(graphic);
      }
    });

   // console.log("Total de marcadores agregados:", graphicsLayerRef.current.graphics.length);
  };

  // Maneja el movimiento del mouse para mostrar el tooltip
  const handlePointerMove = (event: any) => {
    view.hitTest(event).then((response: any) => {
      const { x, y } = event; // Obtiene la posición del mouse
      const results = response.results; // Resultados del hitTest
      if (results?.length) {
        const graphicResult = results.find((r: any) => r.graphic);
        if (graphicResult?.graphic?.attributes?.name) {
          const attrs = graphicResult.graphic.attributes;
          // Actualiza el estado del tooltip si el mouse está sobre un gráfico
          setTooltip({
            visible: true,
            x: x,
            y: y,
            content: `
              <div style="font-family: Arial, sans-serif;">
                <div style="font-size: 14px; font-weight: bold;  margin-bottom: 5px;">
                   ${attrs.name}
                </div>
                <div style="font-size: 11px; color: #ccc; margin-top: 5px;">
                  Coordenadas: ${attrs.longitude.toFixed(4)}, ${attrs.latitude.toFixed(4)}
                </div>
              </div>
            `
          });
          return;
        }
      }

      // Oculta el tooltip si no hay gráficos debajo del mouse
      setTooltip((prev) => ({ ...prev, visible: false }));
    });
  };

  // Maneja el clic en un gráfico para mostrar información
  const handleClickOnMap = (event: any) => {
    view.hitTest(event).then((response: any) => {
      const results = response.results;
      if (results?.length) {
        const graphicResult = results.find((r: any) => r.graphic);
        if (graphicResult?.graphic?.attributes?.id) {
          // Puedes agregar aquí lógica adicional para el clic en una empresa
          const { id, name, region } = graphicResult.graphic.attributes;
          // console.log("Empresa seleccionada:", name, "en región:", region);
        }
      }
    });
  };



  return (
    <>
      {/* Renderiza el tooltip si está visible */}
      {tooltip.visible && (
        <div
          className="customTooltip"
          style={{ left: tooltip.x + 10, top: tooltip.y - 60, width: "400px" }}

          dangerouslySetInnerHTML={{ __html: tooltip.content }} // Contenido HTML del tooltip
        />
      )}
    </>
  );
};

export default CustomLayerControl;
