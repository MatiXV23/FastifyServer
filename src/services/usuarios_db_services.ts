import type { Usuario } from "../models/usuarios_model.ts";
import { PC_BadRequest, PC_NotFound, PC_NotImplemented } from "../errors/errors.ts";
import { BaseRepository } from "./baseRepository.ts";
import type { Cuenta } from "../models/cuentas_model.ts";

class UsuariosDB extends BaseRepository<Usuario> {
    
    #cuentas: Cuenta[]= [
        {userName: "Agus12", password: "user", usuario:{  nombre: "Agustin", isAdmin: false, id_usuario: 1 }},
        {userName: "Mati34", password: "user", usuario:{  nombre: "Matias", isAdmin: true, id_usuario: 2 }},
        {userName: "Brah56", password: "user", usuario:{  nombre: "Brahian", isAdmin: false, id_usuario: 3 }},
    ]

    #lastId: number = 3

    async #getUsuarioIndex(id){
        return this.#cuentas.findIndex((c)=>c.usuario.id_usuario===id)
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
        
        return this.#cuentas[index].usuario 
    }

    async create(data: Omit<Usuario, "id_usuario">): Promise<Usuario>{
        this.#lastId++
        const usuario: Usuario = {
            nombre: data.nombre,
            isAdmin: data.isAdmin,
            id_usuario: this.#lastId
        }
        const cuenta : Cuenta = { userName: "admin", password: "admin", usuario: usuario}
        this.#cuentas.push(cuenta)
        return usuario
    }

    async update(id: number, data: Omit<Usuario, "id_usuario">): Promise<Usuario>{ 
        
        const index = await this.#getUsuarioIndex(id); 

        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }

        const modUser: Usuario = {
            nombre: data.nombre,
            isAdmin: data.isAdmin,
            id_usuario: id
        }
        
        this.#cuentas[index].usuario = modUser
        return modUser
    }

    async delete(id: number): Promise<void>{
        const index = await this.#getUsuarioIndex(id); 


        if (index === -1) {
            throw new PC_NotFound(`Usuario con id ${id}, no encontrado`);
        }

        this.#cuentas.splice(index, 1);
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
        const finded: Usuario | undefined = this.#cuentas.find((c)=> {
            for (const key in data){
                if (data[key] !== c.usuario[key]) return false
            }
            return true
        })?.usuario
        
        return finded
    }

    async getAccountByCredentials(credentials: Omit<Cuenta, "usuario">): Promise<Cuenta | undefined>{
        const {password, userName} = credentials
        
        const cuenta = this.#cuentas.find((c) => {
            if (c.password === password && c.userName === userName) return true
            return false
        })

        if (!cuenta) throw new PC_NotFound("Usuario con esas Credenciales, no encontrado")

        return cuenta
    }
}

export const usuariosDB = new UsuariosDB() 