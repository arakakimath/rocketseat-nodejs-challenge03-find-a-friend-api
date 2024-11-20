import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)

    await petsRepository.create({
      name: 'Rookie',
      age: 2,
      species: 'dog',
      breed: 'dachshund',
      size: 'medium',
      color: 'harleyqueen',
      coat: 'short',
      city: 'Campo Grande',
      description: 'Lovely dog',
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Rookie',
      age: 2,
      species: 'dog',
      breed: 'dachshund',
      size: 'medium',
      color: 'harleyqueen',
      coat: 'short',
      city: 'CAMPO GRANDE',
      description: 'Lovely dog',
      org_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Rookie',
      age: 2,
      species: 'dog',
      breed: 'dachshund',
      size: 'medium',
      color: 'harleyqueen',
      coat: 'short',
      city: 'fortaleza',
      description: 'Lovely dog',
      org_id: 'org-01',
    })
  })

  it('should be able to fetch pets by city', async () => {
    const { pets } = await sut.execute({ city: 'campo GRande' })

    expect(pets).toHaveLength(2)
  })
})
