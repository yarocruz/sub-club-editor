const subclubText = document.getElementById('subclub-text');
const charCount = document.getElementById('char-count');
const subclubButton = document.getElementById('subclub-button');

subclubText.addEventListener('input', function () {
    const remainingChars = 500 - this.value.length;
    charCount.textContent = remainingChars;
    subclubButton.disabled = this.value.length === 0;
});

document.getElementById('subclub-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically send the subclub data to your server
    console.log('Subclub post submitted:', subclubText.value);

    const raw = `{\n \"content\": \"${subclubText.value}\"\n}`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: raw,
    };

    fetch("http://localhost:3000/api/proxy", options)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log('error', error));

    subclubText.value = '';
    charCount.textContent = '500';
    subclubButton.disabled = true;
});