import React from "react";
import PrediosContext from "./prediosContext";
import Tabela from "./Tabela";
import Form from "./Form";

const Predios = () => {

  const [alert, setAlert] = React.useState({ status: '', message: '' });
  const [listaObjetos, setListaObjetos] = React.useState([]);
  const [editar, setEditar] = React.useState(false);
  const [objeto, setObjeto] = React.useState({ codigo: "", nome: "", sigla: "", descricao: "" })

  const recuperaPredios = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/predios`)
      .then(response => response.json())
      .then(data => setListaObjetos(data))
      .catch(err => setAlert({ status: "", message: err }))
  }

  const recuperaPredio = async (codigo) => {
    await fetch(`${process.env.REACT_APP_API_URL}/predios/${codigo}`)
      .then(response => response.json())
      .then(data => setObjeto(data.objeto))
      .catch(err => setAlert({ status: "", message: err }))
  }

  const cadastrarPredio = async e => {
    e.preventDefault();
    const method = editar ? "PUT" : "POST"
    
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/predios`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objeto)
        }
      )
      .then(response => response.json())
      .then(json => {
        setAlert({
          status: json.status,
          message: json.message
        })
        setObjeto(json.objeto);
        if (!editar) {
          setEditar(true);
        }
      })

    } catch(err) {
      setAlert({
        status: "error",
        message: err
      })
    }

    recuperaPredios();
  }

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    setObjeto(current => ({
      ...current,
      [name]: value
    }))
  }

  const removerPredio = async objeto => {
    if (window.confirm('Deseja remover este objeto?')) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/predios/${objeto.codigo}`,
            { method: "DELETE" })
            .then(response => response.json())
            .then(json => setAlert({ status: json.status, message: json.message }))
        recuperaPredios();
      } catch (err) {
        console.log('Erro: ' + err)
      }
    }
  }

  React.useEffect(() => {
    recuperaPredios();

  }, []);

  return (
    <PrediosContext.Provider value={{
      alert,
      setAlert,
      listaObjetos,
      setListaObjetos,
      recuperaPredios,
      recuperaPredio,
      removerPredio,
      objeto,
      setObjeto,
      editar,
      setEditar,
      cadastrarPredio,
      handleChange
    }}>
      <Tabela />
      <Form />
    </PrediosContext.Provider>

  )

}

export default Predios;