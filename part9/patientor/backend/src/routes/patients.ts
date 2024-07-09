import express from "express";
import patientsService from "../services/patientsService";
import { NonSensitivePatientEntry, Patient } from "../types";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const data: NonSensitivePatientEntry[] =
    patientsService.getNonSensitiveEntries();
  res.json(data);
});

router.get("/:id", (req, res) => {
  const data: Patient = patientsService.getEntry(req.params.id) as Patient;
  return data ? res.json(data) : res.json({ error: "Patient not found" });
});

router.post("/", (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = patientsService.addPatientEntry(newPatientEntry);

  res.json(addedEntry);
});

export default router;