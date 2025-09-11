
import { useRef } from 'react'
import ArcgisImplement from '../../maps/ArcgisImplement';
import { getMarcadores } from '../../../utils/filtros';

export default function Map({filters}) {
    const empresas= getMarcadores(filters)


    const mapRef = useRef(null);


    return (
        <div className='container-blur text-white rounded-md border relative'>
            <div className="relative h-88 bg-gray-200 rounded overflow-hidden">
                <div className="w-full h-full">
                    <ArcgisImplement 
                        mapRef={mapRef} 
                        data={empresas}

                    />
                </div>

            </div>
        </div>
    )
}
