/**
 * @typedef {import('../../types/DesignToken.ts').DesignToken} Token
 * @typedef {import('../../types/DesignToken.ts').TransformedToken} TransformedToken
 * @typedef {import('../../types/DesignToken.ts').DesignTokens} Tokens
 * @typedef {import('../../types/DesignToken.ts').TransformedTokens} TransformedTokens
 */

/**
 * Map(0) => { key: 'colors.red.500', value: '#ff0000' }
 *
 * to
 *
 * {
 *   colors: {
 *     red: {
 *       500: {
 *         value: '#ff0000'
 *       }
 *     }
 *   }
 * }
 *
 * @param {Map<string, TransformedToken>} tokenMap
 * @returns {TransformedTokens}
 */
export function convertToTokenObject(tokenMap) {
  const obj = /** @type {TransformedTokens} */ ({});
  Array.from(tokenMap).forEach(([key, token]) => {
    const keyArr = key.split('.');
    let slice = obj;
    keyArr.forEach((k, i, arr) => {
      if (slice[k] === undefined) {
        slice[k] = {};
      }
      // end
      if (i === arr.length - 1) {
        slice[k] = token;
      }
      slice = slice[k];
    });
  });
  return obj;
}
