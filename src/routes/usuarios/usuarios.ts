import type { FastifyInstance, FastifySchema } from "fastify";
import { usuarioSchema } from "../../models/usuarios_model.ts";
import type { Usuario } from "../../models/usuarios_model.ts";
import { usuarios, getUltimoId, aumentarUltimoId } from "../../models/db_models.ts";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";

const usuariosRoutes: FastifyPluginAsyncTypebox = async function(fastify: FastifyInstance, options: object) {
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
                isAdmin: {type: "boolean"},
                id_usuario : {type: "number", minimum: 1},
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
      const query = req.query as {nombre?:string, isAdmin?: boolean, id_usuario?: number};
      let users = usuarios
      
      if (query.nombre)  users = users.filter((u) => u.nombre == query.nombre);
      if (query.id_usuario) users = users.filter((u) => u.id_usuario == query.id_usuario);
      if (query.isAdmin || query.isAdmin === false) users = users.filter((u) => u.isAdmin == query.isAdmin);

      return (users.length !== usuarios.length) ? users : usuarios;
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
      const { nombre, isAdmin } = req.body as Usuario; 
      aumentarUltimoId()

      const usuario = {nombre, isAdmin, id_usuario: getUltimoId()}
      usuarios.push(usuario);
      rep.code(201);
      return usuario;
    }
  );
}

export default usuariosRoutes;
