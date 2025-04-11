/**
 * 测试问卷数据
 * 每个问题包含题目文本、维度分类和是否为反向计分题
 * 维度说明：
 * D1 - 现实吸引力判断
 * D2 - 自我适配能力
 * D3 - 心理满足与归属感
 * D4 - 成长路径与家庭匹配
 * D5 - 动机与目标意识
 */
const quizQuestions = [
    // D1 现实吸引力判断 (6题)
    {
        id: 1,
        text: "我对比过国内外的生活条件，认为在海外更有可能获得较高收入和发展机会。",
        text_en: "I've compared living conditions at home and abroad, and I believe I'm more likely to earn a higher income and find development opportunities overseas.",
        dimension: "D1",
        isReverse: false
    },
    {
        id: 2,
        text: "比起国内，我觉得在国外更可能凭实力获得职业机会，不太依赖人脉或出身。",
        text_en: "Compared to my home country, I believe I have a better chance of getting job opportunities abroad based on my abilities, not connections.",
        dimension: "D1",
        isReverse: false
    },
    {
        id: 3,
        text: "我认为国外能提供更多高质量的教育资源，有利于我提升长期竞争力。",
        text_en: "I believe there are more high-quality education and professional training resources overseas that can enhance my long-term competitiveness.",
        dimension: "D1",
        isReverse: false
    },
    {
        id: 4,
        text: "我或我的家庭具备足够的经济基础，能够支撑我在国外探索多种可能。",
        text_en: "My family or myself have enough financial resources to support me while I explore different possibilities abroad.",
        dimension: "D1",
        isReverse: false
    },
    {
        id: 5,
        text: "相比国内，我觉得在国外更容易进入我理想中的行业或公司，开启期待中的职业路径。",
        text_en: "I feel it's easier to enter my ideal industry or company abroad and start the career path I envision.",
        dimension: "D1",
        isReverse: false
    },
    {
        id: 6,
        text: "我觉得国外的制度导致好机会更容易被分配给本地人，而不是我。",
        text_en: "I think good opportunities in foreign countries are more often reserved for locals, not people like me.",
        dimension: "D1",
        isReverse: true
    },
    
    // D2 自我适配能力 (6题)
    {
        id: 7,
        text: "我对生活问题（例如语言不通、陌生的办事流程）感到担忧，害怕自己解决不了。",
        text_en: "I worry about everyday challenges like language barriers or unfamiliar procedures and doubt whether I can handle them.",
        dimension: "D2",
        isReverse: true
    },
    {
        id: 8,
        text: "就算没有人安排或监督，我也能自主地把我该做的事情推进下去。",
        text_en: "Even without supervision or external pressure, I can push forward with the works I'm supposed to do.",
        dimension: "D2",
        isReverse: false
    },
    {
        id: 9,
        text: "去一个新地方生活时，我通常能在一两周内形成自己的生活习惯。",
        text_en: "When moving to a new place, I can usually settle into a routine and lifestyle within a week or two.",
        dimension: "D2",
        isReverse: false
    },
    {
        id: 10,
        text: "遇到问题时，我知道该去找什么资源、工具或人来帮忙解决。",
        text_en: "When facing a problem, I know what tools, resources, or people I can turn to for help.",
        dimension: "D2",
        isReverse: false
    },
    {
        id: 11,
        text: "我优先完成我该做的事情，哪怕我处于情绪低谷。",
        text_en: "Even when I'm feeling down, I still try to complete the things I'm responsible for.",
        dimension: "D2",
        isReverse: false
    },
    {
        id: 12,
        text: "在完全陌生的社交场合，我能够快速交到朋友。",
        text_en: "I can make friends quickly, even in completely unfamiliar social settings.",
        dimension: "D2",
        isReverse: false
    },
    
    // D3 心理归属与认同 (6题)
    {
        id: 13,
        text: "有时候我会因为不了解当地文化而刻意回避和本地人深入交流。",
        text_en: "Sometimes I avoid deeper interactions with locals because I don't fully understand the culture.",
        dimension: "D3",
        isReverse: true
    },
    {
        id: 14,
        text: "在国外的时候，我可以轻松跟本地人聊我真正感兴趣的话题。",
        text_en: "I can easily talk with local people about topics I'm genuinely interested in.",
        dimension: "D3",
        isReverse: false
    },
    {
        id: 15,
        text: "我能够接受与一个跟我不同国家、不同语言、不同种族的人进行长期恋爱。",
        text_en: "I'm comfortable being in a long-term romantic relationship with someone from a different country, language, or race.",
        dimension: "D3",
        isReverse: false
    },
    {
        id: 16,
        text: "我会主动了解国外的政治、文化事件，并乐于讨论。",
        text_en: "I actively learn about local political or cultural events and enjoy discussing them.",
        dimension: "D3",
        isReverse: false
    },
    {
        id: 17,
        text: "在国外生活时，我喜欢参加只有本地人参加的聚会或活动，不会觉得不自在。",
        text_en: "I enjoy attending local-only events or parties and don't feel out of place.",
        dimension: "D3",
        isReverse: false
    },
    {
        id: 18,
        text: "我的手机和电脑的语言设定，基本都是目标国语言。",
        text_en: "My phone and computer are mostly set to the local language.",
        dimension: "D3",
        isReverse: false
    },
    
    // D4 家庭匹配与成长背景 (6题)
    {
        id: 19,
        text: "无论我决定回国还是留下，我的家人都会在情感上和经济上支持我。",
        text_en: "No matter whether I choose to stay abroad or return, my family supports me emotionally and financially.",
        dimension: "D4",
        isReverse: false
    },
    {
        id: 20,
        text: "如果我留在国外生活，我会担心家人觉得我\"不孝\"或\"疏远\"。",
        text_en: "If I choose to live abroad long-term, I worry my family might see me as \"unfilial\" or \"distant.\"",
        dimension: "D4",
        isReverse: true
    },
    {
        id: 21,
        text: "我的家人经常鼓励我留在国外寻找更大的发展空间。",
        text_en: "My family often encourages me to stay abroad and pursue better opportunities.",
        dimension: "D4",
        isReverse: false
    },
    {
        id: 22,
        text: "我对\"为祖国或家庭做出贡献\"有一种天然的责任感。",
        text_en: "I feel a natural sense of duty to contribute to my family or home country.",
        dimension: "D4",
        isReverse: false
    },
    {
        id: 23,
        text: "我的成长经历让我觉得自己更适合在国外发展。",
        text_en: "My upbringing made me feel I'm more suited to develop myself abroad.",
        dimension: "D4",
        isReverse: false
    },
    {
        id: 24,
        text: "即使长期（数年）不和家人见面，我也不会觉得自己有什么问题。",
        text_en: "I don't think there's anything wrong with not seeing my family for several years.",
        dimension: "D4",
        isReverse: false
    },
    
    // D5 动机与目标稳定性 (6题)
    {
        id: 25,
        text: "即使未来环境变化很大，我也会优先考虑留在国外的发展方向。",
        text_en: "Even if things change dramatically in the future, I'll still prioritize building a life abroad.",
        dimension: "D5",
        isReverse: false
    },
    {
        id: 26,
        text: "对我来说，留在国外不是一个\"顺其自然\"的选择，而是深思熟虑后的决定。",
        text_en: "Staying abroad is not something I take lightly, it's a decision I've thought through carefully.",
        dimension: "D5",
        isReverse: false
    },
    {
        id: 27,
        text: "我有明确的目标国家，并了解它的发展路径和相关政策。",
        text_en: "I have a specific country in mind and understand its development path and relevant policies.",
        dimension: "D5",
        isReverse: false
    },
    {
        id: 28,
        text: "当初选择出国，主要是因为我想逃离某种让我感到压力很大的环境。",
        text_en: "One of my main reasons for going abroad was to escape an environment that made me feel overwhelmed.",
        dimension: "D5",
        isReverse: false
    },
    {
        id: 29,
        text: "回国或留下的选择，可以完全靠我独立决定，别人（如家人）不能替我决定。",
        text_en: "Whether I stay or return is entirely my own decision, others (like my family) can't decide for me.",
        dimension: "D5",
        isReverse: false
    },
    {
        id: 30,
        text: "我会为了出国而放弃一些国内的机会，比如实习或工作。",
        text_en: "I'm willing to give up domestic opportunities, like jobs or internships, in order to pursue life abroad.",
        dimension: "D5",
        isReverse: false
    }
];

// 问卷选项（五点量表）
const quizOptions = [
    { value: 1, text: "完全不同意" },
    { value: 2, text: "比较不同意" },
    { value: 3, text: "中立" },
    { value: 4, text: "比较同意" },
    { value: 5, text: "完全同意" }
];

// 各维度的权重（根据用户提供的算法）
const dimensionWeights = {
    D1: 0.30,  // 现实吸引力判断
    D2: 0.20,  // 自我适配能力
    D3: 0.25,  // 心理归属与认同
    D4: 0.10,  // 家庭匹配与成长背景
    D5: 0.15   // 动机与目标稳定性
};

// 各维度的最高分值
const dimensionMaxScores = {
    D1: 30,  // 6题，每题最高5分
    D2: 30,  // 6题，每题最高5分
    D3: 30,  // 6题，每题最高5分
    D4: 30,  // 6题，每题最高5分
    D5: 30   // 6题，每题最高5分
};

// 维度显示名称
const dimensionNames = {
    D1: "现实吸引力",
    D2: "自我适配能力",
    D3: "心理满足与归属",
    D4: "家庭匹配与成长背景",
    D5: "动机与目标意识"
};

const dimensionNames_en = {
    "D1": "Economic Attractiveness",
    "D2": "Self-Adaptability",
    "D3": "Emotional Fulfillment & Belonging",
    "D4": "Family Compatibility & Growth Path",
    "D5": "Motivation & Goal Orientation"
};

// 维度解释
const dimensionExplanations = {
    D1: {
        title: "现实吸引力判断（海外环境下的经济条件和生活支持）",
        levels: [
            { range: [85, 100], text: "你对国外的现实条件非常认同\n你对国外生活的规则、节奏、机会和结构已经非常熟悉，并能从中找到资源、路径和成长的空间。你的回答展现出一种稳定的现实判断力，你知道自己在哪些方面可以扎根，明白留在国外不是纯靠冲动。你可能也认为到国内某些制度、节奏或文化不太适合你。整体来看，国外的现实环境对你有支持力，你很可能在这里站稳脚跟、发挥专长，甚至有不错的经济回报。" },
            { range: [70, 84], text: "留在国外的现实条件能给你提供一定的支持\n你比较认同国外生活的某些特质，虽然你可能还没完全确定能不能长久适应，你也可能对回国这个选择留有余地，但你愿意用现实眼光去评估你未来的生活路径，并且觉得留下来继续努力是有意义的尝试。这种务实的倾向，意味着你希望你的决定能为现实提供更强支撑，而不是完全靠理想。" },
            { range: [50, 69], text: "你还在比较两边的现实利弊\n你能看见国内国外各自的优劣，也在认真衡量它们对你的影响。国外可能让你觉得自由但有点难融入，国内可能更熟悉但压力大、内卷重。你目前还没有完全倾向于哪一边，可能你现阶段需要的不是确切的去留的答案，而是再多一些体验。" },
            { range: [30, 49], text: "你觉得国内在现实上更让人安心\n你的回答显示出你对国内的节奏更有掌控感，你可能也更清楚回国之后的路径怎么走。你可能觉得国外的生活成本高、不好融入，或者未来太不确定。你现在的资源、需求或者情绪状态，或许和国内的匹配感更强。这种情况下，如果你考虑回国，是基于一种对稳定、安全和熟悉环境的选择，而不是被动退让。" },
            { range: [0, 29], text: "你基本不太看好国外的现实条件\n你可能在多个方面都感觉国外\"不好活\"，比如你可能会认为国外的节奏难以适应，生活不够稳定，你也可能会担心自己抓不住一些机会。相比之下，国内的生活让你觉得踏实且有依靠。这其实是很清楚的现实反馈，不代表你不行，而是国外当前给你的支持感太少了，回到你熟悉的地方可能会更容易找到起点。" }
        ]
    },
    D2: {
        title: "自我适配能力（海外环境下的自我适应和处理挑战能力）",
        levels: [
            { range: [85, 100], text: "你在陌生环境中能够有主场感\n你拥有很强的行动力与自我管理能力，你能快速理解规则、独立推进目标、找到方法解决问题，而且即使没人帮忙也能动起来。这种高适配力说明你具备很强的生活掌控力，也具备适应文化差异和情绪波动的心理弹性，让你在国外的生活更具稳定性和自主性，也意味着你具备选择环境的自由权。" },
            { range: [70, 84], text: "你大部分时候能适应新环境\n你通常能适应不同节奏的工作、社交或学习环境，也能处理一些变化和挑战。你在某些情况下可能会对个别文化和规则感到陌生，但你基本能靠自己的方法适应过去。你的分数段说明你有自我管理的能力，只要环境不是特别极端，你一般都能稳定住自己并继续往前走，这使得你整体能维持一种可持续的状态。" },
            { range: [50, 69], text: "你有一定适应力，但不稳定\n你可以在有清晰明确的指导下熟悉环境，这使你可以在一部分情境中独立应对挑战，但如果外部环境缺乏反馈，或你进入到完全陌生的文化氛围中，你可能会感到犹豫或紧张，从而影响你的效率。你适配节奏需要一定的时间，适合逐步累积经验，靠实践来找到自己的舒适区。" },
            { range: [30, 49], text: "陌生环境容易打乱你的节奏\n面对不明确、缺乏支持的场景时，你可能容易产生焦虑或效率低落的状况。你或许更擅长在结构稳定、指令明确的系统中生活，而不是随时要调整策略的混乱环境。这说明你对外部支持有较高需求，在做去留决策时，可能需要优先考虑你的生活环境是否有给你托底的条件。" },
            { range: [0, 29], text: "你目前很难独立适应国外环境\n你回答的情况反映出，在面对新的环境时，你可能容易感到无力、不安，尤其当缺乏明确指导或熟悉社交圈时，这种状态会被放大。这不是能力的问题，而是你更适合有明确边界、支持系统强的生活结构。在当前情况下，贸然留在挑战更大的环境里，可能让你情绪长期处于耗损状态。" }
        ]
    },
    D3: {
        title: "心理满足与归属感（海外环境下的情绪稳定与归属感受）",
        levels: [
            { range: [85, 100], text: "你在国外过得很自在、也能找到情绪安放的地方\n从你的答题来看，你逐渐适应了国外的生活节奏，也能找到像家一样的归属感。你能和当地文化同步，能够保持自我表达，或许也遇到了理解你的人，这些都能够让你感到安心。你建立了自己的节奏和连接方式，这种稳定感说明你有很强的内在扎根能力，外部环境对你来说已经不是障碍。" },
            { range: [70, 84], text: "你大部分时候是舒服的，但仍在观察\n你通常可以保持情绪稳定，也能找到一些适合你的圈子或节奏，但有时候还是会不太确定自己是不是属于这里，可能你有些文化上的差异你还在消化，需要找到自己的平衡点。这也很正常！整体来说你没有完全水土不服，但可能也需要持续调整，寻找那个真正\"像家一样\"的状态。" },
            { range: [50, 69], text: "你正在寻找稳定的归属感\n你在国外可以活得独立，但可能不会有真正的归属感。你在国外可能会常常想家，或不自觉地对比两边的生活。在压力高的时候，你可能会感觉到孤独和抽离，如果你决定留下，可能需要主动去搭建情绪支持的结构，形成稳定和可靠的交际圈，来帮助自己达成心理上的满足。" },
            { range: [30, 49], text: "你在国外的心理状态有点悬浮\n你可能会在很多时候觉得\"我在这里，但不属于这里\"。你可能会遇到文化不同步、价值观错位、表达上的困难，你漂泊在外的时间越长，越会给你带来一些孤独感，长此以往可能加重你的内耗。你可能会觉得国外的生活就像是一场随时要收拾行李的旅行，而不是一个可以安心停靠的地方。这种情绪值得认真看待。" },
            { range: [0, 29], text: "你可能长期感到孤立、压抑或者无法共情\n从结果看，你目前很难在国外找到让你情绪安定的环境或人。这种情况下，找到内心的平衡非常重要，如果你在这种状态下持续生活，可能会受文化隔阂影响，消磨掉自己的主体性。国外的环境可能不能给你提供应有的支持，重建归属的方式，可能得从换环境开始。" }
        ]
    },
    D4: {
        title: "成长路径与家庭匹配",
        levels: [
            { range: [85, 100], text: "你和国外的成长节奏很合拍，家庭也相对支持\n你给人的感觉是很多元，你的家庭给予了你一定的自由空间。你可能从小就接触过多种文化，或很早就习惯自己做决定。你的家庭大概率比较支持你自主选择，也没太多\"必须回国\"的压力。这让你有空间走出一条属于自己的成长路径，你有足够的自由，也容易有清晰的方向。" },
            { range: [70, 84], text: "你在国外有适应力，但家庭影响还是存在\n你适应国外环境的能力不错，也基本能走出自己的节奏。但家庭或文化认同感仍对你有一定影响。你可能还是会感受到拉扯感，在自我成长的同时，可能也会受家庭期待、文化情感、甚至责任感的牵制。你可能想找到一个既不脱离家庭，又能自由发展的方案。" },
            { range: [50, 69], text: "你在家庭和个体路径之间摇摆不定\n你可能一边觉得自己在国外成长得不错，一边担忧和家庭疏远的可能性。家庭在你的人生里占比可能不小，不尝尝回家可能会给你带来内疚、愧疚或者孤单感。如果需要决定去留，你可能需要提前处理好家庭沟通，否则可能会左右为难。" },
            { range: [30, 49], text: "家庭价值和成长路径之间有冲突\n你可能很认同家庭的期待或文化归属，看重家庭的感受和支持，但国外的环境和节奏可能又对你有吸引力。在关键时刻，你有很大可能受家庭的影响作出决定，或选择顺从家人的意见。亲情对你的人生有很大的比重，家人的支持对你来说很重要。" },
            { range: [0, 29], text: "你回国的可能性受家庭影响很大\n你的家庭在你的人生选择中扮演着很重要的角色，也许是经济支持，也可能是情感期待。你更愿意听从父母的安排，这也许让你更容易倾向回国或呆在父母身边，也可能让你不太愿意自己做决定。这种状态下，与家人长期相处、合作也许是更适合你的路线。" }
        ]
    },
    D5: {
        title: "动机与目标意识（海外环境下的长期规划和目标意识清晰度）",
        levels: [
            { range: [85, 100], text: "你清楚自己想要什么，也知道为什么\n你目前的状态很稳定，你对自己未来的样子有清晰构想，也能理解这个决定背后的深层原因，知道自己想要的到底是什么，也很了解什么样的环境更适合你。这说明你不是随波逐流，你有对生活意义的掌控感。你有比较成熟的内在动力在支撑你行动，在这种状态下，无论你选择哪个方向，都会是一个你愿意承担的选择。" },
            { range: [70, 84], text: "你对未来有想法，但还留有弹性\n你整体是有目标感的人，你对未来有大致的想法，也许已经有了一些预设场景。但你心里可能还存在多个版本的未来，想给自己保留更多可能性，属于很适合进一步探索和试验的阶段。现在需要的是更多真实的体验和反馈，来验证哪条路更对得起自己的直觉。" },
            { range: [50, 69], text: "你还在找\"想留下\"或\"想回去\"的真正原因\n你可能不太确定自己当初为什么出国，你现阶段目标比较模糊，这时候你可能容易被情绪、别人说的话、短期事件影响，做出摇摆的判断。如果你愿意停下来问问自己：\"我到底想要什么样的生活？\"那会是一个重要的转折点。" },
            { range: [30, 49], text: "你还需要更多思考\n你的方向感可能变化很大，有时候觉得该留，有时候又想回。你可能没有真正理解去留的选择对你来说意味着什么，或者你还没有到决定性的阶段，这意味着你还有更多可能性和时间来探索自己内在的声音。你真正的方向不在外部，而在你正在慢慢摸索的路上。" },
            { range: [0, 29], text: "你做决定的状态比较被动或情绪化\n你的回答显示出一种目标混沌的状态，你目前可能正在经历焦虑、空转，不知道自己应该做什么。你不是不想做决定，而是你可能不知道要基于什么去做决定。与其做决定，可以先恢复连接自己的能力，听听他人的经验，来更成熟地规划自己的未来。" }
        ]
    }
};

// 创建翻译对象存储不同语言的文本内容
const translations = {
    zh: {
        dimensions: {
            D1: {
                name: "现实吸引力",
                icon: "🌐",
                levels: {
                    high: {
                        title: "现实条件非常支持",
                        text: "你对国外的现实条件可能非常认同。\n你对国外生活的规则、节奏、机会和结构已经非常熟悉，并能从中找到资源、路径和成长的空间。你的回答展现出一种稳定的现实判断力，你知道自己在哪些方面可以扎根，明白留在国外不是纯靠冲动。你可能也认为到国内某些制度、节奏或文化不太适合你。整体来看，国外的现实环境对你有支持力，你很可能在这里站稳脚跟、发挥专长，甚至有不错的经济回报。"
                    },
                    medium: {
                        title: "现实条件有一定支持",
                        text: "选择留在国外，现实条件能给你提供一定的支持。\n你比较认同国外生活的某些特质，虽然你可能还没完全确定能不能长久适应，你也可能对回国这个选择留有余地，但你愿意用现实眼光去评估你未来的生活路径，并且觉得留下来继续努力是有意义的尝试。这种务实的倾向，意味着你希望你的决定能为现实提供更强支撑，而不是完全靠理想。"
                    },
                    low: {
                        title: "国内现实条件更有支持",
                        text: "你可能觉得国内在现实上更让人安心。\n你的回答显示出你对国内的节奏更有掌控感，你可能也更清楚回国之后的路径怎么走。你可能觉得国外的生活成本高、不好融入，或者未来太不确定。你现在的资源、需求或者情绪状态，或许和国内的匹配感更强。这种情况下，如果你考虑回国，是基于一种对稳定、安全和熟悉环境的选择，而不是被动退让。"
                    }
                }
            },
            D2: {
                name: "自我适配能力",
                icon: "🧠",
                levels: {
                    high: {
                        title: "适应能力极强",
                        text: "你在陌生环境中能够有主场感。\n你拥有很强的行动力与自我管理能力，你能快速理解规则、独立推进目标、找到方法解决问题，而且即使没人帮忙也能动起来。这种高适配力说明你具备很强的生活掌控力，也具备适应文化差异和情绪波动的心理弹性，让你在国外的生活更具稳定性和自主性，也意味着你具备选择环境的自由权。"
                    },
                    medium: {
                        title: "适应能力良好",
                        text: "你大部分时候能适应新环境。\n你通常能适应不同节奏的工作、社交或学习环境，也能处理一些变化和挑战。你在某些情况下可能会对个别文化和规则感到陌生，但你基本能靠自己的方法适应过去。你的分数段说明你有自我管理的能力，只要环境不是特别极端，你一般都能稳定住自己并继续往前走，这使得你整体能维持一种可持续的状态。"
                    },
                    low: {
                        title: "适应存在挑战",
                        text: "陌生环境可能容易打乱你的节奏。\n面对不明确、缺乏支持的场景时，你可能容易产生焦虑或效率低落的状况。你或许更擅长在结构稳定、指令明确的系统中生活，而不是随时要调整策略的混乱环境。这说明你对外部支持有较高需求，在做去留决策时，可能需要优先考虑你的生活环境是否有给你托底的条件。"
                    }
                }
            },
            D3: {
                name: "心理满足与归属",
                icon: "💫",
                levels: {
                    high: {
                        title: "归属感强烈",
                        text: "你在国外过得很自在，能找到情绪安放的地方。\n从你的答题来看，你逐渐适应了国外的生活节奏，也能找到像家一样的归属感。你能和当地文化同步，能够保持自我表达，或许也遇到了理解你的人，这些都能够让你感到安心。你建立了自己的节奏和连接方式，这种稳定感说明你有很强的内在扎根能力，外部环境对你来说已经不是障碍。"
                    },
                    medium: {
                        title: "归属感一般",
                        text: "你大部分时候是舒服的，但可能仍在观察。\n你通常可以保持情绪稳定，也能找到一些适合你的圈子或节奏，但有时候还是会不太确定自己是不是属于这里，可能你有些文化上的差异你还在消化，需要找到自己的平衡点。这也很正常！整体来说你没有完全水土不服，但可能也需要持续调整，寻找那个真正\"像家一样\"的状态。"
                    },
                    low: {
                        title: "归属感较弱",
                        text: "你在国外的心理状态可能有点悬浮。\n你可能会在很多时候觉得\"我在这里，但不属于这里\"。你可能会遇到文化不同步、价值观错位、表达上的困难，你漂泊在外的时间越长，越会给你带来一些孤独感，长此以往可能加重你的内耗。你可能会觉得国外的生活就像是一场随时要收拾行李的旅行，而不是一个可以安心停靠的地方。这种情绪值得认真看待。"
                    }
                }
            },
            D4: {
                name: "家庭匹配与成长背景",
                icon: "👪",
                levels: {
                    high: {
                        title: "家庭支持度高",
                        text: "你和国外的成长节奏很合拍，家庭也相对支持。\n你给人的感觉是很多元，你的家庭给予了你一定的自由空间。你可能从小就接触过多种文化，或很早就习惯自己做决定。你的家庭大概率比较支持你自主选择，也没太多\"必须回国\"的压力。这让你有空间走出一条属于自己的成长路径，你有足够的自由，也容易有清晰的方向。"
                    },
                    medium: {
                        title: "家庭影响中立",
                        text: "你在国外有适应力，但家庭影响可能仍然存在。\n你适应国外环境的能力不错，也基本能走出自己的节奏。但家庭或文化认同感仍对你有一定影响。你可能还是会感受到拉扯感，在自我成长的同时，可能也会受家庭期待、文化情感、甚至责任感的牵制。你可能想找到一个既不脱离家庭，又能自由发展的方案。"
                    },
                    low: {
                        title: "家庭影响较大",
                        text: "你的家庭价值和成长路径之间可能有冲突。\n你可能很认同家庭的期待或文化归属，看重家庭的感受和支持，但国外的环境和节奏可能又对你有吸引力。在关键时刻，你有很大可能受家庭的影响作出决定，或选择顺从家人的意见。亲情对你的人生有很大的比重，家人的支持对你来说很重要。"
                    }
                }
            },
            D5: {
                name: "动机与目标意识",
                icon: "🎯",
                levels: {
                    high: {
                        title: "目标明确清晰",
                        text: "你清楚自己想要什么，也知道为什么。\n你目前的状态很稳定，你对自己未来的样子有清晰构想，也能理解这个决定背后的深层原因，知道自己想要的到底是什么，也很了解什么样的环境更适合你。这说明你不是随波逐流，你有对生活意义的掌控感。你有比较成熟的内在动力在支撑你行动，在这种状态下，无论你选择哪个方向，都会是一个你愿意承担的选择。"
                    },
                    medium: {
                        title: "目标较为清晰",
                        text: "你可能对未来有想法，但还留有弹性。\n你整体是有目标感的人，你对未来有大致的想法，也许已经有了一些预设场景。但你心里可能还存在多个版本的未来，想给自己保留更多可能性，属于很适合进一步探索和试验的阶段。现在需要的是更多真实的体验和反馈，来验证哪条路更对得起自己的直觉。"
                    },
                    low: {
                        title: "目标尚不明确",
                        text: "你可能还需要更多思考。\n你的方向感可能变化很大，有时候觉得该留，有时候又想回。你可能没有真正理解去留的选择对你来说意味着什么，或者你还没有到决定性的阶段，这意味着你还有更多可能性和时间来探索自己内在的声音。你真正的方向不在外部，而在你正在慢慢摸索的路上。"
                    }
                }
            }
        }
    },
    en: {
        dimensions: {
            D1: {
                name: "Economic Attractiveness",
                icon: "🌐",
                levels: {
                    high: {
                        title: "Strong Practical Support",
                        text: "You strongly resonate with the practical side of life abroad.\nYou're already familiar with the pace, structure, and opportunities available, and you know how to access resources and growth paths overseas. Your answers reflect grounded judgment—this isn't just a whimsical decision. You may also feel that certain aspects of domestic life no longer align with you. Overall, you're likely to thrive and even achieve financial stability abroad."
                    },
                    medium: {
                        title: "Moderate Practical Support",
                        text: "Living abroad can offer meaningful support for you.\nYou recognize some strengths of overseas life, even if you haven't fully confirmed whether you can settle long-term. You may still be open to returning home, but your thinking is practical and reality-based. You're trying to build a life that is supported by structure and resources, not just idealism."
                    },
                    low: {
                        title: "Home Offers Better Support",
                        text: "Home feels more secure in practical terms.\nYour answers suggest you feel more in control of your path at home. You may see overseas life as expensive, unpredictable, or hard to fit into. Your current resources, needs, or emotional state may be more compatible with the home environment. If you're considering returning, it's more about choosing stability—not giving up."
                    }
                }
            },
            D2: {
                name: "Self-Adaptability",
                icon: "🧠",
                levels: {
                    high: {
                        title: "Excellent Adaptability",
                        text: "You thrive in unfamiliar environments.\nYou demonstrate strong initiative, problem-solving, and self-management. You can act even without help, and you adapt quickly. This level of adaptability gives you psychological resilience and a strong sense of control. You're not just surviving abroad—you're building a life."
                    },
                    medium: {
                        title: "Good Adaptability",
                        text: "You can usually adapt to new environments.\nYou're capable of adjusting to different social, work, or learning environments. While you might find certain cultural aspects unfamiliar, you generally find ways to cope. With this level of self-management, you're likely to keep growing steadily unless the external conditions become extremely difficult."
                    },
                    low: {
                        title: "Challenging Adaptation",
                        text: "Unfamiliar environments disrupt your rhythm.\nYou might become anxious or inefficient when things feel unclear or unsupported. You probably do better in structured settings with guidance. Your decision-making should prioritize whether the environment gives you enough support to operate confidently."
                    }
                }
            },
            D3: {
                name: "Emotional Fulfillment & Belonging",
                icon: "💫",
                levels: {
                    high: {
                        title: "Strong Sense of Belonging",
                        text: "You feel truly at ease abroad.\nYou've likely found your rhythm and support system overseas. You feel free to express yourself, connect with others, and be understood. You've built your own sense of belonging, and it's emotionally grounding. External barriers no longer hold you back."
                    },
                    medium: {
                        title: "Moderate Sense of Belonging",
                        text: "You're mostly comfortable, but still observing.\nYou can regulate your emotions and have found a decent groove, but you're still figuring out whether this place feels like home. Some cultural differences are still being processed—and that's okay. You're not completely \"out of place,\" but you're still searching for full alignment."
                    },
                    low: {
                        title: "Weaker Sense of Belonging",
                        text: "You often feel emotionally unanchored.\nYou might feel like you're \"physically here but not really a part of this place.\" Cultural disconnect, communication struggles, and values mismatches may heighten feelings of isolation. This floating state can become draining if prolonged."
                    }
                }
            },
            D4: {
                name: "Family Compatibility & Growth Path",
                icon: "👪",
                levels: {
                    high: {
                        title: "Strong Family Support",
                        text: "Your family supports your independent path abroad.\nYou likely grew up with freedom and exposure to multiple cultures. Your family seems open-minded, supportive, and not overly attached to the idea of you returning home. This gives you space to grow independently and make confident life choices."
                    },
                    medium: {
                        title: "Neutral Family Influence",
                        text: "You're managing well abroad, but family influence still matters.\nYou've found your own rhythm overseas, but family expectations or cultural values still play a role. You may feel torn between personal growth and family expectations. You'll likely seek a path that allows you to honor both."
                    },
                    low: {
                        title: "Significant Family Influence",
                        text: "There's a tension between family values and your growth path.\nYou respect your family's wishes and emotional presence in your life, but are also drawn to life abroad. When big decisions come up, you might lean toward family expectations. Family remains a key anchor in your worldview."
                    }
                }
            },
            D5: {
                name: "Motivation & Goal Orientation",
                icon: "🎯",
                levels: {
                    high: {
                        title: "Clear Goal Orientation",
                        text: "You know exactly what you want and why.\nYour responses show deep clarity. You've envisioned your future and understand the motivations behind your choices. You're driven by meaningful, internal goals. Whatever you choose—staying or returning—it will be something you're ready to own and follow through on."
                    },
                    medium: {
                        title: "Moderately Clear Goals",
                        text: "You have a direction, but keep your options open.\nYou're generally goal-oriented and have ideas about your future. You may be balancing multiple visions, wanting to keep your path flexible. This phase is ideal for experimenting, collecting feedback, and refining your intuition."
                    },
                    low: {
                        title: "Goals Still Being Formed",
                        text: "You need more time and reflection.\nYour sense of direction changes frequently. You may not fully grasp what staying or returning really means for you yet. That's okay—this means you have room to explore. Your true answer won't come from outside advice, but from gradually reconnecting with yourself."
                    }
                }
            }
        }
    }
};

// 总分结果解释
const finalScoreExplanations = [
    {
        range: [85, 100],
        decision: {
            zh: "明确建议在海外发展",
            en: "Strong Recommendation: Stay Overseas"
        },
        text: {
            zh: "你对国外的生活环境适应度极高，不仅现实资源合拍，心理满足也相对充足。你留在国外的动机稳定，规划清晰，同时具备一定的情绪韧性与家庭弹性支持，你是一个很有能力的人，这意味着你有足够的能力在国外建立起属于自己的生存方式与发展路线，无论选择在哪里生活，对你来说都是可以站得住也活得好的选择。",
            en: "You have shown excellent adaptability to life abroad. You are not only familiar with the rules, pace, opportunities, and structure of the overseas environment, but also capable of navigating and growing within it. Your responses reflect a stable and realistic judgment—you know what it takes to establish yourself and you're not acting on impulse. You may also feel that certain systems or cultural dynamics in your home country do not align with your values. Overall, the current overseas environment offers you a strong foundation for stability, growth, and possibly even financial returns."
        }
    },
    {
        range: [70, 84],
        decision: {
            zh: "倾向在海外发展",
            en: "Leaning Toward Staying Overseas"
        },
        text: {
            zh: "你在国外的总体适应力是不错的，多数维度都显示出较强的适应能力与发展潜力，你也许还没完全确认每一点都理想，但整体来看，你有能力、有资源，也有可能在这里扎根下来。你已经走在适合留下的路上，少部分的犹豫，只是正常的现实考量。你的成长路径和海外生活之间有不错的契合度，接下来的重点或许不是\"要不要留下\"，而是\"留下后，我可以怎么更好地生活\"。",
            en: "You generally see the overseas environment as supportive. While you may still be figuring out whether it's a long-term fit, your answers reflect a willingness to evaluate your future with a practical mindset. You haven't closed the door on returning home, but you see staying abroad as a meaningful option worth working toward. This pragmatic tendency shows that you want your choices to be grounded in reality—not just ideals."
        }
    },
    {
        range: [50, 69],
        decision: {
            zh: "中间摇摆",
            en: "In the Middle – Exploring Both Sides"
        },
        text: {
            zh: "你的整体适应力处在临界区，两边都有一些适合的点，也都有让你犹豫的地方。你现在可能正处于比较期或者过渡期，不妨把当前阶段当成一种练习，更深入地去生活、去对比，也许会让你慢慢找到更确定的方向。留或回，并不是现在就要有答案，而是可以继续探索的过程。",
            en: "You're in the process of weighing the pros and cons of staying abroad vs. returning home. You see strengths and challenges on both sides. You might feel freer abroad but find it harder to integrate, or feel more at ease at home but overwhelmed by societal pressures. Right now, what you likely need isn't a final answer, but more experiences to help you reflect and decide over time."
        }
    },
    {
        range: [30, 49],
        decision: {
            zh: "倾向回国发展",
            en: "Leaning Toward Returning Home"
        },
        text: {
            zh: "你的问卷结果整体表现出对国外的适配感较弱，国外的环境带给你的支持可能有限。你需要一个更明确、更稳定的环境来支持你下一阶段的生活节奏，而国内可能正好具备这样的条件：熟悉的语言、文化、社交方式，以及你能调动的资源。",
            en: "Your responses suggest that you feel more secure and in control in your home environment. You may find the cost of living, integration barriers, or uncertainty abroad too overwhelming. The local environment might better match your current needs, resources, or emotional state. If you're considering returning home, it's likely because you're prioritizing stability and familiarity—not because you're giving up."
        }
    },
    {
        range: [0, 29],
        decision: {
            zh: "明确建议回国发展",
            en: "Strong Recommendation: Return Home"
        },
        text: {
            zh: "这个分数区间显示出你在海外多维度都感受到一定的压力，无论是现实条件、内在状态，还是支持系统，都存在一定程度不匹配。可能你正在强撑着维持，测试结果说明你更需要回到一个有支撑、有安全感、有熟悉节奏的地方，做一个对自己更友好的选择。也许未来你依然有能力再次出发，但现在，回到可以喘口气的地方，也许更适合。",
            en: "Your results indicate that you're facing significant challenges across multiple areas while living abroad—whether practical, emotional, or support-related. You may feel like you're constantly pushing through, and the overseas environment offers limited support. This doesn't mean you're incapable, but that your current setting isn't providing what you need. Returning to a familiar, secure place may help you catch your breath and recover. In the future, you may still go abroad again—but right now, it's okay to choose a place that feels more like home."
        }
    }
]; 