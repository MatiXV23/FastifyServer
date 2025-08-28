import type { FastifyInstance, FastifySchema } from "fastify";

type Usuarios = {
    nombre: string;
    isAdmin: boolean;
    id_usuario: number;
};

const usuarios: Usuarios[] = [
    {  nombre: "Agustin", isAdmin: false, id_usuario: 1 },
    {  nombre: "Matias", isAdmin: true, id_usuario: 2 },
    {  nombre: "Brahian", isAdmin: false , id_usuario: 3 },
];

let ultimoId = usuarios[usuarios.length - 1].id_usuario;

const usuarioSchema = {
    type: "object",
    properties: {
        nombre: {type: "string", minLength: 2},
        isAdmin: {type: "boolean"},
        id_usuario : {type: "number", minimum:1},
    },
    required: ["nombre", "isAdmin", "id_usuario"],
    additionalProperties: false,
}
const usuarioPostSchema = {
    type: "object",
    properties: {
        nombre: {type: "string", minLength: 2},
        isAdmin: {type: "boolean"},
    },
    required: ["nombre", "isAdmin"],
    additionalProperties: false,
}

async function usuariosRoutes(fastify: FastifyInstance, options: object) {
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Obtener usuarios",
        description: "Obtener el array de todos los usuarios.",
        tags: ["usuarios"],
        querystring: {
            type: "object",
            properties: {
                nombre: {type: "string", minLength: 2},
                // isAdmin: {type: "boolean"},
                // id_usuario : {type: "number", minimum: 4},
            },
        },
        response: {
            200: {
                type: "array",
                items: usuarioSchema,
            }
        }
      } as FastifySchema,
    },
    async function handler(req, rep) {
        const query = req.query as {nombre:string}; 
         if (query.nombre) return usuarios.filter((u) => u.nombre == query.nombre);
      return usuarios;
    }
  );
  fastify.get(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Obtener usuario por id",
        description: "Obtener un usuario especifico según su ID",
        tags: ["usuarios"],
        params: {
        type: "object",
        properties: {
          id_usuario: { type: "number", minimum: 1 },
        },
        required: ["id_usuario"],
      },
        response: {
            200: usuarioSchema,
        }
      } as FastifySchema,
    },
    async function handler(req, rep) {
        const { id_usuario } = req.params as { id_usuario: number };
        const usuario = usuarios.find((u) => u.id_usuario === id_usuario);
        if (usuario) {
          return usuario;
        } else {
          return rep.code(404).send({ error: "Usuario no encontrado" });
        }
    }
  );
  fastify.post(
    "/usuarios",
    {
      schema: {
        summary: "Crear usuarios",
        description: "Esta ruta permite crear un nuevo usuario.",
        tags: ["usuarios"],
        body: usuarioPostSchema,
        response: {
            201: usuarioSchema,
        }
      } as FastifySchema,
    },
    async function handler(req, rep) {
        const { nombre, isAdmin } = req.body as Usuarios; 
        ultimoId++
        const usuario = {nombre, isAdmin, id_usuario: ultimoId}
        usuarios.push(usuario);
        rep.code(201);
      return usuario;
    }
  );
}

  export default usuariosRoutes;
