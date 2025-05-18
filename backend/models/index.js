import { CompoundedMedication } from "./compunded_medication.model.js";
import { Consultation } from "./consultation.model.js";
import { ConsultationSummary } from "./consultation_summary.model.js";
import { Diagnosis } from "./diagnosis.model.js";
import { Doctor } from "./doctor.model.js";
import { DoctorEducation } from "./doctor_education.model.js";
import { DoctorNote } from "./doctor_note.model.js";
import { DoctorSchedule } from "./doctor_schedule.model.js";
import { Message } from "./message.model.js";
import { Notification } from "./notification.model.js";
import { Prescription } from "./prescription.model.js";
import { SensorReading } from "./sensor_reading.model.js";
import { User } from "./user.model.js";

// User - Doctor (1:1)
User.hasOne(Doctor, {
  foreignKey: "id",
});
Doctor.belongsTo(User, {
  foreignKey: "id",
});

// User - Message (1:N)
User.hasMany(Message, {
  foreignKey: "senderId",
});
User.hasMany(Message, {
  foreignKey: "receiverId",
});
Message.belongsTo(User, {
  foreignKey: "senderId",
});
Message.belongsTo(User, {
  foreignKey: "receiverId",
});

// User - Notification (1:N)
User.hasMany(Notification, {
  foreignKey: "receiverId",
});
User.hasMany(Notification, {
  foreignKey: "senderId",
});
Notification.belongsTo(User, {
  foreignKey: "receiverId",
});
Notification.belongsTo(User, {
  foreignKey: "senderId",
});

// User - Consultation (1:N)
User.hasMany(Consultation, {
  foreignKey: "patientId",
});
Consultation.belongsTo(User, {
  foreignKey: "patientId",
});

// Doctor - Consultation (1:N)
Doctor.hasMany(Consultation, {
  foreignKey: "doctorId",
});
Consultation.belongsTo(Doctor, {
  foreignKey: "doctorId",
});

// Doctor - Education (1:N)
Doctor.hasMany(DoctorEducation, {
  foreignKey: "doctorId",
  as: "doctorEducations",
});
DoctorEducation.belongsTo(Doctor, {
  foreignKey: "doctorId",
});

// Doctor - Doctor Schedule (1:N)
Doctor.hasMany(DoctorSchedule, {
  foreignKey: "doctorId",
  as: "doctorSchedules",
});
DoctorSchedule.belongsTo(Doctor, {
  foreignKey: "doctorId",
});

// Consultation - Doctor Note (1:1)
Consultation.hasOne(DoctorNote, {
  foreignKey: "id",
});
DoctorNote.belongsTo(Consultation, {
  foreignKey: "id",
});

// Consultation - Prescription (1:N)
Consultation.hasMany(Prescription, {
  foreignKey: "consultationId",
});
Prescription.belongsTo(Consultation, {
  foreignKey: "consultationId",
});

// Consultation - Consultation Summary (1:1)
Consultation.hasOne(ConsultationSummary, {
  foreignKey: "id",
});
ConsultationSummary.belongsTo(Consultation, {
  foreignKey: "id",
});

// Consultation - Message (1:N)
Consultation.hasMany(Message, {
  foreignKey: "consultationId",
});
Message.belongsTo(Consultation, {
  foreignKey: "consultationId",
});

// Message - Message (1:1)
Message.hasOne(Message, {
  foreignKey: "replyTo",
  as: "reply",
});
Message.belongsTo(Message, {
  foreignKey: "replyTo",
  as: "parent_message",
});

// Doctor Note - Diagnosis (1:N)
DoctorNote.hasMany(Diagnosis, {
  foreignKey: "consultationId",
});
Diagnosis.belongsTo(DoctorNote, {
  foreignKey: "consultationId",
});

// Prescription - Compounded Medication (1:N)
Prescription.hasMany(CompoundedMedication, {
  foreignKey: "prescriptionId",
});
CompoundedMedication.belongsTo(Prescription, {
  foreignKey: "prescriptionId",
});

// User - Sensor Reading (1:N)
User.hasMany(SensorReading, {
  foreignKey: "userId",
});
SensorReading.belongsTo(User, {
  foreignKey: "userId",
});

export {
  User,
  Doctor,
  Message,
  Notification,
  Consultation,
  ConsultationSummary,
  Diagnosis,
  DoctorEducation,
  DoctorSchedule,
  DoctorNote,
  Prescription,
  CompoundedMedication,
  SensorReading,
};
