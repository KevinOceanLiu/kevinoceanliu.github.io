# 个人网站 - Liu Haiyang

一个简约、现代的个人网站，采用 Apple 风格设计。包含作品集、博客和个人信息页面。

部署网址：`https://kevinoceanliu.github.io/`

## 📂 项目结构

```
LiuHaiyang/
├── index.html              # 首页
├── css/
│   └── style.css           # 全局样式表（包含所有页面样式）
├── js/
│   ├── script.js           # 主交互脚本
│   └── portfolio.js        # 作品集过滤功能
├── pages/
│   ├── portfolio.html      # 作品集页面
│   ├── blog.html           # 博客页面
│   └── about.html          # 关于页面
└── README.md               # 项目说明文件
```

## 🚀 快速开始

### 在本地运行

1. **方法一：直接打开文件**
   - 双击 `index.html` 在浏览器中打开
   - 或右键选择"用浏览器打开"

2. **方法二：使用本地服务器（推荐）**
   
   如果你有 Python 3：
   ```bash
   cd LiuHaiyang
   python -m http.server 8000
   ```
   然后在浏览器中打开 `http://localhost:8000`

   如果你有 Node.js：
   ```bash
   npx http-server
   ```

3. **方法三：使用 VS Code 扩展**
   - 安装 "Live Server" 扩展
   - 右键点击 `index.html` 选择 "Open with Live Server"

## 🎨 自定义修改指南

### 1. 修改个人信息

**首页 (index.html):**
```html
<!-- 修改名字和副标题 -->
<h1 class="hero-title">Hi, I'm [Your Name]</h1>
<p class="hero-subtitle">[Your Title] • [Your Title] • [Your Title]</p>
```

**关于页面 (pages/about.html):**
```html
<!-- 修改关于内容 -->
<h2>你好，我是[Your Name]👋</h2>
<p>修改这里的个人介绍...</p>
```

### 2. 修改颜色和主题

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    /* 修改这些颜色 */
    --primary-color: #000;           /* 主色 */
    --accent-color: #0071e3;         /* 强调色（蓝色） */
    --secondary-color: #f5f5f7;      /* 次要背景色 */
    --text-color: #1d1d1d;           /* 文字颜色 */
    --text-light: #6e6e73;           /* 浅色文字 */
}
```

**颜色建议：**
- 中性色系：灰色、黑色、白色
- 强调色：蓝色、绿色、紫色、橙色等

### 3. 修改作品集

**portfolio.html:**
```html
<!-- 修改项目信息 -->
<div class="portfolio-item" data-category="design">
    <div class="portfolio-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
    <div class="portfolio-info">
        <h3>项目名称</h3>
        <p>项目描述...</p>
    </div>
</div>
```

**修改项目分类：**
```html
<!-- data-category 可以是: all, design, development, branding -->
<div class="portfolio-item" data-category="design">
```

### 4. 修改博客

**blog.html:**
```html
<!-- 添加新文章 -->
<article class="blog-post">
    <div class="blog-meta">
        <span class="blog-date">2026年4月18日</span>
        <span class="blog-category">设计</span>
    </div>
    <h2>文章标题</h2>
    <p class="blog-excerpt">文章摘要...</p>
    <div class="blog-tags">
        <span class="tag">标签1</span>
        <span class="tag">标签2</span>
    </div>
</article>
```

### 5. 修改联系信息

在 **所有页面** 的 Footer 中修改：

```html
<!-- 修改邮箱 -->
<a href="mailto:your.email@example.com">Email</a>

<!-- 修改社交媒体链接 -->
<a href="https://github.com/your-username" target="_blank">GitHub</a>
<a href="https://twitter.com/your-username" target="_blank">Twitter</a>
```

### 6. 修改字体和大小

在 `css/style.css` 中：

```css
:root {
    /* 修改字体系列 */
    --font-family: '你的字体', sans-serif;
    
    /* 修改基础字体大小 */
    --font-size-base: 16px;
}
```

**推荐字体：**
- Google Fonts: Poppins, Inter, Playfair Display
- 系统字体：-apple-system, Segoe UI

### 7. 修改间距和样式

在 `css/style.css` 中调整：

```css
:root {
    /* 间距 */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    
    /* 圆角 */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
}
```

## 💻 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和响应式设计
- **Vanilla JavaScript** - 交互功能

## ✨ 功能特性

- ✅ 响应式设计（手机、平板、桌面）
- ✅ 苹果风格的极简设计
- ✅ 作品集过滤功能
- ✅ 流畅的动画和过渡
- ✅ 易于修改和定制
- ✅ 无外部依赖
- ✅ 快速加载

## 🔗 页面链接

- 首页: `index.html`
- 作品集: `pages/portfolio.html`
- 博客: `pages/blog.html`
- 关于: `pages/about.html`

## 📱 响应式设计

网站在以下屏幕尺寸上完全适配：
- 📱 手机: 320px - 768px
- 📱 平板: 768px - 1024px
- 🖥️ 桌面: 1024px+

## 🌙 暗黑模式

网站自动检测系统设置并应用暗黑主题（可选）。

## 📊 SEO 优化建议

1. 修改每个页面的 `<title>` 标签
2. 添加 meta 描述：
   ```html
   <meta name="description" content="你的网站描述">
   ```
3. 添加 favicon：
   ```html
   <link rel="icon" href="path/to/favicon.ico">
   ```

## 🚀 部署建议

### Netlify（推荐，免费）
1. 推送代码到 GitHub
2. 连接到 Netlify
3. 一键部署

### GitHub Pages
```bash
# 推送到 gh-pages 分支
git push origin gh-pages
```

### 其他平台
- Vercel
- Firebase Hosting
- Heroku

## 💡 进阶定制

### 添加搜索功能
在 `js/script.js` 中添加搜索逻辑

### 添加留言板
使用 Formspree 或 Getform 服务

### 添加分析
集成 Google Analytics：
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

## 📝 常见问题

**Q: 如何更改网站背景色？**
A: 修改 `style.css` 中的 `body { background-color: ... }`

**Q: 如何添加新的项目分类？**
A: 
1. 在 portfolio.html 中添加新的 filter-tag
2. 给项目添加新的 data-category
3. 可选：修改过滤 JavaScript

**Q: 如何连接真实的邮件服务？**
A: 使用 Formspree、EmailJS 或后端服务

## 📄 许可证

自由使用和修改

## 👨‍💻 开发者

Liu Haiyang - 个人网站

---

祝你设计愉快！ 🎉
