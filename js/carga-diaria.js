function calcular() {
  // demanda media
  let dmedia = Number(document.getElementById('n1').value) || 0;

  // demanda maxima
  let dmax = Number(document.getElementById('n2').value) || 0;

  // elemento de resultado
  let res = document.getElementById('res');

  // validacao
  if (dmedia === 0 || dmax === 0) {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
  } else {
    // Formula: FCD = D_media / D_max
    let carga_diaria = dmedia / dmax;

    res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${carga_diaria.toFixed(4)}</p>
        <p class="math-step"><strong>Formula:</strong> F_carga_diaria = D_media / D_max</p>
        <p class="math-step"><strong>Substituindo:</strong> F_carga_diaria = ${dmedia} / ${dmax}</p>
        <p class="math-step"><strong>Calculando:</strong> F_carga_diaria = ${carga_diaria.toFixed(4)}</p>
      </div>
    `;
  }
}
