import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import "@fontsource/poppins";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <div
        className="relative h-[85vh] bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: "url('/photo-1465447142348-e9952c393450.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-xs"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Smart Vehicle Detection System
          </h2>
          <div className="text-lg md:text-xl text-gray-300 mb-8 min-h-[80px]">
            <Typewriter
              options={{
                strings: [
                  "Sistem ini mendeteksi kendaraan secara real-time.",
                  "Didukung oleh teknologi CCTV dan ESP32-CAM.",
                  "Cepat, akurat, dan mudah digunakan.",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 20,
                pauseFor: 2000,
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/cctv">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition"
              >
                Coba CCTV Detection
              </motion.button>
            </Link>
            <Link to="/esp">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition"
              >
                Coba ESP32-CAM Detection
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-gray-300">
          {/* YOLO */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 hover:shadow-xl transition-all border border-gray-700">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              🧠 YOLO Detection
            </h3>
            <p className="leading-relaxed text-sm">
              Sistem ini menggunakan{" "}
              <span className="text-white font-semibold">
                YOLO (You Only Look Once)
              </span>
              , model deteksi objek real-time yang cepat dan akurat dalam
              mendeteksi kendaraan hanya dengan satu proses pemindaian.
            </p>
          </div>

          {/* CCTV */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 hover:shadow-xl transition-all border border-gray-700">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              📷 CCTV V380
            </h3>
            <p className="leading-relaxed text-sm">
              <span className="text-white font-semibold">V380</span> adalah
              kamera IP berbasis RTSP yang terhubung melalui jaringan WiFi/LAN.
              Cocok untuk integrasi pemantauan deteksi objek secara langsung dan
              aman.
            </p>
          </div>

          {/* ESP32-CAM */}
          <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 hover:shadow-xl transition-all border border-gray-700">
            <h3 className="text-xl font-bold text-blue-400 mb-3">
              🔌 ESP32-CAM
            </h3>
            <p className="leading-relaxed text-sm">
              <span className="text-white font-semibold">ESP32-CAM</span> adalah
              modul kecil dengan kamera yang hemat energi dan dapat mengirim
              gambar/video melalui WiFi. Ideal untuk pemantauan di lokasi
              terpencil atau berbasis IoT.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
