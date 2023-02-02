import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from "@danishshafiq030/common";

// model
import { Ticket } from "../models/ticket";

const router = express.Router();

// update tickets

router.put(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
  }
);

// show all tickets

router.get("/api/tickets", async (req: Request, res: Response) => {
  const getAllTicket = await Ticket.find({});

  return res.status(200).send(getAllTicket);
});

// Show tickets
router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const getTicket = await Ticket.findById({
    id: req.params.id,
  });

  console.log("ticket response :- ", getTicket);

  if (!getTicket) {
    throw new NotFoundError();
  }
  return res.status(200).send(getTicket);
});

// Create tickets

router.post(
  "/api/tickets",
  // requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .not()
      .isEmpty()
      .withMessage("Price is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = await Ticket.create({
      title,
      price,
      // userId: req.currentUser!.id,  // do when global function sign in working fine
      userId: "24242acdcd",
    });

    return res.status(201).send(ticket);
  }
);

export { router as TicketRouter };
