import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NoAuthorized } from "../../errors/errors.ts";
import { type Usuario, usuarioSchema } from "../../models/usuarios_model.ts";
import type { SignOptions } from "jsonwebtoken";

const auth: FastifyPluginAsyncTypebox = async function(fastify, options: object) {
  fastify.post(
    "/login",
    {
      schema: {
        summary: "Logearse",
        description: "Esta ruta permite que el usuario se logee.",
        tags: ["auth"],
        body: Type.Object({
            usuario: Type.String(),
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
      const { usuario, password } = req.body
      if (password != 'clave' || !usuario) 
        throw new PC_NoAuthorized("No estás autorizado.");
    
      const payload: Usuario = {
        nombre: "Bolacha",
        isAdmin: true,
        id_usuario: 0
      }
      const signOptions: SignOptions = {
        expiresIn: "8h",
        notBefore: 100,
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
        security: [
            { bearerAuth: [] }
        ],
      },
      onRequest: async function(req, rep) {
        await req.jwtVerify();
      },
    handler: async function (req, rep) {
      return req.user;
    }
})
}

export default auth;