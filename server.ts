import Fastify from "fastify";
import usuariosRoutes from "./src/routes/usuarios/usuarios.ts";
import swagger from "./src/plugins/swagger.ts";
import usuarioRoutes from "./src/routes/usuarios/id_usuarios/id_usuarios.ts";

const fastify = Fastify({
    logger: true
})

const h :string = "hola"

fastify.register(swagger)
fastify.register(usuariosRoutes);
fastify.register(usuarioRoutes)

try {
    await fastify.listen({host:"::", port: 3000})
} catch (error) {
    fastify.log.error(error)
    process.exit(1)
}
