function analyzeFile() {
    const fileInput = document.getElementById('cryptoFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('No file selected. Please upload a CSV file.');
        return;
    }

    if (file.type !== 'text/csv') {
        alert('Invalid file type. Please upload a CSV file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64String = btoa(e.target.result); // Encode as Base64
        localStorage.setItem('uploadedFile', base64String); // Store in local storage

        const data = parseCSV(e.target.result);
        displayGraph(data);
    };
    reader.readAsBinaryString(file);
}

function loadStoredFile() {
    const base64String = localStorage.getItem('uploadedFile');
    if (base64String) {
        const binaryString = atob(base64String); // Decode Base64
        const data = parseCSV(binaryString);
        displayGraph(data);
    }
}

document.addEventListener('DOMContentLoaded', loadStoredFile);
