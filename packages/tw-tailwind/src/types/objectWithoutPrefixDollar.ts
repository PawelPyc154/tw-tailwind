type FilteredKeys<T> = { [P in keyof T]: P extends `$${string}` ? never : P }[keyof T]

export type ObjectWithoutPrefixDollar<T> = {
  [Q in FilteredKeys<T>]: T[Q]
}

