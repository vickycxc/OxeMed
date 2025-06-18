import { Op, or } from "sequelize";
import {
  CompoundedMedication,
  Consultation,
  ConsultationSummary,
  Diagnosis,
  DoctorNote,
  Message,
  Prescription,
  User,
} from "../models/index.js";
import genai, { geminiConfig } from "../lib/genai.js";
import {
  generateConsultationId,
  parseConsultationId,
} from "../lib/consultation_id.js";

export const addConsultation = async (req, res) => {
  const { consultation, doctorName } = req.body;
  consultation.patientId = req.user.id;
  console.log("🚀 ~ addConsultation ~ consultation:", consultation);
  const dateStart = new Date(consultation.timeStart);
  consultation.id = generateConsultationId({
    patientId: consultation.patientId,
    doctorId: consultation.doctorId,
    dateStart,
  });
  consultation.status = "Aktif";
  try {
    const newConsultation = await Consultation.create(consultation);
    const greetingMessage = await Message.create({
      senderId: newConsultation.doctorId,
      receiverId: newConsultation.patientId,
      consultationId: newConsultation.id,
      message: `Selamat pagi! Saya ${doctorName}, Dokter Spesialis Penyakit Dalam. Ada yang bisa saya bantu?`,
    });
    res.status(201).json({
      messages: "Konsultasi baru berhasil dibuat",
      consultation: newConsultation.dataValues,
      message: greetingMessage.dataValues,
    });
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
      include: { model: User, as: "patient", attributes: ["fullName"] },
      where: {
        [Op.or]: [{ patientId: userId }, { doctorId: userId }],
      },
    });

    console.log(
      "🚀 ~ getConsultations ~ consultations:",
      JSON.stringify(consultations, null, 2)
    );
    res.status(200).json(consultations);
  } catch (error) {
    console.log("Error di getConsultations controller", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const getConsultationsToday = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const consultations = await Consultation.findAll({
      include: { model: User, as: "patient", attributes: ["fullName"] },
      where: {
        [Op.or]: [{ patientId: userId }, { doctorId: userId }],
        timeStart: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)), // Mulai hari ini
          [Op.lte]: new Date(new Date().setHours(23, 59, 59, 999)), // Hingga akhir hari ini
        },
      },
    });

    console.log("🚀 ~ getConsultationsToday ~ consultations:", consultations);
    res.status(200).json(consultations);
  } catch (error) {
    console.log("Error di getConsultationsToday controller", error);
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
  const { patientId } = parseConsultationId(consultationId);
  try {
    const consultationMessages = await Message.findAll({
      where: {
        consultationId: consultationId,
      },
      order: [["createdAt", "ASC"]],
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

Transkrip Chat: ${JSON.stringify(filteredMessages)}`;

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
          patientId,
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
