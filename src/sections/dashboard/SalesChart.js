'use client';

import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography, useMediaQuery } from '@mui/material';

// third-party
import ReactApexChart from 'react-apexcharts';

// project import
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter(val) {
        return `$ ${val} thousands`;
      }
    }
  },
  legend: {
    show: false
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false
        }
      }
    }
  ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesChart = () => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { mode } = useConfig();

  const [legend, setLegend] = useState({
    income: true,
    cos: true
  });

  const { income, cos } = legend;

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const initialSeries = [
    {
      name: 'Income',
      data: [180, 90, 135, 114, 120, 145]
    },
    {
      name: 'Cost Of Sales',
      data: [120, 45, 78, 150, 168, 99]
    }
  ];

  const [series, setSeries] = useState(initialSeries);

  const handleLegendChange = (event) => {
    setLegend({ ...legend, [event.target.name]: event.target.checked });
  };

  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    if (income && cos) {
      setSeries(initialSeries);
    } else if (income) {
      setSeries([
        {
          name: 'Income',
          data: [180, 90, 135, 114, 120, 145]
        }
      ]);
    } else if (cos) {
      setSeries([
        {
          name: 'Cost Of Sales',
          data: [120, 45, 78, 150, 168, 99]
        }
      ]);
    } else {
      setSeries([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [income, cos]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: !(income && cos) && cos ? [primaryMain] : [warning, primaryMain],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      theme: {
        mode: mode === ThemeMode.DARK ? 'dark' : 'light'
      },
      plotOptions: {
        bar: {
          columnWidth: xsDown ? '60%' : '30%'
        }
      }
    }));
  }, [mode, primary, secondary, line, warning, primaryMain, successDark, income, cos, xsDown]);

  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack spacing={1.5}>
            <Typography variant="h6" color="secondary">
              Net Profit
            </Typography>
            <Typography variant="h4">$1560</Typography>
          </Stack>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox color="warning" checked={income} onChange={handleLegendChange} name="income" />}
                label="Income"
              />
              <FormControlLabel control={<Checkbox checked={cos} onChange={handleLegendChange} name="cos" />} label="Cost of Sales" />
            </FormGroup>
          </FormControl>
        </Stack>
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
          <ReactApexChart options={options} series={series} type="bar" height={360} />
        </Box>
      </Box>
    </MainCard>
  );
};

export default SalesChart;
