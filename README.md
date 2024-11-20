# App

Find a Friend App.

# RFs (Requisitos funcionais)

- [x] It should be possible to register a PET

- [x] It should be possible to list all pets available for adoption in a city

- [ ] It should be possible to filter pets by characteristics

- [ ] It should be possible to get details from a pet

- [x] It should be possible to sign up as an ORG

- [x] It should be possible to sign in as an ORG

# RNs (Regras de negócio)

- [x] User can't register with an already used e-mail

- [ ] To list pets, a city must be informed

- [ ] An ORG must have address and whatsapp number

- [ ] A pet must be linked to an ORG

- [ ] An ORG must be signed in to access application as admin

# RNFs (Requisitos não-funcionais)

- [ ] ORGs should be identified with JWT

- [x] ORGs' password should be encrypted

- [ ] App data should be persisted in a PostgreSQL database

# Resources utilized

- API Server with Fastify

- Validation with Zod

- Environment variables

- Vitest and Supertest for tests

- Prisma ORM

- Database with docker

- Eslint for clear and padronized coding

# Techniques applied

- SOLID architecture

- Unit tests

- Use cases

- Repository pattern