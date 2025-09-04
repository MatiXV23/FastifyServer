import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NoAuthorized } from "../../errors/errors.ts";
import { getUsuarioPorId } from "../../services/usuarios_db_services.ts";
import { usuarioSchema } from "../../models/usuarios_model.ts";


const tokenPrueba = Buffer.from(
    JSON.stringify(
        getUsuarioPorId(2)
    )
).toString("base64")

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
        })
      },
    },
    async function handler(req, rep) {
      const { usuario, password } = req.body
      if (password === 'clave') return { token: tokenPrueba}

      throw new PC_NoAuthorized("Credenciales Incorrectas")
    }
  );

  fastify.get(
    "/profile",
    {
      schema: {
        summary: "Ver perfil del Usuario",
        description: "Esta ruta permite que ver el perfil del Usuario.",
        tags: ["auth"],
        security: [
            { bearerAuth: [] }
        ],
        response: {
            200: usuarioSchema
        }
      },
    },
    async function handler(req, rep) {
      const token = req.headers.authorization?.slice(7)
      
      if (!token) throw new PC_NoAuthorized()
      const user = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))
      rep.code(200)
      return user
    }
  );

  
}
export default auth;