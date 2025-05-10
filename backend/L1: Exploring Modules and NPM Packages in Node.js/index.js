const { checkPalindrome, countVowels } = require('./fun');

const words = ['banana', 'level', 'orange', 'madam', 'hello'];

words.forEach((word, index) => {
  const vowelsCount = countVowels(word);
  const isPalindrome = checkPalindrome(word);
  console.log(`word ${index + 1} -> ${word} -> vowelsCount: ${vowelsCount} -> isPalindrome: ${isPalindrome}`);
});
