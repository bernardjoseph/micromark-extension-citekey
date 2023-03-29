/**
 * @typedef {import('micromark-util-types').Construct} Construct
 * @typedef {import('micromark-util-types').State} State
 */

import assert from 'node:assert'
import {codes} from 'micromark-util-symbol/codes.js'
import {types} from 'micromark-util-symbol/types.js'
import {unicodeAlphanumeric} from './characters.js'
import {factoryCitekeyIdSimple} from './factory-citekey-id-simple.js'
import {factoryCitekeyIdExtended} from './factory-citekey-id-extended.js'

/** @type {Construct & {strict: boolean}} */
const construct = {
  name: 'citekeyPandoc',
  tokenize: tokenizeCitekey,
  strict: false,
  previous
}

/**
 * Return a Construct for Pandoc-style citation keys.
 *
 * @param {boolean} strict Whether citation keys are restricted to ASCII
 * @returns {Construct}
 */
export function citekeyPandoc(strict) {
  construct.strict = strict
  return construct
}

/**
 * Tokenizer for Pandoc-style citation keys.
 *
 * See [Citation Syntax](https://pandoc.org/MANUAL.html#citation-syntax).
 *
 * @type {import('micromark-util-types').Tokenizer}
 */
function tokenizeCitekey(effects, ok, nok) {
  const strict = construct.strict

  return marker

  /** @type {State} */
  function marker(code) {
    assert(code === codes.atSign)
    effects.enter('citekey')
    effects.enter('citekeyMarker')
    effects.consume(code)
    effects.exit('citekeyMarker')
    return start
  }

  /** @type {State} */
  function start(code) {
    if (code === codes.leftCurlyBrace) {
      effects.enter('citekeyStart')
      effects.consume(code)
      effects.exit('citekeyStart')
      return factoryCitekeyIdExtended(effects, end, nok, strict)
    }

    return factoryCitekeyIdSimple(effects, exit, nok, strict)(code)
  }

  /** @type {State} */
  function end(code) {
    assert(code === codes.rightCurlyBrace)
    effects.enter('citekeyEnd')
    effects.consume(code)
    effects.exit('citekeyEnd')
    return exit
  }

  /** @type {State} */
  function exit(code) {
    effects.exit('citekey')
    return ok(code)
  }
}

/**
 * Check if the previous character is not a period or alphanumeric.
 *
 * @type {import('micromark-util-types').Previous}
 */
function previous(code) {
  return (
    (code !== codes.dot && !unicodeAlphanumeric(code)) ||
    this.events[this.events.length - 1][1].type === types.characterEscape
  )
}
