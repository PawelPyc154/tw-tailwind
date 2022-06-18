'use strict'

/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import { forwardRef, ElementRef, createElement } from 'react'
import tags from '../tags'
import { ObjectWithoutPrefixDollar } from '../types/objectWithoutPrefixDollar'
import { cleanTemplate } from './cleanTemplate'
import { mergeArrays } from './mergeArrays'

const templateTagFactory =
  <TTag extends keyof JSX.IntrinsicElements>(tag: TTag) =>
  <TTWProps extends {}>(
    template:
      | TemplateStringsArray
      | ((props: JSX.IntrinsicElements[TTag] & TTWProps) => string | ClassValue[]),
    ...templateElements: ((
      props: JSX.IntrinsicElements[TTag] & TTWProps,
    ) => string | boolean | undefined | null)[]
  ) => {
    const Component = forwardRef<ElementRef<TTag>, JSX.IntrinsicElements[TTag] & TTWProps>(
      (props, ref) => {
        const filteredProps = Object.fromEntries(
          Object.entries(props).filter(([key]): boolean => key.charAt(0) !== '$'),
        ) as JSX.IntrinsicElements[TTag] & ObjectWithoutPrefixDollar<TTWProps>
        return createElement(
          tag,
          {
            ...filteredProps,
            className:
              typeof template === 'function'
                ? clsx(template(props), props.className)
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
        )
      },
    )
    Component.displayName = `tw.${tag}`
    return Component
  }

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
