export function isMatchingKey<T, K extends keyof T>(actual: keyof T, expected: K, value: unknown): value is T[K] {
  return actual === expected
}
