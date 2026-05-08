function calcular() {
  const CV_TO_W = 735.5;

  // potencia no eixo (cv)
  let p_eixo = Number(document.getElementById('n1').value) || 0;

  // fator de potencia
  let fp = Number(document.getElementById('n2').value) || 0;

  // rendimento (eficiencia)
  let r = Number(document.getElementById('n3').value) || 0;

  // elemento onde aparece o resultado
  let res = document.getElementById('res');

  // validacao (se algum valor for 0)
  if (p_eixo === 0 || fp === 0 || r === 0) {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
  } else if (fp > 1 || r > 1) {
    res.innerHTML = `<p style="color: #E57373;">FP e rendimento devem estar entre 0 e 1</p>`;
  } else {
    // Formula: D_motor(kVA) = [(P_eixo * 735.5) / (FP * r)] / 1000
    let p_w = p_eixo * CV_TO_W;
    let denominador = fp * r;
    let s_va = p_w / denominador;
    let d_motor = s_va / 1000;

    res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${d_motor.toFixed(2)} kVA</p>
        <p class="math-step"><strong>Formula:</strong> D_motor(kVA) = [(P_eixo x 735.5) / (FP x r)] / 1000</p>
        <p class="math-step"><strong>Substituindo:</strong> D_motor = [(${p_eixo} x ${CV_TO_W}) / (${fp} x ${r})] / 1000</p>
        <p class="math-step"><strong>Calculando:</strong> D_motor = (${s_va.toFixed(2)} VA) / 1000 = ${d_motor.toFixed(2)} kVA</p>
      </div>
    `;
  }
}
