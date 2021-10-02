let jogador1 = {
    id: 1,
    pontos: 0,
    botaoEscolhido: [false, 0],
    escolha: function () {
        let escolha = document.querySelector('#escolha-Jogador').value;//Recupera a escolha do usuario
        if (escolha.length > 10)//Não escolhido retorna null
            return null;
        else//Escolhido retorna a opção
            return escolha;
    },
    adicionarPonto: function () {
        //Atualiza para o usuario e o objeto
        this.pontos++;
        document.querySelector('.vitorias-Jogador' + [this.id]).textContent = `${this.pontos} vitórias`;
    },
}

let jogador2 = {
    id: 2,
    pontos: 0,
    botaoSorteado: 0,
    escolha: function () {
        //Sortea um número de 1 a 3
        let escolha = Math.floor(Math.random() * 3 + 1);
        //Armazena o select do jogador 2
        let selectComputador = document.querySelector('#escolha-Computador');
        //Atualiza o 'select' para o usuario a opção do computador e objeto
        this.botaoSorteado = escolha;
        selectComputador.querySelectorAll('option')[escolha].setAttribute("selected", "selected");
        //Retorna a escolha
        return document.querySelector('#escolha-Computador').value;
    },
    adicionarPonto: function () {
        //Atualiza para o usuario e o objeto
        this.pontos++;
        document.querySelector('.vitorias-Jogador' + [this.id]).textContent = `${this.pontos} vitórias`;
    },
    removerChecked: function () {
        //Remove o selected da partida anterior
        document.querySelector('#escolha-Computador').querySelectorAll('option')[this.botaoSorteado].removeAttribute("selected");
    },
}

let jokenpo = {
    jogar: function () {
        //Recupera a escolha do jogador 1
        let escolhaJogador = jogador1.escolha();
        //Verificação para saber se o usuario escolheu alguma opção
        if (escolhaJogador === null) {
            //Se não escolheu, avisa o usuario para escolher uma opção
            let alertUsuario = document.querySelector('.alert');
            if (alertUsuario.classList.contains('d-none')) {
                //Faz aparecer o aviso
                document.querySelector('#alert-usuario').textContent = "Escolha sua opção!";
                alertUsuario.classList.toggle('d-none');
                alertUsuario.classList.toggle('alert-danger');
            }
        }
        else {
            //Se o jogador 1 escolheu, dá continuidade ao jogo
            //Esconde o resultado da partida anterior
            if (!(document.querySelector('.alert').classList.contains('d-none'))) {
                let alertDiv = document.querySelector('.alert');
                let alertSpan = document.querySelector('#alert-usuario');
                alertDiv.classList.remove('alert-warning');
                alertDiv.classList.remove('alert-success');
                alertDiv.classList.remove('alert-primary');
                alertDiv.classList.remove('alert-danger');
                alertDiv.classList.add('d-none');
                alertSpan.textContent = "";
            }
            //Remove o checked escolhido pelo computador anteriormente
            jogador2.removerChecked();
            let escolhaComputador = jogador2.escolha();//Seleciona o opção do computador
            //Verifica o vencedor
            if (escolhaJogador === escolhaComputador)//Empate
                this.mostrarResultado('Empate', escolhaJogador, escolhaComputador);

            else if ((escolhaJogador === 'Tesoura' && escolhaComputador === 'Papel') || (escolhaJogador === 'Papel' && escolhaComputador === 'Pedra') || (escolhaJogador === 'Pedra' && escolhaComputador === 'Tesoura'))//Vitoria do jogador
                this.mostrarResultado('jogador', escolhaJogador, escolhaComputador);

            else//Vitoria do computador
                this.mostrarResultado('computador', escolhaJogador, escolhaComputador);
        }
    },
    mostrarResultado: function (vencedor, escolhaPlayer, escolhaComputer) {
        //Armazena a div e span do alert
        let alertDiv = document.querySelector('.alert');
        let alertSpan = document.querySelector('#alert-usuario');
        //Mostra o vencedor no alert
        switch (vencedor) {
            case 'Empate':
                alertDiv.classList.toggle('d-none');
                alertDiv.classList.toggle('alert-warning');
                alertSpan.textContent = "Houve um empate, ninguem recebeu ponto";
                break;
            case 'jogador':
                alertDiv.classList.toggle('d-none');
                alertDiv.classList.toggle('alert-success');
                alertSpan.textContent = "Jogador 1 venceu a rodada e ganhou +1 ponto";
                jogador1.adicionarPonto();
                vencedor = escolhaPlayer + " (Jogador 1)";
                break;
            case 'computador':
                alertDiv.classList.toggle('d-none');
                alertDiv.classList.toggle('alert-primary');
                alertSpan.textContent = "Jogador 2 venceu a rodada e ganhou +1 ponto";
                jogador2.adicionarPonto();
                vencedor = escolhaComputer + " (Jogador 2)";
                break;
        }
        //Atualiza a tabela com os dados
        this.atualizarTabela(vencedor, escolhaPlayer, escolhaComputer);
    },
    atualizarTabela: function (vencedor, escolhaPlayer, escolhaComputer) {
        //Armazenando a tabela
        let tabelaBody = document.querySelector('#table-body');
        //Criando os elementos para a tabela
        let tabelaLinha = document.createElement('tr');
        let tabelaColunas = [];
        for (let i = 0; i <= 2; i++)
            tabelaColunas.push(document.createElement('td'));
        //Atribuindo dados aos elementos criados
        tabelaColunas[0].appendChild(document.createTextNode(escolhaPlayer));
        tabelaColunas[1].appendChild(document.createTextNode(escolhaComputer));
        tabelaColunas[2].appendChild(document.createTextNode(vencedor));
        //Atribuindo as colunas a linha
        for (let i = 0; i <= 2; i++)
            tabelaLinha.appendChild(tabelaColunas[i]);
        //Atribuindo a linha a tabela
        tabelaBody.appendChild(tabelaLinha);
    }
}