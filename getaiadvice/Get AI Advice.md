---
title: Get AI Advice
uuid: b064eed2-cb48-11f0-bc18-d9369ad8bd4c
version: 8
created: '2025-11-27T09:52:31+05:30'
updated: '2025-11-27T10:01:06+05:30'
tags:
  - '-9-permanent'
  - '-amplenote/mine'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Get AI Advice|
|Icon|lightbulb|
|Setting|Gemini API Key|
|Description|Fetches a random piece of advice from the Advice Slip API and inserts it into your note.|
|Instructions|Initial set up - same as [Gemini AI Plugin](https://www.amplenote.com/plugins/GhcHPJJS2wrcx9Y8rdUhzLTt) <br />After adding your <mark style="color:#F3DE6C;">`Gemini AI API key`<!-- {"cycleColor":"36"} --></mark> go to App-Options by typing<mark style="color:#F3DE6C;">`ctrl+o/cmd+o`<!-- {"cycleColor":"36"} --></mark>, search for <mark style="color:#F3DE6C;">`Get AI Advice`<!-- {"cycleColor":"36"} --></mark>`.`<br />Fill in the details like <mark style="color:#F3DE6C;">`Advice On Topic`<!-- {"cycleColor":"36"} --></mark> and click on <mark style="color:#F3DE6C;">`Submit`<!-- {"cycleColor":"36"} --></mark>.<br />*You should be able to get the Gemini AI Review on the Mood Ratings mentioned in a new Note!<br />Keep it as reference for the future.*|
\

```
{
  async appOption(app) {

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("Advice Generation to start with. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
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
	  { label: "Advice On Topic",  placeholder: "Self-Love, Confidence, Motivation, Success, Health, Happiness, Personal Growth, Clarity, Spirituality, Relationships, Career, Mindfulness, Resilience, Inner Peace, Abundance.", type: "text" },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }
  
  app.alert("Operation has started. It may take a couple of seconds for it to complete!");

  // Extract user-selected inputs
  const [modelVariant, promptDetails] = result;
  // console.log("result",result);  
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

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
    const promptAI = `Give me Advice on the Topic: ${promptDetails || "Random Topic"}.\nFinal out put should be in a Markdown Formatted and the content should guide the user to navigate through the Topic mentioned.`;
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
    const filename = `AI_Advice_${YYMMDD}_${HHMMSS}`;
	
	// finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `\n> Topic: ${promptDetails || "Random Topic"}.\n> When: ${filename}.`;
	// finalAIResponse += `\n---`;

	// return finalAIResponse;
	// app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	// console.log("AI Advice - Content Added.");

	const noteUUIDNew = await app.createNote(`${promptDetails || "Random Topic"}`, [ "-reports/-ai-advice" ]);
	// console.log("New note Created.");
	await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	// console.log("AI Advice - Content Added.");
	
	app.alert(`Operation has been Completed. You can start your Enlightment with AI Advice on the mentioned Topic.`);
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  },
}
```