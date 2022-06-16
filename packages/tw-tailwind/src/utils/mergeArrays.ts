export const mergeArrays = (template: TemplateStringsArray, templateElements: (string | boolean | undefined | null)[]) =>
  template.reduce((acc, c, i) => acc.concat(c || [], templateElements[i] || []), [] as (string | boolean | undefined | null)[])

