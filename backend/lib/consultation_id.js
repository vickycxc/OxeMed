export const generateConsultationId = ({
  doctorId,
  patientId,
  date = new Date(),
}) => {
  const pad = (num) => num.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  return `CONS-${doctorId}_${patientId}-${year}${month}${day}-${hour}${minute}${second}`;
};

export const parseConsultationId = (consultationId) => {
  const regex = /^CONS-(\d+)_(\d+)-(\d{8})-(\d{6})$/;
  const match = consultationId.match(regex);
  if (!match) {
    throw new Error("ID Konsultasi Tidak Valid");
  }
  const [_, doctorId, patientId, dateStr, timeStr] = match;
  return {
    doctorId: parseInt(doctorId),
    patientId: parseInt(patientId),
    date: `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6)}`,
    time: `${timeStr.slice(0, 2)}:${timeStr.slice(2, 4)}:${timeStr.slice(4)}`,
  };
};

export const isValidConsultationId = (consultationId) => {
  return /^CONS-\d+_\d+-\d{8}-\d{6}$/.test(consultationId);
};
