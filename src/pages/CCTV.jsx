import React, { useState } from "react";
import "@fontsource/poppins";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const CCTV = () => {
  const [mode, setMode] = useState(null);
  const [detectedVideo, setDetectedVideo] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [imagePredictions, setImagePredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/predict-video/cctv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal upload video");

      const data = await res.json();
      if (data.output_video) {
        setDetectedVideo(`${API_URL}${data.output_video}`);
      } else {
        alert("Video tidak terdeteksi.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mendeteksi video.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/predict-image/cctv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal upload gambar");

      const data = await res.json();
      setImagePredictions(data.predictions || []);
      setDetectedImage(URL.createObjectURL(file));
    } catch (err) {
      console.error(err);
      alert("Gagal mendeteksi gambar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins px-6 py-10">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">
        Deteksi Kendaraan dari CCTV
      </h2>

      {/* Mode Selector */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setMode("video")}
          className={`px-5 py-2 rounded-lg transition font-medium ${
            mode === "video"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Deteksi Video
        </button>
        <button
          onClick={() => setMode("image")}
          className={`px-5 py-2 rounded-lg transition font-medium ${
            mode === "image"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Deteksi Gambar
        </button>
      </div>

      {/* Progress */}
      {loading && (
        <div className="w-full max-w-md h-3 bg-gray-700 rounded-full overflow-hidden mb-4">
          <div className="h-full w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 animate-pulse"></div>
        </div>
      )}

      {/* Mode: Video */}
      {mode === "video" && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Unggah Video untuk Deteksi</h3>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold">
              Pilih File Video
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          </div>

          {detectedVideo && (
            <div className="mt-4">
              <video
                src={detectedVideo}
                controls
                className="w-full max-w-3xl rounded-lg shadow-lg mb-3"
              />
              <a
                href={detectedVideo}
                download
                className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                ⬇️ Unduh Hasil Video
              </a>
            </div>
          )}
        </div>
      )}

      {/* Mode: Image */}
      {mode === "image" && (
        <div className="space-y-4 mt-6">
          <h3 className="text-xl font-semibold">Unggah Gambar untuk Deteksi</h3>
          <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold">
            Pilih File Gambar
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {detectedImage && (
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <div>
                <img
                  src={detectedImage}
                  alt="Detected"
                  className="max-w-md rounded-lg border border-gray-700"
                />
                <a
                  href={detectedImage}
                  download="detected_image.jpg"
                  className="inline-block mt-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  ⬇️ Unduh Gambar
                </a>
              </div>
              <ul className="text-sm">
                {imagePredictions.map((pred, idx) => (
                  <li key={idx}>
                    <span className="text-white font-semibold">
                      {pred.class}
                    </span>{" "}
                    - {(pred.confidence * 100).toFixed(1)}%
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CCTV;
