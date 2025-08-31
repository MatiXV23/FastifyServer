import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const usuarioSchema = Type.Object({
    nombre: Type.String({minLength: 2}),
    isAdmin: Type.Boolean(),
    id_usuario: Type.Number({minimum: 1})
})

export const queryUsuarioSchema = Type.Object({
    nombre : Type.Optional(Type.String({minLength: 2})),
    isAdmin: Type.Optional(Type.Boolean()),
    id_usuario: Type.Optional(Type.Number({minimum: 1}))
})

export type Usuario = Static<typeof usuarioSchema>





