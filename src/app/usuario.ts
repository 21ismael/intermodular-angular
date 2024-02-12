export interface Usuario {
    id: number;
    name: string;
    dni: string;
    roles: string[] | string;
    token: string;
    email: string;
    password: string;
    login: string;
}
