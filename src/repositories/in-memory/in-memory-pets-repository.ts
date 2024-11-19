import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      name: data.name ?? null,
      age: data.age ?? null,
      species: data.species,
      breed: data.breed ?? null,
      size: data.size,
      color: data.color,
      coat: data.coat,
      city: data.city,
      description: data.description ?? null,
      created_at: new Date(),
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }
}
