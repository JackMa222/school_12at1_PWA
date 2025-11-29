CREATE TABLE Verses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    chapter_number INTEGER,
    verse_number INTEGER,
    verse_text TEXT,
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

INSERT INTO Books_collections (name, description, order_index) VALUES (
    "Pentateuch",
    "The first five books of the Bible, traditionally attributed to Moses, forming the theological and historical foundation of Scripture. They narrate creation, humanity's fall, God's covenant with Israel, the Exodus from Egypt, and the giving of the Law, establishing the identity, mission, and worship of God's people.",
    1
)

INSERT INTO Books (book_name, description, book_id, short_name, book_collection_order_index) VALUES (
    "Genesis",
    "Genesis answers two big questions: “How did God's relationship with the world begin?” and “Where did the nation of Israel come from?”",
    1,
    "Gen",
    1
)

INSERT INTO Verses (book_id, chapter_number, verse_number, verse_text) VALUES (
    1,
    1,
    1,
    "In the beginning, God created the heavens and the earth."
)

INSERT INTO Verses (book_id, chapter_number, verse_number, verse_text) VALUES (
    2,
    14,
    14,
    "The Lord will fight for you, and you have only to be silent."
)

INSERT INTO Verses (book_id, chapter_number, verse_number, verse_text) VALUES (
    3,
    19,
    18,
    "You shall not take vengeance or bear a grudge against the sons of your own people, but you shall love your neighbor as yourself: I am the Lord."
)