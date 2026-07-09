import { useEffect, useState } from "react";
import api from "../services/api";
import TabelaGrupo from "../components/TabelaGrupo";
import ListaPartidas from "../components/ListaPartidas";

export default function Home() {
  const [classificacao, setClassificacao] = useState([]);
  const [partidas, setPartidas] = useState([]);
  
  const [grupoSelecionado, setGrupoSelecionado] = useState("A");
  const [rodada, setRodada] = useState(1);
  
  const grupos = ["A", "B", "G"];

  useEffect(() => {
    async function buscarClassificacao() {
      try {
        const response = await api.get(`/selecoes/classificacao/${grupoSelecionado}`);
        setClassificacao(response.data.tabela);
      } catch (error) {
        console.error("Erro ao buscar classificação:", error);
      }
    }
    buscarClassificacao();
  }, [grupoSelecionado]);

  useEffect(() => {
    async function buscarPartidas() {
      try {
        const response = await api.get(`/partidas/rodada/${rodada}`);
        setPartidas(response.data);
      } catch (error) {
        console.error("Erro ao buscar partidas:", error);
      }
    }
    buscarPartidas();
  }, [rodada]);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Central de Resultados — Copa 2026</h1>

      <div style={{ marginBottom: 24, textAlign: "center" }}>
        <strong style={{ marginRight: 16 }}>Grupo: </strong>
        {grupos.map((g) => (
          <button
            key={g}
            onClick={() => setGrupoSelecionado(g)}
            style={{ 
              marginRight: 8, 
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: grupoSelecionado === g ? "#007BFF" : "#FFF",
              color: grupoSelecionado === g ? "#FFF" : "#333",
              border: "1px solid #CCC",
              borderRadius: "4px",
              fontWeight: grupoSelecionado === g ? "bold" : "normal" 
            }}
          >
            {g}
          </button>
        ))}
      </div>

      <TabelaGrupo grupo={grupoSelecionado} tabela={classificacao} />

      <div style={{ margin: "48px 0 24px", textAlign: "center" }}>
        <strong style={{ marginRight: 16 }}>Rodada: </strong>
        {[1, 2, 3].map((r) => (
          <button
            key={r}
            onClick={() => setRodada(r)}
            style={{ 
              marginRight: 8, 
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: rodada === r ? "#28A745" : "#FFF",
              color: rodada === r ? "#FFF" : "#333",
              border: "1px solid #CCC",
              borderRadius: "4px",
              fontWeight: rodada === r ? "bold" : "normal" 
            }}
          >
            {r}
          </button>
        ))}
      </div>

      <ListaPartidas partidas={partidas} />
    </main>
  );
}