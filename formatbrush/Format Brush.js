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
		this.wordFormats = [];
	  }

	  // Extract the actual text content from a formatted word
	  extractText(word) {
		return word.replace(/[*~`]|<.*?>/g, '').trim();
	  }

	  // Capture the exact format string for each word
	  captureFormats(inputText) {
		this.wordFormats = [];
		const words = inputText.split(' ');
		
		words.forEach(word => {
		  // Store the original format pattern with placeholder
		  let format = word;
		  const plainText = this.extractText(word);
		  format = format.replace(plainText, '{{TEXT}}');
		  this.wordFormats.push(format);
		});
		
		return this.wordFormats;
	  }

	  // Apply captured formats to new text
	  applyFormats(inputText) {
		const words = inputText.split(' ');
		
		return words.map((word, index) => {
		  if (index < this.wordFormats.length) {
			return this.wordFormats[index].replace('{{TEXT}}', word);
		  }
		  return word;
		}).join(' ');
	  }
	}

	// Test the updated implementation
	const formatBrush = new FormatBrush();

	formatBrush.captureFormats(input1);
	const result = formatBrush.applyFormats(input2);
	console.log(result); // Should output: "**New** *text*"

  }
}