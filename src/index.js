/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import clsx from 'clsx';
import { createElement, forwardRef } from 'react';
import tags from './tags';
import { cleanTemplate } from './utils/cleanTemplate';
import { mergeArrays } from './utils/mergeArrays';
const templateTagFactory = (tag) => (template, ...templateElements) => forwardRef((props, ref) => createElement(tag, {
    ...props,
    className: typeof template === 'function'
        ? clsx(template(props))
        : cleanTemplate(mergeArrays(template, templateElements.map((t) => t(props))), props.className),
    ref,
}, props.children));
const templateComponentFactory = (Element) => {
    if (Array.isArray(Element)) {
        return Element[0];
    }
    return (template, ...templateElements) => forwardRef((props, ref) => ({ ...props }), className = {
        typeof: template === 'function'
            ? clsx(template(props))
            : cleanTemplate(mergeArrays(template, templateElements.map((t) => t(props))), props.className)
    }, ref = { ref }
        /  >
    );
};
class Wrapper {
    // wrapped has no explicit return type so we can infer it
    wrapped(e) {
        return templateTagFactory(e);
    }
}
const intrinsicTagMap = tags.reduce((acc, tag) => ({
    ...acc,
    [tag]: templateTagFactory(tag),
}), {});
const tw = Object.assign(templateComponentFactory, intrinsicTagMap);
export default tw;
