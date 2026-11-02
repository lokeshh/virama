/**
 * विराम • Virāma - Sanskrit Śāradā Separator Application
 * Transforms Devanagari text by replacing spaces with the Śāradā separator (𑇈 / U+111C8)
 */

// Default Śāradā separator character
const SARADA_SEPARATOR = '𑇈'; // U+111C8

// Sample Sanskrit Texts
const SAMPLES = {
  gita: `धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।
मामकाः पाण्डवाश्चैव किम् अकुर्वत सञ्जय ॥`,
  
  gayatri: `ॐ भूर् भुवः स्वः ।
तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।
धियो यो नः प्रचोदयात् ॥`,

  shanti: `ॐ पूर्णम् अदः पूर्णम् इदं पूर्णात् पूर्णम् उदच्यते ।
पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥
ॐ शान्तिः शान्तिः शान्तिः ॥`,

  mrityunjaya: `ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् ।
उर्वारुकमिव बन्धनान् मृत्योर् मुक्षीय मामृतात् ॥`,

  tandava: `जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥ १ ॥

जटाकटाहसंभ्रमभ्रमन्निलिम्पनिर्झरी
विलोलवीचिवल्लरीविराजमानमूर्धनि ।
धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके
किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥ २ ॥

धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर
स्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे ।
कृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि
क्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥ ३ ॥

जटाभुजङ्गपिङ्गलस्फुरत्फणामणिप्रभा
कदम्बकुङ्कुमद्रवप्रलिप्तदिग्वधूमुखे ।
मदान्धसिन्धुरस्फुरत्त्वगुत्तरीयमेदुरे
मनो विनोदमद्भुतं बिभर्तु भूतभर्तरि ॥ ४ ॥

सहस्रलोचनप्रभृत्यशेषलेखशेखर
प्रसूनधूलिधोरणीविधूसराङ्घ्रिपीठभूः ।
भुजङ्गराजमालया निबद्धजाटजूटकः
श्रियै चिराय जायतां चकोरबन्धुशेखरः ॥ ५ ॥

ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गभा
निपीतपञ्चसायकं नमन्निलिम्पनायकम् ।
सुधामयूखलेखया विराजमानशेखरं
महाकपालिसम्पदे शिरोजटालमस्तु नः ॥ ६ ॥

करालभालपट्टिकाधगद्धगद्धगज्ज्वलद्
धनञ्जयाहुतीकृतप्रचण्डपञ्चसायके ।
धराधरेन्द्रनन्दिनीकुचाग्रचित्रपत्रक
प्रकल्पनैकशिल्पिनि त्रिलोचने रतिर्मम ॥ ७ ॥

नवीनमेघमण्डलीनिरुद्धदुर्धरस्फुरत्
कुहूनिशीथिनीतमःप्रबन्धबद्धकन्धरः ।
निलिम्पनिर्झरीधरस्तनोतु कृत्तिसिन्धुरः
कलानिधानबन्धुरः श्रियं जगद्धुरंधरः ॥ ८ ॥

प्रफुल्लनीलपङ्कजप्रपञ्चकालिमप्रभा
वलम्बिकण्ठकन्दलीरुचिप्रबद्धकन्धरम् ।
स्मरच्छिदं पुरच्छिदं भवच्छिदं मखच्छिदं
गजच्छिदान्धकच्छिदं तमन्तकच्छिदं भजे ॥ ९ ॥

अखर्वसर्वमङ्गलाकलाकदम्बमञ्जरी
रसप्रवाहमाधुरीविजृम्भणामधुव्रतम् ।
स्मरान्तकं पुरान्तकं भवान्तकं मखान्तकं
गजान्तकान्धकान्तकं तमन्तकान्तकं भजे ॥ १० ॥

जयत्वदभ्रविभ्रमभ्रमद्भुजङ्गमश्वसत्
विनिर्गमत्क्रमस्फुरत्करालभालहव्यवाट् ।
धिमिद्धिमिद्धिमिध्वनन्मृदङ्गतुङ्गमङ्गल
ध्वनिक्रमप्रवर्तितप्रचण्डताण्डवः शिवः ॥ ११ ॥

दृषद्विचित्रतल्पयोर्भुजङ्गमौक्तिकस्रजोः
गरिष्ठरत्नलोष्ठयोः सुहृद्विपक्षपक्षयोः ।
तृणारविन्दचक्षुषोः प्रजामहीमहेन्द्रयोः
समप्रवृत्तिकः कदा सदाशिवं भजाम्यहम् ॥ १२ ॥

कदा निलिम्पनिर्झरीनिकुञ्जकोटरे वसन्
विमुक्तदुर्मतिः सदा शिरःस्थमञ्जलिं वहन् ।
विमुक्तलोललोचनो ललामभाललग्नकः
शिवेति मन्त्रमुच्चरन् कदा सुखी भवाम्यहम् ॥ १३ ॥

निलिम्पनाथनागरीकदम्बमौलमल्लिका
निगुम्फनिर्भरक्षरन्मधूष्णिकामनोहरः ।
तनोतु नो मनोमुदं विनोदिनीमहर्निशं
परिश्रयं परं पदं तदङ्गजत्विषां चयः ॥ १४ ॥

प्रचण्डवाडवानलप्रभाशुभप्रचारणी
महाष्टसिद्धिकामिनीजनावहूतजल्पना ।
विमुक्तवामलोचनो विवाहकालिकध्वनिः
शिवेति मन्त्रभूषणो जगज्जयाय जायताम् ॥ १५ ॥

इमं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं
पठन्स्मरन्ब्रुवन्नरो विशुद्धिमेति संततम् ।
हरे गुरौ सुभक्तिमाशु याति नान्यथा गतिं
विमोहनं हि देहिनां सुशङ्करस्य चिन्तनम् ॥ १६ ॥

पूजावसानसमये दशवक्त्रगीतं
यः शम्भुपूजनपरं पठति प्रदोषे ।
तस्य स्थिरां रथगजेन्द्रतुरङ्गयुक्तां
लक्ष्मीं सदैव सुमुखीं प्रददाति शम्भुः ॥ १७ ॥

इति श्रीरावणकृतं शिवताण्डवस्तोत्रं सम्पूर्णम् ॥`,

  rigveda: `अ॒ग्निमी॑ळे पु॒रोहि॑तं य॒ज्ञस्य॑ दे॒वमृ॒त्विज॑म् ।
होता॑रं रत्न॒धात॑मम् ॥ १ ॥

अ॒ग्निः पूर्वे॑भि॒रृषि॑भि॒रीड्यो॒ नूत॑नैरु॒त ।
स दे॒वाँ एह व॑क्षति ॥ २ ॥

अ॒ग्निना॑ र॒यिम॑श्नव॒त्पोष॑मे॒व दि॒वेदि॑वे ।
य॒शसं॑ वी॒रव॑त्तमम् ॥ ३ ॥

अग्ने॒ यं य॒ज्ञम॑ध्व॒रं वि॒श्वत॑ः परि॒भूरसि॑ ।
स इद्दे॒वेषु॑ गच्छति ॥ ४ ॥

अ॒ग्निर्होता॑ क॒विक्र॑तुः स॒त्यश्चि॒त्रश्र॑वस्तमः ।
दे॒वो दे॒वेभि॒रा ग॑मत् ॥ ५ ॥

यद॒ङ्ग दा॒शुषे॒ त्वमग्ने॑ भ॒द्रं क॑रि॒ष्यसि॑ ।
तवेत्तत्स॒त्यम॑ङ्गिरः ॥ ६ ॥

उप॑ त्वाग्ने दि॒वेदि॑वे॒ दोषा॑वस्तर्धि॒या व॒यम् ।
नमो॒ भर॑न्त॒ एम॑सि ॥ ७ ॥

राज॑न्तमध्व॒राणां॒ गोपामृ॒तस्य॑ दीदि॒विम् ।
वर्ध॑मानं॒ स्वे दमे॑ ॥ ८ ॥

स न॑ः पि॒तेव॑ सू॒नवेऽग्ने॑ सूपाय॒नो भ॑व ।
सच॑स्वा नः स्व॒स्तये॑ ॥ ९ ॥`
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

