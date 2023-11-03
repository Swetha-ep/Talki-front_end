import React, { useEffect, useRef } from 'react';
import adminAxios from '../../../axios/adminAxios';
import Chart from 'chart.js/auto';

function Graph() {
  const chartRef = useRef(null);

  const fetchUserCounts = () => {
    adminAxios.get('user-status/')
      .then(response => {
        createChart(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching user counts", error);
      });
  };

  const createChart = (data) => {
    const ctx = document.getElementById('userChart');

    if (chartRef.current) {
      chartRef.current.destroy(); 
    }

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['VIP Users', 'Non-VIP Users'],
        datasets: [
          {
            label: 'User Count',
            data: [data.vip_count, data.non_vip_count], 
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)', 
              'rgba(255, 99, 132, 0.5)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    chartRef.current = newChart; 
  };

  useEffect(() => {
    fetchUserCounts();
  }, []);

  return (
    <div>

    <div className="App" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '600px', margin: '20px' }}>
        <canvas id="userChart" style={{ width: '100%', height: '400px' }}></canvas>
      </div>
    </div>
    <h1 className='text-2xl text-center'>User Statistics</h1>
    </div>
  );
}

export default Graph;
