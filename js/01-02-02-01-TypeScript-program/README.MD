# 创建package.json
yarn init -y

# 安装flow
yarn add flow-bin --dev 

# 安装flow插件 移除类型注解
yarn add flow-remove-types --dev

# flow移除命令： yarn flow-remove-types src -d dist

# 安装babel 移除类型注解
yarn add @babel/core @babel/cli @babel/preset-flow --dev

# babel移除命令 ：yarn babel src -d dist

# vs code Flow开发工具插件 flow language Support 
