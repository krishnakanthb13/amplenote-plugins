(() => {
    // Function to transform text based on the specified transformation type
    function transformText(text, transformType) {
        switch (transformType) {
            case 'sentence_case':
                // Convert to sentence case: First letter of each sentence capitalized
                const sentenceCase = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
                console.log(`Sentence Case: ${sentenceCase}`);
                return sentenceCase;
                
            case 'lower_case':
                // Convert to lower case
                const lowerCase = text.toLowerCase();
                console.log(`Lower Case: ${lowerCase}`);
                return lowerCase;
                
            case 'upper_case':
                // Convert to upper case
                const upperCase = text.toUpperCase();
                console.log(`Upper Case: ${upperCase}`);
                return upperCase;
                
            case 'capitalized_case':
                // Convert to capitalized case: First letter of each word capitalized
                const capitalizedCase = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                console.log(`Capitalized Case: ${capitalizedCase}`);
                return capitalizedCase;
                
            case 'alternating_case':
                // Convert to alternating case: Alternate between lower and upper case
                const alternatingCase = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
                console.log(`Alternating Case: ${alternatingCase}`);
                return alternatingCase;
                
            case 'title_case':
                // Convert to title case: First letter of each major word capitalized
                const titleCase = text.toLowerCase().replace(/\b(?:an?|the|and|or|but|for|nor|on|at|to|by|with|about|of)\b|\b\w/g, c => c.toUpperCase());
                console.log(`Title Case: ${titleCase}`);
                return titleCase;
                
            case 'inverse_case':
                // Convert to inverse case: Lowercase letters to uppercase and vice versa
                const inverseCase = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
                console.log(`Inverse Case: ${inverseCase}`);
                return inverseCase;
                
            case 'random_case':
                // Convert to random case: Randomly change case of each letter
                const randomCase = text.split('').map(c => Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase()).join('');
                console.log(`Random Case: ${randomCase}`);
                return randomCase;
                
            case 'small_caps':
                // Convert to small caps (custom function)
                const smallCaps = convertToSmallCaps(text);
                console.log(`Small Caps: ${smallCaps}`);
                return smallCaps;
                
            case 'superscript':
                // Convert to superscript (custom function)
                const superscript = convertToSuperscript(text);
                console.log(`Superscript: ${superscript}`);
                return superscript;
                
            case 'wide_text':
                // Convert to wide text (custom function)
                const wideText = convertToWideText(text);
                console.log(`Wide Text: ${wideText}`);
                return wideText;
                
            case 'reverse_text':
                // Reverse the text
                const reverseTextResult = reverseText(text);
                console.log(`Reverse Text: ${reverseTextResult}`);
                return reverseTextResult;
                
            case 'upside_down_text':
                // Flip text upside down (custom function)
                const upsideDownText = flipUpsideDown(text);
                console.log(`Upside Down Text: ${upsideDownText}`);
                return upsideDownText;
                
            case 'morse_code_translate':
                // Convert text to Morse code (custom function)
                const morseCodeTranslate = textToMorse(text);
                console.log(`Morse Code Translate: ${morseCodeTranslate}`);
                return morseCodeTranslate;
                
            case 'morse_code_reverse':
                // Convert Morse code to text (custom function)
                const morseCodeReverse = morseToText(text);
                console.log(`Morse Code Reverse: ${morseCodeReverse}`);
                return morseCodeReverse;
                
            case 'binary_translate':
                // Convert text to binary (custom function)
                const binaryTranslate = textToBinary(text);
                console.log(`Binary Translate: ${binaryTranslate}`);
                return binaryTranslate;
                
            case 'binary_reverse':
                // Convert binary to text (custom function)
                const binaryReverse = binaryToText(text);
                console.log(`Binary Reverse: ${binaryReverse}`);
                return binaryReverse;
                
            case 'mirror_text':
                // Convert text to mirror text (custom function)
                const mirrorTextResult = mirrorText(text);
                console.log(`Mirror Text: ${mirrorTextResult}`);
                return mirrorTextResult;
                
            case 'zalgo_text':
                // Convert text to Zalgo text (custom function)
                const zalgoTextResult = zalgoText(text);
                console.log(`Zalgo Text: ${zalgoTextResult}`);
                return zalgoTextResult;
                
            case 'bold':
                // Make text bold
                const boldText = `**${text}**`;
                console.log(`Bold Text: ${boldText}`);
                return boldText;
                
            case 'italic':
                // Make text italic
                const italicText = `*${text}*`;
                console.log(`Italic Text: ${italicText}`);
                return italicText;
                
            case 'strikethrough':
                // Strike through the text
                const strikethroughText = `~~${text}~~`;
                console.log(`Strikethrough Text: ${strikethroughText}`);
                return strikethroughText;
                
            case 'underline':
                // Underline the text
                const underlineText = `<u>${text}</u>`;
                console.log(`Underline Text: ${underlineText}`);
                return underlineText;
                
            case 'fraktur':
                // Convert to Fraktur script (custom function)
                const frakturText = convertToFraktur(text);
                console.log(`Fraktur Text: ${frakturText}`);
                return frakturText;
                
            case 'fraktur_bold':
                // Convert to bold Fraktur script (custom function)
                const frakturBoldText = convertToFrakturBold(text);
                console.log(`Fraktur Bold Text: ${frakturBoldText}`);
                return frakturBoldText;
                
            case 'squared':
                // Convert to squared text (custom function)
                const squaredText = convertToSquared(text);
                console.log(`Squared Text: ${squaredText}`);
                return squaredText;
                
            case 'squared_inverted':
                // Convert to squared inverted text (custom function)
                const squaredInvertedText = convertToSquaredInverted(text);
                console.log(`Squared Inverted Text: ${squaredInvertedText}`);
                return squaredInvertedText;
                
            case 'circled':
                // Convert to circled text (custom function)
                const circledText = convertToCircled(text);
                console.log(`Circled Text: ${circledText}`);
                return circledText;
                
            case 'circled_inverted':
                // Convert to circled inverted text (custom function)
                const circledInvertedText = convertToCircledInverted(text);
                console.log(`Circled Inverted Text: ${circledInvertedText}`);
                return circledInvertedText;
                
            default:
                // Return original text if no transformation type matches
                console.log(`Default Case: ${text}`);
                return text;
        }
    }

    // Define the custom functions here...
    // ...
})();
