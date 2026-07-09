import { Router } from "express";
import { nationalTeamRoutes } from "./nationalTeam.routes";
import { matchRoutes } from "./match.routes";

const routes = Router();


routes.use("/selecoes", nationalTeamRoutes);
routes.use("/partidas", matchRoutes);

export { routes };