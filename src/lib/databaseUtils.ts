'use server'

import mysql from 'mysql2/promise'
import { Entry } from './types';
import { join } from 'path';
import fs from 'fs';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'cv',
    password: 'cv',
    database: 'cv'
});

export async function getEntries() {
    let [r] = await (await db).execute('SELECT * FROM entries')
    let rows = r as Entry[]
    rows = rows.map((row)=>{
        row.created = new Date(row.created)
        return row
    })
    return rows
}

export async function saveEntry(data: { name: string, email: string, phone: string, file:string }) {
    const [rows] = await (await db).execute('INSERT INTO entries (name, email, phone, file, status) VALUES (?, ?, ?, ?, ?)', [data.name, data.email, data.phone, data.file, "waiting"])
}

export async function deleteEntryById(id: string) {
    const [r] = await (await db).execute('SELECT * FROM entries WHERE id = ?', [id]);
    const rows = r as Entry[]
    const entry = rows[0]
    
    if (entry) {
        const currentDirectory = process.cwd();
        const path = join(currentDirectory, 'cv-files', entry.file)
        fs.unlinkSync(path)
        await (await db).execute('DELETE FROM entries WHERE id = ?', [id]);
      } else {
        throw new Error("entry does not exist")
      }
}