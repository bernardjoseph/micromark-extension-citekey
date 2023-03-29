/**
 * @typedef {import('micromark-util-types').State} State
 */

import {asciiControl} from 'micromark-util-character'
import {codes} from 'micromark-util-symbol/codes.js'

/**
 * @this {import('micromark-util-types').TokenizeContext}
 * @param {import('micromark-util-types').Effects} effects
 * @param {State} ok
 * @param {State} nok
 * @param {boolean} [strict=false]
 */
export function factoryCitekeyIdExtended(effects, ok, nok, strict) {
  let balance = 0

  return start

  /** @type {State} */
  function start(code) {
    effects.enter('citekeyId')
    return consumeNext(code)
  }

  /** @type {State} */
  function consumeNext(code) {
    if (code === codes.eof || asciiControl(code)) return nok(code)

    if (strict && code > 127) return nok(code)

    if (code === codes.rightCurlyBrace && --balance < 0) {
      effects.exit('citekeyId')
      return ok(code)
    }

    if (code === codes.leftCurlyBrace) ++balance

    effects.consume(code)
    return consumeNext
  }
}
