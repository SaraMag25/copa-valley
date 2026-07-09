import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class NationalTeamController {
  
  async buscarTodas(req: Request, res: Response) {
    const teams = await prisma.nationalTeam.findMany({
      orderBy: [
        { group: "asc" },
        { name: "asc" },
      ],
    });
    return res.json(teams);
  }

  async buscarPorGrupo(req: Request, res: Response) {
    const { letra } = req.params as { letra: string };
    const teams = await prisma.nationalTeam.findMany({
      where: { group: letra.toUpperCase() },
    });

    if (teams.length === 0) {
      return res.status(404).json({ message: "Grupo não encontrado" });
    }

    return res.json(teams);
  }

  async classificacao(req: Request, res: Response) {
    const { grupo } = req.params as { grupo: string };
    const letraGrupo = grupo.toUpperCase();

    const teams = await prisma.nationalTeam.findMany({
      where: { group: letraGrupo }
    });

    if (teams.length === 0) {
      return res.status(404).json({ message: "Grupo não encontrado" });
    }

    const matches = await prisma.match.findMany({
      where: {
        completed: true,
        homeTeam: { group: letraGrupo }
      }
    });
    const tabela = teams.map(team => {
      let pontos = 0, vitorias = 0, empates = 0, derrotas = 0;
      let golsPro = 0, golsContra = 0;

      matches.forEach(match => {
        if (match.homeTeamId === team.id) {
          golsPro += match.homeGoals;
          golsContra += match.awayGoals;
          if (match.homeGoals > match.awayGoals) { pontos += 3; vitorias++; }
          else if (match.homeGoals === match.awayGoals) { pontos += 1; empates++; }
          else { derrotas++; }
        } 
        else if (match.awayTeamId === team.id) {
          golsPro += match.awayGoals;
          golsContra += match.homeGoals;
          if (match.awayGoals > match.homeGoals) { pontos += 3; vitorias++; }
          else if (match.awayGoals === match.homeGoals) { pontos += 1; empates++; }
          else { derrotas++; }
        }
      });

      const jogos = vitorias + empates + derrotas;
      const saldoGols = golsPro - golsContra;

      return {
        selecao: team.name,
        sigla: team.acronym,
        bandeira: team.flag,
        jogos, pontos, vitorias, empates, derrotas, golsPro, golsContra, saldoGols
      };
    });

    tabela.sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      if (b.saldoGols !== a.saldoGols) return b.saldoGols - a.saldoGols;
      return b.golsPro - a.golsPro;
    });

    return res.json({ grupo: letraGrupo, tabela });
  }
}