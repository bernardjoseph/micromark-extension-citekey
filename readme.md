# micromark-extension-citekey

**[micromark][]** extension to support [Pandoc][]-style citation keys.

## When to use this

If you’re using [`micromark`][micromark] or
[`mdast-util-from-markdown`][from-markdown], use this package.
Alternatively, if you’re using **[remark][]**, use
[`remark-citekey`][remark-citekey].

## Install

This package is [ESM
only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install @bernardjoseph/micromark-extension-citekey
```

## Use

Say we have the following file, `example.md`:

```markdown
@wadler1989. @{hughes1990.}
```

And our script, `example.js`, looks as follows:

```js
import fs from 'node:fs'
import {micromark} from 'micromark'
import {citekey, citekeyHtml} from '@bernardjoseph/micromark-extension-citekey'

const out = micromark(fs.readFileSync('example.md'), {
  extensions: [citekey()],
  htmlExtensions: [citekeyHtml]
})

console.log(out)
```

Now, running `node example` yields:

```html
<p><span class="citekey">@<span class="citeid=">wadler1989</span></span>. <span class="citekey">@{<span class="citeid=">hughes1990.</span>}</span></p>
```

## API

This package exports the following identifiers: `citekey`, `citekeyHtml`.
There is no default export.

The export map supports the endorsed [`development`
condition](https://nodejs.org/api/packages.html#packages_resolving_user_conditions).
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `citekey(options?)`

Function that can be called with options to get an extension for micromark to
parse [Pandoc][]-style citation keys (can be passed in `extensions`).

###### `options.strict`

A `boolean` option to restrict citation keys to ASCII.

If set to `true`, citation keys end at the first non-ASCII character.
For example, running the script:

```js
import {micromark} from 'micromark'
import {citekey, citekeyHtml} from '@bernardjoseph/micromark-extension-citekey'

const out = micromark('@müller', {
  extensions: [citekey({strict: true})],
  htmlExtensions: [citekeyHtml]
})

console.log(out)
```

Yields:

```html
<p><span class="citekey">@<span class="citeid=">m</span></span>üller</p>
```

The default value is `false`.

### `citekeyHtml`

Extension for micromark to compile [Pandoc][]-style citation keys to HTML (can
be passed in `htmlExtensions`).

###### Caveats

Labeled item markers of [Pandoc numbered example
lists][pandoc-numbered-example-lists] look like [Pandoc][]-style citation keys:

```markdown
(@good) This is a good example.

As (@good) illustrates, ...
```

Currently, there exists no **[micromark][]** extension for [Pandoc numbered
example lists][pandoc-numbered-example-lists].
Without such an extension, all labeled item markers are parsed as citation keys.

## Syntax

The syntax of [Pandoc][]-style citation keys is described in the [Pandoc
manual][pandoc-citation-syntax].

The [Pandoc manual][pandoc-manual] does not specify what characters are allowed
to precede a citation key.
This extension imitates the behavior of the [Pandoc][] parser and allows all
characters except alphanumerics and periods to precede a citation key.

## Related

*   [`remarkjs/remark`][remark]
    — markdown processor powered by plugins
*   [`remark-citekey`][remark-citekey]
    — remark plugin to support citation keys
*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`mdast-util-citekey`][mdast-util-citekey]
    — mdast utility to support citation keys
*   [`syntax-tree/mdast-util-from-markdown`][from-markdown]
    — mdast parser using `micromark` to create mdast from markdown
*   [`syntax-tree/mdast-util-to-markdown`][to-markdown]
    — mdast serializer to create markdown from mdast

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © Bernd Rellermeyer

<!-- Definitions -->

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[remark-citekey]: https://github.com/bernardjoseph/remark-citekey

[from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown

[to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown

[mdast-util-citekey]: https://github.com/bernardjoseph/mdast-util-citekey

[micromark]: https://github.com/micromark/micromark

[pandoc]: https://pandoc.org

[pandoc-manual]: https://pandoc.org/MANUAL.html

[pandoc-citation-syntax]: https://pandoc.org/MANUAL.html#citation-syntax

[pandoc-numbered-example-lists]: https://pandoc.org/MANUAL.html#numbered-example-lists

[contributing]: https://github.com/unifiedjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/unifiedjs/.github/blob/HEAD/support.md

[coc]: https://github.com/unifiedjs/.github/blob/HEAD/code-of-conduct.md

[license]: https://github.com/micromark/micromark/blob/main/license
