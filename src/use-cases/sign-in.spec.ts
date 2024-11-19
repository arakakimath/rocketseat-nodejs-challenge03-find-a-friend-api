import { expect, describe, it, beforeEach } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { Org } from '@prisma/client'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { SignInUseCase } from './sign-in'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: SignInUseCase

describe('Sign In Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SignInUseCase(orgsRepository)

    await orgsRepository.create({
      name: 'Save all dogs',
      email: 'admin@savealldogs.com',
      password_hash: await hash('123456', 6),
      whatsapp: '67991149385',
      address: 'rua tonico de carvalho, 118',
    })
  })

  it('should be able to a org sign in with valid credentials', async () => {
    const { org } = await sut.execute({
      email: 'admin@savealldogs.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to a org sign in with invalid credentials', async () => {
    await expect(() =>
      sut.execute({
        email: 'admin@savealldogs.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

    await expect(() =>
      sut.execute({
        email: 'adm1n@savealldogs.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

    await expect(() =>
      sut.execute({
        email: 'adm1n@savealldogs.com',
        password: '666666',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
