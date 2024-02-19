import React from 'react';
import MainCard from 'components/MainCard';
import FooterTable from 'sections/tables/react-table/FooterTable';

const SamplePage = () => (
  <MainCard>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h4>Diretoria de Programação de Órteses e Próteses</h4>
      </div>
      <button
        style={{
          backgroundColor: 'yellow',
          color: 'black',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Editar Proposta
      </button>
    </div>

    <FooterTable />
  </MainCard>
);

export default SamplePage;
