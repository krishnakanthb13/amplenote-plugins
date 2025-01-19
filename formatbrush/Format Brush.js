{
  replaceText(app, text) {
    const textWithFormatting = app.context.selectionContent.toLocaleString();
    console.log(textWithFormatting);
    console.log(text);

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
		this.formatSequence = [];
	  }

	  // Capture formats and their sequence from input text
	  captureFormats(inputText) {
		this.formatSequence = [];
		const words = inputText.split(' ');
		
		words.forEach(word => {
		  const formats = [];
		  for (const [formatName, pattern] of Object.entries(formatPatterns)) {
			if (pattern.regex.test(word)) {
			  formats.push(formatName);
			}
		  }
		  this.formatSequence.push(formats);
		});
		
		return this.formatSequence;
	  }

	  // Apply captured formats to new text
	  applyFormats(inputText) {
		const words = inputText.split(' ');
		
		return words.map((word, index) => {
		  const formats = this.formatSequence[index] || [];
		  let formattedWord = word;
		  
		  formats.forEach(format => {
			const pattern = formatPatterns[format];
			if (pattern) {
			  formattedWord = pattern.template(formattedWord);
			}
		  });
		  
		  return formattedWord;
		}).join(' ');
	  }
	}

	// Example usage:
	const formatBrush = new FormatBrush();

	// Test cases
	const input1 = "**Bold** *Italic*";
	const input2 = "New text";

	// Capture formats from input1
	formatBrush.captureFormats(input1);

	// Apply formats to input2
	const result = formatBrush.applyFormats(input2);
	console.log(result); // Output: "**New** *text*"

	/* // Additional test cases
	const test1 = formatBrush.applyFormats("Hello world");  // "**Hello** *world*"
	const test2 = formatBrush.applyFormats("Testing format"); // "**Testing** *format*"

	const input1 = "**Bold** *Italic*";
	const input2 = "New text";

	const formatBrush = new FormatBrush();
	formatBrush.captureFormats(input1);
	const result = formatBrush.applyFormats(input2);
	console.log(result); // Outputs: "**New** *text*" */

  }
}