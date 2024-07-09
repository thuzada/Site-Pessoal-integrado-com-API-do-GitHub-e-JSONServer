document.addEventListener("DOMContentLoaded", function() {
    const username = "thuzada";
    const githubApiUrl = `https://api.github.com/users/${username}`;
    const reposApiUrl = `https://api.github.com/users/${username}/repos`;
    const readmeApiUrl = `https://api.github.com/repos/${username}/descri-ao/readme`;

    // Perfil do Usuário
    fetch(githubApiUrl)
        .then(response => response.json())
        .then(data => {
            document.querySelector("#perfil img").src = data.avatar_url;
            document.querySelector("#perfil h2").textContent = data.name;
        })
        .catch(error => console.error("Erro ao obter dados do perfil do GitHub:", error));

    // Repositórios específicos
    const desiredRepos = {
        "ti-1-pmg-cc-m-20241-g3-descontrole-financeiro": "repo1",
        "Astro-dog-jogo-no-scratch": "repo2",
        "Jurassic-Flyer": "repo3"
    };

    fetch(reposApiUrl)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                if (desiredRepos.hasOwnProperty(repo.name)) {
                    document.getElementById(`watchers-${desiredRepos[repo.name]}`).innerHTML = `<i class="fas fa-eye"></i> ${repo.watchers_count}`;
                    document.getElementById(`stars-${desiredRepos[repo.name]}`).innerHTML = `<i class="fas fa-star"></i> ${repo.stargazers_count}`;
                    const repoCard = document.querySelector(`#${desiredRepos[repo.name]} .card`);
                    repoCard.href = repo.html_url;
                    repoCard.classList.add("card-link");
                }
            });
        })
        .catch(error => console.error("Erro ao obter repositórios do GitHub:", error));

    // Conteúdos do repositório "COLEGAS"
    const contentsRepo = "COLEGAS";
    const contentsApiUrl = `https://api.github.com/repos/${username}/${contentsRepo}/contents/`;

    fetch(contentsApiUrl)
        .then(response => response.json())
        .then(contents => {
            const carouselContent = document.getElementById("carousel-content");
            contents.forEach((content, index) => {
                if (content.type === "file" && content.download_url && (content.name.endsWith(".jpg") || content.name.endsWith(".png"))) {
                    const carouselItem = document.createElement("div");
                    carouselItem.classList.add("carousel-item");
                    if (index === 0) carouselItem.classList.add("active");
                    carouselItem.innerHTML = `
                        <img src="${content.download_url}" class="d-block w-100" alt="${content.name}">
                    `;
                    carouselContent.appendChild(carouselItem);
                }
            });
        })
        .catch(error => console.error("Erro ao obter conteúdos do repositório COLEGAS:", error));

    // Colegas de Trabalho - repositório "colegas2"
    const colleaguesRepo = "colegas2";
    const colleaguesApiUrl = `https://api.github.com/repos/${username}/${colleaguesRepo}/contents/`;

    fetch(colleaguesApiUrl)
        .then(response => response.json())
        .then(contents => {
            const colleaguesCards = document.getElementById("colleagues-cards");
            contents.forEach(content => {
                if (content.type === "file" && content.download_url && (content.name.endsWith(".jpg") || content.name.endsWith(".png"))) {
                    const colleagueCard = document.createElement("div");
                    colleagueCard.classList.add("col-md-4");
                    colleagueCard.innerHTML = `
                        <a href="${content.html_url}" target="_blank" class="card-link">
                            <div class="card mb-4 shadow-sm">
                                <img src="${content.download_url}" class="card-img-top" alt="${content.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${content.name}</h5>
                                </div>
                            </div>
                        </a>
                    `;
                    colleaguesCards.appendChild(colleagueCard);
                }
            });
        })
        .catch(error => console.error("Erro ao obter fotos do repositório colegas2:", error));

    // Obter README
    fetch(readmeApiUrl, {
        headers: {
            'Accept': 'application/vnd.github.v3.raw'
        }
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("perfil p").textContent = data; 
    })
    .catch(error => console.error("Erro ao obter README do GitHub:", error));
});
