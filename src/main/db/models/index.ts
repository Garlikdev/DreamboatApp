import Database from 'better-sqlite3'
import path from 'path'

const db = new Database(path.join('./db', 'dreamboat.db'))

db.pragma('journal_mode = WAL')

// Create the tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS port (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        city TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        nr_dowodu TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS boat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        pricePerHour DECIMAL NOT NULL,
        deposit DECIMAL NOT NULL,
        capacity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS pricing (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        boat_id INTEGER NOT NULL,
        days INTEGER NOT NULL,
        price INTEGER NOT NULL,
        FOREIGN KEY (boat_id) REFERENCES boat(id)
    );

    CREATE TABLE IF NOT EXISTS client (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        street TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        city TEXT NOT NULL,
        pesel BIGINT NOT NULL UNIQUE,
        phone INTEGER NOT NULL,
        email TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        nip INTEGER NOT NULL,
        street TEXT NOT NULL,
        postCode TEXT NOT NULL,
        city TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reservation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        boat_id INTEGER NOT NULL,
        port TEXT NOT NULL,
        invoice BOOLEAN DEFAULT FALSE,
        invoice_number INTEGER NOT NULL UNIQUE,
        company_id INTEGER,
        client_id INTEGER NOT NULL,
        zaliczka INTEGER,
        patent_name TEXT NOT NULL,
        patent_number INTEGER NOT NULL,
        cleaning DECIMAL NOT NULL,
        start DATETIME NOT NULL,
        end DATETIME NOT NULL,
        FOREIGN KEY (boat_id) REFERENCES boat(id),
        FOREIGN KEY (company_id) REFERENCES companies(id),
        FOREIGN KEY (client_id) REFERENCES clients(id)
    );
`)

export default db
