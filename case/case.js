(() => {
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
        case 'small_caps':
            return convertToSmallCaps(text);
        case 'superscript':
            return convertToSuperscript(text);
        default:
            return text;
    }
}

function convertToSmallCaps(text) {
    const smallCapsMap = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ꜰ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
        'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'Q', 'r': 'ʀ',
        's': 'ꜱ', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'X', 'y': 'ʏ', 'z': 'ᴢ',
        'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ꜰ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
        'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'Q', 'R': 'ʀ',
        'S': 'ꜱ', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'X', 'Y': 'ʏ', 'Z': 'ᴢ',
    };

    return text.split('').map(c => smallCapsMap[c] || c).join('');
}

function convertToSuperscript(text) {
    const superscriptMap = {
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ',
        'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᑫ', 'r': 'ʳ',
        's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ',
        'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ᑫ', 'R': 'ᴿ',
        'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', 'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ',
        'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᑫ', 'r': 'ʳ',
        's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ',
        'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'ᑫ', 'R': 'ᴿ',
        'S': 'ˢ', 'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
    };

    return text.split('').map(c => superscriptMap[c] || c).join('');
}

var TextMagiQ1 = {
    replaceText: {
        "Case_Capitalization": async function(app, text) {
            try {
                // Simulate user input for transformation type
                const result = await app.prompt("Select text transformation", {
                    inputs: [
                        {
                            label: "Select text transformation",
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
                                { label: "RanDom cAsE", value: "random_case" },
                                { label: "Small Caps", value: "small_caps" },
                                { label: "Superscript", value: "superscript" }
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

var plugin_default = TextMagiQ1;
return TextMagiQ1;

})()