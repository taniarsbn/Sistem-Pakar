function diagnosis() {
    // Mengambil input dari form
    const makanBanyak = parseFloat(document.getElementById('makanBanyak').value);  // CF user untuk gejala makan banyak
    const seringKencing = parseFloat(document.getElementById('seringKencing').value);  // CF user untuk gejala sering kencing
    const penurunanBeratBadan = parseFloat(document.getElementById('penurunanBeratBadan').value);  // CF user untuk gejala penurunan berat badan
    const kesemutan = parseFloat(document.getElementById('kesemutan').value);  // CF user untuk gejala kesemutan
    const gatal = parseFloat(document.getElementById('gatal').value);  // CF user untuk gejala gatal-gatal
    const mataKabur = parseFloat(document.getElementById('mataKabur').value);  // CF user untuk gejala mata kabur
    const riwayatKeluarga = parseFloat(document.getElementById('riwayatKeluarga').value);  // CF user untuk gejala riwayat keluarga
    const konsumsiGula = parseFloat(document.getElementById('konsumsiGula').value);  // CF user untuk gejala konsumsi gula

    // Nilai MB dan MD untuk gejala-gejala tertentu berdasarkan data pakar
    const mbMakanBanyak = 1;
    const mbSeringKencing = 1;
    const mbPenurunanBeratBadan = 1;
    const mbKesemutan = 0.7;
    const mbGatal = 0.7;
    const mbMataKabur = 0.7;
    const mbRiwayatKeluarga = 0.7;
    const mbKonsumsiGula = 1;
    const md = 0.2;  // MD adalah 0.2 untuk semua gejala

    // Menghitung CF Pakar untuk setiap gejala (MB - MD)
    const cfPakarMakanBanyak = mbMakanBanyak - md;
    const cfPakarSeringKencing = mbSeringKencing - md;
    const cfPakarPenurunanBeratBadan = mbPenurunanBeratBadan - md;
    const cfPakarKesemutan = mbKesemutan - md;
    const cfPakarGatal = mbGatal - md;
    const cfPakarMataKabur = mbMataKabur - md;
    const cfPakarRiwayatKeluarga = mbRiwayatKeluarga - md;
    const cfPakarKonsumsiGula = mbKonsumsiGula - md;

    // Menghitung CF untuk setiap gejala (CF user * CF Pakar)
    const cfMakanBanyak = makanBanyak * cfPakarMakanBanyak;
    const cfSeringKencing = seringKencing * cfPakarSeringKencing;
    const cfPenurunanBeratBadan = penurunanBeratBadan * cfPakarPenurunanBeratBadan;
    const cfKesemutan = kesemutan * cfPakarKesemutan;
    const cfGatal = gatal * cfPakarGatal;
    const cfMataKabur = mataKabur * cfPakarMataKabur;
    const cfRiwayatKeluarga = riwayatKeluarga * cfPakarRiwayatKeluarga;
    const cfKonsumsiGula = konsumsiGula * cfPakarKonsumsiGula;

    // Kombinasikan CF dari semua gejala
    let cfTotal = cfMakanBanyak;

    cfTotal = combineCF(cfTotal, cfSeringKencing);
    cfTotal = combineCF(cfTotal, cfPenurunanBeratBadan);
    cfTotal = combineCF(cfTotal, cfKesemutan);
    cfTotal = combineCF(cfTotal, cfGatal);
    cfTotal = combineCF(cfTotal, cfMataKabur);
    cfTotal = combineCF(cfTotal, cfRiwayatKeluarga);
    cfTotal = combineCF(cfTotal, cfKonsumsiGula);

    // Membatasi CF agar tidak melebihi 1
    cfTotal = Math.min(cfTotal, 1);

    // Menampilkan hasil diagnosis
    const resultDiv = document.getElementById('result');
    if (cfTotal > 0) {
        resultDiv.innerHTML = `Diagnosis: Kemungkinan Anda menderita diabetes dengan tingkat kepastian: ${(cfTotal * 100).toFixed(2)}%`;
    } else {
        resultDiv.innerHTML = "Diagnosis: Tidak ada gejala yang cukup untuk mendeteksi diabetes.";
    }
}

// Fungsi untuk mengkombinasikan Certainty Factor antara dua gejala
function combineCF(cf1, cf2) {
    return cf1 + cf2 * (1 - cf1);
}
