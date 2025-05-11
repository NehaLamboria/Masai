import express from 'express';
import ticketController from '../controllers/ticketController.js';
import dataCheckMiddleware from '../middlewares/dataCheckMiddleware.js';

const router = express.Router();

// CRUD Routes
router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', dataCheckMiddleware, ticketController.createTicket);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

// Special endpoint for resolving tickets
router.patch('/:id/resolve', ticketController.resolveTicket);

export default router;
