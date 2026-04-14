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

### Custom replacement for unmappable characters

```js
unidecode('ab\uFFFFc', 'X');
// => 'abXc'

unidecode('ab\uFFFFc');
// => 'abc'
```

## Package layout

| Path | Purpose |
|------|---------|
| `lib/unidecode.js` | Entry point |
| `data/x*.js` | Per–Unicode-block lookup tables |

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

This project is licensed under the [MIT License](LICENSE).

Transliteration data and incorporated third-party code are described in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
