import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oxemedLogo from "../assets/oxemed.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import { id } from "date-fns/locale";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const tabs = [
  { id: "tab1", label: "Test" },
  { id: "tab2", label: "Consultation" },
  { id: "tab3", label: "History" },
];

const profilePicUrl = "https://randomuser.me/api/portraits/men/75.jpg";

// const iotData = [
//   { datetime: "2024-05-27T08:00:00", spO2: 96, heartRate: 75 },
//   { datetime: "2024-05-27T12:00:00", spO2: 95, heartRate: 78 },
//   { datetime: "2024-05-27T18:00:00", spO2: 94, heartRate: 77 },

//   { datetime: "2024-05-28T08:00:00", spO2: 96, heartRate: 76 },
//   { datetime: "2024-05-28T12:00:00", spO2: 97, heartRate: 74 },
//   { datetime: "2024-05-28T18:00:00", spO2: 96, heartRate: 75 },

//   { datetime: "2024-05-29T08:00:00", spO2: 95, heartRate: 73 },
//   { datetime: "2024-05-29T12:00:00", spO2: 96, heartRate: 74 },
//   { datetime: "2024-05-29T18:00:00", spO2: 95, heartRate: 72 },
// ];

const groupDataByDate = (data) => {
  return data.reduce((acc, cur) => {
    const date = cur.timestamp.split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(cur);
    return acc;
  }, {});
};

const Riwayat = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeSection, setActiveSection] = useState("home");
  const [dates, setDates] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const navigate = useNavigate();

  const goToTest = () => navigate("/test");
  const goToConsultation = () => navigate("/konsultasi");
  const goToHistory = () => navigate("/riwayat");
  const { logout } = useAuthStore();
  const {
    getSummary,
    isSummaryLoading,
    summary,
    getIotReadings,
    isIotLoading,
    iotReadings,
  } = useChatStore();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []); // pastikan ini hanya dipanggil sekali saat mount

  useEffect(() => {
    getSummary();
    getIotReadings();
  }, [getSummary, getIotReadings]);

  useEffect(() => {
    if (iotReadings) {
      let newSelectedDates = null;
      const grouped = groupDataByDate(iotReadings);
      const newDates = Object.keys(grouped).sort().reverse();
      if (newDates.length > 0 && selectedDate === null) {
        newSelectedDates = dates[0];
      }
      setGroupedData(grouped);
      setDates(newDates);
      if (newSelectedDates) {
        setSelectedDate(newSelectedDates);
        setDailyData(
          newSelectedDates ? groupedData[newSelectedDates] || [] : []
        );
        setSelectedDateObj(
          newSelectedDates ? parseISO(newSelectedDates) : null
        );
      }
    }
  }, [iotReadings]);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    // alert("Logged out!");
    setShowProfileMenu(false);
    logout();
    // navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateObj, setSelectedDateObj] = useState(null);

  const handleDateChange = (date) => {
    if (!date) return;
    date.setHours(7);
    const dateStr = date.toISOString().split("T")[0];
    if (dates.includes(dateStr)) {
      setSelectedDate(dateStr);
      setSelectedDateObj(dateStr ? parseISO(dateStr) : null);
      setDailyData(dateStr ? groupedData[dateStr] || [] : []);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.getElementById("profile-menu");
      const profileImg = document.getElementById("profile-img");

      if (
        profileMenu &&
        !profileMenu.contains(event.target) &&
        profileImg &&
        !profileImg.contains(event.target) &&
        (activeTab === "tab1" || activeTab === "tab2" || activeTab === "tab3")
      ) {
        setShowProfileMenu(false);
        setActiveSection("features");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTab]);

  return (
    <div className="index-page">
      {/* Header */}
      <header
        id="header"
        className={`header d-flex align-items-center fixed-top ${
          activeSection === "features"
            ? "header-features-active"
            : "header-home-active"
        }`}
      >
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo d-flex align-items-center me-auto me-xl-0">
            <img src={oxemedLogo} alt="Oxemed Logo" className="logo-img" />
          </div>

          {/* Navigation Menu */}
          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a
                  href="#login"
                  className={false ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection("home");
                    navigate("/login");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#test"
                  className={false ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab1");
                    navigate("/test");
                  }}
                >
                  Test
                </a>
              </li>

              <li>
                <a
                  href="#consultation"
                  className={false ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab2");
                    navigate("/konsultasi");
                  }}
                >
                  Consultation
                </a>
              </li>

              <li>
                <a
                  href="#history"
                  className={"active"} // selalu active di halaman Riwayat.jsx
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("tab3");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  History
                </a>
              </li>
            </ul>
          </nav>

          {/* Profile Picture */}
          <div className="user-profile" style={{ position: "relative" }}>
            <img
              src={profilePicUrl}
              alt="User Profile"
              id="profile-img"
              className="profile-img"
              onClick={toggleProfileMenu}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />

            {showProfileMenu && (
              <div
                id="profile-menu"
                className="profile-menu"
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="main"
        style={{
          paddingTop: "100px",
          maxWidth: "1500px",
          margin: "0 auto",
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            backgroundColor: "#e6eeff",
            padding: "3rem 2rem",
            borderRadius: "12px",
            maxWidth: "1200px",
            margin: "0 auto 3rem auto",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#334155",
          }}
        >
          <h4
            style={{
              color: "#3b60e4",
              fontWeight: "700",
              fontSize: "1.25rem",
              marginBottom: "0rem",
            }}
          >
            Halo, Andi Saputra!
          </h4>

          <h1
            style={{
              fontWeight: "900",
              fontSize: "3.5rem",
              lineHeight: "1.1",
              marginBottom: "1rem",
              color: "#121828",
            }}
          >
            Pantau dan Kelola{" "}
            <span style={{ color: "#3b60e4" }}>Riwayat Kesehatan</span> Anda
            dengan Mudah
          </h1>

          <p
            style={{
              fontWeight: "700",
              fontSize: "1.125rem",
              marginBottom: "1.5rem",
              color: "#1e293b",
              maxWidth: "1200px",
              textAlign: "justify",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Ini adalah{" "}
            <span style={{ color: "#4db6ac" }}>Bagian Riwayat Kesehatan</span>{" "}
            di OxeMed — tempat Anda dapat melihat dan memantau rekam medis serta
            rangkuman konsultasi kesehatan pernapasan secara <em>real-time</em>.
          </p>

          <p
            style={{
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.6",
              maxWidth: "1200px",
              color: "#475569",
              textAlign: "justify",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Dengan data yang lengkap dan tampilan yang mudah dipahami, Anda
            dapat mengikuti perkembangan kesehatan Anda dengan lebih percaya
            diri, serta memperoleh informasi penting dari tenaga medis kapan
            saja diperlukan.
          </p>
        </section>

        {/* Data Monitoring Section */}
        {!isIotLoading ? (
          groupedData ? (
            <section
              style={{
                backgroundColor: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                marginBottom: "2rem",
              }}
            >
              <h2>Data Monitoring Kesehatan (SpO2 & Detak Jantung)</h2>

              {/* Kalender Pemilih Tanggal */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="date-picker"
                  style={{ fontWeight: "600", marginRight: "1rem" }}
                >
                  Pilih Tanggal:
                </label>
                <DatePicker
                  id="date-picker"
                  selected={selectedDateObj}
                  onChange={handleDateChange}
                  dateFormat="EEEE, dd MMMM yyyy"
                  locale={id}
                  placeholderText="Klik untuk pilih tanggal"
                  className="date-picker-input"
                  maxDate={new Date()}
                  showPopperArrow={false}
                  isClearable={false}
                  filterDate={(date) => {
                    date.setHours(7);
                    const d = date.toISOString().split("T")[0];
                    return dates.includes(d);
                  }}
                />
              </div>

              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={dailyData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="timestamp"
                      tickFormatter={(val) => {
                        const date = new Date(val);
                        // const hour = date.getHours();
                        // date.setHours(hour - 7);
                        return date.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      }}
                    />
                    <YAxis
                      yAxisId="left"
                      label={{
                        value: "SpO2 (%)",
                        angle: -90,
                        position: "insideLeft",
                        offset: 10,
                        dy: 20,
                        style: { fontSize: "12px", fontWeight: "600" },
                      }}
                      domain={[90, 100]}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Detak Jantung (bpm)",
                        angle: 90,
                        position: "insideRight",
                        offset: 15,
                        dy: 40,
                        style: { fontSize: "12px", fontWeight: "600" },
                      }}
                      domain={[60, 150]}
                    />
                    <Tooltip
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="spo2"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="pulse"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <div>Belum ada Data Ditemukan</div>
        )}

        {/* Consultation Summary Section */}
        <section
          style={{
            backgroundColor: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
            marginBottom: "2rem",
          }}
        >
          <h2>Rangkuman Konsultasi Terakhir</h2>
          {isSummaryLoading
            ? "Loading..."
            : summary.length > 0
            ? summary.map((summaryItem) => {
                return (
                  <div key={summaryItem.id}>
                    {/* Tanggal dan jam yang tampil menarik dan terpisah */}
                    <div
                      style={{
                        fontStyle: "normal",
                        fontFamily: "Arial, sans-serif",
                        padding: "5px",
                        color: "#555",
                        marginBottom: "0.8rem",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                        borderLeft: "4px solid #2563eb",
                        paddingLeft: "12px",
                        backgroundColor: "#f0f7ff",
                        display: "inline-block",
                        borderRadius: "4px",
                      }}
                    >
                      {new Intl.DateTimeFormat("id-ID", {
                        dateStyle: "full",
                        timeStyle: "long",
                      }).format(new Date(summaryItem.createdAt))}
                    </div>

                    <p>
                      <strong>Keluhan: </strong>
                      {summaryItem.chiefComplaint}
                    </p>
                    <p>
                      <strong>Penjelasan Diagnosis: </strong>
                      {summaryItem.diagnosisExplanation}
                    </p>
                    <p>
                      <strong>Penjelasan Obat: </strong>{" "}
                      {summaryItem.medicationExplanation}
                    </p>
                    <p>
                      <strong>Rangkuman: </strong> {summaryItem.summary}
                    </p>
                  </div>
                );
              })
            : "Belum ada rangkuman konsultasi"}
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="footer" style={{ marginTop: "40px" }}>
        <div className="footer-bottom text-center mt-4">
          <p style={{ margin: 0, fontWeight: "700", fontSize: "1.25rem" }}>
            OxeMed
            <br />
            Teknologi Kedokteran - Kelompok 4
          </p>
          <p
            style={{ marginTop: "8px", fontSize: "0.9rem", fontWeight: "400" }}
          >
            © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Scroll Top Button */}
      <a
        href="#header"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default Riwayat;
