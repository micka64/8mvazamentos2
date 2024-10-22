// Variáveis para modais 
const postModal = document.getElementById("postModal");
const commentModal = document.getElementById("commentModal");
const forumSection = document.getElementById("forumSection");

// Carregar postagens do local storage ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts.forEach(post => {
        createPostElement(post.titulo, post.descricao);
    });
});

// Abrir modal de nova postagem
document.getElementById("newPostButton").addEventListener("click", () => {
    postModal.style.display = "block";
});

// Fechar modais
document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.onclick = () => {
        postModal.style.display = "none";
        commentModal.style.display = "none";
    };
});

// Função para criar nova postagem
document.getElementById("postForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    // Salvar nova postagem no local storage
    const posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    posts.push({ titulo, descricao });
    localStorage.setItem("forumPosts", JSON.stringify(posts));

    // Cria um novo fórum com título e descrição
    createPostElement(titulo, descricao);
    postModal.style.display = "none";
});

// Função para criar o elemento da postagem
function createPostElement(titulo, descricao) {
    const forumPost = document.createElement("div");
    forumPost.classList.add("forum-post");
    forumPost.innerHTML = `
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <button class="viewPost">Ver Discussão</button>
    `;

    // Adicionar ao fórum
    forumSection.appendChild(forumPost);

    // Configurar visualização de discussão
    forumPost.querySelector(".viewPost").addEventListener("click", () => {
        document.getElementById("postTitle").innerText = titulo;
        document.getElementById("postDescription").innerText = descricao;
        commentModal.style.display = "block";
    });
}

// Função para adicionar comentários anônimos
document.getElementById("commentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const comentario = document.getElementById("novoComentario").value;

    const novoComentarioDiv = document.createElement("div");
    novoComentarioDiv.classList.add("comment");
    novoComentarioDiv.innerText = comentario;

    document.getElementById("commentSection").appendChild(novoComentarioDiv);
    document.getElementById("novoComentario").value = ""; // Limpar campo de comentário
});
