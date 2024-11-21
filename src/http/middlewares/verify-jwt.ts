import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()

    if (!request.headers.authorization) {
      throw new Error('Authorization token not found.')
    }
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}
