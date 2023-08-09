# babel

三个步骤

## parse

把源码字符串转化为 AST，过程分为词法分析和语法分析

词法分析：把源码字符串转化为 token

语法分析：将token按照不同语法结构组合成对象

## transform

对AST 进行遍历，处理不同的AST节点会调用注册相应的 visitor 函数，visitor 函数可以对节点进行增删改查等操作，最终得到新的 AST

## generate

将新的AST打印成目标代码字符串，并生成sourcemap。