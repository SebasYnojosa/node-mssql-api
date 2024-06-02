import sql from "mssql"

const dbSettings = {
    user: "sa",
    password: "1234",
    server: "localhost",
    port: 1433,
    database: "webstore",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error)
    }
}