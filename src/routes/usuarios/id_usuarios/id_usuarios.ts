import { usuarioSchema } from "../../../models/usuarios_model.ts";
import { deleteUsuario, getUsuarioPorId, putUsuario } from "../../../services/usuarios_db_services.ts";
import {Null, Type } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"; 
import { ErrorSchema } from "../../../models/shared_model.ts";
import { PC_BadRequest } from "../../../errors/errors.ts";


const usuarioRoutes:FastifyPluginAsyncTypebox= async function(fastify, options: object) {
  
  fastify.get(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Obtener usuario por id",
        description: "Obtener un usuario especifico según su ID",
        tags: ["usuarios"],
        params: Type.Pick(usuarioSchema, ["id_usuario"]),
        response: {
            200: usuarioSchema
        }
      },
    },
    async function handler(req, rep) {
      const { id_usuario } = req.params;
      return getUsuarioPorId(id_usuario);
    }
  );
  fastify.put(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Modificar usuarios",
        description: "Esta ruta permite modificar un nuevo usuario.",
        tags: ["usuarios"],
        params: Type.Pick(usuarioSchema, ["id_usuario"]),
        body: usuarioSchema,
        response: {
          204: Type.Null()
        }
      },
    },
    async function handler(req, rep) {
      const { id_usuario } = req.params; 
      const { nombre, isAdmin } = req.body; 
      const id_body = req.body.id_usuario 

      if (id_usuario !== id_body) throw new PC_BadRequest("Las ids del body y pasada por parametro, no coinciden.")
        
      putUsuario( nombre, isAdmin, id_usuario);
      return rep.code(204).send();
    }
  );
  fastify.delete(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Eliminar usuarios",
        description: "Esta ruta permite eliminar un nuevo usuario.",
        tags: ["usuarios"],
        params: Type.Pick(usuarioSchema, ["id_usuario"]),
        response: {
          204: Type.Null()
        }
      },
    },
    async function handler(req, rep) {
      const { id_usuario } = req.params;
      deleteUsuario(id_usuario);
      return rep.code(204).send();
    }
  );
}

export default usuarioRoutes;