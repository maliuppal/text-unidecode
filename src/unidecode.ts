/**
 * Transliterate Unicode strings toward US-ASCII (approximate pronunciation / romanization).
 *
 * Non-ASCII code points are replaced using block tables in `../data/`. Those tables are
 * derived from the Perl distribution Text::Unidecode; see THIRD-PARTY-NOTICES.md.
 */

import path = require('path');

type BlockTable = string[];

const tr: Record<number, BlockTable | null | undefined> = {};

const utf8_rx =
  /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;

function unidecode(str: string, sub?: string | null): string {
  return str.replace(utf8_rx, (match) => unidecode_internal_replace(match, sub));
}

function unidecode_internal_replace(match: string, sub?: string | null): string {
  let replacement = sub;
  if (replacement === null || replacement === undefined) {
    replacement = '';
  }

  const utf16 = utf8_to_utf16(match);

  if (utf16 > 0xffff) {
    return replacement;
  }

  const h = utf16 >> 8;
  const l = utf16 & 0xff;

  if (h > 24 && h < 30) return replacement;
  if (h > 215 && h < 249) return replacement;

  if (tr[h] === undefined) {
    try {
      const modulePath = path.join(__dirname, '..', 'data', 'x' + dec2hex(h));
      tr[h] = require(modulePath) as BlockTable;
    } catch {
      tr[h] = null;
    }
  }

  const block = tr[h];
  if (!block || !block[l]) {
    return replacement;
  }
  return block[l];
}

function dec2hex(i: number): string {
  return (i + 0x100).toString(16).slice(-2);
}

function utf8_to_utf16(raw: string | string[]): number {
  let s: string | string[] = raw;
  while (Array.isArray(s)) {
    s = s[0] as string;
  }

  let b1: number;
  let b2: number;
  let b3: number;
  let b4: number;
  let x: number;
  let y: number;
  let z: number;

  switch (s.length) {
    case 1:
      return codeUnitToScalar(s);

    case 2:
      b1 = codeUnitToScalar(s.substring(0, 1));
      b2 = codeUnitToScalar(s.substring(1, 2));

      x = ((b1 & 0x03) << 6) | (b2 & 0x3f);
      y = (b1 & 0x1c) >> 2;

      return (y << 8) | x;

    case 3:
      b1 = codeUnitToScalar(s.substring(0, 1));
      b2 = codeUnitToScalar(s.substring(1, 2));
      b3 = codeUnitToScalar(s.substring(2, 3));

      x = ((b2 & 0x03) << 6) | (b3 & 0x3f);
      y = ((b1 & 0x0f) << 4) | ((b2 & 0x3c) >> 2);

      return (y << 8) | x;

    default:
      b1 = codeUnitToScalar(s.substring(0, 1));
      b2 = codeUnitToScalar(s.substring(1, 2));
      b3 = codeUnitToScalar(s.substring(2, 3));
      b4 = codeUnitToScalar(s.substring(3, 4));

      x = ((b3 & 0x03) << 6) | (b4 & 0x3f);
      y = ((b2 & 0x0f) << 4) | ((b3 & 0x3c) >> 2);
      z = ((b1 & 0x07) << 5) | ((b2 & 0x30) >> 4);

      return (z << 16) | (y << 8) | x;
  }
}

function codeUnitToScalar(string: string): number {
  const str = string + '';
  const code = str.charCodeAt(0);
  if (0xd800 <= code && code <= 0xdbff) {
    const hi = code;
    if (str.length === 1) {
      return code;
    }
    const low = str.charCodeAt(1);
    return (hi - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000;
  }
  if (0xdc00 <= code && code <= 0xdfff) {
    return code;
  }
  return code;
}

export = unidecode;
