export default function mergeAlternately(word1: string, word2: string): string {
  const { arr1, arr2 } = getArrsInOrder(word1, word2);
  let res = [];

  for (let i = 0; i < arr1.length; i++) {
    res.push(arr1[i]);
    if (i < arr2.length) {
      res.push(arr2[i]);
    }
  }

  return res.join("");
}

function chars(word: string) {
  return word.split("");
}

interface ArrsInOrder {
  arr1: Array<string>;
  arr2: Array<string>;
}

function getArrsInOrder(word1: string, word2: string): ArrsInOrder {
  return word1.length >= word2.length
    ? { arr1: chars(word1), arr2: chars(word2) }
    : { arr1: chars(word2), arr2: chars(word1) };
}
