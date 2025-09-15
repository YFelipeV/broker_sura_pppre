import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const FilterContext = createContext();

// Hook personalizado para usar el contexto
export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters debe ser usado dentro de FilterProvider');
    }
    return context;
};

// Proveedor del contexto
export const FilterProvider = ({ children }) => {
    // Estado inicial de filtros
    const [filters, setFilters] = useState({
        region: '',
        sector: '',
        amenaza: '',
        empresa: '',
        periodo: ''
    });

    // Estado para el período seleccionado

    // Estado para mostrar/ocultar panel de filtros
    const [showFilters, setShowFilters] = useState(false);

    // Función para limpiar todos los filtros
    const clearAllFilters = () => {
        setFilters({
            region: '',
            sector: '',
            amenaza: '',
            empresa: '',
            periodo: ''
        });
    };

    // Función para remover un filtro específico
    const removeFilter = (filterType) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: ''
        }));
    };

    // Función para actualizar un filtro específico
    const updateFilter = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value === 'all' ? '' : value
        }));
    };

    // Obtener filtros activos (no vacíos)
    const getActiveFilters = () => {
        return Object.entries(filters).filter(([key, value]) => value && value !== '' && value !== 'all');
    };

    // Verificar si hay filtros activos
    const hasActiveFilters = () => {
        return getActiveFilters().length > 0;
    };

    // Valor del contexto que se pasará a los componentes
    const contextValue = {
        // Estado
        filters,
        showFilters,
        
        // Funciones de estado
        setFilters,
        setShowFilters,
        
        // Funciones de utilidad
        clearAllFilters,
        removeFilter,
        updateFilter,
        getActiveFilters,
        hasActiveFilters
    };

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext;
