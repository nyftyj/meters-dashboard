import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import MeterForm from "./MeterForm";
import { CREATE_METER_FORM } from "../constants";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 12,
  borderRadius: 2,
  p: 4,
  color: "black",
};

const AddMeterModal = ({ showModal, setShowModal, setTableData }) => {
  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <MeterForm
          title="Create a Meter"
          formType={CREATE_METER_FORM}
          setShowModal={setShowModal}
          setTableData={setTableData}
        />
      </Box>
    </Modal>
  );
};

export default AddMeterModal;
