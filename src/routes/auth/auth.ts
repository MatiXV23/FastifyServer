import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NoAuthorized } from "../../errors/errors.ts";
import { type Usuario, usuarioSchema } from "../../models/usuarios_model.ts";
import type { SignOptions } from "jsonwebtoken";
import jwt from "@fastify/jwt";
import { usuariosDB } from "../../services/usuarios_db_services.ts";
import { userInfo } from "os";

const auth: FastifyPluginAsyncTypebox = async function(fastify, options: object) {
  fastify.post(
    "/login",
    {
      schema: {
        summary: "Logearse",
        description: "Esta ruta permite que el usuario se logee.",
        tags: ["auth"],
        body: Type.Object({
            userName: Type.String(),
            password: Type.String()
        }),
        response: {
            200: { tokenPrueba : Type.String()}
        },
        security: [
            { bearerAuth: []}
        ]
      },
    
    handler: async function (req, rep) {
      const { userName, password } = req.body
      const cuentaPayload = await  usuariosDB.getAccountByCredentials({ userName, password});
    
      if (!cuentaPayload) {
          throw new PC_NoAuthorized("Credenciales inválidas.");
        }

      const payload: Usuario = cuentaPayload.usuario;

      const signOptions: SignOptions = {
        expiresIn: "8h",
      }
      const token = fastify.jwt.sign(payload, signOptions);
      return { token: token}
    }
});

  fastify.get(
    "/profile",
    {
      schema: {
        summary: "Perfil del usuario",
        description: "Esta ruta permite ver el perfil del Usuario.",
        tags: ["auth"],
        response: {
        200: Type.Intersect([
    usuarioSchema,
    Type.Object({
      iat: Type.Optional(Type.Number()),
      exp: Type.Optional(Type.Number()),
      nbf: Type.Optional(Type.Number())
    })
  ]) 
      },
        security: [
            { bearerAuth: [] }
        ],
      },
      onRequest: async function(req, rep) {
        await req.jwtVerify();
      },
    handler: async function (req, rep) {
      const { nombre, isAdmin, id_usuario, iat, exp, nbf } = req.user;
      return { nombre, isAdmin, id_usuario, iat, exp, nbf };
    }
  })
}

export default auth;

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: Usuario; 
    user: Usuario & { iat?: number; exp?: number; nbf?: number }; 
  }
}