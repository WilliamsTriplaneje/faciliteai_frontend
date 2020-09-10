import Swal from "sweetalert2";

export const passwordEqual = (input1, input2) => {
  if (input1.value != input2.value) {
    Swal.fire({
      imageUrl: "../../assets/img/brand/logo.png",
      confirmButtonColor: '#0ee49d',
      title: "Erro de validação",
      text: "Senhas não coincidem, tente novamente ...",
    }); 
  }
};

export const emailEqual = (input1, input2) => {
  if (input1.value != input2.value) {
    Swal.fire({
      imageUrl: "../../assets/img/brand/logo.png",
      confirmButtonColor: '#0ee49d',
      title: "Erro de validação",
      text: "E-mails não coincidem, tente novamente ...",
    }); 
  }
};

export const isItEmpty = (input) => {
  if (input.value == '') {
    Swal.fire({
      imageUrl: "../../assets/img/brand/logo.png",
      confirmButtonColor: '#0ee49d',
      title: "Erro de validação",
      text: "Um campo não foi preenchido...",
    });
  }
};
