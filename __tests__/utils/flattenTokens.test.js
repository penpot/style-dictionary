/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import { expect } from 'chai';
import flattenTokens from '../../lib/utils/flattenTokens.js';

const sortBy = (key) => {
  return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
};

describe('utils', () => {
  describe('flattenTokens', () => {
    it('should return an empty array', () => {
      const ret = flattenTokens({});
      expect(ret).to.eql([]);
    });

    it('should return the same array', () => {
      const to_ret = [];
      const ret = flattenTokens({}, to_ret);
      expect(ret).to.equal(ret);
    });

    it('should return leaf node values as an array', () => {
      const tokens = {
        black: {
          value: '#000000',
        },
        white: {
          value: '#FFFFFF',
        },
      };

      const expected_ret = [
        { key: 'black', ...tokens.black },
        { key: 'white', ...tokens.white },
      ];

      const sortedExpectedRet = expected_ret.sort(sortBy('value'));
      const ret = flattenTokens(tokens);
      const sortedRet = ret.sort(sortBy('value'));
      expect(sortedRet).to.eql(sortedExpectedRet);
    });

    it('should return nested leaf node values as an array', () => {
      const tokens = {
        color: {
          black: {
            value: '#000000',
          },
          white: {
            value: '#FFFFFF',
          },
        },
      };

      const expected_ret = [
        { key: 'color.black', ...tokens.color.black },
        { key: 'color.white', ...tokens.color.white },
      ];

      const sortedExpectedRet = expected_ret.sort(sortBy('value'));
      const ret = flattenTokens(tokens);
      const sortedRet = ret.sort(sortBy('value'));
      expect(sortedRet).to.eql(sortedExpectedRet);
    });

    it('should pass a key prop to flattened tokens matching the ancestor tree', () => {
      const tokens = {
        dimension: {
          scale: {
            value: '2',
            type: 'sizing',
          },
          sm: {
            value: '{dimension.xs} * {dimension.scale}',
            type: 'sizing',
          },
          foo: {
            bar: {
              baz: {
                value: '2',
                type: 'sizing',
              },
            },
            qux: { value: '2', type: 'sizing' },
          },
          lg: {
            value: '{dimension.md} * {dimension.scale}',
            type: 'sizing',
          },
        },
        spacing: {
          sm: {
            value: '{dimension.sm}',
            type: 'spacing',
          },
          lg: {
            value: '{dimension.lg}',
            type: 'spacing',
          },
        },
      };
      const ret = flattenTokens(tokens);
      expect(ret.map((r) => r.key)).to.eql([
        'dimension.scale',
        'dimension.sm',
        'dimension.foo.bar.baz',
        'dimension.foo.qux',
        'dimension.lg',
        'spacing.sm',
        'spacing.lg',
      ]);
    });

    // We also have some tests that test "nonProperty" nodes... but maybe we should not support this??
    // It seems this is only supported for deep map formats, not for flat formats..
    it.skip('should handle non-token values at the deep end', () => {
      const input = {
        colors: {
          red: {
            value: '#f00',
          },
          foo: {
            bar: { qux: { some: 'prop' } },
          },
        },
      };

      const output = flattenTokens(input, false);
      expect(output).to.eql([
        { value: '#f00', key: 'colors.red' },
        { key: 'colors.foo.bar.qux', some: 'prop' },
      ]);
    });
  });
});
