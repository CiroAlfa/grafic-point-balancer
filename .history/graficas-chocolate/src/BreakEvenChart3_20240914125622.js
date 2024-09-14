import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const BreakEvenChartInteractive = () => {
  const [costoFijo, setCostoFijo] = useState(5000);
  const [costoVariable, setCostoVariable] = useState(30);
  const [precioVenta, setPrecioVenta] = useState(60);
  const [puntoEquilibrio, setPuntoEquilibrio] = useState({ x: 0, y: 0 });
  const [data, setData] = useState([]);

  useEffect(() => {
    calcularPuntoEquilibrio();
    generarDatos();
  }, [costoFijo, costoVariable, precioVenta]);

  const calcularPuntoEquilibrio = () => {
    const x = Math.ceil(costoFijo / (precioVenta - costoVariable));
    const y = x * precioVenta;
    setPuntoEquilibrio({ x, y });
  };

  const generarDatos = () => {
    const maxX = Math.max(puntoEquilibrio.x * 2, 100);
    const newData = [];
    for (let x = 0; x <= maxX; x += Math.max(1, Math.floor(maxX / 20))) {
      newData.push({
        x: x,
        costoTotal: costoFijo + costoVariable * x,
        ingresoTotal: precioVenta * x
      });
    }
    setData(newData);
  };

  const handleInputChange = (setter) => (e) => {
    const value = parseFloat(e.target.value) || 0;
    setter(value);
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '10px', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Gráfica Interactiva del Punto de Equilibrio</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div>
          <label>Costo Fijo ($): </label>
          <input 
            type="number" 
            value={costoFijo} 
            onChange={handleInputChange(setCostoFijo)} 
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: 'none' }}
          />
        </div>
        <div>
          <label>Costo Variable ($): </label>
          <input 
            type="number" 
            value={costoVariable} 
            onChange={handleInputChange(setCostoVariable)} 
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px', border: 'none' }}
          />
        </div>
        <div>
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
        <p>Punto de Equilibrio: {puntoEquilibrio.x} unidades</p>
        <p>Ingreso/Costo en Punto de Equilibrio: ${puntoEquilibrio.y.toFixed(2)}</p>
      </div>

      <LineChart 
        width={600} 
        height={400} 
        data={data} 
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        style={{ backgroundColor: '#2a2a2a', margin: 'auto' }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis 
          dataKey="x" 
          label={{ value: 'Cantidad de Productos', position: 'insideBottomRight', offset: -10, fill: 'white' }} 
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
        <ReferenceLine x={puntoEquilibrio.x} stroke="red" strokeWidth={2} label={{ value: "Punto de Equilibrio", fill: 'white' }} />
        <ReferenceLine y={puntoEquilibrio.y} stroke="red" strokeWidth={2} label={{ value: `$${puntoEquilibrio.y.toFixed(2)}`, fill: 'white' }} />
      </LineChart>
    </div>
  );
};

export default BreakEvenChartInteractive;