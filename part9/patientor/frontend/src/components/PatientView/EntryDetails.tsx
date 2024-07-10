import { Entry, Diagnosis } from "../../types";
import { Box } from "@mui/system";
// import FavoriteIcon from "@mui/icons-material/Favorite";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code == code);
    return diagnosis ? diagnosis.name : "";
  };
  return (
    <Box>
      <div>
        {entry.date} <i>{entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code, idx) => (
          <li key={idx}>
            {code} {getDiagnosisName(code)}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default EntryDetails;
