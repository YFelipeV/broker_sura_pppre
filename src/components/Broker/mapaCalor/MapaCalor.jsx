import ReactECharts from 'echarts-for-react';
import { getDatosMapaCalor } from '../../../utils/filtros';

export default function MapaCalor({ filters }) {
    const datosMapaCalor = getDatosMapaCalor(filters);
    
    // Usar datos dinámicos que vienen de datosMapaCalor o datos por defecto
    const data = datosMapaCalor.datos || [
        { categoria: 'Muy alta', menor: 212, bajo: 298, importante: 40, mayor: 12, significativa: 56 },
        { categoria: 'Alta', menor: 2935, bajo: 4619, importante: 1500, mayor: 267, significativa: 271 },
        { categoria: 'Moderada', menor: 8191, bajo: 12875, importante: 3135, mayor: 335, significativa: 220 },
        { categoria: 'Baja', menor: 17286, bajo: 29648, importante: 5387, mayor: 477, significativa: 203 },
        { categoria: 'Muy baja', menor: 6152, bajo: 9607, importante: 1999, mayor: 270, significativa: 138 }
    ];
  

    // Función para determinar el color exacto como en la imagen - COLORES FIJOS
    const getColorClass = (categoria, columna, valor) => {
        // Colores fijos según la imagen mostrada
        
        // Fila "Muy alta"
        if (categoria === 'Muy alta') {
            if (columna === 'menor') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (212)
            if (columna === 'bajo') return 'bg-[#FFFF99] border border-yellow-400';     // Amarillo (298)
            if (columna === 'importante') return 'bg-[#FFCC99] border border-orange-400'; // Naranja (40)
            if (columna === 'mayor') return 'bg-[#FF9999] border border-red-400';       // Rojo (12)
            if (columna === 'significativa') return 'bg-[#FF9999] border border-red-400'; // Rojo (56)
        }
        
        // Fila "Alta"
        if (categoria === 'Alta') {
            if (columna === 'menor') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (2935)
            if (columna === 'bajo') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (4619)
            if (columna === 'importante') return 'bg-[#FFFF99] border border-yellow-400'; // Amarillo (1500)
            if (columna === 'mayor') return 'bg-[#FF9999] border border-red-400';       // Rojo (267)
            if (columna === 'significativa') return 'bg-[#FF9999] border border-red-400'; // Rojo (271)
        }
        
        // Fila "Moderada"
        if (categoria === 'Moderada') {
            if (columna === 'menor') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (8191)
            if (columna === 'bajo') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (12875)
            if (columna === 'importante') return 'bg-[#FFFF99] border border-yellow-400'; // Amarillo (3135)
            if (columna === 'mayor') return 'bg-[#FF9999] border border-red-400';       // Rojo (335)
            if (columna === 'significativa') return 'bg-[#FF9999] border border-red-400'; // Rojo (220)
        }
        
        // Fila "Baja"
        if (categoria === 'Baja') {
            if (columna === 'menor') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (17286)
            if (columna === 'bajo') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (29648)
            if (columna === 'importante') return 'bg-[#BDF5BD] border border-green-400'; // Verde claro (5387)
            if (columna === 'mayor') return 'bg-[#BDF5BD] border border-green-400';     // Verde claro (477)
            if (columna === 'significativa') return 'bg-[#FFCC99] border border-orange-400'; // Naranja (203)
        }
        
        // Fila "Muy baja"
        if (categoria === 'Muy baja') {
            if (columna === 'menor') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (6152)
            if (columna === 'bajo') return 'bg-[#BDF5BD] border border-green-400';      // Verde claro (9607)
            if (columna === 'importante') return 'bg-[#BDF5BD] border border-green-400'; // Verde claro (1999)
            if (columna === 'mayor') return 'bg-[#FFFF99] border border-yellow-400';    // Amarillo (270)
            if (columna === 'significativa') return 'bg-[#FFFF99] border border-yellow-400'; // Amarillo (138)
        }
        
        return 'bg-gray-200'; // Default
    };

    // Mantener los niveles y títulos originales
    const niveles = ['menor', 'bajo', 'importante', 'mayor', 'significativa'];
    const titulosColumnas = ['Menor', 'Bajo', 'Importante', 'Mayor', 'Significativa'];

    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg col-span-1">
            <div className="px-6 py-2 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Mapa de calor
                </h3>
                <p className="mt-0 text-sm text-gray-500">
                    Empresas por regiones
                    {datosMapaCalor.empresasFiltradas > 0 && (
                        <span className="ml-2 text-blue-600">
                            ({datosMapaCalor.empresasFiltradas} empresa{datosMapaCalor.empresasFiltradas !== 1 ? 's' : ''} seleccionada{datosMapaCalor.empresasFiltradas !== 1 ? 's' : ''})
                        </span>
                    )}
                </p>
            </div>
            <div className="p-0">
                <div className="h-95">
                    <div className="w-full mx-auto p-3 bg-white">
                        {/* Tabla */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-[9px] table-fixed">
                                {/* Encabezado */}
                                <thead>
                                    <tr className='text-[10px]'>
                                        <th className="w-1/6 h-12 text-left font-semibold text-gray-700 px-2 py-3">
                                            {/* Celda vacía esquina superior izquierda */}
                                        </th>
                                        {titulosColumnas.map((titulo, index) => (
                                            <th key={index} className="w-1/6 h-12 text-center font-semibold text-gray-700 px-2 py-3">
                                                {titulo}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {/* Cuerpo de la tabla */}
                                <tbody>
                                    {data.map((row, index) => (
                                        <tr key={index}>
                                            <td className="w-1/6 h-12 text-[10px] px-2 py-3 font-semibold text-gray-700">
                                                {row.categoria}
                                            </td>
                                            {niveles.map((nivel, nivelIndex) => {
                                                const valor = row[nivel] || 0;
                                                return (
                                                    <td key={nivelIndex} className={`w-1/6 h-12 text-center font-semibold text-gray-800 px-2 py-3 ${getColorClass(row.categoria, nivel, valor)}`}>
                                                        {valor.toLocaleString()}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Leyenda */}
                        <div className="flex justify-center gap-4 mt-10 text-[12px]">
                            <div className="flex items-center">
                                <div className="w-8 h-6 bg-[#BDF5BD] border border-green-400 mr-2"></div>
                                <span className="font-medium text-gray-700">Bajo</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-6 bg-[#FFFF99] border border-yellow-400 mr-2"></div>
                                <span className="font-medium text-gray-700">Moderado</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-6 bg-[#FFCC99] border border-orange-400 mr-2"></div>
                                <span className="font-medium text-gray-700">Alto</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-8 h-6 bg-[#FF9999] border border-red-400 mr-2"></div>
                                <span className="font-medium text-gray-700">Crítico</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
