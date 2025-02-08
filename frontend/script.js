// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const previewSection = document.querySelector('.preview-section');
const predictBtn = document.getElementById('predictBtn');
const resultSection = document.querySelector('.result-section');
const predictionResult = document.getElementById('predictionResult');
const confidenceScore = document.getElementById('confidenceScore');
const resetBtn = document.getElementById('resetBtn');
const loadingSpinner = document.querySelector('.loading-spinner');

// API Configuration
const API_URL = 'https://covidpredictor.onrender.com';

// Drag and Drop Handlers
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#4CAF50';
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#ddd';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#ddd';
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

// File Input Handler
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

// Handle File Selection
function handleFile(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        previewSection.hidden = false;
        resultSection.hidden = true;
    };
    
    reader.readAsDataURL(file);
}

// Predict Button Handler
predictBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    try {
        // Show loading spinner
        loadingSpinner.hidden = false;
        predictBtn.disabled = true;

        // Prepare form data
        const formData = new FormData();
        formData.append('file', file);

        // Make prediction request
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Prediction failed');
        }

        const result = await response.json();

        // Update UI with results
        predictionResult.textContent = result.prediction;
        predictionResult.className = `value ${result.prediction.toLowerCase()}`;
        confidenceScore.textContent = result.confidence;
        
        // Show results
        resultSection.hidden = false;

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while making the prediction. Please try again.');
    } finally {
        // Hide loading spinner
        loadingSpinner.hidden = true;
        predictBtn.disabled = false;
    }
});

// Reset Button Handler
resetBtn.addEventListener('click', () => {
    // Reset file input
    fileInput.value = '';
    
    // Reset preview
    imagePreview.src = '';
    previewSection.hidden = true;
    
    // Hide results
    resultSection.hidden = true;
    
    // Reset prediction results
    predictionResult.textContent = '';
    confidenceScore.textContent = '';
});

// Click handler for upload box
dropZone.addEventListener('click', () => {
    fileInput.click();
}); 