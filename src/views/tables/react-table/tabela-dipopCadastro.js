'use client';

import PropTypes from 'prop-types';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  // TableFooter,
  TableHead,
  TableRow,
  Stack,
  Divider,
  useMediaQuery
} from '@mui/material';
import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  flexRender,
  useReactTable,
  sortingFns
} from '@tanstack/react-table';
import { compareItems, rankItem } from '@tanstack/match-sorter-utils';
import ScrollX from 'components/ScrollX';
import {
  EmptyTable,
  HeaderSort,
  RowSelection,
  TablePagination,
  RowEditable,
  DraggableRow,
  DraggableColumnHeader,
  SelectColumnVisibility
} from 'components/third-party/react-table';
import IconButton from 'components/@extended/IconButton';
import { DownOutlined, GroupOutlined, RightOutlined, StopOutlined, UngroupOutlined } from '@ant-design/icons';
import CadastroPropostaTable from 'sections/tables/react-table/CadastroPropostaTable';
// import TableCadastro from '../mui-table/tabelaCadastro';

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta(itemRank);
  return itemRank.passed;
};

export const fuzzySort = (rowA, rowB, columnId) => {
  let dir = 0;

  // only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId], rowB.columnFiltersMeta[columnId]);
  }

  // provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

// ==============================|| REACT TABLE - EDIT ACTION ||============================== //

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, data, setData }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [selectedRow, setSelectedRow] = useState({});
  const [columns] = useState(() => [...defaultColumns]);
  const [columnOrder, setColumnOrder] = useState(columns.map((column) => column.id));
  const reorderRow = (draggedRowIndex, targetRowIndex) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
    setData([...data]);
  };
  const [columnVisibility, setColumnVisibility] = useState({});
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      cell: RowEditable
    },
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
      sorting,
      grouping,
      columnOrder,
      columnVisibility
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    getRowId: (row) => row.id.toString(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    meta: {
      selectedRow,
      setSelectedRow,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) => old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row)));
        } else {
          setOriginalData((old) => old.map((row, index) => (index === rowIndex ? data[rowIndex] : row)));
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
    }
  });

  useEffect(() => setColumnVisibility({ id: false, role: false, contact: false, country: false, progress: false }), []);

  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  let headers = [];
  table.getVisibleLeafColumns().map(
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
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="space-between"
        sx={{ padding: 2, ...(matchDownSM && { '& .MuiOutlinedInput-root, & .MuiFormControl-root': { width: '100%' } }) }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <SelectColumnVisibility
            {...{
              getVisibleLeafColumns: table.getVisibleLeafColumns,
              getIsAllColumnsVisible: table.getIsAllColumnsVisible,
              getToggleAllColumnsVisibilityHandler: table.getToggleAllColumnsVisibilityHandler,
              getAllColumns: table.getAllColumns
            }}
          />
        </Stack>
      </Stack>

      <ScrollX>
        <RowSelection selected={Object.keys(rowSelection).length} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableCell />
                  {headerGroup.headers.map((header) => {
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                      Object.assign(header.column.columnDef.meta, {
                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                      });
                    }

                    return (
                      <DraggableColumnHeader key={header.id} header={header} table={table}>
                        <>
                          {header.isPlaceholder ? null : (
                            <Stack direction="row" spacing={1} alignItems="center">
                              {header.column.getCanGroup() && (
                                <IconButton
                                  color={header.column.getIsGrouped() ? 'error' : 'primary'}
                                  onClick={header.column.getToggleGroupingHandler()}
                                  size="small"
                                  sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
                                >
                                  {header.column.getIsGrouped() ? <UngroupOutlined /> : <GroupOutlined />}
                                </IconButton>
                              )}
                              <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                              {header.column.getCanSort() && <HeaderSort column={header.column} sort />}
                            </Stack>
                          )}
                        </>
                      </DraggableColumnHeader>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <DraggableRow row={row} reorderRow={reorderRow}>
                      <>
                        {row.getVisibleCells().map((cell) => {
                          let bgcolor = 'background.paper';
                          if (cell.getIsGrouped()) bgcolor = 'primary.lighter';
                          if (cell.getIsAggregated()) bgcolor = 'warning.lighter';
                          if (cell.getIsPlaceholder()) bgcolor = 'error.lighter';

                          if (cell.column.columnDef.meta !== undefined && cell.column.getCanSort()) {
                            Object.assign(cell.column.columnDef.meta, {
                              style: { backgroundColor: bgcolor }
                            });
                          }

                          return (
                            <TableCell
                              key={cell.id}
                              {...cell.column.columnDef.meta}
                              sx={{ bgcolor }}
                              {...(cell.getIsGrouped() &&
                                cell.column.columnDef.meta === undefined && {
                                  style: { backgroundColor: bgcolor }
                                })}
                            >
                              {cell.getIsGrouped() ? (
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                  <IconButton
                                    color="secondary"
                                    onClick={row.getToggleExpandedHandler()}
                                    size="small"
                                    sx={{ p: 0, width: 24, height: 24 }}
                                  >
                                    {row.getIsExpanded() ? <DownOutlined /> : <RightOutlined />}
                                  </IconButton>
                                  <Box>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Box> <Box>({row.subRows.length})</Box>
                                </Stack>
                              ) : cell.getIsAggregated() ? (
                                flexRender(cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell, cell.getContext())
                              ) : cell.getIsPlaceholder() ? null : (
                                flexRender(cell.column.columnDef.cell, cell.getContext())
                              )}
                            </TableCell>
                          );
                        })}
                      </>
                    </DraggableRow>
                    {row.getIsExpanded() && !row.getIsGrouped() && (
                      <TableRow
                        sx={{
                          bgcolor: backColor,
                          '&:hover': { bgcolor: `${backColor} !important` }
                        }}
                      >
                        <TableCell colSpan={row.getVisibleCells().length + 2}>
                          <CadastroPropostaTable />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <EmptyTable msg="No Data" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Box sx={{ p: 2 }}>
          <TablePagination
            {...{
              setPageSize: table.setPageSize,
              setPageIndex: table.setPageIndex,
              getState: table.getState,
              getPageCount: table.getPageCount
            }}
          />
        </Box>
      </ScrollX>
    </>
  );
}

ReactTable.propTypes = {
  defaultColumns: PropTypes.array,
  data: PropTypes.array,
  setData: PropTypes.any
};

// ==============================|| REACT TABLE - UMBRELLA ||============================== //

const TabelaDIPOPCadastro = () => {
  const theme = useTheme();
  const newData = [
    {
      id: 1,
      mapaEstrategico: {
        programaTrabalho: '10.122.8202.8517.0052',
        medidaExecucao: 'MANUTENÇÃO DE SERVIÇOS ADMINISTRATIVOS GERAIS-SES-DF'
      },
      diretoria: {
        medida: 'R$ 13.000.000,00',
        despesa: 'R$ 10.000.000,00'
      }
    },
    {
      id: 2,
      mapaEstrategico: {
        programaTrabalho: '10.302.6202.6016.0001',
        medidaExecucao: 'FORNECIMENTO DE APARELHOS DE ÓRTESE E PRÓTESES-AMBULATORIAIS-SES-DF'
      },
      diretoria: {
        medida: 'R$ 14.000.000,00',
        despesa: 'R$ 9.000.000,00'
      }
    }
  ];

  const [data, setData] = useState(() => newData);

  const columns = useMemo(
    () => [
      {
        id: 'expander',
        enableGrouping: false,
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <IconButton color={row.getIsExpanded() ? 'primary' : 'secondary'} onClick={row.getToggleExpandedHandler()} size="small">
              {row.getIsExpanded() ? <DownOutlined /> : <RightOutlined />}
            </IconButton>
          ) : (
            <StopOutlined style={{ color: theme.palette.text.secondary }} />
          );
        }
      },
      {
        id: 'select',
        enableGrouping: false
      },
      {
        id: 'id',
        title: 'Id',
        header: '#',
        accessorKey: 'id',
        dataType: 'text',
        enableColumnFilter: false,
        enableGrouping: false,
        meta: {
          className: 'cell-center'
        }
      },
      {
        id: 'mapaEstrategico',
        header: 'DIPOP',
        accessorKey: 'mapaEstrategico',
        dataType: 'text',
        enableGrouping: true,
        columns: [
          {
            id: 'programaTrabalho',
            header: 'PT',
            accessorKey: 'mapaEstrategico.programaTrabalho',
            dataType: 'text',
            enableGrouping: false
          },
          {
            id: 'medidaExecucao',
            header: 'Descroção PT',
            accessorKey: 'mapaEstrategico.medidaExecucao',
            dataType: 'text',
            enableGrouping: false
          }
        ]
      },
      {
        id: 'diretoria',
        header: 'Diretoria de Programação de Órteses e Próteses',
        accessorKey: 'diretoria',
        dataType: 'text',
        enableGrouping: true,
        columns: [
          {
            id: 'medida',
            header: 'Medida de Execução',
            accessorKey: 'diretoria.medida',
            dataType: 'text',
            enableGrouping: false
          },
          {
            id: 'despesa',
            header: 'Despesa Estimado',
            accessorKey: 'diretoria.despesa',
            dataType: 'text',
            enableGrouping: false
          }
        ]
      }
    ],
    // eslint-disable-next-line
    []
  );

  console.log('Data:', data);

  const getCellContent = (cell, columnId) => {
    if (columnId.includes('.')) {
      // Handle nested columns
      const keys = columnId.split('.');
      let value = cell.original;
      for (const key of keys) {
        value = value[key];
      }
      return value;
    }
    // Handle other columns or nested structures if needed
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <ReactTable {...{ data, defaultColumns: columns, setData, getCellContent }} />
    </DndProvider>
  );
};

export default TabelaDIPOPCadastro;
