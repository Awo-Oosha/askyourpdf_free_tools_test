import { TOOLS_GEN_URL } from "@/config/config";
const url = `${TOOLS_GEN_URL}/generate`;

const locales:any = {
  en: "English",
  zh: "Chinese",
  ja: "Japanese",
  es: "Spanish",
  de: "German",
  fr: "French",
  ko: "Korean",
  pt: "Portuguese",
  ar: "Arabic",
};

export async function generateLyrics(text:any,parameters:any,lang:any){
    const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
    const data = {
      action: 'LYRICS_GENERATOR',
      text: text,
      parameters: parameters,
      model_temperature: 1,
      language: ln
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

export async function generateStory(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';

  const data = {
    action: 'STORY_GENERATOR',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generateBookTitle(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'BOOK_TITLE_GENERATOR',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generateRap(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'RAP_GENERATOR',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generateEssay(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'ESSAY_WRITER',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generatePoem(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'POEM_WRITER',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generateParagraph(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'PARAGRAPH_WRITER',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generateText(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'TEXT_GENERATOR',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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


export async function generateThesis(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'THESIS_STATEMENT',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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

export async function generateInstagramCaption(text:any,parameters:any,lang:any){
  const ln:any = locales['lang']!==null ? locales[lang].toString().toUpperCase():'ENGLISH';
  const data = {
    action: 'INSTAGRAM_CAPTION',
    text: text,
    parameters: parameters,
    model_temperature: 1,
    language: ln
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