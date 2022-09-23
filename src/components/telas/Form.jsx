import React from "react"
import Alert from "../Alert";
import ModalDialog from "../ModalDialog.tsx";
import TextField from "../TextField.tsx";
import prediosContext from "./prediosContext"

const Form = () => {

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()

  const {
    objeto,
    handleChange,
    cadastrarPredio,
    alert
  } = React.useContext(prediosContext);

  return (
    <ModalDialog id="modalEdicao">
      <form id="formulario" onSubmit={cadastrarPredio} className="needs-validation" noValidate>
        <div className="modal-body">
          <Alert alert={alert} />

          <TextField
            readOnly
            label={'Código'}
            name="codigo"
            onChange={handleChange}
            value={objeto.codigo}
          />

          <TextField
            required
            label={'Nome'}
            name="nome"
            onChange={handleChange}
            value={objeto.nome}
          />

          <TextField
            required
            label={'Descrição'}
            name="descricao"
            onChange={handleChange}
            value={objeto.descricao}
          />


          <TextField
            required
            label={'Sigla'}
            name="sigla"
            onChange={handleChange}
            value={objeto.sigla}
          />

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="submit" className="btn btn-success" >
            Salvar  <i className="bi bi-save"></i>
          </button>
        </div>
      </form>
    </ModalDialog>
  )

}

export default Form