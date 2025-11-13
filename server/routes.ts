import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getCirculars } from './scraper';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lazy-load the translate client
let translate: any;

async function getTranslateClient() {
  if (!translate) {
    const { v2 } = await import('@google-cloud/translate');
    translate = new v2.Translate({
      keyFilename: join(__dirname, '../google-credentials.json'),
    });
  }
  return translate;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Translation endpoint for converting text to regional languages
  app.post("/api/translate", async (req, res, next) => {
    const { target, texts } = req.body;

    // Validate request body
    if (!target || !texts || typeof texts !== "object") {
      return res.status(400).json({ 
        error: "Invalid request body. Expected { target: string, texts: object }" 
      });
    }

    // Validate target language code
    if (typeof target !== "string" || target.length < 2) {
      return res.status(400).json({ 
        error: "Invalid target language code" 
      });
    }

    try {
      const translateClient = await getTranslateClient();
      const keys = Object.keys(texts);
      const values = Object.values(texts) as string[];

      // Check if there are values to translate
      if (values.length === 0) {
        return res.json({});
      }

      // Filter out empty strings to avoid unnecessary API calls
      const nonEmptyValues = values.filter(v => v && v.trim().length > 0);
      
      if (nonEmptyValues.length === 0) {
        // Return original object if all values are empty
        return res.json(texts);
      }

      // Translate the values
      const [translations] = await translateClient.translate(values, {
        to: target,
      });

      // Debug logging
      console.log("Translation request:", {
        target,
        textCount: values.length,
        sampleText: values.length > 0 ? String(values[0]).substring(0, 50) : "N/A"
      });

      // Handle single vs multiple translations
      const translationArray: string[] = Array.isArray(translations) 
        ? translations 
        : [translations];

      console.log("Translation result:", {
        translationCount: translationArray.length,
        sampleTranslation: translationArray.length > 0 
          ? String(translationArray[0]).substring(0, 50) 
          : "N/A"
      });

      // Reconstruct the object with the original keys
      const translatedObject: Record<string, string> = {};
      keys.forEach((key, index) => {
        translatedObject[key] = translationArray[index] || values[index];
      });

      res.json(translatedObject);
    } catch (error: any) {
      console.error("Translation API error:", {
        message: error.message,
        code: error.code,
        details: error.details
      });
      
      // Send appropriate error response
      res.status(error.code === 403 ? 403 : 500).json({ 
        error: "Translation failed",
        message: error.message,
        hint: error.code === 403 
          ? "Check your API credentials and ensure the Translation API is enabled"
          : "An error occurred during translation"
      });
    }
  });

  // Optional: Health check endpoint to verify translation API setup
  app.get("/api/translate/health", async (req, res) => {
    try {
      const translateClient = await getTranslateClient();
      // Try a simple translation to verify setup
      const [translation] = await translateClient.translate("Hello", "es");
      res.json({ 
        status: "ok", 
        message: "Translation API is configured correctly",
        test: { original: "Hello", translated: translation }
      });
    } catch (error: any) {
      res.status(500).json({ 
        status: "error", 
        message: "Translation API is not configured correctly",
        error: error.message
      });
    }
  });

  // Endpoint to fetch circulars
  app.get("/api/circulars", async (req, res) => {
    try {
      const circulars = await getCirculars();
      res.json(circulars);
    } catch (error) {
      console.error("Error fetching circulars:", error);
      res.status(500).json({ 
        error: "Failed to fetch circulars",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}