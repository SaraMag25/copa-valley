export default function TabelaGrupo({ grupo, tabela }) {
  if (!tabela || tabela.length === 0) {
    return <p>Carregando classificação do Grupo {grupo}...</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <h2>Classificação - Grupo {grupo}</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "center", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th>Pos</th>
            <th style={{ textAlign: "left" }}>Seleção</th>
            <th>J</th>
            <th>P</th>
            <th>V</th>
            <th>E</th>
            <th>D</th>
            <th>GP</th>
            <th>GC</th>
            <th>SG</th>
          </tr>
        </thead>
        <tbody>
          {tabela.map((linha, index) => (
            <tr key={linha.sigla}>
              <td>{index + 1}º</td>
              <td style={{ textAlign: "left" }}>
                <img 
                  src={linha.bandeira} 
                  alt={`Bandeira ${linha.selecao}`} 
                  width="24" 
                  style={{ marginRight: 8, verticalAlign: "middle" }} 
                />
                {linha.selecao}
              </td>
              <td>{linha.jogos}</td>
              <td><strong>{linha.pontos}</strong></td>
              <td>{linha.vitorias}</td>
              <td>{linha.empates}</td>
              <td>{linha.derrotas}</td>
              <td>{linha.golsPro}</td>
              <td>{linha.golsContra}</td>
              <td>{linha.saldoGols}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}