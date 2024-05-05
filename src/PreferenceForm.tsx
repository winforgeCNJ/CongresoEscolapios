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
          <ErrorMessage name="firstName" component="div" style={{ color: "red" }} />
        </div>
        <div style={{ height: "70px" }}>
          <input
            id="lastName"
            type="text"
            placeholder="LastName"
            style={{ padding: "1rem 1rem", fontSize: "1.5rem" }}
            {...formik.getFieldProps("lastName")}
          />
          <ErrorMessage name="lastName" component="div" style={{ color: "red" }} />
        </div>
        <div style={{ height: "70px" }}>
          <input
            id="DNI"
            type="text"
            placeholder="DNI"
            style={{ padding: "1rem 1rem", fontSize: "1.5rem" }}
            {...formik.getFieldProps("DNI")}
          />
          <ErrorMessage name="DNI" component="div" style={{ color: "red" }} />
        </div>
        <button type="submit">Pagar</button>
      </form>
    </FormikProvider>
  );
};

export default PreferenceForm;
