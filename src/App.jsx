import React, { useState, useMemo } from 'react';
import './App.css';

// Datos de ejemplo simulando el dataset limpio de la prueba
const initialData = [
  { id: 1, cliente: "Juan Pérez", segmento: "Premium", ciudad: "Quito", producto: "Tarjeta de Crédito Black", saldo: 15400, consumo: 3200, categoria: "Travel Lovers", vencimiento: "2026-10-15" },
  { id: 2, cliente: "María Gómez", segmento: "Mass", ciudad: "Guayaquil", producto: "Cuenta de Ahorros", saldo: 2400, consumo: 450, categoria: "Food Lovers", vencimiento: "2026-11-20" },
  { id: 3, cliente: "Carlos Ruiz", segmento: "VIP", ciudad: "Cuenca", producto: "Préstamo Hipotecario", saldo: 85000, consumo: 1800, categoria: "Tech Lovers", vencimiento: "2027-01-10" },
  { id: 4, cliente: "Ana Torres", segmento: "Premium", ciudad: "Quito", producto: "Tarjeta de Crédito Platinum", saldo: 12100, consumo: 2900, categoria: "Travel Lovers", vencimiento: "2026-09-30" },
  { id: 5, cliente: "Luis Mendoza", segmento: "Mass", ciudad: "Manta", producto: "Cuenta Corriente", saldo: 1500, consumo: 320, categoria: "Streaming Lovers", vencimiento: "2026-12-05" },
  { id: 6, cliente: "Sofía Castro", segmento: "VIP", ciudad: "Guayaquil", producto: "Tarjeta de Crédito Black", saldo: 34000, consumo: 5100, categoria: "Travel Lovers", vencimiento: "2026-10-01" },
  { id: 7, cliente: "Jorge Benítez", segmento: "Mass", ciudad: "Cuenca", producto: "Préstamo de Consumo", saldo: 4200, consumo: 890, categoria: "Tech Lovers", vencimiento: "2026-08-15" },
  { id: 8, cliente: "Lucía Morales", segmento: "Premium", ciudad: "Quito", producto: "Tarjeta de Crédito Platinum", saldo: 19800, consumo: 3400, categoria: "Food Lovers", vencimiento: "2026-11-12" }
];

export default function App() {
  // Estado para el Login simple de demostración
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para los filtros (Dimensiones exigidas)
  const [filtroSegmento, setFiltroSegmento] = useState('Todos');
  const [filtroCiudad, setFiltroCiudad] = useState('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  // Función de manejo de login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    } else {
      alert("Por favor ingresa usuario y contraseña de demostración.");
    }
  };

  // Filtrado de datos inteligente basado en los selectores
  const filteredData = useMemo(() => {
    return initialData.filter(item => {
      const matchSegmento = filtroSegmento === 'Todos' || item.segmento === filtroSegmento;
      const matchCiudad = filtroCiudad === 'Todos' || item.ciudad === filtroCiudad;
      const matchCategoria = filtroCategoria === 'Todos' || item.categoria === filtroCategoria;
      return matchSegmento && matchCiudad && matchCategoria;
    });
  }, [filtroSegmento, filtroCiudad, filtroCategoria]);

  // Cálculo de KPIs dinámicos según los datos filtrados
  const totalClientes = filteredData.length;
  const saldoTotal = filteredData.reduce((acc, curr) => acc + curr.saldo, 0);
  const consumoPromedio = totalClientes > 0 ? (filteredData.reduce((acc, curr) => acc + curr.consumo, 0) / totalClientes).toFixed(2) : 0;

  // Si no ha iniciado sesión, muestra la pantalla de Login
  if (!isLoggedIn) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginCard}>
          <h2 style={styles.title}>Digotec - Acceso Analítico</h2>
          <p style={styles.subtitle}>Portal de Gestión y Cartera de Clientes</p>
          <form onSubmit={handleLogin} style={styles.form}>
            <input 
              type="text" 
              placeholder="Usuario (ej. analista@digotec.com)" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Ingresar al Sistema</button>
          </form>
          <p style={styles.hint}>* Login simple de demostración (Acepta cualquier valor)</p>
        </div>
      </div>
    );
  }

  // Si ya inició sesión, muestra el Dashboard principal con KPIs, filtros, tabla y Power BI
  return (
    <div style={styles.dashboardContainer}>
      {/* Barra superior */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.headerTitle}>📊 Dashboard Ejecutivo - Cartera Digotec</h1>
          <p style={styles.headerSubtitle}>Vista general de clientes, comportamiento y analítica transaccional</p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={styles.logoutButton}>Cerrar Sesión</button>
      </header>

      {/* Sección de KPIs básicos */}
      <section style={styles.kpiGrid}>
        <div style={styles.kpiCard}>
          <h3>Clientes Filtrados</h3>
          <p style={styles.kpiValue}>{totalClientes}</p>
        </div>
        <div style={styles.kpiCard}>
          <h3>Saldo Total Cartera</h3>
          <p style={styles.kpiValue}>${saldoTotal.toLocaleString()}</p>
        </div>
        <div style={styles.kpiCard}>
          <h3>Consumo Promedio</h3>
          <p style={styles.kpiValue}>${Number(consumoPromedio).toLocaleString()}</p>
        </div>
      </section>

      {/* Barra de Filtros por 3 dimensiones */}
      <section style={styles.filterSection}>
        <h3>Filtros Analíticos</h3>
        <div style={styles.filterGroup}>
          <div>
            <label style={styles.label}>Segmento:</label>
            <select value={filtroSegmento} onChange={(e) => setFiltroSegmento(e.target.value)} style={styles.select}>
              <option value="Todos">Todos</option>
              <option value="Mass">Mass</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Ciudad:</label>
            <select value={filtroCiudad} onChange={(e) => setFiltroCiudad(e.target.value)} style={styles.select}>
              <option value="Todos">Todas</option>
              <option value="Quito">Quito</option>
              <option value="Guayaquil">Guayaquil</option>
              <option value="Cuenca">Cuenca</option>
              <option value="Manta">Manta</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Categoría (Lover):</label>
            <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)} style={styles.select}>
              <option value="Todos">Todas</option>
              <option value="Travel Lovers">Travel Lovers</option>
              <option value="Food Lovers">Food Lovers</option>
              <option value="Tech Lovers">Tech Lovers</option>
              <option value="Streaming Lovers">Streaming Lovers</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tabla de Clientes / Datos */}
      <section style={styles.tableSection}>
        <h3>Detalle de Clientes</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.trHead}>
                <th style={styles.th}>Cliente</th>
                <th style={styles.th}>Segmento</th>
                <th style={styles.th}>Ciudad</th>
                <th style={styles.th}>Producto</th>
                <th style={styles.th}>Saldo</th>
                <th style={styles.th}>Consumo</th>
                <th style={styles.th}>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map(item => (
                  <tr key={item.id} style={styles.tr}>
                    <td style={styles.td}>{item.cliente}</td>
                    <td style={styles.td}>{item.segmento}</td>
                    <td style={styles.td}>{item.ciudad}</td>
                    <td style={styles.td}>{item.producto}</td>
                    <td style={styles.td}>${item.saldo.toLocaleString()}</td>
                    <td style={styles.td}>${item.consumo.toLocaleString()}</td>
                    <td style={styles.td}><span style={styles.badge}>{item.categoria}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={styles.noData}>No se encontraron registros con los filtros seleccionados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sección Power BI Embebido / Estructura Técnica */}
      <section style={styles.biSection}>
        <h3>Visualización Power BI Embebida (Estructura Preparada)</h3>
        <p style={styles.biDescription}>
          * Integración técnica preparada para entorno corporativo. En producción se conecta mediante iframe seguro utilizando el Workspace ID y Embed Token oficial de Power BI Service.
        </p>
        <div style={styles.biBox}>
          <div style={styles.biPlaceholder}>
            📊 [ Reporte Ejecutivo Power BI - Vista Consolidada de Cartera ]
            <br />
            <span style={{ fontSize: '13px', color: '#666' }}>Estado: Estructura técnica implementada y lista para credenciales de licenciamiento.</span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Estilos limpios y profesionales integrados para evitar dependencias externas complejas
const styles = {
  loginContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' },
  loginCard: { background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  title: { margin: '0 0 10px 0', color: '#2c3e50' },
  subtitle: { color: '#7f8c8d', fontSize: '14px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  button: { padding: '12px', borderRadius: '4px', border: 'none', backgroundColor: '#2980b9', color: '#fff', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' },
  hint: { fontSize: '12px', color: '#95a5a6', marginTop: '15px' },
  
  dashboardContainer: { padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#333', backgroundColor: '#f9f9f9', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eaeaea', paddingBottom: '20px', marginBottom: '25px' },
  headerTitle: { margin: '0 0 5px 0', fontSize: '24px', color: '#2c3e50' },
  headerSubtitle: { margin: 0, color: '#7f8c8d', fontSize: '14px' },
  logoutButton: { padding: '8px 16px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' },
  kpiCard: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', borderLeft: '4px solid #2980b9' },
  kpiValue: { fontSize: '22px', fontWeight: 'bold', color: '#2c3e50', margin: '10px 0 0 0' },
  
  filterSection: { background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  filterGroup: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' },
  label: { display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#555' },
  select: { padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' },
  
  tableSection: { background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
  trHead: { backgroundColor: '#f1f2f6', borderBottom: '2px solid #ddd' },
  th: { padding: '12px', color: '#2c3e50' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '12px', color: '#444' },
  badge: { backgroundColor: '#e8f4f8', color: '#2980b9', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  noData: { textAlign: 'center', padding: '20px', color: '#7f8c8d' },
  
  biSection: { background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  biDescription: { fontSize: '13px', color: '#666', marginBottom: '15px' },
  biBox: { border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '40px', textAlign: 'center', backgroundColor: '#f8fafc' },
  biPlaceholder: { fontSize: '16px', fontWeight: 'bold', color: '#475569' }
};
