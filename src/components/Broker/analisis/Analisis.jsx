import ReactECharts from 'echarts-for-react';

export default function Analisis({ chartOption }) {
    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg col-span-1 h-116">
            <div className="px-6 py-2 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Análisis
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Amenazas, recursos y materiales peligrosos
                </p>
            </div>
            <div className="p-2">
                <div className="h-68 mt-8">
                    <ReactECharts
                        option={chartOption}
                        style={{ height: '100%', width: '100%' }}
                        opts={{ renderer: 'canvas' }}
                    />
                </div>
            </div>
        </div>
    )
}
