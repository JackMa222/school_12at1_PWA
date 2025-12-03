const path = require("path");
const fs = require("fs");

// Export all books (joined with their collections) from SQLite into a JSON file for the front end
function exportBooksToJSON(db) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT
            b.id AS book_row_id,
            b.book_name,
            b.description AS book_description,
            b.book_id AS book_number,
            b.short_name,
            b.book_collection_order_index,
            bc.id AS collection_row_id,
            bc.name AS collection_name,
            bc.description AS collection_description,
            bc.order_index AS collection_order_index

        FROM Books b
        JOIN Books_collections bc
        ON b.book_collection_order_index = bc.order_index
        ORDER BY
            bc.order_index,
            b.book_id
        `;

    db.all(sql, [], (error, rows) => {
        if (error) return reject(error);

        const outputDirectory = path.join(__dirname, "..", "public", "data");
        const outputFile = path.join(outputDirectory, "books.json");

        // Ensure directory exists
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        // Write JSON file
        fs.writeFile(outputFile, JSON.stringify(rows, null, 2), (error) => {
            if (error) return reject (error);

            console.log(`Exported ${rows.length} books → ${outputFile}`);
            resolve(true);
        })
    })
    })
}

// Export function
module.exports = exportBooksToJSON;