export interface Resena {
    id: string;
    formulario_id: number;
    preguntas: {
        id: number,
        titulo: string,
        tipo: string,
        orden: number,
        created_at: string,
        updated_at: string,
        pivot: {
            formulario_id: number,
            pregunta_id: number
        }
    }[];
}