import Fastify from "fastify";
import swagger from "./src/plugins/swagger.ts";

const fastify = Fastify({
    logger: true
})

const h :string = "hola"

fastify.register(swagger)

try {
    await fastify.listen({host:"::", port: 3000})
} catch (error) {
    fastify.log.error(error)
    process.exit(1)
}
