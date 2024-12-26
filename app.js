async function loadRSS(rssUrl) {
  try {
    // API URL для rss2json.com
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      rssUrl
    )}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch RSS feed.");

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      displayArticlesFromJson(data.items);
    } else {
      document.getElementById("articles").innerHTML =
        "<p>No articles found in this RSS feed.</p>";
    }
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    document.getElementById("articles").innerHTML =
      "<p>Failed to load articles. Please try again later.</p>";
  }
}
function displayArticlesFromJson(items) {
  const articlesContainer = document.getElementById("articles");
  articlesContainer.innerHTML = ""; // Очищаем предыдущие статьи

  items.forEach((item) => {
    const title = item.title || "No title";
    const link = item.link || "#";

    const articleEl = document.createElement("div");
    articleEl.classList.add("article");
    articleEl.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;

    articlesContainer.appendChild(articleEl);
  });
}
// Добавляем обработчики событий на кнопки
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buttons button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const rssUrl = button.getAttribute("data-rss"); // Получаем URL RSS из кнопки
      loadRSS(rssUrl); // Загружаем статьи для выбранного сайта
    });
  });
});
