let allCollections = [];
// Pagination variables
let filteredCollections = [];
const PAGE_SIZE = 15;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    // Fetch collections from server saved code!
    fetch("/data/collections.json")
        .then((res) => res.json())
        .then((data) => {
            allCollections = data;
            filteredCollections = data;

            populateCollectionDatalist(data);
            renderPage();
        })
        .catch((error) => {
            console.error("Error loading data from collections.json", error);
            const container = document.getElementById("collectionCards");
            container.innerHTML="<p>Failed to load collections.</p>"
        });

    // Set up search button to function correctly
    const searchBtn = document.getElementById("collectionSearchBtn");
    const collectionInput = document.getElementById("collectionInput");

    searchBtn.addEventListener("click", () => {
        const query = collectionInput.value.trim().toLowerCase();

        filteredCollections = query
        ? allCollections.filter((c) => {
            const name = (c.collection_name || "").toLowerCase();
            const description = (c.collection_description || "").toLowerCase();
            return (
                name.includes(query) || description.includes(query)
            );
        })
        : allCollections;

        currentPage = 1;
        renderPage();
    });
});

// Fill the datalist with unique collection names
function populateCollectionDatalist(collections) {
    const datalist = document.getElementById("collections");
    datalist.innerHTML = "";

    const uniqueCollections = [
        ...new Set(collections.map((c) => c.collection_name).filter(Boolean)),
    ].sort();

    uniqueCollections.forEach((name) => {
        const opt = document.createElement("option");
        opt.value = name;
        datalist.appendChild(opt);
    })
}

// Render the cards into collectionCards div
function renderCollectionCards(collections) {
    const container = document.getElementById("collectionCards");
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

function renderPage() {
    const total = filteredCollections.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filteredCollections.slice(startIndex, startIndex + PAGE_SIZE);

    renderCollectionCards(pageItems);
    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    const container = document.getElementById("paginationControls");
    container.innerHTML = "";

    if (!filteredCollections.length) return;

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