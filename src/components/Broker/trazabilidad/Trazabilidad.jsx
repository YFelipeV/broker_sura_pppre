import { getDatosTrazabilidad } from '../../../utils/filtros';

const TrazabilidadTable = ({ filters, setFilters }) => {
    // Obtener datos dinámicos de trazabilidad basados en filtros
    const getDatosTrazabilidadFormateados = () => {
        const datosOriginales = getDatosTrazabilidad(filters || {});
        // Agrupar amenazas únicas con sus evaluaciones
        const amenazasUnicas = {};

        datosOriginales.forEach(item => {
            if (!amenazasUnicas[item.amenaza]) {
                amenazasUnicas[item.amenaza] = {
                    amenaza: item.amenaza,
                    "2025": item.evaluacion2025 || ""
                };
            }
        });

        return Object.values(amenazasUnicas);
    };

    const threats = getDatosTrazabilidadFormateados();

    const years = ["2025"];

    // Función para obtener la clase de color según el nivel
    const getRiskColorClass = (level) => {
        switch (level) {
            case "Bajo":
                return "bg-[#BDF5BD] text-gray-800";
            case "Moderado":
                return "bg-[#FFFF99] text-gray-800";
            case "Alto":
                return "bg-[#FFCC99] text-gray-800";
            case "Crítico":
                return "bg-[#FF9999] text-gray-800";
            default:
                return "bg-white text-gray-800";
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-lg rounded-lg col-span-1">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-semibold text-gray-900">
                    Trazabilidad de amenazas evaluadas por sede
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Empresas por regiones
                </p>
            </div>

            {/* Tabla única con scroll horizontal */}
            <div className="overflow-auto max-h-[500px]">
                <table className="w-full border-collapse text-[12px]">
                    {/* Headers */}
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="sticky left-0 z-20 bg-gray-50 border-b border-r border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 w-90 h-10">
                                Amenaza
                            </th>
                            {years.map((year) => (
                                <th key={year} className="border-b border-l border-gray-300 px-3 py-2 text-center font-semibold text-gray-700 w-24 h-10">
                                    {year}
                                </th>
                            ))}
                        </tr>
                        <tr className="bg-gray-100">
                            <th className="sticky left-0 z-20 bg-gray-100 border-b border-r border-gray-300 px-3 py-2 text-center font-semibold text-gray-700 h-10">
                                {/* Espacio vacío */}
                            </th>
                            {years.map((year) => (
                                <td key={year} className="border-b border-l border-gray-300 px-3 py-2 text-center h-10">
                                    <span className="text-xs font-medium text-gray-700">PPPRE</span>
                                </td>
                            ))}
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className='text-[12px]'>
                        {Array.isArray(threats) && threats.length > 0 ? (
                            threats.map((threat, index) => (
                                <tr key={index} className="hover:bg-gray-50 h-10">
                                    <td onDoubleClick={() => setFilters({ ...filters, amenaza: threat.amenaza })} className="sticky cursor-pointer left-0 z-10 bg-white hover:bg-gray-50 border-b border-r border-gray-200 px-3 py-2 text-gray-800  w-80">
                                        {threat.amenaza}
                                    </td>
                                    {years.map((year) => (
                                        <td key={year} className={`border-b border-l border-gray-200 px-3 py-2 text-[11px] text-center font-medium w-24  ${getRiskColorClass(threat[year])}`}>
                                            {threat[year]}
                                        </td>
                                    ))
                                    }
                                </tr>
                            ))) : (
                            <tr>
                                <td colSpan={years.length + 1} className="text-center text-gray-500 py-4">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrazabilidadTable;