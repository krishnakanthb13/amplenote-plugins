---
title: Mood Ratings - Gemini AI Reviewer
uuid: 2bd60d56-b5b6-11f0-a446-9bd5537bb236
version: 7
created: '2025-10-30T23:00:49+05:30'
updated: '2025-10-30T23:08:37+05:30'
tags:
  - '-amplenote/mine'
  - '-9-permanent'
---

| | |
|-|-|
|Name<!-- {"cell":{"colwidth":102}} -->|Mood Ratings - Gemini AI Reviewer|
|Icon<!-- {"cell":{"colwidth":105}} -->|mood|
|Setting|Gemini API Key|
|Description|Get some AI Reviewed Mood Ratings, to get an second eye on your Mood Ratings.|
|Instructions|Initial set up - same as [Gemini AI Plugin](https://www.amplenote.com/plugins/GhcHPJJS2wrcx9Y8rdUhzLTt) <br />After adding your <mark style="color:#F3DE6C;">`Gemini AI API key`<!-- {"cycleColor":"36"} --></mark> go to App-Options by typing<mark style="color:#F3DE6C;">`ctrl+o/cmd+o`<!-- {"cycleColor":"36"} --></mark>, search for <mark style="color:#F3DE6C;">`Mood Ratings - Gemini AI Review`<!-- {"cycleColor":"36"} --></mark>`.`<br />Fill in the details like <mark style="color:#F3DE6C;">`day count`<!-- {"cycleColor":"36"} --></mark> and click on <mark style="color:#F3DE6C;">`Submit`<!-- {"cycleColor":"36"} --></mark>.<br />*You should be able to get the Gemini AI Review on the Mood Ratings mentioned in a new Note!<br />Keep it as reference for the future.*|
\

```
{
  async appOption(app) {

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("Mood Ratings Reviewer - Google AI. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
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
      { label: "Number of Days Prior too?", type: "string", value: 10 },
      { label: "Include Comprehensive Review Report.", type: "checkbox" },
      { label: "Simple Paragraph Review Report.", type: "checkbox" },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }
  
  app.alert("Operation has started. It may take a couple of seconds for it to complete!");

  // Extract user-selected inputs
  const [modelVariant, numberOfDays, compreReport, simpleReport] = result;
  // console.log("result",result);  
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

  const from = Math.floor(Date.now() / 1000) - (60 * 60 * 24 * numberOfDays);
  const moodRatings = await app.getMoodRatings(from);
  // console.log(JSON.stringify(moodRatings));
  console.log("Mood ratings:\n" + JSON.stringify(moodRatings, ["note", "rating", "timestamp"], 0));
  const promptDetails = JSON.stringify(moodRatings, ["note", "rating", "timestamp"], 0);

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
    let promptAI = ``;

    // Construct the prompt to be sent to the AI model
    if (!compreReport && !simpleReport) {
      promptAI = `Review Mood Ratings: ${promptDetails}.\nFinal out put should be in a Markdown Formatted and the response should guide the user to navigate through the Mood Ratings Mentioned.\nEg: - 1:\n - 2:\n - 3:\n`;
	} else if (compreReport && !simpleReport) {
      promptAI = `Review Mood Ratings: ${promptDetails}.\nFinal out put should be in a Markdown Formatted and the response should be Comprehensive for all Mood Ratings combined`;
    } else if (!compreReport && simpleReport) {
      promptAI = `Review Mood Ratings: ${promptDetails}.\nFinal out put should be in a Markdown Formatted and the response should have a one paragraph reviewing all Mood Ratings combined`;
    } else if (compreReport && simpleReport) {
      promptAI = `Review Mood Ratings: ${promptDetails}.\nFinal out put should be in a Markdown Formatted and the response should be Comprehensive and have a one paragraph reviewing all Mood Ratings combined`;
    }
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
    const filename = `MRReview_${YYMMDD}_${HHMMSS}`;
	
	// finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `\n> Mood Ratings: ${promptDetails}.\n> When: ${filename}`;
    if (compreReport || simpleReport) {
      finalAIResponse += `\n> Include Comprehensive Review Report: ${compreReport}.\n> Simple Paragraph Review Report: ${simpleReport}`;
    }
	// finalAIResponse += `\n---`;

	// return finalAIResponse;
	// app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	// console.log("Mood Ratings - Content Added.");

	const noteUUIDNew = await app.createNote(filename, [ "-reports/-mood-ratings" ]);
	// console.log("New note Created.");
	await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	// console.log("Mood Ratings - Content Added.");
	
	app.alert(`Operation has been Completed. You can start with your Mood Ratings Reviews - Gemini AI.`);
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  },
}
```