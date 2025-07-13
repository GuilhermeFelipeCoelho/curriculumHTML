const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme =
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.textContent = document.body.dataset.theme === 'dark' ? '☀️' : '🌙';
});

const langToggle = document.getElementById('langToggle');
const translations = {
  "pt-BR": {
    "Objetivo": "Objective",
    "Formação": "Education",
    "Experiência Profissional": "Professional Experience",
    "Projetos": "Projects",
    "Habilidades": "Skills",
    "Qualificações": "Qualifications",
    "Idiomas": "Languages",
    "Referências disponíveis mediante solicitação": "References available upon request",
    "Estágio na área de Engenharia de Computação, Desenvolvimento e Programação ou Análise de Dados, onde posso aplicar meus conhecimentos em programação e análise de dados, contribuindo para o crescimento da empresa.": "Internship in Computer Engineering, Development and Programming or Data Analysis, where I can apply my programming and data analysis knowledge, contributing to the company's growth.",
    "Engenharia de Computação": "Computer Engineering",
    "Atendente": "Attendant",
    "Drogaria São Paulo (Grupo DPSP)": "Drogarias São Paulo (DPSP Group)",
    "Atendimento ao cliente, resolução de problemas e suporte em vendas.": "Customer service, problem solving and sales support.",
    "Web Scraping com Python": "Web Scraping with Python",
    "Desenvolvimento de scripts para extração de dados de websites": "Development of scripts for website data extraction",
    "Armazenamento de informações em SQLite": "Information storage in SQLite",
    "Bot de WhatsApp": "WhatsApp Bot",
    "Desenvolvimento de um bot utilizando Java e Spring Boot": "Development of a bot using Java and Spring Boot",
    "Automação de interações no WhatsApp": "Automation of WhatsApp interactions",
    "Capacidade de trabalhar em equipe e colaborar em projetos": "Ability to work in teams and collaborate on projects",
    "Habilidade em resolver problemas e pensar criticamente": "Problem solving and critical thinking skills",
    "Proatividade e vontade de aprender novas tecnologias": "Proactivity and willingness to learn new technologies",
    "Português": "Portuguese",
    "Nativo": "Native",
    "Inglês": "English",
    "Intermediário": "Intermediarie",
    "UNIVESP - Universidade Virtual do Estado de São Paulo": "UNIVESP - Virtual University of the State of São Paulo",
    "Cursando atualmente: [periodo]º período": "Currently studying: [periodo]th semester",
    "Ainda não iniciou": "Has not started yet",
    "Faculdade concluída": "University completed"
  },
  "en": {
    "Objective": "Objetivo",
    "Education": "Formação",
    "Professional Experience": "Experiência Profissional",
    "Projects": "Projetos",
    "Skills": "Habilidades",
    "Qualifications": "Qualificações",
    "Languages": "Idiomas",
    "References available upon request": "Referências disponíveis mediante solicitação",
    "Internship in Computer Engineering, Development and Programming or Data Analysis, where I can apply my programming and data analysis knowledge, contributing to the company's growth.": "Estágio na área de Engenharia de Computação, Desenvolvimento e Programação ou Análise de Dados, onde posso aplicar meus conhecimentos em programação e análise de dados, contribuindo para o crescimento da empresa.",
    "Computer Engineering": "Engenharia de Computação",
    "Attendant": "Atendente",
    "Drogarias São Paulo (DPSP Group)": "Drogaria São Paulo (Grupo DPSP)",
    "Customer service, problem solving and sales support.": "Atendimento ao cliente, resolução de problemas e suporte em vendas.",
    "Web Scraping with Python": "Web Scraping com Python",
    "Development of scripts for website data extraction": "Desenvolvimento de scripts para extração de dados de websites",
    "Information storage in SQLite": "Armazenamento de informações em SQLite",
    "WhatsApp Bot": "Bot de WhatsApp",
    "Development of a bot using Java and Spring Boot": "Desenvolvimento de um bot utilizando Java e Spring Boot",
    "Automation of WhatsApp interactions": "Automação de interações no WhatsApp",
    "Ability to work in teams and collaborate on projects": "Capacidade de trabalhar em equipe e colaborar em projetos",
    "Problem solving and critical thinking skills": "Habilidade em resolver problemas e pensar criticamente",
    "Proactivity and willingness to learn new technologies": "Proatividade e vontade de aprender novas tecnologias",
    "Portuguese": "Português",
    "Native": "Nativo",
    "English": "Inglês",
    "Intermediarie": "Intermediário",
    "Estimated conclusion: [Ano de Conclusão]": "Previsão: [Ano de Conclusão]",
    "Since september 2024": "Desde setembro de 2024",
    "Currently studying: [periodo]th semester": "Cursando atualmente: [periodo]º período",
    "UNIVESP - Virtual University of the State of São Paulo": "UNIVESP - Universidade Virtual do Estado de São Paulo",
    "Has not started yet": "Ainda não iniciou",
    "University completed": "Faculdade concluída"
  }
};

let currentLang = 'pt-BR';
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const nodes = [];
    while (walker.nextNode()) {
        if (walker.currentNode.parentElement.tagName !== 'SCRIPT') {
            const text = walker.currentNode.nodeValue.trim();
            const possibleKeys = [
                ...Object.keys(translations['pt-BR']),
                ...Object.keys(translations['en'])
            ].filter(k => k !== 'Intermediário');

            if (possibleKeys.some(key => text.includes(key) || text === key)) {
                nodes.push({
                    node: walker.currentNode,
                    text: text
                });
            }
        }
    }

    nodes.forEach(({ node, text }) => {
        if (translations[currentLang][text]) {
            node.nodeValue = node.nodeValue.replace(text, translations[currentLang][text]);
        }
    });

    currentLang = newLang;
    langToggle.textContent = currentLang === 'pt-BR' ? 'EN' : 'PT';
    document.getElementById('htmlLang').setAttribute('lang', currentLang);
});

document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const dateElements = document.querySelectorAll('.date,.dateperiodo , footer p');

    dateElements.forEach(el => {
        if (el.textContent.includes('[Ano de Conclusão]')) {
            el.textContent = el.textContent.replace('[Ano de Conclusão]', currentYear + 3);
        }
        if (el.textContent.includes('[periodo]')) {
            const periodoText = funcGetPeriodo("2023-06-01");
            el.textContent = el.textContent.replace('[periodo]', periodoText);
        }
    });

    const footer = document.querySelector('footer');
    const dateParagraph = document.createElement('p');
    dateParagraph.textContent = `Atualizado em ${new Date().toLocaleDateString('pt-BR')}`;
    footer.prepend(dateParagraph);
});

    function funcGetPeriodo(dataInicio) {
        langToggle.textContent = currentLang === 'pt-BR' ? 'EN' : 'PT';
        document.getElementById('htmlLang').setAttribute('lang', currentLang);

        const inicio = new Date(dataInicio);
        const hoje = new Date();
        const diffMilissegundos = hoje - inicio;
        const seisMesesMs = 6 * 30.44 * 24 * 60 * 60 * 1000;
        const periodoAtual = Math.floor(diffMilissegundos / seisMesesMs) + 1;
        if (periodoAtual > 10) {
            return currentLang === 'pt-BR' ? 'Faculdade concluída' : 'University completed';
        } else if (periodoAtual < 1) {
            return currentLang === 'pt-BR' ? 'Ainda não iniciou' : 'Has not started yet';
        } else if (periodoAtual >= 1 && periodoAtual <= 10) {
            const periodoText = currentLang === 'pt-BR' ? `Cursando atualmente: ${periodoAtual}º período` : `Currently studying: ${periodoAtual}th semester`;
            return periodoText;
        }
    }

document.getElementById('pdfDownload').addEventListener('click', () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
        const printableContent = document.querySelector('.container');
        const opt = {
            margin: 10,
            filename: 'curriculo.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(printableContent).set(opt).save();
    }, 300);
});