import { Request, Response } from "express";
import User from "../models/User";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import generateJWT from "../helpers/jwt";
import { IGetUserRequest } from "../interfaces/IUser";

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
  const { role, uid } = req as IGetUserRequest;

  if (uid !== userID && role !== "admin") {
    return res.status(403).json({
      ok: false,
      msg: "You can only update your own profile",
    });
  }

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    /** Encrypt password */
    const salt = genSaltSync();

    const newUser = {
      ...req.body,
      password: req.body.password
        ? hashSync(req.body.password, salt)
        : req.body.password,
    };

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

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { role } = req as IGetUserRequest;

  if (role !== "admin") {
    return res.status(403).json({
      ok: false,
      msg: "Only admins can delete users",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {}
};

const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, name = "" } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const users = await User.find({ name: new RegExp(name as string, "i") })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await User.countDocuments({
      name: new RegExp(name as string, "i"),
    });

    res
      .status(201)
      .json({ ok: true, users, total, page: pageNumber, limit: limitNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { role, uid } = req as IGetUserRequest;

  if (uid !== userId && role !== "admin") {
    return res.status(403).json({
      ok: false,
      msg: "You can only view your own profile",
    });
  }

  try {
    const user = await User.findById(userId);
    res.status(201).json({ ok: true, user });
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

export {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  revalidateToken,
  updateUser,
};
