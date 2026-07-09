import { Router } from "express";
import { MatchController } from "../controller/match.controller";

const matchRoutes = Router();
const matchController = new MatchController();

matchRoutes.get("/", matchController.buscarTodas);

matchRoutes.get("/rodada/:numero", matchController.buscarPorRodada);

matchRoutes.patch("/:id/resultado", matchController.atualizarResultado);

export { matchRoutes };