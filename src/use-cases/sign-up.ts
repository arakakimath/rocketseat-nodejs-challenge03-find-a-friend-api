import { Org } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { EmailAlreadyUsedError } from './errors/email-already-used'

interface SignUpUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  whatsapp: string
}

interface SignUpUseCaseResponse {
  org: Org
}

export class SignUpUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    whatsapp,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new EmailAlreadyUsedError()
    }

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      address,
      whatsapp,
    })

    return { org }
  }
}
