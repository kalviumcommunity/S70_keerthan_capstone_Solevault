const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { body, validationResult } = require('express-validator');

// Initialize the Google AI Client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

router.post('/autocomplete-sneaker', [ // <-- This array holds our validation rules
        body('sneakerName')
            .notEmpty().withMessage('Sneaker name cannot be empty.')
            .trim()
            .isLength({ min: 3, max: 100 }).withMessage('Sneaker name must be between 3 and 100 characters.')
            .escape() // This helps prevent injection attacks
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const { sneakerName } = req.body;

    if (!sneakerName) {
        return res.status(400).json({ message: 'Sneaker name is required.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // This is the prompt we send to the AI.
        // Instructing it to return JSON is a key technique for reliable results.
        const prompt = `Based on the sneaker name "${sneakerName}", provide the likely brand and a brief, one-sentence marketing description.
        Return the response ONLY as a valid JSON object with the keys "brand" and "description".
        Example: For "Air Force 1", return {"brand": "Nike", "description": "An icon of streetwear, the Air Force 1 offers timeless style and premium comfort."}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Sometimes the AI returns the JSON wrapped in markdown backticks. This removes them.
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Parse the text response into a JSON object
        const jsonData = JSON.parse(cleanedText);

        res.json(jsonData);

    } catch (error) {
        console.error('AI Autocomplete Error:', error);
        res.status(500).json({ message: 'Failed to get AI autocomplete suggestions.' });
    }
});

module.exports = router;