{
  async noteOption(app, noteUUID) {
	  
	 const userName = app.settings["User Name"];
	 let nameInput;
	 
	  if (userName) {
		  nameInput = userName;
	  } else {
		const result = await app.prompt("Please enter your Name (Official or Random).", {
		  inputs: [ 
			{ label: "Name:", placeholder: "Your Name", type: "string" },
		  ] 
		});
		nameInput = result;
		await app.setSetting("User Name", result);
	  }


  // Prompt the user for input on desired actions with the selected text.
  const result = await app.prompt("Gratitude Entry to start with. Disclaimer: Please be aware that humans may review or read any shared content to ensure compliance, quality, and accuracy in accordance with Gemini's policies.", {
    inputs: [
      // Selection for Starter
      { 
        label: "Gratitude Starters", 
        type: "select", 
        options: [
          { label: "I am Grateful for", value: "I am Grateful for" }, 
          { label: "I am Thankful for", value: "I am Thankful for" }, 
          { label: "I am Fortunate to have", value: "I am Fortunate to have" }, 
          { label: "I am Proud of", value: "I am Proud of" },
          { label: "I am Happy about", value: "I am Happy about" },
          { label: "I am Inspired by", value: "I am Inspired by" },
          { label: "I Recognize the value of", value: "I Recognize the value of" },
		  
		  { label: "I acknowledge", value: "I acknowledge" },
		  { label: "I appreciate", value: "I appreciate" },
		  { label: "I value", value: "I value" },
		  { label: "I cherish", value: "I cherish" },
		  { label: "I am honored by", value: "I am honored by" },
		  { label: "I give thanks for", value: "I give thanks for" },
		  { label: "I feel blessed for", value: "I feel blessed for" },
		  { label: "I count my blessings for", value: "I count my blessings for" },
		  { label: "I am lucky to experience", value: "I am lucky to experience" },
		  { label: "I am indebted to", value: "I am indebted to" },
		  { label: "I choose to see the good in", value: "I choose to see the good in" },
		  { label: "My heart is full of gratitude for", value: "My heart is full of gratitude for" },
		  { label: "I am filled with appreciation for", value: "I am filled with appreciation for" },
        ],
        value: "I am Grateful for"
      },
      // Additional user inputs
	  { label: "Reason Context", placeholder: "Eg: Self-Love, Confidence, Motivation, Abundance, Gratitude, Healing, Success, Prosperity, Health, Happiness, Personal Growth, Calmness, Protection, Clarity, Spirituality, Creativity, Relationships, Career, Parenting, Inner Peace, Resilience, etc,.", type: "text" },
      { label: "Get reflection back from Gemini AI (Default: Gemini 2.5 Flash)", type: "checkbox" },
    ]
  });

  // Exit if the user cancels the operation
  if (!result) {
    app.alert("Operation has been cancelled. Tata! Bye Bye! Cya!");
    return;
  }
  
  app.alert("Operation has started. It may take a couple of seconds for it to complete!");
  
  // GEMINI MODELS
  // const modelVariant = "gemini-2.5-flash-lite";
  const modelVariant = "gemini-2.5-flash";
  // const modelVariant = "gemini-3-flash";

  // GEMMA MODELS (Instruction Tuned)
  // const modelVariant = "gemma-3-27b-it";
  // const modelVariant = "gemma-3-12b-it";
  // const modelVariant = "gemma-3-4b-it";
  // const modelVariant = "gemma-3-2b-it";
  // const modelVariant = "gemma-3-1b-it";


  // Extract user-selected inputs
  const [starterVariant, promptDetails, aiPrompt] = result;
  // console.log("result",result);  
  const modelVariantz = modelVariant;
  // console.log("modelVariantz",modelVariantz);
  let finalAIResponse = ``;
  
  if (!aiPrompt) {

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Gratitude_Entry_${YYMMDD}_${HHMMSS}`;
	  
	finalAIResponse += `---\n> Hi, **${nameInput}**. Hope you are doing fine today.\n> **Statement: ${starterVariant} ${promptDetails || "Emptiness"}.**\n> **When:** ${filename}\n\n---`;
	
	app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	
	app.alert(`Operation has been Completed. You can start with your Gratitude Enlightment on the mentioned context.`);
	  
  } else {

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
    const promptAI = `User: "${nameInput}", Gratitude Input: ${starterVariant} ${promptDetails || "Emptiness"}.\n\n 
		"Based on the user's gratitude reflections provided, reply with:
		1. AI Context: Words of encouragement related to the specific details the user shared.
		2. Affirmations: Positive affirmations tailored to their chosen gratitude topic.
		3. Quotes: Uplifting quotes about gratitude that match or relate to their input.
		4. AI Suggestion: Brief, actionable suggestions to either deepen their gratitude practice or enhance happiness using what they've acknowledged.
		5. End with a reminder that appreciating small moments fuels ongoing growth and well-being.
        Add some emojies whereever necessary, also use the username in the output."`;
	// console.log("promptAI",promptAI);
    
    // Generate content based on the constructed prompt
    const aiResponse = await aiModel.generateContent(promptAI);
	// console.log("aiResponse",aiResponse);
	finalAIResponse = `---\n\n`;
    finalAIResponse += aiResponse.response.text();
	// console.log("finalAIResponse",finalAIResponse);

    // Define a unique filename for the new note, if that option is selected
    const now = new Date();
    const YYMMDD = now.toISOString().slice(2, 10).replace(/-/g, '');
    const HHMMSS = now.toTimeString().slice(0, 8).replace(/:/g, '');
    const filename = `Gratitude_Entry_${YYMMDD}_${HHMMSS}`;
	
	// finalAIResponse += `\n### *<mark>Expand to Read more: Input Details:</mark>* <!-- {"collapsed":true} -->\n`;
    finalAIResponse += `\n> Hi, **${nameInput}**. Hope you are doing fine today.\n> **Statement: ${starterVariant} ${promptDetails || "Emptiness"}.**\n> **When:** ${filename}\n`;
	finalAIResponse += `\n---`;
	
	app.insertNoteContent({ uuid: noteUUID }, finalAIResponse);
	
	app.alert(`Operation has been Completed. You can start with your Gratitude Enlightment on the mentioned context.`);
    
  }).catch(error => {
    console.error("Failed to load library or execute code:", error);
  });
  
  }

  },
}