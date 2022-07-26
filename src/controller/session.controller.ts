import { Request,Response } from "express"
import { createSession, findSessions } from "../service/session.service"
import { validatePassword } from "../service/user.service"
import { signJwt } from "../utils/jwt.utils"
import config from "config"



export async function createUserSessionHandler(req:Request,res:Response) {
    

    // Validate the user's password
    const user = await validatePassword(req.body)

    if(!user){
        return res.status(401).send("Invalid email of password");
    }

    // Create a seesion
    const session = await createSession(user._id,req.get("user-agent") || "");

    console.log(session)
    
    // Create an access token
    const accessToken = signJwt({
        ...user,session:session._id},
        {expiresIn: config.get("accessTokenTtl")}

    );

    // Create a refresh token
    const refreshToken = signJwt({
        ...user,session:session._id},
        {expiresIn: config.get("refreshTokenTtl")}
    );

    

    // Return access & refresh tokens
    return res.send({accessToken, refreshToken});
}

export async function getUserSessionsHandler(req:Request,res:Response) {
    const userId = res.locals.user._id

    const sessions = await findSessions({user:userId,valid:true})

    return res.send(sessions)

}
