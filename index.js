const SmartString = (stringValue, options = {}) => {
    const { pluralWord, customSuffix, quantity, formatAsSentence: formatSentenceIn } = options;
    const __string = stringValue;
    const exists = (item) => typeof (item) !== 'undefined';
    const notEmpty = (stringValue) => stringValue.length > 0;
    const xor = (a, b) => a !== b;
    const capitalizeWord = (word) => `${word[0].toUpperCase()}${word.slice(1)}`;
    const formatStringAsSentence = (stringValue) => {
        const stringArray = stringValue.split(' ');
        const firstWord = capitalizeWord(stringArray[0]);
        return `${firstWord} ${stringArray.slice(1).join(' ')}.`;
    };
    if (__string.length <= 0) {
        throw Error("stringValue cannot be empty");
    }
    const hasQuantity = exists(quantity);
    const isPlural = hasQuantity && quantity > 1;
    const hasPluralWord = exists(pluralWord) && notEmpty(pluralWord ?? "");
    const hasNonStandardSuffix = exists(customSuffix) && notEmpty(customSuffix ?? "");
    const shouldFormatAsSentence = exists(formatSentenceIn) ? formatSentenceIn : false;
    const pluralize = (isPlural) => {
        if (hasNonStandardSuffix) {
            return `${__string}${isPlural ? customSuffix : ""}`;
        }
        else if (hasPluralWord) {
            return `${isPlural ? pluralWord : __string}`;
        }
        else {
            const endsInS = __string[__string.length - 1].toLowerCase() === "s";
            return `${__string}${isPlural ? endsInS ? "es" : "s" : ``}`;
        }
    };
    const defaultReturn = (stringValue) => shouldFormatAsSentence ? formatStringAsSentence(stringValue) : stringValue;
    if (hasQuantity) {
        if (xor(hasPluralWord, hasNonStandardSuffix)) {
            return defaultReturn(pluralize(isPlural));
        }
        else {
            if (hasPluralWord && hasNonStandardSuffix)
                throw Error("Cannot have pluralWord and nonStandardSuffix options both enabled");
            return defaultReturn(pluralize(isPlural));
        }
    }
    return defaultReturn(__string);
};