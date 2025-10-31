---
title: Quotes Pro
uuid: e26c4194-9ed1-11f0-a5d0-2374c354183a
version: 126
created: '2025-10-01T19:51:12+05:30'
updated: '2025-10-31T17:42:05+05:30'
tags:
  - '-9-permanent'
  - '-amplenote/mine'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Quotes Pro|
|Icon<!-- {"cell":{"colwidth":105}} -->|format_quote|
|Setting|Gemini API Key|
|Description|Get some AI Generated Quotes to start your Journey.<br />Additionally get its meaning, implementation steps, why does it exists as a quote!|
|Instructions|Initial set up - same as [Gemini AI Plugin](https://www.amplenote.com/plugins/GhcHPJJS2wrcx9Y8rdUhzLTt) <br />After adding your <mark style="color:#F3DE6C;">`Gemini AI API key`<!-- {"cycleColor":"36"} --></mark> go to App-Options by typing<mark style="color:#F3DE6C;">`ctrl+o/cmd+o`<!-- {"cycleColor":"36"} --></mark>, search for <mark style="color:#F3DE6C;">`Quotes Pro`<!-- {"cycleColor":"36"} --></mark>`.`<br />Fill in the details like <mark style="color:#F3DE6C;">`genre`<!-- {"cycleColor":"36"} --></mark> and click on <mark style="color:#F3DE6C;">`Submit`<!-- {"cycleColor":"36"} --></mark>.<br />*You should be able to get the Quote on the Topic mentioned!<br />Get creative, be explorative when selecting the Genre.<br />Keep it as reference for the future.*|
\

```
{
  async appOption(app) {

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("Quote Generation to start with. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
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
	  // { label: "Quote Genre", placeholder: "Eg: Love, Life, Inspirational, Humor, Philosophy, God, Truth, Wisdom, Romance, Poetry, Life Lessons, Death, Happiness, Hope, Faith, Motivation, Success, Time, Science, Friendship, Relationships, Religion, Writing, Travel, Leadership, Kindness, Knowledge, Justice, Politics, Art, Education, Freedom, Family, Courage, Beauty, Failure, Dreams, Change, Attitude, Forgiveness, Gratitude, Self-Improvement, Personal Growth, Funny, Sadness, Adventure, Health, Parenting, History, Work, Passion, Respect, Peace, Emotions, etc,.", type: "text" },
	  { label: "Quote Genre", placeholder: "Eg: Love, Life, Inspirational, Humor, Philosophy, Friendship, Wisdom, Romance, Happiness, Hope, Faith, Motivation, Success, Time, Relationships, Writing, Travel, Family, Courage, Change, Attitude, Forgiveness, etc,.", type: "text" },
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
    const promptAI = `Give me a Quote on the Topic: ${promptDetails || "Random Topic"}.\nAlong with its (1) Meaning, (2) How to Implement it in ones life, (3) Why does this Quote exits!.\nFinal out put should be in a Markdown Formatted and the content should guide the user to navigate through the Quote.\nEg: (### Genre\n- Quote:\n- Meaning:\n- Implementation:\n- Why:.${keepsimple1}`;
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
    const filename = `Quotes_Pro_${YYMMDD}_${HHMMSS}`;
	
	// finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `\n> Topic: ${promptDetails || "Random Topic"}.\n> When: ${filename}.\n> Keep It Simple: ${keepSimple}.`;
	// finalAIResponse += `\n---`;

	// return finalAIResponse;
	// app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	// console.log("Quotes - Content Added.");

	const noteUUIDNew = await app.createNote(`${promptDetails || "Random Topic"}`, [ "-reports/-quotes" ]);
	// console.log("New note Created.");
	await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	// console.log("Quotes - Content Added.");
	
	app.alert(`Operation has been Completed. You can start with your Quote Exploration on the mentioned genre.`);
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  },
}
```