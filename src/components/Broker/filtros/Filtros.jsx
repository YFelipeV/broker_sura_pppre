import  { useRef, useEffect } from 'react';
import { getDatosRegionales, getSectores } from '../../../utils/filtros';
import { empresas } from '../../../data/empresas';

export default function Filtros({ filters, setFilters, selectedPeriod, setSelectedPeriod, setShowFilters }) {
    const popoverRef = useRef(null);

    // Lista de regiones disponibles
    const { labels: regiones } = getDatosRegionales();
    const  sectores  = getSectores();

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowFilters]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value === 'all' || value === 'all' ? '' : value
        }));
    };

    const limpiarFiltros = () => {
        setFilters({
            region: '',
            sector: '',
            amenaza: '',
            empresa: '',
            year: ''
        });
        setSelectedPeriod('2025');
    };

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50" ref={popoverRef}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                    <button
                        onClick={() => setShowFilters(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <i className="ri-close-line text-lg"></i>
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Período */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Período
                        </label>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                            <option value="all">Todos</option>
                            <option value="2024">2025</option>
                        </select>
                    </div>

                    {/* Región */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Región
                        </label>
                        <select
                            value={filters.region || 'all'}
                            onChange={(e) => handleFilterChange('region', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                             <option value="all">Todos</option>
                            {Array.isArray(regiones) && regiones.map(region => (
                                <option key={`region-${region.value}`} value={region.value}>{region.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sector
                        </label>
                        <select
                            value={filters.sector || 'all'}
                            onChange={(e) => handleFilterChange('sector', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                             <option value="all">Todos</option>
                            {Array.isArray(sectores) && sectores.map(sector => (
                                <option key={sector} value={sector}>{sector}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Empresa
                        </label>
                        <select
                            value={filters.empresa || 'all'}
                            onChange={(e) => handleFilterChange('empresa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                             <option value="all">Todas</option>
                            {Array.isArray(empresas) && empresas.map(empresa => (
                                <option key={empresa.id} value={empresa.id}>{empresa.nombre_empresa}</option>
                            ))}
                        </select>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                        <button
                            onClick={limpiarFiltros}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <i className="ri-close-circle-line mr-1"></i>
                            Limpiar filtros
                        </button>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <i className="ri-check-line mr-1"></i>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}