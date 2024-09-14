import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const BreakEvenChart = () => {
  const generateData = () => {
    const data = [];
    for (let x = 0; x <= 300; x += 20) {
      data.push({
        x: x,
        costoTotal: 5000 + 30 * x,
        ingresoTotal: 60 * x
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Gráfica del Punto de Equilibrio - Casa de Chocolate</h2>
      <LineChart width={600} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" label={{ value: 'Cantidad de Casas', position: 'insideBottomRight', offset: -10 }} />
        <YAxis label={{ value: 'Costo/Ingreso ($)', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="costoTotal" stroke="#8884d8" name="Costo Total" />
        <Line type="monotone" dataKey="ingresoTotal" stroke="#82ca9d" name="Ingreso Total" />
        <ReferenceLine x={167} stroke="red" label="Punto de Equilibrio" />
        <ReferenceLine y={10020} stroke="red" label="$10,020" />
      </LineChart>
    </div>
  );
};

export default BreakEvenChart;