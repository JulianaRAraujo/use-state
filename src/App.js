import { useState } from "react";
import "./App.css";

function App() {

  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {

    const cep = evento.target.value;

    setEndereco({
      cep,
    });
    if (cep && cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setEndereco(enderecoAntigo => {
            return{
              ...enderecoAntigo,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf,
            }
           
          });
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>Consulte Endereço pelo Cep</h1>
        <br/>
        <img className="icone" src="./localizacao.png" alt="Localização"/>
        <label>
          <input
            placeholder="Digite o cep"
            onChange={manipularEndereco}
          ></input>
        </label>
      <ul>
        <li>CEP: {endereco.cep}</li> 
        <li>RUA: {endereco.rua}</li>
        <li>BAIRRO: {endereco.bairro}</li>
        <li>CIDADE: {endereco.cidade}</li>
        <li>ESTADO: {endereco.estado}</li>
      </ul>
      </header>
    </div>
  );
}

export default App;
