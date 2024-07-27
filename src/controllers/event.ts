import { Request, Response } from "express";
import { IGetUserRequest } from "../interfaces/IUser";
import Event from "../models/Event";

// Obtener todos los eventos
const getAllEvents = async (req: Request, res: Response) => {
  const { role, uid } = req as IGetUserRequest;

  try {
    const query = role === "admin" ? {} : { users: uid };
    const events = await Event.find(query)
      .populate("users", "name email")
      .populate("clients", "name lastname");

    res.status(200).json({ ok: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Obtener los 5 eventos pendientes más próximos
const getPendingEvents = async (req: Request, res: Response) => {
  const { role, uid } = req as IGetUserRequest;

  try {
    const query =
      role === "admin"
        ? { status: "pending" }
        : { status: "pending", users: uid };
    const events = await Event.find(query)
      .sort({ startDateTime: 1 })
      .limit(5)
      .populate("users", "name email")
      .populate("clients", "name lastname");

    res.status(200).json({ ok: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Obtener el número de eventos pendientes
const getPendingEventCount = async (req: Request, res: Response) => {
  const { role, uid } = req as IGetUserRequest;

  try {
    const query =
      role === "admin"
        ? { status: "pending" }
        : { status: "pending", users: uid };

    const count = await Event.countDocuments(query);

    res.status(200).json({ ok: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Crear un nuevo evento
const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();

    res.status(201).json({ ok: true, event: savedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Actualizar un evento
const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });

    res.status(200).json({ ok: true, event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

// Eliminar un evento
const deleteEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export {
  getAllEvents,
  getPendingEvents,
  getPendingEventCount,
  createEvent,
  updateEvent,
  deleteEvent,
};
