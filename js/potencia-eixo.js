function calcular() {

  // pega potência nominal (PN)
  let pn = Number(document.getElementById('n1').value) || 0;

  // pega fator de utilização (FU)
  let fu = Number(document.getElementById('n2').value) || 0;

  // elemento onde será exibido o resultado
  let res = document.getElementById('res');


  // validação → verifica se algum campo está 0 (ou vazio convertido)
  if (pn === 0 || fu === 0) {

    // mensagem de erro
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;

  } else {

    // cálculo da potência no eixo
    // fórmula: P_eixo = PN * FU
    let potencia = pn * fu;

    // exibição detalhada do cálculo (muito bom 👏)
    res.innerHTML = `
    <p>Resultado: ${potencia}</p>
    <p>
    P<sub>eixo</sub> = PN * FU<br>
    P<sub>eixo</sub> = ${pn} * ${fu}<br>
    P<sub>eixo</sub> = <strong>${potencia} CV</strong>
    </p>
    `;
  }
}