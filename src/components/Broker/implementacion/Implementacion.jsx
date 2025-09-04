
export default function Implementacion() {
    return (
        <>

            <div className="bg-white overflow-hidden shadow-lg  text-[10px] col-span-2  rounded-lg mb-4  ">
                <div className="px-6 py-2 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-semibold text-gray-900">
                        Implementación de PARE
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Seguimiento de la implementación por componentes y años
                    </p>
                </div>
                <div className="overflow-x-auto h-100   w-full ">
                    <table className=" w-full divide-y  divide-gray-200 text-[5px]">
                        <thead className="bg-gray-50 text-[10px] ">
                            <tr>
                                <th style={{ width: '20px' }} className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                                    Plan
                                </th>

                                <th className="px-6 py-3 text-center  font-medium text-gray-500 uppercase tracking-wider">
                                    2025
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-[12px] divide-gray-200">
                            <tr className="bg-blue-50">
                                <td className=" px-6 whitespace-nowrap  font-bold text-gray-900">
                                    100. Implementación de PARE
                                </td>
                                <td className=" whitespace-nowrap text-center">
                                    <span className="inline-flex px-3 py-1  font-semibold rounded-full bg-red-100 text-red-800">
                                        34%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap  text-gray-900 pl-8">
                                    01_Establecimiento del contexto
                                </td>
                                <td className=" p-1 whitespace-nowrap text-center  text-gray-500">27%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap  text-gray-900 pl-8">
                                    02_Componente de respuesta
                                </td>

                                <td className=" p-1 whitespace-nowrap text-center  text-gray-500">70%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap  text-gray-900 pl-8">
                                    03_Componente informativo
                                </td>
                                <td className=" p-1 whitespace-nowrap text-center  text-gray-500">45%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap  text-gray-900 pl-8">
                                    04_Componente de seguimiento y verificación
                                </td>

                                <td className=" p-1 whitespace-nowrap text-center  text-gray-500">18%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap  text-gray-900 pl-8">
                                    05_Panorama de riesgos y Recursos
                                </td>
                                <td className=" p-1 whitespace-nowrap text-center  text-gray-500">12%</td>
                            </tr>
                            <tr className="bg-green-50">
                                <td className=" px-6 whitespace-nowrap  font-bold text-gray-900">
                                    101. Implementación Marco Teórico
                                </td>

                                <td className=" whitespace-nowrap text-center">
                                    <span className="inline-flex px-3 py-1  font-semibold rounded-full bg-green-100 text-green-800">
                                        87%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap text-gray-900 pl-8">
                                    01_Establecimiento del contexto
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">97%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap text-gray-900 pl-8">
                                    02_Componente de Respuesta
                                </td>

                                <td className="p-1 whitespace-nowrap text-center text-gray-500">89%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap text-gray-900 pl-8">
                                    03_Componente Informativo
                                </td>

                                <td className="p-1 whitespace-nowrap text-center text-gray-500">97%</td>
                            </tr>
                            <tr>
                                <td className=" whitespace-nowrap text-gray-900 pl-8">
                                    04_Componente de Seguimiento y Verificación
                                </td>
                                <td className="p-1 whitespace-nowrap text-center text-gray-500">66%</td>
                            </tr>
                            <tr className="bg-gray-100 font-semibold">
                                <td className=" px-6 whitespace-nowrap font-bold text-gray-900">
                                    Total
                                </td>
                                <td className=" whitespace-nowrap text-center">
                                    <span className="inline-flex px-3 py-1 font-bold rounded-full bg-blue-100 text-blue-800">
                                        60%
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
