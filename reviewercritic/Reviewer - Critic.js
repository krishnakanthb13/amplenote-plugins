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
          // GEMINI MODELS
          { label: "Gemini 2.5 Flash Lite (10 RPM / 20 RPD)", value: "gemini-2.5-flash-lite" },
          { label: "Gemini 2.5 Flash (5 RPM / 20 RPD)", value: "gemini-2.5-flash" },
          { label: "Gemini 3 Flash (5 RPM / 20 RPD)", value: "gemini-3-flash-preview" },

          // GEMMA MODELS — Instruction Tuned
          { label: "Gemma 3 27B (30 RPM / 14K RPD)", value: "gemma-3-27b-it" },
          { label: "Gemma 3 12B (30 RPM / 14K RPD)", value: "gemma-3-12b-it" },
          { label: "Gemma 3 4B (30 RPM / 14K RPD)", value: "gemma-3-4b-it" },
          { label: "Gemma 3 2B (30 RPM / 14K RPD)", value: "gemma-3-2b-it" },
          { label: "Gemma 3 1B (30 RPM / 14K RPD)", value: "gemma-3-1b-it" }
        ],
        value: "gemini-2.5-flash-lite"
      },
      // Additional user inputs for customization of the AI response
	  { label: "Topic", placeholder: "Eg: The value of remote work, AI in daily life, social media addiction, electric vehicles, privacy online, fast fashion, renewable energy, universal healthcare, online education, and productivity tools, etc,.", type: "text" },
      { label: "Keep It Simple (Default: Extensive!)", type: "checkbox" },
      { label: "Brainstorm the Details", type: "checkbox" },
      { label: "Multi-level Explanation", type: "checkbox" },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }
  
  app.alert("Operation has started. It may take a couple of seconds for it to complete!");

  // Extract user-selected inputs
  const [modelVariant, promptDetails, keepSimple, brainStorm, multiLevel] = result;
  // console.log("result",result);  
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse;
  const keepsimple1 = keepSimple ? "\nNote: Keep it short and simple!" : "";
  const brainStorm1 = brainStorm ? "\nNote: Add a Brainstorm the Idea!" : "";
  const multiLevel1 = multiLevel ? "\nNote: Add a Multi-Level Explanation!" : "";

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
Topic: ${promptDetails || "Random Topic"}..${keepsimple1}.${brainStorm1}.${multiLevel1}`;
      
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
	finalAIResponse += `\n> Topic: ${promptDetails || "Random Topic"}.\n> When: ${filename}.\n> Keep It Simple: ${keepSimple}.\n> Brainstorm the Details: ${brainStorm}.\n> Multi-level Explanation: ${multiLevel}.`;
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