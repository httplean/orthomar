// Encontra o elemento da imagem principal.
// Encontra o elemento da imagem principal.
const mainImage = document.getElementById('mainImage');
// Encontra todos os elementos de miniaturas.
const thumbnails = document.querySelectorAll('.miniaturas');
// Encontra todos os botões de aluguel.
const rentalButtons = document.querySelectorAll('.btn-aluguel');
// Encontra o elemento do preço.
const priceValue = document.getElementById('valor');
// Encontra o botão final "Alugar".
const rentButton = document.querySelector('.btn-form');

// Variáveis para armazenar o tempo e o valor selecionados.
let selectedTime = '';
let selectedValue = '';

// Adiciona um listener de evento de 'click' para cada miniatura.
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Altera a imagem principal para o `data-src` da miniatura clicada.
        mainImage.src = thumbnail.getAttribute('data-src');

        // Remove a classe 'active' de todas as miniaturas.
        thumbnails.forEach(t => t.classList.remove('active'));

        // Adiciona a classe 'active' à miniatura clicada.
        thumbnail.classList.add('active');
    });
});

// Mapeia o número de dias para o valor do aluguel.
// Usei um objeto para centralizar os valores.
const prices = {
    '1': {
        tempo: 'dia',
        valor: 'R$ 10,00'
    },
    '7': {
        tempo: '7 dias',
        valor: 'R$ 60,00'
    },
    '15': {
        tempo: '15 dias',
        valor: 'R$ 100,00'
    },
    '30': {
        tempo: '30 dias',
        valor: 'R$ 180,00'
    }
};

// Adiciona um listener de 'click' para cada botão de aluguel.
rentalButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões de aluguel.
        rentalButtons.forEach(btn => btn.classList.remove('active'));

        // Adiciona a classe 'active' ao botão clicado.
        button.classList.add('active');

        // Obtém o número de dias do atributo `data-dias`.
        const days = button.getAttribute('data-dias');

        // Atualiza as variáveis com o tempo e valor selecionados.
        selectedTime = prices[days].tempo;
        selectedValue = prices[days].valor;
        
        // Atualiza o texto do preço na página.
        priceValue.textContent = selectedValue;
    });
});

// Adiciona a funcionalidade de enviar a mensagem do WhatsApp no botão final.
rentButton.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link

    if (selectedTime && selectedValue) {
        // Obtém o nome do item do H1.
        const itemName = document.querySelector('h1').textContent.trim();

        // Monta a mensagem final.
        const message = `Olá! gostaria de alugar "${itemName}", pelo período de ${selectedTime}, no valor de ${selectedValue}.`;
        
        // Define o número de telefone e a mensagem na URL.
        const phoneNumber = '5513978186981'; // Altere para o número de WhatsApp correto.
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Abre o link em uma nova aba.
        window.open(whatsappUrl, '_blank').focus();
    } else {
        // Alerta o usuário se nenhuma opção de aluguel foi selecionada.
        alert('Por favor, selecione uma opção de aluguel antes de continuar.');
    }
});