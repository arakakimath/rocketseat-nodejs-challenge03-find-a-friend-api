import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPetsUseCase } from './fetch-pets'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository)

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

    await petsRepository.create({
      name: 'Marley',
      age: 8,
      species: 'dog',
      breed: 'labrador',
      size: 'large',
      color: 'caramel',
      coat: 'short',
      city: 'campo grande',
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
      city: 'campo GRande',
      description: 'Lovely dog',
      org_id: 'org-03',
    })
  })

  it('should be able to fetch pets by city', async () => {
    const { pets } = await sut.execute({ city: 'campo GRande', filter: {} })

    expect(pets).toHaveLength(4)
  })

  it('should be able to fetch pets by characteristics', async () => {
    const firstSearch = await sut.execute({
      city: 'Campo Grande',
      filter: {
        age: 2,
        species: 'dog',
        breed: 'dachshund',
        coat: 'short',
        size: 'medium',
        color: 'harleyquEen ',
      },
    })

    expect(firstSearch.pets).toHaveLength(2)

    const secondSearch = await sut.execute({
      city: 'campo grande',
      filter: {
        species: 'dog',
      },
    })

    expect(secondSearch.pets).toHaveLength(4)
  })
})
