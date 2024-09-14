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
    <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '10px' }}>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Gráfica del Punto de Equilibrio - Casa de Chocolate</h2>
      <LineChart 
        width={600} 
        height={400} 
        data={data} 
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        style={{ backgroundColor: '#2a2a2a' }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey="x" 
          label={{ value: 'Cantidad de Casas', position: 'insideBottomRight', offset: -10, fill: 'white' }} 
          stroke="white"
        />
        <YAxis 
          label={{ value: 'Costo/Ingreso ($)', angle: -90, position: 'insideLeft', fill: 'white' }} 
          stroke="white"
        />
        <Tooltip contentStyle={{ backgroundColor: '#3a3a3a', color: 'white', border: 'none' }} />
        <Legend wrapperStyle={{ color: 'white' }} />
        <Line type="monotone" dataKey="costoTotal" stroke="#ff7300" strokeWidth={3} name="Costo Total" />
        <Line type="monotone" dataKey="ingresoTotal" stroke="#00ff00" strokeWidth={3} name="Ingreso Total" />
        <ReferenceLine x={167} stroke="red" strokeWidth={2} label={{ value: "Punto de Equilibrio", fill: 'white' }} />
        <ReferenceLine y={10020} stroke="red" strokeWidth={2} label={{ value: "$10,020", fill: 'white' }} />
      </LineChart>
    </div>
  );
};

export default BreakEvenChart;