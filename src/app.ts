import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'

import { env } from './env'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)

app.setErrorHandler(
  (
    err,
    _, // request,
    reply,
  ) => {
    if (err instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: err.format() })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(err)
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  },
)
