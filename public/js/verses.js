let allVerses = [];
// Pagination variables
let filteredVerses = [];
const PAGE_SIZE = 15;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    // Fetch verses from server saved code!
    fetch("/data/verses.json")
        .then((res) => res.json())
        .then((data) => {
            allVerses = data;
            filteredVerses = data;

            populateBookDatalist(data);
            renderPage();
        })
        .catch((error) => {
            console.error("Error loading data from verses.json", error);
            const container = document.getElementById("verseCards");
            container.innerHTML="<p>Failed to load verses.</p>"
        });

    // Set up search button to function correctly
    const searchBtn = document.getElementById("bookSearchBtn");
    const bookInput = document.getElementById("bookInput");

    searchBtn.addEventListener("click", () => {
        const query = bookInput.value.trim().toLowerCase();

        filteredVerses = query
        ? allVerses.filter((v) => {
            const name = (v.book_name || "").toLowerCase();
            const shortName = (v.short_name || "").toLowerCase();
            const collection = (v.collection_name || "").toLowerCase();
            return name.includes(query) || shortName.includes(query) || collection.includes(query)
        })
        : allVerses;

        currentPage = 1;
        renderPage();
    });

    bookInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchBtn.click();
        }
    });
});

// Fill the datalist with unique book names
function populateBookDatalist(verses) {
    const datalist = document.getElementById("books");
    datalist.innerHTML = "";

    const uniqueBooks = [
        ...new Set(verses.map((v) => v.book_name).filter(Boolean)),
    ].sort();

    uniqueBooks.forEach((bookName) => {
        const opt = document.createElement("option");
        opt.value = bookName;
        datalist.appendChild(opt);
    })
}

// Render the cards into verseCards div
function renderVerseCards(verses) {
    const container = document.getElementById("verseCards");
    container.innerHTML = "";

    if (!verses.length) {
        container.innerHTML = "<p>No verses found.</p>";
        return;
    }

    verses.forEach((v) => {
        const card = document.createElement("div");
        card.className = "card card-border bg-base-200 w-96";
        
        const body = document.createElement("div");
        body.className = "card-body"

        const headerRow = document.createElement("div");
        headerRow.className = "flex flex-row justify-between";

        const title = document.createElement("h2");
        title.className = "card-title";
        title.textContent = `${v.book_name} ${v.chapter_number}:${v.verse_number}`;

        const collectionBadge = document.createElement("div");
        collectionBadge.className = "badge whitespace-nowrap badge-primary";
        collectionBadge.textContent = v.collection_name || "Unknown collection";

        headerRow.appendChild(title);
        headerRow.appendChild(collectionBadge);

        // Text of verse
        const p = document.createElement("p");
        p.textContent = v.verse_text;

        const badge = document.createElement("div");
        badge.className = "badge whitespace-nowrap badge-secondary ml-auto";
        badge.textContent = "THEME";

        // Assemble all the parts together

        body.appendChild(headerRow);
        body.appendChild(p);
        body.appendChild(badge);

        card.appendChild(body);
        container.appendChild(card);
    });
}

function renderPage() {
    const total = filteredVerses.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredVerses.slice(startIndex, startIndex + PAGE_SIZE);

    renderVerseCards(pageItems);
    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    const container = document.getElementById("paginationControls");
    container.innerHTML = "";

    if (!filteredVerses.length) return;

    const prevBtn = document.createElement("button");
    prevBtn.className = "btn btn-sm";
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    });

    const nextBtn = document.createElement("button");
    nextBtn.className = "btn btn-sm";
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage();
        }
    });

    const label = document.createElement("span");
    label.textContent = `Page ${currentPage} of ${totalPages}`;

    container.appendChild(prevBtn);
    container.appendChild(label);
    container.appendChild(nextBtn);
}