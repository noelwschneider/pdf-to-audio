import { getPdfDocument } from "./util/pdf.js";
import { speakText } from "./util/tts.js";


// upload PDF
let pdfDocument;
document.getElementById('pdfInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = async function() {
    const typedArray = new Uint8Array(this.result);
    pdfDocument = await getPdfDocument(typedArray);
  };
  fileReader.readAsArrayBuffer(file);
});


// select tts voice
const voiceSelect = document.getElementById('voiceSelect');
let voices = [];
const populateVoices = () => {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    if (voice.lang == 'en-US') {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = voice.name;
      voiceSelect.appendChild(option);
    }
  });
};
speechSynthesis.addEventListener('voiceschanged', populateVoices);

document.getElementById('speakButton').addEventListener('click', speakText);
