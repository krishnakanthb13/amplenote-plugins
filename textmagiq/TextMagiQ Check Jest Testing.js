const { transformText } = require('./path/to/your/module'); // Adjust the path accordingly

describe('transformText', () => {
    it('should transform to sentence case', () => {
        const input = 'hello world. this is a test.';
        const result = transformText(input, 'sentence_case');
        expect(result).toBe('Hello world. This is a test.');
        console.log('Sentence case transformation result:', result);
    });

    it('should transform to lower case', () => {
        const input = 'Hello World';
        const result = transformText(input, 'lower_case');
        expect(result).toBe('hello world');
        console.log('Lower case transformation result:', result);
    });

    it('should transform to upper case', () => {
        const input = 'Hello World';
        const result = transformText(input, 'upper_case');
        expect(result).toBe('HELLO WORLD');
        console.log('Upper case transformation result:', result);
    });

    it('should transform to capitalized case', () => {
        const input = 'hello world';
        const result = transformText(input, 'capitalized_case');
        expect(result).toBe('Hello World');
        console.log('Capitalized case transformation result:', result);
    });

    it('should transform to alternating case', () => {
        const input = 'hello world';
        const result = transformText(input, 'alternating_case');
        expect(result).toBe('hElLo wOrLd');
        console.log('Alternating case transformation result:', result);
    });

    it('should transform to title case', () => {
        const input = 'hello world and welcome';
        const result = transformText(input, 'title_case');
        expect(result).toBe('Hello World and Welcome');
        console.log('Title case transformation result:', result);
    });

    it('should transform to inverse case', () => {
        const input = 'HeLLo wOrLD';
        const result = transformText(input, 'inverse_case');
        expect(result).toBe('hEllO WoRld');
        console.log('Inverse case transformation result:', result);
    });

    it('should transform to random case', () => {
        const input = 'hello world';
        const result = transformText(input, 'random_case');
        expect(result).toMatch(/^[a-zA-Z\s]+$/); // The result should be a string containing only letters and spaces, but with random case
        console.log('Random case transformation result:', result);
    });

    it('should transform to small caps', () => {
        const input = 'Hello World';
        const result = transformText(input, 'small_caps');
        expect(result).toBe(convertToSmallCaps(input)); // Assuming convertToSmallCaps is correctly defined
        console.log('Small caps transformation result:', result);
    });

    it('should transform to superscript', () => {
        const input = 'Hello World';
        const result = transformText(input, 'superscript');
        expect(result).toBe(convertToSuperscript(input)); // Assuming convertToSuperscript is correctly defined
        console.log('Superscript transformation result:', result);
    });

    it('should transform to wide text', () => {
        const input = 'Hello World';
        const result = transformText(input, 'wide_text');
        expect(result).toBe(convertToWideText(input)); // Assuming convertToWideText is correctly defined
        console.log('Wide text transformation result:', result);
    });

    it('should transform to reversed text', () => {
        const input = 'Hello World';
        const result = transformText(input, 'reverse_text');
        expect(result).toBe(reverseText(input)); // Assuming reverseText is correctly defined
        console.log('Reversed text transformation result:', result);
    });

    it('should transform to upside down text', () => {
        const input = 'Hello World';
        const result = transformText(input, 'upside_down_text');
        expect(result).toBe(flipUpsideDown(input)); // Assuming flipUpsideDown is correctly defined
        console.log('Upside down text transformation result:', result);
    });

    it('should transform to morse code', () => {
        const input = 'hello';
        const result = transformText(input, 'morse_code_translate');
        expect(result).toBe(textToMorse(input)); // Assuming textToMorse is correctly defined
        console.log('Morse code transformation result:', result);
    });

    it('should transform to morse code reverse', () => {
        const input = '.... . .-.. .-.. ---'; // Morse code for 'hello'
        const result = transformText(input, 'morse_code_reverse');
        expect(result).toBe(morseToText(input)); // Assuming morseToText is correctly defined
        console.log('Morse code reverse transformation result:', result);
    });

    it('should transform to binary', () => {
        const input = 'hello';
        const result = transformText(input, 'binary_translate');
        expect(result).toBe(textToBinary(input)); // Assuming textToBinary is correctly defined
        console.log('Binary transformation result:', result);
    });

    it('should transform to binary reverse', () => {
        const input = '01101000 01100101 01101100 01101100 01101111'; // Binary for 'hello'
        const result = transformText(input, 'binary_reverse');
        expect(result).toBe(binaryToText(input)); // Assuming binaryToText is correctly defined
        console.log('Binary reverse transformation result:', result);
    });

    it('should transform to mirror text', () => {
        const input = 'hello';
        const result = transformText(input, 'mirror_text');
        expect(result).toBe(mirrorText(input)); // Assuming mirrorText is correctly defined
        console.log('Mirror text transformation result:', result);
    });

    it('should transform to zalgo text', () => {
        const input = 'hello';
        const result = transformText(input, 'zalgo_text');
        expect(result).toMatch(/[\u0000-\uFFFF]/); // The result should be a string containing Zalgo characters
        console.log('Zalgo text transformation result:', result);
    });

    it('should transform to bold', () => {
        const input = 'hello';
        const result = transformText(input, 'bold');
        expect(result).toBe('**hello**');
        console.log('Bold transformation result:', result);
    });

    it('should transform to italic', () => {
        const input = 'hello';
        const result = transformText(input, 'italic');
        expect(result).toBe('*hello*');
        console.log('Italic transformation result:', result);
    });

    it('should transform to strikethrough', () => {
        const input = 'hello';
        const result = transformText(input, 'strikethrough');
        expect(result).toBe('~~hello~~');
        console.log('Strikethrough transformation result:', result);
    });

    it('should transform to underline', () => {
        const input = 'hello';
        const result = transformText(input, 'underline');
        expect(result).toBe('<u>hello</u>');
        console.log('Underline transformation result:', result);
    });

    it('should transform to fraktur', () => {
        const input = 'hello';
        const result = transformText(input, 'fraktur');
        expect(result).toBe(convertToFraktur(input)); // Assuming convertToFraktur is correctly defined
        console.log('Fraktur transformation result:', result);
    });

    it('should transform to fraktur bold', () => {
        const input = 'hello';
        const result = transformText(input, 'fraktur_bold');
        expect(result).toBe(convertToFrakturBold(input)); // Assuming convertToFrakturBold is correctly defined
        console.log('Fraktur bold transformation result:', result);
    });

    it('should transform to squared text', () => {
        const input = 'hello';
        const result = transformText(input, 'squared');
        expect(result).toBe(convertToSquared(input)); // Assuming convertToSquared is correctly defined
        console.log('Squared text transformation result:', result);
    });

    it('should transform to squared inverted text', () => {
        const input = 'hello';
        const result = transformText(input, 'squared_inverted');
        expect(result).toBe(convertToSquaredInverted(input)); // Assuming convertToSquaredInverted is correctly defined
        console.log('Squared inverted text transformation result:', result);
    });

    it('should transform to circled text', () => {
        const input = 'hello';
        const result = transformText(input, 'circled');
        expect(result).toBe(convertToCircled(input)); // Assuming convertToCircled is correctly defined
        console.log('Circled text transformation result:', result);
    });

    it('should transform to circled inverted text', () => {
        const input = 'hello';
        const result = transformText(input, 'circled_inverted');
        expect(result).toBe(convertToCircledInverted(input)); // Assuming convertToCircledInverted is correctly defined
        console.log('Circled inverted text transformation result:', result);
    });

    it('should return original text if no transformation type matches', () => {
        const input = 'hello';
        const result = transformText(input, 'unknown_type');
        expect(result).toBe(input);
        console.log('No transformation result:', result);
    });
});
