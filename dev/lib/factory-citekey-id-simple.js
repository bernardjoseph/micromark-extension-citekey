/**
 * @typedef {import('micromark-util-types').State} State
 */

import {asciiAlphanumeric} from 'micromark-util-character'
import {codes} from 'micromark-util-symbol/codes.js'
import {unicodeAlphanumeric, citekeyInternalPunctuation} from './characters.js'

/**
 * @this {import('micromark-util-types').TokenizeContext}
 * @param {import('micromark-util-types').Effects} effects
 * @param {State} ok
 * @param {State} nok
 * @param {boolean} [strict=false]
 */
export function factoryCitekeyIdSimple(effects, ok, nok, strict) {
  /**
   * @param {import('micromark-util-types').Code} code
   * @returns {code is number}
   *   Whether code is an alphanumeric character.
   */
  const alphanumeric = strict ? asciiAlphanumeric : unicodeAlphanumeric

  /** @type {import('micromark-util-types').Construct} */
  const partialCitekeyIdInternal = {
    tokenize: citekeyIdInternal,
    partial: true
  }

  return start

  /** @type {State} */
  function start(code) {
    if (code === codes.underscore || alphanumeric(code)) {
      effects.enter('citekeyId')
      effects.consume(code)
      return consumeNext
    }

    return nok(code)
  }

  /** @type {State} */
  function consumeNext(code) {
    if (alphanumeric(code)) {
      effects.consume(code)
      return consumeNext
    }

    if (citekeyInternalPunctuation(code)) {
      return effects.attempt(partialCitekeyIdInternal, consumeNext, end)(code)
    }

    return end(code)
  }

  /** @type {State} */
  function end(code) {
    effects.exit('citekeyId')
    return ok(code)
  }

  /** @type {import('micromark-util-types').Tokenizer} */
  function citekeyIdInternal(effects, ok, nok) {
    return consumeInternal

    /** @type {State} */
    function consumeInternal(code) {
      if (alphanumeric(code)) {
        effects.consume(code)
        return ok(code)
      }

      if (citekeyInternalPunctuation(code)) {
        effects.consume(code)
        return consumeInternal
      }

      return nok(code)
    }
  }
}
