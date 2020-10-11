const { Pool, Client } = require("pg");
const crypto = require("crypto");
var mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "test",
});

const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "NodeDemo",
    password: "0.",
    port: 5432,
});

// 事务
// (async () => {
//     // note: we don't try/catch this because if connecting throws an exception
//     // we don't need to dispose of the client (it will be undefined)
//     const client = await pool.connect();
//     try {
//         await client.query("BEGIN");
//         const queryText = "INSERT INTO users(name) VALUES($1) RETURNING id";
//         const res = await client.query(queryText, ["brianc"]);
//         const insertPhotoText =
//             "INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)";
//         const insertPhotoValues = [res.rows[0].id, "s3.bucket.foo"];
//         await client.query(insertPhotoText, insertPhotoValues);
//         await client.query("COMMIT");
//     } catch (e) {
//         await client.query("ROLLBACK");
//         throw e;
//     } finally {
//         client.release();
//     }
// })().catch((e) => console.error(e.stack));

// 连接数据库
// ; (async () => {
//   await client.connect()
//   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//   console.log(res.rows[0].message) // Hello world!
//   await client.end()
// })()
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
// })

module.exports = {
    // 请求数据库
    query: (text, params) => pool.query(text, params),
    /**
     * @description 检查请求参数
     * @param params object {required:'some1,some2'}
     */
    check: (data, params) => {
        if (!data)
            throw {
                message: "请求字段缺失",
            };
        if (params.required) {
            var arr = params.required.split(",");
            arr.forEach((e) => {
                e = e.trim();
                if (!data[e])
                    throw {
                        message: "必要字段缺失," + e,
                    };
            });
        }
    },

    // 格式化返回值
    r: (code, msg, data, total) => {
        return {
            code: code,
            msg: msg,
            data: data,
            total: total,
        };
    },

    // 加密
    encrypt: (pwd) => {
        var md5 = crypto.createHash("md5");
        return md5.update(pwd).update(pwd).update(pwd).digest("hex");
    },
};
