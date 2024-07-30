"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEvents = void 0;
var express_1 = require("express");
var validate_jwt_1 = require("../middlewares/validate-jwt");
var event_1 = require("../controllers/event");
var express_validator_1 = require("express-validator");
var validate_fields_1 = require("../middlewares/validate-fields");
var routerEvents = (0, express_1.Router)();
exports.routerEvents = routerEvents;
/**
 * User Routes / Event
 * host + /api/event
 */
routerEvents.use(validate_jwt_1.validateJWT);
routerEvents.get("/", event_1.getAllEvents);
routerEvents.get("/pending", event_1.getPendingEvents);
routerEvents.get("/pending/count", event_1.getPendingEventCount);
routerEvents.post("/", [
    (0, express_validator_1.check)("title", "El título es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "La descripción es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("startDateTime", "La fecha y hora de inicio es obligatoria").isISO8601(),
    (0, express_validator_1.check)("endDateTime", "La fecha y hora de fin es obligatoria").isISO8601(),
    (0, express_validator_1.check)("status", "El estado es obligatorio").isIn([
        "completed",
        "pending",
        "canceled",
    ]),
    validate_fields_1.validateFields,
], event_1.createEvent);
routerEvents.put("/:id", [
    (0, express_validator_1.check)("title", "El título es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("description", "La descripción es obligatoria").not().isEmpty(),
    (0, express_validator_1.check)("startDateTime", "La fecha y hora de inicio es obligatoria").isISO8601(),
    (0, express_validator_1.check)("endDateTime", "La fecha y hora de fin es obligatoria").isISO8601(),
    (0, express_validator_1.check)("status", "El estado es obligatorio").isIn([
        "completed",
        "pending",
        "canceled",
    ]),
    validate_fields_1.validateFields,
], event_1.updateEvent);
routerEvents.delete("/:id", event_1.deleteEvent);
