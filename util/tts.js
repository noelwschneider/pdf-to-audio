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
};


export { speakText }