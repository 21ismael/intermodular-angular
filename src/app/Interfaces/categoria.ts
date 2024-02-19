import { Servicio } from "./servicio";

export interface Categoria {
    id: number,
    nombre: string,
    descripcion: string,
    servicios: Servicio[]
}
