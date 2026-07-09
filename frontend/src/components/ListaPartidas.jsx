export default function ListaPartidas({ partidas }) {
  if (!partidas || partidas.length === 0) {
    return <p>Nenhuma partida encontrada para esta rodada.</p>;
  }

  return (
    <div>
      <h2>Jogos da Rodada</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {partidas.map((partida) => (
          <li 
            key={partida.id} 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              padding: "12px", 
              borderBottom: "1px solid #ccc",
              alignItems: "center"
            }}
          >
            <span style={{ width: "40%", textAlign: "right", fontWeight: "bold" }}>
              {partida.homeTeam?.name || "Mandante"}
            </span>
            
            <span style={{ padding: "0 16px", backgroundColor: "#eee", borderRadius: "4px" }}>
              {partida.completed 
                ? `${partida.homeGoals} x ${partida.awayGoals}` 
                : " vs "}
            </span>

            <span style={{ width: "40%", textAlign: "left", fontWeight: "bold" }}>
              {partida.awayTeam?.name || "Visitante"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}