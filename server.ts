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
    if (error.message.toLowerCase().includes("no encontrado") || 
        error.message.toLowerCase().includes("not found") ||
        error.statusCode === 404){
        return reply.status(404).send({
            statusCode: 404,
            error: "Not Found",
            message: error.message
        });
    }
    request.log.error(error);
    reply.status(500).send({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Ha ocurrido un error inesperado."
    });
});

try {
    await fastify.listen({host:"::", port: 3000})
} catch (error) {
    fastify.log.error(error)
    process.exit(1)
}
