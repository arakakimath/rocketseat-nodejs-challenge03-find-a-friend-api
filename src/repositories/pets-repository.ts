import { Pet, Prisma } from '@prisma/client'

export interface Filter {
  city: string
  filter: {
    age?: number
    species?: 'dog' | 'cat'
    breed?: string
    size?: 'small' | 'medium' | 'large'
    color?: string
    coat?: 'short' | 'medium' | 'long'
  }
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findMany(data: Filter): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
