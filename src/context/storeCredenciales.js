// Importa las funciones 'atom' y 'map' de 'nanostores'
import { atom } from 'nanostores'



// Crea un nuevo mapa para almacenar un nuevo contexto

export const storageContext = atom({
    selectAllCredencial:false,
    credencialesSelect:[]
})

// Exporta una función para obtener el estado actual de la conctexto
export function getSelectAllCredencial() {
const currenState=storageContext.get()

    return currenState
}

// Función para manejar el cambio en el checkbox "selectAllCredencial"
