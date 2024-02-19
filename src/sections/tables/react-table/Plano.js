import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SimpleTable = ({ columns, data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.accessorKey}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey}>
                  {column.accessorKey === 'indicesDesejados' ? (
                    <Autocomplete
                      options={[50, 55, 60, 65, 70, 75, 80]}
                      getOptionLabel={(option) => `${option}%`}
                      value={row[column.accessorKey]}
                      onChange={(event, newValue) => {
                        row[column.accessorKey] = newValue.map((val, index) => ({
                          year: 2024 + index,
                          value: val
                        }));
                      }}
                      renderInput={(params) => <TextField {...params} label="Selecione" />}
                      multiple
                    />
                  ) : (
                    row[column.accessorKey]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

SimpleTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessorKey: PropTypes.string.isRequired
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object)
};

const Plano = () => {
  const mockData = [
    {
      metas: 'Aumentar 30%',
      indicadores: 'Percentual',
      indice: 'Não se aplica',
      unidade: 'Percentual',
      polaridade: 'Maior-Melhor',
      indicesDesejados: [
        { year: 2024, value: null },
        { year: 2025, value: null },
        { year: 2026, value: null },
        { year: 2027, value: null }
      ],
      ppaPdsPedf: 'PPA( Ação não orçamentária) PDS',
      responsavel: 'SAIS/SAIS/COAPS/DEAP/GASPVP'
    }
  ];

  const columns = [
    { header: 'Metas', accessorKey: 'metas' },
    { header: 'Indicadores', accessorKey: 'indicadores' },
    { header: 'Índice', accessorKey: 'indice' },
    { header: 'Unidade', accessorKey: 'unidade' },
    { header: 'Polaridade', accessorKey: 'polaridade' },
    { header: 'Índices Desejados', accessorKey: 'indicesDesejados' },
    { header: '(PPA/PDS/PEDF)', accessorKey: 'ppaPdsPedf' },
    { header: 'Responsável', accessorKey: 'responsavel' }
    // Adicione mais colunas conforme necessário
  ];

  console.log('Dados Mocados:', mockData);

  if (!mockData || mockData.length === 0) {
    return <div>No mock data available.</div>;
  }

  return <SimpleTable data={mockData} columns={columns} />;
};

export default Plano;
