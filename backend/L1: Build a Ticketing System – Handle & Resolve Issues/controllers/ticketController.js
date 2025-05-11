import ticketModel from '../models/ticketModel.js';

const ticketController = {
  getAllTickets: async (req, res, next) => {
    try {
      const tickets = await ticketModel.getAll();
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  },

  getTicketById: async (req, res, next) => {
    try {
      const ticket = await ticketModel.getById(req.params.id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.json(ticket);
    } catch (error) {
      next(error);
    }
  },

  createTicket: async (req, res, next) => {
    try {
      const newTicket = await ticketModel.create(req.body);
      res.status(201).json(newTicket);
    } catch (error) {
      next(error);
    }
  },

  updateTicket: async (req, res, next) => {
    try {
      const updatedTicket = await ticketModel.update(
        req.params.id,
        req.body
      );
      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.json(updatedTicket);
    } catch (error) {
      next(error);
    }
  },

  resolveTicket: async (req, res, next) => {
    try {
      const resolvedTicket = await ticketModel.resolve(req.params.id);
      if (!resolvedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.json(resolvedTicket);
    } catch (error) {
      next(error);
    }
  },

  deleteTicket: async (req, res, next) => {
    try {
      const deletedTicket = await ticketModel.delete(req.params.id);
      if (!deletedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

export default ticketController;
