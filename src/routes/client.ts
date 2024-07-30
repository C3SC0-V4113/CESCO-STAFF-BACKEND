import { Router } from "express";
import { check } from "express-validator";
import {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  getCountClients,
  getListClients,
  updateClient,
} from "../controllers/client";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateRole } from "../middlewares/validate-role";

const routerClient = Router();

/**
 * User Routes / Client
 * host + /api/client
 */

routerClient.post(
  "/new",
  [
    /** Middlewares */
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
    check("phone", "El telefono es obligatorio").isMobilePhone("any"),
  ],
  validateJWT,
  validateRole,
  createClient
);

routerClient.put(
  "/:id",
  [
    /** Middlewares */
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
    check("phone", "El telefono es obligatorio").isMobilePhone("any"),
  ],
  validateJWT,
  validateRole,
  updateClient
);

routerClient.delete("/:id", validateJWT, validateRole, deleteClient);

routerClient.get("/", validateJWT, getClients);

routerClient.get("/:id", validateJWT, getClientById);

routerClient.post("/combo-clients", validateJWT, getListClients);

routerClient.post("/total", validateJWT, getCountClients);

export { routerClient };
