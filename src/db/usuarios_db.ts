import type { Usuario } from "../models/usuarios_model";

const usuarios: Usuario[] = [
    {  nombre: "Agustin", isAdmin: false, id_usuario: 1 },
    {  nombre: "Matias", isAdmin: true, id_usuario: 2 },
    {  nombre: "Brahian", isAdmin: false , id_usuario: 3 },
];

let last_id_usuario: number = 3
export function getUsuarios():Usuario[] {
    return usuarios
}

export function getUltimoId():number{
    return last_id_usuario
}

export function aumentarUltimoId(){
    last_id_usuario++
    return
}

export function getUsuarioPorId(id_usuario){
    return usuarios.find((u)=> u.id_usuario === id_usuario)
}

export function deleteUsuario(id_usuario){
    const usuarioIndex = usuarios.findIndex((u)=>u.id_usuario===id_usuario)
    usuarios.splice(usuarioIndex,1)
    return
}