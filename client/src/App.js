import './App.css'; // Importa o CSS
import './perfeito.css'; // Importa o CSS
import { useState, useRef } from 'react'; // Import useState and useRef
import Modal from './modal';

function App() {
  const [input, setInput] = useState(''); // Estado do input
  const [chatLog, setChatLog] = useState([{
    user: "kelvin",
    menssagem: "Olá eu sou o Kelvin , em que posso ajudar?"
  }]);
  const chatLogRef = useRef(null); // Reference for the chat log container

  function limparChat() {
    setChatLog([{
      user: "kelvin",
      menssagem: "Olá eu sou o Kelvin, em que posso ajudar?"
    }]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "eu", menssagem: `${input}`} ]
    setInput("");
    setChatLog(chatLogNew)
    chatLogRef.current.scrollTo(0, chatLogRef.current.scrollHeight); // Scroll to bottom of chat log
    const menssagens = chatLogNew.map((menssagem) => menssagem.menssagem).join("\n")
    const response = await fetch("http://20.160.171.116:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menssagem: menssagens
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "kelvin", menssagem: `${data.menssagem}`} ])
  }

  const [openModal, setOpenModal] = useState(true)


  return (
    <div className="App">
      <aside className='menuLateral'>
        <div className="button-menuLateral" onClick={limparChat} >
          <span>⚠️</span>
          Limpar Chat
        </div>
        <a href='../index.html'>
        <div id="home"className="button-menuLateral-home" >
          <span href="valdorio.net">🏠</span>
          Voltar
        </div>
        </a>
      </aside>
      <section className="boxChat">
        <div className="logs-chat" ref={chatLogRef}>
          {chatLog.map((menssagem, index) => (
            <MenssagemChat key={index} menssagem={menssagem} />
          ))}
        </div>
      </section>
      <section className="chat-input">
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e)=> setInput(e.target.value)}
              className="chat-input-areaTexto"
              placeholder="Escreva Aqui...">
            </input>
          </form>
        </div>
      </section>

        {openModal && <Modal closeModal={setOpenModal} />}

    </div>
  );
}



const MenssagemChat = ({menssagem}) => {
  return (
    <div className={`menssagem-chat ${menssagem.user === "kelvin" && "kelvin"}`}>
      <div className="menssagem-chat-centro">
      <div className={`foto-perfil ${menssagem.user === "kelvin" && "kelvin"}`}>
      </div>
      <div className="menssagem">
        {menssagem.menssagem}
      </div>
    </div>
  </div>
  )
}


export default App; // Exporta o componente App
