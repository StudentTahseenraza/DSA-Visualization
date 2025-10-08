// backend/stringOperations.js
class StringOperations {
  constructor() {
    this.steps = [];
    this.string = "";
  }

  reverse() {
    this.steps = [];
    this.steps.push({
      string: this.string,
      action: 'start',
      message: 'Reversing the string'
    });

    let reversed = '';
    for (let i = this.string.length - 1; i >= 0; i--) {
      reversed += this.string[i];
      this.steps.push({
        string: this.string,
        reversed: reversed,
        action: 'reverse-step',
        index: i,
        char: this.string[i],
        message: `Added '${this.string[i]}' to reversed string`
      });
    }

    this.string = reversed;
    this.steps.push({
      string: this.string,
      action: 'reverse-complete',
      message: 'String reversed successfully'
    });

    return this.steps;
  }

  checkPalindrome() {
    this.steps = [];
    this.steps.push({
      string: this.string,
      action: 'start',
      message: 'Checking if string is a palindrome'
    });

    const len = this.string.length;
    const mid = Math.floor(len / 2);
    
    for (let i = 0; i < mid; i++) {
      const leftChar = this.string[i];
      const rightChar = this.string[len - 1 - i];
      
      this.steps.push({
        string: this.string,
        action: 'compare',
        leftIndex: i,
        rightIndex: len - 1 - i,
        leftChar,
        rightChar,
        message: `Comparing '${leftChar}' and '${rightChar}'`
      });

      if (leftChar !== rightChar) {
        this.steps.push({
          string: this.string,
          action: 'not-palindrome',
          message: `'${leftChar}' != '${rightChar}' - Not a palindrome`
        });
        return this.steps;
      }
    }

    this.steps.push({
      string: this.string,
      action: 'palindrome',
      message: 'String is a palindrome'
    });

    return this.steps;
  }

  kmpSearch(pattern) {
    this.steps = [];
    this.steps.push({
      string: this.string,
      pattern,
      action: 'start',
      message: `Searching for pattern '${pattern}' using KMP algorithm`
    });

    // Compute LPS array
    const lps = [0];
    let len = 0;
    let i = 1;
    
    this.steps.push({
      string: this.string,
      pattern,
      action: 'lps-start',
      message: 'Computing LPS (Longest Prefix Suffix) array'
    });

    while (i < pattern.length) {
      this.steps.push({
        string: this.string,
        pattern,
        action: 'lps-compare',
        i,
        len,
        patternCharI: pattern[i],
        patternCharLen: pattern[len],
        message: `Comparing pattern[${i}]='${pattern[i]}' with pattern[${len}]='${pattern[len]}'`
      });

      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
        
        this.steps.push({
          string: this.string,
          pattern,
          lps: [...lps],
          action: 'lps-match',
          i,
          len,
          message: `Characters match, setting lps[${i-1}]=${len}`
        });
      } else {
        if (len !== 0) {
          len = lps[len - 1];
          
          this.steps.push({
            string: this.string,
            pattern,
            lps: [...lps],
            action: 'lps-backtrack',
            i,
            len,
            message: `Backtracking len to ${len}`
          });
        } else {
          lps[i] = 0;
          i++;
          
          this.steps.push({
            string: this.string,
            pattern,
            lps: [...lps],
            action: 'lps-no-match',
            i,
            len,
            message: `No match, setting lps[${i-1}]=0`
          });
        }
      }
    }

    // KMP search
    this.steps.push({
      string: this.string,
      pattern,
      lps: [...lps],
      action: 'kmp-search-start',
      message: 'Starting KMP search with computed LPS array'
    });

    let strIndex = 0;
    let patIndex = 0;
    const matches = [];

    while (strIndex < this.string.length) {
      this.steps.push({
        string: this.string,
        pattern,
        strIndex,
        patIndex,
        action: 'kmp-compare',
        stringChar: this.string[strIndex],
        patternChar: pattern[patIndex],
        message: `Comparing string[${strIndex}]='${this.string[strIndex]}' with pattern[${patIndex}]='${pattern[patIndex]}'`
      });

      if (pattern[patIndex] === this.string[strIndex]) {
        strIndex++;
        patIndex++;
        
        this.steps.push({
          string: this.string,
          pattern,
          strIndex,
          patIndex,
          action: 'kmp-match',
          message: `Characters match, advancing both pointers`
        });

        if (patIndex === pattern.length) {
          matches.push(strIndex - patIndex);
          
          this.steps.push({
            string: this.string,
            pattern,
            strIndex,
            patIndex,
            matchIndex: strIndex - patIndex,
            action: 'kmp-found',
            message: `Pattern found at index ${strIndex - patIndex}`
          });
          
          patIndex = lps[patIndex - 1];
        }
      } else {
        if (patIndex !== 0) {
          patIndex = lps[patIndex - 1];
          
          this.steps.push({
            string: this.string,
            pattern,
            strIndex,
            patIndex,
            action: 'kmp-backtrack',
            message: `Backtracking pattern index to ${patIndex} using LPS array`
          });
        } else {
          strIndex++;
          
          this.steps.push({
            string: this.string,
            pattern,
            strIndex,
            patIndex,
            action: 'kmp-advance',
            message: `Advancing string index to ${strIndex}`
          });
        }
      }
    }

    if (matches.length > 0) {
      this.steps.push({
        string: this.string,
        pattern,
        matches,
        action: 'kmp-complete',
        message: `Search completed. Found ${matches.length} matches at positions: ${matches.join(', ')}`
      });
    } else {
      this.steps.push({
        string: this.string,
        pattern,
        action: 'kmp-not-found',
        message: 'Pattern not found in the string'
      });
    }

    return this.steps;
  }

  rabinKarpSearch(pattern) {
    this.steps = [];
    this.steps.push({
      string: this.string,
      pattern,
      action: 'start',
      message: `Searching for pattern '${pattern}' using Rabin-Karp algorithm`
    });

    const d = 256; // Number of characters in input alphabet
    const q = 101; // A prime number
    const M = pattern.length;
    const N = this.string.length;
    let i, j;
    let p = 0; // Hash value for pattern
    let t = 0; // Hash value for text
    let h = 1;
    const matches = [];

    // Calculate h = d^(M-1) % q
    for (i = 0; i < M - 1; i++) {
      h = (h * d) % q;
    }

    this.steps.push({
      string: this.string,
      pattern,
      h,
      action: 'rk-hash-constant',
      message: `Calculated hash constant h = ${h}`
    });

    // Calculate initial hash values for pattern and first window of text
    for (i = 0; i < M; i++) {
      p = (d * p + pattern.charCodeAt(i)) % q;
      t = (d * t + this.string.charCodeAt(i)) % q;
    }

    this.steps.push({
      string: this.string,
      pattern,
      patternHash: p,
      textHash: t,
      action: 'rk-initial-hash',
      message: `Calculated initial hashes: pattern=${p}, text=${t}`
    });

    // Slide the pattern over text one by one
    for (i = 0; i <= N - M; i++) {
      this.steps.push({
        string: this.string,
        pattern,
        i,
        patternHash: p,
        textHash: t,
        action: 'rk-check-window',
        message: `Checking window starting at index ${i}`
      });

      // Check hash values first
      if (p === t) {
        this.steps.push({
          string: this.string,
          pattern,
          i,
          action: 'rk-hash-match',
          message: 'Hash values match, checking characters'
        });

        // Check characters one by one
        let match = true;
        for (j = 0; j < M; j++) {
          this.steps.push({
            string: this.string,
            pattern,
            i,
            j,
            stringChar: this.string[i + j],
            patternChar: pattern[j],
            action: 'rk-char-compare',
            message: `Comparing string[${i+j}]='${this.string[i+j]}' with pattern[${j}]='${pattern[j]}'`
          });

          if (this.string[i + j] !== pattern[j]) {
            match = false;
            this.steps.push({
              string: this.string,
              pattern,
              i,
              j,
              action: 'rk-char-mismatch',
              message: 'Characters do not match'
            });
            break;
          }
        }

        if (match) {
          matches.push(i);
          this.steps.push({
            string: this.string,
            pattern,
            i,
            action: 'rk-found',
            message: `Pattern found at index ${i}`
          });
        }
      } else {
        this.steps.push({
          string: this.string,
          pattern,
          i,
          action: 'rk-hash-mismatch',
          message: 'Hash values do not match, skipping character check'
        });
      }

      // Calculate hash value for next window of text
      if (i < N - M) {
        t = (d * (t - this.string.charCodeAt(i) * h) + this.string.charCodeAt(i + M)) % q;
        
        // We might get negative value of t, converting it to positive
        if (t < 0) {
          t = (t + q);
        }
        
        this.steps.push({
          string: this.string,
          pattern,
          i,
          newTextHash: t,
          action: 'rk-next-hash',
          message: `Calculated hash for next window: ${t}`
        });
      }
    }

    if (matches.length > 0) {
      this.steps.push({
        string: this.string,
        pattern,
        matches,
        action: 'rk-complete',
        message: `Search completed. Found ${matches.length} matches at positions: ${matches.join(', ')}`
      });
    } else {
      this.steps.push({
        string: this.string,
        pattern,
        action: 'rk-not-found',
        message: 'Pattern not found in the string'
      });
    }

    return this.steps;
  }

  longestCommonSubstring(str2) {
    this.steps = [];
    this.steps.push({
      string1: this.string,
      string2: str2,
      action: 'start',
      message: `Finding longest common substring between '${this.string}' and '${str2}'`
    });

    const m = this.string.length;
    const n = str2.length;
    
    // Create a DP table
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    let maxLength = 0;
    let endIndex = 0;

    this.steps.push({
      string1: this.string,
      string2: str2,
      dp: JSON.parse(JSON.stringify(dp)),
      action: 'lcs-init',
      message: 'Initialized DP table with zeros'
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.steps.push({
          string1: this.string,
          string2: str2,
          i: i - 1,
          j: j - 1,
          char1: this.string[i - 1],
          char2: str2[j - 1],
          action: 'lcs-compare',
          message: `Comparing string1[${i-1}]='${this.string[i-1]}' with string2[${j-1}]='${str2[j-1]}'`
        });

        if (this.string[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          
          this.steps.push({
            string1: this.string,
            string2: str2,
            dp: JSON.parse(JSON.stringify(dp)),
            i: i - 1,
            j: j - 1,
            action: 'lcs-match',
            message: `Characters match, setting dp[${i}][${j}] = ${dp[i][j]}`
          });

          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endIndex = i - 1;
            
            this.steps.push({
              string1: this.string,
              string2: str2,
              dp: JSON.parse(JSON.stringify(dp)),
              maxLength,
              endIndex,
              action: 'lcs-new-max',
              message: `New maximum length found: ${maxLength}, ending at index ${endIndex}`
            });
          }
        } else {
          dp[i][j] = 0;
          
          this.steps.push({
            string1: this.string,
            string2: str2,
            dp: JSON.parse(JSON.stringify(dp)),
            i: i - 1,
            j: j - 1,
            action: 'lcs-no-match',
            message: `Characters do not match, setting dp[${i}][${j}] = 0`
          });
        }
      }
    }

    if (maxLength > 0) {
      const result = this.string.substring(endIndex - maxLength + 1, endIndex + 1);
      
      this.steps.push({
        string1: this.string,
        string2: str2,
        result,
        maxLength,
        action: 'lcs-found',
        message: `Longest common substring found: '${result}' with length ${maxLength}`
      });
    } else {
      this.steps.push({
        string1: this.string,
        string2: str2,
        action: 'lcs-not-found',
        message: 'No common substring found'
      });
    }

    return this.steps;
  }

  checkAnagram(str2) {
    this.steps = [];
    this.steps.push({
      string1: this.string,
      string2: str2,
      action: 'start',
      message: `Checking if '${this.string}' and '${str2}' are anagrams`
    });

    if (this.string.length !== str2.length) {
      this.steps.push({
        string1: this.string,
        string2: str2,
        action: 'anagram-length-mismatch',
        message: 'Strings have different lengths, cannot be anagrams'
      });
      return this.steps;
    }

    const charCount = {};
    
    // Count characters in first string
    for (let i = 0; i < this.string.length; i++) {
      const char = this.string[i];
      charCount[char] = (charCount[char] || 0) + 1;
      
      this.steps.push({
        string1: this.string,
        string2: str2,
        char,
        count: charCount[char],
        action: 'anagram-count1',
        message: `Counted '${char}' in string1: ${charCount[char]}`
      });
    }

    // Subtract characters from second string
    for (let i = 0; i < str2.length; i++) {
      const char = str2[i];
      
      this.steps.push({
        string1: this.string,
        string2: str2,
        char,
        action: 'anagram-check2',
        message: `Checking '${char}' from string2`
      });

      if (!charCount[char]) {
        this.steps.push({
          string1: this.string,
          string2: str2,
          char,
          action: 'anagram-not',
          message: `'${char}' not found in string1 or count is zero - not anagrams`
        });
        return this.steps;
      }
      
      charCount[char]--;
      
      this.steps.push({
        string1: this.string,
        string2: str2,
        char,
        count: charCount[char],
        action: 'anagram-count2',
        message: `Decremented count for '${char}': ${charCount[char]}`
      });
    }

    this.steps.push({
      string1: this.string,
      string2: str2,
      action: 'anagram-yes',
      message: 'All character counts matched - strings are anagrams'
    });

    return this.steps;
  }
}

const stringOperations = (operation, ...args) => {
  const stringOp = new StringOperations();
  
  const pseudocode = {
    reverse: [
      'initialize empty result string',
      'for i from length-1 down to 0:',
      '  append character at i to result',
      'return result string'
    ],
    checkPalindrome: [
      'for i from 0 to middle of string:',
      '  if character at i != character at length-1-i:',
      '    return false',
      'return true'
    ],
    kmpSearch: [
      'compute LPS array for pattern',
      'initialize pointers i=0, j=0',
      'while i < text length:',
      '  if pattern[j] == text[i]:',
      '    increment both pointers',
      '    if j == pattern length:',
      '      pattern found at i-j',
      '      j = lps[j-1]',
      '  else:',
      '    if j != 0: j = lps[j-1]',
      '    else: increment i'
    ],
    rabinKarpSearch: [
      'calculate hash value for pattern and first window of text',
      'for each possible window:',
      '  if pattern hash == window hash:',
      '    check characters one by one',
      '    if all match: pattern found',
      '  calculate hash for next window'
    ],
    longestCommonSubstring: [
      'create DP table with dimensions (m+1) x (n+1)',
      'initialize with zeros',
      'for i from 1 to m:',
      '  for j from 1 to n:',
      '    if string1[i-1] == string2[j-1]:',
      '      dp[i][j] = dp[i-1][j-1] + 1',
      '      update max length if needed',
      '    else: dp[i][j] = 0',
      'return substring using max length and end index'
    ],
    checkAnagram: [
      'if lengths differ: return false',
      'create character count map for string1',
      'for each character in string2:',
      '  decrement count in map',
      '  if count becomes negative: return false',
      'return true'
    ]
  };

  let steps;
  switch (operation) {
    case 'reverse':
      steps = stringOp.reverse();
      break;
    case 'checkPalindrome':
      steps = stringOp.checkPalindrome();
      break;
    case 'kmpSearch':
      steps = stringOp.kmpSearch(args[0]);
      break;
    case 'rabinKarpSearch':
      steps = stringOp.rabinKarpSearch(args[0]);
      break;
    case 'longestCommonSubstring':
      steps = stringOp.longestCommonSubstring(args[0]);
      break;
    case 'checkAnagram':
      steps = stringOp.checkAnagram(args[0]);
      break;
    default:
      return { steps: [], pseudocode: [], error: 'Invalid operation' };
  }

  return { steps, pseudocode: pseudocode[operation], string: stringOp.string };
};

module.exports = stringOperations;