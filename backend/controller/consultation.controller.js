import { Op } from "sequelize";
import {
  CompoundedMedication,
  Consultation,
  Diagnosis,
  DoctorNote,
  Prescription,
} from "../models/index.js";

export const addConsultation = async (req, res) => {
  const consultation = req.body;
  try {
    await Consultation.create(consultation);
    res.status(201).json({ messages: "Konsultasi baru berhasil dibuat" });
  } catch (error) {
    console.log("Error di addConsultation controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const updateConsultation = async (req, res) => {
  const {
    id,
    patientId,
    doctorId,
    timeStart,
    timeEnd,
    nextConsultation,
    status,
  } = req.body;
  try {
    const consultation = await Consultation.findByPk(id);
    if (!consultation) {
      return res.status(404).json({ message: "Konsultasi tidak ditemukan" });
    }

    consultation.id = id;
    consultation.patientId = patientId;
    consultation.doctorId = doctorId;
    consultation.timeStart = timeStart;
    consultation.timeEnd = timeEnd;
    consultation.nextConsultation = nextConsultation;
    consultation.status = status;

    await consultation.save();

    return res.status(200).json({ message: "Konsultasi berhasil diperbarui" });
  } catch (error) {
    console.error("Error di updateConsultation controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getConsultations = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const consultations = await Consultation.findAll({
      where: {
        [Op.or]: [{ patientId: userId }, { doctorId: userId }],
      },
    });
    res.status(200).json(consultations);
  } catch (error) {
    console.log("Error di getConsultations controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const addDoctorNote = async (req, res) => {
  const { symptoms, advice, diagnoses } = req.body;
  const { id: consultationId } = req.params;
  try {
    await DoctorNote.create({
      symptoms,
      advice,
      diagnoses,
      id: consultationId,
    });
    const diagnosesObject = diagnoses.map((diagnosis) => ({
      ...diagnosis,
      consultationId,
    }));
    await Diagnosis.bulkCreate(diagnosesObject);

    res.status(201).json({ message: "Catatan Dokter berhasil dibuat" });
  } catch (error) {
    console.log("Error di addDoctorNote controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const addPrescription = async (req, res) => {
  const prescriptions = req.body;
  console.log("🚀 ~ addPrescription ~ prescriptions:", prescriptions);
  const { id: consultationId } = req.params;
  try {
    for (const prescription of prescriptions) {
      const savedPrescription = await Prescription.create({
        ...prescription,
        consultationId,
      });
      if (prescription.compoundedMeds !== undefined) {
        const compoundedMedsObject = prescription.compoundedMeds.map(
          (compoundedMed) => ({
            ...compoundedMed,
            prescriptionId: savedPrescription.id,
          })
        );
        await CompoundedMedication.bulkCreate(compoundedMedsObject);
      }
    }

    res.status(201).json({ message: "Resep Digital berhasil dibuat" });
  } catch (error) {
    console.log("Error di addPrescription controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
