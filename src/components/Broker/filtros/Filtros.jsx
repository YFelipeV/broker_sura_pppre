import React from 'react'

export default function Filtros({ filters, setFilters, selectedPeriod, setSelectedPeriod, setShowFilters }) {
    return (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Filtros</h3>
                    <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <i className="ri-close-line text-xl"></i>
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Año
                        </label>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-4">
                    {/* Filtro por Región */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Región
                        </label>
                        <select
                            value={filters.region}
                            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                            className="block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">Todas las regiones</option>
                            <option value="caribe">Caribe</option>
                            <option value="antioquia">Antioquia</option>
                            <option value="cordoba">Córdoba</option>
                            <option value="choco">Chocó</option>
                            <option value="eje-cafetero">Eje Cafetero</option>
                            <option value="cundinamarca">Cundinamarca</option>
                        </select>
                    </div>

                    {/* Filtro por Tipo de Empresa */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Empresa
                        </label>
                        <select
                            value={filters.tipoEmpresa}
                            onChange={(e) => setFilters({ ...filters, tipoEmpresa: e.target.value })}
                            className="block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="grande">Empresa Grande</option>
                            <option value="mediana">Empresa Mediana</option>
                            <option value="pequena">Empresa Pequeña</option>
                            <option value="micro">Microempresa</option>
                        </select>
                    </div>

                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200">
                    <button
                        onClick={() => setFilters({ region: 'all', tipoEmpresa: 'all', nivelRiesgo: 'all' })}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Limpiar
                    </button>
                    <button
                        onClick={() => setShowFilters(false)}
                        className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    )
}
