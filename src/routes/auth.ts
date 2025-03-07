import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  createUser,
  deleteUser,
  getListUsers,
  getUserById,
  getUsers,
  loginUser,
  revalidateToken,
  updateUser,
} from "../controllers/auth";
import { validateJWT } from "../middlewares/validate-jwt";
import { IGetUserRequest } from "../interfaces/IUser";
import { validateRole } from "../middlewares/validate-role";

const routerAuth = Router();

/**
 * User Routes / Auth
 * host + /api/auth
 */

routerAuth.post(
  "/new",
  [
    /** Middlewares */
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validateFields,
  ],
  validateJWT,
  validateRole,
  createUser
);

routerAuth.post(
  "/",
  [
    /** Middlewares */
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validateFields,
  ],
  loginUser
);

routerAuth.put(
  "/:id",
  [
    /** Middlewares */
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de 6 caracteres")
      .isLength({
        min: 6,
      })
      .optional(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validateFields,
  ],
  validateJWT,
  updateUser
);

routerAuth.delete("/:id", validateJWT, validateRole, deleteUser);

routerAuth.get("/", validateJWT, validateRole, getUsers);

routerAuth.get("/:id", validateJWT, getUserById);

routerAuth.post("/combo-users", validateJWT, getListUsers);

routerAuth.get(
  "renew",
  (req, res, next) => validateJWT(req as IGetUserRequest, res, next),
  revalidateToken
);

export { routerAuth };
