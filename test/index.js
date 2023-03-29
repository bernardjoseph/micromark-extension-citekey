/**
 * @typedef {import('micromark-util-types').Options} Options
 * @typedef {import('../dev/index.js').Options} SyntaxOptions
 */

import test from 'tape'
import {micromark} from 'micromark'
import {citekey, citekeyHtml} from '../dev/index.js'

test('micromark-extension-citekey', (t) => {
  t.equal(
    micromark('@a.müller. @{a.müller.}', options({strict: true})),
    '<p><span class="citekey">@<span class="citeid=">a.m</span></span>üller. @{a.müller.}</p>',
    'should support ASCII citation keys'
  )

  t.equal(
    micromark('@a.müller. @{a.müller.}', options()),
    '<p><span class="citekey">@<span class="citeid=">a.müller</span></span>. <span class="citekey">@{<span class="citeid=">a.müller.</span>}</span></p>',
    'should support Unicode citation keys'
  )

  t.equal(
    micromark('\\.@a.müller. \\.@{a.müller.}', options()),
    '<p>.<span class="citekey">@<span class="citeid=">a.müller</span></span>. .<span class="citekey">@{<span class="citeid=">a.müller.</span>}</span></p>',
    'should allow escaped periods preceding citation keys'
  )

  t.equal(
    micromark('.@a.müller. a@{a.müller.}', options()),
    '<p>.@a.müller. a@{a.müller.}</p>',
    'should not only allow unescaped periods and alphanumerics preceding citation keys'
  )

  t.equal(
    micromark('@.a.müller. @{.a.müller.}', options()),
    '<p>@.a.müller. <span class="citekey">@{<span class="citeid=">.a.müller.</span>}</span></p>',
    'should enforce simple citation keys to start with underscores or alphanumerics'
  )

  t.equal(
    micromark('@{a.müller. @{.a.müller.', options()),
    '<p>@{a.müller. @{.a.müller.</p>',
    'should enforce extended citation keys to end with right curly braces'
  )

  t.equal(
    micromark('@{https://example.com/bib?name=foobar&date=2000}', options()),
    '<p><span class="citekey">@{<span class="citeid=">https://example.com/bib?name=foobar&amp;date=2000</span>}</span></p>',
    'should support URLs as citation keys'
  )

  t.end()
})

/**
 * @param {SyntaxOptions} [options]
 * @returns {Options}
 */
function options(options) {
  return {
    extensions: [citekey(options)],
    htmlExtensions: [citekeyHtml]
  }
}
