function buscarRutaMasCorta(grafoDeMetro, estacionInicio, estacionDestino) {
    if (estacionInicio === estacionDestino) return [estacionInicio];
    if (!grafoDeMetro[estacionInicio] || !grafoDeMetro[estacionDestino]) return null;

 
    const rutasPendientes = [[estacionInicio, [estacionInicio]]];
    const estacionesExploradas = new Set([estacionInicio]);
    
    let indiceCola = 0; 

    //BFS
    while (indiceCola < rutasPendientes.length) {
        const [estacionActual, rutaActual] = rutasPendientes[indiceCola];
        indiceCola++; 

        const conexionesDirectas = grafoDeMetro[estacionActual] || [];

        for (const estacionVecina of conexionesDirectas) {
            // Si visito ignora
            if (estacionesExploradas.has(estacionVecina)) continue;

            // encontro retorno
            if (estacionVecina === estacionDestino) {
                return [...rutaActual, estacionVecina];
            }

            
            estacionesExploradas.add(estacionVecina);
            rutasPendientes.push([estacionVecina, [...rutaActual, estacionVecina]]);
        }
    }

    // si da la vuelta y no encuentra nada retorna
    return null;
}


const mapaMetro = {
    "Portal Norte":   ["Toberín"],
    "Toberín":        ["Portal Norte", "Calle 142"],
    "Calle 142":      ["Toberín", "Calle 127"],
    "Calle 127":      ["Calle 142", "Pepe Sierra", "Alcalá"],
    "Pepe Sierra":    ["Calle 127", "Niza"],
    "Alcalá":         ["Calle 127", "Calle 100"],
    "Niza":           ["Pepe Sierra", "Calle 100"],
    "Calle 100":      ["Alcalá", "Niza", "Virrey"],
    "Virrey":         ["Calle 100", "Centro"],
    "Centro":         ["Virrey", "Portal Sur"],
    "Portal Sur":     ["Centro"],
};

console.log(buscarRutaMasCorta(mapaMetro, "Calle 142", "Virrey"));