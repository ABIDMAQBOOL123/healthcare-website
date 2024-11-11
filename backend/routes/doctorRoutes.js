import express from 'express';
import { getDoctors, getDoctorById, addDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorController.js';

const router = express.Router();

// Get all doctors
router.get('/', getDoctors);

// Get a doctor by ID
router.get('/:id', getDoctorById);

// Add a new doctor
router.post('/add', addDoctor);

// Update a doctor by ID
router.put('/:id', updateDoctor);

// Delete a doctor by ID
router.delete('/:id', deleteDoctor);

export default router;
