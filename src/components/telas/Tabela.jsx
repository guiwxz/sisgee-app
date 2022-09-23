import React from "react";
import prediosContext from "./prediosContext";
import Alert from "../Alert";

const Tabela = () => {
  const {
    alert,
    setAlert,
    listaObjetos,
    setListaObjetos,
    recuperaPredios,
    recuperaPredio,
    removerPredio,
    setEditar,
    setObjeto

  } = React.useContext(prediosContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Prédios</h1>
      <button 
        className="btn btn-info" 
        data-bs-toggle="modal" 
        data-bs-target="#modalEdicao"
        onClick={() => {
          setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            sigla: ""
          })
          setEditar(false);
          setAlert({ status: "", message: "" })
        }}
      >
        <i className="bi bi-pencil-square"></i>
      </button>
      <Alert alert={alert} />
      {listaObjetos.length === 0 && <h1>Nenhum prédio encontrada</h1>}
      {listaObjetos.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nome</th>
              <th scope="col">Descricao</th>
              <th scope="col">Sigla</th>
              <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map(objeto => (
              <tr key={objeto.codigo}>
                <td>{objeto.codigo}</td>
                <td>{objeto.nome}</td>
                <td>{objeto.descricao}</td>
                <td>{objeto.sigla}</td>

                <td align="center">
                  <button 
                    className="btn btn-info" 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalEdicao"
                    onClick={() => {
                      recuperaPredio(objeto.codigo);
                      setEditar(true)
                      setAlert({ status: '', message: '' })
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button 
                    className="btn btn-danger" 
                    title="Remover"
                    onClick={() => { removerPredio(objeto); }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )

}

export default Tabela;