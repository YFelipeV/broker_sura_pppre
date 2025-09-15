import { useState, useEffect } from 'react';
import Implementacion from '../components/Broker/implementacion/Implementacion';
import Map from '../components/Broker/mapa/Map';
import Regionales from '../components/Broker/regionales/Regionales';
import StatCard from '../components/Broker/StatCard/StatCard';
import Filtros from '../components/Broker/filtros/Filtros';
import AmenazasTreeMap from '../components/Broker/amenazas/AmenazasTreeMap';
import MapaCalor from '../components/Broker/mapaCalor/MapaCalor';
import ICRIVChart from '../components/Broker/icrChart/IcrIvChart';
import TrazabilidadTable from '../components/Broker/trazabilidad/Trazabilidad';
import { getEstadisticas, getDatosRegionales } from '../utils/filtros';


export default function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState('2025');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        region: '',
        sector: '',
        amenaza: '',
        empresa:'',
        year:''
    });
    const [metrics, setMetrics] = useState({
        totalEmpresas: 0,
        empresasRegistradas: 0,
        porcentajeRegistros: 0,
        conPPPRE: 0,
        promedioImplementacion: 0
    });

    // Actualizar métricas cuando cambien los filtros
    useEffect(() => {
        const estadisticas = getEstadisticas(filters);
        setMetrics(estadisticas);
    }, [filters]);

    // Datos para el gráfico regional
    const datosRegionales = getDatosRegionales(filters);


   


    return (
        <div className="min-h-screen bg-gray-50 py-6">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="md:flex md:items-center md:justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold leading-tight text-gray-900">
                            Dashboard SURA PPPRE
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Seguimiento y analisis de la implementación de sura PPPRE
                        </p>
                    </div>


                    <div className="mt-4 md:mt-0 md:ml-4 flex space-x-3 relative">
                        {/* Botón de Filtros */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <i className="ri-filter-line mr-2"></i>
                            Filtros
                        </button>

                        {/* Popover de Filtros */}
                        {showFilters && (
                            <Filtros
                                filters={filters}
                                setFilters={setFilters}
                                selectedPeriod={selectedPeriod}
                                setSelectedPeriod={setSelectedPeriod}
                                setShowFilters={setShowFilters}
                            />
                        )}
                    </div>
                </div>
                
                {/* Filtros Activos - Tags */}
                {(filters.region || filters.sector || filters.amenaza || filters.empresa) && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600 mr-2 self-center">Filtros activos:</span>
                            
                            {filters.region && filters.region !== 'all' && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <span className="mr-1">Región:</span>
                                    <span className="font-semibold">{filters.region}</span>
                                    <button
                                        onClick={() => setFilters({...filters, region: ''})}
                                        className="ml-1 hover:text-blue-600"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            )}
                            
                            {filters.sector && filters.sector !== 'all' && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <span className="mr-1">Sector:</span>
                                    <span className="font-semibold">{filters.sector}</span>
                                    <button
                                        onClick={() => setFilters({...filters, sector: ''})}
                                        className="ml-1 hover:text-green-600"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            )}
                            
                            {filters.amenaza && filters.amenaza !== 'all' && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                    <span className="mr-1">Amenaza:</span>
                                    <span className="font-semibold truncate max-w-32">{filters.amenaza}</span>
                                    <button
                                        onClick={() => setFilters({...filters, amenaza: ''})}
                                        className="ml-1 hover:text-orange-600"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            )}
                            
                            {filters.empresa && filters.empresa !== 'all' && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    <span className="mr-1">Empresa:</span>
                                    <span className="font-semibold truncate max-w-32">{filters.empresa}</span>
                                    <button
                                        onClick={() => setFilters({...filters, empresa: ''})}
                                        className="ml-1 hover:text-purple-600"
                                    >
                                        <i className="ri-close-line"></i>
                                    </button>
                                </div>
                            )}
                            
                            {/* Botón para limpiar todos los filtros */}
                            <button
                                onClick={() => setFilters({region: '', sector: '', amenaza: '', empresa: '', year: ''})}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                <i className="ri-close-circle-line mr-1"></i>
                                Limpiar todos
                            </button>
                        </div>
                    </div>
                )}
                
                {/* KPIs Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-2">
                    <StatCard
                        title="Total Empresas"
                        value={metrics.totalEmpresas.toLocaleString()}
                        subtitle="Empresas en el sistema"
                        icon="ri-building-line"
                        color="bg-[#7db4f7]"
                    />
                    <StatCard
                        title="Empresas Registradas"
                        value={metrics.empresasRegistradas.toLocaleString()}
                        subtitle="Empresas filtradas"
                        icon="ri-store-line"
                        color="bg-[#b599f8]"
                    />
                    <StatCard
                        title="Porcentaje de registros"
                        value={`${metrics.porcentajeRegistros.toLocaleString()}%`}
                        subtitle={`Porcentaje Total`}
                        icon="ri-percent-line"
                        color="bg-[#6dd4a8]"
                    />

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
                    {/* Mapa */}
                    <div className="bg-white overflow-hidden shadow-lg col-span-2 h-105 rounded-lg ">
                        <div className="px-6 py-2 border-b border-gray-200">
                            <h3 className="text-lg leading-6 font-semibold text-gray-900">
                                Empresas Registradas
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Distribución geográfica de las empresas
                            </p>
                        </div>
                        <Map  filters={filters}/>

                    </div>
                    {/* Regionales */}
                    <Regionales datos={datosRegionales} filters={filters} setFilters={setFilters} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
                    {/* Tabla PARE */}
                    <Implementacion filters={filters} />
                    {/* Mapa de Calor */}
                    <MapaCalor filters={filters} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
                    {/* Trazabilidad */}
                    <TrazabilidadTable filters={filters} />
                    <ICRIVChart filters={filters} setFilters={setFilters} />
                    <AmenazasTreeMap filters={filters} setFilters={setFilters} />
                </div>
                

            </div>
        </div>
    );
}