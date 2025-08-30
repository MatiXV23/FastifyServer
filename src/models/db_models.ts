import type { Usuario } from "./usuarios_model";

export const usuarios: Usuario[] = [
    {  nombre: "Agustin", isAdmin: false, id_usuario: 1 },
    {  nombre: "Matias", isAdmin: true, id_usuario: 2 },
    {  nombre: "Brahian", isAdmin: false , id_usuario: 3 },
];

let last_id_usuario: number = 3

export function getUltimoId():number{
    return last_id_usuario
}

export function aumentarUltimoId(){
    last_id_usuario++
}