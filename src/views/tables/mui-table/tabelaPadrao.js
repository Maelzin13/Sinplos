'use client';
import PropTypes from 'prop-types';
import React from 'react';
import { Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '3390337',
        customerId: '138',
        amount: 'R$ 10.000,00'
      },
      {
        date: '0',
        customerId: '0',
        amount: 'R$ --'
      },
      {
        date: '0',
        customerId: '0',
        amount: 'R$ --'
      }
    ]
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
        <TableCell colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && (
              <Box sx={{ py: 1, pl: { xs: 3, sm: 30, md: 30 } }}>
                <TableContainer>
                  <MainCard content={false}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>NDD</TableCell>
                          <TableCell>Fonte</TableCell>
                          <TableCell>Total Estimado</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.history?.map((historyRow) => (
                          <TableRow hover key={historyRow.date}>
                            <TableCell>{historyRow.date}</TableCell>
                            <TableCell>{historyRow.customerId}</TableCell>
                            <TableCell>{historyRow.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
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

const rows = [createData('10.122.8202.8517.0052', 'MANUTENÇÃO DE SERVIÇOS ADMINISTRATIVOS GERAIS-SES-DF', 'R$ 13.000,00', 'R$ 10.000,00')];

// ==============================|| MUI TABLE - COLLAPSIBLE ||============================== //

export default function TablePadrao() {
  return (
    <MainCard content={false}>
      <Box sx={{ py: 2, pl: { xs: 4, sm: 20, md: 20 } }}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: 9 }} />
                <TableCell>PT</TableCell>
                <TableCell>Descrição PT</TableCell>
                <TableCell>Media de Execução</TableCell>
                <TableCell>Despesa Estimado</TableCell>
              </TableRow>
            </TableHead>
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
