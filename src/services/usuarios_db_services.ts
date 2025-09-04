import type { Usuario } from "../models/usuarios_model.ts";
import { PC_NotFound } from "../errors/errors.ts";
import { BaseRepository } from "./baseRepository.ts";


class UsuariosDB extends BaseRepository<Usuario> {
    #usuarios: Usuario[] = [
        {  nombre: "Agustin", isAdmin: false, id_usuario: 1 },
        {  nombre: "Matias", isAdmin: true, id_usuario: 2 },
        {  nombre: "Brahian", isAdmin: false , id_usuario: 3 },
    ];
    #lastId: number = 3

    #getUsuarioIndex(id){
        return this.#usuarios.findIndex((u)=>u.id_usuario===id)
    }

    async getAll(): Promise<Usuario[]>{
        return this.#usuarios
    }
    
    async getById(id:number): Promise<Usuario>{
        const index = this.#getUsuarioIndex(id); 

        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }
        
        return this.#usuarios[index]
    }

    async create(data: Partial<Usuario>): Promise<Usuario>{
        this.#lastId++
        const usuario: Usuario = {
            nombre: data.nombre!,
            isAdmin: data.isAdmin!,
            id_usuario: this.#lastId
        }

        this.#usuarios.push(usuario)
        return usuario
    }

    async update(id: number, data: Partial<Usuario>): Promise<Usuario>{
        const index = this.#getUsuarioIndex(id); 

        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }

        const modUser: Usuario = {
            nombre: data.nombre!,
            isAdmin: data.isAdmin!,
            id_usuario: id
        }

        return this.#usuarios[index] = modUser
    }

    async delete(id: number): Promise<void>{
        const index = this.#getUsuarioIndex(id); 

    if (index === -1) {
        throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
    }

    this.#usuarios.splice(index, 1);
    }
}

export const usuariosDB = new UsuariosDB() 

// const usuarios: Usuario[] = [
//     {  nombre: "Agustin", isAdmin: false, id_usuario: 1 },
//     {  nombre: "Matias", isAdmin: true, id_usuario: 2 },
//     {  nombre: "Brahian", isAdmin: false , id_usuario: 3 },
// ];

// let last_id_usuario: number = 3

// export function getUsuarios():Usuario[] {
//     return usuarios
// }

// function getUltimoId():number{
//     return last_id_usuario
// }

// function aumentarUltimoId(){
//     last_id_usuario++
//     return
// }

// export function getUsuarioPorId(id_usuario){
//     const index = getUsuarioIndex(id_usuario); 

//     if (index === -1) {
//         throw new PC_NotFound(`Usuario con id ${id_usuario}, no encontrado`);
//     }
    
//     return usuarios[index]
// }

// function getUsuarioIndex(id_usuario){
//     return usuarios.findIndex((u)=>u.id_usuario===id_usuario)
// }

// export function deleteUsuario(id_usuario) {
//     const index = getUsuarioIndex(id_usuario); 

//     if (index === -1) {
//         throw new PC_NotFound(`Usuario con id ${id_usuario}, no encontrado`);
//     }

//     usuarios.splice(index, 1);
// }

// export function postUsuarioNuevo(name, is_admin){
//     aumentarUltimoId()
//     const usuario: Usuario = {
//         nombre: name,
//         isAdmin: is_admin,
//         id_usuario: getUltimoId()
//     }

//     usuarios.push(usuario)
//     return usuario
// }

// export function putUsuario(nombre, isAdmin, id_usuario){
//     const index = getUsuarioIndex(id_usuario); 

//     if (index === -1) {
//         throw new PC_NotFound(`Usuario con id ${id_usuario}, no encontrado`);
//     }

//     const modUser: Usuario = {
//         nombre: nombre,
//         isAdmin: isAdmin,
//         id_usuario: id_usuario
//     }
//     usuarios[index] = modUser
//     return
// }