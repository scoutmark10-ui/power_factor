function calcular() {
  // numero de motores
  let n_motores = Number(document.getElementById('n1').value) || 0;

  // demanda de cada motor
  let d_motor = Number(document.getElementById('n2').value) || 0;

  // fator de simultaneidade
  let fs = Number(document.getElementById('n3').value) || 0;

  // elemento de resultado
  let res = document.getElementById('res');

  // validacao
  if (n_motores === 0 || d_motor === 0 || fs === 0) {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
  } else {
    // Formula: D_CCM = n_motores * D_motor * FS
    let d_ccm = n_motores * d_motor * fs;

    res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${d_ccm.toFixed(2)} kVA</p>
        <p class="math-step"><strong>Formula:</strong> D_CCM = n x D_motor x FS</p>
        <p class="math-step"><strong>Substituindo:</strong> D_CCM = ${n_motores} x ${d_motor} x ${fs}</p>
        <p class="math-step"><strong>Calculando:</strong> D_CCM = ${d_ccm.toFixed(2)} kVA</p>
      </div>
    `;
  }
}
