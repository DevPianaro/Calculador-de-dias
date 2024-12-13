document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault() // Evita o envio do formulário

    // Captura os valores das datas
    const dataInicio = document.getElementById("dataInicio").value
    const dataFim = document.getElementById("dataFim").value

    // Verifica se ambos os campos estão preenchidos
    if (!dataInicio || !dataFim) {
        alert("Por favor, preencha ambas as datas.")
        return;
    }

    // Calcula a diferença
    const diferenca = calcularDiferencaDatas(dataInicio, dataFim)

    // Exibe o resultado na tela
    const resultado = document.getElementById("res")
    resultado.innerHTML = `
        <h2>Resposta</h2>
        <h2>Total de dias:  ${diferenca.totalDias}</h2>
        <h2>${diferenca.semanas} semana(s) e ${diferenca.diasRestantes} dia(s)</h2>
        <h2>${diferenca.anos} ano(s), ${diferenca.meses} mese(s) e ${diferenca.dias} dia(s)</h2>
    `;
});

function calcularDiferencaDatas(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    // Verifica se a data final é anterior à data inicial
    if (inicio > fim) {
        alert("A data final deve ser posterior à data inicial.");
        return { anos: 0, meses: 0, dias: 0, totalDias: 0, semanas: 0, diasRestantes: 0 };
    }

    // Calcular a diferença total em dias
    const diffTempo = fim - inicio;
    const totalDias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));

    // Calcular anos, meses e dias
    let anos = fim.getFullYear() - inicio.getFullYear();
    let meses = fim.getMonth() - inicio.getMonth();
    let dias = fim.getDate() - inicio.getDate();

    if (dias < 0) {
        meses -= 1;
        const ultimoDiaMesAnterior = new Date(fim.getFullYear(), fim.getMonth(), 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anos -= 1;
        meses += 12;
    }

    // Calcular semanas e dias restantes
    const semanas = Math.floor(totalDias / 7);
    const diasRestantes = totalDias % 7;

    // Retornar todos os valores
    return { anos, meses, dias, totalDias, semanas, diasRestantes };
}
