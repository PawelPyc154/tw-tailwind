/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import tags from './tags'
import { componentFactory } from './utils/componentFactory'
import { tagFactory } from './utils/tagFactory'

class Wrapper<T extends keyof JSX.IntrinsicElements> {
  // wrapped has no explicit return type so we can infer it
  wrapped(e: T) {
    return tagFactory<T>(e)
  }
}
type IntrinsicElementsTemplateFunctionsMap = {
  [Key in keyof JSX.IntrinsicElements]: ReturnType<Wrapper<Key>['wrapped']>
}

export const tagMap = tags.reduce(
  (acc, tag: keyof JSX.IntrinsicElements) => ({
    ...acc,
    [tag]: tagFactory(tag),
  }),
  {} as IntrinsicElementsTemplateFunctionsMap,
)

const tw = Object.assign(componentFactory, tagMap)

export default tw
