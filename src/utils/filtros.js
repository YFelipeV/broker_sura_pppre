import { empresas } from '../data/empresas.js';

// Funciones de filtrado para los gráficos
export const filtrarEmpresas = (filtros) => {
    return empresas.filter(empresa => {
        // Filtro por región
        if (filtros.region && filtros.region !== 'all' && empresa.region !== filtros.region) {
            return false;
        }

        // Filtro por sector
        if (filtros.sector && filtros.sector !== 'all' && empresa.sector !== filtros.sector) {
            return false;
        }
        
        // Filtro por amenaza - buscar en el array amenazas_identificadas
        if (filtros.amenaza && filtros.amenaza !== 'all') {
            const amenazasEmpresa = empresa.amenazas_identificadas || [];
            const tieneAmenaza = amenazasEmpresa.includes(filtros.amenaza);
            if (!tieneAmenaza) {
                return false;
            }
        }

        // Filtro por empresa
        if (filtros.empresa && filtros.empresa !== 'all' && Number(empresa.id) !== Number(filtros.empresa)) {
            return false;
        }

        return true;
    });
};

export const getMarcadores=(filtros={})=>{
    const empresasFiltradas = filtrarEmpresas(filtros);
    return empresasFiltradas
}


export const getSectores=()=>{
    const sectores = [...new Set(empresas.map(empresa => empresa.sector))];
    return sectores
}
// Datos para gráfico regional
export const getDatosRegionales = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    const regiones = {
        'caribe': 0,
        'antioquia': 0,
        'cordoba': 0,
        'choco': 0,
        'eje_cafetero': 0,
        'cundinamarca': 0
    };
    
    empresasFiltradas.forEach(empresa => {
        regiones[empresa.region]++;
    });
    
    return {
        labels: [
            {
                label: 'Caribe', value: 'caribe'
            },
            {
                label: 'Antioquia', value: 'antioquia'
            },
            {
                label: 'Córdoba', value: 'cordoba'
            },
            {
                label: 'Chocó', value: 'choco'
            },
            {
                label: 'Eje Cafetero', value: 'eje_cafetero'
            },
            {
                label: 'Cundinamarca', value: 'cundinamarca'
            }
        ],
        data: [
            regiones.caribe,
            regiones.antioquia,
            regiones.cordoba,
            regiones.choco,
            regiones.eje_cafetero,
            regiones.cundinamarca
        ]
    };
};

// Datos para mapa de calor - SINCRONIZADO CON TRAZABILIDAD
export const getDatosMapaCalor = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    // Generar datos dinámicos basados en las empresas filtradas
    const generarDatosDinamicos = () => {
        const numEmpresas = empresasFiltradas.length;
        
        if (numEmpresas === 0) {
            // Si no hay empresas, valores muy pequeños
            return [
                { categoria: 'Muy alta', menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 },
                { categoria: 'Alta', menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 },
                { categoria: 'Moderada', menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 },
                { categoria: 'Baja', menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 },
                { categoria: 'Muy baja', menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 }
            ];
        }
        
        // Obtener datos de trazabilidad para sincronizar
        const datosTrazabilidad = getDatosTrazabilidad(filtros);
        
        // Contar amenazas por evaluación en trazabilidad (agrupando amenazas únicas)
        const amenazasUnicas = {};
        datosTrazabilidad.forEach(dato => {
            if (!amenazasUnicas[dato.amenaza]) {
                amenazasUnicas[dato.amenaza] = dato.evaluacion2025;
            }
        });
        
        // Contar cada evaluación única
        const conteoEvaluaciones = {};
        Object.values(amenazasUnicas).forEach(evaluacion => {
            conteoEvaluaciones[evaluacion] = (conteoEvaluaciones[evaluacion] || 0) + 1;
        });
        
        // Función para distribuir valores en las columnas
        const distribuirValores = (total) => {
            if (total === 0) return { menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 };
            
            const distribucion = [];
            let restante = total;
            
            // Distribuir de manera más o menos equilibrada
            for (let i = 0; i < 5; i++) {
                if (restante <= 0) {
                    distribucion.push(0);
                } else if (i === 4) {
                    distribucion.push(restante); // El último se lleva todo lo que queda
                } else {
                    const valor = Math.min(Math.max(1, Math.floor(total / 5)), restante);
                    distribucion.push(valor);
                    restante -= valor;
                }
            }
            
            return {
                menor: distribucion[0],
                bajo: distribucion[1], 
                importante: distribucion[2],
                mayor: distribucion[3],
                significativa: distribucion[4]
            };
        };
        
        return [
            { 
                categoria: 'Muy alta', 
                ...distribuirValores(conteoEvaluaciones['Crítico'] || 0)
            },
            { 
                categoria: 'Alta', 
                ...distribuirValores(conteoEvaluaciones['Alto'] || 0)
            },
            { 
                categoria: 'Moderada', 
                ...distribuirValores(conteoEvaluaciones['Moderado'] || 0)
            },
            { 
                categoria: 'Baja', 
                ...distribuirValores(conteoEvaluaciones['Bajo'] || 0)
            },
            { 
                categoria: 'Muy baja', 
                menor: 0, bajo: 0, importante: 0, mayor: 0, significativa: 0 // Esta categoría no existe en trazabilidad
            }
        ];
    };
    
    const sectoresConEmpresas = [...new Set(empresasFiltradas.map(empresa => empresa.sector))];
    
    return {
        datos: generarDatosDinamicos(),
        empresasFiltradas: empresasFiltradas.length,
        sectores: sectoresConEmpresas,
        totalEmpresas: empresasFiltradas.length
    };
};



// Datos para TreeMap de amenazas - SOLO NOMBRES DE AMENAZAS ÚNICAS
export const getDatosAmenazas = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    if (empresasFiltradas.length === 0) {
        return [];
    }
    
    // Set para agrupar amenazas únicas (igual que trazabilidad)
    const amenazasUnicas = new Set();
    
    empresasFiltradas.forEach(empresa => {
        // Usar solo amenazas específicas de la empresa
        const amenazasEmpresa = empresa.amenazas_identificadas || [];
        
        amenazasEmpresa.forEach(amenaza => {
            amenazasUnicas.add(amenaza);
        });
    });
    
    // Convertir a array con ID y nombre
    return Array.from(amenazasUnicas).map((amenaza, index) => ({
        id: index + 1,
        name: amenaza,
        amenaza: amenaza
    }));
};

// Función para obtener datos planos de amenazas (para compatibilidad con TreeMap)
export const getDatosAmenazasPlanas = (filtros = {}) => {
    return getDatosAmenazas(filtros);
};


// Datos para trazabilidad de amenazas - BASADO EN AMENAZAS ESPECÍFICAS DE EMPRESAS
export const getDatosTrazabilidad = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    // Generar trazabilidad basada en empresas filtradas
    const amenazasCompletas = [];
    
    // Lista reducida de amenazas generales como respaldo
    const amenazasGenerales = [
        "Incendio en instalaciones",
        "Robo o hurto"
    ];
    
    empresasFiltradas.forEach(empresa => {
        // Usar amenazas específicas de la empresa si existen, sino usar generales reducidas
        const amenazasEmpresa = empresa.amenazas_identificadas && empresa.amenazas_identificadas.length > 0 
            ? empresa.amenazas_identificadas 
            : amenazasGenerales;
        
        // Evaluar TODAS las amenazas identificadas de la empresa (sin límite)
        amenazasEmpresa.forEach(amenaza => {
            // Simular datos de evaluación basados en el porcentaje de implementación
            const baseProb = 70 - (empresa.porcentaje_implementacion || 0) * 0.5;
            const baseImpacto = empresa.nivel_riesgo === 'Crítico' ? 90 : 
                              empresa.nivel_riesgo === 'Alto' ? 75 :
                              empresa.nivel_riesgo === 'Moderado' ? 60 : 45;
            
            const probabilidad = Math.max(10, Math.min(95, baseProb + Math.random() * 20 - 10));
            const impacto = Math.max(10, Math.min(95, baseImpacto + Math.random() * 20 - 10));
            
            let evaluacion;
            const riesgoCalculado = (probabilidad * impacto) / 100;
            if (riesgoCalculado >= 70) evaluacion = 'Crítico';
            else if (riesgoCalculado >= 50) evaluacion = 'Alto';
            else if (riesgoCalculado >= 30) evaluacion = 'Moderado';
            else evaluacion = 'Bajo';
            
            amenazasCompletas.push({
                amenaza: amenaza,
                evaluacion2025: evaluacion,
                probabilidad: Math.round(probabilidad),
                impacto: Math.round(impacto),
                sector: empresa.sector,
                empresaId: empresa.id,
                empresaNombre: empresa.nombre_empresa,
                riesgoCalculado: Math.round(riesgoCalculado)
            });
        });
    });
    
    return amenazasCompletas.sort((a, b) => b.riesgoCalculado - a.riesgoCalculado);
};

// Datos para ICR/IV Chart - AGRUPADO POR SECTOR
export const getDatosICRIV = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    if (empresasFiltradas.length === 0) {
        return [];
    }
    
    // Agrupar por sector
    const sectores = {};
    
    empresasFiltradas.forEach(empresa => {
        const sector = empresa.sector;
        
        if (!sectores[sector]) {
            sectores[sector] = {
                empresas: [],
                totalImplementacion: 0,
                totalRiesgo: 0
            };
        }
        
        sectores[sector].empresas.push(empresa);
        sectores[sector].totalImplementacion += (empresa.porcentaje_implementacion || 0);
        
        // Convertir nivel de riesgo a número para promediar
        let pesoRiesgo = 0;
        switch (empresa.nivel_riesgo) {
            case 'Crítico': pesoRiesgo = 4; break;
            case 'Alto': pesoRiesgo = 3; break;
            case 'Moderado': pesoRiesgo = 2; break;
            case 'Bajo': pesoRiesgo = 1; break;
            default: pesoRiesgo = 2;
        }
        sectores[sector].totalRiesgo += pesoRiesgo;
    });
    
    // Convertir a array con promedios por sector
    const data = Object.entries(sectores).map(([sectorNombre, sectorData]) => {
        const numEmpresas = sectorData.empresas.length;
        const promedioImplementacion = sectorData.totalImplementacion / numEmpresas;
        const promedioRiesgo = sectorData.totalRiesgo / numEmpresas;
        
        // Calcular ICR basado en promedio de implementación y riesgo del sector
        let baseICR = promedioImplementacion;
        
        // Ajustar ICR según promedio de riesgo del sector
        if (promedioRiesgo >= 3.5) {
            baseICR = Math.max(15, baseICR - 10); // Sector de alto riesgo promedio
        } else if (promedioRiesgo >= 2.5) {
            baseICR = Math.max(20, baseICR - 5); // Sector de riesgo medio-alto
        } else if (promedioRiesgo >= 1.5) {
            baseICR = baseICR; // Sector de riesgo moderado
        } else {
            baseICR = Math.min(85, baseICR + 10); // Sector de bajo riesgo
        }
        
        // Agregar variabilidad mínima
        const icr = Math.max(10, Math.min(90, baseICR + (Math.random() * 10 - 5)));
        const iv = 100 - icr;
        
        return {
            name: sectorNombre,
            icr: Math.round(icr * 100) / 100,
            iv: Math.round(iv * 100) / 100,
            sector: sectorNombre,
            empresasCount: numEmpresas,
            implementacionPromedio: Math.round(promedioImplementacion * 100) / 100
        };
    });
    
    return data.sort((a, b) => b.icr - a.icr); // Ordenar por ICR descendente
};

// Estadísticas generales
export const getEstadisticas = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    const totalEmpresas = empresas.length;
    const empresasRegistradas = empresasFiltradas.length;
    const porcentajeRegistros = totalEmpresas > 0 ? Math.round((empresasRegistradas / totalEmpresas) * 100) : 0;
    
    const conPPPRE = empresasFiltradas.filter(e => e.tiene_pppre).length;
    const promedioImplementacion = empresasFiltradas.length > 0 
        ? Math.round(empresasFiltradas.reduce((sum, e) => sum + e.porcentaje_implementacion, 0) / empresasFiltradas.length)
        : 0;
    
    return {
        totalEmpresas,
        empresasRegistradas,
        porcentajeRegistros,
        conPPPRE,
        promedioImplementacion
    };
};



export const getOpcionesRegiones = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas({
        ...filtros,
        region: undefined // Excluir filtro de región
    });
    
    const regionesDisponibles = [...new Set(empresasFiltradas.map(emp => emp.region))].sort();
    
    const etiquetasRegiones = {
        'caribe': 'Caribe',
        'antioquia': 'Antioquia',
        'cordoba': 'Córdoba',
        'choco': 'Chocó',
        'eje_cafetero': 'Eje Cafetero',
        'cundinamarca': 'Cundinamarca'
    };
    
    return [
        { value: 'all', label: 'Todas las regiones' },
        ...regionesDisponibles.map(region => ({
            value: region,
            label: etiquetasRegiones[region] || region
        }))
    ];
};

export const getOpcionesTipoEmpresa = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas({
        ...filtros,
        tipoEmpresa: undefined // Excluir filtro de tipo empresa
    });
    
    const tiposDisponibles = [...new Set(empresasFiltradas.map(emp => emp.tipo_empresa))].sort();
    
    return [
        { value: 'all', label: 'Todos los tipos' },
        ...tiposDisponibles.map(tipo => ({
            value: tipo,
            label: tipo
        }))
    ];
};

export const getOpcionesNivelRiesgo = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas({
        ...filtros,
        nivelRiesgo: undefined // Excluir filtro de nivel de riesgo
    });
    
    const nivelesDisponibles = [...new Set(empresasFiltradas.map(emp => emp.nivel_riesgo))].sort();
    
    return [
        { value: 'all', label: 'Todos los niveles' },
        ...nivelesDisponibles.map(nivel => ({
            value: nivel,
            label: nivel
        }))
    ];
};

export const getOpcionesAmenazas = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas({
        ...filtros,
        amenaza: undefined // Excluir filtro de amenaza
    });
    
    // Recopilar todas las amenazas de todas las empresas
    const todasLasAmenazas = new Set();
    empresasFiltradas.forEach(empresa => {
        const amenazasEmpresa = empresa.amenazas_identificadas || [];
        amenazasEmpresa.forEach(amenaza => {
            todasLasAmenazas.add(amenaza);
        });
    });
    
    const amenazasDisponibles = Array.from(todasLasAmenazas).sort();
    
    return [
        { value: 'all', label: 'Todas las amenazas' },
        ...amenazasDisponibles.map(amenaza => ({
            value: amenaza,
            label: amenaza
        }))
    ];
};

// Función para obtener estadísticas de filtros aplicados
export const getEstadisticasFiltros = (filtros = {}) => {
    const todasLasEmpresas = empresas.length;
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    return {
        total: todasLasEmpresas,
        filtradas: empresasFiltradas.length,
        porcentaje: todasLasEmpresas > 0 ? Math.round((empresasFiltradas.length / todasLasEmpresas) * 100) : 0,
        sectores: [...new Set(empresasFiltradas.map(emp => emp.sector))].length,
        regiones: [...new Set(empresasFiltradas.map(emp => emp.region))].length,
        conPPPRE: empresasFiltradas.filter(emp => emp.tiene_pppre).length
    };
};

// Datos para Implementación de PARE por empresa filtrada
export const getDatosImplementacion = (filtros = {}) => {
    const empresasFiltradas = filtrarEmpresas(filtros);
    
    if (empresasFiltradas.length === 0) {
        return {
            implementacionPARE: 0,
            marcoTeorico: 0,
            total: 0,
            componentes: {
                establecimientoContexto: 0,
                componenteRespuesta: 0,
                componenteInformativo: 0,
                seguimientoVerificacion: 0,
                panoramaRiesgos: 0
            },
            componentesMarcoTeorico: {
                establecimientoContexto: 0,
                componenteRespuesta: 0,
                componenteInformativo: 0,
                seguimientoVerificacion: 0
            }
        };
    }
    
    // Calcular promedios de implementación REALES de las empresas filtradas
    const promedioImplementacion = empresasFiltradas.reduce((sum, emp) => 
        sum + (emp.porcentaje_implementacion || 0), 0) / empresasFiltradas.length;
    
    
    // Si el promedio es muy bajo, usar valores mínimos realistas
    const promedioAjustado = Math.max(20, promedioImplementacion); // Mínimo 20% para que sea realista
    
    // Usar datos REALES basados en el promedio de las empresas (con mínimo garantizado)
    const implementacionPARE = Math.max(15, Math.round(promedioAjustado * 0.9)); // PARE similar al promedio real
    const marcoTeorico = Math.max(25, Math.round(promedioAjustado * 1.1)); // Marco teórico ligeramente mejor
    const total = Math.round((implementacionPARE + marcoTeorico) / 2);
    
    // Componentes de PARE basados en el promedio REAL (con mínimos garantizados)
    const componentes = {
        establecimientoContexto: Math.max(15, Math.round(promedioAjustado * 0.8)),
        componenteRespuesta: Math.max(20, Math.round(promedioAjustado * 1.2)), // Suele estar mejor
        componenteInformativo: Math.max(15, Math.round(promedioAjustado * 1.0)),
        seguimientoVerificacion: Math.max(10, Math.round(promedioAjustado * 0.6)), // Suele estar peor
        panoramaRiesgos: Math.max(8, Math.round(promedioAjustado * 0.4)) // Suele estar peor
    };
    
    // Componentes de Marco Teórico basados en el promedio REAL (con mínimos garantizados)
    const componentesMarcoTeorico = {
        establecimientoContexto: Math.min(100, Math.max(25, Math.round(promedioAjustado * 1.1))),
        componenteRespuesta: Math.min(100, Math.max(25, Math.round(promedioAjustado * 1.0))),
        componenteInformativo: Math.min(100, Math.max(25, Math.round(promedioAjustado * 1.1))),
        seguimientoVerificacion: Math.min(100, Math.max(15, Math.round(promedioAjustado * 0.75)))
    };
    
    return {
        implementacionPARE: Math.max(0, Math.min(100, implementacionPARE)),
        marcoTeorico: Math.max(0, Math.min(100, marcoTeorico)),
        total: Math.max(0, Math.min(100, total)),
        componentes,
        componentesMarcoTeorico,
        numeroEmpresas: empresasFiltradas.length,
        promedioReal: Math.round(promedioImplementacion) // Para debug
    };
};
