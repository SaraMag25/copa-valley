import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class MatchController {
  
  async buscarTodas(req: Request, res: Response) {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true,
      },
      orderBy: { round: "asc" }, 
    });
    return res.json(matches);
  }

  async buscarPorRodada(req: Request, res: Response) {
   const numero = parseInt(req.params.numero as string);

    if (isNaN(numero)) {
      return res.status(400).json({ message: "Número da rodada inválido" });
    }

    const matches = await prisma.match.findMany({
      where: { round: numero },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    });
    return res.json(matches);
  }
  async atualizarResultado(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    
    const { golsMandante, golsVisitante } = req.body;

    try {
      const match = await prisma.match.update({
        where: { id },
        data: {
          homeGoals: golsMandante,
          awayGoals: golsVisitante,
          completed: true, 
        },
      });
      return res.json(match);
    } catch (error) {
      return res.status(404).json({ message: "Partida não encontrada" });
    }
  }
}