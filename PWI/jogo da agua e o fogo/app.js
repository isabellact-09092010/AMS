
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

const status = document.getElementById("status");
const contador = document.getElementById("cristais");
const botaoReiniciar = document.getElementById("reiniciar");

const teclas = new Set();

const plataformas = [
    { x: 0, y: 450, w: 900, h: 50 },
    { x: 100, y: 365, w: 180, h: 16 },
    { x: 340, y: 300, w: 180, h: 16 },
    { x: 590, y: 365, w: 180, h: 16 },
    { x: 690, y: 265, w: 120, h: 16 }
];

const perigos = [
    { x: 280, y: 430, w: 110, h: 20, tipo: "lava" },
    { x: 470, y: 430, w: 110, h: 20, tipo: "agua" },
    { x: 650, y: 430, w: 100, h: 20, tipo: "lava" }
];

const portas = [
    { x: 810, y: 380, w: 38, h: 70, tipo: "fogo" },
    { x: 860, y: 380, w: 38, h: 70, tipo: "agua" }
];

let fogo;
let agua;
let cristais;
let finalizado;
let mensagemFim;
let totalCristais;

function personagem(nome, x, cor, controles) {
    return {
        nome,
        x,
        y: 416,
        w: 26,
        h: 34,
        cor,
        controles,
        vx: 0,
        vy: 0,
        velocidade: 3.5,
        forcaPulo: -11,
        noChao: false
    };
}

function reiniciar() {
    fogo = personagem("Fogo", 35, "#ff593d", {
        esquerda: "ArrowLeft",
        direita: "ArrowRight",
        pular: "ArrowUp"
    });

    agua = personagem("Água", 75, "#42d9ff", {
        esquerda: "a",
        direita: "d",
        pular: "w"
    });

    cristais = [
        { x: 155, y: 330, tipo: "fogo", pego: false },
        { x: 400, y: 265, tipo: "agua", pego: false },
        { x: 630, y: 330, tipo: "fogo", pego: false },
        { x: 740, y: 230, tipo: "agua", pego: false }
    ];

    finalizado = false;
    mensagemFim = "";
    totalCristais = 0;

    status.textContent = "Coletem os cristais!";
    contador.textContent = "Cristais: 0/4";
}

window.addEventListener("keydown", (e) => {
    const tecla = e.key.length === 1
        ? e.key.toLowerCase()
        : e.key;

    if ([
        "ArrowLeft", "ArrowRight", "ArrowUp"
    ].includes(tecla)) {
        e.preventDefault();
    }

    teclas.add(tecla);
});

window.addEventListener("keyup", (e) => {
    const tecla = e.key.length === 1
        ? e.key.toLowerCase()
        : e.key;

    teclas.delete(tecla);
});

window.addEventListener("blur", () => teclas.clear());

botaoReiniciar.addEventListener("click", reiniciar);

function colidiu(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

function mover(p) {
    p.vx = 0;

    if (teclas.has(p.controles.esquerda)) {
        p.vx = -p.velocidade;
    }

    if (teclas.has(p.controles.direita)) {
        p.vx = p.velocidade;
    }

    if (teclas.has(p.controles.pular) && p.noChao) {
        p.vy = p.forcaPulo;
        p.noChao = false;
    }

    // Movimento horizontal
    p.x += p.vx;
    p.x = Math.max(0, Math.min(canvas.width - p.w, p.x));

    // Gravidade
    const yAnterior = p.y;
    p.vy += 0.5;
    p.y += p.vy;
    p.noChao = false;

    // Aterrissagem nas plataformas
    for (const plataforma of plataformas) {
        const tocando =
            p.x < plataforma.x + plataforma.w &&
            p.x + p.w > plataforma.x;

        const atravessouTopo =
            yAnterior + p.h <= plataforma.y &&
            p.y + p.h >= plataforma.y;

        if (tocando && atravessouTopo && p.vy >= 0) {
            p.y = plataforma.y - p.h;
            p.vy = 0;
            p.noChao = true;
        }
    }

    // Caiu fora da fase
    if (p.y > canvas.height) {
        status.textContent = "Vocês caíram! Reiniciando...";
        reiniciar();
    }
}

function verificarPerigos(p) {
    for (const perigo of perigos) {
        if (!colidiu(p, perigo)) continue;

        const elementoErrado =
            (perigo.tipo === "lava" && p.nome === "Água") ||
            (perigo.tipo === "agua" && p.nome === "Fogo");

        if (elementoErrado) {
            reiniciar();
            status.textContent =
                "Elemento errado! Tentem novamente.";
            return true;
        }
    }

    return false;
}

function coletarCristais() {
    for (const cristal of cristais) {
        if (cristal.pego) continue;

        const alvo = {
            x: cristal.x - 9,
            y: cristal.y - 10,
            w: 18,
            h: 20
        };

        const personagemCerto =
            cristal.tipo === "fogo" ? fogo : agua;

        if (colidiu(personagemCerto, alvo)) {
            cristal.pego = true;
            totalCristais++;
        }
    }

    contador.textContent = `Cristais: ${totalCristais}/4`;
}

function verificarPortas() {
    const fogoNaPorta = colidiu(fogo, portas[0]);
    const aguaNaPorta = colidiu(agua, portas[1]);

    if (fogoNaPorta && aguaNaPorta) {
        finalizado = true;
        mensagemFim = "FASE CONCLUÍDA!";
        status.textContent =
            `Parabéns! Cristais coletados: ${totalCristais}/4`;
    }
}

function desenharCenario() {
    const fundo = ctx.createLinearGradient(0, 0, 0, 500);
    fundo.addColorStop(0, "#243b60");
    fundo.addColorStop(1, "#101629");

    ctx.fillStyle = fundo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estrelas
    ctx.fillStyle = "#ffffff";

    for (let i = 0; i < 45; i++) {
        const x = (i * 137 + 30) % 890;
        const y = (i * 67 + 15) % 250;
        ctx.fillRect(x, y, 2, 2);
    }

    // Plataformas
    for (const p of plataformas) {
        ctx.fillStyle = "#526a7c";
        ctx.fillRect(p.x, p.y, p.w, p.h);

        ctx.fillStyle = "#a7d4df";
        ctx.fillRect(p.x, p.y, p.w, 4);
    }

    // Lava e água
    for (const perigo of perigos) {
        const lava = perigo.tipo === "lava";

        ctx.fillStyle = lava ? "#e94326" : "#147be8";
        ctx.fillRect(
            perigo.x, perigo.y, perigo.w, perigo.h
        );

        ctx.fillStyle = lava ? "#ffb347" : "#8be9ff";

        for (let x = perigo.x; x < perigo.x + perigo.w; x += 22) {
            ctx.fillRect(x, perigo.y + 4, 12, 3);
        }
    }

    // Portas de saída
    for (const porta of portas) {
        ctx.fillStyle =
            porta.tipo === "fogo" ? "#ff593d" : "#42d9ff";

        ctx.fillRect(porta.x, porta.y, porta.w, porta.h);

        ctx.fillStyle = "#182641";
        ctx.fillRect(
            porta.x + 8, porta.y + 12,
            porta.w - 16, porta.h - 12
        );
    }

    // Cristais
    for (const c of cristais) {
        if (c.pego) continue;

        ctx.fillStyle =
            c.tipo === "fogo" ? "#ff593d" : "#42d9ff";

        ctx.beginPath();
        ctx.moveTo(c.x, c.y - 10);
        ctx.lineTo(c.x + 9, c.y);
        ctx.lineTo(c.x, c.y + 10);
        ctx.lineTo(c.x - 9, c.y);
        ctx.closePath();
        ctx.fill();
    }
}

function desenharPersonagem(p) {
    ctx.fillStyle = p.cor;
    ctx.fillRect(p.x, p.y, p.w, p.h);

    // Olhos
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(p.x + 5, p.y + 8, 5, 5);
    ctx.fillRect(p.x + 17, p.y + 8, 5, 5);

    ctx.fillStyle = "#172033";
    ctx.fillRect(p.x + 7, p.y + 10, 3, 3);
    ctx.fillRect(p.x + 19, p.y + 10, 3, 3);

    // Boca
    ctx.fillRect(p.x + 8, p.y + 23, 12, 3);
}

function desenharFim() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    ctx.fillRect(180, 175, 540, 100);

    ctx.fillStyle = "#ffd166";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(mensagemFim, 450, 218);

    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Arial";
    ctx.fillText(
        `Cristais: ${totalCristais}/4`,
        450, 250
    );

    ctx.textAlign = "left";
}

function atualizar() {
    if (!finalizado) {
        mover(fogo);

        if (!finalizado) mover(agua);

        if (!finalizado) verificarPerigos(fogo);
        if (!finalizado) verificarPerigos(agua);

        if (!finalizado) {
            coletarCristais();
            verificarPortas();
        }
    }

    desenharCenario();
    desenharPersonagem(fogo);
    desenharPersonagem(agua);

    if (finalizado) desenharFim();

    requestAnimationFrame(atualizar);
}

reiniciar();
atualizar();
