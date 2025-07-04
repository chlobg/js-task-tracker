const dreamInput = document.getElementById("dreamInput");
const dreamList = document.getElementById("dreamList");
const dreamForm = document.getElementById("dreamForm");
const quoteText = document.getElementById("quoteText");

let dreams = JSON.parse(localStorage.getItem("dreams")) || [];

function loadDreams() {
  dreamList.innerHTML = "";
  dreams.forEach((dream, index) => {
    const li = document.createElement("li");
    li.className = "dream__item";
    li.textContent = dream;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "dream__delete";
    deleteBtn.addEventListener("click", () => {
      dreams.splice(index, 1);
      localStorage.setItem("dreams", JSON.stringify(dreams));
      loadDreams();
    });

    li.appendChild(deleteBtn);
    dreamList.appendChild(li);
  });
}

dreamForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newDream = dreamInput.value.trim();
  if (!newDream) return;
  dreams.push(newDream);
  localStorage.setItem("dreams", JSON.stringify(dreams));
  dreamInput.value = "";
  loadDreams();
});

function loadQuote() {
  quoteText.textContent = `"if you can think about it, you can become it"`;
}

loadDreams();
loadQuote();
