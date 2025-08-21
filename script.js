document.addEventListener('DOMContentLoaded', () => {
    // Para adicionar uma nova vaga, insira um novo objeto aqui, seguindo o mesmo formato
    const vagas = [
        {
            titulo: 'Desenvolvedor Frontend React',
            empresa: 'TechSorocaba Ltda',
            local: 'Sorocaba - SP',
            data: '15/01/2025',
            salario: 'R$ 4.500 - R$ 7.000',
            tipo: 'CLT',
            area: 'Tecnologia',
            descricao: 'Buscamos desenvolvedor frontend experiente em React para integrar nossa equipe de desenvolvimento de soluções...',
        },
        {
            titulo: 'Assistente Administrativo',
            empresa: 'Indústrias Votorantim S.A.',
            local: 'Votorantim - SP',
            data: '14/01/2025',
            salario: 'R$ 2.200 - R$ 2.800',
            tipo: 'CLT',
            area: 'Administrativa',
            descricao: 'Oportunidade para assistente administrativo em grande indústria da região. Atividades diversas no departamento...',
        },
        {
            titulo: 'Vendedor Externo',
            empresa: 'AutoPeças Sorocaba',
            local: 'Sorocaba - SP',
            data: '13/01/2025',
            salario: 'R$ 2.000 + Comissões',
            tipo: 'CLT',
            area: 'Vendas',
            descricao: 'Vendedor externo para atuar na região de Sorocaba visitando oficinas e revendedores de autopeças.',
        },
        {
            titulo: 'Analista de RH',
            empresa: 'RH Consultoria',
            local: 'Votorantim, SP',
            data: '20/08/2025',
            salario: 'R$ 3.500,00',
            tipo: 'CLT',
            area: 'Recursos Humanos',
            descricao: 'Profissional com experiência em recrutamento e seleção...',
        },
        {
            titulo: 'Estagiário(a) de Marketing',
            empresa: 'Marketing Digital Ltda.',
            local: 'Sorocaba, SP',
            data: '19/08/2025',
            salario: 'Bolsa-auxílio R$ 1.200,00',
            tipo: 'Estágio',
            area: 'Marketing',
            descricao: 'Oportunidade para estudantes de Marketing...',
        },
    ];

    const jobListContainer = document.getElementById('job-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const areaFilter = document.getElementById('area-filter');
    const locationFilter = document.getElementById('location-filter');
    const jobCount = document.getElementById('job-count');

 
    const popularFiltros = () => {
        const areas = [...new Set(vagas.map(vaga => vaga.area))];
        const locations = [...new Set(vagas.map(vaga => vaga.local))];

        areas.forEach(area => {
            const option = document.createElement('option');
            option.value = area;
            option.textContent = area;
            areaFilter.appendChild(option);
        });

        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    };

    
    const criarCardVaga = (vaga) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'job-card';
        
        jobCard.innerHTML = `
            <div class="job-card-header">
                <h3 class="job-title">${vaga.titulo}</h3>
                <span class="job-type">${vaga.tipo}</span>
            </div>
            <p class="job-info">${vaga.empresa}</p>
            <p class="job-info">${vaga.local}</p>
            <p class="job-salary">${vaga.salario}</p>
            <p class="job-description">${vaga.descricao}</p>
            <a href="#" class="details-button">Ver detalhes</a>
        `;
        return jobCard;
    };

    
    const exibirVagas = (vagasParaExibir) => {
        jobListContainer.innerHTML = '';
        jobCount.textContent = `${vagasParaExibir.length} vagas disponíveis`;
        if (vagasParaExibir.length === 0) {
            jobListContainer.innerHTML = '<p style="text-align: center; color: #555; grid-column: 1 / -1;">Nenhuma vaga encontrada para os critérios de busca.</p>';
            return;
        }
        vagasParaExibir.forEach(vaga => {
            jobListContainer.appendChild(criarCardVaga(vaga));
        });
    };

    
    const filtrarVagas = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedArea = areaFilter.value;
        const selectedLocation = locationFilter.value;

        const vagasFiltradas = vagas.filter(vaga => {
            const matchesSearch = vaga.titulo.toLowerCase().includes(searchTerm) || vaga.empresa.toLowerCase().includes(searchTerm);
            const matchesArea = selectedArea === '' || vaga.area === selectedArea;
            const matchesLocation = selectedLocation === '' || vaga.local === selectedLocation;

            return matchesSearch && matchesArea && matchesLocation;
        });

        exibirVagas(vagasFiltradas);
    };

    
    if (searchButton) searchButton.addEventListener('click', filtrarVagas);
    if (searchInput) searchInput.addEventListener('input', filtrarVagas);
    if (areaFilter) areaFilter.addEventListener('change', filtrarVagas);
    if (locationFilter) locationFilter.addEventListener('change', filtrarVagas);

   
    if (jobListContainer) {
        popularFiltros();
        exibirVagas(vagas);
    }
});
