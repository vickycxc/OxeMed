import { Op, or } from "sequelize";
import {
  CompoundedMedication,
  Consultation,
  ConsultationSummary,
  Diagnosis,
  DoctorNote,
  Message,
  Prescription,
} from "../models/index.js";
import genai, { geminiConfig } from "../lib/genai.js";
import { generateConsultationId } from "../lib/consultation_id.js";

export const addConsultation = async (req, res) => {
  const consultation = req.body;
  const dateStart = new Date(consultation.timeStart);
  consultation.id = generateConsultationId(
    req.user.id,
    consultation.patientId,
    dateStart
  );
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

export const summarizeConsultation = async (req, res) => {
  const consultationId = req.params.id;
  try {
    const consultationMessages = await Message.findAll({
      where: {
        consultationId: consultationId,
      },
      order: [["createdAt", "ASC"]],
    });

    const doctorNote = await DoctorNote.findOne({
      attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      where: {
        id: consultationId,
      },
      include: {
        model: Diagnosis,
        attributes: {
          exclude: ["createdAt", "updatedAt", "consultationId", "id"],
        },
      },
    });

    const prescription = await Prescription.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "consultationId", "id"],
      },
      where: {
        consultationId: consultationId,
      },
      include: {
        model: CompoundedMedication,
        attributes: {
          exclude: ["createdAt", "updatedAt", "consultationId", "id"],
        },
      },
    });

    if (consultationMessages.length !== 0) {
      const filteredMessages = consultationMessages.map((message) => {
        return {
          senderId: message.senderId,
          content: message.message,
        };
      });
      console.log(
        "🚀 ~ filteredMessages ~ filteredMessages:",
        filteredMessages
      );

      const prompt = `Saya memiliki transkrip konsultasi antara dokter dan pasien. Tolong jelaskan sejelas jelasnya tentang definisi diagnosis pasien, kegunaan obat yang diresepkan dokter, serta buatlah rangkuman mengenai sesi konsultasi tersebut

Transkrip Chat: ${JSON.stringify(filteredMessages)}
Catatan Dokter: ${doctorNote ? JSON.stringify(doctorNote) : ""}
Resep: ${prescription ? JSON.stringify(prescription) : ""}`;

      console.log("🚀 ~ summarizeConsultation ~ prompt:", prompt);

      const response = await genai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: geminiConfig,
      });
      const kesimpulan = JSON.parse(response.text);

      if (kesimpulan) {
        const {
          keluhan,
          penjelasanTentangDiagnosis,
          penjelasanTentangObat,
          rangkuman,
        } = kesimpulan;
        const summary = {
          id: consultationId,
          chiefComplaint: keluhan,
          medicationExplanation: penjelasanTentangObat,
          diagnosisExplanation: penjelasanTentangDiagnosis,
          summary: rangkuman,
        };
        await ConsultationSummary.create(summary);
        res.status(201).json({
          message: "Berhasil membuat rangkuman",
        });
      } else {
        res.status(400).json({
          message: "Gagal membuat rangkuman",
        });
      }
    } else {
      return res.status(404).json({
        message: "Konsultasi tidak ditemukan",
      });
    }
  } catch (error) {
    console.log("Error di summarizeConsultations controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
