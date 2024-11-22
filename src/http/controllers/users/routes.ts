import { FastifyInstance } from 'fastify'
import { listPets } from './fetch-pets'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/pets', listPets)
}
