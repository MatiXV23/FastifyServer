import type { FastifyInstance, FastifySchema } from "fastify";
import { queryUsuarioSchema, usuarioSchema } from "../../models/usuarios_model.ts";
import type { Usuario } from "../../models/usuarios_model.ts";
import { getUsuarios, getUltimoId, aumentarUltimoId, postUsuarioNuevo } from "../../db/usuarios_db.ts";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { ErrorSchema } from "../../models/shared_model.ts";

const usuariosRoutes: FastifyPluginAsyncTypebox = async function(fastify, options: object) {
  const usuarios = getUsuarios(); 
  
  fastify.get(
    "/usuarios",
    {
      schema: {
        summary: "Obtener usuarios",
        description: "Obtener el array de todos los usuarios.",
        tags: ["usuarios"],
        querystring: queryUsuarioSchema,
        response: {
            200: Type.Array(usuarioSchema),
            400: ErrorSchema,
            500: ErrorSchema
        }
      },
    },
    async function handler(req, rep) {
      throw new Error("Simulando un error inesperado.");
      const query = req.query;
      let users = getUsuarios()
      
      if (query.nombre)  users = users.filter((u) => u.nombre == query.nombre);
      if (query.id_usuario) users = users.filter((u) => u.id_usuario == query.id_usuario);
      if (query.isAdmin || query.isAdmin === false) users = users.filter((u) => u.isAdmin == query.isAdmin);

      return users;
    }
  );

  fastify.post(
    "/usuarios",
    {
      schema: {
        summary: "Crear usuarios",
        description: "Esta ruta permite crear un nuevo usuario.",
        tags: ["usuarios"],
        body: Type.Omit(usuarioSchema, ["id_usuario"]),
        response: {
          201: usuarioSchema,
          400: ErrorSchema,
          500: ErrorSchema
        }
      },
    },
    async function handler(req, rep) {
      const { nombre, isAdmin } = req.body; 
      
      if (!nombre || nombre.trim() === '') {
        throw new Error('El nombre del usuario es requerido y no puede estar vacío');
      }
      
      aumentarUltimoId();
      
      const usuario = {
        nombre: nombre.trim(),
        isAdmin, 
        id_usuario: getUltimoId()
      };
      
      postUsuarioNuevo(usuario);
    
      return rep.code(201).send(usuario);
    }
  );
}

export default usuariosRoutes;