import { Pet } from '@prisma/client'
import { compare } from 'bcryptjs'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  name?: string
  age?: number
  species: 'cat' | 'dog'
  breed?: string
  size: 'small' | 'medium' | 'large'
  color: string
  coat: 'short' | 'medium' | 'long'
  city: string
  description?: string
  org_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    name,
    age,
    species,
    breed,
    size,
    color,
    coat,
    city,
    description,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      species,
      breed,
      size,
      color,
      coat,
      city,
      description,
      org_id,
    })

    return { pet }
  }
}
