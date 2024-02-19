import React from 'react';
import MainCard from 'components/MainCard';
// import CadastroPropostaTable from 'sections/tables/react-table/CadastroPropostaTable';
import { Breadcrumbs, Typography } from '@mui/material';
import TabelaDIPOPCadastro from './tables/react-table/tabela-dipopCadastro';

const CadastroProposta = () => (
  <>
    <Breadcrumbs aria-label="breadcrumb">
      <Typography variant="h3">Cadastro de proposta</Typography>
    </Breadcrumbs>
    <MainCard>
      <TabelaDIPOPCadastro />
    </MainCard>
  </>
);

export default CadastroProposta;
