// Importa las funciones 'atom' y 'map' de 'nanostores'
import { atom } from 'nanostores'



// Crea un nuevo mapa para almacenar el idioma seleccionado
export const language = atom({
    lang: "es"
})

// Exporta una función para obtener el estado actual de la tienda
export function getLanguageState() {

    return {
        language: language.get(),
     
    }
}