import { Express,Request,Response } from "express";
import { createUserSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import valideteResource from './middleware/validateResource'
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema} from "./schema/user.schema";


function routes(app:Express){
    app.get('/check',(req: Request,res:Response) => res.sendStatus(200));

    // Register user
    app.post("/api/users",valideteResource(createUserSchema),createUserHandler)

    app.post("/api/sessions",valideteResource(createSessionSchema),createUserSessionHandler)

    app.get('/api/sessions',requireUser,getUserSessionsHandler)

}

export default routes;