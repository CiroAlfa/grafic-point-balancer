/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const BreakEvenChartInteractive = () => {
  const [costoFijo, setCostoFijo] = useState(5000);
  const [costoVariable, setCostoVariable] = useState(30);
  const [precioVenta, setPrecioVenta] = useState(60);
  const [puntoEquilibrio, setPuntoEquilibrio] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([]);
  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);

  useEffect(() => {
    calcularPuntoEquilibrio();
  }, [costoFijo, costoVariable, precioVenta]);
  
  const calcularPuntoEquilibrio = () => {
    const x = (costoFijo / (precioVenta - costoVariable)).toFixed(2); // Mantiene dos decimales
    const y = (x * precioVenta).toFixed(2); // Mantiene dos decimales
    setPuntoEquilibrio({ x: parseFloat(x), y: parseFloat(y) }); // Convierte a float
    generarDatos(parseFloat(x), parseFloat(y)); // Pasa el valor como float a generarDatos
  };
  

  const generarDatos = (x, y) => {
    const newMaxX = Math.ceil(x * 2);
    const newMaxY = Math.ceil(y * 2);
    setMaxX(newMaxX);
    setMaxY(newMaxY);

    const newData = [];
    const step = Math.max(1, Math.floor(newMaxX / 20));
    for (let i = 0; i <= newMaxX; i += step) {
      newData.push({
        x: i,
        costoTotal: costoFijo + costoVariable * i,
        ingresoTotal: precioVenta * i
      });
    }
    setData(newData);
  };

  const handleInputChange = (setter) => (e) => {
    const value = parseFloat(e.target.value) || 0;
    setter(value);
  };

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number.toFixed(0);
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '10px', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Gráfica Interactiva del Punto de Equilibrio</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ margin: '10px' }}>
          <label>Costo Fijo ($): </label>
          <input 
            type="number" 
            value={costoFijo} 
            onChange={handleInputChange(setCostoFijo)} 
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: 'none' }}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label>Costo Variable ($): </label>
          <input 
            type="number" 
            value={costoVariable} 
            onChange={handleInputChange(setCostoVariable)} 
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: 'none' }}
          />
        </div>
        <div style={{ margin: '10px' }}>
          <label>Precio de Venta ($): </label>
          <input 
            type="number" 
            value={precioVenta} 
            onChange={handleInputChange(setPrecioVenta)} 
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: 'none' }}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p>Punto de Equilibrio: {formatNumber(puntoEquilibrio.x)} unidades</p>
        <p>Ingreso/Costo en Punto de Equilibrio: ${formatNumber(puntoEquilibrio.y)}</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis 
            dataKey="x" 
            label={{ value: 'Cantidad de Productos', position: 'insideBottomRight', offset: -10, fill: 'white' }} 
            stroke="white"
            tickFormatter={formatNumber}
          />
          <YAxis 
            label={{ value: 'Costo/Ingreso ($)', angle: -90, position: 'insideLeft', fill: 'white' }} 
            stroke="white"
            tickFormatter={formatNumber}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#3a3a3a', color: 'white', border: 'none' }}
            formatter={(value) => formatNumber(value)}
          />
          <Legend wrapperStyle={{ color: 'white' }} />
          <Line type="monotone" dataKey="costoTotal" stroke="#ff7300" strokeWidth={3} name="Costo Total" />
          <Line type="monotone" dataKey="ingresoTotal" stroke="#00ff00" strokeWidth={3} name="Ingreso Total" />
          <ReferenceLine x={puntoEquilibrio.x} stroke="red" strokeWidth={2} label={{ value: "Punto de Equilibrio", fill: 'white' }} />
          <ReferenceLine y={puntoEquilibrio.y} stroke="red" strokeWidth={2} label={{ value: `$${formatNumber(puntoEquilibrio.y)}`, fill: 'white' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BreakEvenChartInteractive;