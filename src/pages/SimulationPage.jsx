import React, { useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import Header from '../components/layout/Header.jsx';
import InputPanel from '../components/InputPanel.jsx';
import AlgorithmSelector from '../components/AlgorithmDetails.jsx';
import PerformanceMetrics from '../components/PerformanceMetrics.jsx';
import JumpModal from '../components/JumpModal.jsx';
import AiResponseModal from '../components/AiResponseModal.jsx';
import SimulationWindow from '../components/simulation/SimulationWindow.jsx';
import ExportAnalysis from '../components/controls/ExportAnalysis.jsx';

import { useSimulation } from '../hooks/useSimulation.js';
import { useGemini } from '../hooks/useGemini.js';
import { ALGORITHM_CONFIG } from '../data/algorithmData.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SimulationPage = () => {
  const [settings, setSettings] = useState({
    algorithm: 'FIFO',
    referenceString: '7,0,1,2,0,3,0,4,2,3,0,3,2',
    frameCount: '3',
    speed: 1500,
  });
  const [isJumpModalOpen, setIsJumpModalOpen] = useState(false);
  const chartRef = useRef(null);

  const {
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
  } = useSimulation(settings);

  const {
    isAiModalOpen,
    aiModalContent,
    isComparing,
    isGeneratingExplanation,
    setIsAiModalOpen,
    handleCompareAlgorithms,
    handleGenerateExplanation,
  } = useGemini();

  const handleExportSummary = () => {
    if (!simulation) return;
    const info = ALGORITHM_CONFIG[simulation.algorithm];
    const hitRate = ((simulation.totalHits / (simulation.totalHits + simulation.totalFaults)) * 100).toFixed(2);

    let report = `Page Fault Simulation Summary\n`;
    report += `================================\n\n`;
    report += `Algorithm: ${info.name}\n`;
    report += `Reference String: [${simulation.referenceString.join(', ')}]\n`;
    report += `Number of Frames: ${simulation.frameCount}\n`;
    report += `Total Steps: ${simulation.steps.length}\n\n`;
    report += `Performance Metrics:\n`;
    report += `- Page Faults: ${simulation.totalFaults}\n`;
    report += `- Page Hits: ${simulation.totalHits}\n`;
    report += `- Hit Rate: ${hitRate}%\n\n`;
    report += `Step-by-Step Execution:\n`;
    report += `========================\n`;

    simulation.steps.forEach((step, i) => {
      report += `Step ${i + 1}: Access page ${step.page} - ${step.isHit ? 'HIT' : 'FAULT'}\n`;
      report += `  ${step.explanation}\n`;
      report += `  Frames after: [${step.framesAfter.map(f => f === null ? 'Empty' : f).join(', ')}]\n\n`;
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `page-fault-simulation-${simulation.algorithm}-${Date.now()}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportChart = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image('image/png');
      const link = document.createElement('a');
      link.download = `performance-chart-${simulation.algorithm}-${Date.now()}.png`;
      link.href = url;
      link.click();
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 pb-6">
          <div className="lg:col-span-1 md:col-span-1 space-y-6">
            <InputPanel
              settings={settings}
              setSettings={setSettings}
              onRun={() => handleRunSimulation(settings.algorithm, settings.referenceString, settings.frameCount)}
              onReset={handleResetSimulation}
            />
            <ExportAnalysis 
              handleExportSummary={handleExportSummary}
              handleExportChart={handleExportChart}
              simulation={simulation}
            />
            <AlgorithmSelector algorithm={settings.algorithm} />
          </div>

          <div className="lg:col-span-2 md:col-span-2">
            <SimulationWindow
              simulation={simulation}
              currentStep={currentStep}
              totalSteps={totalSteps}
              currentStepData={currentStepData}
              isPlaying={isPlaying}
              handleTogglePlayPause={handleTogglePlayPause}
              stepBack={stepBack}
              stepForward={stepForward}
              setIsJumpModalOpen={setIsJumpModalOpen}
              settings={settings}
              handleGenerateExplanation={handleGenerateExplanation}
              isGeneratingExplanation={isGeneratingExplanation}
              generatedExplanation={generatedExplanation}
              setGeneratedExplanation={setGeneratedExplanation}
            />
          </div>

          <div className="lg:col-span-3 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PerformanceMetrics
                simulation={simulation}
                currentStep={currentStep}
                chartRef={chartRef}
                className="md:col-span-1"
                onCompareAlgorithms={() => handleCompareAlgorithms(simulation)}
                isComparing={isComparing}
              />
            </div>
          </div>
        </div>
      </div>

      <JumpModal
        isOpen={isJumpModalOpen}
        onClose={() => setIsJumpModalOpen(false)}
        maxStep={totalSteps}
        onJump={handleJump}
      />
      
      <AiResponseModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title={aiModalContent.title}
        content={aiModalContent.content}
      />
    </>
  );
};

export default SimulationPage;