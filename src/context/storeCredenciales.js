// Importa las funciones 'atom' y 'map' de 'nanostores'
import { atom } from 'nanostores'



//* Creando un almacen para el contexto */

export const storageContext = atom({
    selectAllCredencial:false,
    credencialesSelect:[],
    credenciales:[],
    eventos:[],
})

//* creando funcionees  */
export function getSelectAllCredencial() {
const currenState=storageContext.get()

    return currenState
}

// Función para manejar el cambio en el checkbox "selectAllCredencial"
