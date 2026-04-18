# Unidecode for NodeJS

## text-unidecode

> Turn “anything Unicode can throw at you” into something your logs, URLs, and 1980s-era pipelines can digest—without pretending to speak every language on earth.

[Muhammad Ali](https://github.com/maliuppal) · [source & issues](https://github.com/maliuppal/text-unidecode)

---

## The idea in one sentence

You pass a string; you get back an **ASCII-heavy sketch** of the same string. Letters with hats become letters without hats; ideographs become romanized-ish tokens; symbols you cannot map become whatever placeholder you choose. It is the same spirit as Perl’s **Text::Unidecode**.

This is **not** translation, spell-checking, or NLP. It is a **deterministic mop** for human-readable fallbacks.

### Example conversions

| Input | Output |
|-------|--------|
| café | cafe |
| München | Munchen |
| 你好 | Ni Hao |
| Привет | Privet |
| Straße | Strasse |
| Zürich | Zurich |
| naïve | naive |
| Æther | AEther |
| Việt Nam | Viet Nam |
| svensk åäö | svensk aao |
| 한글 | hangeul |
| 東京 | Dong Jing |
| 日本語 | Ri Ben Yu |
| हिन्दी | hindii |
| Ελλάδα | Ellada |
| Ελληνικά | Ellenika |
| γειά σου | geia sou |
| שלום | shlvm |
| السلام | lslm |

*Some CJK transliterations include a **trailing space** in the real return value (for example `你好` → `Ni Hao `, `東京` → `Dong Jing `, `日本語` → `Ri Ben Yu `). The “Output” column shows the visible text; use the library if you need the exact string.*

---

## Install

```bash
npm install text-unidecode
```

---

## Drop it in

```js
const unidecode = require('text-unidecode');

unidecode('aéà)àçé');
// => 'aea)ace'

unidecode('に間違いがないか、再度確認してください。再読み込みしてください。');
// => 'niJian Wei iganaika, Zai Du Que Ren sitekudasai. Zai Du miIp misitekudasai. '
```

---

## TypeScript

Typings ship on npm. CommonJS-style import keeps `require` parity with the examples above:

```ts
import unidecode = require('text-unidecode');

const out: string = unidecode('Müllerstraße');
// => 'Mullerstrasse'
```

---

## Same function, different alphabets

Below, every `// =>` was produced by this package—think of it as a **sampler**, not a spec sheet for linguistics.

**Latin with baggage** (diacritics flatten; ligatures expand):

```js
unidecode('Café résumé naïve — Zürich');
// => 'Cafe resume naive -- Zurich'

unidecode('Vivere militare est. Æmilia');
// => 'Vivere militare est. AEmilia'
```

**Greek, Cyrillic, Arabic** (pronunciation-flavored ASCII, not meaning):

```js
unidecode('Καλημέρα κόσμε');
// => 'Kalemera kosme'

unidecode('Привет мир');
// => 'Privet mir'

unidecode('مرحبا بالعالم');
// => 'mrHb bl`lm'
```

**CJK and kitchen-sink mixes**:

```js
unidecode('你好世界');
// => 'Ni Hao Shi Jie '

unidecode('100% официально — да!');
// => "100% ofitsial'no -- da!"
```

**Money signs, street names, plain digits** (ASCII tends to survive untouched):

```js
unidecode('Price: €50 £30 ¥1000');
// => 'Price: EUR50 PS30 Y=1000'

unidecode('Müllerstraße 42');
// => 'Mullerstrasse 42'
```

**Good fits:** slugs, log lines, naive search indexes, “show something in the terminal” fallbacks.  
**Bad fits:** user-facing copy in the reader’s native language, legal names without review, anything where **wrong ASCII is worse than no ASCII**.

---

## When the table has no answer

Some code points have no row in the data (private-use areas, stray symbols, emoji). Pass a **second argument** to stand in for those holes; omit it and they collapse to empty string.

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

---

## Donate

I maintain this project in my free time. If it helped you, please support my work via [PayPal](https://www.paypal.com/paypalme/aliuppal/10usd). Thanks a lot!

