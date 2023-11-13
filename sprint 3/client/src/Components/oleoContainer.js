import React from 'react';

const OleoContainer = ({ oleos }) => {
  return (
    <div>
      
      {oleos.map((oleo) => (
        <div key={oleo.id}>
          <span>Valor do óleo {oleo.tipo}:</span>
          <span style={{ marginLeft: '10px' }}>{`R$ ${oleo.preco.toFixed(2)}`}</span>
        </div>
      ))}
    </div>
  );
};

export default OleoContainer;