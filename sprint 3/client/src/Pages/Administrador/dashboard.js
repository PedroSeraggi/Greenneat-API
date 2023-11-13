import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/navbar/navbarAdministrador';
import Grafico from '../../Components/dashboard/parceiroCompras';
import OleoContainer from '../../Components/oleoContainer';
import Pedidos from '../../Components/pedidoNotificação';
import axios from 'axios';

function Dashboard() {
  const [oleos, setOleos] = useState([]);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    const fetchOleos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/oleos`);
        setOleos(response.data); // Axios já faz o parse do JSON, então não é necessário chamar response.json()
      } catch (error) {
        console.error('Erro ao buscar dados dos óleos:', error);
      }
    };

    fetchOleos();
  }, []);

  return (
    <>
      <Navbar activeLink="/dashboard" />
      <body>
        <div className='containerDashboard'>
          <div className='sectionDashboard1'>
            <Grafico options={options} />
          </div>

          <div className='sectionDashboard2'>
            <div className="OleosContainer">
              <h2>Informações sobre Óleos</h2>
              <OleoContainer oleos={oleos} />
              <button  id="OleoButton" >Mudar Valor</button>
            </div>
            <div className="OleosContainer">
              <Pedidos />
              <button  id="OleoButton" >Mudar Valor</button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;
