import { usuarioSchema } from "./usuarios_model"
import { Type } from '@sinclair/typebox'
import type { Static } from '@sinclair/typebox'

export const cuentaSchema = Type.Object({
    userName: Type.String({minLength: 2}),
    password: Type.String({minLength: 2}),
    usuario: usuarioSchema
})

export type Cuenta = Static<typeof cuentaSchema>