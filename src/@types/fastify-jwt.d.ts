import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {
      // id: number
    } // payload type is used for signing and verifying
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
      // id: number
      // name: string
      // age: number
    }
  }
}
