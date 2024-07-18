(() => {
    // Function to transform text based on the specified transformation type
    function transformText(text, transformType) {
        switch (transformType) {
            case 'sentence_case':
                // Convert to sentence case: First letter of each sentence capitalized
                return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
            case 'lower_case':
                // Convert to lower case
                return text.toLowerCase();
            case 'upper_case':
                // Convert to upper case
                return text.toUpperCase();
            case 'capitalized_case':
                // Convert to capitalized case: First letter of each word capitalized
                return text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            case 'alternating_case':
                // Convert to alternating case: Alternate between lower and upper case
                return text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'title_case':
                // Convert to title case: First letter of each major word capitalized
                return text.toLowerCase().replace(/\b(?:an?|the|and|or|but|for|nor|on|at|to|by|with|about|of)\b|\b\w/g, c => c.toUpperCase());
            case 'inverse_case':
                // Convert to inverse case: Lowercase letters to uppercase and vice versa
                return text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'random_case':
                // Convert to random case: Randomly change case of each letter
                return text.split('').map(c => Math.random() < 0.5 ? c.toLowerCase() : c.toUpperCase()).join('');
            case 'small_caps':
                // Convert to small caps (custom function)
                return convertToSmallCaps(text);
            case 'superscript':
                // Convert to superscript (custom function)
                return convertToSuperscript(text);
            case 'wide_text':
                // Convert to wide text (custom function)
                return convertToWideText(text);
            case 'reverse_text':
                // Reverse the text
                return reverseText(text);
            case 'upside_down_text':
                // Flip text upside down (custom function)
                return flipUpsideDown(text);
            case 'morse_code_translate':
                // Convert text to Morse code (custom function)
                return textToMorse(text);
            case 'morse_code_reverse':
                // Convert Morse code to text (custom function)
                return morseToText(text);
            case 'binary_translate':
                // Convert text to binary (custom function)
                return textToBinary(text);
            case 'binary_reverse':
                // Convert binary to text (custom function)
                return binaryToText(text);
            case 'mirror_text':
                // Convert text to mirror text (custom function)
                return mirrorText(text);
            case 'zalgo_text':
                // Convert text to Zalgo text (custom function)
                return zalgoText(text);
            case 'circled':
                // Convert to circled text (custom function)
                return convertToCircled(text);
            default:
                // Return original text if no transformation type matches
                return text;
        }
    }


// Convert text to circled characters
function convertToCircled(text) {
    const circledMap = {
        'A': '\u24B6',
        'B': '\u24B7',
        'C': '\u24B8',
        'D': '\u24B9',
        'E': '\u24BA',
        'F': '\u24BB',
        'G': '\u24BC',
        'H': '\u24BD',
        'I': '\u24BE',
        'J': '\u24BF',
        'K': '\u24C0',
        'L': '\u24C1',
        'M': '\u24C2',
        'N': '\u24C3',
        'O': '\u24C4',
        'P': '\u24C5',
        'Q': '\u24C6',
        'R': '\u24C7',
        'S': '\u24C8',
        'T': '\u24C9',
        'U': '\u24CA',
        'V': '\u24CB',
        'W': '\u24CC',
        'X': '\u24CD',
        'Y': '\u24CE',
        'Z': '\u24CF',
        'a': '\u24D0',
        'b': '\u24D1',
        'c': '\u24D2',
        'd': '\u24D3',
        'e': '\u24D4',
        'f': '\u24D5',
        'g': '\u24D6',
        'h': '\u24D7',
        'i': '\u24D8',
        'j': '\u24D9',
        'k': '\u24DA',
        'l': '\u24DB',
        'm': '\u24DC',
        'n': '\u24DD',
        'o': '\u24DE',
        'p': '\u24DF',
        'q': '\u24E0',
        'r': '\u24E1',
        's': '\u24E2',
        't': '\u24E3',
        'u': '\u24E4',
        'v': '\u24E5',
        'w': '\u24E6',
        'x': '\u24E7',
        'y': '\u24E8',
        'z': '\u24E9'
    };

    return Array.from(text).map(char => circledMap[char] || char).join('');
}

    // Convert text to zalgo characters
function zalgoText(text) {
    const zalgoChars = [
        '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
        '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
        '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350',
        '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d',
        '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
        '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b'
    ];

    function getRandomZalgo() {
        const rand = Math.floor(Math.random() * zalgoChars.length);
        return zalgoChars[rand];
    }

    //return text.split('').map(char => char + getRandomZalgo()).join('');
    // increase the level of craziness where i < (number)
    return text.split('').map(char => {
        let crazyChar = char;
        for (let i = 0; i < 4; i++) {
            crazyChar += getRandomZalgo();
        }
        return crazyChar;
    }).join('');
}
  
// Convert text to mirrorText characters
function mirrorText(text) {
    const mirrorMap = {
        'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ı', 'j': 'ſ', 'k': 'ʞ',
        'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'q', 'q': 'p', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ',
        'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'K',
        'L': '⅂', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ',
        'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
        '.': '˙', ',': "'", '?': '¿', '\'': ',', '!': '¡',
        '(': ')', ')': '(', '{': '}', '}': '{', '[': ']', ']': '[', '<': '>', '>': '<', '/': '\\', '\\': '/',
        '&': '⅋', '_': '‾', '"': '``', '`': '"', ';': '؛', ':': ':', '^': 'v', 'v': '^', '@': '@', '#': '#', '$': '$',
        '%': '%', '*': '*', '+': '+', '-': '-', '=': '=', '~': '~'
    };

    return text.split('').reverse().map(char => mirrorMap[char] || char).join('');
}
  
// Convert text to textToBinary characters
function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
}
  
// Convert text to binaryToText characters
function binaryToText(binary) {
    return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}
  
// Convert text to textToMorse characters
function textToMorse(text) {
    const morseMap = {
        'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---',
        'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-',
        'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--',
        '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.',
        '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-',
        '@': '.--.-.'
    };

    return text.toLowerCase().split('').map(c => morseMap[c] || '').join(' ');
}
  
// Convert text to morseToText characters
function morseToText(text) {
    const morseReverseMap = {
        '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h', '..': 'i', '.---': 'j',
        '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p', '--.-': 'q', '.-.': 'r', '...': 's', '-': 't',
        '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x', '-.--': 'y', '--..': 'z',
        '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
        '-....': '6', '--...': '7', '---..': '8', '----.': '9',
        '.-.-.-': '.', '--..--': ',', '..--..': '?', '.----.': '\'', '-.-.--': '!',
        '-..-.': '/', '-.--.': '(', '-.--.-': ')', '.-...': '&', '---...': ':', '-.-.-.': ';',
        '-...-': '=', '.-.-.': '+', '-....-': '-', '..--.-': '_', '.-..-.': '"', '...-..-': '$',
        '.--.-.': '@'
    };

    return text.split(' ').map(m => morseReverseMap[m] || '').join('');
}
  
// Convert text to flipUpsideDown characters
function flipUpsideDown(text) {
    const upsideDownMap = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ',
        'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ',
        's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'q', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I',
        'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴚ',
        'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
        '!': '¡', '?': '¿', '+': '+', '-': '-', '=': '=', '*': '*', '%': '%', '$': '$', '&': '⅋', '#': '#',
        '@': '@', '^': '^', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
        '/': '/', '|': '|', '\\': '\\', '~': '~', '`': '`', ',': "'", '.': '.', ':': ':', ';': ';', '\'': ',',
        '"': '"', '_': '_', ' ': ' '
    };

    return text.split('').reverse().map(c => upsideDownMap[c] || c).join('');
}

// Convert text to reverseText characters
function reverseText(text) {
    return text.split('').reverse().join('');
}
  
// Convert text to convertToWideText characters
function convertToWideText(text) {
    const wideMap = {
        'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ',
        'j': 'ｊ', 'k': 'ｋ', 'l': 'ｌ', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ',
        's': 'ｓ', 't': 'ｔ', 'u': 'ｕ', 'v': 'ｖ', 'w': 'ｗ', 'x': 'ｘ', 'y': 'ｙ', 'z': 'ｚ',
        'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ',
        'J': 'Ｊ', 'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ',
        'S': 'Ｓ', 'T': 'Ｔ', 'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
        '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
        '!': '！', '?': '？', '+': '＋', '-': '－', '=': '＝', '*': '＊', '%': '％', '$': '＄', '&': '＆', '#': '＃',
        '@': '＠', '^': '＾', '(': '（', ')': '）', '[': '［', ']': '］', '{': '｛', '}': '｝', '<': '＜', '>': '＞',
        '/': '／', '|': '｜', '\\': '＼', '~': '～', '`': '｀', ',': '，', '.': '．', ':': '：', ';': '；', '\'': '＇',
        '"': '＂', '_': '＿', ' ': '　'
    };

    return text.split('').map(c => wideMap[c] || c).join('');
}
  
// Convert text to convertToSmallCaps characters
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
  
// Convert text to convertToSmallCaps characters
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
  
// Add transformation options to a select element
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
                                { label: "Case: Sentence case", value: "sentence_case" },
                                { label: "Case: UPPER CASE", value: "upper_case" },
                                { label: "Case: lower case", value: "lower_case" },
                                { label: "Case: Capitalized Case", value: "capitalized_case" },
                                { label: "Case: Title Case", value: "title_case" },
                                { label: "Case: aLtErNaTiNg CASE", value: "alternating_case" },
                                { label: "Case: lnVeRsE Case", value: "inverse_case" },
                              
                                { label: "Special: RanDom cAsE", value: "random_case" },
                                { label: "Special: Small Caps (Immutable)", value: "small_caps" },
                                { label: "Special: Superscript (Immutable)", value: "superscript" },
                                { label: "Special: Wide Text (Immutable)", value: "wide_text" },
                              
                                { label: "Flip: Reverse Text", value: "reverse_text" },
                                { label: "Flip: Upside Down Text (Immutable)", value: "upside_down_text" },

                                { label: "Code: Text -> Morse Code", value: "morse_code_translate" },
                                { label: "Code: Morse Code -> Text", value: "morse_code_reverse" },
                                { label: "Code: Text -> Binary", value: "binary_translate" },
                                { label: "Code: Binary -> Text", value: "binary_reverse" },

                                { label: "Visual: Mirror Text", value: "mirror_text" },
                                { label: "Visual: Zalgo Text", value: "zalgo_text" },
                              
                                { label: "Unicode: Circled", value: "circled" },
                            ]
                        }
                    ]
                });

                const textTransform = result; // Replace with actual user input or logic

                const transformedText = transformText(text, textTransform);

                //alert("Transformed text:" + transformedText);

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