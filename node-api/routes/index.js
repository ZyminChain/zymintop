var express = require("express");
var db = require("../db/index");
var adminRouter = require("./admin/admin");
const createHttpError = require("http-errors");

var router = express.Router();

/**
 * @api {get} / home 首页 /
 * @apiName homepage
 * @apiGroup public
 * @apiSampleRequest /
 *
 */
router.get("/", async function (req, res, next) {
    //
    try {
        let asd = 0;
        asd =await new Promise((resolve, rej) => {
            setTimeout(() => {
                console.log('getPowerIot');
                resolve(123312);
            }, 2000);
        });
        res.send(db.r(asd, "获取成功"));
    } catch (error) {
        next(error);
    }
});
async function test() {
    let data =  '';

    return data
}
/**
 * @api {post} /login 登录
 * @apiName admin登录
 * @apiGroup public
 * @apiSampleRequest /login
 * @apiParam (req) {String} account  账号
 * @apiParam (req) {String} password  密码
 *
 */
router.post("/login", async function (req, res, next) {
    try {
        // 参数检查
        db.check(req.body, {
            required: "account, password",
        });
        // 密码加密
        req.body.password = db.encrypt(req.body.password);

        let sql = `SELECT * FROM admin where account='${req.body.account}' and password='${req.body.password}'`;
        let { rows } = await db.query(sql);

        if (rows.length) {
            req.session.admin = rows[0];
            req.session.admin.login = true;
            res.send(db.r(0, "登录成功", req.session.admin));
        } else {
            res.send(db.r(1, "登录失败"));
        }
    } catch (err) {
        next(err);
    }
});

module.exports = {
    use: (app) => {
        // 公共路由
        app.use("/", router);

        app.use(
            "/admin",
            (req, res, next) => {
                // 权限检查
                if (!req.session.admin) {
                    next(createHttpError(401));
                }
                next();
            },
            adminRouter
        );
    },
};
