import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { SignUpUseCase } from './sign-up'
import { EmailAlreadyUsedError } from './errors/email-already-used'

let orgsRepository: InMemoryOrgsRepository
let sut: SignUpUseCase

describe('Sign Up Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SignUpUseCase(orgsRepository)
  })

  it('should be able to sign up an org', async () => {
    const { org } = await sut.execute({
      name: 'Save all dogs',
      email: 'admin@savealldogs.com',
      password: '123456',
      whatsapp: '67991149385',
      address: 'rua tonico de carvalho, 118',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to sign up with an already used email', async () => {
    await sut.execute({
      name: 'Save all dogs',
      email: 'admin@savealldogs.com',
      password: '123456',
      whatsapp: '67991149385',
      address: 'rua tonico de carvalho, 118',
    })

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
})
