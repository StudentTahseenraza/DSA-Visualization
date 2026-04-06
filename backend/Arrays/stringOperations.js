// backend/stringOperations.js
class StringOperations {
  constructor() {
    this.steps = [];
    this.string = "";
    this.pseudocodeMap = {
      reverse: [
        "function reverse(str):",
        "    let result = \"\"",
        "    for i from str.length-1 down to 0:",
        "        result += str[i]",
        "    return result"
      ],
      checkPalindrome: [
        "function isPalindrome(str):",
        "    let left = 0",
        "    let right = str.length - 1",
        "    while left < right:",
        "        if str[left] != str[right]:",
        "            return false",
        "        left++",
        "        right--",
        "    return true"
      ],
      kmpSearch: [
        "function KMPSearch(text, pattern):",
        "    lps = computeLPS(pattern)",
        "    i = 0, j = 0",
        "    while i < text.length:",
        "        if pattern[j] == text[i]:",
        "            i++, j++",
        "            if j == pattern.length:",
        "                found at i - j",
        "                j = lps[j-1]",
        "        else:",
        "            if j != 0: j = lps[j-1]",
        "            else: i++",
        "    return matches"
      ],
      rabinKarpSearch: [
        "function RabinKarp(text, pattern):",
        "    hashPattern = hash(pattern)",
        "    hashText = hash(text[0..m-1])",
        "    for i = 0 to n-m:",
        "        if hashPattern == hashText:",
        "            if pattern == text[i..i+m-1]:",
        "                found at i",
        "        if i < n-m:",
        "            hashText = rollHash(hashText, text[i], text[i+m])",
        "    return matches"
      ],
      longestCommonSubstring: [
        "function LCS(s1, s2):",
        "    dp = 2D array of zeros",
        "    maxLen = 0, endIdx = 0",
        "    for i = 1 to s1.length:",
        "        for j = 1 to s2.length:",
        "            if s1[i-1] == s2[j-1]:",
        "                dp[i][j] = dp[i-1][j-1] + 1",
        "                if dp[i][j] > maxLen:",
        "                    maxLen = dp[i][j]",
        "                    endIdx = i",
        "    return s1[endIdx-maxLen..endIdx]"
      ],
      checkAnagram: [
        "function isAnagram(s1, s2):",
        "    if s1.length != s2.length:",
        "        return false",
        "    count = new Map()",
        "    for char in s1:",
        "        count[char]++",
        "    for char in s2:",
        "        if !count[char]: return false",
        "        count[char]--",
        "    return true"
      ]
    };
  }

  reverse() {
    this.steps = [];
    this.steps.push({
      action: 'start',
      message: 'Starting string reversal',
      string: this.string,
      activeLine: 1,
      explanation: 'We begin the reversal process by initializing an empty result string.'
    });

    let reversed = '';
    const len = this.string.length;
    
    for (let i = len - 1; i >= 0; i--) {
      this.steps.push({
        action: 'reverse-step',
        message: `Adding character '${this.string[i]}' at position ${i} to result`,
        string: this.string,
        reversed: reversed + this.string[i],
        currentIndex: i,
        char: this.string[i],
        reversedLength: reversed.length + 1,
        remainingSteps: i,
        activeLine: 3,
        explanation: `At position ${i}, character '${this.string[i]}' is appended to the reversed string.`
      });
      reversed += this.string[i];
    }

    this.string = reversed;
    this.steps.push({
      action: 'reverse-complete',
      message: 'String reversal completed successfully',
      string: this.string,
      reversed: this.string,
      activeLine: 4,
      explanation: `The original string has been completely reversed. Result: "${this.string}"`
    });

    return this.steps;
  }

  checkPalindrome() {
    this.steps = [];
    const len = this.string.length;
    
    this.steps.push({
      action: 'start',
      message: 'Checking if string is a palindrome',
      string: this.string,
      activeLine: 1,
      explanation: `We check if "${this.string}" reads the same forwards and backwards.`
    });

    this.steps.push({
      action: 'init',
      message: `Initializing left pointer at index 0 and right pointer at index ${len - 1}`,
      string: this.string,
      leftIndex: 0,
      rightIndex: len - 1,
      activeLine: 2,
      explanation: `Left pointer starts at the beginning (0), right pointer at the end (${len - 1}).`
    });

    const mid = Math.floor(len / 2);
    
    for (let i = 0; i < mid; i++) {
      const leftChar = this.string[i];
      const rightChar = this.string[len - 1 - i];
      
      this.steps.push({
        action: 'compare',
        message: `Comparing '${leftChar}' at index ${i} with '${rightChar}' at index ${len - 1 - i}`,
        string: this.string,
        leftIndex: i,
        rightIndex: len - 1 - i,
        leftChar,
        rightChar,
        activeLine: 4,
        explanation: `At step ${i + 1}, we compare character at position ${i} ('${leftChar}') with character at position ${len - 1 - i} ('${rightChar}').`
      });

      if (leftChar !== rightChar) {
        this.steps.push({
          action: 'not-palindrome',
          message: `'${leftChar}' ≠ '${rightChar}' → Not a palindrome`,
          string: this.string,
          leftIndex: i,
          rightIndex: len - 1 - i,
          leftChar,
          rightChar,
          activeLine: 5,
          explanation: `Since '${leftChar}' does not equal '${rightChar}', the string cannot be a palindrome.`
        });
        return this.steps;
      }
      
      this.steps.push({
        action: 'match',
        message: `✓ '${leftChar}' matches '${rightChar}' → Moving pointers inward`,
        string: this.string,
        leftIndex: i,
        rightIndex: len - 1 - i,
        leftChar,
        rightChar,
        activeLine: 6,
        explanation: `Characters match! Moving left pointer to ${i + 1} and right pointer to ${len - 2 - i}.`
      });
    }

    this.steps.push({
      action: 'palindrome',
      message: '✓ String is a palindrome!',
      string: this.string,
      activeLine: 8,
      explanation: `All character pairs matched. "${this.string}" reads the same forwards and backwards.`
    });

    return this.steps;
  }

  kmpSearch(pattern) {
    this.steps = [];
    this.steps.push({
      action: 'start',
      message: `Searching for pattern '${pattern}' using KMP algorithm`,
      string: this.string,
      pattern,
      activeLine: 1,
      explanation: `KMP (Knuth-Morris-Pratt) efficiently searches by preprocessing the pattern.`
    });

    // Compute LPS array
    const lps = [0];
    let len = 0;
    let i = 1;
    
    this.steps.push({
      action: 'lps-start',
      message: 'Building LPS (Longest Prefix Suffix) array',
      pattern,
      lps: [...lps],
      activeLine: 2,
      explanation: 'LPS array helps avoid redundant comparisons when a mismatch occurs.'
    });

    while (i < pattern.length) {
      this.steps.push({
        action: 'lps-compare',
        message: `Comparing pattern[${i}]='${pattern[i]}' with pattern[${len}]='${pattern[len]}'`,
        pattern,
        lps: [...lps],
        i,
        len,
        patternCharI: pattern[i],
        patternCharLen: pattern[len],
        activeLine: 2,
        explanation: `Checking if prefix of length ${len} matches suffix ending at position ${i}.`
      });

      if (pattern[i] === pattern[len]) {
        len++;
        lps[i] = len;
        i++;
        
        this.steps.push({
          action: 'lps-match',
          message: `✓ Characters match! lps[${i-1}] = ${len}`,
          pattern,
          lps: [...lps],
          i,
          len,
          activeLine: 2,
          explanation: `Match found! LPS value at index ${i-1} is set to ${len}.`
        });
      } else {
        if (len !== 0) {
          len = lps[len - 1];
          this.steps.push({
            action: 'lps-backtrack',
            message: `↺ Backtracking: len becomes ${len}`,
            pattern,
            lps: [...lps],
            i,
            len,
            activeLine: 2,
            explanation: `Mismatch at position ${i}. Backtracking to previous LPS value ${len}.`
          });
        } else {
          lps[i] = 0;
          i++;
          this.steps.push({
            action: 'lps-no-match',
            message: `✗ No match, lps[${i-1}] = 0`,
            pattern,
            lps: [...lps],
            i,
            len,
            activeLine: 2,
            explanation: `No matching prefix-suffix. Setting LPS at index ${i-1} to 0.`
          });
        }
      }
    }

    this.steps.push({
      action: 'lps-complete',
      message: `LPS array computed: [${lps.join(', ')}]`,
      pattern,
      lps: [...lps],
      activeLine: 3,
      explanation: `LPS array complete. Now starting the actual search.`
    });

    // KMP search
    let strIndex = 0;
    let patIndex = 0;
    const matches = [];

    while (strIndex < this.string.length) {
      this.steps.push({
        action: 'kmp-compare',
        message: `Comparing text[${strIndex}]='${this.string[strIndex]}' with pattern[${patIndex}]='${pattern[patIndex]}'`,
        string: this.string,
        pattern,
        strIndex,
        patIndex,
        stringChar: this.string[strIndex],
        patternChar: pattern[patIndex],
        activeLine: 4,
        explanation: `At iteration ${strIndex + 1}, comparing text character '${this.string[strIndex]}' with pattern character '${pattern[patIndex]}'.`
      });

      if (pattern[patIndex] === this.string[strIndex]) {
        strIndex++;
        patIndex++;
        
        this.steps.push({
          action: 'kmp-match',
          message: `✓ Characters match! Advancing both pointers`,
          string: this.string,
          pattern,
          strIndex,
          patIndex,
          activeLine: 5,
          explanation: `Match found! Moving to next characters: text[${strIndex}] and pattern[${patIndex}].`
        });

        if (patIndex === pattern.length) {
          matches.push(strIndex - patIndex);
          this.steps.push({
            action: 'kmp-found',
            message: `🎯 Pattern found at index ${strIndex - patIndex}!`,
            string: this.string,
            pattern,
            matches: [...matches],
            matchIndex: strIndex - patIndex,
            activeLine: 6,
            explanation: `Pattern fully matched! Found at position ${strIndex - patIndex}.`
          });
          patIndex = lps[patIndex - 1];
        }
      } else {
        if (patIndex !== 0) {
          patIndex = lps[patIndex - 1];
          this.steps.push({
            action: 'kmp-backtrack',
            message: `↺ Mismatch! Backtracking pattern index to ${patIndex}`,
            string: this.string,
            pattern,
            strIndex,
            patIndex,
            activeLine: 8,
            explanation: `Mismatch occurred. Using LPS array to shift pattern to position ${patIndex}.`
          });
        } else {
          strIndex++;
          this.steps.push({
            action: 'kmp-advance',
            message: `↺ No match, advancing text index to ${strIndex}`,
            string: this.string,
            pattern,
            strIndex,
            patIndex,
            activeLine: 9,
            explanation: `Pattern cannot match at current position. Moving to next character in text.`
          });
        }
      }
    }

    if (matches.length > 0) {
      this.steps.push({
        action: 'kmp-complete',
        message: `✅ Search complete! Found ${matches.length} match(es) at positions: ${matches.join(', ')}`,
        string: this.string,
        pattern,
        matches,
        activeLine: 10,
        explanation: `KMP search completed. Pattern "${pattern}" appears ${matches.length} time(s) at positions ${matches.join(', ')}.`
      });
    } else {
      this.steps.push({
        action: 'kmp-not-found',
        message: `❌ Pattern '${pattern}' not found in the string`,
        string: this.string,
        pattern,
        activeLine: 10,
        explanation: `KMP search completed. Pattern "${pattern}" was not found in the text.`
      });
    }

    return this.steps;
  }

  rabinKarpSearch(pattern) {
    this.steps = [];
    const d = 256;
    const q = 101;
    const M = pattern.length;
    const N = this.string.length;
    let p = 0;
    let t = 0;
    let h = 1;
    const matches = [];

    this.steps.push({
      action: 'start',
      message: `Searching for pattern '${pattern}' using Rabin-Karp algorithm`,
      string: this.string,
      pattern,
      activeLine: 1,
      explanation: `Rabin-Karp uses rolling hash for efficient pattern matching.`
    });

    for (let i = 0; i < M - 1; i++) {
      h = (h * d) % q;
    }

    this.steps.push({
      action: 'hash-calc',
      message: `Calculated hash constant h = ${h}`,
      string: this.string,
      pattern,
      h,
      activeLine: 2,
      explanation: `Hash constant h = d^(m-1) mod q = ${h}`
    });

    for (let i = 0; i < M; i++) {
      p = (d * p + pattern.charCodeAt(i)) % q;
      t = (d * t + this.string.charCodeAt(i)) % q;
    }

    this.steps.push({
      action: 'initial-hash',
      message: `Initial hashes - Pattern: ${p}, First window: ${t}`,
      string: this.string,
      pattern,
      patternHash: p,
      textHash: t,
      windowStart: 0,
      activeLine: 2,
      explanation: `Calculated initial hash values: pattern hash = ${p}, first text window hash = ${t}`
    });

    for (let i = 0; i <= N - M; i++) {
      this.steps.push({
        action: 'window-check',
        message: `Checking window starting at index ${i}`,
        string: this.string,
        pattern,
        windowStart: i,
        patternHash: p,
        textHash: t,
        activeLine: 3,
        explanation: `Examining substring starting at position ${i}: "${this.string.substr(i, M)}"`
      });

      if (p === t) {
        this.steps.push({
          action: 'hash-match',
          message: `Hash values match! Verifying characters...`,
          string: this.string,
          pattern,
          windowStart: i,
          patternHash: p,
          textHash: t,
          activeLine: 4,
          explanation: `Hash collision detected. Performing character-by-character verification.`
        });

        let match = true;
        for (let j = 0; j < M; j++) {
          this.steps.push({
            action: 'char-compare',
            message: `Comparing text[${i+j}]='${this.string[i+j]}' with pattern[${j}]='${pattern[j]}'`,
            string: this.string,
            pattern,
            windowStart: i,
            compareIndex: j,
            stringChar: this.string[i + j],
            patternChar: pattern[j],
            activeLine: 5,
            explanation: `Verifying character ${j+1}: text[${i+j}] = '${this.string[i+j]}', pattern[${j}] = '${pattern[j]}'`
          });

          if (this.string[i + j] !== pattern[j]) {
            match = false;
            this.steps.push({
              action: 'char-mismatch',
              message: `✗ Character mismatch at position ${i+j}`,
              string: this.string,
              pattern,
              windowStart: i,
              compareIndex: j,
              activeLine: 5,
              explanation: `Characters don't match. This is a hash collision.`
            });
            break;
          }
        }

        if (match) {
          matches.push(i);
          this.steps.push({
            action: 'pattern-found',
            message: `🎯 Pattern found at index ${i}!`,
            string: this.string,
            pattern,
            matches: [...matches],
            windowStart: i,
            activeLine: 6,
            explanation: `Pattern "${pattern}" found at position ${i}!`
          });
        }
      } else {
        this.steps.push({
          action: 'hash-mismatch',
          message: `Hash mismatch (${p} ≠ ${t}) → Skipping character check`,
          string: this.string,
          pattern,
          windowStart: i,
          patternHash: p,
          textHash: t,
          activeLine: 3,
          explanation: `Hash values differ, so pattern cannot match at this position.`
        });
      }

      if (i < N - M) {
        t = (d * (t - this.string.charCodeAt(i) * h) + this.string.charCodeAt(i + M)) % q;
        if (t < 0) t = (t + q);
        
        this.steps.push({
          action: 'next-hash',
          message: `Rolling hash for next window: ${t}`,
          string: this.string,
          pattern,
          windowStart: i + 1,
          newTextHash: t,
          activeLine: 7,
          explanation: `Using rolling hash to compute hash for next window in O(1) time.`
        });
      }
    }

    if (matches.length > 0) {
      this.steps.push({
        action: 'complete',
        message: `✅ Search complete! Found ${matches.length} match(es) at positions: ${matches.join(', ')}`,
        string: this.string,
        pattern,
        matches,
        activeLine: 8,
        explanation: `Rabin-Karp search completed. Found ${matches.length} occurrence(s) of "${pattern}".`
      });
    } else {
      this.steps.push({
        action: 'not-found',
        message: `❌ Pattern '${pattern}' not found`,
        string: this.string,
        pattern,
        activeLine: 8,
        explanation: `Pattern "${pattern}" was not found in the text.`
      });
    }

    return this.steps;
  }

  longestCommonSubstring(str2) {
    this.steps = [];
    const m = this.string.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    let maxLength = 0;
    let endIndex = 0;

    this.steps.push({
      action: 'start',
      message: `Finding longest common substring between '${this.string}' and '${str2}'`,
      string1: this.string,
      string2: str2,
      activeLine: 1,
      explanation: `We'll use dynamic programming to find the longest common substring.`
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.steps.push({
          action: 'compare',
          message: `Comparing '${this.string[i-1]}' (s1[${i-1}]) with '${str2[j-1]}' (s2[${j-1}])`,
          string1: this.string,
          string2: str2,
          i: i - 1,
          j: j - 1,
          char1: this.string[i - 1],
          char2: str2[j - 1],
          dpTable: JSON.parse(JSON.stringify(dp)),
          activeLine: 3,
          explanation: `At position (${i},${j}), comparing characters '${this.string[i-1]}' and '${str2[j-1]}'.`
        });

        if (this.string[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          this.steps.push({
            action: 'match',
            message: `✓ Characters match! dp[${i}][${j}] = ${dp[i][j]}`,
            string1: this.string,
            string2: str2,
            i: i - 1,
            j: j - 1,
            dpTable: JSON.parse(JSON.stringify(dp)),
            activeLine: 4,
            explanation: `Characters match! Extending common substring length to ${dp[i][j]}.`
          });

          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endIndex = i - 1;
            this.steps.push({
              action: 'new-max',
              message: `🎯 New maximum length: ${maxLength} (ending at s1[${endIndex}])`,
              string1: this.string,
              string2: str2,
              maxLength,
              endIndex,
              dpTable: JSON.parse(JSON.stringify(dp)),
              activeLine: 5,
              explanation: `Found longer common substring! Length ${maxLength} ending at position ${endIndex} in string 1.`
            });
          }
        } else {
          dp[i][j] = 0;
          this.steps.push({
            action: 'no-match',
            message: `✗ Characters differ → dp[${i}][${j}] = 0`,
            string1: this.string,
            string2: str2,
            i: i - 1,
            j: j - 1,
            dpTable: JSON.parse(JSON.stringify(dp)),
            activeLine: 7,
            explanation: `Characters don't match. Current substring length resets to 0.`
          });
        }
      }
    }

    if (maxLength > 0) {
      const result = this.string.substring(endIndex - maxLength + 1, endIndex + 1);
      this.steps.push({
        action: 'complete',
        message: `✅ Longest common substring: "${result}" (length ${maxLength})`,
        string1: this.string,
        string2: str2,
        result,
        maxLength,
        dpTable: JSON.parse(JSON.stringify(dp)),
        activeLine: 8,
        explanation: `DP table complete. Longest common substring is "${result}" with length ${maxLength}.`
      });
    } else {
      this.steps.push({
        action: 'not-found',
        message: `❌ No common substring found`,
        string1: this.string,
        string2: str2,
        activeLine: 8,
        explanation: `No common characters found between the two strings.`
      });
    }

    return this.steps;
  }

  checkAnagram(str2) {
    this.steps = [];
    
    this.steps.push({
      action: 'start',
      message: `Checking if '${this.string}' and '${str2}' are anagrams`,
      string1: this.string,
      string2: str2,
      activeLine: 1,
      explanation: `Two strings are anagrams if they contain the same characters with the same frequencies.`
    });

    if (this.string.length !== str2.length) {
      this.steps.push({
        action: 'length-mismatch',
        message: `❌ Lengths differ (${this.string.length} ≠ ${str2.length}) → Not anagrams`,
        string1: this.string,
        string2: str2,
        activeLine: 2,
        explanation: `Strings must have equal length to be anagrams.`
      });
      return this.steps;
    }

    this.steps.push({
      action: 'length-match',
      message: `✓ Lengths match (${this.string.length} = ${str2.length})`,
      string1: this.string,
      string2: str2,
      activeLine: 3,
      explanation: `Both strings have length ${this.string.length}. Proceeding with character frequency check.`
    });

    const charCount = {};
    
    for (let i = 0; i < this.string.length; i++) {
      const char = this.string[i];
      charCount[char] = (charCount[char] || 0) + 1;
      this.steps.push({
        action: 'count-first',
        message: `Counting '${char}' in string1: ${charCount[char]}`,
        string1: this.string,
        string2: str2,
        char,
        count: charCount[char],
        charCountMap: { ...charCount },
        activeLine: 4,
        explanation: `Character '${char}' appears ${charCount[char]} time(s) in first string.`
      });
    }

    this.steps.push({
      action: 'map-complete',
      message: `Character frequency map built: ${JSON.stringify(charCount)}`,
      string1: this.string,
      string2: str2,
      charCountMap: { ...charCount },
      activeLine: 5,
      explanation: `Frequency map shows character counts from first string.`
    });

    for (let i = 0; i < str2.length; i++) {
      const char = str2[i];
      
      this.steps.push({
        action: 'check-second',
        message: `Checking '${char}' from string2`,
        string1: this.string,
        string2: str2,
        char,
        currentIndex: i,
        charCountMap: { ...charCount },
        activeLine: 6,
        explanation: `Processing character '${char}' from second string.`
      });

      if (!charCount[char] || charCount[char] === 0) {
        this.steps.push({
          action: 'not-anagram',
          message: `❌ '${char}' not found or count exhausted → Not anagrams`,
          string1: this.string,
          string2: str2,
          char,
          activeLine: 7,
          explanation: `Character '${char}' appears more times in second string than in first.`
        });
        return this.steps;
      }
      
      charCount[char]--;
      this.steps.push({
        action: 'decrement',
        message: `✓ '${char}' found, remaining count: ${charCount[char]}`,
        string1: this.string,
        string2: str2,
        char,
        count: charCount[char],
        charCountMap: { ...charCount },
        activeLine: 6,
        explanation: `Character '${char}' matched. ${charCount[char]} occurrence(s) remaining.`
      });
    }

    this.steps.push({
      action: 'anagram',
      message: `✅ '${this.string}' and '${str2}' ARE anagrams!`,
      string1: this.string,
      string2: str2,
      activeLine: 8,
      explanation: `All character counts match! The strings are anagrams of each other.`
    });

    return this.steps;
  }

  getComplexity(operation, textLength, patternLength = 0) {
    const complexities = {
      reverse: {
        time: "O(n)",
        space: "O(n)",
        explanation: "Linear time - each character is visited once. Linear space for the reversed string."
      },
      checkPalindrome: {
        time: "O(n)",
        space: "O(1)",
        explanation: "Linear time - at most n/2 comparisons. Constant space - only uses two pointers."
      },
      kmpSearch: {
        time: "O(n + m)",
        space: "O(m)",
        explanation: "Linear time - both LPS computation and search are O(n + m). O(m) space for LPS array."
      },
      rabinKarpSearch: {
        time: "O(n + m)",
        space: "O(1)",
        explanation: "Average O(n + m), worst-case O(n*m). Constant space for rolling hash."
      },
      longestCommonSubstring: {
        time: "O(n * m)",
        space: "O(n * m)",
        explanation: "Quadratic time - DP table of size n*m. Same space for DP table."
      },
      checkAnagram: {
        time: "O(n)",
        space: "O(k)",
        explanation: "Linear time - one pass through each string. O(k) space where k is unique characters."
      }
    };
    return complexities[operation];
  }

  getOptimizationTips(operation) {
    const tips = {
      reverse: [
        "Use two-pointer technique for in-place reversal",
        "In Python, use string slicing: s[::-1]",
        "For large strings, consider using StringBuilder in Java"
      ],
      checkPalindrome: [
        "Only need to check half the string (up to middle)",
        "Use two-pointer technique for O(1) space",
        "Ignore non-alphanumeric characters for real-world palindrome checks"
      ],
      kmpSearch: [
        "Preprocessing the pattern (LPS) is the key to KMP's efficiency",
        "LPS array helps avoid re-checking characters we've already matched",
        "Time complexity is O(n+m) regardless of alphabet size"
      ],
      rabinKarpSearch: [
        "Choose a large prime number for modulo to reduce collisions",
        "Good for multiple pattern matching",
        "Rolling hash allows O(1) hash calculation for next window"
      ],
      longestCommonSubstring: [
        "DP solution uses O(mn) time and space",
        "Can be optimized to O(min(m,n)) space using only two rows",
        "For multiple strings, use suffix trees for better efficiency"
      ],
      checkAnagram: [
        "Use character count array (size 26) for lowercase English letters",
        "Sorting both strings is O(n log n) but simpler to implement",
        "Early exit on length mismatch saves time"
      ]
    };
    return tips[operation];
  }

  getRealWorldUseCases(operation) {
    const useCases = {
      reverse: [
        "Text processing and string manipulation",
        "Implementing undo/redo functionality",
        "Palindrome checking algorithms"
      ],
      checkPalindrome: [
        "DNA sequence analysis",
        "Natural language processing",
        "String matching in bioinformatics"
      ],
      kmpSearch: [
        "Text editors (find functionality)",
        "DNA sequence matching",
        "Spam detection algorithms",
        "Network intrusion detection"
      ],
      rabinKarpSearch: [
        "Plagiarism detection",
        "DNA pattern matching",
        "String matching in large documents"
      ],
      longestCommonSubstring: [
        "DNA sequencing and analysis",
        "Plagiarism detection",
        "Version control systems (diff tools)"
      ],
      checkAnagram: [
        "Word games (Scrabble, Words with Friends)",
        "Cryptography (anagram ciphers)",
        "Language processing and analysis"
      ]
    };
    return useCases[operation];
  }

  getCodeSnippets(operation) {
    return {
      javascript: this.getJavaScriptCode(operation),
      python: this.getPythonCode(operation),
      cpp: this.getCppCode(operation)
    };
  }

  getJavaScriptCode(operation) {
    const codes = {
      reverse: `function reverse(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}`,
      checkPalindrome: `function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
      kmpSearch: `function kmpSearch(text, pattern) {
    const lps = computeLPS(pattern);
    const matches = [];
    let i = 0, j = 0;
    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++; j++;
            if (j === pattern.length) {
                matches.push(i - j);
                j = lps[j - 1];
            }
        } else if (j !== 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return matches;
}`,
      rabinKarpSearch: `function rabinKarp(text, pattern) {
    const d = 256, q = 101;
    const matches = [];
    let p = 0, t = 0, h = 1;
    for (let i = 0; i < pattern.length - 1; i++)
        h = (h * d) % q;
    for (let i = 0; i < pattern.length; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }
    for (let i = 0; i <= text.length - pattern.length; i++) {
        if (p === t) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) matches.push(i);
        }
        if (i < text.length - pattern.length) {
            t = (d * (t - text.charCodeAt(i) * h) + 
                 text.charCodeAt(i + pattern.length)) % q;
            if (t < 0) t += q;
        }
    }
    return matches;
}`,
      longestCommonSubstring: `function longestCommonSubstring(s1, s2) {
    const dp = Array(s1.length + 1).fill().map(() => Array(s2.length + 1).fill(0));
    let maxLen = 0, endIdx = 0;
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            if (s1[i-1] === s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endIdx = i;
                }
            }
        }
    }
    return s1.substring(endIdx - maxLen, endIdx);
}`,
      checkAnagram: `function isAnagram(s1, s2) {
    if (s1.length !== s2.length) return false;
    const count = {};
    for (let char of s1) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let char of s2) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}`
    };
    return codes[operation];
  }

  getPythonCode(operation) {
    const codes = {
      reverse: `def reverse(s):
    result = ""
    for i in range(len(s) - 1, -1, -1):
        result += s[i]
    return result`,
      checkPalindrome: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`,
      kmpSearch: `def kmp_search(text, pattern):
    def compute_lps(pattern):
        lps = [0] * len(pattern)
        length = 0
        i = 1
        while i < len(pattern):
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            elif length != 0:
                length = lps[length - 1]
            else:
                lps[i] = 0
                i += 1
        return lps
    
    lps = compute_lps(pattern)
    matches = []
    i = j = 0
    while i < len(text):
        if pattern[j] == text[i]:
            i += 1
            j += 1
            if j == len(pattern):
                matches.append(i - j)
                j = lps[j - 1]
        elif j != 0:
            j = lps[j - 1]
        else:
            i += 1
    return matches`,
      rabinKarpSearch: `def rabin_karp(text, pattern):
    d = 256
    q = 101
    matches = []
    p = t = 0
    h = 1
    for i in range(len(pattern) - 1):
        h = (h * d) % q
    for i in range(len(pattern)):
        p = (d * p + ord(pattern[i])) % q
        t = (d * t + ord(text[i])) % q
    for i in range(len(text) - len(pattern) + 1):
        if p == t:
            if text[i:i+len(pattern)] == pattern:
                matches.append(i)
        if i < len(text) - len(pattern):
            t = (d * (t - ord(text[i]) * h) + 
                 ord(text[i + len(pattern)])) % q
            if t < 0:
                t += q
    return matches`,
      longestCommonSubstring: `def longest_common_substring(s1, s2):
    dp = [[0] * (len(s2) + 1) for _ in range(len(s1) + 1)]
    max_len = 0
    end_idx = 0
    for i in range(1, len(s1) + 1):
        for j in range(1, len(s2) + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
                    end_idx = i
    return s1[end_idx - max_len:end_idx]`,
      checkAnagram: `def is_anagram(s1, s2):
    if len(s1) != len(s2):
        return False
    count = {}
    for char in s1:
        count[char] = count.get(char, 0) + 1
    for char in s2:
        if not count.get(char, 0):
            return False
        count[char] -= 1
    return True`
    };
    return codes[operation];
  }

  getCppCode(operation) {
    const codes = {
      reverse: `string reverse(string s) {
    string result = "";
    for (int i = s.length() - 1; i >= 0; i--) {
        result += s[i];
    }
    return result;
}`,
      checkPalindrome: `bool isPalindrome(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
      kmpSearch: `vector<int> kmpSearch(string text, string pattern) {
    vector<int> lps = computeLPS(pattern);
    vector<int> matches;
    int i = 0, j = 0;
    while (i < text.length()) {
        if (pattern[j] == text[i]) {
            i++; j++;
            if (j == pattern.length()) {
                matches.push_back(i - j);
                j = lps[j - 1];
            }
        } else if (j != 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return matches;
}`,
      rabinKarpSearch: `vector<int> rabinKarp(string text, string pattern) {
    const int d = 256, q = 101;
    vector<int> matches;
    int p = 0, t = 0, h = 1;
    for (int i = 0; i < pattern.length() - 1; i++)
        h = (h * d) % q;
    for (int i = 0; i < pattern.length(); i++) {
        p = (d * p + pattern[i]) % q;
        t = (d * t + text[i]) % q;
    }
    for (int i = 0; i <= text.length() - pattern.length(); i++) {
        if (p == t) {
            bool match = true;
            for (int j = 0; j < pattern.length(); j++) {
                if (text[i + j] != pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) matches.push_back(i);
        }
        if (i < text.length() - pattern.length()) {
            t = (d * (t - text[i] * h) + text[i + pattern.length()]) % q;
            if (t < 0) t += q;
        }
    }
    return matches;
}`,
      longestCommonSubstring: `string longestCommonSubstring(string s1, string s2) {
    int m = s1.length(), n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    int maxLen = 0, endIdx = 0;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endIdx = i;
                }
            }
        }
    }
    return s1.substr(endIdx - maxLen, maxLen);
}`,
      checkAnagram: `bool isAnagram(string s1, string s2) {
    if (s1.length() != s2.length()) return false;
    unordered_map<char, int> count;
    for (char c : s1) count[c]++;
    for (char c : s2) {
        if (count[c] == 0) return false;
        count[c]--;
    }
    return true;
}`
    };
    return codes[operation];
  }
}

const stringOperations = (operation, ...args) => {
  const stringOp = new StringOperations();
  
  stringOp.string = args.find(arg => typeof arg === 'string' && !arg.includes && arg !== args.find(a => a && a.pattern)) || '';
  
  const pseudocodeMap = stringOp.pseudocodeMap;
  
  let steps;
  let finalResult = {};
  
  switch (operation) {
    case 'reverse':
      steps = stringOp.reverse();
      finalResult = {
        original: args[0] || stringOp.string,
        reversed: stringOp.string,
        length: stringOp.string.length
      };
      break;
    case 'checkPalindrome':
      steps = stringOp.checkPalindrome();
      const isPal = steps.some(s => s.action === 'palindrome');
      finalResult = {
        string: args[0] || stringOp.string,
        isPalindrome: isPal,
        length: stringOp.string.length,
        comparisons: Math.floor(stringOp.string.length / 2)
      };
      break;
    case 'kmpSearch':
      steps = stringOp.kmpSearch(args[0]);
      const matches = steps.find(s => s.matches)?.matches || [];
      finalResult = {
        text: stringOp.string,
        pattern: args[0],
        matchCount: matches.length,
        matches: matches,
        algorithm: "Knuth-Morris-Pratt"
      };
      break;
    case 'rabinKarpSearch':
      steps = stringOp.rabinKarpSearch(args[0]);
      const rkMatches = steps.find(s => s.matches)?.matches || [];
      finalResult = {
        text: stringOp.string,
        pattern: args[0],
        matchCount: rkMatches.length,
        matches: rkMatches,
        algorithm: "Rabin-Karp"
      };
      break;
    case 'longestCommonSubstring':
      steps = stringOp.longestCommonSubstring(args[0]);
      const lcsResult = steps.find(s => s.result)?.result || "";
      const lcsLength = steps.find(s => s.maxLength)?.maxLength || 0;
      finalResult = {
        string1: stringOp.string,
        string2: args[0],
        longestCommonSubstring: lcsResult,
        length: lcsLength,
        algorithm: "Dynamic Programming"
      };
      break;
    case 'checkAnagram':
      steps = stringOp.checkAnagram(args[0]);
      const isAnagram = steps.some(s => s.action === 'anagram');
      finalResult = {
        string1: stringOp.string,
        string2: args[0],
        isAnagram: isAnagram,
        length: stringOp.string.length
      };
      break;
    default:
      return { steps: [], pseudocode: [], error: 'Invalid operation' };
  }
  
  const complexity = stringOp.getComplexity(operation, stringOp.string.length, args[0]?.length || 0);
  const optimizationTips = stringOp.getOptimizationTips(operation);
  const realWorldUseCases = stringOp.getRealWorldUseCases(operation);
  const codeSnippets = stringOp.getCodeSnippets(operation);
  
  const explanations = steps.map(step => step.explanation || step.message);
  
  return { 
    steps, 
    pseudocode: pseudocodeMap[operation] || [],
    explanations,
    result: finalResult,
    complexity,
    optimizationTips,
    realWorldUseCases,
    codeSnippets,
    string: stringOp.string
  };
};

module.exports = stringOperations;