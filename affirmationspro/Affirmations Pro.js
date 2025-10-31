{
  async appOption(app) {

  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("Affirmations Generation to start with. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
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
	  { label: "Affirmations Topic", placeholder: "Eg: Self-Love, Confidence, Motivation, Abundance, Gratitude, Healing, Success, Prosperity, Health, Happiness, Personal Growth, Calmness, Protection, Clarity, Spirituality, Creativity, Relationships, Career, Parenting, Inner Peace, Resilience, etc,.", type: "text" },
      { label: "Number of Question?", type: "string", value: 10 },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }
  
  app.alert("Operation has started. It may take a couple of seconds for it to complete!");

  // Extract user-selected inputs
  const [modelVariant, promptDetails, numberOfQuestions] = result;
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
    const promptAI = `Give me [${numberOfQuestions || "10"}] Affirmations on the Topic: ${promptDetails || "Random Topic"}.\nFinal out put should be in a Markdown Formatted and the content should guide the user to navigate through the Topic mentioned.\nEg: (### Heading\nContext: .\n1: .\n2: .\n3: .\n4: .\n....`;
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
    const filename = `Affirmations_Pro_${YYMMDD}_${HHMMSS}`;
	
	// finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
	finalAIResponse += `\n> Topic: ${promptDetails || "Random Topic"}.\n> When: ${filename}.\n> Number of Question?: ${numberOfQuestions}.`;
	// finalAIResponse += `\n---`;

	// return finalAIResponse;
	// app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	// console.log("Affirmations - Content Added.");

	const noteUUIDNew = await app.createNote(`${promptDetails || "Random Topic"}`, [ "-reports/-affirmations" ]);
	// console.log("New note Created.");
	await app.insertContent({ uuid: noteUUIDNew }, finalAIResponse);
	await app.navigate(`https://www.amplenote.com/notes/${noteUUIDNew}`);
	// console.log("Affirmations - Content Added.");
	
	app.alert(`Operation has been Completed. You can start with your Affirmations Enlightment on the mentioned Topic.`);
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });

  },
}