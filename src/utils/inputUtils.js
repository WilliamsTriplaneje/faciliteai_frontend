import Swal from "sweetalert2";

export const passwordEqual = async (input1, input2) => {
  if (input1 !== input2) {
   await Swal.fire({
      imageUrl: "../../assets/img/brand/logo.png",
      confirmButtonColor: "#0ee49d",
      title: "Erro de validação",
      text: "Senhas não coincidem, tente novamente ...",
    });
    throw new Error('Inválido')
  }
};

export const emailEqual = async (input1, input2) => {
  if (input1 !== input2) {
   await Swal.fire({
      imageUrl: "../../assets/img/brand/logo.png",
      confirmButtonColor: "#0ee49d",
      title: "Erro de validação",
      text: "E-mails não coincidem, tente novamente ...",
    });
    throw new Error('Inválido')
  }
};

export const isItEmpty = async (input) => {
  if (input == "") {
   await Swal.fire({
      imageUrl: "../../assets/img/brand/logo.png",
      confirmButtonColor: "#0ee49d",
      title: "Erro de validação",
      text: "Um campo não foi preenchido...",
    });
    throw new Error('Inválido')
  }
};
