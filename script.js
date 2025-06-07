const baseURL = "http://localhost:3000/api";

async function buscarGitHub() {
  const user = document.getElementById("githubUser").value.trim();
  const res = document.getElementById("githubResult");
  res.innerHTML = "Carregando...";

  try {
    const response = await fetch(`${baseURL}/github/${user}`);
    const data = await response.json();

    res.innerHTML = `
      <img src="${data.avatar_url}" width="100" />
      <p><strong>${data.name || data.login}</strong></p>
      <p>${data.bio || "Sem bio."}</p>
      <a href="${data.html_url}" target="_blank">Ver perfil</a>
    `;
  } catch {
    res.innerHTML = "Usuário não encontrado.";
  }
}

async function buscarConselho() {
  const el = document.getElementById("adviceResult");
  el.innerText = "Carregando...";
  try {
    const res = await fetch(`${baseURL}/advice`);
    const data = await res.json();
    el.innerText = `"${data.advice}"`;
  } catch {
    el.innerText = "Erro ao buscar conselho.";
  }
}

async function buscarNasa() {
  const el = document.getElementById("nasaResult");
  el.innerHTML = "Carregando...";
  try {
    const res = await fetch(`${baseURL}/nasa`);
    const data = await res.json();
    el.innerHTML = `
      <h3>${data.title}</h3>
      <img src="${data.url}" alt="Imagem do dia">
      <p>${data.explanation}</p>
    `;
  } catch {
    el.innerHTML = "Erro ao carregar imagem da NASA.";
  }
}

async function buscarYoutube() {
  const q = document.getElementById("youtubeQuery").value.trim();
  const el = document.getElementById("youtubeResult");
  el.innerHTML = "Carregando...";

  try {
    const res = await fetch(`${baseURL}/youtube?q=${encodeURIComponent(q)}`);
    const videos = await res.json();

    if (videos.length === 0) {
      el.innerHTML = "Nenhum vídeo encontrado.";
      return;
    }

    el.innerHTML = videos.map(video => `
      <div style="margin-bottom: 20px;">
        <h4>${video.snippet.title}</h4>
        <iframe width="100%" height="315"
          src="https://www.youtube.com/embed/${video.id.videoId}"
          frameborder="0" allowfullscreen></iframe>
      </div>
    `).join("");
  } catch {
    el.innerHTML = "Erro ao buscar vídeos.";
  }
}
