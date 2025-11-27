CREATE TABLE Verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    chapter_number INTEGER,
    verse_number INTEGER,
    verse_text INTEGER,
    FOREIGN KEY (book_id) REFERENCES Books(id)
)

CREATE TABLE Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_name TEXT NOT NULL,
    description TEXT,
    book_id INTEGER NOT NULL,
    short_name TEXT
)