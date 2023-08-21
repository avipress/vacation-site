import express, { NextFunction, Request, Response } from "express";
import User from "../Models/User";
import userLogic from "../Logic/LoginLogic";
import LoginLogic from "../Logic/LoginLogic";

const loginRouter = express.Router();


// addUser, deleteUser, updateUser, checkLogin, getUserList
//http://localhost:4000/api/user/signup
loginRouter.post(
    "/signup",
    async (request: Request, response: Response, next: NextFunction) => {
        const newUser: User = request.body;
        return response.status(201).json(await userLogic.addUser(newUser));
    }
)
//http://localhost:4000/api/user/delete/:id
loginRouter.delete(
    "/delete/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const userId: number = +request.params.id;
        return response.status(204).json(await userLogic.deleteUser(userId));
    }
)
//http://localhost:4000/update/api/user/update
loginRouter.put(
    "/update",
    async (request: Request, response: Response, next: NextFunction) => {
        const updateUser: User = request.body;
        return response.status(201).json(await userLogic.updateUser(updateUser));
    }
)
//http://localhost:4000/api/user/checkLogin
loginRouter.post(
    "/checkLogin",
    async (request: Request, response: Response, next: NextFunction) => {
        const userLogin: User = request.body;
            return response.status(200).json(await userLogic.checkLogin(userLogin));
        
    }
)
//http://localhost:4000/api/user/getAll  
loginRouter.get(
    "/getAll",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await userLogic.getUserList());
    }
)
//http://localhost:4000/test/api/user/test

loginRouter.get(
    "/test",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await userLogic.test());
    }
)

// http://localhost:4000/api/user/:id
loginRouter.get(
    "/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const userId: number = +request.params.id;
        return response.status(200).json(await LoginLogic.getUserById(userId));
    }
);

export default loginRouter;