import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petProfile(request: FastifyRequest, reply: FastifyReply) {
  const petProfileParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = petProfileParamsSchema.parse(request.params)

  const getPetProfileUseCase = makeGetPetProfileUseCase()

  const { pet } = await getPetProfileUseCase.execute({ id })

  return reply.status(200).send({ pet })
}
