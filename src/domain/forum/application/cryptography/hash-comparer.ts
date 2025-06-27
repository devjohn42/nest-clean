export abstract class HashComparer {
  abstract compare(plain: string, hash: string): Promise<boolean>
}

// SOLID

// Single REsponsibility
// Open Closed Principle
// Liskov Substitution
// Interface Segregation => aplicado
// Depenency Invertion
