const subclubForm = document.getElementById('subclub-form');
const subclubText = document.getElementById('subclub-text');
const charCount = document.getElementById('char-count');
const subclubButton = document.getElementById('subclub-button');
const fileInput = document.getElementById('file-input');

let imageFile = null;

subclubText.addEventListener('input', function () {
    const remainingChars = 500 - this.value.length;
    charCount.textContent = remainingChars;
    subclubButton.disabled = this.value.length === 0;
});

fileInput.addEventListener('change', function (e) {
    imageFile = e.target.files[0];
});

console.log(imageFile);

subclubForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', subclubText.value);
    console.log(formData);

    if (imageFile) {
        formData.append('media', imageFile, imageFile.name);
    }

    try {
        const response = await fetch('http://localhost:3000/api/proxy', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }

    // RESETS
    subclubText.value = '';
    charCount.textContent = '500';
    subclubButton.disabled = true;
    fileInput.value = '';
    imageFile = null;
});