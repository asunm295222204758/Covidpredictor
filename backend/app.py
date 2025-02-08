from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load the trained model
MODEL_PATH = 'models/covid_prediction_model.h5'
model = load_model(MODEL_PATH)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def preprocess_image(img):
    # Convert to RGB if necessary
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize image to match model's expected sizing
    img = img.resize((224, 224))
    
    # Convert to array and preprocess
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x / 255.0  # Normalize
    
    return x

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        
        # Read and preprocess the image
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        processed_image = preprocess_image(img)
        
        # Make prediction
        prediction = model.predict(processed_image)
        
        # Get prediction probability
        covid_probability = float(prediction[0][0])
        
        # Determine result
        result = "Positive" if covid_probability > 0.5 else "Negative"
        confidence = covid_probability if result == "Positive" else 1 - covid_probability
        
        return jsonify({
            'prediction': result,
            'confidence': f"{confidence * 100:.2f}%",
            'probability': float(covid_probability)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port) 