# git中文件名修改

git日志中会产生两条，一条是删除，一条是新增
举例：
> index.js => main.js

+ deleted: index.js
+ main.js

提交之后会显示
> renamed: index.js => main.js

文件重命名`git mv`
git mv index.js main.js
