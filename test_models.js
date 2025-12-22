const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testModel(modelName) {
  try {
    console.log(`Testing ${modelName}...`);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Say hello.");
    const response = await result.response;
    console.log(`[PASS] ${modelName}: ${response.text()}`);
    return true;
  } catch (error) {
    console.log(`[FAIL] ${modelName}: ${error.message}`);
    return false;
  }
}

async function runTests() {
  const models = [
    "gemini-1.5-flash-002",
    "gemini-1.5-pro-002",
    "models/gemini-1.5-flash",
    "gemini-1.0-pro",
  ];

  console.log("--- Starting Model Probe ---");
  for (const model of models) {
    await testModel(model);
  }
  console.log("--- End of Probe ---");
}

runTests();
