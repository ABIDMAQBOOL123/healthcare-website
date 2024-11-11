
import prisma from "../prisma/prisma.js";


export const bookAppointment = async (req, res) => {
  const { doctorId, appointmentDate } = req.body;
  const userId = req.user.id; 
  console.log(userId)

  try {
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        doctorId,
        appointmentDate: new Date(appointmentDate),
        status: "PENDING",
      },
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        doctor: true,
      },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, doctor: true },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { appointmentDate, status } = req.body;

  try {
    const appointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined,
        status,
      },
    });

    res.json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
