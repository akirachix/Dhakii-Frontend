'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { usePpdPrevalence } from "@/app/hooks/getPpdPrevalence";
import { getMothersStatistics } from '@/app/utils/motherStatistics';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '@/app/components/Sidebar';  // Import Sidebar component
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const PrevalenceCharts: React.FC = () => {
  const { ppdMothers, data, loading, error } = usePpdPrevalence();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const withoutPpd = data.filter((mother) => mother.total_score <= 10).length;
  const withPpd = ppdMothers.length;
  const { villages, ageGroups } = getMothersStatistics(ppdMothers);
  if (villages.length === 0 || Object.keys(ageGroups).length === 0) {
    return <div>No data available for villages or age groups.</div>;
  }
  const regionData = villages.map((village) => {
    return ppdMothers.filter((mother) => mother.mother?.village === village).length;
  });
  const ageData = Object.values(ageGroups);
  const overallPPDData = {
    labels: ['Without PPD', 'With PPD'],
    datasets: [
      {
        label: 'Number of Mothers',
        data: [withoutPpd, withPpd],
        backgroundColor: ['#02A6A6', '#F18721'],
        text:'condition'
      },
    ],
  };
  const villagePPDData = {
    labels: villages,
    datasets: [
      {
        label: 'Number of Mothers with PPD by Village',
        data: regionData,
        backgroundColor: '#F18721',
      },
    ],
  };
  const agePPDData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Number of Mothers with PPD by Age Group',
        data: ageData,
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
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: {
          size: 14,
        },
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
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: {
          size: 14,
        },
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
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Mothers with PPD',
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
  const ageChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: {
          size: 14,
        },
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
          text: 'Number of Mothers with PPD',
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
    {/* <Sidebar />   */}

      <div className="flex-1 ml-72 p-4">
        <h2 className="text-2xl mt-2 font-semibold text-center">
          Prevalence of Postpartum Depression Among Mothers
        </h2>
        <div className="grid grid-cols-1 text-4xl lg:grid-cols-2 gap-32">
          <div className="bg-white p-2 rounded-lg shadow-md flex flex-col">
            <h3 className="text-lg font-medium">Overall Prevalence of PPD</h3>
            <div className="w-full text-4xl min-h-[330px] flex-1">
              <Bar data={overallPPDData} options={{ ...overallChartOptions, maintainAspectRatio: false }} />
            </div>
            <p className="text-[16px] text-gray-600 mt-2">
              This chart shows the overall percentage of mothers affected by Postpartum Depression (PPD).
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col">
            <h3 className="text-lg font-medium mb-2">Prevalence of PPD by Villages</h3>
            <div className="w-full min-h-[330px] flex-1">
              <Bar data={villagePPDData} options={{ ...villageChartOptions, maintainAspectRatio: false }} />
            </div>
            <p className="text-[16px] text-gray-600 mt-2">
              This chart depicts the number of mothers affected by PPD in various regions.
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mt-6 mx-auto w-full lg:w-1/2">
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
}