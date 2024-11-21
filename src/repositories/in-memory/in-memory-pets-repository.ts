import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { Characteristics, PetsRepository } from '../pets-repository'

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

  async findManyByCity(city: string): Promise<Pet[]> {
    return this.items.filter(
      (item) => item.city.toLowerCase() === city.toLowerCase(),
    )
  }

  async findManyByCharacteristics(data: Characteristics): Promise<Pet[]> {
    return this.items.filter((item) => {
      let doesAgeMatch = true
      if (data.age && item.age) {
        if (data.age < 1) {
          if (item.age < 1) {
            doesAgeMatch = true
          } else {
            doesAgeMatch = false
          }
        } else {
          if (data.age === item.age) {
            doesAgeMatch = true
          } else {
            doesAgeMatch = false
          }
        }
      }

      let doesSpeciesMatch = true
      if (data.species && item.species) {
        if (
          data.species.trim().toLowerCase() ===
          item.species.trim().toLowerCase()
        ) {
          doesSpeciesMatch = true
        } else {
          doesSpeciesMatch = false
        }
      }

      let doesBreedMatch = true
      if (data.breed && item.breed) {
        if (
          data.breed.trim().toLowerCase() === item.breed.trim().toLowerCase()
        ) {
          doesBreedMatch = true
        } else {
          doesBreedMatch = false
        }
      }

      let doesSizeMatch = true
      if (data.size && item.size) {
        if (data.size.trim().toLowerCase() === item.size.trim().toLowerCase()) {
          doesSizeMatch = true
        } else {
          doesSizeMatch = false
        }
      }

      let doesColorMatch = true
      if (data.color && item.color) {
        if (
          data.color.trim().toLowerCase() === item.color.trim().toLowerCase()
        ) {
          doesColorMatch = true
        } else {
          doesColorMatch = false
        }
      }

      let doesCoatMatch = true
      if (data.coat && item.coat) {
        if (data.coat.trim().toLowerCase() === item.coat.trim().toLowerCase()) {
          doesCoatMatch = true
        } else {
          doesCoatMatch = false
        }
      }

      return doesAgeMatch && doesBreedMatch && doesCoatMatch && doesColorMatch && doesSizeMatch && doesSpeciesMatch
    })
  }
}
