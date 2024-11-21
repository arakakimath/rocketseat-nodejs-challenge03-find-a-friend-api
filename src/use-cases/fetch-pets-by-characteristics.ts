import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsByCharacteristicsUseCaseRequest {
  age?: number
  species?: 'dog' | 'cat'
  breed?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  coat?: 'short' | 'medium' | 'long'
}

interface FetchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    age,
    species,
    breed,
    size,
    color,
    coat,
  }: FetchPetsByCharacteristicsUseCaseRequest): Promise<FetchPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      age,
      species,
      breed,
      size,
      color,
      coat,
    })

    return { pets }
  }
}
