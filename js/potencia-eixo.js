function calcular() {
  // potencia nominal (PN)
  let pn = Number(document.getElementById('n1').value) || 0;

  // fator de utilizacao (FU)
  let fu = Number(document.getElementById('n2').value) || 0;

  // elemento onde sera exibido o resultado
  let res = document.getElementById('res');

  // validacao
  if (pn === 0 || fu === 0) {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
  } else {
    // Formula: P_eixo = PN * FU
    let potencia = pn * fu;

    res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${potencia.toFixed(2)} CV</p>
        <p class="math-step"><strong>Formula:</strong> P_eixo = PN x FU</p>
        <p class="math-step"><strong>Substituindo:</strong> P_eixo = ${pn} x ${fu}</p>
        <p class="math-step"><strong>Calculando:</strong> P_eixo = ${potencia.toFixed(2)} CV</p>
      </div>
    `;
  }
}
