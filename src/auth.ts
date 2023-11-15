import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
const jwt = require('jsonwebtoken');

function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token: string | undefined = req.headers.authorization as string | undefined;

  if (!token)
    return res.status(401).json({ error: 'Need a token!' });
  
  try {
    const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY);
    const userId: string = decodedToken.userId;

    res.locals.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token!' });
  }
}

export default checkAuth;