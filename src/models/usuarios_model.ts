import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const usuarioSchema = Type.Object({
    nombre : Type.String({minLength:1}),
    id_usuario: Type.Integer({minimum: 1}),
    isAdmin: Type.Boolean()
})


export const queryUsuarioSchema = Type.Optional(Type.Object({
    nombre : Type.Optional(Type.String({minLength:1})),
    id_usuario: Type.Optional(Type.Integer({minimum: 1})),
    isAdmin: Type.Optional(Type.Boolean())
}))

export type Usuario = Static<typeof usuarioSchema>





