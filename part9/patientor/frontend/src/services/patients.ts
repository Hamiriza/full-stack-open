import axios from "axios";
import { EntryWithoutId, Patient, PatientWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientWithoutId) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (patientId: string, object: EntryWithoutId) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );
  return data;
};

export default {
  getAll,
  create,
  getOne,
  createEntry,
};
