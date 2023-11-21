import { TOOLS_GEN_URL } from "@/config/config";
export async function generateLyrics(text:any,parameters:any){
    const url = `${TOOLS_GEN_URL}/generate`;

    const data = {
      action: 'LYRICS_GENERATOR',
      text: text,
      parameters: parameters,
      model_temperature: 1,
      language: 'ENGLISH'
    };
    
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return req;
}