document.addEventListener('DOMContentLoaded', function() {
    console.log('问卷页面加载...');
    
    // 确保 quizQuestions 存在
    if (typeof quizQuestions === 'undefined') {
        console.error('错误：找不到问题数据！请检查 quiz-data.js 是否正确加载');
        return;
    }
    
    // 确保 dimensionExplanationsEN 存在
    if (typeof dimensionExplanationsEN === 'undefined') {
        console.error('错误：找不到英文维度解释数据！请检查 quiz-data.js 是否正确加载');
        return;
    }
    
    // 获取当前语言设置
    let currentLang = localStorage.getItem('quizLanguage') || 'zh';
    
    // 获取DOM元素
    const questionsContainer = document.getElementById('questions-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');
    const resultDecision = document.getElementById('result-decision');
    const resultSummary = document.getElementById('result-summary');
    const dimensionScores = document.getElementById('dimension-scores');
    const restartBtn = document.getElementById('restart-btn');
    const progressBar = document.getElementById('progress-bar');
    const quizForm = document.getElementById('quiz-form');
    const referencesToggle = document.querySelector('.references-toggle');
    const referencesContent = document.getElementById('references-content');
    
    // 检查元素是否存在
    if (!questionsContainer) {
        console.error('找不到问题容器元素!');
        return;
    }
    
    // 当前问题索引
    let currentQuestionIndex = 0;
    // 问题总数
    const totalQuestions = quizQuestions.length;
    
    console.log(`准备加载 ${totalQuestions} 个问题`);
    
    // 维度对应的颜色（用于雷达图）
    const dimensionColors = {
        D1: 'rgba(136, 216, 192, 0.7)',    // 薄荷绿
        D2: 'rgba(164, 184, 224, 0.7)',    // 雾蓝
        D3: 'rgba(241, 182, 173, 0.7)',    // 淡粉
        D4: 'rgba(244, 211, 94, 0.7)',     // 奶油黄
        D5: 'rgba(155, 133, 211, 0.7)'     // 淡紫
    };
    
    // 初始化问卷
    initQuiz();
    
    // 上一题按钮事件监听
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousQuestion);
    }
    
    // 下一题按钮事件监听
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // 检查当前问题是否已回答
            const currentQuestion = document.querySelector(`.question[data-index="${currentQuestionIndex}"]`);
            const isAnswered = currentQuestion.querySelector('input[type="radio"]:checked');
            
            if (!isAnswered) {
                alert('请回答当前问题后再继续');
                return;
            }
            
            showNextQuestion();
        });
    }
    
    // 提交按钮事件监听
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            // 检查所有问题是否已回答
            const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
            
            if (answeredQuestions < totalQuestions) {
                alert(`请回答所有问题！（已回答 ${answeredQuestions}/${totalQuestions} 题）`);
                return;
            }
            
            // 计算结果
            calculateResults();
        });
    }
    
    // 重新开始按钮事件监听
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            resultsContainer.style.display = 'none';
            document.querySelector('.quiz-container').style.display = 'block';
            resetQuiz();
            window.scrollTo(0, 0);
        });
    }
    
    // 参考文献折叠/展开功能
    if (referencesToggle && referencesContent) {
        referencesToggle.addEventListener('click', function() {
            console.log('参考文献按钮被点击');
            // 切换参考文献内容的显示状态
            if (referencesContent.style.display === 'none' || !referencesContent.style.display) {
                referencesContent.style.display = 'block';
                referencesContent.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                if (this.querySelector('.icon')) {
                    this.querySelector('.icon').textContent = '↑';
                }
            } else {
                referencesContent.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
                if (this.querySelector('.icon')) {
                    this.querySelector('.icon').textContent = '↓';
                }
                // 延迟隐藏元素，让过渡效果完成
                setTimeout(() => {
                    referencesContent.style.display = 'none';
                }, 300);
            }
        });
    } else {
        console.error('参考文献元素未找到:', referencesToggle, referencesContent);
    }
    
    /**
     * 初始化问卷，渲染问题和选项
     */
    function initQuiz() {
        // 清空问题容器
        questionsContainer.innerHTML = '';
        
        console.log('开始生成问题...');
        
        // 遍历问题数组，创建问题元素
        quizQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.setAttribute('data-index', index);
            questionDiv.setAttribute('data-dimension', question.dimension);
            
            // 只有第一题显示，其他隐藏
            if (index === 0) {
                questionDiv.classList.add('active');
            }
            
            // 创建问题文本
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = currentLang === 'zh' ? question.text : (question.text_en || question.text);
            questionDiv.appendChild(questionText);
            
            // 创建选项容器
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';
            
            // 创建5个选项（1-5分）
            const options = [
                { value: 1, label: currentLang === 'zh' ? '完全不同意' : 'Strongly disagree' },
                { value: 2, label: currentLang === 'zh' ? '比较不同意' : 'Disagree' },
                { value: 3, label: currentLang === 'zh' ? '中立' : 'Neutral' },
                { value: 4, label: currentLang === 'zh' ? '比较同意' : 'Agree' },
                { value: 5, label: currentLang === 'zh' ? '完全同意' : 'Strongly agree' }
            ];
            
            options.forEach(option => {
                const label = document.createElement('label');
                label.className = 'option';
                
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${index + 1}`;
                input.value = option.value;
                input.className = 'option-input';
                
                // 添加选项点击事件
                input.addEventListener('change', function() {
                    // 移除所有选中样式
                    this.closest('.options').querySelectorAll('.option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // 添加选中样式
                    this.parentElement.classList.add('selected');
                    
                    // 如果不是最后一题，延迟后自动跳转到下一题
                    if (currentQuestionIndex < totalQuestions - 1) {
                        setTimeout(() => {
                            showNextQuestion();
                        }, 300);
                    } else {
                        // 最后一题选择后，高亮提交按钮
                        submitBtn.classList.add('pulse-animation');
                    }
                });
                
                // 创建自定义单选按钮样式
                const checkmark = document.createElement('span');
                checkmark.className = 'checkmark';
                
                const span = document.createElement('span');
                span.className = 'option-label';
                span.textContent = option.label;
                
                label.appendChild(input);
                label.appendChild(checkmark);
                label.appendChild(span);
                optionsDiv.appendChild(label);
            });
            
            questionDiv.appendChild(optionsDiv);
            questionsContainer.appendChild(questionDiv);
        });
        
        console.log(`成功生成 ${questionsContainer.children.length} 个问题`);
        
        // 设置初始进度条
        updateProgressBar();
        
        // 更新按钮文本
        prevBtn.textContent = currentLang === 'zh' ? '上一题' : 'Back';
        nextBtn.textContent = currentLang === 'zh' ? '下一题' : 'Next';
        submitBtn.textContent = currentLang === 'zh' ? '提交' : 'Submit';
        restartBtn.textContent = currentLang === 'zh' ? '重新开始' : 'Restart';
        
        // 更新结果页面文本
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
        
        // 更新语言切换按钮
        const langBtn = document.querySelector('.language-switch');
        if (langBtn) {
            langBtn.textContent = currentLang === 'zh' ? '切换语言' : 'Switch Language';
        }
    }
    
    /**
     * 显示下一个问题
     */
    function showNextQuestion() {
        // 隐藏当前问题
        const currentQuestion = document.querySelector(`.question[data-index="${currentQuestionIndex}"]`);
        currentQuestion.classList.remove('active');
        
        // 更新当前问题索引
        currentQuestionIndex++;
        
        // 显示下一个问题
        const nextQuestion = document.querySelector(`.question[data-index="${currentQuestionIndex}"]`);
        nextQuestion.classList.add('active');
        
        // 更新按钮状态
        updateButtonState();
        
        // 更新进度条
        updateProgressBar();
    }
    
    /**
     * 显示上一个问题
     */
    function showPreviousQuestion() {
        // 隐藏当前问题
        const currentQuestion = document.querySelector(`.question[data-index="${currentQuestionIndex}"]`);
        currentQuestion.classList.remove('active');
        
        // 更新当前问题索引
        currentQuestionIndex--;
        
        // 显示上一个问题
        const prevQuestion = document.querySelector(`.question[data-index="${currentQuestionIndex}"]`);
        prevQuestion.classList.add('active');
        
        // 更新按钮状态
        updateButtonState();
        
        // 更新进度条
        updateProgressBar();
    }
    
    /**
     * 更新按钮状态
     */
    function updateButtonState() {
        // 第一题不显示上一题按钮
        prevBtn.disabled = currentQuestionIndex === 0;
        
        // 最后一题显示提交按钮而不是下一题按钮
        if (currentQuestionIndex === totalQuestions - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }
    
    /**
     * 更新进度条
     */
    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        const progressBar = document.querySelector('.progress-bar-fill');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    /**
     * 重置问卷
     */
    function resetQuiz() {
        // 重置当前问题索引
        currentQuestionIndex = 0;
        
        // 清除所有选中的选项
        document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
            input.checked = false;
            input.parentElement.classList.remove('selected');
        });
        
        // 只显示第一个问题
        document.querySelectorAll('.question').forEach((question, index) => {
            question.classList.remove('active');
            if (index === 0) {
                question.classList.add('active');
            }
        });
        
        // 重置按钮状态
        updateButtonState();
        
        // 重置进度条
        updateProgressBar();
        
        // 移除提交按钮的动画效果
        submitBtn.classList.remove('pulse-animation');
    }
    
    /**
     * 计算测试结果
     */
    function calculateResults() {
        // 收集所有回答
        const allAnswers = [];
        const userAnswers = document.querySelectorAll('input[type="radio"]:checked');
        
        userAnswers.forEach(answer => {
            const questionIndex = parseInt(answer.name.replace('question', '')) - 1;
            const question = quizQuestions[questionIndex];
            const value = parseInt(answer.value);
            
            allAnswers.push({
                question_id: question.id,
                dimension: question.dimension,
                value: value,
                isReverse: question.isReverse
            });
        });
        
        // 确保所有问题都已回答
        if (allAnswers.length < totalQuestions) {
            alert('请回答所有问题后再提交！');
            return;
        }
        
        // 计算维度原始分数
        const dimensionRawScores = calculateDimensionRawScores(allAnswers);
        
        // 标准化分数（转为0-100）
        const dimensionStandardizedScores = standardizeDimensionScores(dimensionRawScores);
        
        // 计算最终得分
        const finalScore = calculateFinalScore(dimensionStandardizedScores);
        
        // 获取结果分类
        const resultExplanation = getFinalScoreExplanation(finalScore);
        const resultCategory = resultExplanation.decision;
        
        // 显示结果
        displayResults(dimensionRawScores, dimensionStandardizedScores, finalScore);
        
        // 隐藏问卷，显示结果
        document.querySelector('.quiz-container').style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // 滚动到顶部
        window.scrollTo(0, 0);
    }
    
    /**
     * 计算各维度原始分数
     */
    function calculateDimensionRawScores(answers) {
        const dimensionScores = {
            D1: [],
            D2: [],
            D3: [],
            D4: [],
            D5: []
        };
        
        // 收集每个维度的所有题目得分
        answers.forEach(answer => {
            // 将1-5分映射为-2到+2分
            let mappedScore = answer.value - 3; // 1->-2, 2->-1, 3->0, 4->1, 5->2
            
            // 反向题取负值
            if (answer.isReverse) {
                mappedScore = -mappedScore;
            }
            
            // 将得分添加到对应维度的数组中
            dimensionScores[answer.dimension].push(mappedScore);
        });
        
        // 计算每个维度的平均分
        const dimensionAverages = {};
        for (const dimension in dimensionScores) {
            const scores = dimensionScores[dimension];
            dimensionAverages[dimension] = scores.reduce((a, b) => a + b, 0) / scores.length;
        }
        
        return dimensionAverages;
    }
    
    /**
     * 标准化各维度分数（转换为0-100）
     */
    function standardizeDimensionScores(dimensionRawScores) {
        const standardizedScores = {};
        
        // 将[-2, +2]映射到[0, 100]
        for (const dimension in dimensionRawScores) {
            standardizedScores[dimension] = ((dimensionRawScores[dimension] + 2) / 4) * 100;
        }
        
        return standardizedScores;
    }
    
    /**
     * 计算最终加权得分
     */
    function calculateFinalScore(dimensionStandardizedScores) {
        // 先将原始评分从[-2, 2]映射到[0, 100]
        // 然后应用权重计算最终得分
        const weightedScore = 
            dimensionWeights.D1 * dimensionStandardizedScores.D1 +
            dimensionWeights.D2 * dimensionStandardizedScores.D2 +
            dimensionWeights.D3 * dimensionStandardizedScores.D3 +
            dimensionWeights.D4 * dimensionStandardizedScores.D4 +
            dimensionWeights.D5 * dimensionStandardizedScores.D5;
        
        return weightedScore;
    }
    
    /**
     * 显示测试结果
     */
    function displayResults(dimensionRawScores, dimensionStandardizedScores, finalScore) {
        // 隐藏问题容器，显示结果容器
        document.getElementById('quiz-form').style.display = 'none';
        document.getElementById('results-container').style.display = 'block';
        
        // 获取最终得分解释
        const explanation = getFinalScoreExplanation(finalScore);
        
        // 创建结果头部
        const resultDecision = document.getElementById('result-decision');
        resultDecision.innerHTML = `
            <div class="final-score">${currentLang === 'zh' ? '海外发展建议值' : 'Overseas Development Index'}: ${Math.round(finalScore)}%</div>
            <div class="final-decision">${explanation.decision}</div>
        `;
        
        // 设置结果解释
        const resultSummary = document.getElementById('result-summary');
        resultSummary.textContent = explanation.text;
        
        // 绘制雷达图
        drawRadarChart(dimensionRawScores);
        
        // 创建维度详细解释卡片
        const dimensionScoresContainer = document.getElementById('dimension-scores');
        dimensionScoresContainer.innerHTML = '';
        
        // 按顺序添加维度卡片
        ['D1', 'D2', 'D3', 'D4', 'D5'].forEach(dimension => {
            const dimensionCard = createDimensionCard(dimension, dimensionRawScores[dimension]);
            dimensionScoresContainer.appendChild(dimensionCard);
        });
        
        // 添加分享按钮和返回按钮
        const actionsContainer = document.querySelector('.results-actions');
        if (actionsContainer) {
            // 清空现有内容
            actionsContainer.innerHTML = `
                <a href="index.html" class="results-report-link">
                    <span class="btn-text-zh">返回首页</span>
                    <span class="btn-text-en">Back to Home</span> →
                </a>
                <button class="btn btn-primary" id="share-btn">
                    <span class="btn-text-zh">分享结果</span>
                    <span class="btn-text-en">Share Results</span>
                </button>
            `;
            
            // 重新绑定按钮事件
            // 分享按钮事件
            const shareBtn = document.getElementById('share-btn');
            if (shareBtn) {
                shareBtn.addEventListener('click', function() {
                    const shareText = currentLang === 'zh' ? 
                        `我的海外发展建议值：${Math.round(finalScore)}%\n${explanation.decision}\n\n你也来测试一下吧~` :
                        `My Overseas Development Index: ${Math.round(finalScore)}%\n${explanation.decision}\n\nTake the test yourself!`;
                    
                    const shareUrl = 'https://maomaoaoaoao.github.io/stay-or-return-survey/';
                    const fullShareText = `${shareText}\n\n${shareUrl}`;
                    
                    // 复制到剪贴板
                    navigator.clipboard.writeText(fullShareText).then(() => {
                        alert(currentLang === 'zh' ? '分享链接和结果已复制到剪贴板！' : 'Share link and results copied to clipboard!');
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        alert(currentLang === 'zh' ? '复制失败，请手动复制链接' : 'Failed to copy, please copy manually');
                    });
                });
            }
        }
        
        // 重新绑定参考文献折叠/展开功能
        const referencesToggle = document.getElementById('references-toggle');
        const referencesContent = document.getElementById('references-content');
        
        // 更新参考文献按钮文本为双语
        if (referencesToggle) {
            const toggleInnerSpan = referencesToggle.querySelector('span');
            if (toggleInnerSpan) {
                toggleInnerSpan.innerHTML = `
                    <span class="btn-text-zh">查看参考文献</span>
                    <span class="btn-text-en">View References</span>
                `;
            }
        }
        
        if (referencesToggle && referencesContent) {
            // 移除已有的事件监听器（如果有）
            const newToggle = referencesToggle.cloneNode(true);
            referencesToggle.parentNode.replaceChild(newToggle, referencesToggle);
            
            // 添加新的事件监听器
            newToggle.addEventListener('click', function() {
                console.log('参考文献按钮被点击');
                if (referencesContent.style.display === 'none' || referencesContent.style.display === '') {
                    referencesContent.style.display = 'block';
                    // 使用setTimeout确保过渡效果正常工作
                    setTimeout(() => {
                        referencesContent.classList.add('active');
                    }, 10);
                    this.setAttribute('aria-expanded', 'true');
                    const iconEl = this.querySelector('.icon');
                    if (iconEl) iconEl.textContent = '↑';
                } else {
                    referencesContent.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    const iconEl = this.querySelector('.icon');
                    if (iconEl) iconEl.textContent = '↓';
                    // 延迟隐藏元素，让过渡效果完成
                    setTimeout(() => {
                        referencesContent.style.display = 'none';
                    }, 300);
                }
            });
        } else {
            console.error('找不到参考文献元素:', referencesToggle, referencesContent);
        }

        // 提交数据到Google Sheet
        const userAnswers = document.querySelectorAll('input[type="radio"]:checked');
        const rawAnswers = Array.from(userAnswers).map(answer => parseInt(answer.value));
        submitToGoogleSheet(
            rawAnswers, 
            dimensionStandardizedScores,
            finalScore,
            explanation.decision,
            currentLang
        );
    }
    
    /**
     * 绘制雷达图
     */
    function drawRadarChart(dimensionScores) {
        // 获取Canvas元素
        const radarCanvas = document.getElementById('radar-chart');

        // 将原始分数从[-2, 2]转换为[0, 100]的百分比
        const percentScores = {};
        for (const dimension in dimensionScores) {
            percentScores[dimension] = ((dimensionScores[dimension] + 2) / 4) * 100;
        }
        
        // 创建雷达图数据
        const data = {
            labels: [
                translations[currentLang].dimensions.D1.name,
                translations[currentLang].dimensions.D2.name,
                translations[currentLang].dimensions.D3.name,
                translations[currentLang].dimensions.D4.name,
                translations[currentLang].dimensions.D5.name
            ],
            datasets: [{
                label: '',
                data: [
                    percentScores.D1,
                    percentScores.D2,
                    percentScores.D3,
                    percentScores.D4,
                    percentScores.D5
                ],
                fill: true,
                backgroundColor: 'rgba(139, 213, 190, 0.3)',
                borderColor: 'rgba(139, 213, 190, 1)',
                pointBackgroundColor: 'rgba(139, 213, 190, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(139, 213, 190, 1)'
            }]
        };

        // 配置选项
        const options = {
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        display: false,
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            elements: {
                line: {
                    tension: 0.2
                }
            }
        };

        // 销毁已有图表（如果存在）
        if (window.radarChart instanceof Chart) {
            window.radarChart.destroy();
        }

        // 创建雷达图
        window.radarChart = new Chart(radarCanvas, {
            type: 'radar',
            data: data,
            options: options
        });
    }
    
    /**
     * 获取维度解释
     */
    function getDimensionExplanation(dimension, score) {
        // 计算标准化得分(0-100)
        const standardizedScore = ((score + 2) / 4) * 100;
        
        // 根据当前语言选择对应的维度解释对象
        const dimensionExplanationsObj = currentLang === 'zh' ? dimensionExplanations : dimensionExplanationsEN;
        
        // 在对应语言的维度解释对象中查找匹配的分数区间
        if (dimensionExplanationsObj && dimensionExplanationsObj[dimension] && dimensionExplanationsObj[dimension].levels) {
            const levels = dimensionExplanationsObj[dimension].levels;
            for (const level of levels) {
                if (standardizedScore >= level.range[0] && standardizedScore <= level.range[1]) {
                    return level.text;
                }
            }
        }
        
        // 如果没有找到匹配的区间，输出一个控制台日志并返回空字符串
        console.log(`无法找到维度 ${dimension} 在分数 ${standardizedScore} 的解释文本`);
        return "";
    }
    
    /**
     * 获取总分解释
     */
    function getFinalScoreExplanation(score) {
        // 查找对应分数段的解释
        for (const explanation of finalScoreExplanations) {
            if (score >= explanation.range[0] && score <= explanation.range[1]) {
                return {
                    decision: explanation.decision[currentLang],
                    text: explanation.text[currentLang]
                };
            }
        }
        
        return {
            decision: '',
            text: ''
        };
    }
    
    /**
     * 创建维度卡片
     * @param {string} dimension - 维度代码（D1-D5）
     * @param {number} score - 维度得分
     * @returns {HTMLElement} - 维度卡片元素
     */
    function createDimensionCard(dimension, score) {
        const card = document.createElement('div');
        card.className = 'dimension-card';
        
        // 创建卡片头部（包含图标、标题和分数）
        const header = document.createElement('div');
        header.className = 'dimension-header';
        
        // 添加维度图标
        const icon = document.createElement('span');
        icon.className = 'dimension-icon';
        icon.textContent = translations[currentLang].dimensions[dimension].icon;
        header.appendChild(icon);
        
        // 添加维度标题
        const title = document.createElement('h3');
        title.className = 'dimension-title';
        title.textContent = translations[currentLang].dimensions[dimension].name;
        header.appendChild(title);
        
        // 添加维度分数
        const scoreDisplay = document.createElement('span');
        scoreDisplay.className = 'dimension-score';
        const scorePercent = Math.round(((score + 2) / 4) * 100);
        scoreDisplay.textContent = scorePercent + '%';
        header.appendChild(scoreDisplay);
        
        card.appendChild(header);
        
        // 添加维度副标题
        const subtitle = document.createElement('div');
        subtitle.className = 'dimension-subtitle';
        
        // 计算标准化得分(0-100)
        const standardizedScore = ((score + 2) / 4) * 100;
        
        // 使用5个区间划分显示副标题
        if (standardizedScore >= 83) {
            subtitle.textContent = currentLang === 'zh' ? '高度优势' : 'Strong Fit';
        } else if (standardizedScore >= 65) {
            subtitle.textContent = currentLang === 'zh' ? '具备优势' : 'Moderate Fit with Strengths';
        } else if (standardizedScore >= 50) {
            subtitle.textContent = currentLang === 'zh' ? '平衡探索中' : 'Balanced but Uncertain';
        } else if (standardizedScore >= 30) {
            subtitle.textContent = currentLang === 'zh' ? '不够匹配' : 'Some Misalignment';
        } else {
            subtitle.textContent = currentLang === 'zh' ? '适配度较低' : 'Low Fit';
        }
        
        card.appendChild(subtitle);
        
        // 添加维度说明
        const explanation = document.createElement('div');
        explanation.className = 'dimension-explanation';
        
        let explanationText = '';
        
        // 对D3维度在低分区间进行特殊处理
        if (dimension === 'D3' && standardizedScore < 30) {
            // 直接从dimensionExplanations中获取文本
            const dimensionExplanationsObj = currentLang === 'zh' ? dimensionExplanations : dimensionExplanationsEN;
            if (dimensionExplanationsObj && 
                dimensionExplanationsObj.D3 && 
                dimensionExplanationsObj.D3.levels) {
                // 获取D3维度[0, 29]区间的解释
                const lowestLevel = dimensionExplanationsObj.D3.levels.find(level => 
                    level.range[0] === 0 && level.range[1] === 29);
                if (lowestLevel && lowestLevel.text) {
                    explanationText = lowestLevel.text;
                    console.log('为D3低分区间找到了直接文本:', explanationText);
                }
            }
        }
        
        // 如果没有通过特殊处理获取到文本，则使用常规方法
        if (!explanationText) {
            explanationText = getDimensionExplanation(dimension, score);
        }
        
        // 记录日志，帮助调试
        console.log(`维度 ${dimension}，分数 ${score}，标准化分数 ${standardizedScore}，解释文本:`, explanationText);
        
        explanation.textContent = explanationText || "未找到对应解释文本，请联系管理员。";
        card.appendChild(explanation);
        
        return card;
    }
    
    /**
     * 向Google Sheet提交数据
     */
    function submitToGoogleSheet(answers, dimensionScores, finalScore, resultCategory, language) {
        const url = 'https://script.google.com/macros/s/AKfycbwZJYM7c4a4yCrygPJ6QLabF7nNpH59b_4Fna7X9V_te3VSuMMX0tuNTNYNFBNkeAN5cg/exec';

        const formattedDimensionScores = {};
        for (const dimension in dimensionScores) {
            formattedDimensionScores[dimension] = Math.round(dimensionScores[dimension]);
        }

        const payload = {
            answers: answers,
            dimension_scores: formattedDimensionScores,
            final_score: Math.round(finalScore),
            result_category: resultCategory,
            language: language,
            timestamp: new Date().toISOString()
        };

        console.log('准备发送数据到Google Sheet:', payload);

        // 将数据转换为 URL 参数
        const params = new URLSearchParams();
        params.append('data', JSON.stringify(payload));

        // 创建一个隐藏的 iframe 来发送请求
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url + '?' + params.toString();
        
        // 监听 iframe 加载完成
        iframe.onload = function() {
            console.log('数据已发送到Google Sheet');
            // 延迟后移除 iframe
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        };

        document.body.appendChild(iframe);
    }
}); 