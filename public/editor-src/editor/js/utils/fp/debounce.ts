/* eslint-disable */
// @ts-nocheck: It's a copy of debounced fn from underscore

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
function restArguments(func: any, startIndex?: any) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    let length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0:
        // @ts-expect-error: Don't convert to anonymous fn
        return func.call(this, rest);
      case 1:
        // @ts-expect-error: Don't convert to anonymous fn
        return func.call(this, arguments[0], rest);
      case 2:
        // @ts-expect-error: Don't convert to anonymous fn
        return func.call(this, arguments[0], arguments[1], rest);
    }
    const args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    // @ts-expect-error: Don't convert to anonymous fn
    return func.apply(this, args);
  };
}

// A (possibly faster) way to get the current timestamp as an integer.
// When a sequence of calls of the returned function ends, the argument
const now = () => Date.now || new Date().getTime();

// When a sequence of calls of the returned function ends, the argument
// function is triggered. The end of a sequence is defined by the `wait`
// parameter. If `immediate` is passed, the argument function will be
// triggered at the beginning of the sequence instead of at the end.
// @ts-expect-error: Don't convert to anonymous fn
export default function debounce(func, _wait, immediate?: number) {
  // @ts-expect-error: Don't convert to anonymous fn
  let timeout, previous, args, result, context;

  const later = function () {
    const wait = typeof _wait === "function" ? _wait() : _wait;
    // @ts-expect-error: Don't convert to anonymous fn
    const passed = now() - previous;
    if (wait > passed) {
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      // @ts-expect-error: Don't convert to anonymous fn
      if (!immediate) result = func.apply(context, args);
      // This check is needed because `func` can recursively invoke `debounced`.
      if (!timeout) args = context = null;
    }
  };
  // @ts-expect-error: Don't convert to anonymous fn
  const debounced = restArguments(function (_args) {
    const wait = typeof _wait === "function" ? _wait() : _wait;
    // @ts-expect-error: Don't convert to anonymous fn
    context = this;
    args = _args;
    previous = now();

    // @ts-expect-error: Don't convert to anonymous fn
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args);
    }
    // @ts-expect-error: Don't convert to anonymous fn
    return result;
  });

  // @ts-expect-error: Don't convert to anonymous fn
  debounced.cancel = function () {
    // @ts-expect-error: Don't convert to anonymous fn
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}
