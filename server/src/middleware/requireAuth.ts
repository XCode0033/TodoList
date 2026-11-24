import { RequestHandler } from "express";
import jwt from 'jsonwebtoken'
declare global {
  namespace Express {
    interface Request { userId?: number }
  }
}
const JWT_SECRET = process.env.JWT_SECRET
if(!JWT_SECRET) {
    throw new Error('Could not find JWT_SECRET')
}

export const tokenVerify: RequestHandler = (req, res, next) => {
    let token = req.cookies?.token
    const header = req.headers.authorization
    if(!token && header?.startsWith('Bearer ')) {
        token = header.slice(7)
    }


    if(!token) {
        res.status(401).json({error: 'Not logged in. No token.'})
        return
    }

    try{
        const payload = jwt.verify(token, JWT_SECRET) as {userId:number}
        req.userId = payload.userId
        next()
    }catch {
        res.status(401).json({error: 'Invalid or expired token'})
    }
} 