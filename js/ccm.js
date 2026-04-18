function calcular() {

  // pega o valor do input n1 (número de motores)
  // Number() converte para número
  // || 0 garante que se estiver vazio vira 0
  let n_motores = Number(document.getElementById('n1').value) || 0;

  // pega a potência do motor
  let d_motor = Number(document.getElementById('n2').value) || 0;

  // pega o fator de simultaneidade
  let fs = Number(document.getElementById('n3').value) || 0;

  // pega a div onde vai mostrar o resultado
  let res = document.getElementById('res');


  // validação → verifica se algum valor é 0
  if (n_motores === 0 || d_motor === 0 || fs === 0) {

    // mostra mensagem de erro em vermelho
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;

  } else {

    // cálculo da potência total (kVA)
    let d_ccm = n_motores * d_motor * fs;

    // mostra resultado com 2 casas decimais
    res.innerHTML = `Resultado: ${d_ccm.toFixed(2)} KVA`;
  }
}