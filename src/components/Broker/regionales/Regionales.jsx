import ReactECharts from 'echarts-for-react';

export default function Regionales({ datos ,setFilters}) {

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
        xAxis: {
            type: 'category',
            data: datos?.labels,
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
            data: datos?.data || [0, 0, 0, 0, 0, 0],
            type: 'bar',
            itemStyle: {
                color: function (params) {
                    const colors = ['#7db4f7', '#6dd4a8', '#b599f8', '#f7b955', '#f8888a', '#66d8dc'];
                    return colors[params.dataIndex];
                }
            }
        }]
    };

    const handleItemClick = (params) => {
        // Acceder a los datos del item clickeado
        const { data, name, value } = params;
        setFilters(prevFilters => ({
            ...prevFilters,
            region: name
        }));

    };
    const onEvents = {
        'click': handleItemClick
    };

    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg col-span-1 ">
            <div className="px-6 py-2 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Regionales
                </h3>
                <p className="mt-0 text-sm text-gray-500">
                    Empresas por regiones
                </p>
            </div>
            <div className="p-1">
                <div className="h-85">
                    <ReactECharts
                        option={regionalChartOption}
                        style={{ height: '100%', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                        onEvents={onEvents}
                    />
                </div>
            </div>
        </div>
    )
}
