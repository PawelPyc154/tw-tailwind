export const mergeArrays = (template: TemplateStringsArray, templateElements: (string | undefined | null)[]) =>
  template.reduce((acc, c, i) => acc.concat(c || [], templateElements[i] || []), [] as (string | undefined | null)[])
