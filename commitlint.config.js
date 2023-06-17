module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 自定义规则,
    'type-enum': [
      2,
      'always',
      [
        'feat', // 创建功能
        'del', // 删除功能
        'fix', // 解决问题
        'style', // 代码格式(不影响代码运行的变动)
        'bump', // 修改某个版本号
        'conf', // 配置文件修改
        'refactor', // 必须进行重构的代码
        'reformat', // 代码格式化
        'perf', // 代码性能优化
        'doc', // 文档构建与修改
        'test', // 增加测试
        'revert', // 回退
        'build' // 打包
      ]
    ]
  }
}
