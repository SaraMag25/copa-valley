import { PrismaClient } from "@prisma/client";
import dadosCopa from "../src/mock/dadosCopa";

const prisma = new PrismaClient();

async function limparBanco() {
  await prisma.match.deleteMany();
  await prisma.nationalTeam.deleteMany();
}

async function inserirSelecoes(grupo: any) {
  for (const selecao of grupo.selecoes) {
    await prisma.nationalTeam.create({
      data: {
        name: selecao.nome,
        acronym: selecao.sigla,
        group: grupo.letra,
        flag: selecao.bandeira,
      },
    });
  }
}

async function inserirPartidas(grupo: any) {
  for (const partida of grupo.partidas) {
    const homeTeam = await prisma.nationalTeam.findUnique({
      where: { acronym: partida.mandante },
    });
    
    const awayTeam = await prisma.nationalTeam.findUnique({
      where: { acronym: partida.visitante },
    });

    if (homeTeam && awayTeam) {
      await prisma.match.create({
        data: {
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          homeGoals: partida.golsMandante,
          awayGoals: partida.golsVisitante,
          round: partida.rodada,
          completed: partida.realizada,
        },
      });
    }
  }
}

async function main() {
  console.log("Limpando banco...");
  await limparBanco();

  console.log("Inserindo dados...");
  for (const grupo of dadosCopa.grupos) {
    await inserirSelecoes(grupo);
    await inserirPartidas(grupo);
  }

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });