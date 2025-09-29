import { Download, BarChart } from 'lucide-react';
import Button from '../Button';
import Card from '../Card';

const ExportAnalysis = ({ handleExportSummary, handleExportChart, simulation }) => (
  <Card title="Export & Analysis" className="lg:order-last">
    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
      <Button icon={Download} variant="outline" onClick={handleExportSummary} disabled={!simulation}>
        Export Summary
      </Button>
      <Button icon={BarChart} variant="outline" onClick={handleExportChart} disabled={!simulation}>
        Export Chart
      </Button>
    </div>
  </Card>
);

export default ExportAnalysis;
