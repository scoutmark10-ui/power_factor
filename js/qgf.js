function calcular() {

    // valor da demanda do CCM (kVA)
    let d_ccm = Number(document.getElementById('n2').value) || 0;

    // valor da demanda do QDL (kVA)
    let d_qdl = Number(document.getElementById('n3').value) || 0;

    // elemento onde será exibido o resultado
    let res = document.getElementById('res');
    
    
    // validação → verifica se algum valor é 0 (ou vazio convertido)
    if (d_ccm === 0 || d_qdl === 0) {

        // mensagem de erro
        res.innerHTML = `<p style="color: #E57373;">Preencha todos os dados</p>`;

    } else {

        // cálculo da demanda total do QGF
        // fórmula: D_QGF = D_CCM + D_QDL
        let d_qgf = d_ccm + d_qdl;

        // exibição com 2 casas decimais
        res.innerHTML = `
  <p>Resultado: <strong>${d_qgf.toFixed(2)} kVA</strong></p>
  <p>D<sub>QGF</sub> = D<sub>CCM</sub> + D<sub>QDL</sub></p>
  <p>${d_ccm} + ${d_qdl} = ${d_qgf.toFixed(2)}</p>
`;
    }
}