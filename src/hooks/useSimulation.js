import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { simulateAlgorithm } from '../utils/helpers';

export const useSimulation = (settings) => {
  const [simulation, setSimulation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedExplanation, setGeneratedExplanation] = useState('');

  const playIntervalRef = useRef(null);

  const totalSteps = simulation?.steps?.length || 0;
  const currentStepData = simulation?.steps[currentStep];
  const animationDelay = useMemo(() => 4000 - parseInt(settings.speed), [settings.speed]);

  const stopPlayback = useCallback(() => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current);
      playIntervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const stepForward = useCallback(() => {
    setGeneratedExplanation('');
    if (simulation && currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      return true;
    }
    stopPlayback();
    return false;
  }, [simulation, currentStep, totalSteps, stopPlayback]);

  const startPlayback = useCallback(() => {
    if (simulation && currentStep < totalSteps - 1) {
      setIsPlaying(true);
      playIntervalRef.current = setInterval(() => {
        stepForward();
      }, animationDelay);
    }
  }, [simulation, currentStep, totalSteps, animationDelay, stepForward]);

  useEffect(() => {
    if (isPlaying) {
      stopPlayback();
      startPlayback();
    }
    return () => stopPlayback();
  }, [animationDelay, isPlaying, stopPlayback, startPlayback]);

  const stepBack = useCallback(() => {
    setGeneratedExplanation('');
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const handleRunSimulation = useCallback((algorithm, referenceString, frameCount) => {
    stopPlayback();
    const result = simulateAlgorithm(algorithm, referenceString, frameCount);
    setSimulation(result);
    setCurrentStep(0);
    setGeneratedExplanation('');
  }, [stopPlayback]);

  const handleResetSimulation = useCallback(() => {
    stopPlayback();
    setSimulation(null);
    setCurrentStep(0);
    setGeneratedExplanation('');
  }, [stopPlayback]);

  const handleTogglePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const handleJump = (index) => {
    stopPlayback();
    setGeneratedExplanation('');
    setCurrentStep(index);
  };

  return {
    simulation,
    currentStep,
    totalSteps,
    currentStepData,
    isPlaying,
    generatedExplanation,
    setGeneratedExplanation,
    stepForward,
    stepBack,
    handleRunSimulation,
    handleResetSimulation,
    handleTogglePlayPause,
    handleJump,
  };
};
