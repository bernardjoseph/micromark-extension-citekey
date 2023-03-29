/**
 * @typedef {import('micromark-util-types').Code} Code
 */

/**
 * Check whether the character code represents a Unicode alphanumeric.
 */
export const unicodeAlphanumeric = regexCheck(/[\p{N}\p{L}/]/u)

/**
 * Check whether the character code represents a punctuation, which is valid
 * inside citation keys.
 *
 * See [Citation Syntax](https://pandoc.org/MANUAL.html#citation-syntax).
 */
export const citekeyInternalPunctuation = regexCheck(/[-:.#$%&+?<>~/]/)

/**
 * Create a code check from a regex.
 *
 * Copied from 'micromark-util-character/index.js'.
 *
 * @param {RegExp} regex
 * @returns {(code: Code) => code is number}
 */
function regexCheck(regex) {
  return check

  /**
   * Check whether a code matches the bound regex.
   *
   * @param {Code} code Character code
   * @returns {code is number} Whether the character code matches the bound regex
   */
  function check(code) {
    return code !== null && regex.test(String.fromCharCode(code))
  }
}
