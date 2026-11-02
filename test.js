// Unit tests for Sanskrit space-to-Śāradā separator conversion

const assert = require('assert');

// Core conversion function to be shared or tested
function replaceSpacesWithSarada(text, options = {}) {
  const {
    collapseConsecutive = true,
    preserveLineBreaks = true,
    trimBeforeDanda = true,
    trimLineEnds = true,
    separator = '𑇈'
  } = options;

  if (typeof text !== 'string') return '';
  if (!text) return '';

  let normalized = text.normalize('NFC');

  if (trimBeforeDanda) {
    // Remove whitespace preceding Devanagari single/double daṇḍa
    normalized = normalized.replace(/[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+([।॥])/g, '$1');
  }

  const spacePattern = collapseConsecutive
    ? /[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+/g
    : /[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g;

  if (preserveLineBreaks) {
    return normalized
      .split(/\r?\n/)
      .map(line => {
        let processed = line;
        if (trimLineEnds) {
          processed = processed.replace(/^[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+/, '');
          processed = processed.replace(/[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+$/, '');
        }
        return processed.replace(spacePattern, separator);
      })
      .join('\n');
  } else {
    let processed = normalized;
    if (trimLineEnds) {
      processed = processed.trim();
    }
    const allSpacePattern = collapseConsecutive ? /\s+/g : /\s/g;
    return processed.replace(allSpacePattern, separator);
  }
}

function reverseConversion(text, separator = '𑇈') {
  if (typeof text !== 'string') return '';
  const escaped = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(escaped, 'g'), ' ');
}

// Tests
console.log('Running tests...');

// Test 1: Basic conversion
const input1 = 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः';
const expected1 = 'धर्मक्षेत्रे𑇈कुरुक्षेत्रे𑇈समवेता𑇈युयुत्सवः';
assert.strictEqual(replaceSpacesWithSarada(input1), expected1, 'Test 1 Failed');
console.log('✓ Test 1: Basic conversion passed');

// Test 2: Multiline with daṇḍa and space trimming
const input2 = 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥';
const expected2 = 'धर्मक्षेत्रे𑇈कुरुक्षेत्रे𑇈समवेता𑇈युयुत्सवः।\nमामकाः𑇈पाण्डवाश्चैव𑇈किमकुर्वत𑇈सञ्जय॥';
assert.strictEqual(replaceSpacesWithSarada(input2), expected2, 'Test 2 Failed');
console.log('✓ Test 2: Multiline with daṇḍa trimming passed');

// Test 3: Multiple consecutive spaces collapsed
const input3 = 'ॐ   शान्तिः    शान्तिः   शान्तिः';
const expected3 = 'ॐ𑇈शान्तिः𑇈शान्तिः𑇈शान्तिः';
assert.strictEqual(replaceSpacesWithSarada(input3, { collapseConsecutive: true }), expected3, 'Test 3 Failed');
console.log('✓ Test 3: Consecutive spaces collapsed passed');

// Test 4: Multiple consecutive spaces uncollapsed
const input4 = 'ॐ  शान्तिः';
const expected4 = 'ॐ𑇈𑇈शान्तिः';
assert.strictEqual(replaceSpacesWithSarada(input4, { collapseConsecutive: false }), expected4, 'Test 4 Failed');
console.log('✓ Test 4: Consecutive spaces uncollapsed passed');

// Test 5: Reverse conversion
const modifiedText = 'धर्मक्षेत्रे𑇈कुरुक्षेत्रे';
assert.strictEqual(reverseConversion(modifiedText), 'धर्मक्षेत्रे कुरुक्षेत्रे', 'Test 5 Failed');
console.log('✓ Test 5: Reverse conversion passed');

// Test 6: Unicode non-breaking space (U+00A0)
const input6 = 'तत्सवितुः\u00A0वरेण्यम्';
assert.strictEqual(replaceSpacesWithSarada(input6), 'तत्सवितुः𑇈वरेण्यम्', 'Test 6 Failed');
console.log('✓ Test 6: Non-breaking space handled passed');

console.log('All tests passed successfully!');

