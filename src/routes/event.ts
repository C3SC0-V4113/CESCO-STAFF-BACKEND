import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getPendingEventCount,
  getPendingEvents,
  updateEvent,
} from "../controllers/event";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";

const routerEvents = Router();

/**
 * User Routes / Event
 * host + /api/event
 */

routerEvents.use(validateJWT);

routerEvents.get("/", getAllEvents);

routerEvents.get("/pending", getPendingEvents);

routerEvents.get("/pending/count", getPendingEventCount);

routerEvents.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check(
      "startDateTime",
      "La fecha y hora de inicio es obligatoria"
    ).isISO8601(),
    check("endDateTime", "La fecha y hora de fin es obligatoria").isISO8601(),
    check("status", "El estado es obligatorio").isIn([
      "completed",
      "pending",
      "canceled",
    ]),
    validateFields,
  ],
  createEvent
);

routerEvents.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check(
      "startDateTime",
      "La fecha y hora de inicio es obligatoria"
    ).isISO8601(),
    check("endDateTime", "La fecha y hora de fin es obligatoria").isISO8601(),
    check("status", "El estado es obligatorio").isIn([
      "completed",
      "pending",
      "canceled",
    ]),
    validateFields,
  ],
  updateEvent
);

routerEvents.delete("/:id", deleteEvent);

export { routerEvents };
