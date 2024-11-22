import { Prisma, Pet } from '@prisma/client'
import { Characteristics, Filter, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({
      data: {
        name: data.name,
        age: data.age,
        species: data.species,
        breed: data.breed ?? null,
        size: data.size,
        coat: data.coat,
        color: data.color,
        city: data.city,
        description: data.description,
        org_id: data.org_id,
      },
    })
  }

  async findMany(data: Filter): Promise<Pet[]> {
    if (!data.filter) {
      return await prisma.pet.findMany({
        where: {
          city: data.city,
        },
      })
    } else {
      return await prisma.pet.findMany({
        where: {
          city: data.city,
          species: data.filter.species,
          breed: data.filter.breed,
          size: data.filter.size,
          color: data.filter.color,
          coat: data.filter.coat,
          age: data.filter.age,
        },
      })
    }
  }

  async findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.')
  }
}
