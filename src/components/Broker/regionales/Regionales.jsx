import ReactECharts from 'echarts-for-react';

export default function Regionales({ chartOption }) {
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
                        option={chartOption} 
                        style={{height: '100%', width: '100%'}}
                        opts={{renderer: 'canvas'}}
                    />
                </div>
            </div>
        </div>
    )
}
