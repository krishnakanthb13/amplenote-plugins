---
title: Reviewer - Critic
uuid: c5d02d0c-a395-11f0-bc07-33be5b20a6f9
version: 82
created: '2025-10-07T21:24:22+05:30'
updated: '2025-10-16T21:41:01+05:30'
tags:
  - '-9-permanent'
  - '-amplenote/mine'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Reviewer - Critic|
|Icon<!-- {"cell":{"colwidth":105}} -->|notification_important|
|Setting|Gemini API Key|
|Description|Get some Daily AI Critic Reviews (AI Playing Devils Advocate).|
|Instructions|Initial set up - same as [Gemini AI Plugin](https://www.amplenote.com/plugins/GhcHPJJS2wrcx9Y8rdUhzLTt) <br />After adding your <mark style="color:#F3DE6C;">`Gemini AI API key`<!-- {"cycleColor":"36"} --></mark> go to App-Options by typing<mark style="color:#F3DE6C;">`ctrl+o/cmd+o`<!-- {"cycleColor":"36"} --></mark>, search for <mark style="color:#F3DE6C;">`Reviewer - Critic`<!-- {"cycleColor":"36"} --></mark>`.`<br />Fill in the details like <mark style="color:#F3DE6C;">`topic`<!-- {"cycleColor":"36"} --></mark> and click on <mark style="color:#F3DE6C;">`Submit`<!-- {"cycleColor":"36"} --></mark>.<br />*You should be able to get the Affirmations on the Genre mentioned!<br />Get creative, be explorative when selecting the Genre.<br />Keep it as reference for the future.*|
\

```
{
  async appOption(app) {

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("AI Reviewer Critic to start with. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      // Selection for Gemini Model Variants
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 2.5 Flash", value: "gemini-2.5-flash" }, 
          { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" }, 
          { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro" }, 
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }
        ],
        value: "gemini-2.5-flash"
      },
      // Additional user inputs for customization of the AI response
	  { label: "Topic", placeholder: "Eg: The value of remote work, AI in daily life, social media addiction, electric vehicles, privacy online, fast fashion, renewable energy, universal healthcare, online education, and productivity tools, etc,.", type: "text" },
      { label: "Keep It Simple (Default: Extensive!)", type: "checkbox" },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }
  
  app.alert("Operation has started. It may take a couple of seconds for it to complete!");

  // Extract user-selected inputs
  const [modelVariant, promptDetails, keepSimple] = result;
  // console.log("result",result);  
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;
  const keepsimple1 = keepSimple ? "\nNote: Keep it short and simple!" : "";

  //---------------------------
  // Load the external Google Generative AI library
  //---------------------------
  function _loadLibrary(url) {
    return import(url);
  }

  _loadLibrary("https://esm.run/@google/generative-ai").then(async ({ GoogleGenerativeAI, HarmBlockThreshold, HarmCategory }) => {
	// Safety Settings
	const safetySettings = [
	  {
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	  },
	  {
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	  },
	];

    // Initialize GoogleGenerativeAI instance with API key
    const API_KEY = app.settings["Gemini API Key"]; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Fetch the generative model specified by the user
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, safetySettings });
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = 
`Adopt the role of a critical reviewer and devil’s advocate, then Brainstrom in multilevel aspect. 
Analyze the following context for logical, ethical, strategic, and practical weaknesses. 
Identify blind spots, opposing viewpoints, and areas where the reasoning could fail under scrutiny. 
Then, suggest how these weaknesses could be strengthened or defended. 
Topic: ${promptDetails || "Random Topic"}..${keepsimple1}`;
      
/* `Act as a devil’s advocate and provide a critical review of the following context. 
Challenge its assumptions, point out weaknesses, alternative perspectives, and potential flaws in reasoning. 
Be rigorous, logical, and objective in your critique.
Topic: ${promptDetails || "Random Topic"}..${keepsimple1}`; Simpler Prompt */ 
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Reviewer_Critic_${YYMMDD}_${HHMMSS}`;
	
	// finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `\n> Topic: ${promptDetails || "Random Topic"}.\n> When: ${filename}`;
	// finalAIResponse += `\n---`;

	// return finalAIResponse;
	// app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	// console.log("Critic - Content Added.");

	const noteUUIDNew = await app.createNote(`${promptDetails || "Random Topic"}`, [ "-reports/-critics" ]);
	// console.log("New note Created.");
	await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	// console.log("Critic - Content Added.");
	
	app.alert(`Operation has been Completed. You can start with your AI Critic Reviews Exploration on the mentioned genre.`);
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  },
}
```