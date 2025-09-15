import { act, useEffect, useRef, useState } from "react";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import "./argis.css"; // Archivo CSS para estilos personalizados, como el tooltip

interface EventHandler {
  remove(): void;
}

// Componente principal que maneja la capa de gráficos y el tooltip
const CustomLayerControl = ({ view, data }: { view: any, data: any }) => {

  const expandRef = useRef<Expand | null>(null);
  const graphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const layerChangeHandlerRef = useRef<EventHandler | null>(null);

  useEffect(() => {
    if (view) {
      loadLayers();
      setupLayerListExpand();
      setupLayerChangeHandler();
      setupClickAndMouseHandler();
    }
    return () => {
      cleanupResources();
    };
  }, [view, data]);

  // =================== CLEAR ITEMS ===================
  const cleanupResources = () => {
    if (expandRef.current) {
      if (view && view.ui && typeof view.ui.remove === 'function') {
        view.ui.remove(expandRef.current);
      }
      if (expandRef.current.destroy) {
        expandRef.current.destroy();
      }
      expandRef.current = null;
    }

    if (graphicsLayerRef.current) {
      if (view && view.map && typeof view.map.remove === 'function') {
        view.map.remove(graphicsLayerRef.current);
      }
      graphicsLayerRef.current = null;
    }

    if (layerChangeHandlerRef.current) {
      try {
        if (typeof layerChangeHandlerRef.current.remove === 'function') {
          layerChangeHandlerRef.current.remove();
        }
      } catch (error) {
        console.log('Error limpiando handler:', error);
      }
      layerChangeHandlerRef.current = null;
    }
  };

  // =================== ADD ITEMS ===================
  const loadLayers = () => {
    // Capa Enpresas
    if (!graphicsLayerRef.current) {
      graphicsLayerRef.current = new GraphicsLayer({ title: "Empresas" });
      view.map.add(graphicsLayerRef.current);
    } else {
      graphicsLayerRef.current.removeAll();
      view.map.reorder(graphicsLayerRef.current, view.map.layers.length - 1);
    }

    addAllMarkers(); // Todos los marcadores
  };

  // Todos los marcadores
  const addAllMarkers = () => {
    (data || []).forEach((marcador: any) => {
      if (marcador?.latitude && marcador?.longitude) {

        const point = new Point({
          longitude: parseFloat(marcador.longitude),
          latitude: parseFloat(marcador.latitude)
        });

        const symbol = new PictureMarkerSymbol({
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          width: "15px",
          height: "15px"
        });

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: symbol,
          attributes: { id: marcador.id, name: marcador.nombre_empresa }
        });

        graphicsLayerRef?.current?.add(pointGraphic);
      }
    });

    if (graphicsLayerRef.current && graphicsLayerRef.current.graphics.length > 0) {
      view.goTo(graphicsLayerRef.current.graphics.toArray()).catch(() => { });
    }
  };

  // =================== LIST/ORDER ===================
  const setupLayerListExpand = () => {
    if (expandRef.current) {
      expandRef.current.destroy();
    }
    const layerList = new LayerList({ view: view });
    expandRef.current = new Expand({
      view: view,
      content: layerList,
      expandIcon: "layers",
      group: "top-right"
    });
    view.ui.add(expandRef.current, "top-right");
  };

  const setupLayerChangeHandler = () => {
    if (layerChangeHandlerRef.current) {
      layerChangeHandlerRef.current.remove();
    }
    layerChangeHandlerRef.current = view.map.layers.on("change", function () {
      if (graphicsLayerRef.current) {
        view.map.reorder(graphicsLayerRef.current, view.map.layers.length - 1);
      }
    });
  };


  // =================== ACTIONS ===================
  let popupsEnabled: boolean = true;
  let currentGraphicId: string | null = null;
  const setupClickAndMouseHandler = () => {
    view.on("pointer-move", (event: any) => {
      if (popupsEnabled) {
        view.hitTest(event).then((response: any) => {
          const results = response.results;
          const graphic = results.find((result: any) => result.graphic && result.graphic.attributes && result.graphic.attributes.id);

          const graphicId: string | null = graphic ? graphic.graphic.attributes.id : null;

          if (graphicId !== currentGraphicId) {
            currentGraphicId = graphicId;
            if (graphic) {
              view.container.style.cursor = "pointer";

              view.openPopup({
                location: graphic.graphic.geometry,
                content: `<span style="color: black; font-size: 15px; font-weight: bold;">${graphic.graphic.attributes.name}</span>`,
                includeDefaultActions: false,
              });
            } else {
              view.container.style.cursor = "default";
              view.closePopup();
            }
          }
        });
      } else {
        view.closePopup();
      }
    });
  };


  return null;
};

export default CustomLayerControl;
