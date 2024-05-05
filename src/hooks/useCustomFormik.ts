import Swal from "sweetalert2";
import { usePostPreferenceMutation } from "../store/api";
import { DTOPreferenceReq } from "../store/DTO/Preference";
import { useFormik } from "formik";
import * as Yup from "yup";
import withReactContent from "sweetalert2-react-content";

interface Props {
  onSubmit: (preferenciId: string) => void;
}

const MySwal = withReactContent(Swal);
const useCustomFormik = ({ onSubmit }: Props) => {
  const [createPreference] = usePostPreferenceMutation();
  const formik = useFormik<DTOPreferenceReq>({
    initialValues: { firstName: "", lastName: "", DNI: "" },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, "Al menos 2 caracteres").max(70, "Too Long!").required("Campo requerido"),
      lastName: Yup.string().min(2, "Al menos 2 caracteres").max(70, "Too Long!").required("Campo requerido"),
      DNI: Yup.number()
        .typeError("El campo debe ser numerico")
        .positive("El valor debe ser positivo")
        .integer("El valor debe ser entero")
        .min(999999, "Al menos 7 caracteres")
        .required("Campo requerido"),
    }),
    onSubmit: async ({ firstName, lastName, DNI }) => {
      MySwal.showLoading();
      try {
        const response = await createPreference(new DTOPreferenceReq(firstName, lastName, DNI));
        if ("error" in response) throw response.error;

        response.data;
        Swal.close();
        onSubmit(response.data.preferenceId);
      } catch (error) {
        Swal.close();
        MySwal.fire({
          title: "Error",
          text: "Hubo un problema al enviar los valores.",
          icon: "error",
        });
      }
    },
  });
  return formik;
};

export default useCustomFormik;
