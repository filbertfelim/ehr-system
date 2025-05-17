# EMR Management System dengan Hyperledger Fabric

## Introduction

Proyek ini mengimplementasikan sistem Rekam Medis Elektronik (EMR) yang aman dan terdesentralisasi menggunakan _Hyperledger Fabric_, sebuah _framework_ _permissioned blockchain_. Dirancang khusus untuk kebutuhan rumah sakit dan klinik, sistem ini menjamin:

1. Manajemen akses berbasis peran (pasien, dokter, admin) melalui identitas _MSP Fabric_.

2. Catatan medis anti perubahan yang tersimpan di _ledger blockchain_.

3. Audit transparan untuk semua perubahan data.

4. Privasi pasien dengan kontrol akses granular (misal: pasien bisa mengatur izin dokter terhadap data rekam medis pasien).

## Cara menjalankan

1.  **Clone repository:**

```bash
git clone https://github.com/filbertfelim/ehr-system.git
```

2.  **Navigasi ke test-network directory:**

```bash
cd ehr-system/fabric-samples/test-network
```

3.  **Jalankan command di bawah untuk menjalankan jaringan dan _chaincode deployment_**

```bash
./network.sh down

./network.sh up createChannel -ca -s couchdb

./deploymentScript.sh
```

4.  **Navigasi ke _directory backend_ dan _install module_ yang diperlukan**

```bash
cd ../backend
npm install
```

5.  **_Enroll admin_ CA, _register_ dan _enroll_ user pasien, dokter, dan _admin_ rumah sakit, serta jalankan aplikasi:**

```bash
node enrollAdmin.js

node registerUser.js

node app.js
```

6.  **Navigasi ke _directory frontend_**

```bash
cd ../frontend
```

7.  **Jalankan frontend**

```
http-server
```
