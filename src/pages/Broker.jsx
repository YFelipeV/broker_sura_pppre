import { useState } from 'react';
import Implementacion from '../components/Broker/implementacion/Implementacion';
import Map from '../components/Broker/mapa/Map';
import Regionales from '../components/Broker/regionales/Regionales';
import Analisis from '../components/Broker/analisis/Analisis';
import StatCard from '../components/Broker/StatCard/StatCard';
import Filtros from '../components/Broker/filtros/Filtros';


export default function Analytics() {
    const [selectedPeriod, setSelectedPeriod] = useState('2024');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        region: 'all',
        tipoEmpresa: 'all',
        nivelRiesgo: 'all'
    });
    const [metrics, setMetrics] = useState({
        totalEmpresas: 1245,
        totalUsuarios: 892,
        totalSucursales: 60,
        amenazas: 156,
        recursos: 342,
        materialesPeligrosos: 87,
        emergenciasActivas: 12,
        planesDeAccion: 34,
        alertasTempranas: 8,
        totalImplementation: 60,
        pareImplementation: 34,
        marcoTeoricoImplementation: 87,
        riskLevel: 'Medio'
    });


    // Configuración para ECharts - Gráfico de barras regionales
    const regionalChartOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: false, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: {
            type: 'category',
            data: ['Caribe', 'Antioquia', 'Córdoba', 'Chocó', 'Eje Cafetero', 'Cundinamarca'],
            axisLabel: {
                interval: 0,
                rotate: 45,
                fontSize: 10
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [600, 400, 300, 250, 200, 100],
            type: 'bar',
            itemStyle: {
                color: function (params) {
                    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
                    return colors[params.dataIndex];
                }
            }
        }]
    };

    // Configuración para ECharts - Gráfico de dona para análisis
    const analysisChartOption = {
        legend: {
            top: 'bottom',
            padding: [10, 0, 5, 0],
            bottom: 10,
        },
        toolbox: {
            feature: {
                dataView: { show: false, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
            name: 'Análisis',
            type: 'pie',
            radius: ['40%', '65%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 8,
                borderColor: '#fff',
                borderWidth: 2,
            },
            label: {
                show: true,
                position: 'outside',
                fontSize: '12px',
                fontWeight: 'normal',
                color: '#374151',
                formatter: '{b}\n{c}',
                distanceToLabelLine: 8
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '12px',
                    fontWeight: 'normal'
                }
            },
            labelLine: {
                show: true,
                length: 12,
                length2: 6,
                smooth: false,
                lineStyle: {
                    color: '#666',
                    width: 1
                }
            },
            data: [
                { value: metrics.amenazas, name: 'Amenazas', itemStyle: { color: '#EF4444' } },
                { value: metrics.recursos, name: 'Recursos', itemStyle: { color: '#3C82F6' } },
                { value: metrics.materialesPeligrosos, name: 'Mat. Peligrosos', itemStyle: { color: '#F59E0B' } }
            ]
        }]
    };



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

                {/* KPIs Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-2">
                    <StatCard
                        title="Total Empresas"
                        value={metrics.totalEmpresas.toLocaleString()}
                        subtitle="Empresas"
                        icon="ri-building-line"
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Total Empresas registradas"
                        value={metrics.totalUsuarios.toLocaleString()}
                        subtitle="Empresas registradas"
                        icon="ri-store-line"
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Porcentaje de registros"
                        value={`${metrics.totalSucursales.toLocaleString()}%`}
                        subtitle="Porcentaje Total"
                        icon="ri-percent-line"
                        color="bg-green-500"
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
                        <Map />

                    </div>
                    {/* Regionales */}
                    <Regionales chartOption={regionalChartOption} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-2">
                    {/* Tabla PARE */}
                    <Implementacion />
                    {/* Gráfico de Análisis y Planes de Acción */}
                    <Analisis chartOption={analysisChartOption} />
                </div>



            </div>
        </div>
    );
}