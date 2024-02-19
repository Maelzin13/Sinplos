// material-ui
// project imports
import MainCard from 'components/MainCard';
import TabelaDIPOP from './tables/react-table/tabela-dipop';
// import NextLink from 'next/link';
// ==============================|| SAMPLE PAGE ||============================== //

const MatrizDIPOP = () => (
  <MainCard>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        {/* <h4>Diretoria de Programação de Órteses e Próteses</h4> */}
        <h4>Visualizar Propostas Por Uniade Organizacional Programadora</h4>
      </div>
      {/* <NextLink href="/cadastro-proposta" passHref>
        <button
          style={{
            backgroundColor: '#ffd700',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Editar Proposta
        </button>
      </NextLink> */}
    </div>

    <TabelaDIPOP />
  </MainCard>
);

export default MatrizDIPOP;
