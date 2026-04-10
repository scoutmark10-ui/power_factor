function calcular() {

  // potência no eixo (cv ou hp → estás a converter depois)
  let p_eixo = Number(document.getElementById('n1').value) || 0;

  // fator de potência
  let fp = Number(document.getElementById('n2').value) || 0;

  // rendimento (eficiência)
  let r = Number(document.getElementById('n3').value) || 0;

  // elemento onde aparece o resultado
  let res = document.getElementById('res');


  // validação (se algum valor for 0)
  if (p_eixo === 0 || fp === 0 || r === 0) {

    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;

  } else {

    // fórmula:
    // P (W) = cv * 736
    // S (kVA) = P / (fp * rendimento)
    let d_motor = (p_eixo * 736) / (fp * r);

    // mostra resultado
    res.innerHTML = `Resultado: ${d_motor.toFixed(2)} KVA`;
  }
}