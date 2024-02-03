export interface Empresa {
  id: number;
  nombre: string;
  imagen: string;
  telefono: string;
  correo: string;
  direccion: {
    calle: string;
    provincia: string;
    localidad: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
  };
  categorias: string[];
  servicios: string[];
  vacantes: number;
  horario: { inicio: string, fin: string };
}

/*
 id: number;
  nombre: string;
  imagen: string;
  telefono: string;
  correo: string;
  direccion: {
    calle: string;
    provincia: string;
    poblacion: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
  };
  vacantes: number;
  categorias: string[];
  horario: { inicio: string; fin: string };
  nota: string;
  estudiante: boolean;
  profesor: boolean;
*/
