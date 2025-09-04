
import { useRef } from 'react'
import ArcgisImplement from '../../maps/ArcgisImplement';

export default function Map() {
    // Datos solo de empresas en Colombia
    const dataMaps = [
        {
            id: 1,
            name: "Empresa Petroquímica Cartagena",
            latitude: 10.3997,
            longitude: -75.5144,
            type: "empresa",
            region: "caribe",
            employees: 450
        },
        {
            id: 2,
            name: "Complejo Industrial Medellín",
            latitude: 6.2442,
            longitude: -75.5812,
            type: "empresa",
            region: "antioquia",
            employees: 320
        },
        {
            id: 3,
            name: "Planta Química Bogotá",
            latitude: 4.7110,
            longitude: -74.0721,
            type: "empresa",
            region: "cundinamarca",
            employees: 280
        },
        {
            id: 4,
            name: "Refinería Barrancabermeja",
            latitude: 7.0653,
            longitude: -73.8547,
            type: "empresa",
            region: "santander",
            employees: 520
        },
        {
            id: 5,
            name: "Planta Industrial Cali",
            latitude: 3.4516,
            longitude: -76.5320,
            type: "empresa",
            region: "valle",
            employees: 150
        },
        {
            id: 6,
            name: "Complejo Petroquímico Bucaramanga",
            latitude: 7.1253,
            longitude: -73.1198,
            type: "empresa",
            region: "santander",
            employees: 380
        }
    ];

    const mapRef = useRef(null);


    return (
        <div className='container-blur text-white rounded-md border relative'>
            <div className="relative h-88 bg-gray-200 rounded overflow-hidden">
                <div className="w-full h-full">
                    <ArcgisImplement 
                        mapRef={mapRef} 
                        data={dataMaps}
                    />
                </div>

            </div>
        </div>
    )
}
