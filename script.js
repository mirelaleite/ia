  const caixaPrincipal = document.querySelector(".caixa-principal");
    const caixaPerguntas = document.querySelector(".caixa-perguntas");
    const caixaAlternativas = document.querySelector(".caixa-alternativas");
    const caixaResultado = document.querySelector(".caixa-resultado");
    const textoResultado = document.querySelector(".texto-resultado");

    const perguntas = [
        {
            enunciado: "Em um dia livre, o que você prefere fazer?",
            alternativas: [
                { texto: "Explorar um lugar novo sozinho.", afirmacao: "independente" },
                { texto: "Estar com amigos fazendo algo divertido.", afirmacao: "sociavel" }
            ]
        },
        {
            enunciado: "Como você reage diante de um desafio?",
            alternativas: [
                { texto: "Analiso calmamente antes de agir.", afirmacao: "estrategico" },
                { texto: "Confio no instinto e mergulho de cabeça.", afirmacao: "impulsivo" }
            ]
        },
        {
            enunciado: "Como você lida com conflitos?",
            alternativas: [
                { texto: "Evito brigas, prefiro a paz.", afirmacao: "pacifico" },
                { texto: "Defendo meus valores sem medo.", afirmacao: "protetor" }
            ]
        },
        {
            enunciado: "Em grupo, você costuma ser...",
            alternativas: [
                { texto: "O líder ou quem toma iniciativa.", afirmacao: "lider" },
                { texto: "Aquele que cuida de todos e traz equilíbrio.", afirmacao: "cuidador" }
            ]
        },
        {
            enunciado: "Como você se sente em ambientes desconhecidos?",
            alternativas: [
                { texto: "Animado para descobrir tudo!", afirmacao: "curioso" },
                { texto: "Cauteloso até entender o lugar.", afirmacao: "cauteloso" }
            ]
        },
        {
            enunciado: "Quando está sozinho...",
            alternativas: [
                { texto: "Gosto. Aproveito para pensar e criar.", afirmacao: "introspectivo" },
                { texto: "Prefiro estar com alguém, mesmo em silêncio.", afirmacao: "companheiro" }
            ]
        },
        {
            enunciado: "O que mais importa para você?",
            alternativas: [
                { texto: "Liberdade e autenticidade.", afirmacao: "livre" },
                { texto: "Proteção e segurança para os seus.", afirmacao: "fiel" }
            ]
        }
    ];

    let atual = 0;
    let respostas = [];

    if (localStorage.getItem("progresso")) {
        atual = parseInt(localStorage.getItem("progresso"));
        respostas = JSON.parse(localStorage.getItem("respostas")) || [];
    }

    function mostraPergunta() {
        if (atual >= perguntas.length) {
            mostraResultado();
            return;
        }

        const perguntaAtual = perguntas[atual];
        caixaPerguntas.innerHTML = `<strong>Pergunta ${atual + 1} de ${perguntas.length}</strong><br><br>${perguntaAtual.enunciado}`;
        caixaAlternativas.textContent = "";

        for (const alternativa of perguntaAtual.alternativas) {
            const botao = document.createElement("button");
            botao.textContent = alternativa.texto;
            botao.addEventListener("click", () => respostaSelecionada(alternativa.afirmacao));
            caixaAlternativas.appendChild(botao);
        }
    }

    function respostaSelecionada(afirmacao) {
        respostas.push(afirmacao);
        atual++;

        localStorage.setItem("progresso", atual);
        localStorage.setItem("respostas", JSON.stringify(respostas));

        mostraPergunta();
    }

    function mostraResultado() {
        caixaPerguntas.textContent = "Resultado: Seu animal interior é...";
        caixaAlternativas.textContent = "";

        const contagem = {};
        respostas.forEach(resp => contagem[resp] = (contagem[resp] || 0) + 1);

        const maisFrequente = Object.keys(contagem).reduce((a, b) => contagem[a] > contagem[b] ? a : b);

        let animal = "";

        switch (maisFrequente) {
            case "independente":
            case "livre":
                animal = "Águia - livre, destemida e visionária.";
                break;
            case "sociavel":
            case "companheiro":
                animal = "Golfinho - alegre, social e inteligente.";
                break;
            case "protetor":
            case "fiel":
                animal = "Lobo - leal, forte e protetor do grupo.";
                break;
            case "estrategico":
            case "introspectivo":
                animal = "Coruja - observadora, silenciosa e cheia de sabedoria.";
                break;
            case "lider":
                animal = "Leão - nobre, corajoso e nato para liderar.";
                break;
            case "curioso":
                animal = "Gato - curioso, esperto e independente.";
                break;
            case "pacifico":
            case "cuidador":
                animal = "Cervo - gentil, pacífico e cuidadoso com todos ao redor.";
                break;
            default:
                animal = "Um ser misterioso que não pode ser definido!";
        }

        caixaResultado.style.display = "block";
textoResultado.textContent = animal;

        const botaoReiniciar = document.createElement("button");
        botaoReiniciar.textContent = "Recomeçar";
        botaoReiniciar.addEventListener("click", () => {
            localStorage.clear();
            location.reload();
        });

        caixaAlternativas.appendChild(botaoReiniciar);
    }

    mostraPergunta();

    // Partículas animadas
    const canvas = document.getElementById('particulas');
    const ctx = canvas.getContext('2d');
    let particulas = [];
    const quantidade = 100;

    function redimensionar() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", redimensionar);
    redimensionar();

    class Particula {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.tamanho = Math.random() * 2 + 1;
            this.velocidadeX = Math.random() * 0.4 - 0.2;
            this.velocidadeY = Math.random() * 0.4 - 0.2;
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        desenhar() {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
            ctx.fill();
        }

        atualizar() {
            this.x += this.velocidadeX;
            this.y += this.velocidadeY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            this.desenhar();
        }
    }

    function initParticulas() {
        particulas = [];
        for (let i = 0; i < quantidade; i++) {
            particulas.push(new Particula());
        }
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i of particulas) {
            i.atualizar();
        }
        requestAnimationFrame(animar);
    }

    initParticulas();
    animar();