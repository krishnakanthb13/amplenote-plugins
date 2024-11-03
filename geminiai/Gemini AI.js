{
  async replaceText(app, text) {

    const result = await app.prompt("What do you want to do with this selected Text.", {
      inputs: [
        { label: "Gemini Model variants", type: "select", options: 
			[ { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, { label: "Gemini 1.5 Flash-8B", value: "gemini-1.5-flash-8b" }, { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" }, { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" } ],
			value: "gemini-1.5-flash"
		},
        { label: "Prompting Type", type: "select", options: 
			[ 
				{ label: "Summarize", value: "Summarize this text" },
				{ label: "Rephrase", value: "Rephrase this text" },
				{ label: "Explain/Define (Points)", value: "Explain or Define this text as points" },
				{ label: "Explain/Define (Paragraph)", value: "Explain or Define this text as paragraph" },
				{ label: "Actionable Points", value: "Convert into Actionable Points" },
				{ label: "Answer Question", value: "Answer the below question" },
				{ label: "Complete the Sentence", value: "Complete the Sentence" },
				{ label: "Rhymes With (One-word)", value: "Give 5 Rhyming Synonyms and Antonyms" },
				{ label: "Other (Fill following boxes)", value: "Customized - Use the below Details" },
			],
			value: "Summarize this text"
		},
		{
			label: "Add contextual information",
			placeholder: "Eg: Assume the audience is a group of high school students.",
			type: "string",
		},
		{
			label: "Specify any constraints", 
			placeholder: "Eg: Summarize in no more than 50 words.",
			type: "string",
		},
		{
			label: "Define the format of the response",
			placeholder: "Eg: Provide a list of bullet points.",
			type: "string",
		},
		{
			label: "Specify the tone or style",
			placeholder: "Eg: Formal, friendly, persuasive",
			type: "string",
		},
		{
			label: "Other Free Text requests",
			placeholder: "Eg: Provide relevant examples or comparisons",
			type: "string",
		},
		/*{
			label: "Request for examples or analogies",
			placeholder: "Eg: Provide relevant examples or comparisons",
			type: "string",
		},
		{
			label: "Request for specific details",
			placeholder: "Eg: Add details or subpoints",
			type: "string",
		},
		{
			label: "Set a desired language level",
			placeholder: "Eg: Basic, intermediate, advanced",
			type: "string",
		},*/
      ]    
    });
 
	// If the result is falsy, the user has canceled the operation
	if (!result) {
		app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
		return;
	}
	const [ modelVariant, promptSelect, promptContext, promptConstraint, promptFormat, promptTone, promptOther ] = result;
	console.log("result",result);

    const modelVariantz = modelVariant;
	let finalAIResponse;
	// let finalTxtResponse;

    function _loadLibrary(url) {
    return import(url);
  }
  
  _loadLibrary("https://esm.run/@google/generative-ai").then(async ({ GoogleGenerativeAI }) => {
    // Initialize GoogleGenerativeAI instance with API key
    const API_KEY = app.settings["Gemini API Key"]; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(API_KEY);
  
    // Fetch the generative model
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}` });
    console.log("aiModel",aiModel);
  
    // Define the prompt
    const promptAI = `${promptSelect}.\nContext:${promptContext || "None"}.\nConstraint:${promptConstraint || "None"}.\nFormat:${promptFormat || "Markdown"}.\nTone:${promptTone || "None"}.\nAdditional_Details:${promptOther || "None"}.\nText:${text}`;
	console.log("promptAI",promptAI);
  
    // Generate content based on the prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
  
    // Log the result
	finalAIResponse = aiResponse.response.text();
    console.log(aiResponse.response.text());
	console.log("finalAIResponse",finalAIResponse);

	const result2 = await app.alert(`Gemini AI Response: ${finalAIResponse}`, {
      actions: [     
        { label: "Copy", value: "copytxt" },
        // { label: "RFN Insert", value: "insert" },
		{ label: "New Note", value: "newnote" },
      ]
		});

	if (!result) { return; }
	const actionResult = result2;

	// Define the filename for the new note.
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Gemini AI_${YYMMDD}_${HHMMSS}`;

  if (actionResult === "copytxt") {
	  await app.writeClipboardData(finalAIResponse);
	  console.log("Copied to clipboard.");
	  // finalTxtResponse = text;
  } else if (actionResult === "insert") {
	   const finalAIResponsez = `
[Categorized Task: List View!][^GAI]
[^GAI]: []()${finalAIResponse}
`;
	  finalAIResponse = `${text} ${finalAIResponsez}`;
	  console.log("finalAIResponse2",finalAIResponse);
	  // finalTxtResponse = finalAIResponse;
	  console.log("Inserted After");
  } else if (actionResult === "newnote") {
	  const noteUUIDNew = await app.createNote(`${filename}`, [ "-reports/-gemini-ai" ]);
	  console.log("New note Created.");
	  await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
	  await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	  // finalTxtResponse = finalTxtResponse;
  }
	
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
  
  // return `${finalTxtResponse}`;

  },
//******************************************************************************//
  async noteOption(app, noteUUID) {

    const result = await app.prompt("What do you want to do with this Note.", {
      inputs: [
        { label: "Gemini Model variants", type: "select", options: 
			[ { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" }, { label: "Gemini 1.5 Flash-8B", value: "gemini-1.5-flash-8b" }, { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro" }, { label: "Gemini 1.0 Pro", value: "gemini-1.0-pro" } ],
			value: "gemini-1.5-flash"
		},
        { label: "Prompting Type", type: "select", options: 
			[ 
				{ label: "Summarize", value: "Summarize this text:" }, 
				{ label: "Actionable Items", value: "Summarize this text:" },
				{ label: "Answer Question", value: "Give me an Answer for the below question:" },
			],
			value: "Summarize this text:"
		},
		{ label: "Free Hand Prompting (Any futher instructions)", placeholder: "Give clear instructions", type: "text" },
      ] 
    
    });
 
	// If the result is falsy, the user has canceled the operation
	if (!result) {
		app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
		return;
	}
	const [ modelVariant, promptSelect, promptWrite ] = result;
	console.log("result",result);

    const modelVariantz = modelVariant;
	let finalAIResponse;

	const markdown = await app.getNoteContent({ uuid: noteUUID });
	console.log("markdown",markdown);

	// Clean the markdown content
	const cleanedMarkdown = markdown
	  .replace(/<!--[\s\S]*?-->/g, "")   // Remove HTML comments
	  .replace(/<mark[^>]*>/g, "")       // Remove opening <mark> tags with any attributes
	  .replace(/<\/mark>/g, "")          // Remove closing </mark> tags
	  .replace(/^\s*[\r\n]/gm, "");      // Remove empty lines (including those with only whitespace)

	console.log(cleanedMarkdown);

    function _loadLibrary(url) {
    return import(url);
  }
  
  _loadLibrary("https://esm.run/@google/generative-ai").then(async ({ GoogleGenerativeAI }) => {
    // Initialize GoogleGenerativeAI instance with API key
    const API_KEY = app.settings["Gemini API Key"]; // Replace with your actual API key
    const genAI = new GoogleGenerativeAI(API_KEY);
  
    // Fetch the generative model
    const aiModel = genAI.getGenerativeModel({ model: `${modelVariantz}` });
    console.log("aiModel",aiModel);
  
    // Define the prompt
    const promptAI = `${promptSelect}.\n${promptWrite}.\n${cleanedMarkdown}`;
	console.log("promptAI",promptAI);
  
    // Generate content based on the prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
  
    // Log the result
	finalAIResponse = aiResponse.response.text();
    console.log(aiResponse.response.text());

  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  }, 
}