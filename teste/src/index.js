document.addEventListener('DOMContentLoaded', function () {
    const documentList = document.getElementById('document-list');
    const incluirAnexoButton = document.getElementById('incluir-anexo');
    const salvarFornecedorButton = document.getElementById('salvar-fornecedor');
    const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));

    let documentos = [];

    // Adicionar evento ao botão de incluir anexo
    incluirAnexoButton.addEventListener('click', function () {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '*/*';
        input.style.display = 'none';
        input.onchange = function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const blob = new Blob([e.target.result], { type: file.type });
                    documentos.push({ name: file.name, blob: blob });
                    sessionStorage.setItem('documentos', JSON.stringify(documentos.map(doc => ({ name: doc.name, blob: URL.createObjectURL(doc.blob) }))));
                    renderDocuments();
                };
                reader.readAsArrayBuffer(file);
            }
        };
        input.click();
    });

    // Renderizar lista de documentos
    function renderDocuments() {
        documentList.innerHTML = '';
        documentos.forEach((doc, index) => {
            const div = document.createElement('div');
            div.classList.add('document-item', 'd-flex', 'align-items-center', 'mb-2');
            div.innerHTML = `
                <button class="btn btn-danger mr-2" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <button class="btn btn-info mr-2" data-index="${index}">
                    <i class="fas fa-eye"></i>
                </button>
                <span>${doc.name}</span>
            `;
            documentList.appendChild(div);
        });

        // Adicionar eventos aos botões de excluir e visualizar
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                documentos.splice(index, 1);
                sessionStorage.setItem('documentos', JSON.stringify(documentos.map(doc => ({ name: doc.name, blob: URL.createObjectURL(doc.blob) }))));
                renderDocuments();
            });
        });

        document.querySelectorAll('.btn-info').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                const doc = documentos[index];
                const link = document.createElement('a');
                link.href = URL.createObjectURL(doc.blob);
                link.download = doc.name;
                link.click();
            });
        });
    }

    // Carregar documentos do sessionStorage ao carregar a página
    if (sessionStorage.getItem('documentos')) {
        documentos = JSON.parse(sessionStorage.getItem('documentos')).map(doc => ({ name: doc.name, blob: doc.blob }));
        renderDocuments();
    }

    // Evento ao clicar no botão salvar fornecedor
    salvarFornecedorButton.addEventListener('click', function () {
        if (documentos.length === 0) {
            alert('É obrigatório a inclusão de pelo menos 1 documento.');
            return;
        }

        loadingModal.show();

        const jsonExemplo = {
            documentos: documentos.map(doc => ({ name: doc.name, content: URL.createObjectURL(doc.blob) }))
        };

        // Simular envio
        setTimeout(() => {
            loadingModal.hide();
            console.log('JSON a ser enviado:', JSON.stringify(jsonExemplo, null, 2));
            alert('Dados enviados com sucesso!');
        }, 2000);
    });
});


document.getElementById('cep').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const cep = document.getElementById('cep').value;
    const resultDiv = document.getElementById('result');

    // Limpar qualquer resultado anterior
    resultDiv.innerHTML = '';

    // Validação básica do CEP (formato brasileiro)
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    if (!cepRegex.test(cep)) {
        resultDiv.innerHTML = '<p class="text-danger">Por favor, insira um CEP válido.</p>';
        return;
    }

    // Chamar a API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultDiv.innerHTML = '<p class="text-danger">CEP não encontrado.</p>';
            } else {
                resultDiv.innerHTML = `
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            resultDiv.innerHTML = '<p class="text-danger">Erro ao buscar o CEP. Por favor, tente novamente mais tarde.</p>';
        });
});

