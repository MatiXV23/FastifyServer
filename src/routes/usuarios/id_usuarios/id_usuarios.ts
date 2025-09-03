import { usuarioSchema } from "../../../models/usuarios_model.ts";
import { deleteUsuario, getUsuarioPorId, putUsuario } from "../../../services/usuarios_db_services.ts";
import {Null, Type } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"; 
import { ErrorSchema } from "../../../models/shared_model.ts";


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
            200: usuarioSchema,
            404: ErrorSchema,
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
        body: Type.Omit(usuarioSchema, ["id_usuario"]),
        response: {
          204: Type.Null(),
          404: ErrorSchema,
        }
      },
    },
    async function handler(req, rep) {
        const { id_usuario} = req.params; 
        const { nombre, isAdmin } = req.body; 
        
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
          204: Type.Null(),
          404: ErrorSchema,
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