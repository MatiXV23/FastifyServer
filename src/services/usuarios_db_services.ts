import type { Usuario } from "../models/usuarios_model.ts";
import { PC_NotFound } from "../errors/errors.ts";
import { BaseRepository } from "./baseRepository.ts";
import fastify from "fastify";
import { Null } from "@fastify/type-provider-typebox";


class UsuariosDB extends BaseRepository<Usuario> {
    #usuarios: Usuario[] = [
        {  nombre: "Agustin", isAdmin: false, id_usuario: 1 },
        {  nombre: "Matias", isAdmin: true, id_usuario: 2 },
        {  nombre: "Brahian", isAdmin: false , id_usuario: 3 },
    ]

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

    async findAll(data?: Partial<Usuario>): Promise<Usuario[]> {
        let result: Usuario[] = this.#usuarios

        if (!data) return result
        
        for (const key in data){
            if (data[key] === undefined) continue
            result = result.filter((u)=> u[key] === data[key])
        }
        return result
    }

    async getFirstBy(data: Partial<Usuario>): Promise<Usuario | undefined> {
        
        const finded: Usuario | undefined = this.#usuarios.find((u)=> {
            for (const key in data){
                if (data[key] !== u[key]) return false
            }
            return true
        })
        
        return finded
    }
}

export const usuariosDB = new UsuariosDB() 