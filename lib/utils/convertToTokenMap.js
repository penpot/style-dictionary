/**
 * @typedef {import('../../types/DesignToken.ts').DesignToken} Token
 * @typedef {import('../../types/DesignToken.ts').TransformedToken} TransformedToken
 */

/**
 * @template {Token | TransformedToken} T
 * @param {Array<T>} flattenedTokens
 * @returns {Map<string, T>}
 */
export function convertToTokenMap(flattenedTokens) {
  return new Map(
    flattenedTokens.map((t) => {
      // token = t excluding the key prop
      const { key, ...token } = t;
      return [/** @type {string} */ (key), /** @type {T} */ (token)];
    }),
  );
}
