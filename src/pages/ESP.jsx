import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

const ESP = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [snapshotByDate, setSnapshotByDate] = useState(null);
  const [searching, setSearching] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const imageRef = useRef(null);
  const espCamUrl = "http://192.168.102.127/capture";

  // Function to get total count of images in 'kendaraan' collection
  const getTotalImages = async () => {
    try {
      const snapshotRef = collection(db, "kendaraan");
      const snapshotDocs = await getDocs(snapshotRef);
      setTotalImages(snapshotDocs.size);
    } catch (error) {
      console.error("Error getting total images:", error);
    }
  };

  // Get total images on component mount and after upload
  useEffect(() => {
    getTotalImages();
  }, []);

  // Fungsi tangkap gambar dari ESP terus upload ke Cloudinary terus tambah ke Firestore
  const captureAndUpload = async (isAutomatic = false) => {
    try {
      setUploading(true);

      const response = await fetch(espCamUrl);
      const blob = await response.blob();
      const file = new File([blob], "capture.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kendaraan");
      formData.append("cloud_name", "drlagnver");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/drlagnver/image/upload",
        formData
      );

      const uploadedImageUrl = uploadRes.data.secure_url;
      setImageUrl(uploadedImageUrl);

      if (isAutomatic) {
        const today = new Date();
        const tanggal = today.toISOString().split("T")[0];

        await addDoc(collection(db, "snapshot_harian"), {
          judul: "Snapshot Harian",
          gambar: uploadedImageUrl,
          tanggal: tanggal,
          createdAt: today,
        });
      } else {
        await addDoc(collection(db, "kendaraan"), {
          judul: "Snapshot dari ESP32-CAM",
          gambar: uploadedImageUrl,
          createdAt: new Date(),
        });
        // Update total images count after upload
        await getTotalImages();
      }

      if (!isAutomatic) alert("✅ Gambar berhasil diunggah dan disimpan!");
    } catch (error) {
      console.error("❌ Gagal:", error);
      if (!isAutomatic) alert("❌ Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  // Fungsi menampilkan gambar yang dicari per tanggal
  const handleCariSnapshot = async () => {
    setSearching(true);
    setSnapshotByDate(null);
    try {
      const snapshotRef = collection(db, "kendaraan");
      const snapshotDocs = await getDocs(snapshotRef);
      const results = snapshotDocs.docs
        .map((doc) => {
          const data = doc.data();
          const createdAt =
            data.createdAt?.toDate?.() || new Date(data.createdAt);
          const tanggal = createdAt
            .toLocaleDateString("id-ID", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .split("/")
            .reverse()
            .join("-");
          return { ...data, tanggal };
        })
        .filter((item) => item.tanggal === selectedDate);

      setSnapshotByDate(results);
    } catch (error) {
      console.error("Gagal mengambil snapshot:", error);
    }
    setSearching(false);
  };

  return (
    <div className="flex bg-[#f1f5f9] min-h-screen">
      <main className="p-6 w-full">
        <motion.div
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-10 grid lg:grid-cols-2 gap-10 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Pantau Kamera</h1>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Total Gambar: {totalImages}
              </div>
            </div>
            <button
              onClick={() => captureAndUpload(false)}
              className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-xl"
              disabled={uploading}
            >
              {uploading ? "Mengunggah..." : "Ambil Gambar"}
            </button>

            <div className="space-y-2">
              <h2 className="font-semibold">Cari Snapshot Harian</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-4 py-2 rounded w-full"
              />
              <button
                onClick={handleCariSnapshot}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded w-full"
              >
                {searching ? "Mencari..." : "Cari Gambar"}
              </button>

              {snapshotByDate && snapshotByDate.length > 0 ? (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {snapshotByDate.map((item, index) => (
                    <Card
                      key={index}
                      className="w-full shadow-md cursor-pointer hover:shadow-lg transition"
                      onClick={() => {
                        setImageUrl(item.gambar);
                      }}
                    >
                      <CardHeader floated={false} color="blue-gray">
                        <img
                          src={item.gambar}
                          alt={`Snapshot ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h6"
                          color="blue-gray"
                          className="mb-2"
                        >
                          {new Date(
                            item.createdAt?.seconds * 1000
                          ).toLocaleString("id-ID")}
                        </Typography>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              ) : searching ? (
                <p className="text-center text-gray-500 mt-4">
                  Mencari snapshot...
                </p>
              ) : (
                snapshotByDate && (
                  <p className="text-center text-gray-500 mt-4">
                    Tidak ada snapshot pada tanggal ini.
                  </p>
                )
              )}
            </div>
          </div>

          {imageUrl && (
            <div className="space-y-4">
              <div className="relative aspect-square w-full border rounded-xl shadow">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Tangkapan Kamera"
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ESP;
