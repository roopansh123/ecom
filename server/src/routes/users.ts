import { Router, Request, Response } from "express"
import bcrypt from "bcrypt"
import { IUser, UserModel } from "../models/users"
import jwt from "jsonwebtoken"
import { UserErrors } from "../errors"

const router = Router()

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required"
      })
    }

    const existingUser = await UserModel.findOne({ username })

    if (existingUser) {
      return res.status(400).json({
        type: UserErrors.USERNAME_ALREADY_EXISTS
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      username,
      password: hashedPassword
    })

    await newUser.save()

    return res.status(201).json({
      message: "User Registered Successfully"
    })

  } catch (error) {
    console.error("Register Error:", error)
    return res.status(500).json({
    error: "Internal Server Error"
    })
  }
});



export const verifyToken = (
    req: Request,   
    res: Response, 
    next: Function
)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        jwt.verify(authHeader, "secret", (err)=>{
            if(err){
                return res.sendStatus(403);
            }
            next();
        });
    }else{
          return res.sendStatus(401);
    }


}

export { router as UserRouter }

router.post("/login", async(req : Request , res : Response)=>{
    const {username, password}= req.body
    try {
         const user = await UserModel.findOne({ username })

        if(!user){
            return res.status(400).json({type: UserErrors.NO_USER_FOUND})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res. status (400). json ({type: UserErrors. WRONG_CREDENTIALS });
        }



        const token = jwt.sign({id: user._id},"secret");
        res.json({token,userID:user._id})

    } catch (error) {
        console.error("LoginError:", error)
        return res.status(500).json({
        error: "Internal Server Error"
    })
        
    }
});
