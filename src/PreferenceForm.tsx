import { styled } from "@mui/material";
import { DTOPreferenceReq } from "./store/DTO/Preference";
import { ErrorMessage, FormikProvider, useFormik } from "formik";

interface Props {
  formik: ReturnType<typeof useFormik<DTOPreferenceReq>>;
}

const PreferenceForm = ({ formik }: Props) => {
  return (
    <FormikProvider value={formik}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        onSubmit={formik.handleSubmit}
        // onReset={formik.handleReset}
      >
        <div style={{ height: "70px" }}>
          <input
            id="firstName"
            type="text"
            placeholder="FirstName"
            style={{ padding: "1rem 1rem", fontSize: "1.5rem" }}
            {...formik.getFieldProps("firstName")}
          />
          <ErrorMessageStyled name="firstName" component="div" />
        </div>
        <div style={{ height: "70px" }}>
          <input
            id="lastName"
            type="text"
            placeholder="LastName"
            style={{ padding: "1rem 1rem", fontSize: "1.5rem" }}
            {...formik.getFieldProps("lastName")}
          />
          <ErrorMessageStyled name="lastName" component="div" />
        </div>
        <div style={{ height: "70px" }}>
          <input
            id="DNI"
            type="text"
            placeholder="DNI"
            style={{ padding: "1rem 1rem", fontSize: "1.5rem" }}
            {...formik.getFieldProps("DNI")}
          />
          <ErrorMessageStyled name="DNI" component="div" />
        </div>
        <button type="submit">Pagar</button>
      </form>
    </FormikProvider>
  );
};

export default PreferenceForm;

const ErrorMessageStyled = styled(ErrorMessage)({
  color: "red",
});
