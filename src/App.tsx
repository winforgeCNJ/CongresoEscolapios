import { useState } from "react";
import useCustomFormik from "./hooks/useCustomFormik";
import PreferenceForm from "./PreferenceForm";
import MPForm from "./MPForm";
import { Box, Modal, styled } from "@mui/material";

function App() {
  const [preferenceId, setPreferenceId] = useState<string>();

  const onPreferenceSubmit = (preferenceId: string) => {
    setPreferenceId(preferenceId);
  };

  const formik = useCustomFormik({ onSubmit: onPreferenceSubmit });
  const firstName = formik.values.firstName;
  const lastName = formik.values.lastName;
  const DNI = formik.values.DNI;

  return (
    <div style={{ display: "grid", placeContent: "center", width: "100vw", minHeight: "100vh" }}>
      <PreferenceForm formik={formik} />
      {preferenceId && (
        <Modal
          open={!!preferenceId}
          onClose={() => setPreferenceId(undefined)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: "grid", placeItems: "center" }}
        >
          <StyledBox>
            <Box sx={{ width: { xs: 300, sm: 450, md: 800 } }}>
              <MPForm
                firstName={firstName}
                lastName={lastName}
                DNI={DNI}
                preferenceId={preferenceId}
                onMPSubmit={() => {
                  setPreferenceId(undefined);
                }}
              />
            </Box>
          </StyledBox>
        </Modal>
      )}
    </div>
  );
}

export default App;

const StyledBox = styled(Box)({
  overflowY: "auto",
  maxHeight: "80%",

  "&::-webkit-scrollbar": {
    width: "8px",
  },

  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 5px grey",
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "lightgray",
    borderRadius: "10px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
});
