# text-unidecode

**text-unidecode** converts Unicode text into an ASCII-heavy, human-readable approximation (rough transliteration). It is useful for slugs, logs, search indexes, and anywhere you need a plain-ASCII stand-in for arbitrary Unicode.

Maintained by [Muhammad Ali](https://github.com/maliuppal). Repository: [github.com/maliuppal/text-unidecode](https://github.com/maliuppal/text-unidecode).

## Install

```bash
npm install text-unidecode
```

## Usage

```js
const unidecode = require('text-unidecode');

unidecode('aéà)àçé');
// => 'aea)ace'

unidecode('に間違いがないか、再度確認してください。再読み込みしてください。');
// => 'niJian Wei iganaika, Zai Du Que Ren sitekudasai. Zai Du miIp misitekudasai. '
```

### TypeScript

The package ships with typings (`text-unidecode` on npm). Example:

```ts
import unidecode = require('text-unidecode');

const out: string = unidecode('Müllerstraße');
// => 'Mullerstrasse'
```

### More examples

Latin-1 and accented Latin (diacritics are dropped or expanded to ASCII letters):

```js
unidecode('Café résumé naïve — Zürich');
// => 'Cafe resume naive -- Zurich'

unidecode('Vivere militare est. Æmilia');
// => 'Vivere militare est. AEmilia'
```

Greek, Cyrillic, and Arabic (romanization-style, not a translation):

```js
unidecode('Καλημέρα κόσμε');
// => 'Kalemera kosme'

unidecode('Привет мир');
// => 'Privet mir'

unidecode('مرحبا بالعالم');
// => 'mrHb bl`lm'
```

CJK and mixed scripts:

```js
unidecode('你好世界');
// => 'Ni Hao Shi Jie '

unidecode('100% официально — да!');
// => "100% ofitsial'no -- da!"
```

Symbols, currency signs, and digits (ASCII is left as-is where possible):

```js
unidecode('Price: €50 £30 ¥1000');
// => 'Price: EUR50 PS30 Y=1000'

unidecode('Müllerstraße 42');
// => 'Mullerstrasse 42'
```

Rough transliteration is **not** a linguistic translation; treat output as a best-effort ASCII fingerprint for tooling (slugs, logs, search), not as correct prose in the target script.

### Custom replacement for unmappable characters

Code points with no mapping (for example private-use areas, or some symbols) become the second argument, or an empty string if you omit it:

```js
unidecode('ab\uFFFFc', 'X');
// => 'abXc'

unidecode('ab\uFFFFc');
// => 'abc'

unidecode('file\uFFFFname.pdf', '_');
// => 'file_name.pdf'

unidecode('Hello 😀 world');
// => 'Hello  world'  (emoji removed by default)

unidecode('Hello 😀 world', '?');
// => 'Hello ?? world'  (surrogate pair → two replacements)
```

## Package layout

| Path | Purpose |
|------|---------|
| `src/unidecode.ts` | TypeScript source |
| `lib/unidecode.js` | Compiled entry point (`npm run build`) |
| `lib/unidecode.d.ts` | Type declarations |
| `data/x*.js` | Per–Unicode-block lookup tables |

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

This project is licensed under the [MIT License](LICENSE).

Transliteration data and incorporated third-party code are described in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
