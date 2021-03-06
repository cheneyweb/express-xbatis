# express-xbatis
极简风格的RESTful无后端Node框架，基于express-xbatis中间件，只需要写SQL，然后直接RESTful请求，全自动CRUD

[传送门：XServer官网文档](http://www.xserver.top)

框架整体使用说明
>
	1, config/default.js 中设置数据库连接，执行npm install

	2, 提前创建好数据表，或者使用 xmodel 自动生成数据库

	3, node app.js(启动)

单独使用express-xbatis中间件(任意express应用均可集成)
>
	1, npm install express-xbatis --save

	2, let xbatis = require('express-xbatis')

	3, xbatis.init(app, nodebatis, config.server)

	yaml文件夹路径默认是 {project}/src/yaml/

命名规则
>
	RESTful名，【下划线分割】
	yml文件名，【下划线分割】
	yml方法名，【驼峰法】

框架目录结构（后台）
>
	├── README.md
	├── app.js (应用服务入口)
	├── config (应用服务配置)
	│   ├── default.json
	│   └── production.json
	├── node_modules
	├── package.json
	├── src
	│   ├── nodebatis (数据库连接)
	│   └── yaml (开发时只需要编写这个目录下的文件，一个模块对应一个SQL文件)
	└── xbatis_modules
	    └── express-xbatis (无后端Router中间件express-xbatis的源代码)

RESTful规则
>
	[POST]http://host:port/xbatis/MODEL_NAME/METHOD_NAME

例子
>
	以一个用户模块为例，需要对用户进行定制查询:
	[POST]http://host:port/xbatis/user/find_by_username
		post body:{"username":"cheney"}
	user.yml文件:
		findByUsername:	
    		- select * from user where username = :username

帮助联系
>
	作者:cheneyxu
	邮箱:457299596@qq.com
	QQ:457299596

更新日志
>
	2017.03.18:无后端理念确认，1.0版本推出
	2017.03.25:代码与文档整理
	2017.04.01:为支持ES2015做准备，代码优化
	2017.04.02:以express中间件的形式提供服务，更加高内聚低耦合
	2017.04.08:以中间件的形式重命名
	2018.05.02:精简和升级所有依赖，全新版本
	2018.10.29:升级所有依赖