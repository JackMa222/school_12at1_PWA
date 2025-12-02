## How the the full data was imported

Given that multiple of the tables had greater than 60 entries, it would be nonsensical  to continue importing by individual SQL commands like those found in tables.sql that have been used for testing. Thus another method invoking the SQLITE3 CLI has been used.

The commands are as following:
``.mode csv``
``.headers on``

1. `.import ".database/csv/book_collections.csv" Books_collections`
2. `.import ".database/csv/books.csv" Books`
3. `.import ".database/csv/verses.csv" Verses`