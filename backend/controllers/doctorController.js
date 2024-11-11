
import prisma from "../prisma/prisma.js";

export const getDoctors = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) },
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addDoctor = async (req, res) => {
  const { name, specialty, experience, rating } = req.body;

  try {
    const doctor = await prisma.doctor.create({
      data: {
        name,
        specialty,
        experience,
        rating,
      },
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialty, experience, rating } = req.body;

  try {
    const doctor = await prisma.doctor.update({
      where: { id: parseInt(id) },
      data: {
        name,
        specialty,
        experience,
        rating,
      },
    });

    res.json({
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.doctor.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
