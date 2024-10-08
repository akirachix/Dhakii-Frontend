import React from 'react';
import { Bar } from 'react-chartjs-2';
import getPpdPrevalence from "@/app/hooks/getPpdPrevalence";
import { getMothersStatistics } from '@/app/utils/motherStatistics';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PrevalenceCharts: React.FC = () => {
  const { ppdMothers, data, loading, error } = getPpdPrevalence();
  console.log("PPD Mothers:", ppdMothers);
  console.log("Data:", data);


  if (loading) return <div>Loading...</div>;  
  if (error) return <div>Error: {error}</div>;  

  
  const withoutPpd = data.filter((mother) => mother.total_score <= 10).length; 
  const withPpd = data.filter((mother) => mother.total_score > 10).length; 

  const screeningScores = ppdMothers.map(mother => mother.total_score);

  if (ppdMothers.length === 0 || screeningScores.length === 0) {
    return <div>No data available</div>;
  }

  const { villages, ageGroups } = getMothersStatistics(ppdMothers, screeningScores);
  
  console.log("Villages:", villages); 
  

  if (!Array.isArray(villages) || typeof ageGroups !== 'object') {
    console.error("Invalid statistics format:", { villages, ageGroups });
    return <div>Error: Invalid statistics data.</div>;
  }

  const regionData = villages.map((village) => {
    const count = ppdMothers.filter((mother) => mother.mother?.village === village).length;
    console.log(`Count for ${village}:`, count);
    return count;
 }).filter(count => count > 0); 

console.log("Region Data:", regionData);


  const ageData = Object.values(ageGroups); 
  console.log("Age Data:", ageData); 

  const overallPPDData = {
    labels: ['Without PPD', 'With PPD'], 
    datasets: [
      {
        label: 'Number of Mothers',
        data: [withoutPpd, withPpd],  
        backgroundColor: ['#02A6A6', '#F18721'],  
      },
    ],
  };

  const regionPPDData = {
    labels: villages,
    datasets: [
      {
        label: 'Number of Mothers with PPD',
        data: regionData,
        backgroundColor: ['#F18721', '#02A6A6', '#F18721', '#02A6A6'], // Adjust colors as needed
      },
    ],
  };

  const agePPDData = {
    labels: Object.keys(ageGroups), 
    datasets: [
      {
        label: 'Number of Mothers',
        data: ageData,
        backgroundColor: '#02A6A6',
      },
    ],
  };

  return (
    <div className="flex flex-col h-screen p-6 max-w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Prevalence of Postpartum Depression Among Mothers
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full w-full">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h3 className="text-lg font-medium mb-2">Overall Prevalence of PPD</h3>
          <div className="w-full h-64">
            <Bar data={overallPPDData} options={{ maintainAspectRatio: false }} />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This chart shows the overall percentage of mothers affected by Postpartum Depression (PPD).
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h3 className="text-lg font-medium mb-2">Prevalence of PPD by Region</h3>
          <div className="w-full h-64">
            {regionData.length > 0 ? (
              <Bar data={regionPPDData} options={{ maintainAspectRatio: false }} />
            ) : (
              <div>No data available for the region chart</div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            This chart depicts the number of mothers affected by PPD in various regions.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mt-8 mx-auto w-full lg:w-1/2">
        <h3 className="text-lg font-medium mb-2">Prevalence of PPD by Age Group</h3>
        <div className="w-full h-64">
          <Bar data={agePPDData} options={{ maintainAspectRatio: false }} />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          This chart illustrates the prevalence of PPD among different age groups of mothers.
        </p>
      </div>
    </div>
  );
};

export default PrevalenceCharts;
