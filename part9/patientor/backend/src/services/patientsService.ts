import patientsData from "../../data/patients";
import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntry = (id: string): Patient | undefined => {
  return patientsData.find((patient) => id === patient.id);
};

const addPatientEntry = (entry: NewPatientEntry): Patient => {
  const newId: string = uuid();
  const newPatientEntry = {
    id: newId,
    ...entry,
  };

  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newId: string = uuid();
  const newEntry = {
    id: newId,
    ...entry,
  };
  const idx: number = patientsData.findIndex(
    (patient) => patientId === patient.id
  );
  if (idx === -1) {
    throw Error("Patient not found");
  } else {
    patientsData[idx].entries.push(newEntry);
    return newEntry;
  }
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getEntry,
  addPatientEntry,
  addEntry,
};
