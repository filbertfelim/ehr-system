"use strict";

const { Contract } = require("fabric-contract-api");

class Patient {
  constructor(name, email, address, createdDate, adderEmail) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.doctorAccess = {};
    this.ownedEMRs = [];
    this.createdDate = createdDate;
    this.adderEmail = adderEmail;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
  getAddress() {
    return this.address;
  }
  setAddress(address) {
    this.address = address;
  }
  getAdderEmail() {
    return this.adderEmail;
  }
  setAdderEmail(adderEmail) {
    this.adderEmail = adderEmail;
  }
  getCreatedDate() {
    return this.createdDate;
  }
  setCreatedDate(createdDate) {
    this.createdDate = createdDate;
  }
  grantReadAccessToDoctor(doctorEmail) {
    if (!this.doctorAccess[doctorEmail]) {
      this.doctorAccess[doctorEmail] = { read: true, write: false };
    } else {
      this.doctorAccess[doctorEmail].read = true;
    }
  }
  grantReadWriteAccessToDoctor(doctorEmail) {
    if (!this.doctorAccess[doctorEmail]) {
      this.doctorAccess[doctorEmail] = { read: true, write: true };
    } else {
      this.doctorAccess[doctorEmail].read = true;
      this.doctorAccess[doctorEmail].write = true;
    }
  }
  revokeReadWriteAccessFromDoctor(doctorEmail) {
    if (this.doctorAccess[doctorEmail]) {
      delete this.doctorAccess[doctorEmail];
    }
  }
  revokeWriteAccessFromDoctor(doctorEmail) {
    if (this.doctorAccess[doctorEmail]) {
      this.doctorAccess[doctorEmail].write = false;
    }
  }
  getDoctorAccess(doctorEmail) {
    return this.doctorAccess[doctorEmail];
  }
  addEMR(emrId) {
    this.ownedEMRs.push(emrId);
  }
  getOwnedEMRs() {
    return this.ownedEMRs;
  }
  static deserialize(data) {
    const patient = new Patient(
      data.name,
      data.email,
      data.address,
      data.createdDate,
      data.adderEmail
    );
    patient.doctorAccess = data.doctorAccess || {};
    patient.ownedEMRs = data.ownedEMRs || [];
    return patient;
  }
}
class Admin {
  constructor(name, email, createdDate, adderEmail) {
    this.name = name;
    this.email = email;
    this.createdDate = createdDate;
    this.adderEmail = adderEmail;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
  getAdderEmail() {
    return this.adderEmail;
  }
  setAdderEmail(adderEmail) {
    this.adderEmail = adderEmail;
  }
  getCreatedDate() {
    return this.createdDate;
  }
  setCreatedDate(createdDate) {
    this.createdDate = createdDate;
  }
  static deserialize(data) {
    return new Admin(data.name, data.email, data.createdDate, data.adderEmail);
  }
}
class Doctor {
  constructor(name, email, specialist, createdDate, adderEmail) {
    this.name = name;
    this.email = email;
    this.specialist = specialist;
    this.patientAccess = {};
    this.createdDate = createdDate;
    this.adderEmail = adderEmail;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    this.name = name;
  }
  getEmail() {
    return this.email;
  }
  setEmail(email) {
    this.email = email;
  }
  getSpecialist() {
    return this.specialist;
  }
  setSpecialist(specialist) {
    this.specialist = specialist;
  }
  getCreatedDate() {
    return this.createdDate;
  }
  setCreatedDate(createdDate) {
    this.createdDate = createdDate;
  }
  getAdderEmail() {
    return this.adderEmail;
  }
  setAdderEmail(adderEmail) {
    this.adderEmail = adderEmail;
  }
  getPatientAccess(patientEmail) {
    return this.patientAccess[patientEmail];
  }
  grantReadPatientAccess(patientEmail) {
    if (!this.patientAccess[patientEmail]) {
      this.patientAccess[patientEmail] = { read: true, write: false };
    } else {
      this.patientAccess[patientEmail].read = true;
    }
  }
  grantReadWritePatientAccess(patientEmail) {
    if (!this.patientAccess[patientEmail]) {
      this.patientAccess[patientEmail] = { read: true, write: true };
    } else {
      this.patientAccess[patientEmail].read = true;
      this.patientAccess[patientEmail].write = true;
    }
  }
  revokeReadWritePatientAccess(patientEmail) {
    if (this.patientAccess[patientEmail]) {
      delete this.patientAccess[patientEmail];
    }
  }
  revokeWritePatientAccess(patientEmail) {
    if (this.patientAccess[patientEmail]) {
      this.patientAccess[patientEmail].write = false;
    }
  }
  static deserialize(data) {
    const doctor = new Doctor(
      data.name,
      data.email,
      data.specialist,
      data.createdDate,
      data.adderEmail
    );
    doctor.patientAccess = data.patientAccess || {};
    return doctor;
  }
}
class EMR {
  constructor(
    id,
    patientEmail,
    adderEmail,
    description,
    imageHash,
    createdDate
  ) {
    this.id = id;
    this.patientEmail = patientEmail;
    this.adderEmail = adderEmail;
    this.description = description;
    this.imageHash = imageHash;
    this.createdDate = createdDate;
  }

  getId() {
    return this.id;
  }

  getPatientEmail() {
    return this.patientEmail;
  }

  getAdderEmail() {
    return this.adderEmail;
  }

  getDescription() {
    return this.description;
  }

  getImageHash() {
    return this.imageHash;
  }

  getCreatedDate() {
    return this.createdDate;
  }

  setId(id) {
    this.id = id;
  }

  setPatientEmail(patientEmail) {
    this.patientEmail = patientEmail;
  }

  setAdderEmail(adderEmail) {
    this.adderEmail = adderEmail;
  }

  setDescription(description) {
    this.description = description;
  }

  setImageHash(imageHash) {
    this.imageHash = imageHash;
  }

  static deserialize(data) {
    return new EMR(
      data.id,
      data.patientEmail,
      data.adderEmail,
      data.description,
      data.imageHash,
      data.createdDate
    );
  }
}

class EMRContract extends Contract {
  async initLedger(ctx) {
    // Create a new Admin object
    const admin = new Admin(
      "First admin",
      "admin@gmail.com",
      new Date().toISOString().slice(0, 10),
      "system@gmail.com"
    );

    // Create the composite key for Admin (we use email as the unique key)
    const key = ctx.stub.createCompositeKey("Admin", ["admin@gmail.com"]);

    // Store the Admin object in the ledger (no checking if it exists)
    await ctx.stub.putState(key, Buffer.from(JSON.stringify(admin)));

    console.info(
      "Admin with email: admin@gmail.com has been added to the ledger successfully"
    );

    // Return success message
    return "Admin with email: admin@gmail.com has been added to the ledger successfully";
  }

  // Admin functions
  async addAdmin(ctx, name, email, adderEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const adminPart = parts.find((part) => part.startsWith("CN="));
    const adminName = adminPart.split("=")[1].split("::")[0];
    if (adminName !== "admin1") {
      throw new Error(`Adder with email: ${adderEmail} is not a valid admin`);
    }
    let adderKey = ctx.stub.createCompositeKey("Admin", [adderEmail]);
    const adderAsBytes = await ctx.stub.getState(adderKey);

    // If adder's email does not exist in the state, they are not an admin
    if (!adderAsBytes || adderAsBytes.length === 0) {
      throw new Error(`Adder with email: ${adderEmail} is not a valid admin`);
    }

    let key = ctx.stub.createCompositeKey("Admin", [email]);
    const adminAsBytes = await ctx.stub.getState(key);
    if (adminAsBytes && adminAsBytes.length > 0) {
      throw new Error(`Admin with email: ${email} already exists`);
    }

    const newAdmin = new Admin(
      name,
      email,
      new Date().toISOString().slice(0, 10),
      adderEmail
    );

    await ctx.stub.putState(key, Buffer.from(JSON.stringify(newAdmin)));

    ctx.stub.setEvent(
      "addAdminSuccess",
      Buffer.from(
        JSON.stringify({
          status: "success",
          email: email,
          adderEmail: adderEmail,
          callerIdentity: callerIdentity,
        })
      )
    );

    return `Admin with email ${email} has been successfully added.`;
  }
  async addPatient(ctx, name, email, address, adderEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const adminPart = parts.find((part) => part.startsWith("CN="));
    const adminName = adminPart.split("=")[1].split("::")[0];
    if (adminName !== "admin1") {
      throw new Error(`Adder with email: ${adderEmail} is not a valid admin`);
    }

    let adderKey = ctx.stub.createCompositeKey("Admin", [adderEmail]);
    const adderAsBytes = await ctx.stub.getState(adderKey);

    // If adder's email does not exist in the state, they are not an admin
    if (!adderAsBytes || adderAsBytes.length === 0) {
      throw new Error(`Adder with email: ${adderEmail} is not a valid admin`);
    }

    let key = ctx.stub.createCompositeKey("Patient", [email]);
    const patientAsBytes = await ctx.stub.getState(key);
    if (patientAsBytes && patientAsBytes.length > 0) {
      throw new Error(`Patient with email: ${email} already exists`);
    }

    const newPatient = new Patient(
      name,
      email,
      address,
      new Date().toISOString().slice(0, 10),
      adderEmail
    );

    await ctx.stub.putState(key, Buffer.from(JSON.stringify(newPatient)));

    ctx.stub.setEvent(
      "addPatientSuccess",
      Buffer.from(
        JSON.stringify({
          status: "success",
          email: email,
          adderEmail: adderEmail,
          callerIdentity: callerIdentity,
        })
      )
    );

    return `Patient with email ${email} has been successfully added.`;
  }
  async addDoctor(ctx, name, email, specialist, adderEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const adminPart = parts.find((part) => part.startsWith("CN="));
    const adminName = adminPart.split("=")[1].split("::")[0];
    if (adminName !== "admin1") {
      throw new Error(`Adder with email: ${adderEmail} is not a valid admin`);
    }

    let adderKey = ctx.stub.createCompositeKey("Admin", [adderEmail]);
    const adderAsBytes = await ctx.stub.getState(adderKey);

    // If adder's email does not exist in the state, they are not an admin
    if (!adderAsBytes || adderAsBytes.length === 0) {
      throw new Error(`Adder with email: ${adderEmail} is not a valid admin`);
    }

    let key = ctx.stub.createCompositeKey("Doctor", [email]);
    const doctorAsBytes = await ctx.stub.getState(key);
    if (doctorAsBytes && doctorAsBytes.length > 0) {
      throw new Error(`Doctor with email: ${email} already exists`);
    }

    const newDoctor = new Doctor(
      name,
      email,
      specialist,
      new Date().toISOString().slice(0, 10),
      adderEmail
    );

    await ctx.stub.putState(key, Buffer.from(JSON.stringify(newDoctor)));

    ctx.stub.setEvent(
      "addDoctorSuccess",
      Buffer.from(
        JSON.stringify({
          status: "success",
          email: email,
          adderEmail: adderEmail,
          callerIdentity: callerIdentity,
        })
      )
    );

    return `Doctor with email ${email} has been successfully added.`;
  }

  // Patient functions

  // getDoctorEmailWithAccess
  async getDoctorEmailWithAccess(ctx, email) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "patient") {
      throw new Error(`Email: ${email} is not a valid patient`);
    }

    let key = ctx.stub.createCompositeKey("Patient", [email]);
    const patientAsBytes = await ctx.stub.getState(key);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${email} does not exist`);
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const accessList = Object.entries(patient.doctorAccess).map(
      ([doctorEmail, access]) => ({
        doctorEmail,
        read: access.read,
        write: access.write,
      })
    );

    const successLog = {
      status: "success",
      email: email,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
      accessList,
    };

    ctx.stub.setEvent(
      "getDoctorEmailWithAccessSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return accessList;
  }
  // getPatientEmr
  async getPatientEmr(ctx, email) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "patient") {
      throw new Error(`Email: ${email} is not a valid patient`);
    }

    let key = ctx.stub.createCompositeKey("Patient", [email]);
    const patientAsBytes = await ctx.stub.getState(key);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${email} does not exist`);
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const ownedEMRs = patient.getOwnedEMRs();
    const emrData = [];

    for (let emrId of ownedEMRs) {
      let emrKey = ctx.stub.createCompositeKey("EMR", [emrId]);
      const emrAsBytes = await ctx.stub.getState(emrKey);

      if (emrAsBytes && emrAsBytes.length > 0) {
        const emr = EMR.deserialize(JSON.parse(emrAsBytes.toString()));
        emrData.push(emr);
      }
    }

    const successLog = {
      status: "success",
      email: email,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
    };

    ctx.stub.setEvent(
      "getPatientEmrSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return emrData;
  }
  // grantDoctorReadAccess
  async grantDoctorReadAccess(ctx, patientEmail, doctorEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "patient") {
      throw new Error(`Email: ${patientEmail} is not a valid patient`);
    }

    let patientKey = ctx.stub.createCompositeKey("Patient", [patientEmail]);
    const patientAsBytes = await ctx.stub.getState(patientKey);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${patientEmail} does not exist`);
    }

    let doctorKey = ctx.stub.createCompositeKey("Doctor", [doctorEmail]);
    const doctorAsBytes = await ctx.stub.getState(doctorKey);

    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${doctorEmail} does not exist`);
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    patient.grantReadAccessToDoctor(doctorEmail);
    doctor.grantReadPatientAccess(patientEmail);

    await ctx.stub.putState(patientKey, Buffer.from(JSON.stringify(patient)));
    await ctx.stub.putState(doctorKey, Buffer.from(JSON.stringify(doctor)));

    const successLog = {
      status: "success",
      email: patientEmail,
      doctorEmail: doctorEmail,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
    };

    ctx.stub.setEvent(
      "grantDoctorReadAccessSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return `Doctor with email: ${doctorEmail} successfully given permission to read EMRs for patient with email: ${patientEmail}`;
  }
  // grantDoctorReadWriteAccess
  async grantDoctorReadWriteAccess(ctx, patientEmail, doctorEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "patient") {
      throw new Error(`Email: ${patientEmail} is not a valid patient`);
    }

    let patientKey = ctx.stub.createCompositeKey("Patient", [patientEmail]);
    const patientAsBytes = await ctx.stub.getState(patientKey);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${patientEmail} does not exist`);
    }

    let doctorKey = ctx.stub.createCompositeKey("Doctor", [doctorEmail]);
    const doctorAsBytes = await ctx.stub.getState(doctorKey);

    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${doctorEmail} does not exist`);
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    patient.grantReadWriteAccessToDoctor(doctorEmail);
    doctor.grantReadWritePatientAccess(patientEmail);

    await ctx.stub.putState(patientKey, Buffer.from(JSON.stringify(patient)));
    await ctx.stub.putState(doctorKey, Buffer.from(JSON.stringify(doctor)));

    const successLog = {
      status: "success",
      email: patientEmail,
      doctorEmail: doctorEmail,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
    };

    ctx.stub.setEvent(
      "grantDoctorReadWriteAccessSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return `Doctor with email: ${doctorEmail} successfully given permission to read and write EMRs for patient with email: ${patientEmail}`;
  }
  // revokeDoctorReadWriteAccess
  async revokeDoctorReadWriteAccess(ctx, patientEmail, doctorEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "patient") {
      throw new Error(`Email: ${patientEmail} is not a valid patient`);
    }

    let patientKey = ctx.stub.createCompositeKey("Patient", [patientEmail]);
    const patientAsBytes = await ctx.stub.getState(patientKey);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${patientEmail} does not exist`);
    }

    let doctorKey = ctx.stub.createCompositeKey("Doctor", [doctorEmail]);
    const doctorAsBytes = await ctx.stub.getState(doctorKey);

    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${doctorEmail} does not exist`);
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    patient.revokeReadWriteAccessFromDoctor(doctorEmail);
    doctor.revokeReadWritePatientAccess(patientEmail);

    await ctx.stub.putState(patientKey, Buffer.from(JSON.stringify(patient)));
    await ctx.stub.putState(doctorKey, Buffer.from(JSON.stringify(doctor)));

    const successLog = {
      status: "success",
      email: patientEmail,
      doctorEmail: doctorEmail,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
    };

    ctx.stub.setEvent(
      "revokeDoctorReadWriteAccessSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return `EMRs read and write permission for doctor with email: ${doctorEmail} has successfully been revoked from patient with email: ${patientEmail}`;
  }
  // revokeDoctorWriteAccess
  async revokeDoctorWriteAccess(ctx, patientEmail, doctorEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "patient") {
      throw new Error(`Email: ${patientEmail} is not a valid patient`);
    }

    let patientKey = ctx.stub.createCompositeKey("Patient", [patientEmail]);
    const patientAsBytes = await ctx.stub.getState(patientKey);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${patientEmail} does not exist`);
    }

    let doctorKey = ctx.stub.createCompositeKey("Doctor", [doctorEmail]);
    const doctorAsBytes = await ctx.stub.getState(doctorKey);

    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${doctorEmail} does not exist`);
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    patient.revokeWriteAccessFromDoctor(doctorEmail);
    doctor.revokeWritePatientAccess(patientEmail);

    await ctx.stub.putState(patientKey, Buffer.from(JSON.stringify(patient)));
    await ctx.stub.putState(doctorKey, Buffer.from(JSON.stringify(doctor)));

    const successLog = {
      status: "success",
      email: patientEmail,
      doctorEmail: doctorEmail,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
    };

    ctx.stub.setEvent(
      "revokeDoctorWriteAccessSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return `EMRs write permission for doctor with email: ${doctorEmail} has successfully been revoked from patient with email: ${patientEmail}`;
  }

  // Doctor functions

  // getAllAccessiblePatientEmr
  async getAllAccessiblePatientEmr(ctx, doctorEmail, patientEmail) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const doctorPart = parts.find((part) => part.startsWith("CN="));
    const doctorName = doctorPart.split("=")[1].split("::")[0];
    if (doctorName !== "doctor") {
      throw new Error(`Email: ${patientEmail} is not a valid doctor`);
    }

    let doctorKey = ctx.stub.createCompositeKey("Doctor", [doctorEmail]);
    const doctorAsBytes = await ctx.stub.getState(doctorKey);

    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${patientEmail} does not exist`);
    }

    const patientKey = ctx.stub.createCompositeKey("Patient", [patientEmail]);
    const patientAsBytes = await ctx.stub.getState(patientKey);

    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${patientEmail} does not exist`);
    }

    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    const patientAccess = doctor.getPatientAccess(patientEmail);
    if (!patientAccess) {
      throw new Error(
        `Doctor with email: ${doctorEmail} does not have read access to patient: ${patientEmail}`
      );
    }

    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    // Get all the EMRs that are owned by the patient
    const accessibleEMRs = [];
    const patientEMRs = patient.getOwnedEMRs();

    for (const emrId of patientEMRs) {
      const emrKey = ctx.stub.createCompositeKey("EMR", [emrId]);
      const emrAsBytes = await ctx.stub.getState(emrKey);

      if (!emrAsBytes || emrAsBytes.length === 0) {
        continue;
      }

      const emr = EMR.deserialize(JSON.parse(emrAsBytes.toString()));

      // Ensure the doctor has read access to the EMR
      if (doctor.getPatientAccess(patientEmail).read) {
        accessibleEMRs.push(emr); // Add the EMR to the list if accessible
      }
    }

    const successLog = {
      status: "success",
      email: doctorEmail,
      patientEmail: patientEmail,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
    };

    ctx.stub.setEvent(
      "getAllAccessiblePatientEmrSuccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return accessibleEMRs;
  }
  // getDoctorEmailWithAccess
  async getPatientEmailWithAccess(ctx, email) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const patientPart = parts.find((part) => part.startsWith("CN="));
    const patientName = patientPart.split("=")[1].split("::")[0];
    if (patientName !== "doctor") {
      throw new Error(`Email: ${email} is not a valid doctor`);
    }

    let key = ctx.stub.createCompositeKey("Doctor", [email]);
    const doctorAsBytes = await ctx.stub.getState(key);

    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${email} does not exist`);
    }

    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    const accessList = Object.entries(doctor.patientAccess).map(
      ([patientEmail, access]) => ({
        patientEmail,
        read: access.read,
        write: access.write,
      })
    );

    const successLog = {
      status: "success",
      email: email,
      callerIdentity: callerIdentity,
      timestamp: new Date().toISOString(),
      accessList,
    };

    ctx.stub.setEvent(
      "getPatientEmailWithAccess",
      Buffer.from(JSON.stringify(successLog))
    );

    await ctx.stub.putState(
      `log_${Date.now()}`,
      Buffer.from(JSON.stringify(successLog))
    );

    return accessList;
  }
  // addNewEmr
  async addNewEmr(
    ctx,
    doctorEmail,
    patientEmail,
    emrId,
    description,
    imageHash
  ) {
    const callerIdentity = ctx.clientIdentity.getID();
    const parts = callerIdentity.split("/");
    const doctorPart = parts.find((part) => part.startsWith("CN="));
    const doctorName = doctorPart.split("=")[1].split("::")[0];
    if (doctorName !== "doctor") {
      throw new Error(`Email: ${patientEmail} is not a valid doctor`);
    }

    let doctorKey = ctx.stub.createCompositeKey("Doctor", [doctorEmail]);
    const doctorAsBytes = await ctx.stub.getState(doctorKey);
    if (!doctorAsBytes || doctorAsBytes.length === 0) {
      throw new Error(`Doctor with email: ${doctorEmail} does not exist`);
    }
    const doctor = Doctor.deserialize(JSON.parse(doctorAsBytes.toString()));

    const patientAccess = doctor.getPatientAccess(patientEmail);
    if (!patientAccess || !patientAccess.write) {
      throw new Error(
        `Doctor with email: ${doctorEmail} does not have write access to patient: ${patientEmail}`
      );
    }

    let patientKey = ctx.stub.createCompositeKey("Patient", [patientEmail]);
    const patientAsBytes = await ctx.stub.getState(patientKey);
    if (!patientAsBytes || patientAsBytes.length === 0) {
      throw new Error(`Patient with email: ${patientEmail} does not exist`);
    }
    const patient = Patient.deserialize(JSON.parse(patientAsBytes.toString()));

    const newEmr = new EMR(
      emrId,
      patientEmail,
      doctorEmail,
      description,
      imageHash,
      new Date().toISOString().slice(0, 10)
    );

    let emrKey = ctx.stub.createCompositeKey("EMR", [emrId]);
    const emrAsBytes = await ctx.stub.getState(emrKey);
    if (emrAsBytes.length !== 0) {
      throw new Error(`Emr with id: ${emrId} already exists`);
    }

    await ctx.stub.putState(emrKey, Buffer.from(JSON.stringify(newEmr)));

    patient.addEMR(emrId);

    await ctx.stub.putState(patientKey, Buffer.from(JSON.stringify(patient)));

    ctx.stub.setEvent(
      "addNewEmrSuccess",
      Buffer.from(
        JSON.stringify({
          status: "success",
          email: patientEmail,
          adderEmail: doctorEmail,
          callerIdentity: callerIdentity,
        })
      )
    );

    return `EMR with ID: ${emrId} successfully added for patient with email: ${patientEmail}`;
  }
}

module.exports = EMRContract;
