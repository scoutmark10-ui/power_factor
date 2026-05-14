// CORRENTE NOMINAL
function calcular() {

    // tensao
    let d_maxima = Number(document.getElementById('n1').value) || 0;

    let v = Number(document.getElementById('n2').value) || 0;

    // elemento onde aparece o resultado
    let res = document.getElementById('res');

    const raiz3 = Math.sqrt(3);

    // validacao (se algum valor for 0)
    if (d_maxima === 0 || v === 0) {
        res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
    } else {
        // Formula: I_n = (P_n * 735.5) / (sqrt(3) * r * fp * V)

        let corrente = d_maxima / (raiz3 * v)

        res.innerHTML = `
      <div class="math-view">
        <p class="math-result">Resultado: ${corrente.toFixed(2)} A</p>
        <p class="math-step"><strong>Formula:</strong> I_n = D_maxima / (sqrt(3) x V)</p>
        <p class="math-step"><strong>Substituindo:</strong> I_n = (${d_maxima} / (${raiz3.toFixed(4)} x ${v})</p>
        <p class="math-step"><strong>Calculando:</strong> I_n = ${corrente.toFixed(2)} A</p>
      </div>
    `;
    }

}
