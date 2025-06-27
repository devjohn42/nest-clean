export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>
}

// SOLID

// Single REsponsibility
// Open Closed Principle
// Liskov Substitution
// Interface Segregation => aplicado
// Depenency Invertion
