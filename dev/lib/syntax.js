/**
 * @typedef Options
 * @property {boolean} [strict=false]
 *   Whether citation keys are restricted to ASCII.
 */

import {codes} from 'micromark-util-symbol/codes.js'
import {citekeyPandoc} from './citekey-pandoc.js'

/**
 * Return an Extension for Pandoc-style citation keys.
 *
 * @param {Options} [options]
 * @returns {import('micromark-util-types').Extension}
 */
export function citekey(options = {}) {
  /** @type {boolean} */
  const strict = options.strict || false

  return {
    text: {
      [codes.atSign]: citekeyPandoc(strict)
    }
  }
}
