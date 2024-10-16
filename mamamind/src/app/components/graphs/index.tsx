


"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { usePpdPrevalence } from "@/app/hooks/getPpdPrevalence";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PrevalenceCharts: React.FC = () => {
  const { ppdMothers, villageCounts, ageGroups, data, loading, error } = usePpdPrevalence();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Village data for the chart
  const villageLabels = Object.keys(villageCounts).slice(0, 8);
  const villageData = Object.values(villageCounts).slice(0, 8);

  // Convert ageGroups object to labels and data arrays for the chart
  const ageGroupLabels = Object.keys(ageGroups); // e.g., ['10-19', '20-29', '30-39']
  const ageGroupData = Object.values(ageGroups); // e.g., [4, 7, 3]

  // Overall data (With PPD and Without PPD)
  const withoutPpd = data.filter((mother) => mother.total_score <= 10).length;
  const withPpd = ppdMothers.length;

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

  const villagePPDData = {
    labels: villageLabels,
    datasets: [
      {
        label: 'Number of Mothers by Village',
        data: villageData,
        backgroundColor: '#F18721',
      },
    ],
  };

  const agePPDData = {
    labels: ageGroupLabels, // Age group labels (e.g., ['10-19', '20-29'])
    datasets: [
      {
        label: 'Number of Mothers by Age Group',
        data: ageGroupData, // Age group data (e.g., [4, 7, 3])
        backgroundColor: '#02A6A6',
      },
    ],
  };

  const overallChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Overall Condition',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Mothers',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  const villageChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Village',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          // Limit label rotation
          maxRotation: 45, // Adjust this as needed to control the rotation of labels
          minRotation: 0,
          autoSkip: false, // Ensure all labels are shown, even if there are many
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Mothers With PPD',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
          beginAtZero: true,
        },
      },
    },
  };

  const ageChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age Group',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Mothers With PPD',
          font: {
            size: 18,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex">
      <div className="flex-1 p-4 ml-72 nest-hub:ml-48 nest-hub-max:ml-48 nest-hub:static">
        <h2 className="text-2xl mt-2 font-semibold text-center">
          Prevalence of Postpartum Depression Among Mothers
        </h2>
  
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-2 nest-hub:flex nest-hub:flex-col nest-hub:gap-8 nest-hub-max:flex nest-hub-max:flex-col nest-hub-max:gap-8">
          
          {/* Overall Prevalence of PPD */}
          <div className="bg-white p-2 rounded-lg shadow-md flex flex-col lg:w-auto lg:h-[400px] nest-hub:w-full nest-hub:h-[400px] nest-hub-max:w-full nest-hub-max:h-[400px]">
            <h3 className="text-lg font-medium">Overall Prevalence of PPD</h3>
            <div className="w-full min-h-[330px] flex-1">
              <Bar data={overallPPDData} options={{ ...overallChartOptions, maintainAspectRatio: false }} />
            </div>
            <p className="text-[16px] text-gray-600 mt-2">
              This chart shows the overall number of mothers affected by Postpartum Depression (PPD).
            </p>
          </div>
  
          {/* Prevalence of PPD by Villages */}
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col lg:w-auto lg:h-[400px] nest-hub:w-full nest-hub:h-[400px] nest-hub-max:w-full nest-hub-max:h-[400px]">
            <h3 className="text-lg font-medium mb-2">Prevalence of PPD by Villages</h3>
            <div className="w-full min-h-[330px] flex-1">
              <Bar data={villagePPDData} options={{ ...villageChartOptions, maintainAspectRatio: false }} />
            </div>
            <p className="text-[16px] text-gray-600 mt-2">
              This chart depicts the number of mothers affected by PPD in various villages.
            </p>
          </div>
        </div>
  
        {/* Prevalence of PPD by Age Group */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6 mx-auto w-full lg:w-1/2 lg:h-[400px] nest-hub:w-full nest-hub:h-[400px] nest-hub-max:w-full nest-hub-max:h-[400px]">
          <h3 className="text-lg font-medium mb-2">Prevalence of PPD by Age Group</h3>
          <div className="w-full min-h-[330px]">
            <Bar data={agePPDData} options={{ ...ageChartOptions, maintainAspectRatio: false }} />
          </div>
          <p className="text-[16px] text-gray-600 mt-2">
            This chart illustrates the prevalence of PPD among different age groups of mothers.
          </p>
        </div>
      </div>
    </div>
  );
};
