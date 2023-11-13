import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Transacoes() {
  const [coletas, setColetas] = useState([]);
  const [parceiro, setParceiro] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [ordenarPor, setOrdenarPor] = useState(null);
  const [ordem, setOrdem] = useState('asc');

  useEffect(() => {
    const email = localStorage.getItem('email');

    fetch(`http://localhost:3001/perfil/${email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados do perfil:', data);
        setParceiro(data);
      })
      .catch((error) => console.error('Erro ao obter dados do perfil:', error));
  }, []);

  useEffect(() => {
    if (parceiro && parceiro.id) {
      const parceiroId = parceiro.id;
      async function fetchData() {
        try {
          const response = await axios.get(`http://localhost:3001/historicoParceiro?parceiroId=${parceiroId}`);
          setColetas(response.data);
        } catch (error) {
          console.error('Erro ao buscar as transações:', error);
        }
      }

      fetchData();
    }
  }, [parceiro]);

  const formatarData = (dataOriginal) => {
    const data = new Date(dataOriginal);
    const ano = data.getFullYear();
    const mes = ('0' + (data.getMonth() + 1)).slice(-2);
    const dia = ('0' + data.getDate()).slice(-2);
    return `${dia}-${mes}-${ano}`;
  };

  const handleSort = () => {
    setOrdenarPor('Estabelecimento');
    setOrdem(ordem === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByOilQuantity = () => {
    setOrdenarPor('quantidade');
    setOrdem(ordem === 'asc' ? 'desc' : 'asc');
  };

  const currentItems = [...coletas].sort((a, b) => {
    if (ordenarPor === 'Estabelecimento') {
      if (ordem === 'asc') {
        return a.Estabelecimento.nomeOrganizacao.localeCompare(b.Estabelecimento.nomeOrganizacao);
      } else {
        return b.Estabelecimento.nomeOrganizacao.localeCompare(a.Estabelecimento.nomeOrganizacao);
      }
    } else if (ordenarPor === 'quantidade') {
      if (ordem === 'asc') {
        return a.quantidade - b.quantidade;
      } else {
        return b.quantidade - a.quantidade;
      }
    } else {
      return 0;
    }
  });

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItemsSliced = currentItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ marginTop: '20px', textAlign: 'center', }}>
      <div style={{ marginBottom: '20px',  }}>
        <button className='ordenacao' onClick={handleSort}>
          Ordenação alfabética 
        </button>
        <span style={{ margin: '0 10px' }}></span>
        <button className='ordenacao' onClick={handleSortByOilQuantity}>
          Ordenar por Quantidade de Óleo {ordenarPor === 'quantidade' ? (ordem === 'asc' ? ': CRESCENTE' : ': DECRESCENTE') : ''}
        </button>
      </div>

      <table style={{ margin: '0 auto' }}>
        <thead>
          <tr>
            <th>Óleo recebido (L)</th>
            <th>Créditos cedidos</th>
            <th>Estabelecimento</th>
            <th>Data da Transação</th>
            <th>Tipo de Óleo</th> 
          </tr>
        </thead>
        <tbody>
          {currentItemsSliced.map((coleta) => (
            <tr key={coleta.id}>
              <td>{coleta.quantidade}</td>
              <td>{coleta.quantidade * 10}</td>
              <td>{coleta.Estabelecimento ? coleta.Estabelecimento.nomeOrganizacao : 'N/A'}</td>
              <td>{formatarData(coleta.createdAt)}</td>
               <td>{coleta.tipo}</td>  
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 0}>
          Anterior
        </button>
        <span style={{ margin: '0 20px' }}>Página {currentPage + 1}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= coletas.length}>
          Próximo
        </button>
      </div>
    </div>
  );
}

export default Transacoes;

