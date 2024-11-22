# App

Find a Friend App.

# RFs (Requisitos funcionais)

- [x] It should be possible to register a PET

- [x] It should be possible to list all pets available for adoption in a city

- [x] It should be possible to filter pets by characteristics

- [x] It should be possible to get details from a pet

- [x] It should be possible to sign up as an ORG

- [x] It should be possible to sign in as an ORG

# RNs (Regras de negócio)

- [x] User can't register with an already used e-mail

- [x] To list pets, a city must be informed

- [x] An ORG must have address and whatsapp number

- [x] A pet must be linked to an ORG

- [x] An ORG must be signed in to access application as admin

# RNFs (Requisitos não-funcionais)

- [x] ORGs should be identified with JWT

- [x] ORGs' password should be encrypted

- [x] App data should be persisted in a PostgreSQL database

# Resources utilized

- API Server with Fastify

- Validation with Zod

- Environment variables

- Vitest and Supertest for tests

- Prisma ORM

- Database with docker

- Eslint for clear and padronized coding

- Fastify/jwt and Fastify/cookie for org's login

# Techniques applied

- SOLID architecture

- Unit tests

- Use cases architecture

- Repository pattern architecture