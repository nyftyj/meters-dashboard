import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import fetchMeter from '../api/fetchMeter';

import {
  USED_FOR_BILLING_LABEL,
  CREATE_METER_FORM,
  UPDATE_METER_FORM,
  DELETE_METER_FORM,
} from "../constants";

const MeterForm = ({
  formType = CREATE_METER_FORM,
  title,
  editState,
  setShowModal,
  setTable,
}) => {
  const [displayNameText, setDisplayNameText] = useState(
    editState?.display_name || ''
  );
  const [apiNameText, setApiNameText] = useState(
    editState?.api_name || ''
  );
  const [isActive, setIsActive] = useState(editState?.active || true);
  const [isUsedForBilling, setIsUsedForBilling] = useState(
    editState?.used_for_billing || false 
  );
  const [selectedType, setSelectedType] = useState(editState?.type || '');

  const navigation = useNavigate();

  const handleCreateMeter = (e, payload) => {
    e.preventDefault();

    switch (payload.type) {
      case CREATE_METER_FORM: {
        const newRow = fetchMeter(CREATE_METER_FORM, payload.data)
        setTable((prev) => [...prev, newRow]);
        setShowModal(false);
        break;
      }
      case UPDATE_METER_FORM: {
        const newRow = fetchMeter(UPDATE_METER_FORM, payload.data, payload.id)
        setTable((prev) => [...prev, newRow]);
        navigation('/meters')
        setShowModal(false);
        break;
      }
      case DELETE_METER_FORM: {
        fetchMeter(DELETE_METER_FORM, payload.data, payload.id)
        setShowModal(false);
        navigation('/meters')
        break;
      }
      default:
        break;
    }
  };

  const payloadData = {
    api_name: apiNameText,
    display_name: displayNameText,
    active: isActive,
    used_for_billing: isUsedForBilling,
    type: selectedType,  
  }

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
                checked={isActive}
                value={isActive}
                onClick={(e) => setIsActive(e.target.checked)}
              />
            }
            label="Active"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isUsedForBilling}
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <FormControl fullWidth>
            <FormGroup sx={{ mb: 2, mt: 2 }}>
              <InputLabel sx={{ fontSize: '1rem' }}>Meter Type</InputLabel>
              <Select
                value={selectedType}
                label="meter type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value={'sum'}>Sum</MenuItem>
                <MenuItem value={'max'}>Max</MenuItem>
                <MenuItem value={'unique_count'}>Unique Count</MenuItem>
              </Select>
            </FormGroup>
          </FormControl>
        </Box>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {formType === CREATE_METER_FORM ? (
          <>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mr: 3 }}
              onClick={(e) =>
                handleCreateMeter(e, {
                  type: CREATE_METER_FORM,
                  data: {
                    ...payloadData,
                  },
                })
              }
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
                  data: {
                    ...payloadData,
                  },
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
