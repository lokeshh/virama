/**
 * विराम • Virāma - Sanskrit Śāradā Separator Application
 * Transforms Devanagari text by replacing spaces with the Śāradā separator (𑇈 / U+111C8)
 */

// Default Śāradā separator character
const SARADA_SEPARATOR = '𑇈'; // U+111C8

// Sample Sanskrit Texts
const SAMPLES = {
  gita: `धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥`,
  
  gayatri: `ॐ भूर्भुवः स्वः ।
तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।
धियो यो नः प्रचोदयात् ॥`,

  shanti: `ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते ।
पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
ॐ शान्तिः शान्तिः शान्तिः ॥`,

  mrityunjaya: `ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।
उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥`,

  tandava: `जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥`,

  rigveda: `अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।
होतारं रत्नधातमम् ॥`
};

// Core conversion logic
function transformSanskritText(text, options = {}) {
  const {
    collapseConsecutive = true,
    preserveLineBreaks = true,
    trimBeforeDanda = true,
    trimLineEnds = true,
    separator = SARADA_SEPARATOR
  } = options;

  if (typeof text !== 'string') return '';
  if (!text) return '';

  // Unicode NFC normalization for consistent Devanagari rendering
  let normalized = text.normalize('NFC');

  // Trim whitespace before single/double daṇḍas
  if (trimBeforeDanda) {
    normalized = normalized.replace(/[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+([।॥])/g, '$1');
  }

  // Regex pattern for horizontal space characters
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

// Reverse conversion (𑇈 -> Space)
function restoreSpacesFromSarada(text, separator = SARADA_SEPARATOR) {
  if (!text) return '';
  const escaped = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(escaped, 'g'), ' ');
}

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const btnConvert = document.getElementById('btnConvert');
const btnCopy = document.getElementById('btnCopy');
const btnClear = document.getElementById('btnClear');
const btnPaste = document.getElementById('btnPaste');
const btnDownload = document.getElementById('btnDownload');
const btnReverse = document.getElementById('btnReverse');
const sampleSelect = document.getElementById('sampleSelect');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Settings checkboxes
const optCollapse = document.getElementById('optCollapse');
const optPreserveLines = document.getElementById('optPreserveLines');
const optTrimDanda = document.getElementById('optTrimDanda');
const optTrimEdges = document.getElementById('optTrimEdges');
const optRealtime = document.getElementById('optRealtime');

// Font size control
const btnFontDec = document.getElementById('btnFontDec');
const btnFontInc = document.getElementById('btnFontInc');
const btnFontReset = document.getElementById('btnFontReset');
const fontSizeDisplay = document.getElementById('fontSizeDisplay');

// Stats elements
const inputChars = document.getElementById('inputChars');
const inputSpaces = document.getElementById('inputSpaces');
const outputChars = document.getElementById('outputChars');
const outputSeparators = document.getElementById('outputSeparators');
const themeSelect = document.getElementById('themeSelect');

// State
let currentFontSize = 24;

// Get active conversion options
function getOptions() {
  return {
    collapseConsecutive: optCollapse.checked,
    preserveLineBreaks: optPreserveLines.checked,
    trimBeforeDanda: optTrimDanda.checked,
    trimLineEnds: optTrimEdges.checked,
    separator: SARADA_SEPARATOR
  };
}

// Update stats for both textareas
function updateStats() {
  const inVal = inputText.value;
  const outVal = outputText.value;

  // Input stats
  const inCharCount = Array.from(inVal).length;
  const spaceCount = (inVal.match(/[ \t\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g) || []).length;
  inputChars.textContent = inCharCount;
  inputSpaces.textContent = spaceCount;

  // Output stats
  const outCharCount = Array.from(outVal).length;
  const sepCount = (outVal.match(/𑇈/g) || []).length;
  outputChars.textContent = outCharCount;
  outputSeparators.textContent = sepCount;
}

// Perform transformation
function performConversion() {
  const input = inputText.value;
  const converted = transformSanskritText(input, getOptions());
  outputText.value = converted;
  updateStats();
}

// Show toast message
let toastTimeout;
function showToast(msg) {
  clearTimeout(toastTimeout);
  toastMessage.textContent = msg;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Copy modified text to clipboard
async function copyModifiedText() {
  const textToCopy = outputText.value;
  if (!textToCopy) {
    showToast('प्रतिलिपिं कर्तुं पाठो नास्ति (No text to copy)');
    return;
  }

  let copiedSuccessfully = false;

  // Try modern Clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(textToCopy);
      copiedSuccessfully = true;
    } catch (err) {
      console.warn('Clipboard API error, trying execCommand fallback:', err);
    }
  }

  // Fallback for non-https or older environments
  if (!copiedSuccessfully) {
    try {
      outputText.select();
      outputText.setSelectionRange(0, 999999);
      copiedSuccessfully = document.execCommand('copy');
      window.getSelection().removeAllRanges();
    } catch (err) {
      console.error('Copy fallback failed:', err);
    }
  }

  if (copiedSuccessfully) {
    // Visual feedback on button
    const originalText = btnCopy.innerHTML;
    btnCopy.classList.add('copied');
    btnCopy.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied! ✓
    `;

    showToast('संशोधितपाठः प्रतिलिपीकृतः! (Modified text copied to clipboard!)');

    setTimeout(() => {
      btnCopy.classList.remove('copied');
      btnCopy.innerHTML = originalText;
    }, 2200);
  } else {
    showToast('Failed to copy text. Please select and copy manually.');
  }
}

// Paste into input
async function pasteInputText() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        inputText.value = text;
        performConversion();
        showToast('पाठः स्थापितः (Text pasted from clipboard)');
      }
    } catch (err) {
      showToast('Please press Cmd+V / Ctrl+V to paste directly into the box.');
    }
  } else {
    showToast('Please press Cmd+V / Ctrl+V to paste directly into the box.');
  }
}

// Download output as text file
function downloadModifiedText() {
  const content = outputText.value;
  if (!content) {
    showToast('संरक्षितुं पाठो नास्ति (Nothing to download)');
    return;
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sanskrit-sarada-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Text file downloaded successfully!');
}

// Reverse conversion (replace 𑇈 with spaces)
function handleReverse() {
  const current = outputText.value || inputText.value;
  if (!current) {
    showToast('विपरीतकरणाय पाठो नास्ति (No text to reverse)');
    return;
  }
  const restored = restoreSpacesFromSarada(current);
  inputText.value = restored;
  performConversion();
  showToast('Śāradā separators restored to spaces!');
}

// Insert character at cursor in active textarea
function insertAtCursor(textarea, char) {
  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || 0;
  const val = textarea.value;
  textarea.value = val.substring(0, start) + char + val.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + char.length;
  textarea.focus();
  if (optRealtime.checked) {
    performConversion();
  }
}

// Font size management
function updateFontSize(newSize) {
  currentFontSize = Math.min(Math.max(newSize, 16), 48);
  document.documentElement.style.setProperty('--font-sanskrit-size', `${currentFontSize}px`);
  fontSizeDisplay.textContent = `${currentFontSize}px`;
}

// Event Listeners Setup
function initApp() {
  // Input real-time listener
  inputText.addEventListener('input', () => {
    if (optRealtime.checked) {
      performConversion();
    } else {
      updateStats();
    }
  });

  // Convert button
  btnConvert.addEventListener('click', performConversion);

  // Copy button
  btnCopy.addEventListener('click', copyModifiedText);

  // Paste button
  btnPaste.addEventListener('click', pasteInputText);

  // Download button
  btnDownload.addEventListener('click', downloadModifiedText);

  // Reverse button
  btnReverse.addEventListener('click', handleReverse);

  // Clear button
  btnClear.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
    updateStats();
    showToast('पाठः निष्कासितः (Cleared)');
    inputText.focus();
  });

  // Options toggles
  [optCollapse, optPreserveLines, optTrimDanda, optTrimEdges].forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      performConversion();
    });
  });

  // Sample selector
  sampleSelect.addEventListener('change', (e) => {
    const key = e.target.value;
    if (key && SAMPLES[key]) {
      inputText.value = SAMPLES[key];
      performConversion();
      showToast('उदाहरणपाठः स्थापितः (Sample loaded)');
    }
    // Reset select to prompt
    e.target.value = '';
  });

  // Quick insert buttons
  document.querySelectorAll('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const char = btn.getAttribute('data-insert');
      insertAtCursor(inputText, char);
    });
  });

  // Font size buttons
  btnFontDec.addEventListener('click', () => updateFontSize(currentFontSize - 2));
  btnFontInc.addEventListener('click', () => updateFontSize(currentFontSize + 2));
  btnFontReset.addEventListener('click', () => updateFontSize(24));

  // Theme changer
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      document.documentElement.setAttribute('data-theme', e.target.value);
    });
  }

  // Load initial sample so the app is immediately ready and visual
  inputText.value = SAMPLES.gita;
  performConversion();
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

