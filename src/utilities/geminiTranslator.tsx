import { GoogleGenAI } from "@google/genai";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface Param {
    lyrics: string
    dest_lang: string[]
    systemInstruction?: string
}

export const translator = async (param: Param) => {

    const systemInstruction = `
    You are a professional multilingual song lyric translator.
    1. detect text language 
    2. if it is french translate to english and mandarin
    3. if it is enlgish translate to french and mandarin
    4. wrap translated sentences in parenthesis and <p> tag
    5. wrap the other sentences with <strong> tag
    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: param.lyrics,
        config: { systemInstruction: systemInstruction }
    });

    return response.text

}

