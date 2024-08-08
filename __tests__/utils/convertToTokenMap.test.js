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
import { convertToTokenMap } from '../../lib/utils/convertToTokenMap.js';

describe('utils', () => {
  describe('convertToTokenMap', () => {
    it('should return an empty array', () => {
      const ret = convertToTokenMap([
        { key: 'colors.red.500', value: '#f00', foo: 'bar' },
        { key: 'colors.green.500', value: '#0f0', foo: 'baz' },
        { key: 'colors.blue.500', value: '#00f', foo: 'qux' },
      ]);
      expect(ret.size).to.equal(3);
      expect(Array.from(ret)).to.eql([
        ['colors.red.500', { value: '#f00', foo: 'bar' }],
        ['colors.green.500', { value: '#0f0', foo: 'baz' }],
        ['colors.blue.500', { value: '#00f', foo: 'qux' }],
      ]);
    });
  });
});
