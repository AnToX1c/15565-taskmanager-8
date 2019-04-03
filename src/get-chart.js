import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getChart = (destination, chartTitle, tasksData) => {
  const oneChart = new Chart(destination, {
    plugins: [ChartDataLabels],
    type: `pie`,
    data: {
      labels: Object.keys(tasksData[chartTitle]).map((it) => `#${it}`),
      datasets: [{
        data: Object.values(tasksData[chartTitle]),
        backgroundColor: Object.keys(tasksData.colors)
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} TASKS — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: ${chartTitle.toUpperCase()}`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
  return oneChart;
};

export default getChart;
