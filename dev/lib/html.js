/**
 * @typedef {import('micromark-util-types').Handle} Handle
 */

/**
 * HtmlExtension for Pandoc-style citation keys.
 *
 * @type {import('micromark-util-types').HtmlExtension}
 */
export const citekeyHtml = {
  enter: {
    citekey: enterCitekey
  },
  exit: {
    citekey: exitCitekey,
    citekeyMarker: exitOther,
    citekeyStart: exitOther,
    citekeyId: exitId,
    citekeyEnd: exitOther
  }
}

/** @type {Handle} */
function enterCitekey(_token) {
  this.tag('<span class="citekey">')
}

/** @type {Handle} */
function exitCitekey(_token) {
  this.tag('</span>')
}

/** @type {Handle} */
function exitId(token) {
  this.tag('<span class="citeid=">')
  this.raw(this.encode(this.sliceSerialize(token)))
  this.tag('</span>')
}

/** @type {Handle} */
function exitOther(token) {
  this.raw(this.encode(this.sliceSerialize(token)))
}
