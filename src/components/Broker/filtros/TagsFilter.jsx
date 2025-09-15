import { empresas } from "../../../data/empresas";

export default function TagsFilter({ filters, setFilters, clearAllFilters }) {
    const nombreEmpresa = filters.empresa &&
        filters.empresa !== 'all' &&
        empresas.length > 0 &&
        empresas.find((item) => Number(item.id) === Number(filters.empresa))?.nombre_empresa;
    return (
        <div className="mb-4">
            <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2 self-center">Filtros activos:</span>

                  {filters.periodo && filters.periodo !== 'all' && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <span className="mr-1">Período:</span>
                        <span className="font-semibold">{filters.periodo}</span>
                        <button
                            onClick={() => setFilters({ ...filters, periodo: '' })}
                            className="ml-1 hover:text-blue-600"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                )}
                {filters.region && filters.region !== 'all' && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <span className="mr-1">Región:</span>
                        <span className="font-semibold">{filters.region}</span>
                        <button
                            onClick={() => setFilters({ ...filters, region: '' })}
                            className="ml-1 hover:text-blue-600"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                )}

                {filters.sector && filters.sector !== 'all' && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <span className="mr-1">Sector:</span>
                        <span className="font-semibold">{filters.sector}</span>
                        <button
                            onClick={() => setFilters({ ...filters, sector: '' })}
                            className="ml-1 hover:text-green-600"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                )}

                {filters.amenaza && filters.amenaza !== 'all' && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        <span className="mr-1">Amenaza:</span>
                        <span className="font-semibold truncate max-w-32">{filters.amenaza}</span>
                        <button
                            onClick={() => setFilters({ ...filters, amenaza: '' })}
                            className="ml-1 hover:text-orange-600"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                )}

                {filters.empresa && filters.empresa !== 'all' && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <span className="mr-1">Empresa:</span>
                        <span className="font-semibold truncate max-w-32">{nombreEmpresa}</span>
                        <button
                            onClick={() => setFilters({ ...filters, empresa: '' })}
                            className="ml-1 hover:text-purple-600"
                        >
                            <i className="ri-close-line"></i>
                        </button>
                    </div>
                )}

                {/* Botón para limpiar todos los filtros */}
                <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                    <i className="ri-close-circle-line mr-1"></i>
                    Limpiar todos
                </button>
            </div>
        </div>
    )
}
