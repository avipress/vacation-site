import express, { NextFunction, Request, Response } from "express";
import followersLogic from "../Logic/followersLogic";
import vacations from "../Models/vac";

const followersRouter = express.Router();


// http://localhost:4000/api/addFollow
followersRouter.post(
    "/addFollow",
    async (request: Request, response: Response, next: NextFunction) => {
        const { user_id, vacation_id } = request.body;
        return response.status(201).json(await followersLogic.addFollow(user_id, vacation_id));
    }
  );
  
  //http://localhost:4000/api/deletefollow/:user_id/:vacation_id
  followersRouter.delete(
    "/deletefollow/:user_id/:vacation_id",
    async (request: Request, response: Response, next: NextFunction) => {
      const { user_id, vacation_id } = request.params;
      await followersLogic.deleteFollow(Number(user_id), Number(vacation_id));
      return response.status(204).json(); 
    }
  );
  
//http://localhost:4000/api/getAllfollowers
followersRouter.get(
    "/getAllfollowers",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await followersLogic.getAllFollowers());
    }
)

//http://localhost:4000/api/updatefollow
followersRouter.put(
  "/updatefollow",
  async (request: Request, response: Response, next: NextFunction) => {
      // const updateFollow: any = request.body;
      return response.status(201).json(await followersLogic.updateFollow());
  }
)
//http://localhost:4000/api/getTotal
followersRouter.get(
  "/getTotal",
  async (request: Request, response: Response, next: NextFunction) => {
    const vacation_id: number = +request.params.id;
    return response.status(200).json(await followersLogic.totalFollows());

  }
);
// http://localhost:4000/api/following/:id
followersRouter.get(
    "/following/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const userId: number = +request.params.id;
        return response.status(200).json(await followersLogic.getFollowerVac(userId));
    }
);
//http://localhost:4000/api/followed/:id
followersRouter.get(
  "/followed/:id",
  async (request: Request, response: Response, next: NextFunction) => {
      const vacationId: number = +request.params.id;
      return response.status(200).json(await followersLogic.getFollowersByVac(vacationId));
  }
);

export default followersRouter;