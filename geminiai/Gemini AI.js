{
//---------------------------
// This function handles replacing selected text by prompting the user with various options 
// for generating responses via the Gemini AI model.
//---------------------------
// Main Section //
replaceText: {
	"Selected Text": async function (app, text) {
  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("What do you want to do with this selected Text. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nText: ${text}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
		// { label: "Insert", value: "insert" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Text_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${text}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "None"}.\n> Format: ${promptFormat || "Markdown"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
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
// Main Section //
noteOption: {
  "Note": async function (app, noteUUID) {
  // Prompt the user for desired actions with the note content
  const result = await app.prompt("What do you want to do with this Note. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 2.5 Flash", value: "gemini-2.5-flash" }, 
          { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" }, 
          { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro" }, 
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }
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
  // console.log("result",result);
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
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
	// console.log("aiModel",aiModel);

    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nText: ${cleanedMarkdown}`;
	// console.log("promptAI",promptAI);

    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

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
    const filename = `AI_Note_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Note: ${noteUUID}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context:${promptContext || "None"}.\n> Constraint: ${promptConstraint || "None"}.\n> Format: ${promptFormat || "Markdown"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
//---------------------------
// Function for handling options on a specific note by UUID
//---------------------------
// Main Section //
  "Note Name Tag": async function (app, noteUUID) {
	  // console.log("noteUUID", noteUUID);
	  
	  const noteHandle = await app.findNote({ uuid: noteUUID });
	  // console.log("noteHandle", noteHandle);

  // Prompt the user for desired actions with the note content
  const result = await app.prompt("What do you want to do with this Note's Name and Tags. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 2.5 Flash", value: "gemini-2.5-flash" }, 
          { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" }, 
          { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro" }, 
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }
        ],
        value: "gemini-1.5-flash"
      },
      { 
        label: `Update Name.`,
        type: "radio", 
        options: [
          { label: `Keep - Current Name: ${noteHandle.name}`, value: "nothing" },
          { label: "Based on Other Notes in the Same Tag + Content (Resource Intensive*)", value: "nametagcontent" },
          { label: "Based on only Content", value: "content" },
          { label: "Random Name (Feeling lucky?)", value: "random" }
        ],
        value: "nothing"
      },
      { 
        label: `Update Tags.`,
        type: "radio", 
        options: [
		  { label: `Keep - Current Tag/s: ${noteHandle.tags}`, value: "nothing" },
		  { label: "Based on Other Avaliable Tags + Content (Resource Intensive*)", value: "existtagcontent" },
          { label: "Based on only Content", value: "content" },
          { label: "Random Name (Feeling lucky?)", value: "random" }
        ],
        value: "nothing"
      },
    ]
  });

  // If the result is falsy, the user canceled the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [modelVariant, nameUpdate, tagUpdate] = result;
  // console.log("result",result);
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

	// Fetch and clean markdown content from the note
	const markdown = await app.getNoteContent({ uuid: noteUUID });
	// Clean the markdown content
	const cleanedMarkdown = markdown
	  .replace(/<!--[\s\S]*?-->/g, "")   // Remove HTML comments
	  .replace(/<mark[^>]*>/g, "")       // Remove opening <mark> tags with any attributes
	  .replace(/<\/mark>/g, "")          // Remove closing </mark> tags
	  .replace(/^\s*[\r\n]/gm, "");      // Remove empty lines (including those with only whitespace)

	// Step 1: Get unique tags and sort them (Generally All Tags - Attached to Notes)
	let notesT = [];
	notesT = await app.filterNotes({ });
	const noteTags = Array.from(new Set(notesT.flatMap(note => note.tags))).sort();
	// console.log("noteTags", noteTags);
	
	// Split tags into an array
	let notesN = [];
	const tagNameTags = noteHandle.tags;
	// Ensure tags are in an array format
	const tagsArray = Array.isArray(tagNameTags) ? tagNameTags : 
					  (typeof tagNameTags === "string" ? tagNameTags.split(',').map(tag => tag.trim()) : []);	
	// Filter notes based on tags
	if (tagsArray.length > 0) {
		for (let tag of tagsArray) {
			let taggedNotes = await app.filterNotes({
				tag, group: "^vault"
			});
			notesN = notesN.concat(taggedNotes);
		}
	} else {
		notesN = await app.filterNotes({
			tag: "", group: "^vault"
		});
	} 
	// Step 2: Get unique names and sort them (All Note Names - Linked to the Tag or Tags)
	const noteNames = Array.from(new Set(notesN.flatMap(note => note.name || []))).sort();
	// console.log("noteNames", noteNames);

	let promptAI = "";
	let includeContent = false;

	// Check if either nameUpdate or tagUpdate requires content
	/* if ((nameUpdate === "content" || nameUpdate === "nametagcontent") || 
		(tagUpdate === "content" || tagUpdate === "existtagcontent")) {
		includeContent = true;
	} */

	// Handle Name conditions
	if (nameUpdate === "random") {
		promptAI += `
List 5 Random Names for a note. (Keep it short and simple)
NoteName = {'Names': string}
Return using JavaSript: Array<NoteName>`;
	} else if (nameUpdate === "content") {
		promptAI += `
List 5 Note Names for a note, by using the content below. (Keep it short and simple)
Content: ${cleanedMarkdown}
NoteName = {'Names': string}
Return using JavaSript: Array<NoteName>`;
	} else if (nameUpdate === "nametagcontent") {
		promptAI += `
List 5 Note Names for a note, by using the below-mentioned list of Note Names as a Template. (Keep it short and simple)
Existing Names: ${JSON.stringify(notesN)}
NoteName = {'Names': string}
Return using JavaSript: Array<NoteName>`;
	}

	promptAI += `\n`;

	// Handle Tag conditions
	if (tagUpdate === "random") {
		promptAI += `
List 5 Random Tags for a note. (Keep it short and simple, hierarchy is allowed using "/")
NoteTag = {'Tags': string}
Return using JavaSript: Array<NoteTag>`;
	} else if (tagUpdate === "content") {
		promptAI += `
List 5 Random Tags for a note, using the content below. (Keep it short and simple, hierarchy is allowed using "/")
Content: ${cleanedMarkdown}
NoteTag = {'Tags': string}
Return using JavaSript: Array<NoteTag>`;
	} else if (tagUpdate === "existtagcontent") {
		promptAI += `
List 5 Random Tags for a note, using the below-mentioned list of Tags, if any match. (Keep it short and simple, hierarchy is allowed using "/")
Eg Names: ${JSON.stringify(notesT)}
NoteTag = {'Tags': string}
Return using JavaSript: Array<NoteTag>`;
	}

	// Include content if required
	/* if (includeContent) {
		promptAI += `
Content: ${cleanedMarkdown}`;
	} */

	// console.log("promptAI", promptAI);

  //---------------------------
  // Load external library for AI response
  //---------------------------
  function _loadLibrary(url) {
    return import(url);
  }

  _loadLibrary("https://esm.run/@google/generative-ai").then(async ({ GoogleGenerativeAI, SchemaType, HarmBlockThreshold, HarmCategory }) => {
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

	const schema = {
	  description: "List of items with names and tags",
	  type: SchemaType.ARRAY,
	  items: {
		type: SchemaType.OBJECT,
		properties: {
		  name: {
			type: SchemaType.STRING,
			description: "Name of the item",
			nullable: true,
		  },
		  tag: {
			type: SchemaType.STRING,
			description: "Tag associated with the item",
			nullable: true,
		  },
		},
		// required: ["name"], // Make "name" required, "tag" optional
	  },
	};

    const API_KEY = app.settings["Gemini API Key"];
    const genAI = new GoogleGenerativeAI(API_KEY);

    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, safetySettings, generationConfig: {
			responseMimeType: "application/json",
			responseSchema: schema,
		  },
	  });
	// console.log("aiModel",aiModel);

    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

	// Parse finalAIResponse if it's a JSON string
	let parsedResponse;
	try {
	  parsedResponse = JSON.parse(finalAIResponse);
	} catch (e) {
	  console.error("Error parsing finalAIResponse:", e);
	}

	let namesArray;
	let tagsArray;	

	// Check if parsedResponse is an array, then proceed
	if (Array.isArray(parsedResponse)) {
	  namesArray = parsedResponse.filter(item => item.name).map(item => item.name);
	  tagsArray = parsedResponse.filter(item => item.tag).map(item => item.tag);
	  
	  // Convert the namesArray and tagsArray to an array of objects
	  namesArray = namesArray.map((name, index) => ({
		  label: name,
		  // value: index + 1  // Assigning an incremental value
		  value: name
		}));
	  tagsArray = tagsArray.map((tag, index) => ({
		  label: tag,
		  // value: index + 1  // Assigning an incremental value
		  value: tag
		}));

	  // console.log("namesArray:", namesArray);
	  // console.log("tagsArray:", tagsArray);
	} else {
	  console.error("finalAIResponse is not an array.");
	}

  // Prompt the user for desired actions with the note content
  const resultDecide = await app.prompt("What do you want to do with this Note's Name and Tags. Caution: Submitting this will make the changes.", {
    inputs: [
      { 
        label: `Update Name.`,
        type: "radio", 
		options: namesArray,
      },
      { 
        label: `Update Tags.`,
        type: "radio", 
		options: tagsArray,
      },
    ]
  });

  // If the result is falsy, the user canceled the operation
  if (!resultDecide) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }

  // Extract user-selected inputs
  const [nameUpdateDecide, tagUpdateDecide] = resultDecide;
  // console.log("resultDecide:", resultDecide);
  // console.log("nameUpdateDecide:", nameUpdateDecide);
  // console.log("tagUpdateDecide:", tagUpdateDecide);

	if (nameUpdateDecide) {
		const nameAdded = await app.setNoteName(noteHandle, nameUpdateDecide);
		await app.alert(nameAdded ? "Note Name Updated" : "Failed to Update Note Name");
	}

	if (tagUpdateDecide) {
		const tagAdded = await app.addNoteTag({ uuid: noteUUID }, tagUpdateDecide);
		await app.alert(tagAdded ? "Tag added" : "Failed to add tag");
	}

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
	  
},
},
//---------------------------
// Function for handling options on a specific image by url
//---------------------------
// Main Section //
imageOption: {
  "Text Image": async function (app, image) {
  // console.log("image: " + image.src);
  // console.log(image);

  // Prompt the user for desired actions with the note content
  const result = await app.prompt("What do you want to do with this Image. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 2.5 Flash", value: "gemini-2.5-flash" }, 
          { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" }, 
          { label: "Gemini 2.5 Pro", value: "gemini-2.5-pro" }, 
          { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }
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
  // console.log("result",result);
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.`;
	// console.log("promptAI",promptAI);

	// Use URL methods to get the filename with extension
	const filenameWithExtension = image.src.split('/').pop();

	// Separate the name and the extension
	const [name, extension] = filenameWithExtension.split('.');

	// console.log("File name:", name);
	// console.log("Extension:", extension);

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
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nText: ${image.caption}. ${image.text}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

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
    const filename = `AI_Image_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${image.caption}. ${image.text}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Energy Level: ${energyLevels}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "Keep it as short as possible."}.\n> Format: ${promptFormat || "Simple Markdown based on Prompt"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
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
// Main Section //
appOption: {
  "Include Multiple Notes For AI Prompting": async function (app) {

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
  // console.log("result1",result1);

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
  // console.log("result",result);
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
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
	// console.log("aiModel",aiModel);

    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nNote Info: Each Note is separated by #0000#\nNote Collection: ${cleanedMarkdown}`;
	// console.log("promptAI",promptAI);

    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

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
    const filename = `AI_MultiNote_Res_${YYMMDD}_${HHMMSS}`;
	
	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;

	for (let i = 0; i < notes.length; i++) {
		const note = notes[i];
		if (note) {
			finalAIResponse += `> note${i + 1}: ${note.name || ""}, ${note.tags || ""}\n`;
		}
	}
	
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "None"}.\n> Format: ${promptFormat || "Markdown"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
//---------------------------
// for generating responses via the Gemini AI model. Grounding with Google Search
//---------------------------
// Main Section //
	"Grounding with Google Search (Paid*)": async function (app) {
  // Prompt the user for input on desired actions with the selected text.

  const resultz = await app.prompt("Caution: This is a Paid Feature: [$35 / 1K grounding requests (for up to 5K requests per day)]. For latest and additional details visit: https://ai.google.dev/pricing. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { 
        label: "Do you like to proceed?", 
        type: "radio", 
        options: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ]
      }
    ]
  });

  // Exit if the user cancels the operation
  if (!resultz) { return; }
  if (resultz !== "Yes") { return; }

  const result = await app.prompt("Do a Simple General AI Text Search. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
	  { label: "Input / Paste your Text to be sent to Gemini AI for Text Generation", placeholder: "Eg: Tell me about Amplenote note taking methods.", type: "text" },
      // Selection for Gemini Model Variants
      { 
        label: "Gemini Model variants", 
        type: "select", 
        options: [
          { label: "Gemini 2.5 Flash", value: "gemini-2.5-flash" }, 
          { label: "Gemini 2.0 Flash", value: "gemini-2.0-flash" }, 
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
	  // { label: "AI System Instructions", placeholder: "Eg: You are a cat. Your name is Neko. OR You are a Teacher, Review my Document.", type: "text" },
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
  // const [inputText, modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
  const [inputText, modelVariant, promptSelect, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
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

  _loadLibrary("https://esm.run/@google/generative-ai").then(async ({ DynamicRetrievalMode, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory }) => {
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
	const aiModel = genAI.getGenerativeModel(
	  {
		model: `${modelVariantz}`,
		// safetySettings,
		tools: [
		  {
			googleSearchRetrieval: {
			  dynamicRetrievalConfig: {
				mode: DynamicRetrievalMode.MODE_DYNAMIC,
				dynamicThreshold: 0.7,
			  },
			},
		  },
		],
	  },
	  { apiVersion: "v1beta" },
	);

	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    // const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nText: ${inputText}`;
	const promptAI = `${inputText}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.candidates[0].groundingMetadata;
	// console.log("finalAIResponse",finalAIResponse);

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
    const filename = `AI_GSearch_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${inputText}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "None"}.\n> Format: ${promptFormat || "Markdown"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
//---------------------------
// for generating responses via the Gemini AI model.
//---------------------------
// Main Section //
	"General AI Text Generation": async function (app) {
  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("Do a Simple General AI Text Search. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
	  { label: "Input / Paste your Text to be sent to Gemini AI for Text Generation", placeholder: "Eg: Tell me about Amplenote note taking methods.", type: "text" },
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
  const [inputText, modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nText: ${inputText}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

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
    const filename = `AI_General_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${inputText}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "None"}.\n> Format: ${promptFormat || "Markdown"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
},
//---------------------------
// For a Task
//---------------------------
// Main Section //
taskOption: {
	"Task": async function (app, task) {

	// console.log("Task Json Details",JSON.stringify(task));
	const taskInfo = task;
	// console.log("taskInfo",taskInfo);

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("What do you want to do with this Task. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
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
        value: "gemini-1.5-flash"
      },
      // Options for Prompting Type
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
		  { label: "Give Reasons: Why Should I Do This?", value: "Outline reasons to accomplish this task, adding motivational quotes, affirmations, or positive reinforcements bullet points." },
		  { label: "Elaborate on the Task", value: "Expand on the task into a 500-word paragraph to gain clarity and depth." },
		  { label: "Break Task into Smaller Steps", value: "Divide the task into smaller, manageable steps. Assess complexity and prioritize the steps with helpful hints." },
		  { label: "Break & Assign Deadlines", value: "Divide the task into smaller, manageable steps. Set realistic deadlines for each part of the task to create a timeline for completion." },
		  { label: "Identify Required Resources", value: "List the tools, information, or resources needed to complete the task efficiently." },
		  { label: "Identify Potential Obstacles", value: "Anticipate possible challenges and outline solutions to stay prepared and motivated." },
		  { label: "Define Success Criteria", value: "Describe how you’ll know when the task is complete, establishing clear success markers." },
		  { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
		],
        value: "Outline reasons to accomplish this task, adding motivational quotes, affirmations, or positive reinforcements bullet points."
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "None"}.\nFormat: ${promptFormat || "Markdown"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\n\nTask Details\nTask Content: ${taskInfo.content || "None"}.\nImportant: ${taskInfo.important || "No"}.\nUrgent: ${taskInfo.urgent || "No"}.\nStartsAt: ${taskInfo.startAt || "None"}.\nEndsAt: ${taskInfo.endAt || "None"}.\nTaskScore: ${taskInfo.score || 0}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
        { label: "Linked New Note", value: "newnote" },
      ]
    });

    if (!result) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Task_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "None"}.\n> Format: ${promptFormat || "Markdown"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.\n\n> **Task Details**\n> Task Content: ${taskInfo.content || "None"}.\n> Important: ${taskInfo.important || "No"}.\n> Urgent: ${taskInfo.urgent || "No"}.\n> StartsAt: ${taskInfo.startAt || "None"}.\n> EndsAt: ${taskInfo.endAt || "None"}.\n> TaskScore: ${taskInfo.score || 0}`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      // await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	  const noteHandle = await app.findNote({ uuid: noteUUIDNew });
	  const taskNewContent = `${taskInfo.content} [${filename}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
	  await app.updateTask(taskInfo.uuid, { content: taskNewContent  });
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
		
},
},
//---------------------------
// For a Insert Text Option
//---------------------------
// Main Section //
insertText: {
	"Insert": async function (app) {

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("What do you want to Search AI Today. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { label: "Input your Topic / Prompt of Interest.", placeholder: "Eg: Learning something New / I am feeling Lucky / How to use Amplenote.", type: "text" },
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
        value: "gemini-1.5-flash"
      },
      // Options for Prompting Type
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
          { label: "Explain/Define (Points)", value: "Explain or Define this text as points" },
          { label: "Explain/Define (Paragraph)", value: "Explain or Define this text as paragraph" },
          { label: "Summarize", value: "Summarize this text" },
          { label: "Rephrase", value: "Rephrase this text" },
          { label: "Actionable Points", value: "Convert into Actionable Points" },
          { label: "Answer Question", value: "Answer the below question" },
          { label: "Complete the Sentence", value: "Complete the Sentence" },
          { label: "Rhymes With (One-word)", value: "Give 5 Rhyming Synonyms and Antonyms" },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Explain or Define this text as points"
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
  const [inputText, modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "Keep it as short as possible."}.\nFormat: ${promptFormat || "Simple Markdown based on Prompt"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nText: ${inputText}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
		// { label: "Insert", value: "insert" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Insert_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${inputText}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "Keep it as short as possible."}.\n> Format: ${promptFormat || "Simple Markdown based on Prompt"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "insert") {
	  return finalAIResponse;
	  // console.log("AI Response Inserted");
	} else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	  // const noteHandle = await app.findNote({ uuid: noteUUIDNew });
	  // const newNoteLink = `[${filename}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
	  // return newNoteLink;
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
},
},
//---------------------------
// This function handles replacing selected text by prompting the user with various options 
// for generating responses via the Gemini AI model.
//---------------------------
// Main Section //
dailyJotOption: {
	"Plan Today": async function (app, noteHandle) {
      // console.log("noteHandle",noteHandle);

	let dailyJotNote = await app.filterNotes({ tag: `${noteHandle.tags}`, group: "^vault", query: noteHandle.name });
	// console.log("dailyJotNote",dailyJotNote);
	// console.log("dailyJotNote",dailyJotNote[0].uuid);
	const currentNoteuuid = dailyJotNote[0].uuid;
	// console.log("currentNoteuuid",currentNoteuuid);

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("What do you want to Search AI Today. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { label: "Input your Task / Plan For Today.", placeholder: "Eg: Cleaning my Cupboard, Rest Day, Movie Time, Family Time, Self-reflecting Day", type: "text" },
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
        value: "gemini-1.5-flash"
      },
      { 
        label: "Energy Levels", 
        type: "select", 
        options: [
		  { label: "Low - Drained, Need a Gentle Push", value: "Low - Drained, Need a Gentle Push" },
		  { label: "Normal - Calm, Relaxed", value: "Normal - Calm, Relaxed" },
		  { label: "High - Excited, Possibility", value: "High - Excited, Possibility" },
		  { label: "Extra-ordinary - Delighted, Abundance", value: "Extra-ordinary - Delighted, Abundance" },
        ],
        value: "Normal - Calm, Relaxed"
      },
      // Options for Prompting Type
      { 
        label: "Prompting Type", 
        type: "select", 
        options: [
		  { label: "Plan rest of the day", value: "Outline a detailed plan for the entire day in point format for the rest of the day." },
		  { label: "Plan for Morning", value: "Outline a detailed plan for the morning as a descriptive paragraph." },
		  { label: "Plan for Midday", value: "Outline a detailed plan of activities and priorities for midday." },
		  { label: "Plan for Evening", value: "Outline a detailed plan for evening to improve clarity and tone." },
		  { label: "Plan for 2H: 30M Blocks", value: "Break down tasks into actionable steps fitting within 2 hours and 30 minute blocks." },
		  { label: "Plan for 4H: 30M Blocks + 1 15M Break", value: "Break down tasks into actionable steps fitting within 4 hours, 30 minute blocks, 15 minute break inbetween." },
		  { label: "Break down the Task / Plan", value: "Break down the Task / Plan mentioned into actionable steps." },
		  { label: "Give me Something to Read", value: "Respond with a concise yet detailed content rich 500 word Essay on the Task / Plan to read and act on." },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Outline a detailed plan for the entire day in point format for the rest of the day."
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
  const [inputText, modelVariant, energyLevels, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
  // console.log("result",result);
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_2DaysJot_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse = `**Gemini Ai: ${filename}**`;
  
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
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nEnergy Level: ${energyLevels}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "Keep it as short as possible."}.\nFormat: ${promptFormat || "Simple Markdown based on Prompt"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nCurrent Time: ${now}.\nTask or Plan: ${inputText}. P.S.: The response is to dive deep into a task or plan for the day, consider the energy levels too, and give an affirmation based on task, plan and energy levels.`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse += aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
		{ label: "Insert", value: "insert" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result) { return; }
    const actionResult = result2;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> Text: ${inputText}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Energy Level: ${energyLevels}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "Keep it as short as possible."}.\n> Format: ${promptFormat || "Simple Markdown based on Prompt"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "insert") {
	  await app.insertNoteContent({ uuid: currentNoteuuid }, finalAIResponse);
	  // console.log("AI Response Inserted");
	} else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      // await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	  const noteHandle = await app.findNote({ uuid: noteUUIDNew });
	  const newNoteLink = `- [${filename}](https://www.amplenote.com/notes/${currentNoteuuid})`;
	  await app.insertNoteContent({ uuid: currentNoteuuid }, newNoteLink);
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });


},
},
//---------------------------
// Work In progress - Need to find a way to get the content of webpage into a variable, and send it to Gemini AI.
//---------------------------
// Main Section //
linkOption: {
	"Link": async function (app, link) {
      // console.log("link.description",link.description);
	  // console.log("link.href",link.href);

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("What do you want with the Link. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      { label: "Selected URL. You can update it if required.", type: "text", value: `${link.href}` },
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
          { label: "Summarize", value: "Obtain Title and Summarize the data in Website from the URL" },
          { label: "Explain/Define (Points)", value: "Obtain Title and Explain or Define the data in Website from the URL as points" },
          { label: "Explain/Define (Paragraph)", value: "Obtain Title and Explain or Define the data in Website from the URL as paragraph" },
          { label: "Actionable Points", value: "Obtain Title and the data in Website from the URL into Actionable Points" },
          { label: "Other (Fill following boxes)", value: "Customized - Use the below Details" }
        ],
        value: "Obtain Title and Summarize the data in Website from the URL"
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
  const [inputURL, modelVariant, promptSelect, systemInstruction, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
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
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}`, systemInstruction: `${systemInstruction}`, safetySettings });
	// console.log("aiModel",aiModel);

    // Construct the prompt to be sent to the AI model
    const promptAI = `${promptSelect}.\nContext: ${promptContext || "None"}.\nConstraint: ${promptConstraint || "Keep it as short as possible."}.\nFormat: ${promptFormat || "Simple Markdown based on Prompt"}.\nTone: ${promptTone || "None"}.\nAdditional Details: ${promptOther || "None"}.\nURL: ${inputURL}`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
    finalAIResponse = aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    //---------------------------
    // Present the generated AI response to the user with further options
	// Prompt user for response handling options (Copy or Replace Note Content)
    //---------------------------
    const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
		// { label: "Insert", value: "insert" },
        { label: "New Note", value: "newnote" },
      ]
    });

    if (!result) { return; }
    const actionResult = result2;

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `AI_Link_Res_${YYMMDD}_${HHMMSS}`;

	finalAIResponse += `\n### *<mark>Expand to Read more: Input Details: (This is still work in progress!)</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `> URL: ${inputURL}\n`;
	finalAIResponse += `> Prompt: ${promptSelect}.\n> Context: ${promptContext || "None"}.\n> Constraint: ${promptConstraint || "Keep it as short as possible."}.\n> Format: ${promptFormat || "Simple Markdown based on Prompt"}.\n> Tone: ${promptTone || "None"}.\n> Additional Details: ${promptOther || "None"}.`;
	finalAIResponse += `\n---`;

    //---------------------------
    // Handle user action for AI response (Copy to Clipboard or Create New Note)
    //---------------------------
    if (actionResult === "copytxt") {
      await app.writeClipboardData(finalAIResponse);
	  // console.log("Copied to clipboard.");
    } else if (actionResult === "insert") {
	  const newDescription = finalAIResponse;
	  app.context.updateLink({ description: newDescription });
	  // console.log("AI Response Inserted");
	} else if (actionResult === "newnote") {
      const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  // console.log("New note Created.");
      await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
      await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	  // const noteHandle = await app.findNote({ uuid: noteUUIDNew });
	  // const newNoteLink = `[${filename}](https://www.amplenote.com/notes/${noteHandle.uuid})`;
	  // return newNoteLink;
    }
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

},
},
//---------------------------
}