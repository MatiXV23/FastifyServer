import type { Usuario } from "../models/usuarios_model.ts";
import { PC_NotFound, PC_NotImplemented } from "../errors/errors.ts";
import { BaseRepository } from "./baseRepository.ts";
import fastify from "fastify";
import { Null } from "@fastify/type-provider-typebox";
import type { Cuenta } from "../models/cuentas_model.ts";


class UsuariosDB extends BaseRepository<Usuario> {
    
    #cuentas: Cuenta[]= [
        {userName: "Agus12", password: "user", usuario:{  nombre: "Agustin", isAdmin: false, id_usuario: 1 }},
        {userName: "Mati34", password: "user", usuario:{  nombre: "Matias", isAdmin: true, id_usuario: 2 }},
        {userName: "Brah56", password: "user", usuario:{  nombre: "Brahian", isAdmin: false, id_usuario: 3 }},
    ]

    #lastId: number = 3

    async #getUsuarioIndex(id){
        const usuarios = await this.getAll()
        return usuarios.findIndex((u)=>u.id_usuario===id)

    }

    async getAll(): Promise<Usuario[]>{
        const usuarios: Usuario[] = []
        for (const cuenta of this.#cuentas){
            usuarios.push(cuenta.usuario)
        }
        return usuarios
    }
    
    async getById(id:number): Promise<Usuario>{
        const index =  await this.#getUsuarioIndex(id); 

        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }
        const usuarios = await this.getAll()
        return usuarios[index] 
    }

    async create(data: Partial<Usuario>): Promise<Usuario>{
        this.#lastId++
        const usuario: Usuario = {
            nombre: data.nombre!,
            isAdmin: data.isAdmin!,
            id_usuario: this.#lastId
        }
        const cuenta : Cuenta = { userName: "admin", password: "admin", usuario: usuario}
        this.#cuentas.push(cuenta)
        return usuario
    }
    // arreglar
    async update(id: number, data: Partial<Usuario>): Promise<Usuario>{ 
        throw new PC_NotImplemented()
        const index = await this.#getUsuarioIndex(id); 

        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }

        const modUser: Usuario = {
            nombre: data.nombre!,
            isAdmin: data.isAdmin!,
            id_usuario: id
        }
        const usuarios = await this.getAll()
        usuarios[index] = modUser
        return modUser
    }
    // arreglar
    async delete(id: number): Promise<void>{
        throw new PC_NotImplemented()
        const index = await this.#getUsuarioIndex(id); 

        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }

        //this.#usuarios.splice(index, 1);
    }

    async findAll(data?: Partial<Usuario>): Promise<Usuario[]> {
        let result: Usuario[] = await this.getAll()

        if (!data) return result
        
        for (const key in data){
            if (data[key] === undefined) continue
            result = result.filter((u)=> u[key] === data[key])
        }
        return result
    }

    async getFirstBy(data: Partial<Usuario>): Promise<Usuario | undefined> {
        const usuarios = await this.getAll()
        const finded: Usuario | undefined = usuarios.find((u)=> {
            for (const key in data){
                if (data[key] !== u[key]) return false
            }
            return true
        })
        
        return finded
    }
}

export const usuariosDB = new UsuariosDB() 