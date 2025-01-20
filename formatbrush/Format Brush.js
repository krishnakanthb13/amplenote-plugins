{
  async replaceText(app, text) {

  const textWithFormatting = app.context.selectionContent.toLocaleString();
  console.log(textWithFormatting);
  console.log(text);

  const result = await app.prompt("This is the message", {
    inputs: [ 
      { label: "This is the label", type: "radio", options: [
        { label: "Copy", value: 1 },
        { label: "Paste", value: 2 },
        { label: "Trends", value: 3 }
      ]}
    ]
  });
 
    if (result) {

	// Format patterns with their corresponding regex and replacement templates
	const formatPatterns = {
	  bold: {
		regex: /\*\*(.*?)\*\*/g,
		template: (text) => `**${text}**`,
		type: 'markdown'
	  },
	  italic: {
		regex: /\*(.*?)\*/g,
		template: (text) => `*${text}*`,
		type: 'markdown'
	  },
	  strikethrough: {
		regex: /~~(.*?)~~/g,
		template: (text) => `~~${text}~~`,
		type: 'markdown'
	  },
	  highlight: {
		regex: /<mark>(.*?)<\/mark>/g,
		template: (text) => `<mark>${text}</mark>`,
		type: 'html'
	  },
	  header1: {
		regex: /^# (.*?)$/gm,
		template: (text) => `# ${text}`,
		type: 'markdown'
	  },
	  header2: {
		regex: /^## (.*?)$/gm,
		template: (text) => `## ${text}`,
		type: 'markdown'
	  },
	  header3: {
		regex: /^### (.*?)$/gm,
		template: (text) => `### ${text}`,
		type: 'markdown'
	  },
	  bulletList: {
		regex: /^- (.*?)$/gm,
		template: (text) => `- ${text}`,
		type: 'markdown'
	  },
	  numberList: {
		regex: /^\d+\. (.*?)$/gm,
		template: (text) => `1. ${text}`, // Numbers will need to be handled separately for proper sequencing
		type: 'markdown'
	  },
	  blockQuote: {
		regex: /^> (.*?)$/gm,
		template: (text) => `> ${text}`,
		type: 'markdown'
	  },
	  inlineCode: {
		regex: /`(.*?)`/g,
		template: (text) => `\`${text}\``,
		type: 'markdown'
	  },
	  codeBlock: {
		regex: /```\n([\s\S]*?)```/g,
		template: (text) => `\`\`\`\n${text}\`\`\``,
		type: 'markdown'
	  },
	  textColor: {
		regex: /<mark style="color:(.*?)">(.*?)(?:<!--.*?-->)<\/mark>/g,
		template: (text, color) => `<mark style="color:${color}">${text}<!-- {"cycleColor":"35"} --></mark>`,
		type: 'html'
	  },
	  backgroundColor: {
		regex: /<mark style="background-color:(.*?)">(.*?)(?:<!--.*?-->)<\/mark>/g,
		template: (text, color) => `<mark style="background-color:${color}">${text}<!-- {"backgroundCycleColor":"35"} --></mark>`,
		type: 'html'
	  }
	};

class FormatBrush {
  constructor() {
    this.wordFormats = [];
  }

  // Extract the actual text content from a formatted word
  extractText(word) {
    if (!word) return '';
    return word.replace(/[*~`]|<.*?>/g, '').trim();
  }

  // Capture the exact format string for each word
  captureFormats(inputText) {
    if (!inputText) {
      console.log('No input text provided to capture formats');
      return [];
    }

    // Store formats string directly to prevent comma issues
    const storedFormats = {
      formats: inputText,
      plainText: this.extractText(inputText)
    };
    
    console.log('Captured format data:', storedFormats);
    return storedFormats;
  }

  // Apply captured formats to new text
  applyFormats(inputText, storedFormat) {
    if (!inputText || !storedFormat) {
      console.log('Missing input text or stored format');
      return inputText;
    }

    console.log('Applying format:', storedFormat);
    console.log('To text:', inputText);

    // Replace the original plain text with new text while keeping the formatting
    let result = storedFormat.formats.replace(storedFormat.plainText, inputText);
    console.log('Formatted result:', result);
    return result;
  }
}

  try {

      if (!result) {
        console.log('User canceled the operation');
        return text; // Exit if the user cancels
      }

      const formatBrush = new FormatBrush();

      if (result === 1) {
        // Copy operation
        const storedFormat = formatBrush.captureFormats(textWithFormatting);
        if (storedFormat) {
          await app.setSetting("Format Storage", storedFormat);
          console.log("Format captured and stored successfully:", storedFormat);
        } else {
          console.log("Failed to capture format.");
        }
        // return textWithFormatting; // Return original text with formatting
      }

      if (result === 2) {
        // Paste operation
        const storedFormat = await app.settings["Format Storage"];
        if (storedFormat && storedFormat.formats) {
          const formattedResult = formatBrush.applyFormats(text, storedFormat);
          console.log("Formatted result after applying stored format:", formattedResult);
          return formattedResult; // Return the newly formatted text
        } else {
          console.log("No valid format found in storage.");
          // return text; // Return the input text if no format found
        }
      }

      if (result === 3) {
        console.log("Trends option selected. Returning original text.");
        // return text; // Return the text unchanged for 'Trends'
      }
    } catch (error) {
      console.error("Error in replaceText:", error);
      // return text; // Fallback to original text in case of error
    }
    
    // return text;

    } else {
      // User canceled
    }

  }
}