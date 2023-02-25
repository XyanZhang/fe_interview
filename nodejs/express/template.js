var tmpl = '<h1>{{name}}</h1><h1>{{age}}</h1>';
var data = {name:'zfpx',age:30};
var html= tmpl.replace(/\{\{(\w+)\}\}/g,function(input,group){
    return data[group];
})

console.log(html);