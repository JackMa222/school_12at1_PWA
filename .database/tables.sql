CREATE TABLE Verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    chapter_number INTEGER,
    verse_number INTEGER,
    verse_text INTEGER,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
)

CREATE TABLE Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_name TEXT NOT NULL,
    description TEXT,
    book_id INTEGER NOT NULL UNIQUE,
    book_collection_order_index INTEGER NOT NULL,
    short_name TEXT,
    FOREIGN KEY (book_collection_order_index) REFERENCES Books_collections(order_index)
)

CREATE TABLE Books_collections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    order_index INTEGER UNIQUE NOT NULL
)