import { usuarioSchema } from "../../../models/usuarios_model.ts";
import { deleteUsuario, getUsuarioIndex, getUsuarioPorId, getUsuarios, putUsuario } from "../../../db/usuarios_db.ts";
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
        const usuarios = getUsuarios();
        const { id_usuario } = req.params;
        const usuario = getUsuarioPorId(id_usuario);
        
        fastify.log.info({
                method: req.method,
                url: req.url,
                // query: query,
                userAgent: req.headers['user-agent'],
                ip: req.ip
              }, 'El cliente realizo la consulta GET para un usuario especifico.');

              if (usuario !== undefined){
                fastify.log.info({ filtro: 'Usuario', valor: usuario }, 'El usuario fue encontrado por id con exito');
                return usuario;
              } else if(usuario == undefined) {
                fastify.log.error({ error: rep.statusCode, query: req.query }, 'Error al procesar consulta de usuarios');
                throw new Error('Error al obtener usuarios');
                // rep.code(404).send({
                // error: "Usuario no encontrado",
                // statusCode: 404,
                // message: "Usuario no encontrado"
              // });
              }
              
              // fastify.log.info('Fue realizada una consulta GET ID_USUARIOS.'); // comentario con pino-pretty
    //     return (usuario) ? usuario  : rep.code(404).send({
    //       error: "Usuario no encontrado",
    //       statusCode: 404,
    //       message: "Usuario no encontrado"
    //     });
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
        const usuarioIndex = getUsuarioIndex(id_usuario);

        fastify.log.info({
                method: req.method,
                url: req.url,
                // query: query,
                userAgent: req.headers['user-agent'],
                ip: req.ip
              }, 'El cliente realizo la consulta PUT para un usuario especifico.');

        if(usuarioIndex===-1) 
        {
          fastify.log.error({ error: rep.statusCode, query: req.query }, 'Error al procesar consulta de usuarios');
                throw new Error('Error al obtener usuarios');
        }
        //   return rep.code(404).send({
        //   error: "Usuario no encontrado",
        //   statusCode: 404,
        //   message: "Usuario no encontrado"
        // });
        putUsuario(usuarioIndex, nombre, isAdmin, id_usuario);
        fastify.log.info({ filtro: 'Nombre', valor: nombre }, 'Nombre del usuario PUT');
        fastify.log.info({ filtro: 'Administrador', valor: isAdmin }, 'Condicion de administrador del usuario PUT');
        fastify.log.info({ filtro: 'Id', valor: id_usuario }, 'Id del usuario modificado con PUT');
        // fastify.log.info('Fue realizada una consulta PUT.'); // comentario con pino-pretty
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