import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    age: z.coerce.number(),
    species: z.enum(['cat', 'dog']),
    breed: z.string().default('unknown'),
    size: z.enum(['small', 'medium', 'large']),
    color: z.string(),
    coat: z.enum(['short', 'medium', 'long']),
    city: z.string(),
    description: z.string().nullable(),
  })

  const { name, age, species, breed, size, color, coat, city, description } =
    registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    name,
    age,
    species,
    breed,
    size,
    color,
    coat,
    description,
    city,
    org_id: request.user.sub,
  })

  return reply.status(201).send()
}
