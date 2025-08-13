// Utilitário para manipular localStorage
const STORAGE_KEY = 'equipamentos';

function getEquipamentos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
function setEquipamentos(equipamentos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(equipamentos));
}

// Estado
let editIndex = null;
let filtros = {
    nome: '',
    numeroSerie: '',
    patrimonio: '',
    empresa: ''
};

// Elementos
const form = document.getElementById('equipamentoForm');
const tabela = document.getElementById('tabelaEquipamentos').getElementsByTagName('tbody')[0];
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Filtros
const filtroNome = document.getElementById('filtroNome');
const filtroSerie = document.getElementById('filtroSerie');
const filtroPatrimonio = document.getElementById('filtroPatrimonio');
const filtroEmpresa = document.getElementById('filtroEmpresa');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnLimparFiltro = document.getElementById('btnLimparFiltro');

function limparForm() {
    form.reset();
    editIndex = null;
    btnSalvar.textContent = 'Salvar';
    btnCancelar.style.display = 'none';
}

function validarEquipamento(equipamento, ignorarIndex = null) {
    if (!equipamento.nome || !equipamento.ordemServico || !equipamento.numeroSerie || !equipamento.patrimonio || !equipamento.fabricante || !equipamento.modelo || !equipamento.dataEnvio || !equipamento.descricao || !equipamento.empresa) {
        return 'Preencha todos os campos obrigatórios.';
    }
    if (!/^\d+$/.test(equipamento.ordemServico)) {
        return 'Número da Ordem de Serviço deve conter apenas números.';
    }
    if (equipamento.numeroSerie.length > 40) {
        return 'Número de Série deve ter no máximo 40 caracteres.';
    }
    if (equipamento.patrimonio.length > 15) {
        return 'Número de Patrimônio deve ter no máximo 15 caracteres.';
    }
    // Verifica duplicidade pendente
    const equipamentos = getEquipamentos();
    const existe = equipamentos.some((eq, idx) =>
        idx !== ignorarIndex &&
        eq.nome === equipamento.nome &&
        eq.numeroSerie === equipamento.numeroSerie &&
        eq.patrimonio === equipamento.patrimonio &&
        eq.status === 'Pendente'
    );
    if (existe) {
        return 'Já existe um equipamento igual pendente para conserto.';
    }
    return null;
}

function formatarDataBR(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}-${mes}-${ano}`;
}

function renderTabela() {
    const equipamentos = getEquipamentos().filter(eq => {
        return (
            (!filtros.nome || eq.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
            (!filtros.numeroSerie || eq.numeroSerie.toLowerCase().includes(filtros.numeroSerie.toLowerCase())) &&
            (!filtros.patrimonio || eq.patrimonio.toLowerCase().includes(filtros.patrimonio.toLowerCase())) &&
            (!filtros.empresa || eq.empresa.toLowerCase().includes(filtros.empresa.toLowerCase()))
        );
    });
    tabela.innerHTML = '';
    equipamentos.forEach((eq, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${eq.nome}</td>
            <td>${eq.numeroSerie}</td>
            <td>${formatarDataBR(eq.dataEnvio)}</td>
            <td>${eq.descricao}</td>
            <td class="${eq.status === 'Pendente' ? 'status-pendente' : 'status-concluido'}">${eq.status}</td>
            <td>
                <button class="acao-btn edit-btn" onclick="editarEquipamento(${idx})">Editar</button>
                <button class="acao-btn delete-btn" onclick="confirmarExclusao(${idx})">Excluir</button>
                ${eq.status === 'Pendente' ? `<button class="acao-btn status-btn" onclick="alterarStatus(${idx})">Concluir</button>` : ''}
            </td>
        `;
        tr.style.cursor = 'pointer';
        tr.onclick = function(e) {
            // Evita abrir modal ao clicar em botões
            if (e.target.tagName === 'BUTTON') return;
            exibirDetalhesEquipamento(eq);
        };
        tabela.appendChild(tr);
    });

function exibirDetalhesEquipamento(eq) {
    let detalhes = `<strong>Nome:</strong> ${eq.nome}<br>`;
    detalhes += `<strong>Nº Ordem de Serviço:</strong> ${eq.ordemServico}<br>`;
    detalhes += `<strong>Nº Série:</strong> ${eq.numeroSerie}<br>`;
    detalhes += `<strong>Nº Patrimônio:</strong> ${eq.patrimonio}<br>`;
    detalhes += `<strong>Fabricante:</strong> ${eq.fabricante}<br>`;
    detalhes += `<strong>Modelo:</strong> ${eq.modelo}<br>`;
    detalhes += `<strong>Data de Envio:</strong> ${formatarDataBR(eq.dataEnvio)}<br>`;
    detalhes += `<strong>Descrição do Problema:</strong> ${eq.descricao}<br>`;
    detalhes += `<strong>Empresa Responsável:</strong> ${eq.empresa}<br>`;
    detalhes += `<strong>Técnico Responsável:</strong> ${eq.tecnico || '-'}<br>`;
    detalhes += `<strong>Observações:</strong> ${eq.observacoes || '-'}<br>`;
    detalhes += `<strong>Status:</strong> ${eq.status}<br>`;
    if (eq.dataRetorno) detalhes += `<strong>Data de Retorno:</strong> ${formatarDataBR(eq.dataRetorno)}<br>`;
    abrirModal(detalhes + '<br><button class="btn-base btn-cancelar" onclick="fecharModal()">Fechar</button>');
}
}

window.editarEquipamento = function(idx) {
    const eq = getEquipamentos()[idx];
    document.getElementById('nome').value = eq.nome;
    document.getElementById('ordemServico').value = eq.ordemServico;
    document.getElementById('numeroSerie').value = eq.numeroSerie;
    document.getElementById('patrimonio').value = eq.patrimonio;
    document.getElementById('fabricante').value = eq.fabricante;
    document.getElementById('modelo').value = eq.modelo;
    document.getElementById('dataEnvio').value = eq.dataEnvio;
    document.getElementById('descricao').value = eq.descricao;
    document.getElementById('empresa').value = eq.empresa;
    document.getElementById('tecnico').value = eq.tecnico || '';
    document.getElementById('observacoes').value = eq.observacoes || '';
    editIndex = idx;
    btnSalvar.textContent = 'Atualizar';
    btnCancelar.style.display = 'inline-block';
}

window.confirmarExclusao = function(idx) {
    abrirModal(`Tem certeza que deseja excluir este equipamento?<br><br><button onclick="excluirEquipamento(${idx})">Sim</button> <button onclick="fecharModal()">Não</button>`);
}

window.excluirEquipamento = function(idx) {
    const equipamentos = getEquipamentos();
    equipamentos.splice(idx, 1);
    setEquipamentos(equipamentos);
    fecharModal();
    renderTabela();
    limparForm();
}

window.alterarStatus = function(idx) {
    abrirModal(`Informe a data de retorno do equipamento:<br><input type="date" id="dataRetornoModal"><br><br><button onclick="concluirEquipamento(${idx})">Salvar</button> <button onclick="fecharModal()">Cancelar</button>`);
}

window.concluirEquipamento = function(idx) {
    const dataRetorno = document.getElementById('dataRetornoModal').value;
    if (!dataRetorno) {
        alert('Informe a data de retorno!');
        return;
    }
    const equipamentos = getEquipamentos();
    equipamentos[idx].status = 'Concluído';
    equipamentos[idx].dataRetorno = dataRetorno;
    setEquipamentos(equipamentos);
    fecharModal();
    renderTabela();
}

function abrirModal(html) {
    modalBody.innerHTML = html;
    modal.style.display = 'block';
}
function fecharModal() {
    modal.style.display = 'none';
}
modalClose.onclick = fecharModal;
window.onclick = function(event) {
    if (event.target === modal) fecharModal();
};

form.onsubmit = function(e) {
    e.preventDefault();
    const equipamento = {
        nome: document.getElementById('nome').value.trim(),
        ordemServico: document.getElementById('ordemServico').value.trim(),
        numeroSerie: document.getElementById('numeroSerie').value.trim(),
        patrimonio: document.getElementById('patrimonio').value.trim(),
        fabricante: document.getElementById('fabricante').value.trim(),
        modelo: document.getElementById('modelo').value.trim(),
        dataEnvio: document.getElementById('dataEnvio').value,
        descricao: document.getElementById('descricao').value.trim(),
        empresa: document.getElementById('empresa').value.trim(),
        tecnico: document.getElementById('tecnico').value.trim(),
        observacoes: document.getElementById('observacoes').value.trim(),
        status: 'Pendente'
    };
    const erro = validarEquipamento(equipamento, editIndex);
    if (erro) {
        abrirModal(erro + '<br><br><button onclick="fecharModal()">Fechar</button>');
        return;
    }
    const equipamentos = getEquipamentos();
    if (editIndex !== null) {
        equipamento.status = equipamentos[editIndex].status;
        equipamento.dataRetorno = equipamentos[editIndex].dataRetorno;
        equipamentos[editIndex] = equipamento;
    } else {
        equipamentos.push(equipamento);
    }
    setEquipamentos(equipamentos);
    renderTabela();
    limparForm();
};

btnCancelar.onclick = limparForm;

btnFiltrar.onclick = function() {
    filtros.nome = filtroNome.value.trim();
    filtros.numeroSerie = filtroSerie.value.trim();
    filtros.patrimonio = filtroPatrimonio.value.trim();
    filtros.empresa = filtroEmpresa.value.trim();
    renderTabela();
};
btnLimparFiltro.onclick = function() {
    filtroNome.value = '';
    filtroSerie.value = '';
    filtroPatrimonio.value = '';
    filtroEmpresa.value = '';
    filtros = { nome: '', numeroSerie: '', patrimonio: '', empresa: '' };
    renderTabela();
};

// Inicialização
renderTabela();
