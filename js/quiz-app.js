document.addEventListener('DOMContentLoaded', function() {
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
    
    // 当前问题索引
    let currentQuestionIndex = 0;
    // 问题总数
    const totalQuestions = quizQuestions.length;
    
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
    prevBtn.addEventListener('click', showPreviousQuestion);
    
    // 下一题按钮事件监听
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
    
    // 提交按钮事件监听
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
    
    // 重新开始按钮事件监听
    restartBtn.addEventListener('click', function() {
        resultsContainer.style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'block';
        resetQuiz();
        window.scrollTo(0, 0);
    });
    
    // 参考文献折叠/展开功能
    if (referencesToggle) {
        referencesToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            // 切换展开状态
            this.setAttribute('aria-expanded', !expanded);
            
            // 切换内容显示
            if (expanded) {
                referencesContent.classList.remove('show');
            } else {
                referencesContent.classList.add('show');
            }
            
            // 更新图标方向
            const icon = this.querySelector('.icon');
            if (icon) {
                if (expanded) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    }
    
    /**
     * 初始化问卷，渲染问题和选项
     */
    function initQuiz() {
        // 清空问题容器
        questionsContainer.innerHTML = '';
        
        // 遍历问题数组，创建问题元素
        quizQuestions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.setAttribute('data-dimension', question.dimension);
            questionDiv.setAttribute('data-index', index);
            
            // 只有第一题显示，其他隐藏
            if (index === 0) {
                questionDiv.classList.add('active');
            }
            
            // 创建问题文本
            const questionText = document.createElement('div');
            questionText.classList.add('question-text');
            
            // 问题编号圆圈
            const questionNumber = document.createElement('span');
            questionNumber.classList.add('question-number');
            questionNumber.textContent = question.id;
            
            questionText.appendChild(questionNumber);
            questionText.appendChild(document.createTextNode(question.text));
            
            questionDiv.appendChild(questionText);
            
            // 创建选项容器
            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');
            
            // 创建5个选项（1-5分）
            quizOptions.forEach(option => {
                const optionItem = document.createElement('label');
                optionItem.classList.add('option-item');
                
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${question.id}`;
                radioInput.value = option.value;
                
                // 创建自定义单选按钮样式
                const checkmark = document.createElement('span');
                checkmark.classList.add('checkmark');
                
                const optionText = document.createElement('span');
                optionText.classList.add('option-text');
                optionText.textContent = option.text;
                
                // 选项点击事件
                optionItem.addEventListener('click', function(event) {
                    // 防止事件冒泡和默认行为
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // 如果已经选中，不执行操作
                    if (radioInput.checked) {
                        return;
                    }
                    
                    // 移除当前问题所有选项的选中状态
                    optionsDiv.querySelectorAll('.option-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    // 添加选中样式
                    optionItem.classList.add('selected');
                    
                    // 选择后自动勾选单选按钮
                    radioInput.checked = true;
                    
                    // 自动进入下一题
                    if (currentQuestionIndex < totalQuestions - 1) {
                        // 短暂延迟，让用户看到选择效果
                        setTimeout(() => {
                            // 直接调用一次showNextQuestion函数
                            showNextQuestion();
                        }, 500);
                    } else {
                        // 最后一题，高亮提交按钮提示用户点击
                        submitBtn.classList.add('pulse-animation');
                    }
                });
                
                optionItem.appendChild(radioInput);
                optionItem.appendChild(checkmark);
                optionItem.appendChild(optionText);
                optionsDiv.appendChild(optionItem);
            });
            
            questionDiv.appendChild(optionsDiv);
            questionsContainer.appendChild(questionDiv);
        });
        
        // 设置初始进度条
        updateProgressBar();
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
        progressBar.style.width = `${progress}%`;
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
     * 计算问卷结果
     */
    function calculateResults() {
        // 收集所有答案
        const answers = [];
        
        // 遍历所有问题，获取用户选择的答案
        document.querySelectorAll('.question').forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            
            if (selectedOption) {
                answers.push({
                    index: index,
                    dimension: question.getAttribute('data-dimension'),
                    value: parseInt(selectedOption.value),
                    isReverse: quizQuestions[index].isReverse
                });
            }
        });
        
        // 确保所有问题都已回答
        if (answers.length < totalQuestions) {
            alert('请回答所有问题后再提交！');
            return;
        }
        
        // 计算各维度原始分数
        const dimensionRawScores = calculateDimensionRawScores(answers);
        
        // 标准化各维度分数（0-100）
        const dimensionStandardizedScores = standardizeDimensionScores(dimensionRawScores);
        
        // 计算加权总分（0-100）
        const finalScore = calculateFinalScore(dimensionStandardizedScores);
        
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
            D1: 0,
            D2: 0,
            D3: 0,
            D4: 0,
            D5: 0
        };
        
        // 计算各维度原始分数
        answers.forEach(answer => {
            // 反向题目需要反转分数 (6 - 分数)
            const score = answer.isReverse ? (6 - answer.value) : answer.value;
            dimensionScores[answer.dimension] += score;
        });
        
        return dimensionScores;
    }
    
    /**
     * 标准化各维度分数（转换为0-100分）
     */
    function standardizeDimensionScores(dimensionRawScores) {
        const standardizedScores = {};
        
        // 标准化各维度分数 (原始分 / 最高分 * 100)
        for (const dimension in dimensionRawScores) {
            const maxPossibleScore = dimensionMaxScores[dimension];
            standardizedScores[dimension] = (dimensionRawScores[dimension] / maxPossibleScore) * 100;
        }
        
        return standardizedScores;
    }
    
    /**
     * 计算加权总分
     */
    function calculateFinalScore(dimensionStandardizedScores) {
        let weightedScore = 0;
        
        // 计算加权总分
        for (const dimension in dimensionStandardizedScores) {
            weightedScore += dimensionStandardizedScores[dimension] * dimensionWeights[dimension];
        }
        
        return weightedScore;
    }
    
    /**
     * 显示问卷结果
     */
    function displayResults(dimensionRawScores, dimensionStandardizedScores, finalScore) {
        // 获取结果容器
        const resultDecision = document.getElementById('result-decision');
        const resultSummary = document.getElementById('result-summary');
        const dimensionScoresContainer = document.getElementById('dimension-scores');
        
        // 清空维度分数容器
        dimensionScoresContainer.innerHTML = '';
        
        // 设置总体结果和解释
        const finalExplanation = getFinalScoreExplanation(finalScore);
        resultDecision.textContent = finalExplanation.decision;
        resultSummary.textContent = finalExplanation.text;
        
        // 绘制雷达图
        drawRadarChart(dimensionStandardizedScores);
        
        // 为每个维度创建分数卡片
        for (const dimension in dimensionRawScores) {
            // 创建维度卡片
            const card = document.createElement('div');
            card.className = 'dimension-card';
            
            // 设置卡片边框颜色
            card.style.borderTopColor = dimensionColors[dimension];
            
            // 创建卡片头部
            const cardHeader = document.createElement('div');
            cardHeader.className = 'dimension-card-header';
            
            // 维度图标
            const dimensionIcons = {
                D1: "🌐", // 现实吸引力
                D2: "🧠", // 自我适配能力
                D3: "💫", // 心理归属感
                D4: "👪", // 家庭因素
                D5: "🎯"  // 目标动机
            };
            
            // 添加图标
            const dimensionIcon = document.createElement('span');
            dimensionIcon.classList.add('dimension-icon');
            dimensionIcon.textContent = dimensionIcons[dimension];
            cardHeader.appendChild(dimensionIcon);
            
            // 维度名称
            const dimensionTitle = document.createElement('div');
            dimensionTitle.classList.add('dimension-card-title');
            dimensionTitle.textContent = dimensionNames[dimension];
            
            cardHeader.appendChild(dimensionTitle);
            
            // 维度分数
            const dimensionScore = document.createElement('div');
            dimensionScore.className = 'dimension-score';
            dimensionScore.textContent = `${dimensionRawScores[dimension]}/${dimensionMaxScores[dimension]}`;
            
            // 维度解释 - 不再截取第一行，显示完整内容
            const explanation = document.createElement('div');
            explanation.className = 'dimension-explanation';
            
            // 获取解释文本并处理换行
            const explanationText = getDimensionExplanation(dimension, dimensionStandardizedScores[dimension]);
            
            // 将解释文本拆分为第一行和剩余部分
            const lines = explanationText.split('\n');
            if (lines.length > 0) {
                // 创建第一行的标题元素
                const firstLine = document.createElement('span');
                firstLine.className = 'dimension-explanation-title';
                firstLine.textContent = lines[0];
                explanation.appendChild(firstLine);
                
                // 如果有更多行，添加剩余内容
                if (lines.length > 1) {
                    const remainingText = lines.slice(1).join('\n');
                    const remainingContent = document.createTextNode(remainingText);
                    explanation.appendChild(remainingContent);
                }
            } else {
                // 如果没有换行，则直接设置文本
                explanation.textContent = explanationText;
            }
            
            // 组装卡片
            card.appendChild(cardHeader);
            card.appendChild(dimensionScore);
            card.appendChild(explanation);
            
            // 添加到容器
            dimensionScoresContainer.appendChild(card);
        }
    }
    
    /**
     * 绘制雷达图
     */
    function drawRadarChart(dimensionScores) {
        // 准备雷达图数据
        const data = {
            labels: [
                dimensionNames.D1,
                dimensionNames.D2,
                dimensionNames.D3,
                dimensionNames.D4,
                dimensionNames.D5
            ],
            datasets: [{
                label: '各维度得分',
                data: [
                    dimensionScores.D1,
                    dimensionScores.D2,
                    dimensionScores.D3,
                    dimensionScores.D4,
                    dimensionScores.D5
                ],
                backgroundColor: 'rgba(136, 216, 192, 0.2)',
                borderColor: 'rgba(136, 216, 192, 1)',
                pointBackgroundColor: [
                    dimensionColors.D1,
                    dimensionColors.D2,
                    dimensionColors.D3,
                    dimensionColors.D4,
                    dimensionColors.D5
                ],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(136, 216, 192, 1)',
                borderWidth: 2
            }]
        };
        
        // 雷达图配置
        const options = {
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.raw.toFixed(1) + '%';
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.1
                }
            }
        };
        
        // 获取画布上下文
        const ctx = document.getElementById('radar-chart').getContext('2d');
        
        // 绘制雷达图
        new Chart(ctx, {
            type: 'radar',
            data: data,
            options: options
        });
    }
    
    /**
     * 获取维度解释
     */
    function getDimensionExplanation(dimension, score) {
        const dimensionInfo = dimensionExplanations[dimension];
        
        // 查找对应分数段的解释
        for (const level of dimensionInfo.levels) {
            if (score >= level.range[0] && score <= level.range[1]) {
                return level.text; // 返回完整文本，不再分割
            }
        }
        
        return '';
    }
    
    /**
     * 获取总分解释
     */
    function getFinalScoreExplanation(score) {
        // 查找对应分数段的解释
        for (const explanation of finalScoreExplanations) {
            if (score >= explanation.range[0] && score <= explanation.range[1]) {
                return {
                    decision: explanation.decision,
                    text: explanation.text
                };
            }
        }
        
        return {
            decision: '',
            text: ''
        };
    }
}); 