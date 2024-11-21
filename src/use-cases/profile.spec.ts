import { expect, describe, it, beforeEach } from 'vitest'
import { Pet } from '@prisma/client'

import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetProfileUseCase } from './profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase
let pet: Pet

describe('Register Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)

    await petsRepository.create({
      id: 'pet-01',
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
  })

  it('should be able to get a pet profile', async () => {
    const { pet } = await sut.execute({ id: 'pet-01' })
    console.log(pet.color)
    expect(pet.color).toEqual('harleyqueen')
  })

  it('should not be able to get a pet profile with an invalid id', async () => {
    await expect(() => sut.execute({ id: 'pet-02' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
