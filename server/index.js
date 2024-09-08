require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' })
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/proxy', upload.single('media'), async (req, res) => {
    console.log('Received request');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    try {
        let mediaId = null;

        if (req.file) {
            console.log('Uploading media file');
            const mediaFormData = new FormData();
            const fileStream = fs.createReadStream(req.file.path);
            mediaFormData.append('file', fileStream, req.file.originalname);

            const mediaResponse = await axios.post('https://api.sub.club/public/media', mediaFormData, {
                headers: {
                    ...mediaFormData.getHeaders(),
                    'Authorization': `Bearer ${process.env.SUB_CLUB_API_KEY}`
                },
            });

            mediaId = mediaResponse.data.id; // Assuming the API returns the media ID
            console.log('Media uploaded, ID:', mediaId);
        }

        const postData = {
            content: req.body.content,
            mediaIds: mediaId ? [mediaId] : []
        };

        console.log('Sending post data:', postData);

        const response = await axios.post('https://api.sub.club/public/post', postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.SUB_CLUB_API_KEY}`
            },
        });

        console.log('Received response from sub.club API');
        console.log('Response data:', response.data);

        // Clean up the uploaded file
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.json(response.data);
    } catch (error) {
        console.error('Error occurred:');
        console.error(error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});