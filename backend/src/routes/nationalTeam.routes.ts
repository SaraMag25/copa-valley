import { Router } from "express";
import { NationalTeamController } from "../controller/nationalTeam.controller";

const nationalTeamRoutes = Router();
const nationalTeamController = new NationalTeamController();

nationalTeamRoutes.get("/", nationalTeamController.buscarTodas);

nationalTeamRoutes.get("/grupo/:letra", nationalTeamController.buscarPorGrupo);

nationalTeamRoutes.get("/classificacao/:grupo", nationalTeamController.classificacao);

export { nationalTeamRoutes };