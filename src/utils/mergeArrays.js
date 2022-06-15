export const mergeArrays = (template, templateElements) => template.reduce((acc, c, i) => acc.concat(c || [], templateElements[i] || []), []);
