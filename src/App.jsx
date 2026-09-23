import { useState } from "react";
import clientes from "./data/clientes.json";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [inputUsuario, setInputUsuario] = useState("");
  const [inputClave, setInputClave] = useState("");

  const [segmentoFiltro, setSegmentoFiltro] = useState("");
  const [ciudadFiltro, setCiudadFiltro] = useState("");
  const [loverFiltro, setLoverFiltro] = useState("");

  if (!usuario) {
    return (
      <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "320px", margin: "80px auto", border: "1px solid #ccc" }}>
        <h2>Ingreso — Digotec</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputUsuario.trim() && inputClave.trim()) {
              setUsuario(inputUsuario);
            }
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label>Usuario</label><br />
            <input value={inputUsuario} onChange={(e) => setInputUsuario(e.target.value)} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Contraseña</label><br />
            <input type="password" value={inputClave} onChange={(e) => setInputClave(e.target.value)} />
          </div>
          <button type="submit">Ingresar</button>
        </form>
        <p style={{ fontSize: "12px", color: "#888", marginTop: "16px" }}>
          Demo: cualquier usuario/clave ingresan. En producción sería SSO/Azure AD.
        </p>
      </div>
    );
  }

  const filtrados = clientes.filter((c) => {
    if (segmentoFiltro !== "" && c.segmento_cliente !== segmentoFiltro) return false;
    if (ciudadFiltro !== "" && c.ciudad !== ciudadFiltro) return false;
    if (loverFiltro !== "" && c.segmento_conductual !== loverFiltro) return false;
    return true;
  });
  const saldoTotal = filtrados.reduce((suma, c) => suma + c.saldo_total, 0);
  const saldoPromedio = filtrados.length > 0 ? saldoTotal / filtrados.length : 0;
  const multiproducto = filtrados.filter((c) => c.es_multiproducto).length;
  const pctMultiproducto = filtrados.length > 0 ? (multiproducto / filtrados.length) * 100 : 0;

  const visibles = filtrados.slice(0, 50);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Cartera de Clientes — Digotec</h1>
        <button onClick={() => setUsuario(null)}>Cerrar sesión ({usuario})</button>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        <label>
          Segmento:{" "}
          <select value={segmentoFiltro} onChange={(e) => setSegmentoFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="Mass">Mass</option>
            <option value="Affluent">Affluent</option>
            <option value="Premium">Premium</option>
            <option value="Joven">Joven</option>
            <option value="PyME">PyME</option>
          </select>
        </label>

        <label>
          Ciudad:{" "}
          <select value={ciudadFiltro} onChange={(e) => setCiudadFiltro(e.target.value)}>
            <option value="">Todas</option>
            <option value="Guayaquil">Guayaquil</option>
            <option value="Quito">Quito</option>
            <option value="Cuenca">Cuenca</option>
            <option value="Manta">Manta</option>
            <option value="Loja">Loja</option>
            <option value="Ambato">Ambato</option>
          </select>
        </label>

        <label>
          Categoría:{" "}
          <select value={loverFiltro} onChange={(e) => setLoverFiltro(e.target.value)}>
            <option value="">Todas</option>
            <option value="Balanced Spender">Balanced Spender</option>
            <option value="Standard Spender">Standard Spender</option>
            <option value="Food & Market Lover">Food & Market Lover</option>
            <option value="Tech & Streaming Lover">Tech & Streaming Lover</option>
            <option value="Travel Lover">Travel Lover</option>
          </select>
        </label>
      </div>

      <p>Mostrando {filtrados.length} clientes (máx. 50 en pantalla)</p>
      <div style={{ display: "flex", gap: "16px", margin: "16px 0" }}>
        <div style={{ border: "1px solid #ccc", padding: "12px 16px" }}>
          <div style={{ fontSize: "12px", color: "#666" }}>Clientes filtrados</div>
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>{filtrados.length}</div>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "12px 16px" }}>
          <div style={{ fontSize: "12px", color: "#666" }}>Saldo total</div>
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            ${saldoTotal.toLocaleString()}
          </div>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "12px 16px" }}>
          <div style={{ fontSize: "12px", color: "#666" }}>Saldo promedio</div>
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            ${saldoPromedio.toFixed(0)}
          </div>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "12px 16px" }}>
          <div style={{ fontSize: "12px", color: "#666" }}>% Multiproducto</div>
          <div style={{ fontSize: "22px", fontWeight: "bold" }}>
            {pctMultiproducto.toFixed(1)}%
          </div>
        </div>
      </div>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Segmento</th>
            <th>Ciudad</th>
            <th>Saldo</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {visibles.map((c) => (
            <tr key={c.cliente_id}>
              <td>{c.nombre_cliente}</td>
              <td>{c.segmento_cliente}</td>
              <td>{c.ciudad}</td>
              <td>${c.saldo_total}</td>
              <td>{c.segmento_conductual}</td>
            </tr>
          ))}
        </tbody>
      </table>
            <div style={{ marginTop: "24px", border: "1px dashed #999", padding: "20px", background: "#f5f5f5" }}>
        <h3>Dashboard Power BI (pendiente de credenciales)</h3>
        <p>
          Este espacio está preparado técnicamente para el reporte ejecutivo
          embebido. Para completarlo en un entorno corporativo se necesita:
        </p>
        <ul>
          <li>Workspace Power BI Pro o Premium</li>
          <li>App registrada en Azure AD (permiso Report.Read.All)</li>
          <li>Embed token generado por backend, no expuesto en el cliente</li>
          <li>ID de reporte y de workspace del reporte publicado en Fabric</li>
        </ul>
      </div>
    </div>
  );
}

export default App;