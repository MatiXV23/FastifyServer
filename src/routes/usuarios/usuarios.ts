import { queryUsuarioSchema, usuarioSchema } from "../../models/usuarios_model.ts";
import { usuariosDB } from "../../services/usuarios_db_services.ts";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { PC_BadRequest } from "../../errors/errors.ts";

const usuariosRoutes: FastifyPluginAsyncTypebox = async function(fastify, options: object) { 
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Obtener usuarios",
        description: "Obtener el array de todos los usuarios.",
        tags: ["usuarios"],
        querystring: queryUsuarioSchema,
        response: {
            200: Type.Array(usuarioSchema)
        }
      },
    },
    async function handler(req, rep) {
      const query = req.query;

      return usuariosDB.findAll({nombre: query.nombre, isAdmin: query.isAdmin, id_usuario: query.id_usuario})
    }
  );
  fastify.post(
    "/usuarios",
    {
      schema: {
        summary: "Crear usuarios",
        description: "Esta ruta permite crear un nuevo usuario.",
        tags: ["usuarios"],
        body: Type.Omit(usuarioSchema,["id_usuario"]),
        response: {
            201: usuarioSchema
        }
      },
    },
    async function handler(req, rep) {
      const { nombre, isAdmin } = req.body;
      const usuario = await usuariosDB.create({nombre:nombre, isAdmin:isAdmin});
      rep.code(201);
      return usuario;
    }
  );
}
export default usuariosRoutes;
