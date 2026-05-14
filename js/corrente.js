// CORRENTE NOMINAL
function calcular() {
  const CV_TO_W = 736;

  // potencia no eixo (cv)
  let pn = Number(document.getElementById('n1').value) || 0;

  // tensao
  let v = Number(document.getElementById('n2').value) || 0;

  // fator de potencia
  let fp = Number(document.getElementById('n3').value) || 0;

  // rendimento (eficiencia)
  let r = Number(document.getElementById('n4').value) || 0;

  // elemento onde aparece o resultado
  let res = document.getElementById('res');

  const raiz3 = Math.sqrt(3);

  // validacao (se algum valor for 0)
  if (pn === 0 || fp === 0 || r === 0 || v === 0) {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
  } else if (fp > 1 || r > 1) {
    res.innerHTML = `<p style="color: #E57373;">FP e rendimento devem estar entre 0 e 1</p>`;
  } else {
    // Formula: I_n = (P_n * 735.5) / (sqrt(3) * r * fp * V)
    let p_w = pn * CV_TO_W;
    let denominador = raiz3 * r * fp * v;
    let corrente = p_w / denominador;

    res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${corrente.toFixed(2)} A</p>
        <p class="math-step"><strong>Formula:</strong> I_n = (P_n x 736) / (sqrt(3) x r x FP x V)</p>
        <p class="math-step"><strong>Substituindo:</strong> I_n = (${pn} x ${CV_TO_W}) / (${raiz3.toFixed(4)} x ${r} x ${fp} x ${v})</p>
        <p class="math-step"><strong>Calculando:</strong> I_n = ${p_w.toFixed(2)} / ${denominador.toFixed(4)} = ${corrente.toFixed(2)} A</p>
      </div>
    `;
  }
}
