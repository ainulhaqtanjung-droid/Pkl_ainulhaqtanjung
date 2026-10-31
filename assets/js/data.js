/**
 * data.js – Data Tiruan (Mock Data)
 * Nama tabel & kolom sama persis dengan database MySQL db_material_kut
 * Tahap 2: ganti dengan fetch() ke API PHP
 */

const MockDB = {
    // =========================================================
    // PENGGUNA
    // =========================================================
    pengguna: [
        { id_pengguna: 1, nama: 'Ir. Budi Santoso',  username: 'kepala',   password: 'kepala123',   role: 'Kepala Operasional' },
        { id_pengguna: 2, nama: 'Rina Marlina',       username: 'admin',    password: 'admin123',    role: 'Admin' },
        { id_pengguna: 3, nama: 'Ahmad Fauzi',        username: 'petugas',  password: 'petugas123',  role: 'Tim Lapangan' },
        { id_pengguna: 4, nama: 'Dedi Kurniawan',     username: 'lapangan', password: 'lapangan123', role: 'Tim Lapangan' },
        { id_pengguna: 5, nama: 'Siti Aminah',        username: 'admin2',   password: 'admin123',    role: 'Admin' },
    ],

    // =========================================================
    // MATERIAL
    // =========================================================
    material: [
        { id_material: 1,  kode_material: 'KBL-FO-001', nama_material: 'Kabel Fiber Optik 12 Core',  satuan: 'Meter', stok: 2500 },
        { id_material: 2,  kode_material: 'KBL-FO-002', nama_material: 'Kabel Fiber Optik 24 Core',  satuan: 'Meter', stok: 1800 },
        { id_material: 3,  kode_material: 'KBL-PW-001', nama_material: 'Kabel Power ACSR 70mm',      satuan: 'Meter', stok: 3200 },
        { id_material: 4,  kode_material: 'KBL-PW-002', nama_material: 'Kabel Power NYY 4x16mm',     satuan: 'Meter', stok: 1500 },
        { id_material: 5,  kode_material: 'MDL-RD-001', nama_material: 'Modul Radio RRU 2100MHz',    satuan: 'Unit',  stok: 25 },
        { id_material: 6,  kode_material: 'MDL-RD-002', nama_material: 'Modul Radio RRU 1800MHz',    satuan: 'Unit',  stok: 18 },
        { id_material: 7,  kode_material: 'CPR-001',    nama_material: 'CPRI Cable 10m',              satuan: 'Pcs',   stok: 40 },
        { id_material: 8,  kode_material: 'CPR-002',    nama_material: 'CPRI Cable 20m',              satuan: 'Pcs',   stok: 30 },
        { id_material: 9,  kode_material: 'BAT-001',    nama_material: 'Baterai VRLA 12V 100Ah',     satuan: 'Unit',  stok: 50 },
        { id_material: 10, kode_material: 'BAT-002',    nama_material: 'Baterai Lithium 48V 100Ah',  satuan: 'Unit',  stok: 12 },
        { id_material: 11, kode_material: 'MOP-001',    nama_material: 'Konektor SC/APC',             satuan: 'Pcs',   stok: 200 },
        { id_material: 12, kode_material: 'MOP-002',    nama_material: 'Patch Cord FO 3m',            satuan: 'Pcs',   stok: 150 },
        { id_material: 13, kode_material: 'MOP-003',    nama_material: 'Clamp Suspension ADSS',       satuan: 'Pcs',   stok: 5 },
        { id_material: 14, kode_material: 'MOP-004',    nama_material: 'Splice Closure 96 Core',      satuan: 'Unit',  stok: 8 },
    ],

    // =========================================================
    // MATERIAL MASUK
    // =========================================================
    material_masuk: [
        { id_masuk: 1,  id_material: 1,  id_pengguna: 2, tanggal: '2026-09-01', jumlah: 500,  keterangan: 'Pengadaan dari PT Telkom Q3' },
        { id_masuk: 2,  id_material: 3,  id_pengguna: 2, tanggal: '2026-09-03', jumlah: 1000, keterangan: 'Penerimaan dari vendor PLN' },
        { id_masuk: 3,  id_material: 5,  id_pengguna: 2, tanggal: '2026-09-05', jumlah: 10,   keterangan: 'Pengiriman dari gudang pusat Jakarta' },
        { id_masuk: 4,  id_material: 7,  id_pengguna: 2, tanggal: '2026-09-10', jumlah: 20,   keterangan: 'Pembelian langsung ke distributor' },
        { id_masuk: 5,  id_material: 9,  id_pengguna: 2, tanggal: '2026-09-12', jumlah: 25,   keterangan: 'Pengadaan baterai backup site' },
        { id_masuk: 6,  id_material: 11, id_pengguna: 2, tanggal: '2026-09-15', jumlah: 100,  keterangan: 'Restock konektor dari Surabaya' },
        { id_masuk: 7,  id_material: 2,  id_pengguna: 5, tanggal: '2026-09-20', jumlah: 300,  keterangan: 'Pengadaan FO 24 core proyek baru' },
        { id_masuk: 8,  id_material: 4,  id_pengguna: 5, tanggal: '2026-09-22', jumlah: 500,  keterangan: 'Penerimaan kabel power site baru' },
        { id_masuk: 9,  id_material: 6,  id_pengguna: 5, tanggal: '2026-09-25', jumlah: 8,    keterangan: 'Modul radio untuk upgrade site' },
        { id_masuk: 10, id_material: 8,  id_pengguna: 5, tanggal: '2026-10-01', jumlah: 15,   keterangan: 'CPRI cable tambahan' },
        { id_masuk: 11, id_material: 10, id_pengguna: 2, tanggal: '2026-10-05', jumlah: 5,    keterangan: 'Baterai lithium dari distributor' },
        { id_masuk: 12, id_material: 12, id_pengguna: 2, tanggal: '2026-10-08', jumlah: 50,   keterangan: 'Patch cord tambahan' },
        { id_masuk: 13, id_material: 13, id_pengguna: 5, tanggal: '2026-10-10', jumlah: 20,   keterangan: 'Clamp suspension restock' },
        { id_masuk: 14, id_material: 14, id_pengguna: 5, tanggal: '2026-10-12', jumlah: 5,    keterangan: 'Splice closure pengadaan baru' },
    ],

    // =========================================================
    // MATERIAL KELUAR
    // =========================================================
    material_keluar: [
        { id_keluar: 1,  id_material: 1,  id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-09-15', jumlah: 200, keperluan: 'Penarikan FO ke site Medan Baru',            status: 'Disetujui', id_admin: 2, tgl_acc: '2026-09-15 10:30:00' },
        { id_keluar: 2,  id_material: 3,  id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-09-18', jumlah: 500, keperluan: 'Instalasi kabel power tower Deli Serdang',    status: 'Disetujui', id_admin: 2, tgl_acc: '2026-09-18 14:00:00' },
        { id_keluar: 3,  id_material: 5,  id_pengguna: 4, nama_pengambil: 'Dedi Kurniawan', tanggal: '2026-09-20', jumlah: 3,   keperluan: 'Pemasangan RRU site Binjai',                  status: 'Disetujui', id_admin: 2, tgl_acc: '2026-09-20 09:15:00' },
        { id_keluar: 4,  id_material: 7,  id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-09-22', jumlah: 5,   keperluan: 'Koneksi CPRI site Tebing Tinggi',             status: 'Disetujui', id_admin: 5, tgl_acc: '2026-09-22 11:00:00' },
        { id_keluar: 5,  id_material: 9,  id_pengguna: 4, nama_pengambil: 'Dedi Kurniawan', tanggal: '2026-10-01', jumlah: 10,  keperluan: 'Penggantian baterai site Kisaran',            status: 'Disetujui', id_admin: 2, tgl_acc: '2026-10-01 13:45:00' },
        { id_keluar: 6,  id_material: 11, id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-10-05', jumlah: 30,  keperluan: 'Konektor untuk splicing site Pematang Siantar', status: 'Disetujui', id_admin: 5, tgl_acc: '2026-10-05 08:30:00' },
        { id_keluar: 7,  id_material: 2,  id_pengguna: 4, nama_pengambil: 'Dedi Kurniawan', tanggal: '2026-10-08', jumlah: 150, keperluan: 'Penarikan FO 24C rute baru Parapat',           status: 'Disetujui', id_admin: 2, tgl_acc: '2026-10-08 10:00:00' },
        { id_keluar: 8,  id_material: 13, id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-10-10', jumlah: 8,   keperluan: 'Clamp untuk jalur ADSS Sibolga',              status: 'Menunggu',  id_admin: null, tgl_acc: null },
        { id_keluar: 9,  id_material: 6,  id_pengguna: 4, nama_pengambil: 'Dedi Kurniawan', tanggal: '2026-10-12', jumlah: 5,   keperluan: 'Upgrade modul radio site Rantau Prapat',      status: 'Menunggu',  id_admin: null, tgl_acc: null },
        { id_keluar: 10, id_material: 14, id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-10-13', jumlah: 3,   keperluan: 'Splice closure jalur backbone',                status: 'Menunggu',  id_admin: null, tgl_acc: null },
        { id_keluar: 11, id_material: 4,  id_pengguna: 4, nama_pengambil: 'Dedi Kurniawan', tanggal: '2026-10-14', jumlah: 200, keperluan: 'Instalasi power site baru Padang Sidempuan',   status: 'Menunggu',  id_admin: null, tgl_acc: null },
        { id_keluar: 12, id_material: 12, id_pengguna: 3, nama_pengambil: 'Ahmad Fauzi',    tanggal: '2026-10-14', jumlah: 20,  keperluan: 'Patch cord untuk aktivasi pelanggan',          status: 'Ditolak',   id_admin: 2, tgl_acc: '2026-10-14 16:00:00' },
    ],

    // =========================================================
    // ID COUNTERS (auto-increment simulation)
    // =========================================================
    _nextId: {
        pengguna: 6,
        material: 15,
        material_masuk: 15,
        material_keluar: 13,
    },

    getNextId(table) {
        return this._nextId[table]++;
    }
};

// =========================================================
// HELPER FUNCTIONS (lookup / join)
// =========================================================

/**
 * Get material object by id
 */
function getMaterialById(id) {
    return MockDB.material.find(m => m.id_material === id);
}

/**
 * Get pengguna object by id
 */
function getPenggunaById(id) {
    return MockDB.pengguna.find(p => p.id_pengguna === id);
}

/**
 * Get material name by id
 */
function getNamaMaterial(id) {
    const m = getMaterialById(id);
    return m ? m.nama_material : '-';
}

/**
 * Get kode material by id
 */
function getKodeMaterial(id) {
    const m = getMaterialById(id);
    return m ? m.kode_material : '-';
}

/**
 * Get satuan by material id
 */
function getSatuanMaterial(id) {
    const m = getMaterialById(id);
    return m ? m.satuan : '-';
}

/**
 * Get user name by id
 */
function getNamaPengguna(id) {
    const p = getPenggunaById(id);
    return p ? p.nama : '-';
}

/**
 * Format date to Indonesian locale
 */
function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Format datetime
 */
function formatTanggalWaktu(dtStr) {
    if (!dtStr) return '-';
    const d = new Date(dtStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ' ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Format number with dots
 */
function formatAngka(n) {
    return n.toLocaleString('id-ID');
}

/**
 * Check if material has transactions
 */
function materialPunyaTransaksi(id) {
    const masuk = MockDB.material_masuk.some(m => m.id_material === id);
    const keluar = MockDB.material_keluar.some(m => m.id_material === id);
    return masuk || keluar;
}

/**
 * Threshold for low stock warning
 */
function isStokRendah(material) {
    if (material.satuan === 'Meter') return material.stok < 500;
    if (material.satuan === 'Roll')  return material.stok < 10;
    return material.stok < 10; // Unit, Pcs
}
