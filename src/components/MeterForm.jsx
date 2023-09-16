import { useState } from "react";
import { useNavigation } from 'react-router-dom';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";

import {
  METER_TYPE_LABELS,
  USED_FOR_BILLING_LABEL,
  CREATE_METER_FORM,
  UPDATE_METER_FORM,
  DELETE_METER_FORM,
} from "../constants";

const MeterForm = ({
  formType = CREATE_METER_FORM,
  type = ["sum", "max", "unique_count"],
  title,
  displayName = "",
  apiName = "",
  active = true,
  usedForBilling,
  editState,
  setShowModal,
  setTable,
}) => {
  console.log({ editState, setTable });
  const [displayNameText, setDisplayNameText] = useState(
    editState?.display_name || displayName
  );
  const [apiNameText, setApiNameText] = useState(
    editState?.api_name || apiName
  );
  const [isActive, setIsActive] = useState(editState?.active || active);
  const [isUsedForBilling, setIsUsedForBilling] = useState(
    editState?.used_for_billing || usedForBilling
  );
//   const navigation = useNavigation();
  // const [selectedType, setSelectedType] = useState(null);
  // const meterTypeError = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const handleCreateMeter = (e, payload) => {
    e.preventDefault();
    const { type, id } = payload;
    console.log({ type, id });
    const mockNewTable = {
      id: "2077",
      api_name: "some api 2077",
      display_name: "some api display name 2077",
      active: true,
      used_for_billing: true,
      type: "max",
      updated_time: new Date().getTime().toString(),
      created_time: (new Date().getTime() + 1).toString(),
    };

    switch (type) {
      case CREATE_METER_FORM:
        console.log("hi creating meter");
        // make POST request
        // on success, update table state

        // const newTable = fetchMeter(CREATE_METER_FORM, {...payload})
        setTable((prev) => [...prev, mockNewTable]);
        // close modal
        setShowModal(false);
        break;
      case UPDATE_METER_FORM:
        // make PUT request
        // on success, update table state
        // close modal
        // setShowModal(false);
        // navigation('/meters')
        break;
      case DELETE_METER_FORM:
        // make DELETE request
        // on success, update table state
        // close modal
        // setShowModal(false);
        // navigation('/meters')
        break;
      default:
        setShowModal(false);
        break;
    }
    // console.log({
    //   displayNameText,
    //   apiNameText,
    //   isActive,
    //   isUsedForBilling,
    //   type,
    // });

    // const payload = {
    //   id: editState?.id,
    //   api_name: apiNameText,
    //   displayName: displayNameText,
    //   active: isActive,
    //   used_for_billing: isUsedForBilling,
    //   type: selectedType
    // }

    // make POST request
    // try {
    //   fetch('link', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       api_name: apiNameText,
    //       displayName: displayNameText,
    //       active: isActive,
    //       used_for_billing: isUsedForBilling,
    //       type: selectedType
    //     })
    //   })
    //   .then(res => res.json())
    //   .finally(() => {
    //     setShowModal()
    //   })
    // } catch (e) {
    //   console.error(e.message)
    // }
  };

//   console.log({ displayNameText, apiNameText, isActive, isUsedForBilling });
  return (
    <Box sx={{ width: "100%", color: "black" }}>
      <Typography variant="h4" fontSize="1.5rem">
        {title}
      </Typography>
      <FormControl fullWidth>
        <FormGroup>
          <Box
            sx={{
              display: "grid",
              columnGap: 4,
              gridTemplateColumns: "repeat(2, 1fr)",
              mb: 4,
              mt: 2,
            }}
          >
            <TextField
              autoComplete="off"
              type="text"
              label="Display Name"
              placeholder="Display Name"
              variant="filled"
              required
              aria-required
              value={displayNameText}
              onChange={(e) => setDisplayNameText(e.target.value)}
            />
            <TextField
              autoComplete="off"
              type="text"
              label="API Name"
              placeholder="API Name"
              variant="filled"
              required
              aria-required
              value={apiNameText}
              onChange={(e) => setApiNameText(e.target.value)}
            />
          </Box>
        </FormGroup>
        <FormGroup sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isActive}
                defaultValue={isActive}
                value={isActive}
                onClick={(e) => setIsActive(e.target.checked)}
              />
            }
            label="Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isUsedForBilling}
                defaultValue={isUsedForBilling}
                value={isUsedForBilling}
                onClick={(e) => setIsUsedForBilling(e.target.checked)}
              />
            }
            label="This Meter will be used for Billing"
          />
          <FormHelperText sx={{ pl: 2 }}>
            {USED_FOR_BILLING_LABEL}
          </FormHelperText>
        </FormGroup>
        <FormGroup sx={{ mb: 2, mt: 2 }}>
          <Typography fontSize="1rem" sx={{ mb: 1 }}>
            Meter Type
          </Typography>
          <Divider />
          {type.map((typeName) => (
            <Box key={typeName} sx={{ mb: 1 }}>
              <FormControlLabel
                key={typeName}
                control={<Checkbox />}
                label={typeName}
              />
              <FormHelperText sx={{ mt: 0, pl: 2 }}>
                {METER_TYPE_LABELS[typeName]}
              </FormHelperText>
            </Box>
          ))}
          {/* <FormHelperText>{meterTypeError}</FormHelperText> */}
        </FormGroup>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {formType === CREATE_METER_FORM ? (
          <>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mr: 3 }}
              onClick={(e) => handleCreateMeter(e, { type: CREATE_METER_FORM })}
            >
              Create
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </>
        ) : null}
        {formType === UPDATE_METER_FORM ? (
          <>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mr: 3 }}
              color="warning"
              onClick={(e) =>
                handleCreateMeter(e, {
                  type: DELETE_METER_FORM,
                  id: editState?.id,
                })
              }
            >
              Delete
            </Button>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mr: 3 }}
              onClick={(e) =>
                handleCreateMeter(e, {
                  type: UPDATE_METER_FORM,
                  id: editState?.id,
                })
              }
            >
              Update
            </Button>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default MeterForm;
