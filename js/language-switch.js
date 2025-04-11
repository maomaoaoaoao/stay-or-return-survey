// 全局语言变量
let currentLang = localStorage.getItem('quizLanguage') || 'zh';
console.log("初始语言: " + currentLang);

// 切换语言函数
function toggleLanguage() {
    console.log("toggleLanguage 函数被调用");
    // 反转当前语言
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    // 保存语言设置到 localStorage
    localStorage.setItem('quizLanguage', currentLang);
    console.log("语言已成功保存到localStorage: " + currentLang);
    
    // 立即更新页面样式
    if (currentLang === 'en') {
        document.body.classList.add('lang-en');
    } else {
        document.body.classList.remove('lang-en');
    }
    
    // 更新页面语言
    updatePageLanguage();
    
    // 页面重载以应用新的语言设置
    console.log("即将重新加载页面...");
    window.location.reload();
}

// 更新页面语言
function updatePageLanguage() {
    console.log("正在更新页面语言为: " + currentLang);
    
    // 更新页面标题
    if (window.location.href.includes('survey.html')) {
        document.title = currentLang === 'zh' ? 
            '留or回 | 海外去留探索测试' : 
            'Stay or Return | Overseas Decision Test';
    } else {
        document.title = currentLang === 'zh' ? 
            '留 or 回｜海外发展探索测试' : 
            'Stay or Go｜An Exploratory Assessment of Overseas Adaptability';
    }
    
    // 更新所有带有 data-lang 属性的元素
    const elementsWithLang = document.querySelectorAll('[data-lang]');
    console.log(`找到 ${elementsWithLang.length} 个可翻译元素`);
    
    elementsWithLang.forEach(element => {
        // 设置元素显示状态
        if (element.getAttribute('data-lang') === currentLang) {
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    });
}

// 页面加载时应用保存的语言设置
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面已加载，初始化语言设置...");
    
    // 从localStorage获取语言设置
    const savedLanguage = localStorage.getItem('quizLanguage');
    if (savedLanguage) {
        currentLang = savedLanguage;
        console.log("当前语言设置为: " + currentLang);
    }
    
    // 设置body类
    if (currentLang === 'en') {
        document.body.classList.add('lang-en');
        console.log("已添加lang-en类到body");
    } else {
        document.body.classList.remove('lang-en');
        console.log("已从body移除lang-en类");
    }
    
    // 应用语言设置
    updatePageLanguage();
    
    // 只在首页绑定语言切换按钮事件
    if (window.location.href.includes('index.html') || !window.location.href.includes('survey.html')) {
        const langButton = document.querySelector('.language-switch');
        if (langButton) {
            console.log("找到语言切换按钮，绑定事件");
            
            // 确保按钮能正确工作
            langButton.addEventListener('click', function(event) {
                console.log("语言切换按钮被点击");
                event.preventDefault();
                toggleLanguage();
                return false;
            });
        }
    }
});

function updateResultsLanguage() {
    // 更新结果页面的文本
    const resultTitle = document.querySelector('.result-header h2');
    if (resultTitle) {
        resultTitle.textContent = currentLang === 'zh' ? '你的测试结果' : 'Your Results';
    }
    
    // 更新免责声明
    const disclaimer = document.querySelector('.disclaimer');
    if (disclaimer) {
        disclaimer.textContent = currentLang === 'zh' ? 
            '本测试结果不构成任何医学诊断或行为建议，仅供参考。' : 
            'This test is for informational purposes only and does not constitute medical or behavioral advice.';
    }
}

// 翻译数据对象
const translations = {
    zh: {
        options: {
            1: "完全不同意",
            2: "比较不同意",
            3: "中立",
            4: "比较同意",
            5: "完全同意"
        },
        buttons: {
            start: "开始测评",
            back: "返回首页",
            share: "分享结果",
            next: "下一题",
            prev: "上一题"
        },
        results: {
            title: "你的测试结果",
            decisions: {
                strongStay: "明确建议留海外",
                leaning_stay: "倾向留海外",
                undecided: "中间摇摆",
                leaning_return: "倾向回国",
                strong_return: "明确建议回国"
            }
        },
        disclaimer: "本测试结果不构成任何医学诊断或行为建议，仅供参考。"
    },
    en: {
        options: {
            1: "Strongly disagree",
            2: "Disagree",
            3: "Neutral",
            4: "Agree",
            5: "Strongly agree"
        },
        buttons: {
            start: "Start the Test",
            back: "Back to Home",
            share: "Share Results",
            next: "Next",
            prev: "Back"
        },
        results: {
            title: "Your Results",
            decisions: {
                strongStay: "Strong recommendation to stay abroad",
                leaning_stay: "Leaning towards staying abroad",
                undecided: "Undecided",
                leaning_return: "Leaning towards returning home",
                strong_return: "Strong recommendation to return home"
            }
        },
        disclaimer: "This test is for informational purposes only and does not constitute medical or behavioral advice."
    }
};

function updatePageText() {
    // 更新页面标题
    document.title = translations[currentLang].title;
    document.querySelector('h1').textContent = translations[currentLang].title;
    
    // 更新介绍文本
    document.querySelector('.intro').textContent = translations[currentLang].intro;
    
    // 更新按钮文本
    document.querySelector('#start-btn').textContent = translations[currentLang].startBtn;
    document.querySelector('#prev-btn').textContent = translations[currentLang].prevBtn;
    document.querySelector('#next-btn').textContent = translations[currentLang].nextBtn;
    document.querySelector('#submit-btn').textContent = translations[currentLang].submitBtn;
    document.querySelector('#restart-btn').textContent = translations[currentLang].restartBtn;
    
    // 更新版权信息
    document.querySelector('.copyright').textContent = translations[currentLang].copyright;
    
    // 更新语言切换按钮文本
    document.querySelector('#lang-switch').textContent = currentLang === 'zh' ? 'English' : '中文';
}

// 初始化页面文本
updatePageText(); 