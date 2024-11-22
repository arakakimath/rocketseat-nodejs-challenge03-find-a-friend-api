import { FastifyInstance } from 'fastify'
import { listPets } from './fetch-pets'
import { petProfile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/pets', listPets)

  app.get('/pets/:id', petProfile)
}
