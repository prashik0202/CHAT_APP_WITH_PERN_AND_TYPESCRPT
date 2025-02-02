import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma";
import { generateToken } from "../utils/generateToken";
import getProfileUrl from "../contants/constant";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    // get all fields from user using request body
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    // if all fields are not provided the throw error
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // if password and confiemPassword dont match then return error
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }

    // check if user is alreasy exists or not by userName
    const user = await prisma.user.findUnique({ where: { userName } });

    // if userName is already exists then return error user already exists
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create salt for encrypting password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // get user avatar based on gender
    // https://avatar-placeholder.iran.liara.run/
    const profile_url: string = getProfileUrl(gender, userName);

    // create user
    const newUser = await prisma.user.create({
      data: {
        fullName,
        userName,
        password: hashedPassword,
        gender,
        profilePic: profile_url,
      },
    });

    // if user created successfully
    if (newUser) {
      // generate token in a sec
      generateToken(newUser.id, res);

      // send the res to client
      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
        gender : newUser.gender
      });
    } else {
      // if error while creating user
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * get user credentials email , password
 * check if user exixts in our database use email to check
 * and then encrypt the use password and compare with stored password
 * if password found correct then generate token
 * and send res 200
 * and catch error if anything thing happens
 */
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userName, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { userName } });

    if (!userExists) {
      return res.status(400).json({ error: "Invalid creadentials" });
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      userExists.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateToken(userExists.id, res);

    res.status(200).json({
      id: userExists.id,
      fullName: userExists.fullName,
      userName: userExists.userName,
      profilePic: userExists.profilePic,
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    console.log("Excecuted");
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * get user by id
 * and if user not found the throw error
 */
export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
      gender : user.gender
    });
  } catch (error: any) {
    console.log("Error in getMe ", error.message);
    res.status(500).json({ error: "Internal Server Error " });
  }
};
