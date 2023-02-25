// 使用ejs模板

//指定渲染模板文件的后缀名为ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
res.render('index');
// 模板使用html后缀

// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
app.set('views',path.join(__dirname,'views'));
// 运行ejs模块
app.engine( '.html', require( 'ejs' ).__express ); //__express是ejs模块的一个公共属性，表示要渲染的文件扩展名

// 参数view就是模板的文件名
// 在渲染模板时locals可为其模板传入变量值
// callback用来处理返回的渲染后的字符串
res.render(view, [locals], callback);