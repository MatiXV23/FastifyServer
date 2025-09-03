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
            500: ErrorSchema,
        }
      },
    },
    async function handler(req, rep) {
      const query = req.query;
      let users = getUsuarios()
      
      fastify.log.info({
                method: req.method,
                url: req.url,
                query: query,
                userAgent: req.headers['user-agent'],
                ip: req.ip
              }, 'El cliente realizo la consulta GET');
            
              if (query.nombre) {
                users = users.filter((u) => u.nombre == query.nombre);
                fastify.log.debug({ filtro: 'nombre', valor: query.nombre }, 'Aplicando filtro por nombre');
              }

              if (query.id_usuario){
                users = users.filter((u) => u.id_usuario == query.id_usuario);
                        fastify.log.debug({ filtro: 'id_usuario', valor: query.id_usuario }, 'Aplicando filtro por ID');
              }
              
              if (query.isAdmin !== undefined) {
                users = users.filter((u) => u.isAdmin == query.isAdmin);
                fastify.log.debug({ filtro: 'isAdmin', valor: query.isAdmin }, 'Aplicando filtro por Admin');
              }

              fastify.log.info({ resultados: users.length }, 'Consulta completada exitosamente');
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
        body: Type.Omit(usuarioSchema,["id_usuario"]),
        response: {
            201: usuarioSchema,
            500: ErrorSchema
        }
      },
    },
    async function handler(req, rep) {
      const { nombre, isAdmin } = req.body; 
      aumentarUltimoId()
      fastify.log.info({
                method: req.method,
                url: req.url,
                // body: req.body,
                userAgent: req.headers['user-agent'],
                ip: req.ip
              }, 'El cliente realizo la consulta POST');

              fastify.log.info({ filtro: nombre, valor: nombre}, 'Nombre del nuevo usuario POST')
              fastify.log.info({ filtro: isAdmin, valor: isAdmin}, 'Condición de administrador del nuevo usuario POST')
              const usuario = {nombre, isAdmin, id_usuario: getUltimoId()}
              postUsuarioNuevo(usuario);
              rep.code(201);
              return usuario;
              // if (query.nombre) {
              //   users = users.filter((u) => u.nombre == query.nombre);
              //   fastify.log.debug({ filtro: 'nombre', valor: query.nombre }, 'Aplicando filtro por nombre');
              // }

      // const usuario = {nombre, isAdmin, id_usuario: getUltimoId()}
      // postUsuarioNuevo(usuario);
      // rep.code(201);
      // fastify.log.info('Fue realizada una consulta POST.'); // comentario con pino-pretty
      // return usuario;
    }
  );
}

export default usuariosRoutes;
