require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // The library doesn't expose listModels directly easily on the client instance in some versions,
    // but let's try to just generate content with a very basic model name "gemini-pro" again,
    // or arguably "models/gemini-pro".
    // Actually, let's just use the error message suggestion: "Call ListModels".
    // We have to use the REST API manually for that if the SDK helper isn't obvious,
    // but the SDK usually has it on the `GoogleGenerativeAI` instance or similar.
    // Let's try to just test a few common ones.

    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-pro",
      "gemini-1.0-pro",
      "gemini-1.5-pro",
    ];

    for (const modelName of modelsToTry) {
      console.log(`Testing model: ${modelName}...`);
      try {
        const m = genAI.getGenerativeModel({ model: modelName });
        const result = await m.generateContent("Hello");
        console.log(`SUCCESS: ${modelName} works!`);
        process.exit(0); // Found one!
      } catch (e) {
        console.log(`FAILED: ${modelName} - ${e.message.split("\n")[0]}`);
      }
    }
  } catch (error) {
    console.error("Fatal Error:", error);
  }
}

listModels();
