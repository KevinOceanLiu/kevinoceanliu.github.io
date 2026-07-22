// ==================== 
// Mobile Navigation
// ====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '64px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
        navMenu.style.backdropFilter = 'blur(20px)';
        navMenu.style.gap = '1rem';
        navMenu.style.padding = '1rem';
        navMenu.style.borderBottom = '1px solid #e6e5e1';
    });

    // Close menu when link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ==================== 
// Active Link Tracking
// ====================

function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentLocation = location.pathname;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentLocation.includes(href) || 
            (currentLocation === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
document.addEventListener('DOMContentLoaded', setActiveLink);

// ====================
// Anchor Links
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ block: 'start' });
        }
    });
});

// Ensure email button always triggers the mail client explicitly
const emailLink = document.querySelector('.hero-link-email');

if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'mailto:haiyang.liu.q6@elms.hokudai.ac.jp';
    });
}

// ====================
// Home Page Language Switcher
// ====================

const homeLanguageButtons = document.querySelectorAll('.language-button[data-language]');

const homeTranslations = {
    zh: {
        pageTitle: '刘海洋 - 个人主页',
        navHome: '首页',
        navPublications: '学术论文',
        navNews: '我的新闻',
        navOthers: '其它',
        researchTitle: '研究方向',
        researchLandscape: '景观生态学',
        researchEcosystem: '生态系统评估',
        researchRemote: '遥感',
        researchSpatial: '空间理论与方法',
        researchGeoai: 'GeoAI',
        educationTitle: '教育背景',
        degreeBs: '<strong>本科</strong>',
        educationBs: '<a href="https://www.sxu.edu.cn/" target="_blank" rel="noreferrer">山西大学</a>，中国太原 / 环境与资源学院 / 自然地理与资源环境',
        degreeMs: '<strong>硕士</strong>',
        educationMs: '<a href="https://www.ucas.ac.cn/" target="_blank" rel="noreferrer">中国科学院大学</a>，中国北京、中国成都 / 成都生物研究所 / 生物与医药（景观生态学与恢复生态学）',
        degreeRa: '<strong>科研助理</strong>',
        educationRa: '<a href="https://www.polyu.edu.hk/" target="_blank" rel="noreferrer">香港理工大学</a>，中国深圳 / 深圳研究院科研助理',
        degreePhd: '<strong>博士</strong>',
        educationPhd: '<a href="https://www.global.hokudai.ac.jp/" target="_blank" rel="noreferrer">北海道大学</a>，日本札幌 / 环境科学院 / 森林野外科学',
        degreeVisiting: '<strong>访学</strong>',
        educationVisiting: '<a href="https://www.curtin.edu.au/" target="_blank" rel="noreferrer">科廷大学</a>，澳大利亚珀斯 / 设计与建成环境学院',
        degreeMembership: '<strong>成员</strong>',
        educationMembership: '科廷大学地理空间智能实验室成员',
        conferenceTitle: '学术会议',
        conferencePoster: '矮竹大规模开花和枯死对森林树木更新的影响：中川实验林幼苗调查（2024-2025）的初步结果。海报发表于 JaLTER Open Science Meeting 2025 (JaLTER-OSM)，日本北海道中川，2025 年 10 月 7-8 日。<a href="file/poster1.pdf" target="_blank" rel="noreferrer">海报</a>',
        skillsTitle: '专业技能',
        skillGis: '<strong>GIS：</strong>ENVI / ArcGIS / QGIS / GEE / GeoDa',
        skillEcology: '<strong>生态学：</strong>Fragstats',
        skillCode: '<strong>编程：</strong>R',
        serviceTitle: '学术服务',
        peerReviewer: '<strong>同行评审：</strong>',
        reviewIjag: 'International Journal of Applied Earth Observation and Geoinformation（Q1，5 次评审）',
        reviewAllEarth: 'All Earth（Q2，1 次评审）',
        reviewGisrs: 'GIScience & Remote Sensing（Q1，1 次评审）',
        awardsTitle: '荣誉奖励',
        awardExex: '北海道大学 EXEX 博士奖学金（2025-2028）',
        awardExexOverseas: '北海道大学 EXEX 博士奖学金海外共同学习项目资助，2026',
        awardJasso: 'JASSO 私费外国人留学生学习奖励费（2025.5-2026.5）',
        awardParty: '中国科学院成都生物研究所优秀共产党员（2023）',
        awardStudent: '中国科学院成都生物研究所优秀学生（2023）',
        awardSecondYear: '山西大学环境与资源学院二年级奖学金（2017）',
        languageTitle: '语言能力',
        languageChinese: '中文（母语）',
        languageEnglish: '英语（流利）',
        languageJapanese: '日语（初级）',
        copyright: 'Copyright © Liu Haiyang. 保留所有权利。'
    },
    ja: {
        pageTitle: '劉 海洋 - 個人サイト',
        navHome: 'ホーム',
        navPublications: '研究業績',
        navNews: 'ニュース',
        navOthers: 'その他',
        researchTitle: '研究関心',
        researchLandscape: '景観生態学',
        researchEcosystem: '生態系評価',
        researchRemote: 'リモートセンシング',
        researchSpatial: '空間理論と方法',
        researchGeoai: 'GeoAI',
        educationTitle: '学歴',
        degreeBs: '<strong>学士</strong>',
        educationBs: '<a href="https://www.sxu.edu.cn/" target="_blank" rel="noreferrer">山西大学</a>，中国・太原 / 環境資源学院 / 自然地理・資源環境',
        degreeMs: '<strong>修士</strong>',
        educationMs: '<a href="https://www.ucas.ac.cn/" target="_blank" rel="noreferrer">中国科学院大学</a>，中国・北京，中国・成都 / 成都生物研究所 / 生物・医薬（景観生態学・復元生態学）',
        degreeRa: '<strong>リサーチアシスタント</strong>',
        educationRa: '<a href="https://www.polyu.edu.hk/" target="_blank" rel="noreferrer">香港理工大学</a>，中国・深圳 / 深圳研究院 リサーチアシスタント',
        degreePhd: '<strong>博士課程</strong>',
        educationPhd: '<a href="https://www.global.hokudai.ac.jp/" target="_blank" rel="noreferrer">北海道大学</a>，日本・札幌 / 環境科学院 / 森林圏フィールド科学',
        degreeVisiting: '<strong>訪問研究</strong>',
        educationVisiting: '<a href="https://www.curtin.edu.au/" target="_blank" rel="noreferrer">カーティン大学</a>，オーストラリア・パース / School of Design and the Built Environment',
        degreeMembership: '<strong>所属</strong>',
        educationMembership: 'カーティン大学 Geospatial Intelligence Lab メンバー',
        conferenceTitle: '学会発表',
        conferencePoster: 'ササの一斉開花と枯死が森林樹木の更新に及ぼす影響：中川研究林における実生調査（2024-2025）の予備結果。JaLTER Open Science Meeting 2025 (JaLTER-OSM) にてポスター発表，日本・北海道中川，2025年10月7-8日。<a href="file/poster1.pdf" target="_blank" rel="noreferrer">ポスター</a>',
        skillsTitle: '技術スキル',
        skillGis: '<strong>GIS：</strong>ENVI / ArcGIS / QGIS / GEE / GeoDa',
        skillEcology: '<strong>生態学：</strong>Fragstats',
        skillCode: '<strong>コード：</strong>R',
        serviceTitle: '学術サービス',
        peerReviewer: '<strong>査読者：</strong>',
        reviewIjag: 'International Journal of Applied Earth Observation and Geoinformation（Q1，5件）',
        reviewAllEarth: 'All Earth（Q2，1件）',
        reviewGisrs: 'GIScience & Remote Sensing（Q1，1件）',
        awardsTitle: '受賞・奨学金',
        awardExex: '北海道大学 EXEX 博士フェローシップ（2025-2028）',
        awardExexOverseas: '北海道大学 EXEX 博士フェローシップ海外共修プログラム助成，2026',
        awardJasso: 'JASSO 私費外国人留学生学習奨励費（2025.5-2026.5）',
        awardParty: '中国科学院成都生物研究所 優秀共産党員（2023）',
        awardStudent: '中国科学院成都生物研究所 優秀学生賞（2023）',
        awardSecondYear: '山西大学 環境資源学院 2年次奨学金（2017）',
        languageTitle: '言語',
        languageChinese: '中国語（母語）',
        languageEnglish: '英語（流暢）',
        languageJapanese: '日本語（初級）',
        copyright: 'Copyright © Liu Haiyang. All rights reserved.'
    }
};

function applyHomeLanguage(language) {
    const translations = homeTranslations[language];

    if (!translations) {
        return;
    }

    document.title = translations.pageTitle;
    document.querySelector('.home-page')?.classList.add('is-translated');

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((element) => {
        const key = element.getAttribute('data-i18n-html');
        if (translations[key]) {
            element.innerHTML = translations[key];
        }
    });

    homeLanguageButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.language === language);
    });
}

if (homeLanguageButtons.length) {
    homeLanguageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            applyHomeLanguage(button.dataset.language);
        });
    });
}

// ====================
// Citation Count
// ====================

const citationCount = document.querySelector('#citation-count');

if (citationCount) {
    const citationDataPath = window.location.pathname.includes('/pages/')
        ? '../data/citations.json'
        : 'data/citations.json';

    const loadCitationData = async () => {
        const url = new URL(citationDataPath, window.location.href);
        url.searchParams.set('t', Date.now().toString());

        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to load citations: ${response.status}`);
        }

        return response.json();
    };

    loadCitationData()
        .then((data) => {
            const citations = Number(data.citations);
            citationCount.textContent = Number.isFinite(citations)
                ? citations.toLocaleString('en-US')
                : '暂无数据';
        })
        .catch((error) => {
            citationCount.textContent = '暂无数据';
            console.error(error);
        });
}

// ====================
// News Carousel
// ====================

const newsCarouselImages = Array.from(document.querySelectorAll('.news-carousel-image'));

if (newsCarouselImages.length > 1) {
    const shuffleImages = (images) => {
        const shuffled = [...images];

        for (let index = shuffled.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }

        return shuffled;
    };

    let activeNewsImage = null;
    let remainingNewsImages = [];

    const prepareNextCycle = () => {
        remainingNewsImages = shuffleImages(newsCarouselImages);

        if (activeNewsImage && remainingNewsImages[0] === activeNewsImage) {
            [remainingNewsImages[0], remainingNewsImages[1]] = [remainingNewsImages[1], remainingNewsImages[0]];
        }
    };

    const showNextNewsImage = () => {
        if (!remainingNewsImages.length) {
            prepareNextCycle();
        }

        activeNewsImage?.classList.remove('is-active');
        activeNewsImage = remainingNewsImages.shift();
        activeNewsImage.classList.add('is-active');
    };

    newsCarouselImages.forEach((image) => image.classList.remove('is-active'));
    showNextNewsImage();
    setInterval(showNextNewsImage, 5000);
}

// ====================
// Subscribe Form
// ====================

const subscribeForm = document.querySelector('.subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            const button = subscribeForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '已订阅！';
            button.style.backgroundColor = '#34c759';
            
            // Reset after 2 seconds
            setTimeout(() => {
                emailInput.value = '';
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    });
}

// ==================== 
// Dark Mode Toggle (Optional)
// ====================

// Uncomment this section if you want to add a dark mode toggle button

/*
const darkModeToggle = document.querySelector('.dark-mode-toggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.style.colorScheme = 
            document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', document.documentElement.style.colorScheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.style.colorScheme = savedTheme;
    }
}
*/

// ==================== 
// Utility Functions
// ====================

/**
 * Debounce function for better performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Log page analytics (optional)
 */
function trackPageView() {
    if (typeof window.gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: window.location.pathname,
            page_title: document.title
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', trackPageView);

console.log('🎉 Welcome to Liu Haiyang\'s personal website!');
