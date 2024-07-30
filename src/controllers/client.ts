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
  const { page = 1, limit = 10, name = "" } = req.query;
  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  try {
    const clients = await Client.find({ name: new RegExp(name as string, "i") })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Client.countDocuments({
      name: new RegExp(name as string, "i"),
    });

    res.status(201).json({
      ok: true,
      clients,
      total,
      page: pageNumber,
      limit: limitNumber,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getClientById = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  try {
    const client = await Client.findById(clientId);
    res.status(201).json({
      ok: true,
      client,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getCountClients = async (req: Request, res: Response) => {
  try {
    const totalClients = await Client.countDocuments();

    res.status(200).json({
      ok: true,
      count: totalClients,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const getListClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({}, "_id name lastname");

    const formattedClients = clients.map((user) => ({
      label: user.name + " " + user.lastname,
      value: user._id,
    }));

    res.status(201).json({
      ok: true,
      clients: formattedClients,
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

export {
  createClient,
  deleteClient,
  getClientById,
  getClients,
  getCountClients,
  updateClient,
  getListClients,
};
