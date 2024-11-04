{
//---------------------------
// This function handles replacing selected text by prompting the user with various options 
// for generating responses via the Gemini AI model.
//---------------------------
replaceText: {
	"Text": async function (app, text) {
  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("What do you want to do with this selected Text. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      // Selection for Gemini Model Variants
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, 
          { label: "Gemini 1.5 Flash-8B", value: "gemini-1.5-flash-8b" }, 
          { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" }, 
          { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" }
        ],
        value: "gemini-1.5-flash"
      },
      // Options for Prompting Type
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
          { label: "Summarize", value: "Summarize this text" },
          { label: "Rephrase", value: "Rephrase this text" },
          { label: "Explain/Define (Points)", value: "Explain or Define this text as points" },
          { label: "Explain/Define (Paragraph)", value: "Explain or Define this text as paragraph" },
          { label: "Actionable Points", value: "Convert into Actionable Points" },
          { label: "Answer Question", value: "Answer the below question" },
          { label: "Complete the Sentence", value: "Complete the Sentence" },
          { label: "Rhymes With (One-word)", value: "Give 5 Rhyming Synonyms and Antonyms" },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Summarize this text"
      },
      // Additional user inputs for customization of the AI response
	  { label: "AI System Instructions", placeholder: "Eg: You are a cat. Your name is Neko. OR You are a Teacher, Review my Document.", type: "text" },
      { label: "Add contextual information", placeholder: "Eg: Assume the audience is a group of high school students.", type: "string" },
      { label: "Specify any constraints", placeholder: "Eg: Summarize in no more than 50 words.", type: "string" },
      { label: "Define the format of the response", placeholder: "Eg: Provide a list of bullet points.", type: "string" },
      { label: "Specify the tone or style", placeholder: "Eg: Formal, friendly, persuasive", type: "string" },
      { label: "Other Free Text requests", placeholder: "Eg: Provide relevant examples or comparisons", type: "string" },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
  console.log("result",result);
  const modelVariantz = modelVariant;
  console.log("modelVariantz",modelVariantz);
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext:${promptContext || "None"}.\nConstraint:${promptConstraint || "None"}.\nFormat:${promptFormat || "Markdown"}.\nTone:${promptTone || "None"}.\nAdditional_Details:${promptOther || "None"}.\nText:${text}`;
	console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Response_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Details of text considered.</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${text}\n`;
	finalAIResponse += `> Prompt:${promptSelect}.\n> Context:${promptContext || "None"}.\n> Constraint:${promptConstraint || "None"}.\n> Format:${promptFormat || "Markdown"}.\n> Tone:${promptTone || "None"}.\n> Additional_Details:${promptOther || "None"}.`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
},
//---------------------------
// Function for handling options on a specific note by UUID
//---------------------------
noteOption: {
  "Note": async function (app, noteUUID) {
  // Prompt the user for desired actions with the note content
  const result = await app.prompt("What do you want to do with this Note. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, 
          { label: "Gemini 1.5 Flash-8B", value: "gemini-1.5-flash-8b" }, 
          { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" }, 
          { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" }
        ],
        value: "gemini-1.5-flash"
      },
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
          { label: "Summarize", value: "Summarize this text" },
          { label: "Rephrase", value: "Rephrase this text" },
          { label: "Actionable Points", value: "Convert into Actionable Points" },
          { label: "Answer Questions", value: "Answer the below questions" },
          { label: "Organise Groceries", value: "Sort and Organize Groceries as a list of shopping items" },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Summarize this text"
      },
      // Additional user inputs for customization of the AI response
	  { label: "AI System Instructions", placeholder: "Eg: You are a cat. Your name is Neko. OR You are a Teacher, Review my Document.", type: "text" },
      { label: "Add contextual information", placeholder: "Eg: Assume the audience is a group of high school students.", type: "string" },
      { label: "Specify any constraints", placeholder: "Eg: Summarize in no more than 50 words.", type: "string" },
      { label: "Define the format of the response", placeholder: "Eg: Provide a list of bullet points.", type: "string" },
      { label: "Specify the tone or style", placeholder: "Eg: Formal, friendly, persuasive", type: "string" },
      { label: "Other Free Text requests", placeholder: "Eg: Provide relevant examples or comparisons", type: "string" },
    ]
  });

  // If the result is falsy, the user canceled the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
  console.log("result",result);
  const modelVariantz = modelVariant;
  console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

	// Fetch and clean markdown content from the note
	const markdown = await app.getNoteContent({ uuid: noteUUID });
	// Clean the markdown content
	const cleanedMarkdown = markdown
	  .replace(/<!--[\s\S]*?-->/g, "")   // Remove HTML comments
	  .replace(/<mark[^>]*>/g, "")       // Remove opening <mark> tags with any attributes
	  .replace(/<\/mark>/g, "")          // Remove closing </mark> tags
	  .replace(/^\s*[\r\n]/gm, "");      // Remove empty lines (including those with only whitespace)

  //---------------------------
  // Load external library for AI response
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

    const API_KEY = app.settings["Gemini API Key"];
    const genAI = new GoogleGenerativeAI(API_KEY);

    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	console.log("aiModel",aiModel);

    const promptAI = `${promptSelect}.\nContext:${promptContext || "None"}.\nConstraint:${promptConstraint || "None"}.\nFormat:${promptFormat || "Markdown"}.\nTone:${promptTone || "None"}.\nAdditional_Details:${promptOther || "None"}.\nText:${cleanedMarkdown}`;
	console.log("promptAI",promptAI);

    const aiResponse = await aiModel.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result2) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Response_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Details of Note considered.</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Note: ${noteUUID}\n`;
	finalAIResponse += `> Prompt:${promptSelect}.\n> Context:${promptContext || "None"}.\n> Constraint:${promptConstraint || "None"}.\n> Format:${promptFormat || "Markdown"}.\n> Tone:${promptTone || "None"}.\n> Additional_Details:${promptOther || "None"}.`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
},
//---------------------------
// Function for handling options on a specific image by url
//---------------------------
imageOption: {
  "Text Image": async function (app, image) {
  console.log("image: " + image.src);
  console.log(image);

  // Prompt the user for desired actions with the note content
  const result = await app.prompt("What do you want to do with this Image. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, 
          { label: "Gemini 1.5 Flash-8B", value: "gemini-1.5-flash-8b" }, 
          { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" }, 
          { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" }
        ],
        value: "gemini-1.5-flash"
      },
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
          { label: "Summarize", value: "Summarize this text" },
          { label: "Rephrase", value: "Rephrase this text" },
          { label: "Actionable Points", value: "Convert into Actionable Points" },
          { label: "Answer Questions", value: "Answer the below questions" },
          { label: "Organise Groceries", value: "Sort and Organize Groceries as a list of shopping items" },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Summarize this text"
      },
      // Additional user inputs for customization of the AI response
	  { label: "AI System Instructions", placeholder: "Eg: You are a cat. Your name is Neko. OR You are a Teacher, Review my Document.", type: "text" },
      { label: "Add contextual information", placeholder: "Eg: Assume the audience is a group of high school students.", type: "string" },
      { label: "Specify any constraints", placeholder: "Eg: Summarize in no more than 50 words.", type: "string" },
      { label: "Define the format of the response", placeholder: "Eg: Provide a list of bullet points.", type: "string" },
      { label: "Specify the tone or style", placeholder: "Eg: Formal, friendly, persuasive", type: "string" },
      { label: "Other Free Text requests", placeholder: "Eg: Provide relevant examples or comparisons", type: "string" },
    ]
  });

  // If the result is falsy, the user canceled the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
  console.log("result",result);
  const modelVariantz = modelVariant;
  console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

    const promptAI = `${promptSelect}.\nContext:${promptContext || "None"}.\nConstraint:${promptConstraint || "None"}.\nFormat:${promptFormat || "Markdown"}.\nTone:${promptTone || "None"}.\nAdditional_Details:${promptOther || "None"}.`;
	console.log("promptAI",promptAI);

	// Use URL methods to get the filename with extension
	const filenameWithExtension = image.src.split('/').pop();

	// Separate the name and the extension
	const [name, extension] = filenameWithExtension.split('.');

	console.log("File name:", name);
	console.log("Extension:", extension);

  //---------------------------
  // Load external library for AI response
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext:${promptContext || "None"}.\nConstraint:${promptConstraint || "None"}.\nFormat:${promptFormat || "Markdown"}.\nTone:${promptTone || "None"}.\nAdditional_Details:${promptOther || "None"}.\nText:${image.caption}. ${image.text}`;
	console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [
        { label: "Copy", value: "copytxt" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result2) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Response_${YYMMDD}_${HHMMSS}`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

},
},
//---------------------------
// Function for handling options on a specific set of notes
//---------------------------
appOption: {
  "Multiple Notes": async function (app) {

  const result1 = await app.prompt("Select the Notes, that you want to do AI analysis for. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
		  { label: "Select the Note 1", type: "note" },
		  { label: "Select the Note 2", type: "note" },
		  { label: "Select the Note 3", type: "note" },
		  { label: "Select the Note 4", type: "note" },
		  { label: "Select the Note 5", type: "note" },
		  { label: "Select the Note 6", type: "note" },
		  { label: "Select the Note 7", type: "note" },
    ]
  });

  // If the result is falsy, the user canceled the operation
  if (!result1) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [note1, note2, note3, note4, note5, note6, note7] = result1;
  console.log("result1",result1);

  // Prompt the user for desired actions with the note content
  const result = await app.prompt("What do you want to do with this Notes. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      {
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" }, 
		  { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" }
        ],
        value: "gemini-1.5-pro"
      },
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
          { label: "Summarize", value: "Summarize these Multiple Notes" },
		  { label: "Compare", value: "Compare these Multiple Notes" },
		  { label: "Link them", value: "Find or Link these notes together" },
          { label: "Actionable Points", value: "Convert into Actionable Points from these Multiple Notes" },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Summarize these Multiple Notes"
      },
      // Additional user inputs for customization of the AI response
	  { label: "AI System Instructions", placeholder: "Eg: You are a cat. Your name is Neko. OR You are a Teacher, Review my Document.", type: "text" },
      { label: "Add contextual information", placeholder: "Eg: Assume the audience is a group of high school students.", type: "string" },
      { label: "Specify any constraints", placeholder: "Eg: Summarize in no more than 50 words.", type: "string" },
      { label: "Define the format of the response", placeholder: "Eg: Provide a list of bullet points.", type: "string" },
      { label: "Specify the tone or style", placeholder: "Eg: Formal, friendly, persuasive", type: "string" },
      { label: "Other Free Text requests", placeholder: "Eg: Provide relevant examples or comparisons", type: "string" },
    ]
  });

  // If the result is falsy, the user canceled the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
  console.log("result",result);
  const modelVariantz = modelVariant;
  console.log("modelVariantz",modelVariantz);
  let finalAIResponse;
  let markdown;

	// Assuming note1 to note7 are defined and accessible
	const notes = [note1, note2, note3, note4, note5, note6, note7];

	// Fetch and clean markdown content from the notes
	for (const note of notes) {
		// Check if note is not null
		if (note) {
			const noteContent = await app.getNoteContent({ uuid: note.uuid }) || "";
			markdown += `#0000#\n${note.name}\n${noteContent}`;
		}
	}

	// Clean the markdown content
	const cleanedMarkdown = markdown
	  .replace(/<!--[\s\S]*?-->/g, "")   // Remove HTML comments
	  .replace(/<mark[^>]*>/g, "")       // Remove opening <mark> tags with any attributes
	  .replace(/<\/mark>/g, "")          // Remove closing </mark> tags
	  .replace(/^\s*[\r\n]/gm, "");      // Remove empty lines (including those with only whitespace)

  //---------------------------
  // Load external library for AI response
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

    const API_KEY = app.settings["Gemini API Key"];
    const genAI = new GoogleGenerativeAI(API_KEY);

    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	console.log("aiModel",aiModel);

    const promptAI = `${promptSelect}.\nContext:${promptContext || "None"}.\nConstraint:${promptConstraint || "None"}.\nFormat:${promptFormat || "Markdown"}.\nTone:${promptTone || "None"}.\nAdditional_Details:${promptOther || "None"}.\nNote Info: Each Note is separated by #0000#\nNote Collection:${cleanedMarkdown}`;
	console.log("promptAI",promptAI);

    const aiResponse = await aiModel.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result2) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Response_${YYMMDD}_${HHMMSS}`;
	
	finalAIResponse += `\n### *<mark>Expand to Read more: Details of notes considered.</mark>* <!-- {"collapsed":true} -->\n`;

	for (let i = 0; i < notes.length; i++) {
		const note = notes[i];
		if (note) {
			finalAIResponse += `> note${i + 1}: ${note.name || ""}, ${note.tags || ""}\n`;
		}
	}
	
	finalAIResponse += `> Prompt:${promptSelect}.\n> Context:${promptContext || "None"}.\n> Constraint:${promptConstraint || "None"}.\n> Format:${promptFormat || "Markdown"}.\n> Tone:${promptTone || "None"}.\n> Additional_Details:${promptOther || "None"}.`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
},
//---------------------------
}