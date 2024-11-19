export class EmailAlreadyUsedError extends Error {
  constructor() {
    super('E-mail already used.')
  }
}
