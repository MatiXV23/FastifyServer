import Fastify from "fastify";
import usuariosRoutes from "./src/routes/usuarios/usuarios.ts";
import swagger from "./src/plugins/swagger.ts";
import usuarioRoutes from "./src/routes/usuarios/id_usuarios/id_usuarios.ts";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const fastify = Fastify({
    logger: true
}).withTypeProvider<TypeBoxTypeProvider>()

fastify.register(swagger)
fastify.register(usuariosRoutes);
fastify.register(usuarioRoutes)

fastify.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    const statusCode = error.statusCode || 500; 
    reply.status(statusCode).send({
        error: "Error del Servidor",
        statusCode: statusCode,
        message: "Ha ocurrido un error inesperado."
    });
});

try {
    await fastify.listen({host:"::", port: 3000})
} catch (error) {
    fastify.log.error(error)
    process.exit(1)
}
