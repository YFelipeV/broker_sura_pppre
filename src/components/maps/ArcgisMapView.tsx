import { useEffect } from "react";
import CreateMapView from "./CreateMapView";
interface ArgisView {
    mapRef: any,
    onMapViewCreated: any
}

const ArcgisMapView = ({ mapRef, onMapViewCreated }: ArgisView) => {

    useEffect(() => {
        initializeMapView();
    }, []);

    const initializeMapView = async () => {
        try {
            if (mapRef?.current) {
                const view = CreateMapView(mapRef.current);
                view.when(() => {
                    if (onMapViewCreated) {
                        onMapViewCreated(view);
                    }
                });
                return () => view && view.destroy();
            }
        } catch (error) {
            console.log("Implement Arcgis", error)
        }
    };

    return (
        <div
            className="viewArcgis"
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default ArcgisMapView;
