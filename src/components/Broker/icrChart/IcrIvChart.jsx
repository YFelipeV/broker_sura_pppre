import ReactEcharts from 'echarts-for-react';
import { getDatosICRIV } from '../../../utils/filtros';

const ICRIVChart = ({ filters, setFilters }) => {
    // Obtener datos ICR/IV filtrados

    const datosICRIV = getDatosICRIV(filters);

    function truncar(num, decimales = 2) {
        const factor = 10 ** decimales;
        return Math.trunc(num * factor) / factor;
    }
    // Preparar datos para el gráfico - usar datos reales, no estáticos
    const data = datosICRIV.map(item => ({
        name: item.sector,
        icr: truncar(Number(item.icr)), // ICR desde getDatosICRIV
        iv: truncar(Number(item.iv))   // IV desde getDatosICRIV
    })).sort((a, b) => b.icr - a.icr);

    // Categorías y datos para el gráfico
    const categories = data.map(item => item.name);
    const icrData = data.map(item => item.icr);
    const ivData = data.map(item => item.iv);

    const handleItemClick = (params) => {
        // Acceder a los datos del item clickeado
        const { data, name, value } = params;
        setFilters(prevFilters => ({
            ...prevFilters,
            sector: name
        }));

    };
    const onEvents = {
        'click': handleItemClick
    };

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(50, 50, 50, 0.95)',
            borderColor: '#ccc',
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
            position: function (point, params, dom, rect, size) {
                // Posicionar el tooltip inteligentemente para evitar superposición
                const tooltipWidth = size.contentSize[0];
                const tooltipHeight = size.contentSize[1];
                const chartWidth = size.viewSize[0];
                const chartHeight = size.viewSize[1];
                
                let x = point[0] + 20;
                let y = point[1] - tooltipHeight / 2;
                
                // Si no cabe a la derecha, ponerlo a la izquierda
                if (x + tooltipWidth > chartWidth - 20) {
                    x = point[0] - tooltipWidth - 20;
                }
                
                // Si no cabe arriba, ajustar verticalmente
                if (y < 20) {
                    y = 20;
                } else if (y + tooltipHeight > chartHeight - 20) {
                    y = chartHeight - tooltipHeight - 20;
                }
                
                return [x, y];
            },
            formatter: function (params) {
                let result = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].name}</div>`;
                params.forEach(param => {
                    const color = param.color;
                    result += `<div style="margin: 2px 0;">
                        <span style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; margin-right: 5px; border-radius: 2px;"></span>
                        ${param.seriesName}: <strong>${param.value.toFixed(1)}%</strong>
                    </div>`;
                });
                return result;
            }
        },
        // Configuración del scroll para navegar por muchos datos
        dataZoom: [
            {
                type: 'slider',
                orient: 'vertical',
                yAxisIndex: 0,
                start: 0,
                end: Math.min(80, (6 / categories.length) * 100), // Mostrar máximo 6 elementos
                width: 15,
                right: 5,
                top: '8%',
                bottom: '12%',
                showDetail: false,
                brushSelect: false,
                backgroundColor: '#f5f5f5',
                fillerColor: '#ccc',
                borderColor: '#d0d0d0',
                handleStyle: {
                    color: '#888888',
                    borderColor: '#444444'
                },
                // Desactivar zoom, solo scroll
                zoomLock: true, // Bloquea el zoom
                minSpan: Math.min(80, (6 / categories.length) * 100), // Tamaño fijo
                maxSpan: Math.min(80, (6 / categories.length) * 100)  // Tamaño fijo
            },
            {
                type: 'inside',
                orient: 'vertical',
                yAxisIndex: 0,
                start: 0,
                end: Math.min(80, (6 / categories.length) * 100),
                zoomOnMouseWheel: false, // Desactivar zoom con rueda
                moveOnMouseMove: true,   // Solo mover, no zoom
                moveOnMouseWheel: true,  // Mover con rueda del mouse
                zoomLock: true          // Bloquear zoom
            }
        ],
        grid: {
            left: '25%', // Menos espacio para nombres, más para el gráfico
            right: '12%', // Espacio justo para el scroll
            top: '8%',
            bottom: '12%',
            containLabel: false
        },
        xAxis: {
            type: 'value',
            max: 100, // Cambiar de 10 a 100 para mostrar porcentajes correctamente
            axisLabel: {
                formatter: '{value}%'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e0e0e0'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: categories,
            axisLabel: {
                fontSize: 11, // Fuente más pequeña para los nombres
                color: '#555',
                interval: 0,
                margin: 8, // Menos margen
                lineHeight: 12, // Menos altura de línea
                formatter: function(value) {
                    // Nombres más cortos para ahorrar espacio
                    if (value.length > 12) {
                        return value.substring(0, 12) + '...';
                    }
                    return value;
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#000000'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                name: 'ICR',
                type: 'bar',
                stack: 'total',
                data: icrData,
                itemStyle: {
                    color: '#BDF5BD', // Verde más profesional
                    borderRadius: [0, 0, 0, 0]
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%',
                    fontSize: 10,
                    color: '#000',
                    fontWeight: 'normal'
                },
                barMaxWidth: 20, // Barras más anchas
                barCategoryGap: '20%' // Más espacio entre categorías
            },
            {
                name: 'IV',
                type: 'bar',
                stack: 'total',
                data: ivData,
                itemStyle: {
                    color: '#FF9999', // Rojo más profesional
                    borderRadius: [0, 0, 0, 0]
                },
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}%',
                    fontSize: 10,
                    color: '#000',
                    fontWeight: 'normal'
                },
                barMaxWidth: 20, // Barras más anchas
                barCategoryGap: '20%' // Más espacio entre categorías
            }
        ]
    };

    // Componente de leyenda de niveles simplificada
    const LevelLegend = () => (
        <div className="mt-0 px-2">
            <div className=" rounded-lg p-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="w-3 h-3 bg-[#BDF5BD] rounded mr-2"></span>
                    Índice Corrección Riesgo (ICR)
                </h4>
                <div className="grid grid-cols-5 gap-1 text-xs">
                    <div className="text-center p-1  border border-green-400 rounded">
                        <div className="font-medium">Muy Bajo</div>
                        <div className="text-gray-600">0-30%</div>
                    </div>
                    <div className="text-center p-1  border border-green-400 rounded">
                        <div className="font-medium">Bajo</div>
                        <div className="text-gray-600">30-60%</div>
                    </div>
                    <div className="text-center p-1  border border-green-400 rounded">
                        <div className="font-medium">Moderado</div>
                        <div className="text-gray-600">60-80%</div>
                    </div>
                    <div className="text-center p-1 border border-green-400 rounded">
                        <div className="font-medium">Alto</div>
                        <div className="text-gray-600">80-90%</div>
                    </div>
                    <div className="text-center p-1 border border-green-400 rounded">
                        <div className="font-medium">Muy alto</div>
                        <div className="text-gray-600">90-100%</div>
                    </div>
                </div>
            </div>
            {/* IV Levels */}
            <div className=" rounded-lg p-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    <span className="w-3 h-3 bg-[#FF9999] rounded mr-2"></span>
                    Índice Vulnerabilidad (IV)
                </h4>
                <div className="grid grid-cols-5 gap-1 text-xs">
                    <div className="text-center p-1 border border-[#FF9999] rounded">
                        <div className="font-medium">Muy Alto</div>
                        <div className="text-gray-600">70-100%</div>
                    </div>
                    <div className="text-center p-1 border border-red-400 rounded">
                        <div className="font-medium">Alto</div>
                        <div className="text-gray-600">40-70%</div>
                    </div>
                    <div className="text-center p-1 border border-red-400 rounded">
                        <div className="font-medium">Moderado</div>
                        <div className="text-gray-600">20-40%</div>
                    </div>
                    <div className="text-center p-1 border border-red-400 rounded">
                        <div className="font-medium">Bajo</div>
                        <div className="text-gray-600">20-40%</div>
                    </div>
                    <div className="text-center p-1 border border-red-400 rounded">
                        <div className="font-medium">Muy Bajo</div>
                        <div className="text-gray-600">0-10%</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white overflow-hidden col-span-1 shadow-lg rounded-lg">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r ">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Índice Corrección Riesgo (ICR) vs Índice Vulnerabilidad (IV)
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                    Análisis comparativo de índices por agrupación
                </p>
            </div>

            {/* Chart Container */}
            <div className="p-0">
                <div style={{ height: '350px', width: '100%' }}>
                    <ReactEcharts
                        option={option}
                        style={{ height: '100%', width: '100%', margin: '0 4px' }}
                        opts={{ renderer: 'canvas' }}
                        onEvents={onEvents}
                    />
                </div>
            </div>

            {/* Legend */}
            <LevelLegend />

        </div>
    );
};

export default ICRIVChart;