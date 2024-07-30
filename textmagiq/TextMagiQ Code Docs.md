---
title: TextMagiQ Code Docs
uuid: 454afe70-44e9-11ef-bdf6-26e37c279344
version: 39
created: '2024-07-18T15:06:55+05:30'
tags:
  - '-9-permanent'
  - '-loc/amp/mine'
---

## <mark style="color:#F8914D;">High Level Code Info:<!-- {"cycleColor":"24"} --></mark>

This JavaScript code defines a comprehensive text transformation utility function called `transformText` that can apply various transformations to a given text. The function supports a wide range of transformations, including case conversion, special character mapping, and formatting.

\

Here’s a high-level explanation of the main components:

1. <mark style="color:#F8D616;">**Text Transformation Function**:<!-- {"cycleColor":"25"} --></mark>

    1. **`transformText(text, transformType)`**: This is the main function that takes a `text` string and a `transformType` string as inputs. Depending on the `transformType`, the function applies a specific transformation to the `text`.

1. <mark style="color:#F8D616;">**Case Conversions**:<!-- {"cycleColor":"25"} --></mark>

    1. **`sentence_case`**: Converts the text to sentence case, where the first letter of each sentence is capitalized.

    1. **`lower_case`**: Converts all characters in the text to lower case.

    1. **`upper_case`**: Converts all characters in the text to upper case.

    1. **`capitalized_case`**: Capitalizes the first letter of each word in the text.

    1. **`alternating_case`**: Alternates the case of each character in the text.

    1. **`title_case`**: Capitalizes the first letter of each major word, while keeping common words in lower case.

    1. **`inverse_case`**: Inverts the case of each character in the text.

1. <mark style="color:#F8D616;">**Special Case Conversions**:<!-- {"cycleColor":"25"} --></mark>

    1. **`random_case`**: Randomly changes the case of each character.

    1. **`small_caps`, `superscript`, `wide_text`**: These transformations use custom functions to convert text to small caps, superscript, or wide text formats, respectively.

1. <mark style="color:#F8D616;">**Text Reversals and Flips**:<!-- {"cycleColor":"25"} --></mark>

    1. **`reverse_text`**: Reverses the order of characters in the text.

    1. **`upside_down_text`**: Flips the text upside down using a custom function.

1. <mark style="color:#F8D616;">**Code Conversions**:<!-- {"cycleColor":"25"} --></mark>

    1. **`morse_code_translate` and `morse_code_reverse`**: Convert text to Morse code and vice versa using custom functions.

    1. **`binary_translate` and `binary_reverse`**: Convert text to binary and vice versa using custom functions.

1. <mark style="color:#F8D616;">**Visual Effects**:<!-- {"cycleColor":"25"} --></mark>

    1. **`mirror_text`**: Converts text to a mirrored format using a custom function.

    1. **`zalgo_text`**: Adds Zalgo text effects, creating a glitchy appearance.

1. <mark style="color:#F8D616;">**Formatting**:<!-- {"cycleColor":"25"} --></mark>

    1. **`bold`, `italic`, `strikethrough`, `underline`**: Apply Markdown or HTML formatting to the text to make it bold, italicized, strikethrough, or underlined.

1. <mark style="color:#F8D616;">**Special Script Conversions**:<!-- {"cycleColor":"25"} --></mark>

    1. **`fraktur`, `fraktur_bold`, `squared`, `squared_inverted`, `circled`, `circled_inverted`**: These transformations use custom functions to convert text to various special scripts or character sets. <mark style="background-color:undefined;">**<< In Dev !!**<!-- {"backgroundCycleColor":"60"} --></mark>

1. <mark style="color:#F8D616;">**Custom Mapping Functions**:<!-- {"cycleColor":"25"} --></mark>

    1. Several custom functions are defined to handle specific transformations:

        1. **`convertToSmallCaps`, `convertToSuperscript`, `convertToWideText`**: Convert text to small caps, superscript, and wide text formats.

        1. **`reverseText`, `flipUpsideDown`, `textToMorse`, `morseToText`, `textToBinary`, `binaryToText`, `mirrorText`, `zalgoText`**: Implement the respective transformations.

        1. **`convertToSquared`, `convertToSquaredInverted`, `convertToCircled`, `convertToCircledInverted`, `convertToFraktur`, `convertToFrakturBold`**: Map characters to special Unicode ranges for visual effects.

Overall, this utility function provides a robust and versatile way to apply various text transformations, making it useful for web applications that require dynamic text manipulation.

---

## <mark style="color:#F8D616;">Custom Mapping Functions<!-- {"cycleColor":"25"} --></mark>

The following custom functions are used to handle specific transformations. They are called internally by `transformText` based on the `transformType`.

### <mark style="color:#44C9DE;">`convertToSmallCaps(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to small caps using Unicode small capital letters.

- **`convertToSmallCaps` function**: Maps each character to its small caps equivalent using a predefined map.

### <mark style="color:#44C9DE;">`convertToSuperscript(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to superscript using Unicode superscript letters.

- **`convertToSuperscript` function**: Maps each character to its superscript equivalent using a predefined map.

### <mark style="color:#44C9DE;">`convertToWideText(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to wide text using Unicode full-width characters.

- **`convertToWideText` function**: Maps each character to its wider equivalent using a predefined map (`wideMap`).

### <mark style="color:#44C9DE;">`reverseText(text)`<!-- {"cycleColor":"28"} --></mark>

- Reverses the order of characters in the text.

- **`reverseText` function**: Reverses the order of characters in the input text.

### <mark style="color:#44C9DE;">`flipUpsideDown(text)`<!-- {"cycleColor":"28"} --></mark>

- Flips the text upside down using Unicode characters.

- **`flipUpsideDown` function**: Flips each character to its upside down equivalent using a predefined map (`upsideDownMap`).

### <mark style="color:#44C9DE;">`textToMorse(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to Morse code.

- **`textToMorse` function**: Converts text to Morse code using a predefined map (`morseMap`).

### <mark style="color:#44C9DE;">`morseToText(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts Morse code back to text.

- **`morseToText` function**: Converts Morse code back to text using a reverse map (`morseReverseMap`).

### <mark style="color:#44C9DE;">`textToBinary(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to binary representation.

- **`textToBinary` function**: Converts text to binary using JavaScript's `charCodeAt` and `toString(2)` methods.

### <mark style="color:#44C9DE;">`binaryToText(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts binary representation back to text.

- **`binaryToText` function**: Converts binary back to text using JavaScript's `parseInt` and `fromCharCode` methods.

### <mark style="color:#44C9DE;">`mirrorText(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to a mirrored format.

- **`mirrorText` function**: Converts text to its mirror image using a predefined `mirrorMap`.

### <mark style="color:#44C9DE;">`zalgoText(text)`<!-- {"cycleColor":"28"} --></mark>

- Adds Zalgo text effects, creating a glitchy appearance.

- **`zalgoText` function**: Generates Zalgo text by appending random combining diacritical marks to each character.

### <mark style="color:#44C9DE;">`convertToSquared(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to squared format using Unicode characters.

- **`convertToSquared` function**: Maps each alphanumeric character to its squared Unicode equivalent.

### <mark style="color:#44C9DE;">`convertToSquaredInverted(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to squared inverted format using Unicode characters.

- **`convertToSquaredInverted` function**: Maps each alphanumeric character to its inverted squared Unicode equivalent.

### <mark style="color:#44C9DE;">`convertToCircled(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to circled format using Unicode characters.

- **`convertToCircledInverted` function**: Maps each alphanumeric character to its circled Unicode equivalent.

### <mark style="color:#44C9DE;">`convertToCircledInverted(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to circled inverted format using Unicode characters.

- **`convertToSquaredInverted` function**: Maps each alphanumeric character to its inverted squared Unicode equivalent.

### <mark style="color:#44C9DE;">`convertToFraktur(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to Fraktur script using Unicode characters.

- **`convertToFraktur` function**: Converts regular Latin characters into Fraktur Unicode characters based on a mapping (`frakturMap`).

- **`transformText` function**: Updated to include "Fraktur" as an option. When selected, it calls `convertToFraktur` to transform the text accordingly.

- **`TextMagiQ1.replaceText.Case_Capitalization` function**: Updated to include "Fraktur" in the user prompt options.

### <mark style="color:#44C9DE;">`convertToFrakturBold(text)`<!-- {"cycleColor":"28"} --></mark>

- Converts text to bold Fraktur script using Unicode characters.

- **`convertToFrakturBold` function**: Converts regular Latin characters into Fraktur (Bold) Unicode characters based on a mapping (`frakturBoldMap`).

- **`transformText` function**: Updated to include "Fraktur (Bold)" as an option. When selected, it calls `convertToFrakturBold` to transform the text accordingly.

- **`TextMagiQ1.replaceText.Case_Capitalization` function**: Updated to include "Fraktur (Bold)" in the user prompt options.

---

1. [Custom Mapping Functions](#Custom_Mapping_Functions) <!-- {"indent":1} -->

    1. [convertToSmallCaps(text)](#convertToSmallCaps(text)) <!-- {"indent":2} -->

        1. [convertToSuperscript(text)](#convertToSuperscript(text)) 

        1. [convertToWideText(text)](#convertToWideText(text)) 

        1. [reverseText(text)](#reverseText(text)) 

        1. [flipUpsideDown(text)](#flipUpsideDown(text)) 

        1. [textToMorse(text)](#textToMorse(text)) 

        1. [morseToText(text)](#morseToText(text)) 

        1. [textToBinary(text)](#textToBinary(text)) 

        1. [binaryToText(text)](#binaryToText(text)) 

        1. [mirrorText(text)](#mirrorText(text)) 

        1. [zalgoText(text)](#zalgoText(text)) 

        1. [convertToSquared(text)](#convertToSquared(text)) 

        1. [convertToSquaredInverted(text)](#convertToSquaredInverted(text)) 

        1. [convertToCircled(text)](#convertToCircled(text)) 

        1. [convertToCircledInverted(text)](#convertToCircledInverted(text)) 

        1. [convertToFraktur(text)](#convertToFraktur(text)) 

        1. [convertToFrakturBold(text)](#convertToFrakturBold(text)) 

---

\