let allBooks = [];
// Pagination variables
let filteredBooks = [];
const PAGE_SIZE = 15;
let currentPage = 1;

// Main initialisation: load book data, set up search handlers and prepare UI
document.addEventListener("DOMContentLoaded", () => {
    // Fetch books from server saved code!
    fetch("/data/books.json")
        .then((res) => res.json())
        .then((data) => {
            allBooks = data;
            filteredBooks = data;

            populateBookDatalist(data);
            renderPage();
        })
        .catch((error) => {
            console.error("Error loading data from books.json", error);
            const container = document.getElementById("bookCards");
            container.innerHTML="<p>Failed to load books.</p>"
        });

    // Set up search button to function correctly
    const searchBtn = document.getElementById("bookSearchBtn");
    const bookInput = document.getElementById("bookInput");

    searchBtn.addEventListener("click", () => {
        const query = bookInput.value.trim().toLowerCase();
        // Filter books based on user's search query
        filteredBooks = query
        ? allBooks.filter((b) => {
            const name = (b.book_name || "").toLowerCase();
            const shortName = (b.short_name || "").toLowerCase();
            const collection = (b.collection_name || "").toLowerCase();
            return (
                name.includes(query) || shortName.includes(query) || collection.includes(query)
            );
        })
        : allBooks;

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
function populateBookDatalist(books) {
    const datalist = document.getElementById("books");
    datalist.innerHTML = "";

    const uniqueBooks = [
        ...new Set(books.map((b) => b.book_name).filter(Boolean)),
    ].sort();

    uniqueBooks.forEach((bookName) => {
        const opt = document.createElement("option");
        opt.value = bookName;
        datalist.appendChild(opt);
    })
}

// Render the cards into verseCards div
function renderBookCards(books) {
    const container = document.getElementById("bookCards");
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

// Render page using previously created render functions
function renderPage() {
    const total = filteredBooks.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredBooks.slice(startIndex, startIndex + PAGE_SIZE);

    renderBookCards(pageItems);
    renderPaginationControls(totalPages);
}

// Render pagination controls at bottom of container
function renderPaginationControls(totalPages) {
    const container = document.getElementById("paginationControls");
    container.innerHTML = "";

    if (!filteredBooks.length) return;

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