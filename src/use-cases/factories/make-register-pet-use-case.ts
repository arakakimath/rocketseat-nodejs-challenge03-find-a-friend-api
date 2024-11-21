import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(petsRepository)

  return registerPetUseCase
}
