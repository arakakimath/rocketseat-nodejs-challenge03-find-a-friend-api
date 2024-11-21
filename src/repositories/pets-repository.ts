import { Pet, Prisma } from '@prisma/client'

export interface Characteristics {
  age?: number
  species?: 'dog' | 'cat'
  breed?: string
  size?: 'small' | 'medium' | 'large'
  color?: string
  coat?: 'short' | 'medium' | 'long'
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCity(city: string): Promise<Pet[]>
  findManyByCharacteristics(data: Characteristics): Promise<Pet[]>
}
