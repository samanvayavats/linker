import { NextFunction , Request , Response} from "express";

const jwt = require('jsonwebtoken');

export async function authenticateToken(req:Request, res:Response, next:NextFunction) {

  const authHeader = req.headers['authorization'];
  
 
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }
  const token = authHeader.split(' ')[1];
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; 
    
    next(); 
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}
