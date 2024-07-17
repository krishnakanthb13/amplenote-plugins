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
        case 'wide_text':
            return convertToWideText(text);
        case 'reverse_text':
            return reverseText(text);
        case 'upside_down_text':
            return flipUpsideDown(text);
        case 'morse_code_translate':
            return textToMorse(text);
        case 'morse_code_reverse':
            return morseToText(text);
        case 'binary_translate':
            return textToBinary(text);
        case 'binary_reverse':
            return binaryToText(text);
        case 'mirror_text':
            return mirrorText(text);
        case 'zalgo_text':
            return zalgoText(text);
        case 'bold':
            return `**${text}**`;
        case 'italic':
            return `*${text}*`;
        case 'strikethrough':
            return `~~${text}~~`;
        case 'underline':
            return `<u>${text}</u>`;
        case 'fraktur':
            return convertToFraktur(text);
        case 'fraktur_bold':
            return convertToFrakturBold(text);
        case 'squared':
            return convertToSquared(text);
        case 'squared_inverted':
            return convertToSquaredInverted(text);
        case 'circled':
            return convertToCircled(text);
        case 'circled_inverted':
            return convertToCircledInverted(text);
        default:
            return text;
    }
}


function convertToSquared(text) {
    const squaredMap = {
        'A': '\u1D400',
        'B': '\u1D401',
        'C': '\u1D402',
        'D': '\u1D403',
        'E': '\u1D404',
        'F': '\u1D405',
        'G': '\u1D406',
        'H': '\u1D407',
        'I': '\u1D408',
        'J': '\u1D409',
        'K': '\u1D40A',
        'L': '\u1D40B',
        'M': '\u1D40C',
        'N': '\u1D40D',
        'O': '\u1D40E',
        'P': '\u1D40F',
        'Q': '\u1D410',
        'R': '\u1D411',
        'S': '\u1D412',
        'T': '\u1D413',
        'U': '\u1D414',
        'V': '\u1D415',
        'W': '\u1D416',
        'X': '\u1D417',
        'Y': '\u1D418',
        'Z': '\u1D419',
        'a': '\u1D41A',
        'b': '\u1D41B',
        'c': '\u1D41C',
        'd': '\u1D41D',
        'e': '\u1D41E',
        'f': '\u1D41F',
        'g': '\u1D420',
        'h': '\u1D421',
        'i': '\u1D422',
        'j': '\u1D423',
        'k': '\u1D424',
        'l': '\u1D425',
        'm': '\u1D426',
        'n': '\u1D427',
        'o': '\u1D428',
        'p': '\u1D429',
        'q': '\u1D42A',
        'r': '\u1D42B',
        's': '\u1D42C',
        't': '\u1D42D',
        'u': '\u1D42E',
        'v': '\u1D42F',
        'w': '\u1D430',
        'x': '\u1D431',
        'y': '\u1D432',
        'z': '\u1D433'
    };

    return Array.from(text).map(char => squaredMap[char] || char).join('');
}

function convertToSquaredInverted(text) {
    const squaredInvertedMap = {
        'A': '\u1D7D8',
        'B': '\u1D7D9',
        'C': '\u1D7DA',
        'D': '\u1D7DB',
        'E': '\u1D7DC',
        'F': '\u1D7DD',
        'G': '\u1D7DE',
        'H': '\u1D7DF',
        'I': '\u1D7E0',
        'J': '\u1D7E1',
        'K': '\u1D7E2',
        'L': '\u1D7E3',
        'M': '\u1D7E4',
        'N': '\u1D7E5',
        'O': '\u1D7E6',
        'P': '\u1D7E7',
        'Q': '\u1D7E8',
        'R': '\u1D7E9',
        'S': '\u1D7EA',
        'T': '\u1D7EB',
        'U': '\u1D7EC',
        'V': '\u1D7ED',
        'W': '\u1D7EE',
        'X': '\u1D7EF',
        'Y': '\u1D7F0',
        'Z': '\u1D7F1',
        'a': '\u1D7F2',
        'b': '\u1D7F3',
        'c': '\u1D7F4',
        'd': '\u1D7F5',
        'e': '\u1D7F6',
        'f': '\u1D7F7',
        'g': '\u1D7F8',
        'h': '\u1D7F9',
        'i': '\u1D7FA',
        'j': '\u1D7FB',
        'k': '\u1D7FC',
        'l': '\u1D7FD',
        'm': '\u1D7FE',
        'n': '\u1D7FF',
        'o': '\u1D800',
        'p': '\u1D801',
        'q': '\u1D802',
        'r': '\u1D803',
        's': '\u1D804',
        't': '\u1D805',
        'u': '\u1D806',
        'v': '\u1D807',
        'w': '\u1D808',
        'x': '\u1D809',
        'y': '\u1D80A',
        'z': '\u1D80B'
    };

    return Array.from(text).map(char => squaredInvertedMap[char] || char).join('');
}

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

function convertToCircledInverted(text) {
    const circledInvertedMap = {
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

    return Array.from(text).map(char => circledInvertedMap[char] || char).join('');
}
  
function convertToFraktur(text) {
    const frakturMap = {
        'A': '\uD835\uDD38',
        'B': '\uD835\uDD39',
        'C': '\uD835\uDD3A',
        'D': '\uD835\uDD3B',
        'E': '\uD835\uDD3C',
        'F': '\uD835\uDD3D',
        'G': '\uD835\uDD3E',
        'H': '\uD835\uDD3F',
        'I': '\uD835\uDD40',
        'J': '\uD835\uDD41',
        'K': '\uD835\uDD42',
        'L': '\uD835\uDD43',
        'M': '\uD835\uDD44',
        'N': '\uD835\uDD45',
        'O': '\uD835\uDD46',
        'P': '\uD835\uDD47',
        'Q': '\uD835\uDD48',
        'R': '\uD835\uDD49',
        'S': '\uD835\uDD4A',
        'T': '\uD835\uDD4B',
        'U': '\uD835\uDD4C',
        'V': '\uD835\uDD4D',
        'W': '\uD835\uDD4E',
        'X': '\uD835\uDD4F',
        'Y': '\uD835\uDD50',
        'Z': '\uD835\uDD51',
        'a': '\uD835\uDD52',
        'b': '\uD835\uDD53',
        'c': '\uD835\uDD54',
        'd': '\uD835\uDD55',
        'e': '\uD835\uDD56',
        'f': '\uD835\uDD57',
        'g': '\uD835\uDD58',
        'h': '\uD835\uDD59',
        'i': '\uD835\uDD5A',
        'j': '\uD835\uDD5B',
        'k': '\uD835\uDD5C',
        'l': '\uD835\uDD5D',
        'm': '\uD835\uDD5E',
        'n': '\uD835\uDD5F',
        'o': '\uD835\uDD60',
        'p': '\uD835\uDD61',
        'q': '\uD835\uDD62',
        'r': '\uD835\uDD63',
        's': '\uD835\uDD64',
        't': '\uD835\uDD65',
        'u': '\uD835\uDD66',
        'v': '\uD835\uDD67',
        'w': '\uD835\uDD68',
        'x': '\uD835\uDD69',
        'y': '\uD835\uDD6A',
        'z': '\uD835\uDD6B'
    };

    return text.split('').map(char => frakturMap[char] || char).join('');
}

function convertToFrakturBold(text) {
    const frakturBoldMap = {
        'A': '\uD835\uDD70',
        'B': '\uD835\uDD71',
        'C': '\uD835\uDD72',
        'D': '\uD835\uDD73',
        'E': '\uD835\uDD74',
        'F': '\uD835\uDD75',
        'G': '\uD835\uDD76',
        'H': '\uD835\uDD77',
        'I': '\uD835\uDD78',
        'J': '\uD835\uDD79',
        'K': '\uD835\uDD7A',
        'L': '\uD835\uDD7B',
        'M': '\uD835\uDD7C',
        'N': '\uD835\uDD7D',
        'O': '\uD835\uDD7E',
        'P': '\uD835\uDD7F',
        'Q': '\uD835\uDD80',
        'R': '\uD835\uDD81',
        'S': '\uD835\uDD82',
        'T': '\uD835\uDD83',
        'U': '\uD835\uDD84',
        'V': '\uD835\uDD85',
        'W': '\uD835\uDD86',
        'X': '\uD835\uDD87',
        'Y': '\uD835\uDD88',
        'Z': '\uD835\uDD89',
        'a': '\uD835\uDD8A',
        'b': '\uD835\uDD8B',
        'c': '\uD835\uDD8C',
        'd': '\uD835\uDD8D',
        'e': '\uD835\uDD8E',
        'f': '\uD835\uDD8F',
        'g': '\uD835\uDD90',
        'h': '\uD835\uDD91',
        'i': '\uD835\uDD92',
        'j': '\uD835\uDD93',
        'k': '\uD835\uDD94',
        'l': '\uD835\uDD95',
        'm': '\uD835\uDD96',
        'n': '\uD835\uDD97',
        'o': '\uD835\uDD98',
        'p': '\uD835\uDD99',
        'q': '\uD835\uDD9A',
        'r': '\uD835\uDD9B',
        's': '\uD835\uDD9C',
        't': '\uD835\uDD9D',
        'u': '\uD835\uDD9E',
        'v': '\uD835\uDD9F',
        'w': '\uD835\uDDA0',
        'x': '\uD835\uDDA1',
        'y': '\uD835\uDDA2',
        'z': '\uD835\uDDA3'
    };

    return Array.from(text).map(char => frakturBoldMap[char] || char).join('');
}

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

    return text.split('').map(char => char + getRandomZalgo()).join('');
}

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

function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2)).join(' ');
}

function binaryToText(binary) {
    return binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}

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

function reverseText(text) {
    return text.split('').reverse().join('');
}

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
                                { label: "Reverse Text", value: "reverse_text" },
                                { label: "Small Caps (Irreversible)", value: "small_caps" },
                                { label: "Superscript (Irreversible)", value: "superscript" },
                                { label: "Wide Text (Irreversible)", value: "wide_text" },
                                { label: "Upside Down Text (Irreversible)", value: "upside_down_text" },
                                { label: "Morse Code -> Text", value: "morse_code_reverse" },
                                { label: "Text -> Morse Code", value: "morse_code_translate" },
                                { label: "Binary -> Text", value: "binary_reverse" },
                                { label: "Text -> Binary", value: "binary_translate" },
                                { label: "Mirror Text", value: "mirror_text" },
                                { label: "Zalgo Text (Not Working!)", value: "zalgo_text" },
                                { label: "Bold (Not Working!)", value: "bold" },
                                { label: "Italic (Not Working!)", value: "italic" },
                                { label: "Strikethrough (Not Working!)", value: "strikethrough" },
                                { label: "Underline (Not Working!)", value: "underline" },
                                { label: "Fraktur", value: "fraktur" },
                                { label: "Fraktur (Bold) (Working Weird!)", value: "fraktur_bold" },
                                { label: "Squared (Working Weird!)", value: "squared" },
                                { label: "Squared (Inverted) (Working Weird!)", value: "squared_inverted" },
                                { label: "Circled", value: "circled" },
                                { label: "Circled (Inverted) (Working Weird!)", value: "circled_inverted" }
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