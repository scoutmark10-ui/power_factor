function calcular() {
  // demanda do CCM (kVA)
  let d_ccm = Number(document.getElementById('n2').value) || 0;

  // demanda do QDL (kVA)
  let d_qdl = Number(document.getElementById('n3').value) || 0;

  // elemento de resultado
  let res = document.getElementById('res');

  // validacao
  if (d_ccm === 0 || d_qdl === 0) {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
  } else {
    // Formula: D_QGF = D_CCM + D_QDL
    let d_qgf = d_ccm + d_qdl;

    res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${d_qgf.toFixed(2)} kVA</p>
        <p class="math-step"><strong>Formula:</strong> D_QGF = D_CCM + D_QDL</p>
        <p class="math-step"><strong>Substituindo:</strong> D_QGF = ${d_ccm} + ${d_qdl}</p>
        <p class="math-step"><strong>Calculando:</strong> D_QGF = ${d_qgf.toFixed(2)} kVA</p>
      </div>
    `;
  }
}
