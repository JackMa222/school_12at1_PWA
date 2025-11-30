document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
        fetch("/data/verses.json").then((res) => res.json()),
        fetch("/data/books.json").then((res) => res.json()),
        fetch("/data/collections.json").then((res) => res.json()),
    ])
        .then(([verses, books, collections]) => {
            const randomVerses = pickRandom(verses, 3);
            const randomBooks = pickRandom(books, 3);
            const randomCollections = pickRandom(collections, 3);

            renderFeaturedVerses(randomVerses);
            renderFeaturedBooks(randomBooks);
            renderFeaturedCollections(randomCollections);
        })
        .catch((error) => {
            console.error("Error loading data for featured display:", error);
        });
});

function pickRandom(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

// mainly copied from verses.js

function renderFeaturedVerses(verses) {
    const container = document.getElementById("featuredVerses");
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

        //const badge = document.createElement("div");
        //badge.className = "badge whitespace-nowrap badge-secondary ml-auto";
        //badge.textContent = "THEME";

        // Assemble all the parts together

        body.appendChild(headerRow);
        body.appendChild(p);
        //body.appendChild(badge);

        card.appendChild(body);
        container.appendChild(card);
    });
}

// copied from books.js

function renderFeaturedBooks(books) {
    const container = document.getElementById("featuredBooks");
    container.innerHTML = "";

    if (!books.length) {
        container.innerHTML = "<p>No books found.</p>";
        return;
    }

    books.forEach((b) => {
        const card = document.createElement("div");
        card.className = "card card-border bg-base-200 w-96";
        
        const body = document.createElement("div");
        body.className = "card-body"

        const headerRow = document.createElement("div");
        headerRow.className = "flex flex-row justify-between";

        const title = document.createElement("h2");
        title.className = "card-title";
        title.textContent = `${b.book_name}`;

        const collectionBadge = document.createElement("div");
        collectionBadge.className = "badge whitespace-nowrap badge-primary";
        collectionBadge.textContent = b.collection_name || "Unknown collection";

        headerRow.appendChild(title);
        headerRow.appendChild(collectionBadge);

        // Text of verse
        const p = document.createElement("p");
        p.textContent = b.book_description;

        //const badge = document.createElement("div");
        //badge.className = "badge whitespace-nowrap badge-secondary ml-auto";
        //badge.textContent = "THEME";

        // Assemble all the parts together

        body.appendChild(headerRow);
        body.appendChild(p);
        //body.appendChild(badge);

        card.appendChild(body);
        container.appendChild(card);
    });
}

// copied from collections.js
function renderFeaturedCollections(collections) {
    const container = document.getElementById("featuredCollections");
    container.innerHTML = "";

    if (!collections.length) {
        container.innerHTML = "<p>No collections found.</p>";
        return;
    }

    collections.forEach((c) => {
        const card = document.createElement("div");
        card.className = "card card-border bg-base-200 w-96";
        
        const body = document.createElement("div");
        body.className = "card-body"

        const headerRow = document.createElement("div");
        headerRow.className = "flex flex-row justify-between";

        const title = document.createElement("h2");
        title.className = "card-title";
        title.textContent = `${c.collection_name}`;

        const badge = document.createElement("div");
        badge.className = "badge whitespace-nowrap badge-accent";
        const count = c.book_count ?? 0;
        badge.textContent = count === 1 ? "1 book" : `${count} books`;

        headerRow.appendChild(title);
        headerRow.appendChild(badge);

        // Text of verse
        const p = document.createElement("p");
        p.textContent = c.collection_description;

        //const badge = document.createElement("div");
        //badge.className = "badge whitespace-nowrap badge-secondary ml-auto";
        //badge.textContent = "THEME";

        // Assemble all the parts together

        body.appendChild(headerRow);
        body.appendChild(p);
        //body.appendChild(badge);

        card.appendChild(body);
        container.appendChild(card);
    });
}