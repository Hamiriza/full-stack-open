import React from "react";
import {
  Entry,
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../../types";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code == code);
    return diagnosis ? diagnosis.name : "";
  };

  const SpecificToEntry = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryDetails entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case "HealthCheck":
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(entry)}`
        );
    }
  };

  return (
    <Box
      border={"1px solid black"}
      borderRadius="5px"
      padding="6px"
      marginBottom="6px"
    >
      <div>{entry.date}</div>
      <div>
        <i>{entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code, idx) => (
          <li key={idx}>
            {code} {getDiagnosisName(code)}
          </li>
        ))}
      </ul>
      {SpecificToEntry(entry)}
      <div>Diagnosis by {entry.specialist}</div>
    </Box>
  );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <Box>
      <b>Hospital Details</b>
      <ul>
        {entry.discharge.date && (
          <li>Discharge date: {entry.discharge.date}</li>
        )}
        <li>Discharge criteria: {entry.discharge.criteria}</li>
      </ul>
    </Box>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Box>
      <b>Occupational Healthcare Details</b>
      <ul>
        <li>Employer name: {entry.employerName}</li>
        {entry.sickLeave && (
          <li>Sick leave start date: {entry.sickLeave.startDate}</li>
        )}
        {entry.sickLeave && (
          <li>Sick leave end date: {entry.sickLeave.endDate}</li>
        )}
      </ul>
    </Box>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const getFavoriteColor = (rating: number): string => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        throw new Error(`Unhandled health check rating: ${rating}`);
    }
  };

  return (
    <Box>
      <b>Health Check Details</b>
      <div>
        <FavoriteIcon
          sx={{ color: `${getFavoriteColor(entry.healthCheckRating)}` }}
        />
      </div>
    </Box>
  );
};

export default EntryDetails;
