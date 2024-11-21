import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({
        message: err.message,
      })
    }
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  return reply.status(200).send({
    token,
  })
}
