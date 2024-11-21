import { Prisma, Pet } from '@prisma/client';
import { Characteristics, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma';

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
      }
    })
  }
  async findManyByCity(city: string): Promise<Pet[]> {
    throw new Error('Method not implemented.');
  }
  async findManyByCharacteristics(data: Characteristics): Promise<Pet[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.');
  }
}
