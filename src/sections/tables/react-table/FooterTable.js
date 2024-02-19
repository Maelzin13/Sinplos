'use client';

import PropTypes from 'prop-types';
import React from 'react';
import { useMemo } from 'react';
import { Paper, Table, TableBody, TableContainer, TableCell, TableHead, TableRow } from '@mui/material';
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { Stack, Grid, Button, Box } from '@mui/material';
// import Formulario from './Formulario';
// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  // const handleAddItem = (newItem) => {
  //   // Adicione o novo item aos dados da tabela
  //   const updatedData = [...data, newItem];
  //   // Atualize os dados na tabela
  //   table.setAllData(updatedData);
  //   // Limpe o estado do formulário
  //   setMapName('');
  //   setStartYear('');
  //   setEndYear('');
  // };

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard content={false}>
      {/* <Grid>
        <Formulario onAddItem={handleAddItem} />
      </Grid> */}
      <Grid>
        <ScrollX>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} {...header.column.columnDef.meta}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                          {cell.column.columnDef.accessorKey !== 'columns'
                            ? flexRender(cell.column.columnDef.cell, cell.getContext())
                            : null}
                        </TableCell>
                      ))}
                    </TableRow>
                    {/* {row.original.columns.map((col, index) => (
                      <TableRow key={`${row.id}-${index}`}>
                        <TableCell colSpan={row.getVisibleCells().length}>
                          <> {col.NDD}</>
                          <> {col.Fonte}</>
                          <> {col.Total}</>
                        </TableCell>
                      </TableRow>
                    ))} */}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>
      </Grid>

      <Grid item xs={12} md={12}>
        <Stack spacing={1} justifyContent="space-between">
          <Box sx={{ pt: 2.5, pr: 2.5, pb: 2.5, pl: 2 }}>
            <Button color="primary" variant="dashed" sx={{ bgcolor: 'transparent !important' }}>
              Adicionar
            </Button>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2} sx={{ height: '100%', pb: 2, pr: 2 }}>
          <Button variant="outlined" color="secondary" sx={{ color: 'secondary.dark' }}>
            Cancelar
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Salvar
          </Button>
        </Stack>
      </Grid>
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| REACT TABLE - FOOTER ||============================== //

const FooterTable = () => {
  const data = [
    {
      'Programa de Trabalho': '10.122.8202.8517.0052',
      Descrição: 'Manutenção de Serviços Administrativos Gerais-SES-Distrito Federal',
      NDD: '3390337',
      Fonte: '138',
      Total: 'R$ 12.580,40'
    },
    {
      'Programa de Trabalho': '10.302.6202.6016.0001',
      Descrição: 'Imento de aparelhos de órteses e Próteses-Ambulatorios-SES-Distrito Federal',
      NDD: '0',
      Fonte: '0',
      Total: 'R$ -'
    },
    {
      'Programa de Trabalho': '10.302.6202.6016.4216',
      Descrição: 'Imento de aparelhos de órteses e Próteses-Ambulatorios-SES-Distrito Federal',
      NDD: '0',
      Fonte: '0',
      Total: 'R$ -'
    }
  ];
  // const data = [
  //   {
  //     'Programa de Trabalho': '10.122.8202.8517.0052',
  //     Descrição: 'Manutenção de Serviços Administrativos Gerais-SES-Distrito Federal',
  //     columns: [{ NDD: '3390337', Fonte: '138', Total: 'R$ 12.580,40' }]
  //   },
  //   {
  //     'Programa de Trabalho': '10.302.6202.6016.0001',
  //     Descrição: 'Imento de aparelhos de órteses e Próteses-Ambulatorios-SES-Distrito Federal',
  //     columns: [{ NDD: '0', Fonte: '0', Total: 'R$ -' }]
  //   },
  //   {
  //     'Programa de Trabalho': '10.302.6202.6016.4216',
  //     Descrição: 'Imento de aparelhos de órteses e Próteses-Ambulatorios-SES-Distrito Federal',
  //     columns: [{ NDD: '0', Fonte: '0', Total: 'R$ -' }]
  //   }
  // ];

  const columns = useMemo(
    () => [
      {
        header: 'Programa de Trabalho',
        footer: 'Perspectiva',
        accessorKey: 'Programa de Trabalho'
      },
      {
        header: 'Descrição',
        footer: 'Obj Mapa',
        accessorKey: 'Descrição'
      },
      {
        header: 'NDD',
        footer: 'Obj Mapa',
        accessorKey: 'NDD'
      },
      {
        header: 'Fonte',
        footer: 'Obj Mapa',
        accessorKey: 'Fonte'
      },
      {
        header: 'Total',
        footer: 'Obj Mapa',
        accessorKey: 'Total'
      }
    ],
    []
  );

  return <ReactTable {...{ data, columns }} />;
};

FooterTable.propTypes = {
  data: PropTypes.array,
  getValue: PropTypes.func
};

export default FooterTable;
