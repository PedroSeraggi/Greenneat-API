import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const OleoColetado = () => {
  const [parceirosData, setParceirosData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/parceirosGrafico')
      .then(response => {
        const parceirosComLitrosColetados = response.data.filter(parceiro => parceiro.litrosColetados !== undefined && parceiro.litrosColetados > 0);
        setParceirosData(parceirosComLitrosColetados);
      })
      .catch(error => {
        console.error('Erro ao obter dados dos parceiros:', error);
        setParceirosData([]); // Defina para um array vazio em caso de erro para evitar problemas de renderização
      });
  }, []);

  const chartData = {
    labels: parceirosData.map(parceiro => parceiro.nomeOrganizacao),
    datasets: [
      {
        data: parceirosData.map(parceiro => parceiro.litrosColetados),
        backgroundColor: [
          '#00BF63',  
          '#90EE90',  
          '#32CD32',  
          '#7ED957',  
          '#87BC87',  
          '#CIFF72', 
        ],
      },
    ],
  };

  return (
    <div>
      {parceirosData.length > 0 ? (
        <Pie data={chartData} />
      ) : (
        <p>Nenhum dado disponível para exibição</p>
      )}
    </div>
  );
};

export default OleoColetado;
