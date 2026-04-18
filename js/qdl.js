<<<<<<< HEAD
let radios = document.querySelectorAll('input[name="lampada"]');
let card_ex = document.getElementById('card-ex');

function updateForm() {
  let tipo = document.querySelector('input[name="lampada"]:checked');
  if (tipo && tipo.id === "incandescente") {
    // opção 1
    card_ex.innerHTML = `<p>
                          <label for="txtn1">Digite a o numero de lampadas</label>
                          <input id="n1" type="number">
                        </p>
                        <p>
                            <label for="txtn2">Digite a potência nominal (PN)</label>
                            <input id="n2" type="number">
                        </p>
                        <p>
                            <label for="txtn3">Digite a potência resistiva (PR)</label>
                            <input id="n3" type="number">
                        </p>
                        <p>
                            <label for="txtn4">Digite factor de potência</label>
                            <input id="n4" type="number">
                        </p>

                        <button class="btn" type="button" onclick="calcularOp1()">Calcular</button>`;
  } else {
    // opção 2
    card_ex.innerHTML = `
                      <p>
                          <label for="txtn1">Digite a o numero de lampadas</label>
                          <input id="n1" type="number">
                      </p>
                      <p>
                          <label for="txtn2">Digite a potência nominal (PN)</label>
                          <input id="n2" type="number">
                      </p>
                      <p>
                      <button class="btn" type="button" onclick="calcularOp2()">Calcular</button>`;
  }
}

// Inicializa o formulário e adiciona os event listeners
updateForm();
radios.forEach(radio => radio.addEventListener('change', updateForm));

function calcularOp1() {
=======
function calcular() {
>>>>>>> 82d593acf28b72a860d8cd9aa65fa8c7167160a6

  // captura valores dos inputs (como string)
  let v1 = document.getElementById('n1').value;
  let v2 = document.getElementById('n2').value;
  let v3 = document.getElementById('n3').value;
  let v4 = document.getElementById('n4').value;

  // elemento onde o resultado será exibido
  let res = document.getElementById('res');

  // validação → verifica se algum campo está vazio
  if (v1 === "" || v2 === "" || v3 === "" || v4 === "") {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
    return; // interrompe a execução
  }

  // conversão para número (necessário para cálculo)
  let n_lampadas = Number(v1);
  let pn = Number(v2);
  let pr = Number(v3);
  let fp = Number(v4);

  // fator multiplicador (fixo)
  const fm = 1.8;

  // validação do fator de potência
  // deve estar entre 0 e 1 (não pode ser 0 nem maior que 1)
  if (fp <= 0 || fp > 1) {
    res.innerHTML = "fp deve estar entre 0 e 1";
    return;
  }

  // cálculo da demanda do QDL (kVA)
  // fórmula: fm * (n * (pn + pr/fp)) / 1000
<<<<<<< HEAD
  let d_qdl = (fm * n_lampadas * (pn + (pr / fp))) / 1000;
=======
  let d_qdl = (fm*(n_lampadas * (pn + (pr / fp))) / 1000);
>>>>>>> 82d593acf28b72a860d8cd9aa65fa8c7167160a6

  // exibição do resultado com 2 casas decimais
  res.innerHTML = `Resultado: ${d_qdl.toFixed(2)} kVA`;
}
<<<<<<< HEAD

function calcularOp2() {

  // captura valores dos inputs (como string)
  let v1 = document.getElementById('n1').value;
  let v2 = document.getElementById('n2').value;

  // elemento onde o resultado será exibido
  let res = document.getElementById('res');

  // validação → verifica se algum campo está vazio
  if (v1 === "" || v2 === "") {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
    return; // interrompe a execução
  }

  // conversão para número (necessário para cálculo)
  let n_lampadas = Number(v1);
  let pn = Number(v2);

  // fator multiplicador (fixo)
  const fm = 1.8;
  const fp = 1

  // cálculo da demanda do QDL (kVA)
  // fórmula: fm * (n * (pn + pr/fp)) / 1000
  let d_qdl = (n_lampadas * pn) / 1000;

  // exibição do resultado com 2 casas decimais
  res.innerHTML = `Resultado: ${d_qdl.toFixed(2)} kVA`;
}
=======
>>>>>>> 82d593acf28b72a860d8cd9aa65fa8c7167160a6
