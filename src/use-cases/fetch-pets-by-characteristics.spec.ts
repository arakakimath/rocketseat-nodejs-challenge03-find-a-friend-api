import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from './fetch-pets-by-characteristics'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCharacteristicsUseCase

describe('Fetch Pets By Characteristics Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCharacteristicsUseCase(petsRepository)

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
      name: 'Marley',
      age: 8,
      species: 'dog',
      breed: 'labrador',
      size: 'large',
      color: 'caramel',
      coat: 'short',
      city: 'São Paulo',
      description: 'Lovely dog',
      org_id: 'org-02',
    })

    await petsRepository.create({
      name: 'Scooby-doo',
      age: 6,
      species: 'dog',
      breed: 'Rotweiller',
      size: 'medium',
      color: 'black',
      coat: 'short',
      city: 'fortaleza',
      description: 'Lovely dog',
      org_id: 'org-03',
    })
  })

  it('should be able to fetch pets by characteristics', async () => {
    const firstSearch = await sut.execute({
      age: 2,
      species: 'dog',
      breed: 'dachshund',
      coat: 'short',
      size: 'medium',
      color: 'harleyquEen ',
    })

    expect(firstSearch.pets).toHaveLength(1)

    const secondSearch = await sut.execute({
      species: 'dog',
    })

    expect(secondSearch.pets).toHaveLength(3)
  })
})
