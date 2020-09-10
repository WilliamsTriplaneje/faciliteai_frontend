import Swal from "sweetalert2";

export const isEqual = (input1, input2) => {
  if (input1.value != input2.value) {
    Swal.fire({
      icon: "warning",
      title: "FaciliteAi",
      text: "Senhas não coincidem, tente novamente ...",
    });
  }
};
