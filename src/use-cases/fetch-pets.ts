import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface FetchPetsUseCaseRequest {
  city: string
  filter: {
    age?: number
    species?: 'dog' | 'cat'
    breed?: string
    size?: 'small' | 'medium' | 'large'
    color?: string
    coat?: 'short' | 'medium' | 'long'
  }
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    filter,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany({ city, filter })

    return { pets }
  }
}
