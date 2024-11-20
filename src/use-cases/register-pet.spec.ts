import { expect, describe, it, beforeEach } from 'vitest'
import { Pet } from '@prisma/client'

import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase
let pet: Pet

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)

    pet = (
      await sut.execute({
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
    ).pet
  })

  it('should be able to register a new pet', async () => {
    expect(pet.id).toEqual(expect.any(String))
    expect(petsRepository.items).toHaveLength(1)
  })
})
