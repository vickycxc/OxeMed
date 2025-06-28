import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  // State untuk menampung nilai dari setiap input form

  const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

  const { user, updateProfile, isUpdatingProfile, deleteAccount } =
    useAuthStore();
  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("Nama lengkap diperlukan");
    if (!formData.email.trim()) return toast.error("Email diperlukan");
    if (!formData.email.trim()) return toast.error("Email diperlukan");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Format email tidak valid");
    if (formData.password !== "") {
      if (!formData.password) return toast.error("Password diperlukan");
      if (formData.password.length < 6)
        return toast.error("Password harus minimal 6 karakter");
      if (formData.password !== formData.confirmPassword)
        return toast.error("Password dan Konfirmasi Password tidak cocok!");
    }
    return true;
  };

  // Handler untuk memperbarui state setiap kali ada perubahan pada input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler untuk submit form, Anda bisa mengisi logikanya di sini
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form dari refresh halaman

    // --- SILAKAN ISI LOGIKA ANDA DI SINI ---
    // Contoh: validasi password

    const success = validateForm();

    if (success) {
      await updateProfile(formData);
      navigate("/");
    }
  };

  // Objek styling untuk digunakan di dalam JSX
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f0f2f5",
    },
    formWrapper: {
      padding: "40px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
    },
    image: {
      width: "8rem",
      height: "8rem",
      borderRadius: "50%",
      objectFit: "cover",
    },
    title: {
      marginBottom: "24px",
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      color: "#555",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box", // Penting agar padding tidak menambah lebar
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#ffffff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Update Profile</h2>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={profilePicUrl}
            style={styles.image}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="fullName" style={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required={formData.password !== ""}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            disabled={isUpdatingProfile}
          >
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </button>
          <button
            type="button"
            style={{
              ...styles.button,
              backgroundColor: "#dc3545",
              marginTop: "20px",
            }}
            onClick={async (e) => {
              const confirmDelete = confirm("Confirm delete account");
              if (confirmDelete) deleteAccount();
            }}
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
