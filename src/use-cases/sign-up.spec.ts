import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { SignUpUseCase } from './sign-up'
import { EmailAlreadyUsedError } from './errors/email-already-used'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

let orgsRepository: InMemoryOrgsRepository
let sut: SignUpUseCase
let org: Org

describe('Sign Up Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SignUpUseCase(orgsRepository)

    org = (
      await sut.execute({
        name: 'Save all dogs',
        email: 'admin@savealldogs.com',
        password: '123456',
        whatsapp: '67991149385',
        address: 'rua tonico de carvalho, 118',
      })
    ).org
  })

  it('should be able to sign up an org', async () => {
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to sign up with an already used email', async () => {
    await expect(() =>
      sut.execute({
        name: 'Save all dogs',
        email: 'admin@savealldogs.com',
        password: '123456',
        whatsapp: '67991149385',
        address: 'rua tonico de carvalho, 118',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyUsedError)
  })

  it('should be able to correctly hash the password', async () => {
    const isPasswordCorrectlyHased = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHased).toBe(true)
  })
})
