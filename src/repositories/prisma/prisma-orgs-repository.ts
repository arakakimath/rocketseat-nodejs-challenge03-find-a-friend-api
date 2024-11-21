import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string): Promise<Org | null> {
    return await prisma.org.findUnique({
      where: {
        email,
      },
    })
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    return await prisma.org.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        address: data.address,
        whatsapp: data.whatsapp,
      },
    })
  }
}
