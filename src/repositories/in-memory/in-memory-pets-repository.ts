import { randomUUID } from 'node:crypto'
import { Pet, Prisma } from '@prisma/client'

import { Filter, PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ? data.id : randomUUID(),
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

  async findMany(data: Filter): Promise<Pet[]> {
    let pets = this.items.filter(
      (item) => item.city.toLowerCase() === data.city.toLowerCase(),
    )

    if (data.filter) {
      pets = pets.filter((item) => {
        let doesAgeMatch = true
        if (data.filter.age && item.age) {
          if (data.filter.age < 1) {
            if (item.age < 1) {
              doesAgeMatch = true
            } else {
              doesAgeMatch = false
            }
          } else {
            if (data.filter.age === item.age) {
              doesAgeMatch = true
            } else {
              doesAgeMatch = false
            }
          }
        }

        let doesSpeciesMatch = true
        if (data.filter.species && item.species) {
          if (
            data.filter.species.trim().toLowerCase() ===
            item.species.trim().toLowerCase()
          ) {
            doesSpeciesMatch = true
          } else {
            doesSpeciesMatch = false
          }
        }

        let doesBreedMatch = true
        if (data.filter.breed && item.breed) {
          if (
            data.filter.breed.trim().toLowerCase() ===
            item.breed.trim().toLowerCase()
          ) {
            doesBreedMatch = true
          } else {
            doesBreedMatch = false
          }
        }

        let doesSizeMatch = true
        if (data.filter.size && item.size) {
          if (
            data.filter.size.trim().toLowerCase() ===
            item.size.trim().toLowerCase()
          ) {
            doesSizeMatch = true
          } else {
            doesSizeMatch = false
          }
        }

        let doesColorMatch = true
        if (data.filter.color && item.color) {
          if (
            data.filter.color.trim().toLowerCase() ===
            item.color.trim().toLowerCase()
          ) {
            doesColorMatch = true
          } else {
            doesColorMatch = false
          }
        }

        let doesCoatMatch = true
        if (data.filter.coat && item.coat) {
          if (
            data.filter.coat.trim().toLowerCase() ===
            item.coat.trim().toLowerCase()
          ) {
            doesCoatMatch = true
          } else {
            doesCoatMatch = false
          }
        }

        return (
          doesAgeMatch &&
          doesBreedMatch &&
          doesCoatMatch &&
          doesColorMatch &&
          doesSizeMatch &&
          doesSpeciesMatch
        )
      })
    }

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    return this.items.filter((item) => item.id === id)[0] ?? null
  }
}
