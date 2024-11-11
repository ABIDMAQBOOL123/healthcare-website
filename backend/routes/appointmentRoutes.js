// routes/appointmentRoutes.js
import express from "express";
import {
  bookAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Book a new appointment
router.post("/", authenticate, bookAppointment);

// Get all appointments (admin or doctor access)
router.get("/", authenticate, getAllAppointments);

// Get a single appointment by ID
router.get("/:id", authenticate, getAppointmentById);

// Update an appointment by ID
router.put("/:id", authenticate, updateAppointment);

// Delete an appointment by ID
router.delete("/:id", authenticate, deleteAppointment);

export default router;
