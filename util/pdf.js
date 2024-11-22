async function getPdfDocument(result) {
    const pdf = await pdfjsLib.getDocument(result).promise;

    let allPages = [];
    const numPages = pdf.numPages;
    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageItems = textContent.items.map((item, index) => {
            return {
                text: item.str,
                newline: item.hasEOL,
                height: item.height,
                width: item.width,
                boundaries: {
                    left: item.transform[4],
                    right: item.transform[4] + item.width,
                    bottom: item.transform[5],
                    top: item.transform[5] + item.height
                }
            }
        });
        allPages.push(pageItems);
    };
    return allPages
};

export { getPdfDocument };
