import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'
import { signIn } from './sign-in'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)

  app.get('/sign-in', refresh)
}
