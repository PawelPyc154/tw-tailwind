import { twMerge } from 'tailwind-merge'

export const cleanTemplate = (template: (string | undefined | null)[], inheritedClasses: string = '') => {
  const newClasses: string[] = template
    .join(' ')
    .trim()
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .filter((c) => c !== ',')

  const inheritedClassesArray: string[] = inheritedClasses ? inheritedClasses.split(' ') : []

  return twMerge(...newClasses.concat(inheritedClassesArray).filter((c: string) => c !== ' '))
}

