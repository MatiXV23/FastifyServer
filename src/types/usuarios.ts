export type Usuario = {
    nombre: string;
    isAdmin: boolean;
    id_usuario: number;
};

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

// SCHEMAS

export const usuarioSchema = {
    type: "object",
    properties: {
        nombre: {type: "string", minLength: 2},
        isAdmin: {type: "boolean"},
        id_usuario : {type: "number", minimum:1},
    },
    required: ["nombre", "isAdmin", "id_usuario"],
    additionalProperties: false,
}

export const usuarioPostSchema = {
    type: "object",
    properties: {
        nombre: {type: "string", minLength: 2},
        isAdmin: {type: "boolean"},
    },
    required: ["nombre", "isAdmin"],
    additionalProperties: false,
}