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
				{ label: "Explain/Define (Points)", value: "Explain or Define this text as points" },
				{ label: "Explain/Define (Paragraph)", value: "Explain or Define this text as paragraph" },
				{ label: "Actionable Points", value: "Convert into Actionable Points" },
				{ label: "Answer Question", value: "Answer the below question" },
				{ label: "Complete the Sentence", value: "Complete the Sentence" },
				{ label: "Rhymes With", value: "Give 5 Rhyming Synonyms and Antonyms" },
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
	const [ modelVariant, promptSelect, promptContext, promptConstraint, promptFormat, promptTone, promptOther] = result;
	console.log("result",result);

    const modelVariantz = modelVariant;

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
    const promptAI = `${promptSelect}.\n Context:${promptContext || "None"}.\n Constraint:${promptConstraint || "None"}.\n Format:${promptFormat || "Markdown"}.\n Tone:${promptTone || "None"}.\n Other Details:${promptOther || "None"}.\n Text:${text}`;
	console.log("promptAI",promptAI);
  
    // Generate content based on the prompt
    const aiResponse = await model.generateContent(promptAI);
	console.log("aiResponse",aiResponse);
  
    // Log the result
    console.log(aiResponse.response.text());
	console.log("aiResponse.response.text()",aiResponse.response.text());
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

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
    const model = genAI.getGenerativeModel({ model: `${modelVariantz}` });
  
    // Define the prompt
    const promptAI = `${promptSelect}.\n${promptWrite}.\n${cleanedMarkdown}`;
	console.log("promptAI",promptAI);
  
    // Generate content based on the prompt
    const aiResponse = await model.generateContent(promptx);
	console.log("aiResponse",aiResponse);
  
    // Log the result
    console.log(aiResponse.response.text());
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  }, 
}