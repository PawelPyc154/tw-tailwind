import clsx, { ClassValue } from 'clsx'
import { forwardRef, ElementRef, createElement } from 'react'
import tags from '../tags'
import { cleanTemplate } from './cleanTemplate'
import { mergeArrays } from './mergeArrays'
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

const templateTagFactory =
  <TTag extends keyof JSX.IntrinsicElements>(tag: TTag) =>
  <TTWProps extends {}>(
    template: TemplateStringsArray | ((props: JSX.IntrinsicElements[TTag] & TTWProps) => ClassValue[]),
    ...templateElements: ((props: JSX.IntrinsicElements[TTag] & TTWProps) => string | undefined | null)[]
  ) =>
    forwardRef<ElementRef<TTag>, JSX.IntrinsicElements[TTag] & TTWProps>((props, ref) =>
      createElement(
        tag,
        {
          ...props,
          className:
            typeof template === 'function'
              ? clsx(template(props))
              : cleanTemplate(
                  mergeArrays(
                    template,
                    templateElements.map((t) => t(props)),
                  ),
                  props.className,
                ),
          ref,
        },
        props.children,
      ),
    )

class Wrapper<T extends keyof JSX.IntrinsicElements> {
  // wrapped has no explicit return type so we can infer it
  wrapped(e: T) {
    return templateTagFactory<T>(e)
  }
}
type IntrinsicElementsTemplateFunctionsMap = {
  [Key in keyof JSX.IntrinsicElements]: ReturnType<Wrapper<Key>['wrapped']>
}

export const intrinsicTagMap = tags.reduce(
  (acc, tag: keyof JSX.IntrinsicElements) => ({
    ...acc,
    [tag]: templateTagFactory(tag),
  }),
  {} as IntrinsicElementsTemplateFunctionsMap,
)

