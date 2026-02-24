// backend/services/aiVisualizationService.js
const axios = require('axios');

class AIVisualizationService {
  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY;
    // ✅ NEW CORRECT URL - using router.huggingface.co
    this.apiUrl = 'https://router.huggingface.co/hf-inference/models/codellama/CodeLlama-7b-Instruct-hf';
    
    // Alternative URLs if the above doesn't work:
    // this.apiUrl = 'https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.1';
    // this.apiUrl = 'https://router.huggingface.co/hf-inference/models/bigcode/starcoder';
  }

  async generateStepsFromCode(code, language) {
    try {
      console.log(`🎨 Generating visualization for ${language} code using Hugging Face...`);
      
      const prompt = this.buildPrompt(code, language);
      const response = await this.callHuggingFaceAPI(prompt);
      const parsedResponse = this.parseResponse(response);
      
      const validatedResponse = this.validateAndEnhanceResponse(parsedResponse);
      
      console.log(`✅ Generated ${validatedResponse.steps.length} visualization steps`);
      return validatedResponse;
      
    } catch (error) {
      console.error('AI Service Error:', error);
      
      // If model is loading, wait and retry
      if (error.message.includes('loading')) {
        console.log('⏳ Model is loading, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        return this.generateStepsFromCode(code, language); // Retry
      }
      
      // If all else fails, return a mock visualization so the UI still works
      console.log('⚠️ Using fallback mock visualization');
      return this.getMockVisualization(code, language);
    }
  }

  buildPrompt(code, language) {
    return `<s>[INST] You are an AI that converts code into JSON visualization data. 
    
    Convert this ${language} code into step-by-step visualization:
    
    \`\`\`${language}
    ${code}
    \`\`\`
    
    Return ONLY this JSON format (no other text, no explanations, just the JSON):
    {
      "steps": [
        {
          "array": [5, 2, 8, 1, 4],
          "currentIndex": 0,
          "minIndex": -1,
          "comparingIndices": [0, 1],
          "swappingIndices": null,
          "currentLine": 1,
          "action": "compare",
          "variables": {"i": 0, "j": 1}
        }
      ],
      "pseudocode": [
        "for i in range(n):",
        "  for j in range(0, n-i-1):",
        "    if arr[j] > arr[j+1]:",
        "      swap arr[j] and arr[j+1]"
      ],
      "explanations": [
        "Starting the outer loop with i = 0",
        "Comparing elements at positions j and j+1"
      ]
    } [/INST]`;
  }

  async callHuggingFaceAPI(prompt) {
    try {
      console.log('📡 Calling Hugging Face API at router.huggingface.co...');
      
      const response = await axios.post(
        this.apiUrl,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 2000,
            temperature: 0.1,
            return_full_text: false,
            do_sample: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000 // 30 second timeout
        }
      );

      console.log('✅ Hugging Face API responded successfully');
      return response.data;
      
    } catch (error) {
      if (error.response) {
        console.error('Hugging Face API Error Status:', error.response.status);
        console.error('Hugging Face API Error Data:', error.response.data);
        
        // Check if model is loading
        if (error.response.data?.error?.includes('loading')) {
          throw new Error('Model is loading, please wait...');
        }
        
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.error || 'Unknown error'}`);
      }
      throw error;
    }
  }

  parseResponse(response) {
    try {
      // Hugging Face returns an array with the generated text
      const generatedText = Array.isArray(response) ? response[0]?.generated_text : response;
      
      console.log('Raw response:', generatedText.substring(0, 200) + '...'); // Log first 200 chars
      
      // Try to extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.log('No JSON found in response, using mock data');
        return this.getMockVisualizationData();
      }
      
      return JSON.parse(jsonMatch[0]);
      
    } catch (error) {
      console.error('Parse Error:', error);
      return this.getMockVisualizationData();
    }
  }

  // Mock data generator for when API fails
  getMockVisualizationData() {
    return {
      steps: [
        {
          array: [5, 2, 8, 1, 4],
          currentIndex: 0,
          minIndex: -1,
          comparingIndices: [0, 1],
          swappingIndices: null,
          currentLine: 1,
          action: 'compare',
          variables: { i: 0, j: 0 }
        },
        {
          array: [5, 2, 8, 1, 4],
          currentIndex: 1,
          minIndex: -1,
          comparingIndices: [1, 2],
          swappingIndices: null,
          currentLine: 2,
          action: 'compare',
          variables: { i: 0, j: 1 }
        },
        {
          array: [2, 5, 8, 1, 4],
          currentIndex: 0,
          minIndex: 1,
          comparingIndices: null,
          swappingIndices: [0, 1],
          currentLine: 3,
          action: 'swap',
          variables: { i: 0, j: 1 }
        },
        {
          array: [2, 5, 8, 1, 4],
          currentIndex: 2,
          minIndex: -1,
          comparingIndices: [2, 3],
          swappingIndices: null,
          currentLine: 2,
          action: 'compare',
          variables: { i: 0, j: 2 }
        }
      ],
      pseudocode: [
        'for i = 0 to n-1',
        '  for j = 0 to n-i-2',
        '    if arr[j] > arr[j+1]',
        '      swap arr[j] and arr[j+1]'
      ],
      explanations: [
        'Starting bubble sort algorithm',
        'Comparing adjacent elements',
        'Swapping because left > right',
        'Continuing to next comparison'
      ]
    };
  }

  getMockVisualization(code, language) {
    const mockData = this.getMockVisualizationData();
    return this.validateAndEnhanceResponse(mockData);
  }

  validateAndEnhanceResponse(data) {
    if (!data.steps || !Array.isArray(data.steps) || data.steps.length === 0) {
      return this.validateAndEnhanceResponse(this.getMockVisualizationData());
    }

    const enhancedSteps = data.steps.map((step, index) => {
      return {
        array: step.array || [5, 2, 8, 1, 4],
        currentIndex: step.currentIndex !== undefined ? step.currentIndex : -1,
        minIndex: step.minIndex !== undefined ? step.minIndex : -1,
        comparingIndices: step.comparingIndices || null,
        swappingIndices: step.swappingIndices || null,
        currentLine: step.currentLine || 1,
        action: step.action || 'process',
        variables: step.variables || {},
        stepNumber: index + 1
      };
    });

    return {
      steps: enhancedSteps,
      pseudocode: data.pseudocode || ['// Start algorithm', '// Process data', '// Complete'],
      explanations: data.explanations || enhancedSteps.map(s => `Step ${s.stepNumber}: Executing ${s.action}`),
      metadata: {
        totalSteps: enhancedSteps.length,
        generatedAt: new Date().toISOString(),
        source: enhancedSteps.length > 4 ? 'ai' : 'mock'
      }
    };
  }
}

module.exports = new AIVisualizationService();