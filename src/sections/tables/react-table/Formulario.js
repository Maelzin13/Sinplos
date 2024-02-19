import React, { useState } from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';
import MainCard from 'components/MainCard';

function Formulario() {
  const [mapName, setMapName] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  const years = Array.from({ length: 30 }, (_, index) => String(1990 + index));

  return (
    <MainCard>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TextField label="Nome do Mapa" fullWidth value={mapName} onChange={(e) => setMapName(e.target.value)} />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="startYear"
            options={years}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Ano Início" />}
            value={startYear}
            onChange={(_, newValue) => setStartYear(newValue)}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            id="endYear"
            options={years}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Ano Fim" />}
            value={endYear}
            onChange={(_, newValue) => setEndYear(newValue)}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
}

export default Formulario;
