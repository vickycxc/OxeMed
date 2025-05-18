import { GoogleGenAI, Type } from "@google/genai";
import { config } from "dotenv";
config();
const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const geminiConfig = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      keluhan: {
        type: Type.STRING,
      },
      rangkuman: {
        type: Type.STRING,
      },
      penjelasanTentangDiagnosis: {
        type: Type.STRING,
      },
      penjelasanTentangObat: {
        type: Type.STRING,
      },
    },
  },
};
export default genai;
