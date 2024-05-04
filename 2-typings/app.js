"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toWords = void 0;
const LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
const TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];
function isSafeNumber(num) {
    return false;
}
function toWords(number, asOrdinal) {
    const num = parseInt(number.toString(), 10);
    if (!isFinite(num)) {
        throw new TypeError('Not a finite number: ' + number + ' (' + typeof number + ')');
    }
    if (!isSafeNumber(num)) {
        throw new RangeError('Input is not a safe number, it’s either too large or too small.');
    }
    const words = generateWords(num);
    function makeOrdinal(words) {
        return words;
    }
    return asOrdinal ? makeOrdinal(words) : words;
}
exports.toWords = toWords;
function generateWords(number, words) {
    let remainder = 0;
    let word = '';
    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < 100 /* NumbersEnum.ONE_HUNDRED */) {
        remainder = number % 10 /* NumbersEnum.TEN */;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / 10 /* NumbersEnum.TEN */)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < 1000 /* NumbersEnum.ONE_THOUSAND */) {
        remainder = number % 100 /* NumbersEnum.ONE_HUNDRED */;
        word = generateWords(Math.floor(number / 100 /* NumbersEnum.ONE_HUNDRED */)) + ' hundred';
    }
    else if (number < 1000000 /* NumbersEnum.ONE_MILLION */) {
        remainder = number % 1000 /* NumbersEnum.ONE_THOUSAND */;
        word = generateWords(Math.floor(number / 1000 /* NumbersEnum.ONE_THOUSAND */)) + ' thousand,';
    }
    else if (number < 1000000000 /* NumbersEnum.ONE_BILLION */) {
        remainder = number % 1000000 /* NumbersEnum.ONE_MILLION */;
        word = generateWords(Math.floor(number / 1000000 /* NumbersEnum.ONE_MILLION */)) + ' million,';
    }
    else if (number < 1000000000000 /* NumbersEnum.ONE_TRILLION */) {
        remainder = number % 1000000000 /* NumbersEnum.ONE_BILLION */;
        word = generateWords(Math.floor(number / 1000000000 /* NumbersEnum.ONE_BILLION */)) + ' billion,';
    }
    else if (number < 1000000000000000 /* NumbersEnum.ONE_QUADRILLION */) {
        remainder = number % 1000000000000 /* NumbersEnum.ONE_TRILLION */;
        word = generateWords(Math.floor(number / 1000000000000 /* NumbersEnum.ONE_TRILLION */)) + ' trillion,';
    }
    else if (number <= 9007199254740992 /* NumbersEnum.MAX */) {
        remainder = number % 1000000000000000 /* NumbersEnum.ONE_QUADRILLION */;
        word = generateWords(Math.floor(number / 1000000000000000 /* NumbersEnum.ONE_QUADRILLION */)) +
            ' quadrillion,';
    }
    words.push(word);
    return generateWords(remainder, words);
}
