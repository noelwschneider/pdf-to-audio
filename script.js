document.getElementById('pdfInput').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = async function() {
    const typedArray = new Uint8Array(this.result);
    try {
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      const numPages = pdf.numPages;

      let allPages = [];
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        allPages.push(pageText);
      };
      console.log(allPages);
    } catch (error) {
      console.error("Error reading PDF:", error);
    }
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

// tts functionality
function speakText() {
  const textInput = document.getElementById('textInput').value;
  const selectedVoiceIndex = voiceSelect.value;

  if (!textInput.trim()) {
    alert("Please enter some text to speak.");
    return;
  }

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(textInput);

    if (selectedVoiceIndex && voices[selectedVoiceIndex]) {
      utterance.voice = voices[selectedVoiceIndex];
    }

    speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support text-to-speech!");
  }
}
document.getElementById('speakButton').addEventListener('click', speakText);
