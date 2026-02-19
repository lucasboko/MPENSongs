import { GoogleGenAI } from "@google/genai";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

interface Param {
    lyrics: string
    dest_lang: string[]
    systemInstruction?: string
}


const instructions =
    `
You are a professional multilingual song lyric translator.

TASK:

1. Detect the original language of the lyrics.
   Possible source languages:
   - English
   - French
   - Mandarin Chinese (Simplified)

2. Translate the lyrics into the TWO missing languages only.

3. Group the lyrics by SENTENCES:
   - Each sentence must remain whole.
   - Do NOT split one sentence into multiple lines.
   - Separate each sentence with ONE blank line.
   - Preserve repetition exactly as written.
   - Preserve verse/chorus/bridge structure if present.

4. Ensure sentence alignment across all languages.
   Sentence 1 must correspond across all languages.
   Sentence 2 must correspond across all languages.
   Continue consistently.

OUTPUT FORMAT (STRICTLY FOLLOW ORIGINAL PARAGRAPH SEPARATION):

<b><Original sentence 1></b>
<p>(<First translation>)</p>
<p>(<Second translation >)</p>
`

export const translator = async (param: Param) => {

    const systemInstruction = `
    You are a professional multilingual song lyric translator.
    1. detect text language 
    2. if it is french translate to english and mandarin
    3. if it is enlgish translate to french and mandarin
    4. wrap translated sentences in parenthesis and <p> tag
    5. wrap the other sentences <strong> tag
    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: param.lyrics,
        config: { systemInstruction: systemInstruction }
    });

    return response.text

}

