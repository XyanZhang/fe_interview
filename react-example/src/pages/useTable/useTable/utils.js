import React from 'react';

export const applyHooks = (hooks, initial, ...args) =>
    hooks.reduce((prev, curr) => curr(prev, ...args), initial);

export function flexRender(Comp, props) {
    if (typeof Comp === 'function' || typeof Comp === 'object') {
        return <Comp {...props} />;
    }
    return Comp;
}

const isEmptyObject = (obj) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};

export const mergeReactProps = (...groups) => {
    let props = {};
    groups.forEach(({ style, ref, className, ...rest } = {}) => {
        let newStyle = style;
        let newRef = ref;
        if (props.style && !isEmptyObject(props.style)) {
            if (!newStyle || isEmptyObject(newStyle)) {
                newStyle = props.style;
            } else {
                newStyle = {
                    ...props.style,
                    ...style,
                };
            }
        }
        if (props.ref) {
            if (!newRef) {
                newRef = props.ref;
            } else {
                const currentRef = props.ref;
                newRef = (element) =>
                    [ref, currentRef].forEach((r) => {
                        if (r) {
                            if (typeof r === 'function') {
                                r(element);
                            } else {
                                r.current = element;
                            }
                        }
                    });
            }
        }
        props = {
            ...props,
            ...rest,
            style: newStyle,
            ref: newRef,
        };
    });
    return props;
};

export const applyPropHooks = (hooks, ...args) =>
    hooks.reduce((prev, next) => {
        return mergeReactProps(prev, next(...args));
    }, {});
