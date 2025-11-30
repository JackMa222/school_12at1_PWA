const path = require("path");
const fs = require("fs");

function exportCollectionsToJSON(db) {
    return new Promise((resolve, reject) => {
        const sql = `
        SELECT
            bc.id AS collection_row_id,
            bc.name AS collection_name,
            bc.description AS collection_description,
            bc.order_index AS collection_order_index,
            COUNT(b.id) AS book_count

        FROM Books_collections bc
        LEFT JOIN Books b
        ON b.book_collection_order_index = bc.order_index
        GROUP BY
            bc.id,
            bc.name,
            bc.description,
            bc.order_index        
        ORDER BY
            bc.order_index
        `;

    db.all(sql, [], (error, rows) => {
        if (error) return reject(error);

        const outputDirectory = path.join(__dirname, "..", "public", "data");
        const outputFile = path.join(outputDirectory, "collections.json");

        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory, { recursive: true });
        }

        fs.writeFile(outputFile, JSON.stringify(rows, null, 2), (error) => {
            if (error) return reject (error);

            console.log(`Exported ${rows.length} books → ${outputFile}`);
            resolve(true);
        })
    })
    })
}

module.exports = exportCollectionsToJSON;