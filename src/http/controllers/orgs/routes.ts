import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'
import { signIn } from './sign-in'
import { refresh } from './refresh'
import { registerPet } from './register-pet'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)

  app.get('/sign-in', refresh)

  app.post('/pets', { onRequest: [verifyJWT] }, registerPet)
}
