/**
 * Transliterate Unicode strings toward US-ASCII (approximate pronunciation / romanization).
 *
 * Non-ASCII code points are replaced using block tables in `../data/`. Those tables are
 * derived from the Perl distribution Text::Unidecode; see THIRD-PARTY-NOTICES.md.
 */
declare function unidecode(str: string, sub?: string | null): string;
export = unidecode;
//# sourceMappingURL=unidecode.d.ts.map