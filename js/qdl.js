function calcular() {

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
  let d_qdl = fm * ((n_lampadas * (pn + (pr / fp))) / 1000);

  // exibição do resultado com 2 casas decimais
  res.innerHTML = `Resultado: ${d_qdl.toFixed(2)} kVA`;
}