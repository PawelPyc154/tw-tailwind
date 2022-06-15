import { twMerge } from 'tailwind-merge';
export const cleanTemplate = (template, inheritedClasses = '') => {
    const newClasses = template
        .join(' ')
        .trim()
        .replace(/\n/g, ' ')
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .filter((c) => c !== ',');
    const inheritedClassesArray = inheritedClasses ? inheritedClasses.split(' ') : [];
    return twMerge(...newClasses.concat(inheritedClassesArray).filter((c) => c !== ' '));
};
