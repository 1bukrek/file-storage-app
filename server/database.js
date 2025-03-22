import sqlite3 from "sqlite3";
import mysql from "mysql2";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "database", "database.sqlite");

// sqlite3 connection
const sqliteDB = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("SQLite bağlantı hatası:", err);
    } else {
        console.warn("Sqlite connection is successful.");
        sqliteDB.run(`CREATE TABLE IF NOT EXISTS uploads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// MySQL connection
const mysqlDB = mysql.createConnection({
    host: "localhost",
    user: "root", // use your own MySQL username
    password: "123", // use your own MySQL password
    database: "uploads_db"
});

mysqlDB.connect((err) => {
    if (err) console.error("MySQL connection error:", err);
    else {
        console.warn("MySQL connection is successful.");
        mysqlDB.query(`CREATE TABLE IF NOT EXISTS uploads (
            id INT AUTO_INCREMENT PRIMARY KEY,
            filename VARCHAR(255) NOT NULL,
            upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) console.error("MySQL table creation error:", err);
        });
    }
});

// saving file function
export function saveFile(filename) {
    // save to sqlite3
    sqliteDB.run("INSERT INTO uploads (filename) VALUES (?)", [filename], (err) => {
        if (err) console.error("SQLite uploading error:", err);
    });

    // save to MySQL
    mysqlDB.query("INSERT INTO uploads (filename) VALUES (?)", [filename], (err) => {
        if (err) console.error("MySQL uploading error:", err);
    });
}

export { sqliteDB, mysqlDB };
