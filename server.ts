import Fastify from "fastify";
import usuariosRoutes from "./src/routes/usuarios/usuarios.ts";
import swagger from "./src/plugins/swagger.ts";
import usuarioRoutes from "./src/routes/usuarios/id_usuarios/id_usuarios.ts";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { PC_Error } from "./src/errors/errors.ts";

const fastify = Fastify({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:HH:MM:ss Z'
            }
        }
    }
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(swagger)
fastify.register(usuariosRoutes);
fastify.register(usuarioRoutes)

fastify.setErrorHandler((err: PC_Error, request, reply) => {
    fastify.log.error(err);

    reply.status(err.statusCode).send({
        error: err.error,
        statusCode: err.statusCode,
        message: err.message
    });
});

try {
    await fastify.listen({host:"::", port: 3000})
    fastify.log.info('Buenas buenas, estoy escuchando en: http://localhost:3000')
} catch (error) {
    fastify.log.error(error)
    process.exit(1)
}