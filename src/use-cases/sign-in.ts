import { Org } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface SignInUseCaseRequest {
  email: string
  password: string
}

interface SignInUseCaseResponse {
  org: Org
}

export class SignInUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await bcrypt.compare(password, org.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
