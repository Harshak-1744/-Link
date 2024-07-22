const fontMatrix = [
    { name: 'Roboto', link: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' },
    { name: 'Open Sans', link: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap' },
    { name: 'Montserrat', link: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap' },
    { name: 'Lato', link: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap' },
    { name: 'Poppins', link: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap' },
    { name: 'Oswald', link: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap' },
    { name: 'Source Sans Pro', link: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap' }
];

let currentFont = "";

function loadFont(font) {
    if (!document.querySelector(`link[href="${font.link}"]`)) {
        const link = document.createElement('link');
        link.href = font.link;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
}

function pickRandomFont() {
    let newFont;
    do {
        newFont = fontMatrix[Math.floor(Math.random() * fontMatrix.length)];
    } while (newFont.name === currentFont);
    currentFont = newFont.name;
    loadFont(newFont);
    return currentFont;
}

function updateFontDisplay() {
    const fontNameElement = document.getElementById('fontName');
    const fontSampleElement = document.getElementById('fontSample');
    const fontSamples = document.querySelector('.font-samples');

    fontNameElement.textContent = currentFont;
    fontNameElement.style.fontFamily = currentFont;
    fontSampleElement.style.fontFamily = currentFont;
    fontSamples.style.fontFamily = currentFont;

    suggestFontPairing(currentFont);
}

function updateTextDisplay() {
    const text = document.getElementById('textInput').value || 'Type something to see it in this font!';
    const fontSampleElement = document.getElementById('fontSample');
    fontSampleElement.textContent = text;
}

function changeFont() {
    pickRandomFont();
    updateFontDisplay();
    updateTextDisplay();
}

function updateFontSize(e) {
    const size = e.target.value;
    document.getElementById('fontSample').style.fontSize = size + 'px';
    document.getElementById('fontSizeValue').textContent = size;
}

function updateFontColor(e) {
    document.getElementById('fontSample').style.color = e.target.value;
}

function toggleBackground() {
    document.body.classList.toggle('dark-mode');
}

function exportCSS() {
    const fontFamily = currentFont;
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    
    const css = `
        font-family: '${fontFamily}', sans-serif;
        font-size: ${fontSize}px;
        color: ${fontColor};
    `;
    
    alert('Copy this CSS:\n\n' + css);
}

function suggestFontPairing(currentFont) {
    const pairings = {
        'Roboto': 'Oswald',
        'Open Sans': 'Lato',
        'Montserrat': 'Roboto',
        'Lato': 'Montserrat',
        'Poppins': 'Open Sans',
        'Oswald': 'Source Sans Pro',
        'Source Sans Pro': 'Poppins'
    };
    
    const suggestion = pairings[currentFont] || 'Arial';
    document.getElementById('fontPairing').textContent = `Suggested pairing: ${suggestion}`;
}

// Event Listeners
document.getElementById('updateButton').addEventListener('click', changeFont);
document.getElementById('textInput').addEventListener('input', updateTextDisplay);
document.getElementById('fontSize').addEventListener('input', updateFontSize);
document.getElementById('fontColor').addEventListener('input', updateFontColor);
document.getElementById('toggleBackground').addEventListener('click', toggleBackground);
document.getElementById('exportCSS').addEventListener('click', exportCSS);

// Initial setup
changeFont();
