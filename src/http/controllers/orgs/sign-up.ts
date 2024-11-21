import { EmailAlreadyUsedError } from '@/use-cases/errors/email-already-used'
import { makeSignUpUseCase } from '@/use-cases/factories/make-sign-up-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    whatsapp: z.string().min(11),
  })

  const { name, email, password, address, whatsapp } = signUpBodySchema.parse(
    request.body,
  )

  const signUpUseCase = makeSignUpUseCase()

  try {
    await signUpUseCase.execute({
      name,
      email,
      password,
      address,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof EmailAlreadyUsedError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
