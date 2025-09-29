import { useState } from 'react';
import { callGeminiApi } from '../utils/helpers';
import { ALGORITHM_CONFIG } from '../data/algorithmData.js';

const GEMINI_API_KEY = "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";

export const useGemini = () => {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalContent, setAiModalContent] = useState({ title: '', content: '' });
  const [isComparing, setIsComparing] = useState(false);
  const [isGeneratingExplanation, setIsGeneratingExplanation] = useState(false);

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

  const handleGenerateExplanation = async (currentStepData, algorithm, setGeneratedExplanation) => {
    if (!currentStepData || isGeneratingExplanation) return;

    setIsGeneratingExplanation(true);
    setGeneratedExplanation('Generating conceptual explanation...');

    try {
      const { explanation, decisionReason, framesBefore, page } = currentStepData;
      const algoName = ALGORITHM_CONFIG[algorithm].name;

      const systemInstruction = "You are an operating systems teaching assistant. Explain the core concept behind a page replacement decision. Keep the explanation to 3-4 sentences, use simple, non-technical language where possible, and focus on the 'why' based on the specific algorithm's rule.";

      const userQuery = `Current Step: Accessing Page ${page}.
      Algorithm: ${algoName}.
      Decision: ${explanation}.
      Mechanism: ${decisionReason}.
      Memory State: ${framesBefore.map((f, i) => `Frame ${i}: ${f || 'Empty'}`).join(', ')}.
      Explain the *concept* (not just the mechanics) of this step for a student new to OS concepts.`;

      const result = await callGeminiApi(systemInstruction, userQuery, GEMINI_API_URL, GEMINI_API_KEY);
      setGeneratedExplanation(result || 'The AI could not generate an explanation for this step.');

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
