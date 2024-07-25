import { Request, Response } from "express";
import User from "../models/User";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import generateJWT from "../helpers/jwt";
import { IGetUserRequest } from "../interfaces/IUser";
import { ok } from "assert";

const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User(req.body);

    /** Encrypt password */
    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await user.save();

    /** Generate JWT */
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Please enter your email address",
      });
    }

    /** Confirm password */

    const validPassword = compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Email or password is incorrect",
      });
    }

    /** Generate JWT */
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    const newUser = { ...req.body };

    const userUpdated = await User.findByIdAndUpdate(userID, newUser, {
      new: true,
    });

    res.status(201).json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const revalidateToken = async (req: Request, res: Response) => {
  const { uid, name } = req as IGetUserRequest;

  /** Generate new JWT and return it */
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

export { createUser, loginUser, revalidateToken, updateUser };
