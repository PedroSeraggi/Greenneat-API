import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

const ParceirosDashboard = () => {
  const [parceirosData, setParceirosData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/parceirosGrafico')
      .then(response => {
        const parceirosComCompras = response.data.filter(parceiro => parceiro.compras !== undefined && parceiro.compras >= 0);
        setParceirosData(parceirosComCompras);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos parceiros:', error);
      });
  }, []);

  const chartData = {
    labels: parceirosData ? parceirosData.map(parceiro => parceiro.nomeOrganizacao) : [],
    datasets: [
      {
        data: parceirosData ? parceirosData.map(parceiro => parceiro.compras) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
    
        ],
      },
    ],
  };

  return (
    
      <Doughnut data={chartData} />
    
  );
};

export default ParceirosDashboard;
