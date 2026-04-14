/**
 * Transliterate Unicode strings toward US-ASCII (approximate pronunciation / romanization).
 *
 * Non-ASCII code points are replaced using block tables in `../data/`. Those tables are
 * derived from the Perl distribution Text::Unidecode; see THIRD-PARTY-NOTICES.md.
 */

'use strict';

var path = require('path');

var tr = {};
var utf8_rx = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;

module.exports = function (str, sub) {
  return str.replace(utf8_rx, function (match) {
    return unidecode_internal_replace(match, sub);
  });
};

function unidecode_internal_replace(match, sub) {
  if (sub === null || sub === undefined) {
    sub = '';
  }

  var utf16 = utf8_to_utf16(match);

  if (utf16 > 0xFFFF) {
    return sub;
  }

  var h = utf16 >> 8;
  var l = utf16 & 0xFF;

  if (h > 24 && h < 30) return sub;
  if (h > 215 && h < 249) return sub;

  if (tr[h] === undefined) {
    try {
      tr[h] = require(path.join(__dirname, '..', 'data', 'x' + dec2hex(h)));
    } catch (e) {
      tr[h] = null;
    }
  }

  if (!tr[h] || !tr[h][l]) {
    return sub;
  }
  return tr[h][l];
}

function dec2hex(i) {
  return (i + 0x100).toString(16).substr(-2);
}

function utf8_to_utf16(raw) {
  var b1, b2, b3, b4,
    x, y, z;

  while (Array.isArray(raw)) raw = raw[0];

  switch (raw.length) {
  case 1:
    return codeUnitToScalar(raw);

  case 2:
    b1 = codeUnitToScalar(raw.substr(0, 1));
    b2 = codeUnitToScalar(raw.substr(1, 1));

    x = ((b1 & 0x03) << 6) | (b2 & 0x3F);
    y = (b1 & 0x1C) >> 2;

    return (y << 8) | x;

  case 3:
    b1 = codeUnitToScalar(raw.substr(0, 1));
    b2 = codeUnitToScalar(raw.substr(1, 1));
    b3 = codeUnitToScalar(raw.substr(2, 1));

    x = ((b2 & 0x03) << 6) | (b3 & 0x3F);
    y = ((b1 & 0x0F) << 4) | ((b2 & 0x3C) >> 2);

    return (y << 8) | x;

  default:
    b1 = codeUnitToScalar(raw.substr(0, 1));
    b2 = codeUnitToScalar(raw.substr(1, 1));
    b3 = codeUnitToScalar(raw.substr(2, 1));
    b4 = codeUnitToScalar(raw.substr(3, 1));

    x = ((b3 & 0x03) << 6) | (b4 & 0x3F);
    y = ((b2 & 0x0F) << 4) | ((b3 & 0x3C) >> 2);
    z = ((b1 & 0x07) << 5) | ((b2 & 0x30) >> 4);

    return (z << 16) | (y << 8) | x;
  }
}

function codeUnitToScalar(string) {
  var str = string + '',
    code = str.charCodeAt(0);
  if (0xD800 <= code && code <= 0xDBFF) {
    var hi = code;
    if (str.length === 1) {
      return code;
    }
    var low = str.charCodeAt(1);
    return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
  }
  if (0xDC00 <= code && code <= 0xDFFF) {
    return code;
  }
  return code;
}
