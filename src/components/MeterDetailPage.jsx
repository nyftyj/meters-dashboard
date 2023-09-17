import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MeterForm from "./MeterForm";
import { UPDATE_METER_FORM } from "../constants";

const MeterDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ width: "100%", backgroundColor: "#fff", p: 4, mt: 10, mb: 5, borderRadius: 2 }} >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
      <Typography color="black" fontSize="1.5rem" sx={{ py: 2 }}>
        Meter Details Page
      </Typography>
      <MeterForm
        formType={UPDATE_METER_FORM}
        editState={location.state.meterDetails}
      />
    </Box>
  );
};

export default MeterDetailPage;
