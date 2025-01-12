import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/estabelecimentosParceirosGrafico');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      {data.parceiros && data.estabelecimentos ? (
        <Pie
          data={{
            labels: ['Parceiros', 'Estabelecimentos'],
            datasets: [
              {
                data: [data.parceiros, data.estabelecimentos],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
              },
            ],
          }}
        />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default App;
