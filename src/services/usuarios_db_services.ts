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