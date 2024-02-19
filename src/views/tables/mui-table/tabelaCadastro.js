'use client';
import PropTypes from 'prop-types';
import React from 'react';
import { Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import CadastroPropostaTable from 'sections/tables/react-table/CadastroPropostaTable';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price
  };
}

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ pl: 3 }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <UpOutlined /> : <DownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.calories}</TableCell>
        <TableCell>{row.fat}</TableCell>
        <TableCell>{row.carbs}</TableCell>
        <TableCell sx={{ pr: 10 }}>{row.protein}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && (
              <Box sx={{ pl: { xs: 20, sm: 20, md: 20 } }}>
                <TableContainer>
                  <MainCard content={false}>
                    <Table>
                      <CadastroPropostaTable />
                    </Table>
                  </MainCard>
                </TableContainer>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.object
};

const rows = [createData('')];

// ==============================|| MUI TABLE - COLLAPSIBLE ||============================== //

export default function TableCadastro() {
  return (
    <MainCard content={false}>
      <Box sx={{ py: 2, pl: { xs: 4, sm: 4, md: 4 } }}>
        <TableContainer>
          <Table aria-label="collapsible table">
            {/* <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 9 }} />
                <TableCell>PT</TableCell>
                <TableCell>Descrição PT</TableCell>
                <TableCell>Media de Execução</TableCell>
                <TableCell>Despesa Estimado</TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainCard>
  );
}
