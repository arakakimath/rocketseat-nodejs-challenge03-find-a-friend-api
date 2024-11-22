import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsQuerySchema = z.object({
    city: z.string(),
    age: z.coerce.number().default(-1),
    species: z.enum(['cat', 'dog']).nullable().default(null),
    breed: z.string().nullable().default(null),
    size: z.enum(['small', 'medium', 'large']).nullable().default(null),
    color: z.string().nullable().default(null),
    coat: z.enum(['short', 'medium', 'long']).nullable().default(null),
  })

  const { city, age, species, breed, size, color, coat } =
    listPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    filter: {
      age: age === -1 ? undefined : age,
      species: species === null ? undefined : species,
      breed: breed === null ? undefined : breed,
      size: size === null ? undefined : size,
      color: color === null ? undefined : color,
      coat: coat === null ? undefined : coat,
    },
  })

  return reply.status(200).send({ pets })
}
