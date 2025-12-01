// Função para extrair o ID base da página (Ex: BlocoA_EAD) a partir do URL
function getCurrentBlockIdBase() {
    const path = window.location.pathname; // ex: /bloco_A_EAD.html
    const fileName = path.split('/').pop().replace('.html', ''); // ex: bloco_A_EAD
    return fileName.toUpperCase(); // BLOCO_A_EAD
}

// 1. Função de Carregamento e Salvamento
function setupDataHandling() {
    // Pega todas as áreas de texto na página atual
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length === 0) return; // Se for página de índice, não faz nada

    textareas.forEach(textarea => {
        const id = textarea.id; // Ex: BlocoA_EAD_Maquinas
        
        // --- Carregar Dados ---
        const valorSalvo = localStorage.getItem(id);
        if (valorSalvo) {
            textarea.value = valorSalvo;
        }

        // --- Configurar Salvamento Automático ---
        textarea.addEventListener('input', () => {
            localStorage.setItem(id, textarea.value);
            
            const status = document.getElementById('status');
            status.innerText = "Salvando...";
            setTimeout(() => { status.innerText = "Salvo automaticamente"; }, 500);
        });
    });
    document.getElementById('status').innerText = "Salvamento automático ativo"; 
}

// 2. Limpar Tudo (Limpa SOMENTE a sala atual)
function limparTudo(event) {
    const blockIdBase = getCurrentBlockIdBase();
    if (confirm(`Tem certeza que deseja apagar as anotações da sala ${blockIdBase}?`)) {
        
        // Encontra todas as chaves que começam com o ID base da sala atual
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(blockIdBase + '_')) {
                localStorage.removeItem(key);
            }
        });
        
        alert(`Anotações da sala ${blockIdBase} limpas!`);
        window.location.reload();
    }
    if (event) event.preventDefault(); 
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    // Roda a lógica de salvamento apenas nas páginas de anotação
    if (document.querySelector('.note-block-container')) {
        setupDataHandling();
    }
});