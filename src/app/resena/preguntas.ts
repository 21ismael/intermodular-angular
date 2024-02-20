export interface Pregunta {
    id: number;
    titulo: string;
    tipo: string;
    orden: number;
    created_at: string,
    updated_ate: string,
    pivoy:{
        formulario_id:number,
        pregunta_id:number
    }
}