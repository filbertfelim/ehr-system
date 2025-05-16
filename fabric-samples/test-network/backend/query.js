"use strict";

const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");

let ccp;
let wallet;

async function initialize(userType) {
  try {
    const ccpPath = path.resolve(
      __dirname,
      "../..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    const walletPath = path.join(process.cwd(), "wallet");
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    const identity = await wallet.get(userType);
    if (!identity) {
      console.log(
        `An identity for the ${userType} user does not exist in the wallet`
      );
      console.log("Run enrollAdmin.js and registerUser.js before retrying");
      return;
    }
  } catch (error) {
    console.error(`Failed transaction: ${error}`);
    process.exit(1);
  }
}

async function admin_addAdmin(name, email, adderEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "admin1",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "addAdmin",
      name,
      email,
      adderEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`admin_addAdmin: Failed transaction: ${error}`);
    return error.toString();
  }
}

async function admin_addPatient(name, email, address, adderEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "admin1",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "addPatient",
      name,
      email,
      address,
      adderEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`admin_addPatient: Failed transaction: ${error}`);
    return error.toString();
  }
}

async function admin_addDoctor(name, email, specialist, adderEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "admin1",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "addDoctor",
      name,
      email,
      specialist,
      adderEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`admin_addDoctor: Failed transaction: ${error}`);
    return error.toString();
  }
}

async function patient_getDoctorEmailWithAccess(email) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "patient",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "getDoctorEmailWithAccess",
      email
    );

    await gateway.disconnect();
    console.log("patient_getDoctorEmailWithAccess: " + typeof result);
    return result;
  } catch (error) {
    console.error(
      `patient_getDoctorEmailWithAccess: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function patient_getPatientEmr(email) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "patient",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction("getPatientEmr", email);
    // console.log(
    //   `Transaction has been evaluated. Result is: ${result.toString()}`
    // );

    await gateway.disconnect();
    console.log("patient_getPatientEmr: " + typeof result);
    return result;
  } catch (error) {
    console.error(`patient_getPatientEmr: Failed transaction: ${error}`);
    return error.toString();
  }
}

async function patient_grantDoctorReadAccess(patientEmail, doctorEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "patient",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "grantDoctorReadAccess",
      patientEmail,
      doctorEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(
      `patient_grantDoctorReadAccess: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function patient_grantDoctorReadWriteAccess(patientEmail, doctorEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "patient",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "grantDoctorReadWriteAccess",
      patientEmail,
      doctorEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(
      `patient_grantDoctorReadWriteAccess: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function patient_revokeDoctorReadWriteAccess(patientEmail, doctorEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "patient",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "revokeDoctorReadWriteAccess",
      patientEmail,
      doctorEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(
      `patient_revokeDoctorReadWriteAccess: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function patient_revokeDoctorWriteAccess(patientEmail, doctorEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "patient",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "revokeDoctorWriteAccess",
      patientEmail,
      doctorEmail
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(
      `patient_revokeDoctorWriteAccess: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function doctor_getAllAccessiblePatientEmr(doctorEmail, patientEmail) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "doctor",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "getAllAccessiblePatientEmr",
      doctorEmail,
      patientEmail
    );
    console.log(
      `Transaction has been evaluated. Result is: ${result.toString()}`
    );

    await gateway.disconnect();
    console.log("doctor_getAllAccessiblePatientEmr: " + typeof result);
    return result;
  } catch (error) {
    console.error(
      `doctor_getAllAccessiblePatientEmr: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function doctor_getPatientEmailWithAccess(email) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "doctor",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "getPatientEmailWithAccess",
      email
    );

    await gateway.disconnect();
    console.log("doctor_getPatientEmailWithAccess: " + typeof result);
    return result;
  } catch (error) {
    console.error(
      `doctor_getPatientEmailWithAccess: Failed transaction: ${error}`
    );
    return error.toString();
  }
}

async function doctor_addNewEmr(
  doctorEmail,
  patientEmail,
  emrId,
  description,
  imageHash
) {
  try {
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "doctor",
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork("mychannel");

    const contract = network.getContract("emr");

    const result = await contract.submitTransaction(
      "addNewEmr",
      doctorEmail,
      patientEmail,
      emrId,
      description,
      imageHash
    );
    console.log(`Transaction successful. Result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
  } catch (error) {
    console.error(`doctor_addNewEmr: Failed transaction: ${error}`);
    return error.toString();
  }
}

exports.initialize = initialize;

exports.admin_addAdmin = admin_addAdmin;
exports.admin_addPatient = admin_addPatient;
exports.admin_addDoctor = admin_addDoctor;

exports.patient_getDoctorEmailWithAccess = patient_getDoctorEmailWithAccess;
exports.patient_getPatientEmr = patient_getPatientEmr;
exports.patient_grantDoctorReadAccess = patient_grantDoctorReadAccess;
exports.patient_grantDoctorReadWriteAccess = patient_grantDoctorReadWriteAccess;
exports.patient_revokeDoctorReadWriteAccess =
  patient_revokeDoctorReadWriteAccess;
exports.patient_revokeDoctorWriteAccess = patient_revokeDoctorWriteAccess;

exports.doctor_getAllAccessiblePatientEmr = doctor_getAllAccessiblePatientEmr;
exports.doctor_getPatientEmailWithAccess = doctor_getPatientEmailWithAccess;
exports.doctor_addNewEmr = doctor_addNewEmr;
