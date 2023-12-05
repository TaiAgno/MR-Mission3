// imports all necessary packages and dependencies
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const { matchImageWithPrediction } = require('./matcher.js');

dotenv.config();

// sets all required variables
const PORT = process.env.PORT || 8080;

const server = express();
server.use(cors({ origin: '*' }));

// establishes server endpoint
server.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file was uploaded.');
    }

    // check if the uploaded file is an image
    if (!req.file.mimetype.startsWith('image/')) {
        console.error("Uploaded file is not an image.");
        return res.json({ error: "Incorrect data type", comment: "Please upload an image" });
    }

    // uploads and processes the image on the server side/custom vision
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(req.file.path));
    
        const response = await axios.post(process.env.VISION_PREDICTION_ENDPOINT, formData, {
            headers: {
                'Prediction-Key': process.env.VISION_PREDICTION_KEY,
                ...formData.getHeaders(),
            },
        });
    
        const responseData = response.data;
        const matchedImage = matchImageWithPrediction(responseData);
        res.json(matchedImage);
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve static files from the public directory
server.use(express.static(path.join(__dirname, 'public')));

// If no matching route is found default to home
server.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));