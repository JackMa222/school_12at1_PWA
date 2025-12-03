const path = require("path");
const fs = require("fs");

// Export all verses (joined with their books and collections) from SQLite into a JSON file for the front end
function exportVersesToJSON(db) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT
            v.id AS verse_id,
            v.book_id AS verse_book_id,
            v.chapter_number,
            v.verse_number,
            v.verse_text,

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

        FROM Verses v
        JOIN Books b
        ON v.book_id = b.book_id
        JOIN Books_collections bc
        ON b.book_collection_order_index = bc.order_index
        ORDER BY
            bc.order_index,
            b.book_id,
            v.chapter_number,
            v.verse_number
        `;

    db.all(sql, [], (error, rows) => {
        if (error) return reject(error);

        const outputDirectory = path.join(__dirname, "..", "public", "data");
        const outputFile = path.join(outputDirectory, "verses.json");

        // Ensure directory exists
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        // Write JSON file
        fs.writeFile(outputFile, JSON.stringify(rows, null, 2), (error) => {
            if (error) return reject (error);

            console.log(`Exported ${rows.length} verses → ${outputFile}`);
            resolve(true);
        })
    })
    })
}

// Export function
module.exports = exportVersesToJSON;