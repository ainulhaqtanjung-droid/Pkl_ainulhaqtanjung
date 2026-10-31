-- ============================================================
-- Database: db_material_kut
-- Sistem Material PT Kinarya Utama Teknik (Regional Sumbagut)
-- ============================================================

CREATE DATABASE IF NOT EXISTS db_material_kut
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE db_material_kut;

-- -----------------------------------------------------------
-- Tabel: pengguna
-- -----------------------------------------------------------
DROP TABLE IF EXISTS material_keluar;
DROP TABLE IF EXISTS material_masuk;
DROP TABLE IF EXISTS material;
DROP TABLE IF EXISTS pengguna;

CREATE TABLE pengguna (
    id_pengguna   INT AUTO_INCREMENT PRIMARY KEY,
    nama          VARCHAR(100)  NOT NULL,
    username      VARCHAR(50)   NOT NULL UNIQUE,
    password      VARCHAR(255)  NOT NULL,
    role          ENUM('Kepala Operasional','Admin','Tim Lapangan') NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------------
-- Tabel: material
-- -----------------------------------------------------------
CREATE TABLE material (
    id_material    INT AUTO_INCREMENT PRIMARY KEY,
    kode_material  VARCHAR(20)  NOT NULL UNIQUE,
    nama_material  VARCHAR(100) NOT NULL,
    satuan         VARCHAR(20)  NOT NULL CHECK (satuan IN ('Meter','Roll','Unit','Pcs')),
    stok           INT          NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- -----------------------------------------------------------
-- Tabel: material_masuk
-- -----------------------------------------------------------
CREATE TABLE material_masuk (
    id_masuk      INT AUTO_INCREMENT PRIMARY KEY,
    id_material   INT          NOT NULL,
    id_pengguna   INT          NOT NULL,
    tanggal       DATE         NOT NULL,
    jumlah        INT          NOT NULL,
    keterangan    VARCHAR(255) DEFAULT NULL,
    CONSTRAINT fk_masuk_material  FOREIGN KEY (id_material)  REFERENCES material(id_material),
    CONSTRAINT fk_masuk_pengguna  FOREIGN KEY (id_pengguna)  REFERENCES pengguna(id_pengguna)
) ENGINE=InnoDB;

-- -----------------------------------------------------------
-- Tabel: material_keluar
-- -----------------------------------------------------------
CREATE TABLE material_keluar (
    id_keluar       INT AUTO_INCREMENT PRIMARY KEY,
    id_material     INT          NOT NULL,
    id_pengguna     INT          NOT NULL COMMENT 'pemohon',
    nama_pengambil  VARCHAR(100) NOT NULL,
    tanggal         DATE         NOT NULL,
    jumlah          INT          NOT NULL,
    keperluan       VARCHAR(255) NOT NULL,
    status          ENUM('Menunggu','Disetujui','Ditolak') NOT NULL DEFAULT 'Menunggu',
    id_admin        INT          DEFAULT NULL COMMENT 'admin yang ACC/tolak',
    tgl_acc         DATETIME     DEFAULT NULL,
    CONSTRAINT fk_keluar_material  FOREIGN KEY (id_material)  REFERENCES material(id_material),
    CONSTRAINT fk_keluar_pengguna  FOREIGN KEY (id_pengguna)  REFERENCES pengguna(id_pengguna),
    CONSTRAINT fk_keluar_admin     FOREIGN KEY (id_admin)     REFERENCES pengguna(id_pengguna)
) ENGINE=InnoDB;

-- ============================================================
-- DATA CONTOH
-- ============================================================

-- ============================================================
-- PENGGUNA (DATA LOGIN)
-- Password disimpan dalam teks biasa (plain text) agar mudah dibaca & diuji:
-- 1. admin    -> Password: admin123   (Role: Admin)
-- 2. petugas  -> Password: petugas123 (Role: Tim Lapangan)
-- 3. kepala   -> Password: kepala123  (Role: Kepala Operasional)
-- 4. lapangan -> Password: lapangan123(Role: Tim Lapangan)
-- 5. admin2   -> Password: admin123   (Role: Admin)
-- ============================================================
INSERT INTO pengguna (nama, username, password, role) VALUES
('Ir. Budi Santoso',    'kepala',   'kepala123',   'Kepala Operasional'),
('Rina Marlina',        'admin',    'admin123',    'Admin'),
('Ahmad Fauzi',         'petugas',  'petugas123',  'Tim Lapangan'),
('Dedi Kurniawan',      'lapangan', 'lapangan123', 'Tim Lapangan'),
('Siti Aminah',         'admin2',   'admin123',    'Admin');

-- Material
INSERT INTO material (kode_material, nama_material, satuan, stok) VALUES
('KBL-FO-001', 'Kabel Fiber Optik 12 Core',    'Meter', 2500),
('KBL-FO-002', 'Kabel Fiber Optik 24 Core',    'Meter', 1800),
('KBL-PW-001', 'Kabel Power ACSR 70mm',        'Meter', 3200),
('KBL-PW-002', 'Kabel Power NYY 4x16mm',       'Meter', 1500),
('MDL-RD-001', 'Modul Radio RRU 2100MHz',       'Unit',  25),
('MDL-RD-002', 'Modul Radio RRU 1800MHz',       'Unit',  18),
('CPR-001',    'CPRI Cable 10m',                'Pcs',   40),
('CPR-002',    'CPRI Cable 20m',                'Pcs',   30),
('BAT-001',    'Baterai VRLA 12V 100Ah',        'Unit',  50),
('BAT-002',    'Baterai Lithium 48V 100Ah',     'Unit',  12),
('MOP-001',    'Konektor SC/APC',               'Pcs',   200),
('MOP-002',    'Patch Cord FO 3m',              'Pcs',   150),
('MOP-003',    'Clamp Suspension ADSS',         'Pcs',   5),
('MOP-004',    'Splice Closure 96 Core',        'Unit',  8);

-- Material Masuk
INSERT INTO material_masuk (id_material, id_pengguna, tanggal, jumlah, keterangan) VALUES
(1,  2, '2026-09-01', 500,  'Pengadaan dari PT Telkom Q3'),
(3,  2, '2026-09-03', 1000, 'Penerimaan dari vendor PLN'),
(5,  2, '2026-09-05', 10,   'Pengiriman dari gudang pusat Jakarta'),
(7,  2, '2026-09-10', 20,   'Pembelian langsung ke distributor'),
(9,  2, '2026-09-12', 25,   'Pengadaan baterai backup site'),
(11, 2, '2026-09-15', 100,  'Restock konektor dari Surabaya'),
(2,  5, '2026-09-20', 300,  'Pengadaan FO 24 core proyek baru'),
(4,  5, '2026-09-22', 500,  'Penerimaan kabel power site baru'),
(6,  5, '2026-09-25', 8,    'Modul radio untuk upgrade site'),
(8,  5, '2026-10-01', 15,   'CPRI cable tambahan'),
(10, 2, '2026-10-05', 5,    'Baterai lithium dari distributor'),
(12, 2, '2026-10-08', 50,   'Patch cord tambahan'),
(13, 5, '2026-10-10', 20,   'Clamp suspension restock'),
(14, 5, '2026-10-12', 5,    'Splice closure pengadaan baru');

-- Material Keluar (dengan berbagai status)
INSERT INTO material_keluar (id_material, id_pengguna, nama_pengambil, tanggal, jumlah, keperluan, status, id_admin, tgl_acc) VALUES
(1,  3, 'Ahmad Fauzi',     '2026-09-15', 200,  'Penarikan FO ke site Medan Baru',       'Disetujui', 2, '2026-09-15 10:30:00'),
(3,  3, 'Ahmad Fauzi',     '2026-09-18', 500,  'Instalasi kabel power tower Deli Serdang','Disetujui', 2, '2026-09-18 14:00:00'),
(5,  4, 'Dedi Kurniawan',  '2026-09-20', 3,    'Pemasangan RRU site Binjai',             'Disetujui', 2, '2026-09-20 09:15:00'),
(7,  3, 'Ahmad Fauzi',     '2026-09-22', 5,    'Koneksi CPRI site Tebing Tinggi',        'Disetujui', 5, '2026-09-22 11:00:00'),
(9,  4, 'Dedi Kurniawan',  '2026-10-01', 10,   'Penggantian baterai site Kisaran',       'Disetujui', 2, '2026-10-01 13:45:00'),
(11, 3, 'Ahmad Fauzi',     '2026-10-05', 30,   'Konektor untuk splicing site Pematang Siantar','Disetujui', 5, '2026-10-05 08:30:00'),
(2,  4, 'Dedi Kurniawan',  '2026-10-08', 150,  'Penarikan FO 24C rute baru Parapat',     'Disetujui', 2, '2026-10-08 10:00:00'),
(13, 3, 'Ahmad Fauzi',     '2026-10-10', 8,    'Clamp untuk jalur ADSS Sibolga',         'Menunggu',  NULL, NULL),
(6,  4, 'Dedi Kurniawan',  '2026-10-12', 5,    'Upgrade modul radio site Rantau Prapat',  'Menunggu',  NULL, NULL),
(14, 3, 'Ahmad Fauzi',     '2026-10-13', 3,    'Splice closure jalur backbone',           'Menunggu',  NULL, NULL),
(4,  4, 'Dedi Kurniawan',  '2026-10-14', 200,  'Instalasi power site baru Padang Sidempuan','Menunggu', NULL, NULL),
(12, 3, 'Ahmad Fauzi',     '2026-10-14', 20,   'Patch cord untuk aktivasi pelanggan',     'Ditolak',  2, '2026-10-14 16:00:00');
