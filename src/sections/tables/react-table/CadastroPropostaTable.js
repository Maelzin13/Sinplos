'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { RowEditable } from 'components/third-party/react-table';
import { CloseOutlined, EditTwoTone, SendOutlined, DeleteOutlined } from '@ant-design/icons';

const EditAction = ({ row, table }) => {
  const meta = table?.options?.meta;
  const setSelectedRow = (e) => {
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id]
    }));

    // @ts-ignore
    meta?.revertData(row.index, e?.currentTarget.name === 'cancel');
  };

  const handleDeleteRow = () => {
    if (Array.isArray(meta.data)) {
      console.log(meta.data);
      const newData = meta.data.filter((rowData) => rowData.id !== row.id);
      meta.setData(newData);
    }
  };

  // const handleDeleteRow = () => {
  //   if (Array.isArray(meta.data)) {
  //     const updatedData = meta.data.map((rowData) => (rowData.id === row.id ? { ...rowData, excluido: true } : rowData));
  //     meta.setData(updatedData);
  //   }
  // };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {meta?.selectedRow[row.id] && (
        <Tooltip title="Cancel">
          <IconButton color="error" name="cancel" onClick={setSelectedRow}>
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={meta?.selectedRow[row.id] ? 'Save' : 'Edit'}>
        <IconButton color={meta?.selectedRow[row.id] ? 'success' : 'primary'} onClick={setSelectedRow}>
          {meta?.selectedRow[row.id] ? <SendOutlined /> : <EditTwoTone />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={handleDeleteRow}>
          <DeleteOutlined />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

EditAction.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
  options: PropTypes.array,
  id: PropTypes.number,
  index: PropTypes.number
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, setData }) {
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [selectedRow, setSelectedRow] = useState({});
  useEffect(() => {
    table.setOptions({
      ...table.options,
      debugTable: true
    });
  }, []);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      cell: RowEditable
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      selectedRow,
      setSelectedRow,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData(originalData); // Reverte para os dados originais
        } else {
          setOriginalData(data); // Atualiza os dados originais com os dados atuais
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    },
    debugTable: true
  });

  let headers = [];
  table.getAllColumns().map(
    (columns) =>
      // @ts-ignore
      columns.columnDef.accessorKey &&
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        // @ts-ignore
        key: columns.columnDef.accessorKey
      })
  );

  return (
    <MainCard content={false}>
      <TableContainer size="small">
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  setData: PropTypes.func
};

// ==============================|| REACT TABLE - EDITABLE ROW ||============================== //

const CadastroPropostaTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      tipoDespesa: 'Reforma',
      gnd: '339039',
      fonte: '101',
      visits: 'REFORMA DE UNIDADES BÁSICAS DE SAÚDE-SES-DISTRITO FEDERAL',
      apr: 'SINFRA',
      status: '101',
      age: 'Reforma da Unidade Básica de Saúde nº 07 - Gama.',
      previsaoReajuste: 'NA',
      memoriaCalculo: 'NA',
      vigenciaValorUnitario: 'NA',
      propostaPLOA: 'NA',
      justificativa: 'Não informada',
      valor: '5.694.451,06',
      observacao: 'Valor atualizado de acordo com orçamento da reforma.'
    }
  ]);
  // const [originalData, setOriginalData] = useState(() => [...data]);

  const columns = [
    {
      id: 'id',
      title: 'Id',
      header: '#',
      accessorKey: 'id',
      dataType: 'text',
      enableColumnFilter: false,
      enableGrouping: false
    },
    {
      header: 'Tipo de Despesa',
      accessorKey: 'tipoDespesa',
      dataType: 'text'
    },
    {
      header: 'GND',
      accessorKey: 'gnd',
      dataType: 'text'
    },
    {
      header: 'Fonte',
      accessorKey: 'fonte',
      dataType: 'text',
      meta: {
        className: 'cell-right'
      }
    },
    {
      header: 'Descritivo Completo do Item /  Despesa',
      accessorKey: 'visits',
      dataType: 'text',
      meta: {
        className: 'cell-right',
        width: 300
      }
    },
    {
      header: 'APR',
      accessorKey: 'apr',
      dataType: 'text'
    },
    {
      header: 'status',
      accessorKey: 'status',
      dataType: 'select'
    },
    {
      header: 'N° de  Contrato e Empresa / Código SES',
      accessorKey: 'age',
      dataType: 'text'
    },
    {
      header: 'Previsão de Reajuste',
      accessorKey: 'previsaoReajuste',
      dataType: 'text'
    },
    {
      header: 'Memória de Cálculo',
      accessorKey: 'memoriaCalculo',
      dataType: 'text'
    },
    {
      header: 'Vigência / Valor Unitário',
      accessorKey: 'vigenciaValorUnitario',
      dataType: 'text'
    },
    {
      header: 'Proposta PLOA (Despesa Estimada)',
      accessorKey: 'propostaPLOA',
      dataType: 'text'
    },
    {
      header: 'Justificativa',
      accessorKey: 'justificativa',
      dataType: 'text'
    },
    {
      header: 'Valor',
      accessorKey: 'valor',
      dataType: 'text'
    },
    {
      header: 'Observação',
      accessorKey: 'observacao',
      dataType: 'text'
    },
    {
      header: 'Actions',
      id: 'edit',
      cell: EditAction,
      meta: {
        className: 'cell-center'
      }
    }
  ];

  const addNewRow = () => {
    const newRow = {
      id: data.length + 1,
      tipoDespesa: '',
      gnd: '',
      fonte: '',
      visits: '',
      apr: '',
      status: '',
      age: '',
      previsaoReajuste: '',
      memoriaCalculo: '',
      vigenciaValorUnitario: '',
      propostaPLOA: '',
      justificativa: '',
      valor: '',
      observacao: ''
    };
    setData((prevData) => [...prevData, newRow]);
  };

  return (
    <div>
      <ReactTable {...{ data, columns, setData }} />
      <br />
      <Button onClick={addNewRow} color="primary" variant="dashed" sx={{ bgcolor: 'transparent !important' }}>
        Incluir Nova
      </Button>
    </div>
  );
};

export default CadastroPropostaTable;
