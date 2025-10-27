import { useState } from 'react';
import { callGeminiApi } from '../utils/helpers';
import { ALGORITHM_CONFIG } from '../data/algorithmData.js';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;


const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Error loading from localStorage: ${error}`);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

export const useGemini = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalContent, setAiModalContent] = useState(() => 
    loadFromLocalStorage('aiModalContent', { title: '', content: '' })
  );
  const [isComparing, setIsComparing] = useState(false);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);
  const [explanationCache, setExplanationCache] = useState(() =>
    loadFromLocalStorage('explanationCache', {})
  );

  const handleCompareAlgorithms = async (simulation) => {
    if (!simulation) return;

    setIsComparing(true);
    try {
      const { algorithm, referenceString, frameCount, totalFaults } = simulation;
      const algoName = ALGORITHM_CONFIG[algorithm].name;
      const systemInstruction = "You are an expert Operating Systems professor. Your task is to analyze the performance of a page replacement algorithm simulation and provide a conceptual comparison against the theoretically best algorithm (Optimal). Use markdown formatting for clarity and keep the explanation concise and highly informative.";
      const userQuery = `Analyze the following page fault simulation:
      Algorithm Used: ${algoName} (${algorithm})
      Reference String: ${referenceString.join(',')}
      Number of Frames: ${frameCount}
      Actual Page Faults: ${totalFaults}
      Compare this result against the Optimal algorithm. Explain why the Optimal algorithm would perform differently (better) and discuss any specific concept (like Belady's Anomaly or locality of reference) relevant to this result.`;

      const result = await callGeminiApi(systemInstruction, userQuery, GEMINI_API_URL, GEMINI_API_KEY);

      setAiModalContent({
        title: 'Algorithm Comparison Analysis',
        content: result || 'The AI could not generate a comparison report.',
      });
      setIsAiModalOpen(true);

    } catch (error) {
      console.error("AI Comparison Error:", error);
      setAiModalContent({
        title: 'Comparison Failed',
        content: `Sorry, the AI service encountered an error. Please try again. (${error.message})`,
      });
      setIsAiModalOpen(true);
    } finally {
      setIsComparing(false);
    }
  };

  const handleGenerateExplanation = async (currentStepData, algorithm, setGeneratedExplanation, forceRefresh = false) => {
    if (!currentStepData || isGeneratingExplanation) return;

    // Create a cache key based on the current state
    const cacheKey = `${algorithm}-${currentStepData.page}-${JSON.stringify(currentStepData.framesBefore)}`;

    // Check cache if not forcing refresh
    if (!forceRefresh && explanationCache[cacheKey]) {
      setGeneratedExplanation(explanationCache[cacheKey]);
      return;
    }

    setIsGeneratingExplanation(true);
    setGeneratedExplanation('Generating conceptual explanation...');

    try {
      const { explanation: stepExplanation, decisionReason, framesBefore, framesAfter, page, isHit } = currentStepData;
      const algoName = ALGORITHM_CONFIG[algorithm].name;
      const algoDescription = ALGORITHM_CONFIG[algorithm].description;

      const systemInstruction = `You are an operating systems teaching assistant. Your task is to explain the current state of page replacement simulation in a clear, conceptual way. 
      Format your response using markdown, including:
      1. A brief summary of what's happening
      2. Why the decision was made (based on the algorithm's rules)
      3. The impact of this decision on system performance`;

      const userQuery = `Algorithm: ${algoName}
      Algorithm Description: ${algoDescription}
      Current Step: Accessing Page ${page}
      Result: ${isHit ? 'Page Hit' : 'Page Fault'}
      Decision Made: ${stepExplanation}
      Reason: ${decisionReason}
      Memory State Before: ${framesBefore.map((f, i) => `Frame ${i}: ${f || 'Empty'}`).join(', ')}
      Memory State After: ${framesAfter.map((f, i) => `Frame ${i}: ${f || 'Empty'}`).join(', ')}

      Please explain:
      1. What happened in this step?
      2. Why did the ${algoName} algorithm make this decision?
      3. Was this efficient? Why or why not?`;

      const result = await callGeminiApi(systemInstruction, userQuery, GEMINI_API_URL, GEMINI_API_KEY);
      const aiExplanation = result || 'The AI could not generate an explanation for this step.';
      
      // Update cache
      setExplanationCache(prev => {
        const updated = { ...prev, [cacheKey]: aiExplanation };
        saveToLocalStorage('explanationCache', updated);
        return updated;
      });

      setGeneratedExplanation(aiExplanation);

    } catch (error) {
      console.error("AI Explanation Error:", error);
      setGeneratedExplanation('Error generating explanation. Please check the console.');
    } finally {
      setIsGeneratingExplanation(false);
    }
  };

  return {
    isAiModalOpen,
    aiModalContent,
    isComparing,
    isGeneratingExplanation,
    setIsAiModalOpen,
    handleCompareAlgorithms,
    handleGenerateExplanation,
  };
};
