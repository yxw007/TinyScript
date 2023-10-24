# TinyScript

为了学习编译原理，自己动手实践一个的编译器


## TODO
- [x] 词法分析器(已完成)
- [x] 语法分析器(已完成，采用：递归下降分析)
  - [x] 表达式
  - [x] 声明语句
  - [x] if语句
  - [x] block语句
  - [x] return语句
  - [x] function声明语句
- [ ] 翻译-生成中间代码(三地址代码)(进行中)
  - [x] 建议符号表
  - [x] 翻译声明语句
  - [x] 赋值语句
  - [x] 表达式
  - [x] block语句
  - [x] if语句
  - [ ] 函数声明语句
  - [ ] return语句
  - [ ] 函数调用
- [ ] 中间代码生成器
- [ ] 目标代码生成器

## 相关资料
- [编译原理_哈尔滨工业大学_中国大学MOOC(慕课)](https://www.icourse163.org/course/HIT-1002123007?tid=1468352452)
- [编译原理（国防科技大学/NUDT）](https://www.bilibili.com/video/BV1DJ411M7eV/?spm_id_from=333.999.0.0&vd_source=48d3cd04603032362c730cc7de10ac65)
- [dragonbook](https://suif.stanford.edu/dragonbook/)
- [大学计算机必修课新讲--编译原理+操作系统+图形学(付费课程)](https://coding.imooc.com/learn/list/432.html)

## 关键词
- Lexer: 词法相关
- Lexeme：词法 or token
- TA: Tree Address
- SP: shift pointer
