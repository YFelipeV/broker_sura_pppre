import { useState } from 'react';
import ArcgisMapView from './ArcgisMapView';
import CustomLayerControl from './CustomLayerControl';
import './argis.css'
import '@arcgis/core/assets/esri/themes/light/main.css'; // Import the CSS


const ArcgisImplement = ({ mapRef, data }: { mapRef: any, data: any }) => {

    const [mapView, setMapView] = useState(null);

    const handleMapViewCreated = (view: any) => {
        setMapView(view);
        if (mapRef) {
            mapRef.current = {
                view: view,
                toMap: (screenPoint: any) => view.toMap(screenPoint)
            };
        }
    }

    return (
        <>
            <ArcgisMapView mapRef={mapRef} onMapViewCreated={handleMapViewCreated} />
            {mapView && <CustomLayerControl view={mapView} data={data} />}
        </>
    );
};

export default ArcgisImplement;