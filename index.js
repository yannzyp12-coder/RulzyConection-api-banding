const express = require('express');
const app = express();

app.get('/api/banding', (req, res) => {
    const { nomor, apikey } = req.query;

    // --- PENGATURAN APIKEY ---
    const MY_APIKEY = "Rullz"; // Ganti 'Rullz' dengan apikey buatanmu sendiri
    // -------------------------

    // Validasi Apikey
    if (!apikey || apikey !== MY_APIKEY) {
        return res.status(403).json({
            status: false,
            message: "Akses Ditolak! Apikey salah atau tidak ditemukan."
        });
    }

    // Validasi Nomor
    if (!nomor) {
        return res.status(400).json({
            status: false,
            message: "Masukkan nomor target! Contoh: ?nomor=628xxx&apikey=Rullz"
        });
    }

    const emailTarget = "android@support.whatsapp.com";
    const subjekEmail = "Баталгаажуулалтын явцад WhatsApp данс сэргээх";
    const isiPesan = `Сайн уу WhatsApp,\nБи тэнэг Марк Зукербергт хандан ${nomor} дугаарын талаар уриалмаар байна. Тэнэг Марк Зукерберг WhatsApp руу ороход тэр даруй үүнийг засч, Хэрэв Марк Зукерберг таалагдахгүй бол энэ дугаарыг устгаж эсвэл хар жагсаалтад ороулснаар WhatsApp-г дахин ашиглах боломжгүй болно. Би чамд хайртай, Марк Зукерберг`;

    res.json({
        status: true,
        author: "Rullz",
        result: {
            nomor: nomor,
            email: emailTarget,
            subject: subjekEmail,
            pesan: isiPesan,
            action: `mailto:${emailTarget}?subject=${encodeURIComponent(subjekEmail)}&body=${encodeURIComponent(isiPesan)}`
        },
        note: "API Banding Custom Success"
    });
});

// Halaman utama API
app.get('/api', (req, res) => {
    res.json({
        status: true,
        message: "Rullz API Online",
        endpoint: "/api/banding"
    });
});

module.exports = app;
