import bcryptjs from "bcryptjs";
import { DoctorEducation, DoctorSchedule, User } from "../models/index.js";
import { generateToken } from "../lib/jwt.js";
import cloudinary from "../lib/cloudinary.js";
import crypto from "crypto";

export const register = async (req, res) => {
  const {
    fullName,
    email,
    password,
    // birthDate,
    // gender,
    // phoneNumber,
    role,
    // drugAllergies,
    // profilePicture,
    // strNumber,
    // sipNumber,
    // specialization,
    // practiceStartYear,
    // practiceLocation,
    // practiceCity,
    // offScheduleFee,
    // doctorEducations,
    // doctorSchedules,
  } = req.body;
  try {
    if (
      !fullName ||
      !email ||
      !password ||
      // !birthDate ||
      // !gender ||
      // !phoneNumber ||
      !role
    ) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password harus lebih dari 6 karakter" });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const apiKey = crypto.randomBytes(16).toString("hex");

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      // birthDate,
      // gender,
      // phoneNumber,
      role,
      // drugAllergies,
      apiKey,
    });

    // if (newUser && role === "Pasien") {
    generateToken(newUser.id, res);
    return res.status(201).json({ message: "Registrasi Pasien berhasil" });
    // }

    // if (role === "Dokter") {
    //   if (
    //     !profilePicture ||
    //     !strNumber ||
    //     !sipNumber ||
    //     !practiceStartYear ||
    //     !practiceLocation ||
    //     !practiceCity ||
    //     !offScheduleFee
    //   ) {
    //     return res.status(400).json({
    //       message: "Semua field harus diisi",
    //     });
    //   }

    //   const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    //   const profilePictureUrl = uploadResponse.secure_url;

    //   const newDoctor = await newUser.createDoctor({
    //     profilePictureUrl,
    //     strNumber,
    //     sipNumber,
    //     specialization,
    //     practiceStartYear,
    //     practiceLocation,
    //     practiceCity,
    //     offScheduleFee,
    //   });

    //   const educations = doctorEducations.map((edu) => ({
    //     ...edu,
    //     doctorId: newDoctor.id,
    //   }));
    //   const newDoctorEducations = await DoctorEducation.bulkCreate(educations);

    //   const schedules = doctorSchedules.map((schedule) => ({
    //     ...schedule,
    //     doctorId: newDoctor.id,
    //   }));
    //   const newDoctorSchedules = await DoctorSchedule.bulkCreate(schedules);

    //   if (newUser && newDoctor && newDoctorEducations && newDoctorSchedules) {
    //     generateToken(newUser.id, res);
    //     return res.status(201).json({ message: "Registrasi Dokter berhasil" });
    //   } else {
    //     return res.status(500).json({ message: "error" });
    //   }
    // }
  } catch (error) {
    console.error("Error di register controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const { password: userPassword, ...userWithoutPassword } = user.dataValues;

    if (!user) {
      return res.status(400).json({ message: "Email tidak valid" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, userPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password tidak valid" });
    }

    generateToken(userWithoutPassword.id, res);

    console.log(
      "🚀 ~ returnres.status ~ userWithoutPassword:",
      userWithoutPassword
    );
    return res.status(200).json({
      message: "Login berhasil",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error di login controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    console.error("Error di logout controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({
      message: "Token valid",
      user: req.user,
    });
  } catch (error) {
    console.error("Error di checkAuth controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const updateProfile = async (req, res) => {
  const {
    fullName,
    email,
    password,
    birthDate,
    gender,
    phoneNumber,
    role,
    drugAllergies,
    profilePicture,
    strNumber,
    sipNumber,
    specialization,
    practiceStartYear,
    practiceLocation,
    practiceCity,
    offScheduleFee,
    doctorEducations,
    doctorSchedules,
  } = req.body;
  try {
    if (
      !fullName ||
      !email ||
      !password ||
      !birthDate ||
      !gender ||
      !phoneNumber ||
      !role
    ) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }

    user.fullName = fullName;
    user.email = email;
    user.password = password;
    user.birthDate = birthDate;
    user.gender = gender;
    user.phoneNumber = phoneNumber;
    user.drugAllergies = drugAllergies;

    await user.save();

    if (role === "Dokter") {
      if (
        !profilePicture ||
        !strNumber ||
        !sipNumber ||
        !practiceStartYear ||
        !practiceLocation ||
        !practiceCity ||
        !offScheduleFee
      ) {
        return res.status(400).json({
          message: "Semua field harus diisi",
        });
      }
      const doctor = await user.getDoctor();
      if (!doctor) {
        return res.status(404).json({ message: "Dokter Tidak Ditemukan" });
      }

      const uploadResponse = await cloudinary.uploader.upload(profilePicture);
      const profilePictureUrl = uploadResponse.secure_url;

      doctor.profilePictureUrl = profilePictureUrl;
      doctor.strNumber = strNumber;
      doctor.sipNumber = sipNumber;
      doctor.specialization = specialization;
      doctor.practiceStartYear = practiceStartYear;
      doctor.practiceLocation = practiceLocation;
      doctor.practiceCity = practiceCity;
      doctor.offScheduleFee = offScheduleFee;

      await doctor.save();

      await DoctorEducation.destroy({
        where: {
          doctorId: doctor.id,
        },
      });
      const educations = doctorEducations.map((edu) => ({
        ...edu,
        doctorId: doctor.id,
      }));
      await DoctorEducation.bulkCreate(educations);

      await DoctorSchedule.destroy({
        where: {
          doctorId: doctor.id,
        },
      });
      const schedules = doctorSchedules.map((schedule) => ({
        ...schedule,
        doctorId: doctor.id,
      }));
      await DoctorSchedule.bulkCreate(schedules);

      return res.status(200).json({
        message: "Profil Dokter Berhasil Diperbarui",
      });
    } else {
      return res.status(200).json({
        message: "Profil Pasien Berhasil Diperbarui",
      });
    }
  } catch (error) {
    console.error("Error di updateProfile controller", error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
