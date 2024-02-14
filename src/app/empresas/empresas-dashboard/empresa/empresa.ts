export interface Empresa {
  id: number;
  nombre: string;
  imagen: string;
  nota: number;
  cif: string;
  descripcion: string;
  telefono: string;
  email: string;
  ubicacion: {
    direccion: string;
    provincia: string;
    localidad: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
  };
  vacantes: number;
  horario: {
    inicio: string;
    fin: string;
  };
  categorias: string[];
  servicios: string[];
}
