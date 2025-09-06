import fp from "fastify-plugin";
import jwt, { FastifyJwtNamespace, FastifyJWTOptions } from "@fastify/jwt";
import { PC_NotFound } from "../errors/errors.ts";
import { fastify, type FastifyPluginAsync } from "fastify";

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
    const secret = process.env.FASTIFY_SECRET || '';
    if (!secret) throw new PC_NotFound("Falta setear el secret.");

    await fastify.register(jwt, {secret});
});



declare module 'fastify'{
    interface FastifyInstance extends FastifyJwtNamespace<{namespace: 'security'}>{
        autenthicate(request: FastifyRequest, reply: FastifyReply): Promise<void>
    }
}

export default jwtPlugin;


// declare module 'fastify'{

// }