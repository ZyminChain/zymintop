define({ "api": [
  {
    "type": "get",
    "url": "获取管理员列表",
    "title": "/admin/list",
    "name": "list",
    "group": "admin",
    "success": {
      "examples": [
        {
          "title": "成功响应:",
          "content": "HTTP/1.1 200 OK\n{\n  code : 0,\n  msg: \"\",\n  data: Object\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/list"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/admin/admin.js",
    "groupTitle": "admin"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "登录",
    "name": "admin登录",
    "group": "public",
    "sampleRequest": [
      {
        "url": "/login"
      }
    ],
    "parameter": {
      "fields": {
        "req": [
          {
            "group": "req",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>账号</p>"
          },
          {
            "group": "req",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "public"
  },
  {
    "type": "get",
    "url": "/",
    "title": "home 首页 /",
    "name": "homepage",
    "group": "public",
    "sampleRequest": [
      {
        "url": "/"
      }
    ],
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "public"
  }
] });
