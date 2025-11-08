import { AlgorithmLogic } from "../data/algorithmData.js"

export const simulateAlgorithm = (algorithm, referenceString, frameCount) => {
  const refArray = referenceString.split(',').map(n => parseInt(n.trim()));
  const algo = AlgorithmLogic[algorithm];
  if (!algo) {
    throw new Error(`Algorithm ${algorithm} not found.`);
  }
  const { pageFaults, sequence } = algo(refArray, parseInt(frameCount));

  const steps = sequence.map((step, index) => {
    const { page, frames, isHit, isFault, replacedPage } = step;
    const pageHits = sequence.slice(0, index + 1).filter(s => s.isHit).length;
    return {
      stepNumber: index + 1,
      page: page,
      framesBefore: index > 0 ? sequence[index - 1].frames : [],
      framesAfter: frames,
      isHit: isHit,
      isFault: isFault,
      replacedPage: replacedPage,
      explanation: isHit ? `Page Hit! Page ${page} is already in memory.` : `Page Fault! Loaded page ${page}.`,
      decisionReason: isFault ? (replacedPage ? `Replaced page ${replacedPage}.` : `Placed in an empty frame.`) : 'No replacement needed.',
      pageFaults: pageFaults,
      pageHits: pageHits,
    };
  });

  return {
    steps: steps,
    totalFaults: pageFaults,
    totalHits: refArray.length - pageFaults,
    algorithm: algorithm,
    frameCount: frameCount,
    referenceString: refArray,
  };
};

export const callGeminiApi = async (systemInstruction, userQuery, apiUrl, apiKey) => {
  let result = null;
  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
      };

      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        result = text;
        break; // Success
      } else {
        throw new Error("API response structure unexpected or text missing.");
      }
    } catch (error) {
      console.error(`Attempt ${retries + 1} failed:`, error.message);
      retries++;
      if (retries < maxRetries) {
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error("Failed to call Gemini API after multiple retries.");
      }
    }
  }
  return result;
};