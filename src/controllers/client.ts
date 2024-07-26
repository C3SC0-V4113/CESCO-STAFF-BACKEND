import { Request, Response } from "express";
import Client from "../models/Client";

const createClient = async (req: Request, res: Response) => {
  const client = new Client(req.body);

  try {
    const savedClient = await client.save();
    res.status(201).json({
      ok: true,
      client: savedClient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.status(201).json({
      ok: true,
      clients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateClient = async (req: Request, res: Response) => {
  const clientId = req.params.id;

  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Client not found",
      });
    }

    const newClient = {
      ...req.body,
    };

    const updatedClient = await Client.findByIdAndUpdate(clientId, newClient, {
      new: true,
    });
    res.status(201).json({
      ok: true,
      client: updatedClient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteClient = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({
        ok: false,
        msg: "Client not found",
      });
    }

    await Client.findByIdAndDelete(clientId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

export { createClient, getClients, deleteClient, updateClient };
