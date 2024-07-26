import { Router } from "express";
import { check } from "express-validator";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../controllers/client";

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
  updateClient
);

routerClient.delete("/:id", deleteClient);

routerClient.get("/", getClients);

export { routerClient };
