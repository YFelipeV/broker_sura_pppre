import { useEffect } from "react";
import CreateMapView from "./CreateMapView";
import Point from '@arcgis/core/geometry/Point';
import Extent from '@arcgis/core/geometry/Extent';
interface ArgisView {
    mapRef: any,
    onMapViewCreated: any,
    data: any
}

const ArcgisMapView = ({ mapRef, onMapViewCreated, data }: ArgisView) => {

    let view: any;
    const handleZoom = () => {
        if (!data || data.length === 0) return;
        
        // Filter valid coordinates first
        const validData = data.filter((s: any) => 
            s && s.lat && s.lng && 
            !isNaN(parseFloat(s.lat)) && 
            !isNaN(parseFloat(s.lng))
        );
    
        if (validData.length === 0) return;
        
        if (validData.length === 1) {
            return {
                target: new Point({
                    longitude: parseFloat(validData[0].lng),
                    latitude: parseFloat(validData[0].lat)
                }),
                zoom: 7
            };
        }
    
        // Get all valid longitudes and latitudes
        const lngs = validData.map((s: { lat: string, lng: string }) => parseFloat(s.lng));
        const lats = validData.map((s: { lat: string, lng: string }) => parseFloat(s.lat));
    
        const xDist = Math.abs(Math.max(...lngs) - Math.min(...lngs));
        const yDist = Math.abs(Math.max(...lats) - Math.min(...lats));
        
        const zoomLevel = Math.floor(8 - Math.log2(Math.max(xDist, yDist)));
    
        return {
            target: new Extent({
                xmin: Math.min(...lngs) - 0.1,
                ymin: Math.min(...lats) - 0.1,
                xmax: Math.max(...lngs) + 0.1,
                ymax: Math.max(...lats) + 0.1,
                spatialReference: { wkid: 4326 }
            }),
            zoom: Math.max(zoomLevel, 5)
        };
    };

    const initializeMapView = async (resZoom: any) => {
        try {
            if (mapRef?.current) {
                view = CreateMapView(mapRef.current);

                // Asegura que la capa siempre sea visible
                view.when(() => {
                    const layer = view.map.layers.getItemAt(0); // Ajusta el índice según tu capa
                    if (layer) {
                        layer.minScale = 0; // Visible en todos los niveles de zoom
                        layer.maxScale = 0; // Visible en todos los niveles de zoom
                    }
                    view.goTo(resZoom)
                });

                if (onMapViewCreated) {
                    onMapViewCreated(view);
                }
            }
        } catch (error) {
            console.log("Implement Arcgis", error);
        }
    };

    useEffect(() => {
        const resZoom = handleZoom();
        initializeMapView(resZoom);
        return () => {
            if (view) {
                view.destroy();
            }
        };
    }, []);

    return (
        <div
            className="viewArcgis "
            ref={mapRef}
            style={{ width: "100%", height: "100%", zoom: "1.66666666" }}
        />
    );
};

export default ArcgisMapView;
