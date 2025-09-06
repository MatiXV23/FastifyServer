import { FastifyJwtVerifyOptions } from "@fastify/jwt";
import { FastifyReply } from "fastify";
import fastifyPlugin from "fastify-plugin";

export default fastifyPlugin(async function (fastify){

    fastify.decorate("miObjeto",{valor: "hello decorator"});
    fastify.decorate("miFuncion", function(nombre: string){
        return "hola"+nombre
    });
})




declare module 'fastify'{
    interface FastifyInstance{
        miObjeto: {valor: string};
        miFuncion(nombre: string): string
    }
}