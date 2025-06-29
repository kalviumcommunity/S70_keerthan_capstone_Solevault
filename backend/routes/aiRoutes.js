// backend/routes/aiRoutes.js

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// --- Use the base Google AI SDK ---
const { GoogleGenerativeAI } = require('@google/generative-ai');

// --- LangChain Imports for creating a custom component ---
const { Runnable } = require("@langchain/core/runnables");
const { HumanMessage } = require("@langchain/core/messages");

// --- Initialize the Google AI Client directly (this works) ---
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// --- This is our custom LangChain-compatible component ---
// It wraps the base SDK call in a class that LangChain can use, avoiding the constructor error.
class GoogleAIModelRunnable extends Runnable {
    // This is required boilerplate for LangChain Runnables
    lc_namespace = ["langchain", "llms", "google"];

    async invoke(input) {
        // 'input' will be the array of HumanMessage objects
        const prompt = input.map(msg => msg.content).join('\n');

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    }
}

// --- Initialize our custom LangChain runnable ---
const customChain = new GoogleAIModelRunnable();


// --- The API Route ---
router.post(
    '/autocomplete-sneaker',
    [ // Validation middleware
        body('sneakerName')
            .notEmpty().withMessage('Sneaker name cannot be empty.')
            .trim()
            .isLength({ min: 3, max: 100 })
            .escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { sneakerName } = req.body;

        try {
            // This is the prompt we send to our custom LangChain component.
            const prompt = `Based on the sneaker name "${sneakerName}", provide the likely brand and a brief, one-sentence marketing description.
            Return the response ONLY as a valid JSON object with the keys "brand" and "description".
            Example: For "Air Force 1", return {"brand": "Nike", "description": "An icon of streetwear, the Air Force 1 offers timeless style and premium comfort."}`;
            
            // We invoke our custom runnable component, which uses LangChain's patterns.
            const textResponse = await customChain.invoke([ new HumanMessage(prompt) ]);

            // Clean and parse the text response
            const cleanedText = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
            const jsonData = JSON.parse(cleanedText);

            res.json(jsonData);

        } catch (error) {
            console.error('AI Autocomplete Error:', error);
            res.status(500).json({ message: 'Failed to get AI autocomplete suggestions.' });
        }
    }
);

module.exports = router;