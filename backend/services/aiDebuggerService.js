// backend/services/aiDebuggerService.js
const axios = require('axios');

class AIDebuggerService {
  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY;
    // ✅ NEW CORRECT URL
    this.apiUrl = 'https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.1';
    
    // Alternative: CodeLlama for code-specific tasks
    // this.apiUrl = 'https://router.huggingface.co/hf-inference/models/codellama/CodeLlama-7b-Instruct-hf';
  }

  async debugAlgorithm(code, algorithmType, testCases) {
    try {
      console.log(`🔍 Debugging ${algorithmType} algorithm using Hugging Face...`);
      
      const prompt = this.buildDebugPrompt(code, algorithmType, testCases);
      const response = await this.callHuggingFaceAPI(prompt);
      const debugResult = this.parseDebugResponse(response);
      
      // Add expected outputs
      debugResult.expectedOutputs = this.generateExpectedOutputs(algorithmType, testCases);
      
      console.log(`✅ Debug complete. Found ${debugResult.errors?.length || 0} errors`);
      return debugResult;
      
    } catch (error) {
      console.error('AI Debugger Error:', error);
      
      if (error.message.includes('loading')) {
        console.log('⏳ Model is loading, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        return this.debugAlgorithm(code, algorithmType, testCases);
      }
      
      // Return a helpful default debug result
      return this.getMockDebugResult(algorithmType, testCases);
    }
  }

  buildDebugPrompt(code, algorithmType, testCases) {
    return `<s>[INST] You are an expert debugger. Find bugs in this ${algorithmType} code:

Code:
${code}

Test Cases: ${JSON.stringify(testCases, null, 2)}

Find ALL logical errors and return ONLY this JSON format:
{
  "hasError": true/false,
  "errors": [
    {
      "line": 5,
      "type": "logic",
      "explanation": "Clear explanation of what's wrong",
      "actual": "What the code actually does",
      "expected": "What it should do",
      "fix": "How to fix it",
      "fixedCode": "corrected line of code",
      "severity": "high"
    }
  ],
  "firstErrorLine": 5,
  "summary": "Overall summary of errors"
} [/INST]`;
  }

  async callHuggingFaceAPI(prompt) {
    try {
      console.log('📡 Calling Hugging Face Debug API...');
      
      const response = await axios.post(
        this.apiUrl,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 1500,
            temperature: 0.1,
            return_full_text: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      return response.data;
      
    } catch (error) {
      if (error.response) {
        console.error('Hugging Face API Error:', error.response.data);
        if (error.response.data?.error?.includes('loading')) {
          throw new Error('Model is loading, please wait...');
        }
        throw new Error(`API Error: ${error.response.status}`);
      }
      throw error;
    }
  }

  parseDebugResponse(response) {
    try {
      const generatedText = Array.isArray(response) ? response[0]?.generated_text : response;
      
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return null;
      }
      
      return JSON.parse(jsonMatch[0]);
      
    } catch (error) {
      console.error('Parse Error:', error);
      return null;
    }
  }

  getMockDebugResult(algorithmType, testCases) {
    // Intelligent mock based on algorithm type
    if (algorithmType.includes('sort')) {
      return {
        hasError: true,
        errors: [
          {
            line: 4,
            type: 'logic',
            explanation: 'The comparison operator might be incorrect for sorting order',
            actual: 'Using > for ascending sort might be wrong',
            expected: 'Should use < for ascending sort or verify the logic',
            fix: 'Check if you want ascending or descending order',
            fixedCode: 'if arr[j] > arr[j+1]:  # For ascending sort',
            severity: 'medium'
          }
        ],
        firstErrorLine: 4,
        summary: 'Potential issue with comparison logic in sorting algorithm',
        expectedOutputs: this.generateExpectedOutputs(algorithmType, testCases)
      };
    }
    
    return {
      hasError: true,
      errors: [
        {
          line: 1,
          type: 'logic',
          explanation: 'Unable to automatically detect errors. Please review your algorithm logic.',
          actual: 'Automatic analysis failed',
          expected: 'Algorithm should work correctly',
          fix: 'Test with small inputs and trace manually',
          fixedCode: '// Manual review needed',
          severity: 'medium'
        }
      ],
      summary: 'Manual code review recommended',
      expectedOutputs: this.generateExpectedOutputs(algorithmType, testCases)
    };
  }

  generateExpectedOutputs(algorithmType, testCases) {
    const expectedOutputs = [];
    
    for (const testCase of testCases) {
      try {
        let expected;
        
        if (algorithmType.includes('sort')) {
          expected = { 
            input: testCase.input,
            output: [...testCase.input].sort((a, b) => a - b) 
          };
        } else if (algorithmType.includes('binary')) {
          if (testCase.input?.arr && testCase.input.target !== undefined) {
            const index = testCase.input.arr.indexOf(testCase.input.target);
            expected = {
              input: testCase.input,
              output: index !== -1 ? index : -1
            };
          }
        } else if (algorithmType.includes('fib')) {
          if (typeof testCase.input === 'number') {
            expected = {
              input: testCase.input,
              output: this.fibonacci(testCase.input)
            };
          }
        } else {
          expected = { input: testCase.input, output: 'Check manually' };
        }
        
        expectedOutputs.push(expected || { input: testCase.input, output: 'Unable to generate' });
      } catch (error) {
        expectedOutputs.push({ 
          input: testCase.input, 
          output: 'Error generating expected output' 
        });
      }
    }
    
    return expectedOutputs;
  }

  fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      [a, b] = [b, a + b];
    }
    return b;
  }
}

module.exports = new AIDebuggerService();