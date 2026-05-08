let radios = document.querySelectorAll('input[name="lampada"]');
let qdlForm = document.getElementById('qdl-form');

function updateForm() {
  let tipo = document.querySelector('input[name="lampada"]:checked');
  if (tipo && tipo.id === "incandescente") {
    qdlForm.innerHTML = `<p>
                          <label for="txtn1">Digite o numero de lampadas</label>
                          <input id="n1" type="number">
                        </p>
                        <p>
                            <label for="txtn2">Digite a potencia nominal (PN em W)</label>
                            <input id="n2" type="number">
                        </p>
                        <p>
                            <label for="txtn3">Digite a potencia resistiva (PR em W)</label>
                            <input id="n3" type="number">
                        </p>
                        <p>
                            <label for="txtn4">Digite fator de potencia</label>
                            <input id="n4" type="number">
                        </p>
                        <button class="btn" type="button" onclick="calcularOp1()">Calcular</button>`;
  } else {
    qdlForm.innerHTML = `
                      <p>
                          <label for="txtn1">Digite o numero de lampadas</label>
                          <input id="n1" type="number">
                      </p>
                      <p>
                          <label for="txtn2">Digite a potencia nominal (PN em W)</label>
                          <input id="n2" type="number">
                      </p>
                      <p>
                          <label for="txtn3">Digite a potencia resistiva (PR em W)</label>
                          <input id="n3" type="number">
                      </p>
                      <button class="btn" type="button" onclick="calcularOp2()">Calcular</button>`;
  }
}

// Inicializa formulario e listeners
updateForm();
radios.forEach((radio) => radio.addEventListener('change', updateForm));

function calcularOp1() {
  let v1 = document.getElementById('n1').value;
  let v2 = document.getElementById('n2').value;
  let v3 = document.getElementById('n3').value;
  let v4 = document.getElementById('n4').value;

  let res = document.getElementById('res');

  if (v1 === "" || v2 === "" || v3 === "" || v4 === "") {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
    return;
  }

  let n_lampadas = Number(v1);
  let pn = Number(v2);
  let pr = Number(v3);
  let fp = Number(v4);

  const fm = 1.8;

  if (fp <= 0 || fp > 1) {
    res.innerHTML = `<p style="color: #E57373;">FP deve estar entre 0 e 1</p>`;
    return;
  }

  // Formula: D_QDL = fm * [n * (PN + PR/FP)] / 1000
  let bloco = n_lampadas * (pn + (pr / fp));
  let d_qdl = (fm * bloco) / 1000;

  res.innerHTML = `
    <div class="math-view">
      <p class="math-result">Resultado: ${d_qdl.toFixed(2)} kVA</p>
      <p class="math-step"><strong>Formula:</strong> D_QDL = FM x [n x (PN + PR/FP)] / 1000</p>
      <p class="math-step"><strong>Substituindo:</strong> D_QDL = ${fm} x [${n_lampadas} x (${pn} + ${pr}/${fp})] / 1000</p>
      <p class="math-step"><strong>Calculando:</strong> D_QDL = ${fm} x ${bloco.toFixed(4)} / 1000 = ${d_qdl.toFixed(2)} kVA</p>
    </div>
  `;
}

function calcularOp2() {
  let v1 = document.getElementById('n1').value;
  let v2 = document.getElementById('n2').value;
  let v3 = document.getElementById('n3').value;

  let res = document.getElementById('res');

  if (v1 === "" || v2 === "" || v3 === "") {
    res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;
    return;
  }

  let n_lampadas = Number(v1);
  let pn = Number(v2);
  let pr = Number(v3);

  const fm = 1.8;
  const fp = 1;

  // Formula: D_QDL = fm * [n * (PN + PR/FP)] / 1000
  let bloco = n_lampadas * (pn + (pr / fp));
  let d_qdl = (fm * bloco) / 1000;

  res.innerHTML = `
    <div class="math-view">
      <p class="math-result">Resultado: ${d_qdl.toFixed(2)} kVA</p>
      <p class="math-step"><strong>Formula:</strong> D_QDL = FM x [n x (PN + PR/FP)] / 1000</p>
      <p class="math-step"><strong>Substituindo:</strong> D_QDL = ${fm} x [${n_lampadas} x (${pn} + ${pr}/${fp})] / 1000</p>
      <p class="math-step"><strong>Calculando:</strong> D_QDL = ${fm} x ${bloco.toFixed(4)} / 1000 = ${d_qdl.toFixed(2)} kVA</p>
    </div>
  `;
}
