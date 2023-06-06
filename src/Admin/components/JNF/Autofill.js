import Swal from "sweetalert2";
import getJNF from "../../api/getJNF";

const Autofill = (e, updateData) => {
  e.preventDefault();

  Swal.fire({
    title: "Enter your placement ID",
    html: "Check the form response mail you received after filling the form in the past.",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
    showCancelButton: true,
    confirmButtonText: "Submit",
    showLoaderOnConfirm: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to enter your ID!";
      }
    },
    preConfirm: async (login) => {
      try {
        const response = await getJNF(login);
        updateData(response);
        return response;
      } catch (error) {
        return "false";
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      if (result.value !== "false") {
        Swal.fire({
          icon: "success",
          title: "Data Found",
          html: "Your data has been prefilled except for job profile related fields and PDF files. Please check the prefilled data and fill the rest of the form.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ID Not Found",
        });
      }
    }
  });
};

export default Autofill;
