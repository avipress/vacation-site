import express, { NextFunction, Request, Response } from "express";
import vacations from "../Models/vac";
import vacationLogic from "../Logic/vacationLogic";
import multer from "multer";
import path from "path";

const VacRouter = express.Router();


// http://localhost:4000/api/vac/addVac
VacRouter.post(
    "/addVac",
    async (request: Request, response: Response, next: NextFunction) => {
      const newVac: vacations = request.body;
      return response.status(201).json(await vacationLogic.addVac(newVac));
    }
  );
  
//http://localhost:4000/api/vac/deleteVac/:id
VacRouter.delete(
    "/deleteVac/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const vacId: number = +request.params.id;
        return response.status(204).json(await vacationLogic.deleteVac(vacId));
    }
)
//http://localhost:4000/api/vac/updateVac
VacRouter.put(
    "/updateVac",
    async (request: Request, response: Response, next: NextFunction) => {
        const updateVac: vacations = request.body;
        return response.status(201).json(await vacationLogic.updateVac(updateVac));
    }
)

//http://localhost:4000/api/vac/getAllVac
VacRouter.get(
    "/getAllVac",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await vacationLogic.getVacList());
    }
)

// http://localhost:4000/api/vac/:id
VacRouter.get(
    "/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const vacId: number = +request.params.id;
        return response.status(200).json(await vacationLogic.getVacById(vacId));
    }
);

//http://localhost:4000/test

VacRouter.get(
    "/test",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await vacationLogic.test());
    }
)

export default VacRouter;