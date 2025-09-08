import Fastify from "fastify";
import usuariosRoutes from "./src/routes/usuarios/usuarios.ts";
import swagger from "./src/plugins/swagger.ts";
import usuarioRoutes from "./src/routes/usuarios/id_usuarios/id_usuarios.ts";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { PC_Error, PC_InternalServerError } from "./src/errors/errors.ts";
import auth from "./src/routes/auth/auth.ts";
import jwtPlugin from "./src/plugins/jwt.ts";

const fastify = Fastify({
    logger: {
        level: process.env.FASTIFY_LOG_LEVEL || 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss Z'
            }
        }
    }
}).withTypeProvider<TypeBoxTypeProvider>()

await fastify.register(swagger)
await fastify.register(jwtPlugin);
await fastify.register(usuariosRoutes);
await fastify.register(usuarioRoutes)
await fastify.register(auth)

fastify.setErrorHandler((err: PC_Error, request, reply) => {
    if (!(err instanceof PC_Error)) err = new PC_InternalServerError()
    fastify.log.error(err);

    reply.status(err.statusCode).send({
        error: err.error,
        statusCode: err.statusCode,
        message: err.message
    });
});

const listenPort = Number(process.env.FASTIFY_PORT) || 3000
const listenOptions = {
    host:"::",
    port: listenPort
}

try {
    await fastify.listen(listenOptions)
    fastify.log.info('Buenas buenas, estoy escuchando en: http://localhost:3000')
} catch (error) {
    fastify.log.error(error)
    process.exit(1)
}
