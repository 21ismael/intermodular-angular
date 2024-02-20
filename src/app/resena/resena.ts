import { Empresa } from "../empresas/empresas-dashboard/empresa/empresa";
import { Pregunta } from "./preguntas";

export interface Resena {
    id: string;
    formulario_id: number;
    empresa: Empresa;
    preguntas: Pregunta[];
}