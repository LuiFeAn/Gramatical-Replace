function correctStrings(strings, inputs) {


  const correctedStrings = strings.map(function(str){

    let minDistance = Infinity;

    let correctedStr = str;

    inputs.forEach(function(input){

      const distance = levenshteinDistance(str.toLowerCase(), input.toLowerCase());

      if (distance < minDistance) {

        minDistance = distance;

        correctedStr = input;
      }

    });

    return correctedStr;

  });

  return correctedStrings;
}

function levenshteinDistance(str1, str2) {

  const m = str1.length;

  const n = str2.length;

  if( str1.includes(' ') || str2.includes(' ') ){

    throw new Error('Send only words');

  }

  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {

    dp[i][0] = i;

  }

  for (let j = 0; j <= n; j++) {

    dp[0][j] = j;

  }

  for (let i = 1; i <= m; i++) {

    for (let j = 1; j <= n; j++) {

      if (str1[i - 1] === str2[j - 1]) {

        dp[i][j] = dp[i - 1][j - 1];

      } else {
        
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

const strings = [
  'Oin',
  'Legau',
  'incriver'
];

const inputs = [
  'Oi',
  'Legal',
  'Incível'
];

const correctedStrings = correctStrings(strings, inputs);

console.log(correctedStrings);
