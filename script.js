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
