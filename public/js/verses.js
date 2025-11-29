let allVerses = [];

document.addEventListener("DOMContentLoaded", () => {
    // Fetch verses from server saved code!
    fetch("/data/verses.json")
        .then((res) => res.json())
        .then((data) => {
            allVerses = data;

            populateBookDatalist(data);
            renderVerseCards(data);
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
        const query = bookInput.ariaValueMax.trim.toLowerCase();

        const filtered = query
        ? allVerses.filter((v) => {
            const name = (v.book_name || "").toLowerCase();
            const shortName = (v.shortName || "").toLowerCase();
            return name === query || shortName === query;
        })
        : allVerses;

        renderVerseCards(filtered);
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
    container.innnerHTML = "";

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