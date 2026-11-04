"use strict";

(() => {

  /* =====================================
     FUNÇÕES AUXILIARES
  ===================================== */

  const $ = (seletor, raiz = document) =>
    raiz.querySelector(seletor);

  const $$ = (seletor, raiz = document) =>
    Array.from(raiz.querySelectorAll(seletor));

  const doisDigitos = valor =>
    String(valor).padStart(2, "0");

  /* =====================================
     MENU RESPONSIVO
  ===================================== */

  const botaoMenu = $(".alternar-menu");
  const navegacao = $("#navegacao");

  if (botaoMenu && navegacao) {

    const fecharMenu = () => {
      navegacao.classList.remove("aberto");
      botaoMenu.setAttribute("aria-expanded", "false");
    };

    botaoMenu.addEventListener("click", () => {
      const aberto = navegacao.classList.toggle("aberto");

      botaoMenu.setAttribute(
        "aria-expanded",
        String(aberto)
      );
    });

    $$("a", navegacao).forEach(link => {
      link.addEventListener("click", fecharMenu);
    });

    document.addEventListener("keydown", evento => {
      if (evento.key === "Escape") fecharMenu();
    });

    document.addEventListener("click", evento => {
      if (
        !botaoMenu.contains(evento.target) &&
        !navegacao.contains(evento.target)
      ) {
        fecharMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) fecharMenu();
    });
  }

  /* =====================================
     ANO AUTOMÁTICO
  ===================================== */

  $$("#ano").forEach(elemento => {
    elemento.textContent = new Date().getFullYear();
  });

  /* =====================================
     GALERIA DE IMAGENS

     Quando não existir uma foto,
     exibe o espaço para adicioná-la.
  ===================================== */

  $$(".galeria-item").forEach(figura => {

    const imagem = $("img", figura);
    const link = $(".galeria-imagem", figura);

    if (!imagem || !link) return;

    function atualizarImagem() {
      const carregou =
        imagem.complete &&
        imagem.naturalWidth > 0;

      if (carregou) {
        figura.classList.remove("sem-imagem");
        link.href = imagem.currentSrc || imagem.src;

        link.removeAttribute("aria-disabled");
        link.removeAttribute("tabindex");
      } else {
        figura.classList.remove("sem-imagem");
        link.removeAttribute("href");

        link.setAttribute(
          "aria-disabled",
          "true"
        );

        link.tabIndex = -1;
      }
    }

    imagem.addEventListener(
      "load",
      atualizarImagem
    );

    imagem.addEventListener(
      "error",
      () => {
        figura.classList.add("sem-imagem");
        link.removeAttribute("href");
      }
    );

    atualizarImagem();
  });

  /* =====================================
     IMAGENS DOS COMPLEXOS NO INDEX
  ===================================== */

  $$(".experiencia-foto").forEach(container => {

    const imagem = $("img", container);

    if (!imagem) return;

    const atualizar = () => {
      const carregou =
        imagem.complete &&
        imagem.naturalWidth > 0;

      container.classList.toggle("sem-imagem", imagem.dataset.erro === "true");
    };

    imagem.addEventListener("load", atualizar);
    imagem.addEventListener("error", () => {
      imagem.dataset.erro = "true";
      atualizar();
    });

    atualizar();
  });

  /* =====================================
     CATEGORIAS DE ACOMODAÇÕES

     CONFIRME OS DADOS ANTES DE PUBLICAR
  ===================================== */

  const categorias = {

    jardins: [
      {
        nome: "Apartamento Superior",
        area: "36 m²",
        imagem: "imagens/jardins-de-jurema/superior-jardins.png",
        itens: [
          "1 cama de casal",
          "2 camas de solteiro",
          "Até 4 pessoas"
        ]
      },
      {
        nome: "Superior Plus",
        area: "42 m²",
        imagem: "imagens/jardins-de-jurema/superior-plus-jardins.png",
        itens: [
          "1 cama de casal e 2 de solteiro, ou",
          "1 cama de casal e 1 de solteiro, ou",
          "3 camas de solteiro"
        ]
      },
      {
        nome: "Premium",
        area: "32 m²",
        imagem: "imagens/jardins-de-jurema/quarto-jardins.jpg",
        itens: [
          "1 cama king-size"
        ]
      },
      {
        nome: "Inteligente",
        area: "41 m²",
        imagem: "imagens/jardins-de-jurema/quarto-jardins.jpg",
        itens: [
          "1 cama king-size"
        ]
      },
      {
        nome: "Inteligente Premium",
        area: "41 m²",
        imagem: "imagens/jardins-de-jurema/quarto-jardins.jpg",
        itens: [
          "1 cama king-size"
        ]
      },
      {
        nome: "Apartamentos PCD",
        area: "60 m² · 2 ambientes",
        imagem: "imagens/jardins-de-jurema/quarto-jardins.jpg",
        itens: [
          "1 cama de casal",
          "2 camas de solteiro",
          "Confirme os recursos de acessibilidade"
        ]
      }
    ],

    lagos: [
      {
        nome: "Apartamento Standard",
        area: "30 m²",
        imagem: "imagens/lagos-de-jurema/apartamento-lagos.jpg",
        itens: [
          "1 cama de casal",
          "2 camas de solteiro",
          "Até 4 pessoas"
        ]
      },
      {
        nome: "Master",
        area: "36 m²",
        imagem: "imagens/lagos-de-jurema/lagos-master.png",
        itens: [
          "1 cama de casal",
          "2 camas de solteiro"
        ]
      },
      {
        nome: "Suíte",
        area: "40 m² · 2 ambientes",
        imagem: "imagens/lagos-de-jurema/suite-lagos.png",
        itens: [
          "Antessala com 2 camas de solteiro",
          "Quarto com 1 cama de casal"
        ]
      },
      {
        nome: "Suíte Master",
        area: "40 m² · 2 ambientes",
        imagem: "imagens/lagos-de-jurema/suite-lagos.png",
        itens: [
          "Antessala com 2 camas de solteiro",
          "Quarto com 1 cama de casal"
        ]
      },
      {
        nome: "Premium",
        area: "40 m²",
        imagem: "imagens/lagos-de-jurema/lagos-premium.png",
        itens: [
          "2 camas de casal"
        ]
      },
      {
        nome: "Suíte Premium",
        area: "60 m² · 2 ambientes",
        imagem: "imagens/lagos-de-jurema/quarto-lagos.png",
        itens: [
          "Antessala com 2 camas de solteiro",
          "Quarto com cama super king"
        ]
      },
      {
        nome: "Conjugados",
        area: "Categoria para famílias",
        imagem: "imagens/lagos-de-jurema/apartamento-lagos.jpg",
        itens: [
          "Acomodações com ambientes conectados",
          "Confirme a configuração de camas"
        ]
      },
      {
        nome: "Apartamentos PCD",
        area: "Opção acessível",
        imagem: "imagens/lagos-de-jurema/quarto-lagos.png",
        itens: [
          "Confirme a configuração das camas",
          "Consulte os recursos de acessibilidade"
        ]
      }
    ]
  };

  /* =====================================
     GERAR ACOMODAÇÕES
  ===================================== */

  $$(".acomodacoes[data-resort]").forEach(secao => {

    const resort = secao.dataset.resort;
    const lista = $(".lista-acomodacoes", secao);

    if (!lista || !categorias[resort]) return;

    categorias[resort].forEach(quarto => {

      const item = document.createElement("details");
      item.className = "acomodacao-item";

      const resumo = document.createElement("summary");
      resumo.className = "acomodacao-resumo";

      const foto = document.createElement("img");
      foto.className = "foto-acomodacao";
      foto.src = quarto.imagem;
      foto.alt = quarto.nome;
      foto.loading = "lazy";

      const nome = document.createElement("span");
      nome.className = "nome-acomodacao";

      const titulo = document.createElement("strong");
      titulo.textContent = quarto.nome;

      const area = document.createElement("small");
      area.textContent = quarto.area;

      nome.append(titulo, area);

      const ver = document.createElement("span");
      ver.className = "alternar-acomodacao";

      const verTexto = document.createTextNode(
        "Ver informações "
      );

      const simbolo = document.createElement("span");
      simbolo.textContent = "+";
      simbolo.setAttribute("aria-hidden", "true");

      ver.append(verTexto, simbolo);
      resumo.append(foto, nome, ver);

      const conteudo = document.createElement("div");
      conteudo.className = "conteudo-acomodacao";

      const listaInformacoes = document.createElement("ul");

      quarto.itens.forEach(informacao => {
        const li = document.createElement("li");
        li.textContent = informacao;
        listaInformacoes.appendChild(li);
      });

      const link = document.createElement("a");
      link.className = "link-texto";
      link.href =
        `index.html?resort=${encodeURIComponent(resort)}&acomodacao=${encodeURIComponent(quarto.nome)}&origem=${encodeURIComponent(resort)}#planejar`;
      link.textContent = "Solicitar orçamento ↗";

      conteudo.append(listaInformacoes, link);
      item.append(resumo, conteudo);

      item.addEventListener("toggle", () => {

        if (!item.open) return;

        $$("details.acomodacao-item", lista).forEach(outro => {
          if (outro !== item) outro.open = false;
        });
      });

      lista.appendChild(item);
    });
  });

  /* =====================================
     FORMULÁRIO DE ORÇAMENTO
  ===================================== */

  const formulario = $("#formulario-planejamento");

  if (!formulario) return;

  const chegada = $("#data-chegada");
  const saida = $("#data-saida");
  const adultos = $("#hospedes");
  const criancas = $("#criancas");
  const acomodacao = $("#acomodacao");

  const secaoIdades = $("#idades-criancas");
  const camposIdades = $("#campos-idades");

  const modal = $("#janela-modal");
  const textoModal = $("#texto-modal");
  const tituloModal = $("#titulo-modal");
  const avisoModal = $("#aviso-modal");

  const enviarWhatsapp = $("#enviar-whatsapp");
  const copiar = $("#botao-copiar");
  const estadoCopia = $("#estado-copia");

  let mensagem = "";

  const destinos = {
    jardins: "Jardins de Jurema",
    lagos: "Lagos de Jurema",
    "casa-imperial": "Casa Imperial"
  };

  function atualizarAcomodacoes(valorSelecionado = "") {

    const resort =
      $('input[name="resort"]:checked', formulario)?.value;

    const quartos = categorias[resort] || [];

    acomodacao.replaceChildren(
      new Option("Selecione uma acomodação", "")
    );

    quartos.forEach(quarto => {
      acomodacao.add(
        new Option(quarto.nome, quarto.nome)
      );
    });

    acomodacao.value =
      quartos.some(quarto => quarto.nome === valorSelecionado)
        ? valorSelecionado
        : "";
  }

  /* =====================================
     DESTINO SELECIONADO PELA URL
  ===================================== */

  const parametrosUrl = new URLSearchParams(
    window.location.search
  );
  const destinoUrl = parametrosUrl.get("resort");
  const acomodacaoUrl = parametrosUrl.get("acomodacao") || "";

  if (
    Object.prototype.hasOwnProperty.call(
      destinos,
      destinoUrl
    )
  ) {
    const opcao = $$(
      'input[name="resort"]',
      formulario
    ).find(campo => campo.value === destinoUrl);

    if (opcao) opcao.checked = true;
  }

  atualizarAcomodacoes(acomodacaoUrl);

  $$('input[name="resort"]', formulario).forEach(opcao => {
    opcao.addEventListener("change", () => {
      atualizarAcomodacoes();
    });
  });

  /* =====================================
     IDADE DAS CRIANÇAS
  ===================================== */

  function atualizarIdades() {

    const anteriores = $$(
      "select",
      camposIdades
    ).map(campo => campo.value);

    const quantidade = Math.min(
      8,
      Math.max(0, Number(criancas.value) || 0)
    );

    const fragmento = document.createDocumentFragment();

    for (let indice = 0; indice < quantidade; indice++) {

      const numero = indice + 1;

      const rotulo = document.createElement("label");

      const seletor = document.createElement("select");

      seletor.id = `idade-crianca-${numero}`;
      seletor.name = seletor.id;
      seletor.required = true;
      seletor.dataset.idadeCrianca = "true";

      seletor.add(
        new Option("Selecione a idade", "")
      );

      for (let idade = 0; idade <= 17; idade++) {
        seletor.add(
          new Option(
            `${idade} ${idade === 1 ? "ano" : "anos"}`,
            String(idade)
          )
        );
      }

      seletor.value = anteriores[indice] ?? "";

      rotulo.htmlFor = seletor.id;
      rotulo.append(
        `Idade da ${numero}ª criança`,
        seletor
      );

      fragmento.appendChild(rotulo);
    }

    camposIdades.replaceChildren(fragmento);
    secaoIdades.hidden = quantidade === 0;
  }

  criancas.addEventListener(
    "change",
    atualizarIdades
  );

  atualizarIdades();

  /* =====================================
     FUNÇÕES DE DATAS
  ===================================== */

  const dataLocal = data =>
    `${data.getFullYear()}-${doisDigitos(data.getMonth() + 1)}-${doisDigitos(data.getDate())}`;

  const formatoBR = valor => {
    const [ano, mes, dia] = valor.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const proximoDia = valor => {
    const data = new Date(`${valor}T12:00:00`);
    data.setDate(data.getDate() + 1);
    return dataLocal(data);
  };

  function atualizarDatas() {

    const hoje = dataLocal(new Date());

    chegada.min = hoje;

    saida.min = proximoDia(
      chegada.value >= hoje ? chegada.value : hoje
    );

    if (saida.value && saida.value < saida.min) {
      saida.value = "";
    }

    chegada.setCustomValidity("");
    saida.setCustomValidity("");
  }

  chegada.addEventListener("change", atualizarDatas);

  chegada.addEventListener("input", () => {
    chegada.setCustomValidity("");
  });

  saida.addEventListener("input", () => {
    saida.setCustomValidity("");
  });

  atualizarDatas();

  /* =====================================
     ENVIO DO ORÇAMENTO
  ===================================== */

  formulario.addEventListener("submit", evento => {

    evento.preventDefault();

    atualizarDatas();

    const hoje = dataLocal(new Date());

    if (!chegada.value || chegada.value < hoje) {
      chegada.setCustomValidity(
        "Informe uma data de chegada válida."
      );

      chegada.reportValidity();
      return;
    }

    if (!saida.value || saida.value <= chegada.value) {
      saida.setCustomValidity(
        "A saída deve ser posterior à chegada."
      );

      saida.reportValidity();
      return;
    }

    const campos = $$(
      "select[data-idade-crianca]",
      camposIdades
    );

    const pendente = campos.find(
      campo => campo.value === ""
    );

    if (pendente) {
      pendente.reportValidity();
      return;
    }

    const resort =
      $('input[name="resort"]:checked', formulario)?.value
      || "jardins";

    const inicio = Date.parse(
      `${chegada.value}T00:00:00Z`
    );

    const fim = Date.parse(
      `${saida.value}T00:00:00Z`
    );

    const noites = Math.round(
      (fim - inicio) / 86400000
    );

    const idades = campos.map(campo =>
      `${campo.value} ${campo.value === "1" ? "ano" : "anos"}`
    );

    const resumo = [
        ...(() => {
          const parametros = new URLSearchParams(window.location.search);
          const origem = parametros.get("origem");
          const nomesOrigem = {
            jardins: "Página de Jardins de Jurema",
            lagos: "Página de Lagos de Jurema",
            "casa-imperial": "Página da Casa Imperial"
          };

          return origem && nomesOrigem[origem]
            ? [`Cliente veio de: ${nomesOrigem[origem]}`]
            : [];
        })(),
        `Hospedagem: ${destinos[resort]}`,
      ...(acomodacao.value
        ? [`Acomodação: ${acomodacao.value}`]
        : []),
      `Chegada: ${formatoBR(chegada.value)}`,
      `Saída: ${formatoBR(saida.value)}`,
      `Duração: ${noites} ${noites === 1 ? "noite" : "noites"}`,
      `Adultos: ${adultos.value}`,
      `Crianças: ${criancas.value}`,
      ...(
        idades.length
          ? [`Idades das crianças: ${idades.join(", ")}`]
          : []
      )
    ].join("\n");

    mensagem =
      "Olá! Gostaria de solicitar um orçamento.\n\n" +
      resumo +
      "\n\nPor favor, informem os preços e a disponibilidade.";

    const url =
      "https://wa.me/551732811500?text=" +
      encodeURIComponent(mensagem);

    if (enviarWhatsapp) {
      enviarWhatsapp.href = url;
    }

    if (tituloModal) {
      tituloModal.textContent = "Resumo da estadia";
    }

    if (textoModal) {
      textoModal.textContent = resumo;
    }

    if (avisoModal) {
      avisoModal.textContent =
        "A reserva será confirmada somente pelo atendimento.";
    }

    if (estadoCopia) {
      estadoCopia.textContent = "";
    }

    if (modal && typeof modal.showModal === "function") {
      if (!modal.open) modal.showModal();
    } else {
      window.location.assign(url);
    }
  });

  /* =====================================
     FECHAR MODAL
  ===================================== */

  $(".fechar-modal")?.addEventListener("click", () => {
    modal?.close();
  });

  modal?.addEventListener("click", evento => {
    if (evento.target === modal) {
      modal.close();
    }
  });

  /* =====================================
     COPIAR MENSAGEM
  ===================================== */

  copiar?.addEventListener("click", async () => {

    if (!mensagem) return;

    try {

      if (
        navigator.clipboard?.writeText &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(mensagem);
      } else {

        const campo = document.createElement("textarea");

        campo.value = mensagem;
        campo.style.cssText =
          "position:fixed;left:-9999px;top:0;opacity:0";

        document.body.appendChild(campo);

        campo.select();

        const sucesso = document.execCommand("copy");

        campo.remove();

        if (!sucesso) {
          throw new Error("Não foi possível copiar");
        }
      }

      if (estadoCopia) {
        estadoCopia.textContent = "Mensagem copiada!";
      }

    } catch {

      if (estadoCopia) {
        estadoCopia.textContent =
          "Não foi possível copiar. Use o botão do WhatsApp.";
      }
    }
  });

})();

document.querySelectorAll(".galeria-item img").forEach((img) => {
    const figura = img.closest(".galeria-item");

    function imagemCarregada() {
        figura.classList.remove("sem-imagem");
        console.log("Imagem carregada:", img.src);
    }

    img.addEventListener("load", imagemCarregada);

    img.addEventListener("error", () => {
        console.error("Imagem não encontrada:", img.src);
    });

    if (img.complete && img.naturalWidth > 0) {
        imagemCarregada();
    }
});
