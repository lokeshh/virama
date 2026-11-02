# विराम • Virāma

A specialized JavaScript web application for Sanskrit typography that takes Sanskrit Devanagari text as input and replaces spaces with the **Śāradā separator character** (`𑇈`, Unicode `U+111C8`), utilizing the renowned **Siddhanta** font.

---

## ✨ Features

- **Sanskrit Devanagari Space Replacement**: Converts spaces in Devanagari text into the authentic Śāradā separator character `𑇈` (`U+111C8`).
- **Siddhanta Font Integration**: Preconfigured with `siddhanta.ttf` for pristine Sanskrit OpenType ligatures, conjuncts (*saṁyuktākṣarāṇi*), and Vedic accents.
- **One-Click Copy**: Prominent copy button with instant animated visual confirmation and toast feedback.
- **Smart Formatting Options**:
  - *Collapse multiple spaces*: Condenses multiple consecutive spaces into a single `𑇈`.
  - *Preserve line breaks*: Keeps verse lines and stanzas intact while replacing horizontal spaces.
  - *Trim space before daṇḍa*: Cleans up accidental spaces preceding `।` and `॥`.
  - *Trim line ends*: Avoids dangling separators at verse edges.
- **Real-Time Conversion**: Live updates as you type or paste.
- **Sample Sanskrit Texts**: Instant loading of classical passages:
  - Śrīmad Bhagavad Gītā (1.1)
  - Gāyatrī Mantra
  - Śānti Pāṭha (Pūrṇamadaḥ)
  - Mahāmṛtyuñjaya Mantra
  - Śiva Tāṇḍava Stotram
  - Rigveda 1.1.1 (Agni Sūkta)
- **Quick-Insert Toolbar**: Fast buttons to insert `𑇈`, `।`, `॥`, `ॐ`, and `ऽ` into text.
- **Reverse Conversion**: Easily restore `𑇈` back to standard spaces.
- **Font Size Scaling**: Zoom in/out to examine intricate Sanskrit ligatures.
- **Manuscript Themes**: Switch between *Bhojapatra* (Warm Parchment), *Vedic Night* (Dark), and *Clean Light*.
- **Download**: Export the modified text as a UTF-8 `.txt` file.

---

## 🚀 How to Run

### Option 1: Direct in Browser
Open `index.html` directly in any modern browser:
```bash
open index.html
```

### Option 2: Local Server via Node.js
Virāma includes a zero-dependency static server:
```bash
npm start
# or: node server.js
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Tests

To run the unit test suite verifying Sanskrit space replacements, multiline preserving, and edge cases:
```bash
npm test
```

---

## 📜 Font & Glyphs

- **Font**: Siddhanta (`fonts/siddhanta.ttf`) designed by Mihail Bayaryn.
- **Separator Character**: `𑇈` (Unicode `U+111C8` - SHARADA SEPARATOR).
