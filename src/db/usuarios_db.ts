import type { Usuario } from "../models/usuarios_model.ts";
import { PC_NotFound } from "../errors/errors.ts";

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
    const usuario = usuarios.find((u)=> u.id_usuario === id_usuario)

    if (usuario) return usuario
    throw new PC_NotFound(`Usuario con id ${id_usuario}, no encontrado`)
}

export function getUsuarioIndex(id_usuario){
    return usuarios.findIndex((u)=>u.id_usuario===id_usuario)
    const index = usuarios.findIndex((u) => u.id_usuario === id_usuario);
    if (index === -1) {
        throw new Error("Usuario no encontrado");
    }
    return index;
}

export function deleteUsuario(id_usuario) {
  const index = getUsuarioIndex(id_usuario); 
  if (index === -1) {
    throw new PC_NotFound(`Usuario con id ${id_usuario}, no encontrado`);
  }
  usuarios.splice(index, 1);
}

export function postUsuarioNuevo(postUser){
    usuarios.push(postUser)
    return
}

export function putUsuario(idx_usuario, nombre, isAdmin, id_usuario){
    usuarios[idx_usuario] = {nombre, isAdmin, id_usuario} 
    return
}