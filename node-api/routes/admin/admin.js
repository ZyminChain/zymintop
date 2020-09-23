var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var db = require("../../db/index");
var moment = require("moment");

// admin格式
var admin = {
    account: "",
    password: "",
    nickname: "",
    created_at: "",
    updated_at: "",
};

/**
 * @api {get} 获取管理员列表 /admin/list
 * @apiName list
 * @apiGroup admin
 *
 * @apiSuccessExample 成功响应:
 *     HTTP/1.1 200 OK
 *     {
 *       code : 0,
 *       msg: "",
 *       data: Object
 *     }
 * @apiSampleRequest /admin/list
 *
 */
router.get("/list", async function (req, res, next) {
    try {
        // 设置默认值
        var offset = req.query.offset || 0;
        var total = req.query.total || 10;
        var { rows, rowCount } = await db.query(
            `select id,account,null as password,nickname,created_at from admin offset ${offset} limit ${total}`
        );

        return res.json(db.r(0, "数据获取成功", rows, rowCount));
    } catch (e) {
        next(e);
    }
});

router.put("/add", async function (req, res, next) {
    try {
        // 参数检查
        db.check(req.body, {
            required: "account, password",
        });
        // 密码加密
        req.body.password = db.encrypt(req.body.password);

        // 检查是否存在相同账号
        var { rowCount } = await db.query(
            `select account from admin where account = '${req.body.account}'`
        );
        if (rowCount) {
            return res.json(db.r(1, "账号已存在"));
        }

        var { rowCount } = await db.query(`
            insert into admin 
            ( account, password, nickname ) values 
            ( '${req.body.account}' , '${req.body.password}' , '${req.body.account}' )
        `);

        if (rowCount) {
            res.json(db.r(0, "账号添加成功"));
        } else {
            res.json(db.r(1, "账号添加失败"));
        }
    } catch (e) {
        next(e);
    }
});

router.delete("/del", async function (req, res, next) {
    try {
        db.check(req.body, {
            required: "id",
        });

        var { rowCount } = await db.query(
            `delete from admin where id = ${req.body.id}`
        );

        if (rowCount) {
            res.send(db.r(0, "删除成功"));
        } else {
            res.send(db.r(0, "删除成功"));
        }
    } catch (e) {
        next(e);
    }
});

router.put("/update", async function (req, res, next) {
    try {
        db.check(req.body, {
            required: "id",
        });
        if (req.body.password) {
            req.body.password = db.encrypt(req.body.password);
        }

        // 检查账号是否存在
        var { rows, rowCount } = await db.query(
            `select * from admin where id = '${req.body.id}'`
        );
        if (!rowCount) {
            return res.json(db.r(1, "账号不存在"));
        }

        var admin = rows[0];
        req.body.nickname = req.body.nickname || admin.nickname;
        req.body.password = req.body.password || admin.password;
        req.body.updated_at = moment(Date.now()).format(
            "YYYY-MM-DD HH:mm:ss.SSSSSS"
        );

        var { rowCount } = await db.query(` update admin set 
            nickname = '${req.body.nickname}' ,
            password = '${req.body.password}' ,
            updated_at = '${req.body.updated_at}' 
            where id = ${req.body.id} 
        `);

        if (rowCount) {
            res.json(db.r(0, "账号更新成功"));
        } else {
            res.json(db.r(1, "账号更新失败"));
        }
    } catch (e) {
        next(e);
    }
});

module.exports = router;
