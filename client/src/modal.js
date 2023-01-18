import React from "react";

function Modal({ closeModal }){
    return(
<div class="modal-container" id="modal_container">
<div class="modal">
  <h1>Limitações ⚠️</h1>
  <p>🌏 O Kelvin usa uma API para poder falar em várias linguas isso pode causar problemas com o Português.</p>
  <p>♾️ O Kelvin tem um limite de número de palavras o que pode levar que não acabe a sua resposta ou não responda.</p>
  <p>💻 Este site foi concebido para monitores com 1920x1080 qualquer outra resolução, pode causar problemas no estilo do mesmo.</p>
  <p>✍️ O Kelvin apenas consegue processar no máximo 1000 caracteres.</p>
  <button onClick={() => closeModal(false)}>
    Entendido👌
  </button>
</div>
</div>
);
}

export default Modal;