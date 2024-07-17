(() => {
    var TextMagiQ1 = {
        replaceText: {
            "Case_Capitalization": async function(app, text) {
                try {
                    // Simulate user input for transformation type
					
					const result = await app.prompt("Select text transformation", {
                        inputs: [
                            {
                                label: "Select Case transformation",
                                type: "select",
                                options: [
                                    { label: "None", value: "" },
                                    { label: "Sentence case", value: "sentence_case" },
                                    { label: "UPPER CASE", value: "upper_case" },
                                    { label: "lower case", value: "lower_case" },
                                    { label: "Capitalized Case", value: "capitalized_case" },
                                    { label: "Title Case", value: "title_case" },
                                    { label: "aLtErNaTiNg CASE", value: "alternating_case" },
                                    { label: "lnVeRsE Case", value: "inverse_case" },
                                    { label: "RanDom cAsE", value: "random_case" }
                                ]
                            }
                        ]
                    });
					
                    const textTransform = result; // Replace with actual user input or logic

                    const transformedText = transformText(text, textTransform);

                    alert("Transformed text:" + transformedText);

                    return transformedText; // Return transformed text

                } catch (error) {
                    alert(String(error));
                    return text; // Return original text in case of error
                }
            }
        }
    };

    function transformText(text, transformType) {
        switch (transformType) {
            case 'sentence_case':
                return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
            case 'lower_case':
                return text.toLowerCase();
            case 'upper_case':
                return text.toUpperCase();
            case 'capitalized_case':
                return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            case 'alternating_case':
                return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'title_case':
                return text.toLowerCase().replace(/\b(?:an?|the|and|or|but|for|nor|on|at|to|by|with|about|of)\b|\b\w/g, function(c) { return c.toUpperCase(); });
            case 'inverse_case':
                return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'random_case':
                return text.split('').map(c => Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase()).join('');
            default:
                return text;
        }
    }

    var plugin_default = TextMagiQ1;
    return TextMagiQ1;
})()