import React, { useEffect, useState } from 'react';
import adminAxios from '../../../axios/adminAxios';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

function PieGraph() {
  const [data, setData] = useState([]);

  const fetchUserCounts = () => {
    adminAxios.get('trainer-status/')
      .then(response => {
        setData([
          { name: 'VIP Trainers', value: response.data.vip_trainers },
          { name: 'Non-VIP Trainers', value: response.data.non_vip_trainers }
        ]);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching trainer counts", error);
      });
  };

  useEffect(() => {
    fetchUserCounts();
  }, []);

  const COLORS = ['#0088FE', '#00C49F']; // Colors for the pie chart

  return (
    <div>
      <div className="App" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '400px', margin: '20px' }}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <h1 className='text-2xl text-center'>Trainer Statistics</h1>
    </div>
  );
}

export default PieGraph;
