import type { FastifyInstance, FastifySchema } from "fastify";
import { usuarioSchema } from "../../../models/usuarios_model.ts";
import { usuarios } from "../../../models/db_models.ts";
import { Type } from "@fastify/type-provider-typebox";

const usuarioRoutes = async function(fastify: FastifyInstance, options: object) {
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
        
        return (usuario) ? usuario : rep.code(404).send({ error: "Usuario no encontrado" });
    }
    
  );
  fastify.put(
    "/usuarios/:id_usuario",
    {
      schema: {
        summary: "Modificar usuarios",
        description: "Esta ruta permite modificar un nuevo usuario.",
        tags: ["usuarios"],
        params: {
        type: "object",
        properties: {
          id_usuario: { type: "number", minimum: 1 },
        },
        required: ["id_usuario"],
        },
        body: usuarioPostSchema,
        response: 204
      } as FastifySchema,
    },
    async function handler(req, rep) {
        const { id_usuario} = req.params as {id_usuario: number}; 
        const { nombre, isAdmin } = req.body as {nombre: "String", isAdmin: boolean}; 
        const usuarioIndex = usuarios.findIndex((u)=>u.id_usuario===id_usuario);

        if(usuarioIndex===-1) return rep.code(404).send({ error: "Usuario no encontrado" });
        
        usuarios[usuarioIndex]={nombre, isAdmin, id_usuario};
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
        params: {
        type: "object",
        properties: {
          id_usuario: { type: "number", minimum: 1 },
        },
        required: ["id_usuario"],
        },
        response: 204
      } as FastifySchema,
    },
    async function handler(req, rep) {
        const { id_usuario } = req.params as {id_usuario: number}; 
        
        const usuarioIndex = usuarios.findIndex((u)=>u.id_usuario===id_usuario);
        
        if (usuarioIndex===-1) return rep.code(404).send({ error: "Usuario no encontrado" })
        
        usuarios.splice(usuarioIndex,1);
        return rep.code(204).send()
        
    }
  );
}

export default usuarioRoutes;