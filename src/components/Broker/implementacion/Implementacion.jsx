
import { getDatosImplementacion } from '../../../utils/filtros';

export default function Implementacion({ filters = {} }) {
    const datos = getDatosImplementacion(filters);
    
    // Función para determinar el color del badge según el porcentaje
    const getBadgeColor = (porcentaje) => {
        if (porcentaje >= 80) return 'bg-green-100 text-green-800';
        if (porcentaje >= 60) return 'bg-yellow-100 text-yellow-800';
        if (porcentaje >= 40) return 'bg-orange-100 text-orange-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <>
            <div className="bg-white overflow-hidden shadow-lg text-[10px] col-span-2 rounded-lg">
                <div className="px-6 py-2 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-semibold text-gray-900">
                        Implementación de PARE
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Seguimiento de la implementación por componentes - Año 2025
                        {datos.numeroEmpresas > 0 && (
                            <span className="ml-2 text-blue-600">
                                ({datos.numeroEmpresas} empresa{datos.numeroEmpresas !== 1 ? 's' : ''} seleccionada{datos.numeroEmpresas !== 1 ? 's' : ''})
                            </span>
                        )}
                    </p>
                </div>
                <div className="overflow-x-auto h-100 w-full">
                    <table className="w-full divide-y divide-gray-200 text-[5px]">
                        <thead className="bg-gray-50 text-[10px]">
                            <tr>
                                <th style={{ width: '20px' }} className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Plan
                                </th>
                                <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">
                                    2025
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-[12px] divide-gray-200">
                            <tr className="bg-blue-50">
                                <td className="px-6 whitespace-nowrap font-bold text-gray-900">
                                    100. Implementación de PARE
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    <span className={`inline-flex px-3 py-1 font-semibold rounded-full ${getBadgeColor(datos.implementacionPARE)}`}>
                                        {datos.implementacionPARE}%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    01_Establecimiento del contexto
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentes.establecimientoContexto}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    02_Componente de respuesta
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentes.componenteRespuesta}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    03_Componente informativo
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentes.componenteInformativo}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    04_Componente de seguimiento y verificación
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentes.seguimientoVerificacion}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    05_Panorama de riesgos y Recursos
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentes.panoramaRiesgos}%</td>
                            </tr>
                            <tr className="bg-green-50">
                                <td className="px-6 whitespace-nowrap font-bold text-gray-900">
                                    101. Implementación Marco Teórico
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    <span className={`inline-flex px-3 py-1 font-semibold rounded-full ${getBadgeColor(datos.marcoTeorico)}`}>
                                        {datos.marcoTeorico}%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    01_Establecimiento del contexto
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentesMarcoTeorico.establecimientoContexto}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    02_Componente de Respuesta
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentesMarcoTeorico.componenteRespuesta}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    03_Componente Informativo
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentesMarcoTeorico.componenteInformativo}%</td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap text-gray-900 pl-8">
                                    04_Componente de Seguimiento y Verificación
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">{datos.componentesMarcoTeorico.seguimientoVerificacion}%</td>
                            </tr>
                            <tr className="bg-gray-100 font-semibold">
                                <td className="px-6 whitespace-nowrap font-bold text-gray-900">
                                    Total
                                </td>
                                <td className="whitespace-nowrap text-center">
                                    <span className={`inline-flex px-3 py-1 font-bold rounded-full ${getBadgeColor(datos.total)}`}>
                                        {datos.total}%
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
