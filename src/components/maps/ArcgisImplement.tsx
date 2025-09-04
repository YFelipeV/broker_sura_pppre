import { useState } from 'react';
import ArcgisMapView from './ArcgisMapView';
import CustomLayerControl from './CustomLayerControl';
import './argis.css'
import '@arcgis/core/assets/esri/themes/light/main.css'; // Import the CSS


const ArcgisImplement = ({ mapRef, data }: { mapRef: any, data: any }) => {
    const [mapView, setMapView] = useState(null);

    const handleMapViewCreated = (view: any) => {
        setMapView(view);
    }

    return (
        <>
            <ArcgisMapView mapRef={mapRef} onMapViewCreated={handleMapViewCreated} data={data} />
            {mapView && <CustomLayerControl view={mapView} data={data} />}
        </>
    );
};

export default ArcgisImplement;