import ReactEcharts from 'echarts-for-react';
import { getDatosAmenazasPlanas } from '../../../utils/filtros';

export default function AmenazasTreeMap({ filters, setFilters }) {
    // Obtener datos ya agrupados como amenazas únicas
    const amenazasData = getDatosAmenazasPlanas(filters);

    // Colores originales que tenías
    const colores = [
        '#7a8cc4', '#ff9a7a', '#a4d4eb', '#6bd46b', '#ffb84d',
        '#c785d3', '#ff8fc7', '#6b8fe6', '#ffd966', '#a896db',
        '#ff8570', '#ff5bb8', '#4dd4d1', '#a4ee9f', '#e5b3dd',
        '#b8fb9f', '#f2e69d', '#6bd46b', '#a4d4eb', '#ffb84d'
    ];

    // Aplicar colores y valor simple a los datos
    const amenazasConColores = amenazasData.map((amenaza, index) => ({
        ...amenaza,
        value: 10, // Valor fijo simple para el TreeMap
        itemStyle: {
            color: colores[index % colores.length],
            borderColor: '#fff',
            borderWidth: 1
        }
    }));

    const handleItemClick = (params) => {
        // Acceder a los datos del item clickeado
        const { data, name, value } = params;
        setFilters(prevFilters => ({
            ...prevFilters,
            amenaza: name
        }));

    };
    const onEvents = {
        'click': handleItemClick
    };

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                const data = params.data;
                let tooltip = `<strong>${data.amenaza}</strong><br/>`;
                return tooltip;
            }
        },

        series: [
            {
                name: 'Amenazas por Empresa',
                type: 'treemap',
                width: '95%',
                height: '90%',
                top: '2%',
                left: '2%',
                roam: false,
                nodeClick: false,
                data: amenazasConColores,
                breadcrumb: {
                    show: false
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: function (params) {
                        const name = params.name;
                        // Truncar nombres largos
                        return name.length > 20 ? name.substring(0, 20) + '...' : name;
                    },
                    fontSize: 8,
                    color: '#000',
                    fontWeight: 'normal',
                    overflow: 'truncate'
                },
                upperLabel: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        borderColor: '#333',
                        borderWidth: 2,
                        opacity: 0.9
                    },
                    label: {
                        fontSize: 10
                    }
                },
                levels: [
                    {
                        itemStyle: {
                            borderWidth: 1,
                            gapWidth: 2,
                            borderColor: '#fff'
                        }
                    }
                ]
            }
        ]
    };

    return (
        <div className='bg-white overflow-hidden shadow-lg rounded-lg col-span-1 border-t border-gray-200 h-160'>
            <div className="px-6 py-2 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Amenazas Identificadas
                </h3>
                <p className="mt-0 text-sm text-gray-500">
                    Amenazas específicas por empresa
                </p>
            </div>
            <div className="p-1 py-0">
                <div className="h-155">
                    {
                        Array.isArray(amenazasData) && amenazasData.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <span className="text-gray-500 text-xs">No hay datos disponibles</span>
                            </div>
                        ) : null
                    }
                    <ReactEcharts
                        option={option}
                        style={{ height: '100%', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                        onEvents={onEvents}
                    />
                </div>
            </div>
        </div>
    );
}
