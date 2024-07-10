import { Entry } from "../../types";
import { Box } from "@mui/system";
// import FavoriteIcon from "@mui/icons-material/Favorite";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Box>
      <div>
        {entry.date} <i>{entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((code, idx) => (
          <li key={idx}>{code}</li>
        ))}
      </ul>
    </Box>
  );
};

export default EntryDetails;
