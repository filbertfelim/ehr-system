"use strict";

const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");

const admin = require("./enrollAdmin.js");
const user = require("./registerUser.js");
const query = require("./query.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { PinataSDK } = require("pinata");

const pinata = new PinataSDK({
  pinataJwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjExNzcyZS0yMTVjLTQ3MzItOWJiYy01M2M2NDk1NGIyYWEiLCJlbWFpbCI6ImZpbGJlcnRmZWxpbTk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJjNWY1ZjA2ODM4M2RlNDhkMWJlZCIsInNjb3BlZEtleVNlY3JldCI6IjJmMGQ1MTU5ODg5ZDJiMzdmNTJkZWRkYjZlOWVlZmIwYjFmYThjYTgwNTBhZjM3NTcyYTM0MzBiMWExOTM4MzIiLCJleHAiOjE3NzYyMzgzNDh9.11POpS65it9NODaWoTqcgfwak-1TE5MWqxCtALBhigE",
  pinataGateway: "plum-permanent-wasp-625.mypinata.cloud",
});

async function init() {
  app.use(cors());
  app.use(express.json());

  await connect();

  app.get("/", (req, res) => res.send("Hello World!"));

  app.post("/admin/addAdmin", (req, res) => admin_addAdmin(req, res));
  app.post("/admin/addPatient", (req, res) => admin_addPatient(req, res));
  app.post("/admin/addDoctor", (req, res) => admin_addDoctor(req, res));

  app.post("/patient/getDoctorEmailWithAccess", (req, res) =>
    patient_getDoctorEmailWithAccess(req, res)
  );
  app.post("/patient/getPatientEmr", (req, res) =>
    patient_getPatientEmr(req, res)
  );
  app.post("/patient/grantDoctorReadAccess", (req, res) =>
    patient_grantDoctorReadAccess(req, res)
  );
  app.post("/patient/grantDoctorReadWriteAccess", (req, res) =>
    patient_grantDoctorReadWriteAccess(req, res)
  );
  app.post("/patient/revokeDoctorReadWriteAccess", (req, res) =>
    patient_revokeDoctorReadWriteAccess(req, res)
  );
  app.post("/patient/revokeDoctorWriteAccess", (req, res) =>
    patient_revokeDoctorWriteAccess(req, res)
  );

  app.post("/doctor/getAllAccessiblePatientEmr", (req, res) =>
    doctor_getAllAccessiblePatientEmr(req, res)
  );
  app.post("/doctor/getPatientEmailWithAccess", (req, res) =>
    doctor_getPatientEmailWithAccess(req, res)
  );
  app.post("/doctor/addNewEmr", (req, res) => doctor_addNewEmr(req, res));

  app.listen(3000, () =>
    console.log(`EMR Management App listening on port 3000`)
  );
}
async function connect() {
  const userTypes = ["admin1", "doctor", "patient"];
  await admin.enrollAdmin("admin");

  // Comment out the following line to prevent registering users after first run
  for (const userType of userTypes) {
    await user.registerUser(userType);
  }
}
async function admin_addAdmin(req, res) {
  try {
    await query.initialize("admin1");
    const result = await query.admin_addAdmin(
      req.body.name,
      req.body.email,
      req.body.adderEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: admin_addAdmin: ${error}`);
  }
}
async function admin_addPatient(req, res) {
  try {
    await query.initialize("admin1");
    const result = await query.admin_addPatient(
      req.body.name,
      req.body.email,
      req.body.address,
      req.body.adderEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: admin_addPatient: ${error}`);
  }
}
async function admin_addDoctor(req, res) {
  try {
    await query.initialize("admin1");
    const result = await query.admin_addDoctor(
      req.body.name,
      req.body.email,
      req.body.specialist,
      req.body.adderEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: admin_addDoctor: ${error}`);
  }
}
async function patient_getDoctorEmailWithAccess(req, res) {
  try {
    await query.initialize("patient");
    const result = await query.patient_getDoctorEmailWithAccess(req.body.email);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: patient_getDoctorEmailWithAccess: ${error}`);
  }
}
async function patient_getPatientEmr(req, res) {
  try {
    await query.initialize("patient");
    const result = await query.patient_getPatientEmr(req.body.email);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: patient_getPatientEmr: ${error}`);
  }
}
async function patient_grantDoctorReadAccess(req, res) {
  try {
    await query.initialize("patient");
    const result = await query.patient_grantDoctorReadAccess(
      req.body.patientEmail,
      req.body.doctorEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: patient_grantDoctorReadAccess: ${error}`);
  }
}
async function patient_grantDoctorReadWriteAccess(req, res) {
  try {
    await query.initialize("patient");
    const result = await query.patient_grantDoctorReadWriteAccess(
      req.body.patientEmail,
      req.body.doctorEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: patient_grantDoctorReadWriteAccess: ${error}`);
  }
}
async function patient_revokeDoctorReadWriteAccess(req, res) {
  try {
    await query.initialize("patient");
    const result = await query.patient_revokeDoctorReadWriteAccess(
      req.body.patientEmail,
      req.body.doctorEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: patient_revokeDoctorReadWriteAccess: ${error}`);
  }
}
async function patient_revokeDoctorWriteAccess(req, res) {
  try {
    await query.initialize("patient");
    const result = await query.patient_revokeDoctorWriteAccess(
      req.body.patientEmail,
      req.body.doctorEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: patient_revokeDoctorWriteAccess: ${error}`);
  }
}
async function doctor_getAllAccessiblePatientEmr(req, res) {
  try {
    await query.initialize("doctor");
    const result = await query.doctor_getAllAccessiblePatientEmr(
      req.body.doctorEmail,
      req.body.patientEmail
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: doctor_getAllAccessiblePatientEmr: ${error}`);
  }
}
async function doctor_getPatientEmailWithAccess(req, res) {
  try {
    await query.initialize("doctor");
    const result = await query.doctor_getPatientEmailWithAccess(req.body.email);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: doctor_getPatientEmailWithAccess: ${error}`);
  }
}
async function doctor_addNewEmr(req, res) {
  try {
    await query.initialize("doctor");
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).send(`Error uploading file: ${err}`);
      }

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).send("No image file uploaded");
      }

      const imageBuffer = req.file.buffer;
      const imageName = req.file.originalname;

      // Convert buffer to Blob (this is important)
      const imageBlob = new File([imageBuffer], imageName, {
        type: req.file.mimetype,
      });

      const upload = await pinata.upload.public.file(imageBlob);

      console.log("Image uploaded to Pinata with res:", upload);

      // Pass the imageHash to the blockchain contract to store it with the EMR details
      const result = await query.doctor_addNewEmr(
        req.body.doctorEmail,
        req.body.patientEmail,
        req.body.emrId,
        req.body.description,
        upload.cid
      );

      // Send back the result
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
    console.error(`error: doctor_addNewEmr: ${error}`);
  }
}

init();
