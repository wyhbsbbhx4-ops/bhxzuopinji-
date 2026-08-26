import { Project, ExperienceItem, SideQuest, MixtapeTrack } from '../types';

export const DESIGNER_INFO = {
  name: '巴涵笑',
  handle: '@bhx.design',
  role: '产品体验设计师',
  tagline: '专注产品体验、UI交互、运营视觉与AIGC创意探索，以敏锐感知与细节把控塑造有温度的数字产品。',
  bio: '福州大学（双一流 211）产品设计专业，获校级二等奖学金。对于工作中的各类细节有敏锐感知力和把控力，积极学习设计新趋势。富有想法和创造力，良好的审美能力，专注于细节和事务的本质。具备快速学习各类新工具核心功能的能力，并具备良好的团队意识，能与团队密切合作推动项目持续进行。',
  location: '福州 / 中国 (Fuzhou, CN)',
  availability: '积极寻求产品体验设计 / UI/UX 实习与全职机会',
  yearsOfExperience: '大三 · 2024-至今',
  shippedProducts: '3+ 核心项目',
  designAwards: '校级二等奖学金',
  usersImpacted: '双一流 211',
  phone: '18054608210',
  wechat: 'xzsxloveme',
  email: 'wyhbsbbhx4@qq.com',
  education: '福州大学（双一流 211）· 产品设计专业（2024.09—至今）',
  github: 'https://github.com',
  figma: 'https://figma.com',
  dribbble: 'https://dribbble.com',
  twitter: 'https://x.com',
  readcv: 'https://read.cv'
};

export const MANIFESTO = {
  heading: '感知细节，洞察本质。用敏锐审美与前沿工具打磨极致体验。',
  body1: '作为产品体验设计师，我专注于工作中的各类细节感知与严谨把控。从用户真实诉求与链路梳理，到游戏化运营机制与原创IP的AIGC多维赋能，始终追求设计价值与业务目标的完美融合。',
  body2: '保持对设计新趋势与AI生产力工具的敏锐度，快速掌握核心工具赋能全链路设计，与团队密切协同推动项目高效落地。',
  badges: ['UI/UX 交互设计', 'AIGC 视觉赋能', '运营游戏化设计', '原创 IP 孵化', '链路原型绘制']
};

export const PROJECTS: Project[] = [
  {
    id: 'yaochufa-travel',
    title: '要出发周边游UI设计项目',
    tagline: '围绕核心出行诉求，梳理“推荐-选点-定制-下单”完整链路与原型及图标系统',
    client: '要出发周边游 (YAOCHUFA TRAVEL)',
    year: '2026.06 — 2026.08',
    category: 'product-ui',
    categoryLabel: 'UI/UX · 移动端产品体验设计',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#2644F4',
    tags: ['UI设计', '交互链路', '用户调研', '原型绘制', '图标设计', 'Figma'],
    metrics: [
      { label: '核心链路构建', value: '4步闭环', change: '推荐→选点→定制→下单' },
      { label: '核心页面体系', value: '全套覆盖', change: '首页/目的地/会员页' },
      { label: '专属图标规范', value: '100% 绘制', change: '统一视觉语言' }
    ],
    description: '参与项目前期的深度用户调研，紧密结合周边游用户的核心诉求与高频决策特征，辅助团队梳理出“周边游主题推荐-地点选择-套餐定制-支付下单”的高效闭环链路。协助项目进行基础页面的原型图绘制与成套图标系统绘制，涵盖首页、目的地详情页、会员权益页等核心模块。',
    challenge: '周边游用户决策周期短、对行程灵活性与套餐个性化要求高。传统旅游产品信息杂乱，用户在挑选地点与定制套餐时步骤冗长，导致决策中断与下单流失。',
    solution: '在用户调研基础上，重塑4步核心极简预订路径，优化首页信息层级，强化主题化场景推荐与灵活套餐定制模块，并定制全套语义化图标系统，确保移动端交互轻量高效。',
    gallery: [
      {
        id: 'travel-img-1',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
        title: '周边游首页核心框架与主题推荐信息架构',
        caption: '以“主题推荐”为核心抓手，通过高清晰度卡片与场景化模块引导用户快速定位心仪周末游目的地。',
        category: 'ui',
        categoryLabel: '首页 UI',
        aspectRatio: 'ultrawide'
      },
      {
        id: 'travel-img-2',
        url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85',
        title: '“推荐-选点-定制-下单” 4步交互链路原型全貌',
        caption: '协助梳理从地点选择到套餐自由组合的交互流转链路，显著降低用户操作认知负荷。',
        category: 'interaction',
        categoryLabel: '交互链路原型',
        aspectRatio: 'landscape'
      },
      {
        id: 'travel-img-3',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
        title: '目的地探索页与套餐自由定制详情页',
        caption: '提供多维筛选条件与透明化套餐拆解，支持用户随心增减自驾游住宿、门票与特色体验项目。',
        category: 'ui',
        categoryLabel: '目的地与套餐页',
        aspectRatio: 'landscape'
      },
      {
        id: 'travel-img-4',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
        title: '会员中心与特权专属权益页面',
        caption: '梳理会员积分成长路径与优惠券包发放逻辑，提升用户长期黏性与复购率。',
        category: 'mobile',
        categoryLabel: '会员体系 UI',
        aspectRatio: 'landscape'
      },
      {
        id: 'travel-img-5',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=85',
        title: '周边游专属图标绘制系统与设计规范',
        caption: '绘制全套线性与面性图标规范，统一笔触、圆角与视觉重心，建立一致性设计语言。',
        category: 'system',
        categoryLabel: '图标设计规范',
        aspectRatio: 'landscape'
      }
    ],
    designSystem: {
      typography: ['Plus Jakarta Sans', 'PingFang SC', 'Noto Sans SC'],
      colors: [
        { name: 'Travel Cobalt', hex: '#2644F4' },
        { name: 'Weekend Amber', hex: '#F59E0B' },
        { name: 'Nature Forest', hex: '#10B981' },
        { name: 'Pure White', hex: '#FFFFFF' }
      ],
      components: ['周边游主题推荐卡片', '地点与日期筛选器', '套餐自由定制选择器', '会员权益徽章与价格总览栏']
    },
    keyFeatures: [
      {
        title: '“推荐-选点-定制-下单” 核心闭环链路',
        description: '紧密围绕周边游决策痛点，辅助梳理顺畅、低阻力的4步快速预订流程，显著缩短转化路径。'
      },
      {
        title: '成套基础页面原型与专属图标系统绘制',
        description: '协助完成首页、目的地页、会员页等高保真原型绘制，并输出成套风格一致的专属业务图标库。'
      }
    ],
    prototypeType: 'interactive-toggle',
    testimonial: {
      quote: '巴涵笑在项目前期调研中敏锐捕捉到周边游用户的核心痛点，协助梳理的定制链路清晰流畅，图标与原型输出规范严谨。',
      author: '要出发周边游项目团队',
      role: 'UI/UX 团队评价'
    }
  },
  {
    id: 'kugou-campaign',
    title: '酷狗音乐运营活动项目',
    tagline: '游戏化运营方案整体构思，萌系卫户IP与AIGC卡面集卡兑奖全链路设计',
    client: '酷狗音乐 (KUGOU MUSIC)',
    year: '2026.05 — 2026.06',
    category: 'creative-tech',
    categoryLabel: '运营活动设计 · 游戏化玩法 & AIGC',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#38BDF8',
    tags: ['运营活动设计', '游戏化玩法', '萌系IP', 'AIGC工具', 'Photoshop精修', '集卡兑奖'],
    metrics: [
      { label: '设计目标聚焦', value: '新客留存 & 频次', change: '破解低频痛点' },
      { label: '游戏化机制', value: '全链路闭环', change: '玩法探索+规则制定' },
      { label: 'AIGC 视觉提效', value: '全套资产产出', change: 'AI生成+PS精修' }
    ],
    description: '基于平台用户打开频次低、新客留存率不足等痛点定下明确的设计目标与设计思路，进行游戏化运营方案的整体构思，完成核心玩法与规则制定、风格改良与玩法探索。负责活动视觉全链路设计，打造萌系卫户形象及配套卡面、场景元素，深度运用 AIGC 工具快速产出并经 Photoshop 精细修图优化，完美适配集卡互动和兑奖全流程。',
    challenge: '年轻化音乐用户对常规静态运营弹窗产生审美疲劳，新用户在单次领取权益后流失率高，难以建立持续参与的心理动机与互动黏性。',
    solution: '构建“游戏化探索 + 萌系IP形象 + 集卡解锁 + 积分兑奖”的完整运营体系；驱动 AIGC 工具进行卡面与场景的多元化快速生成，再结合 Photoshop 高精度修图与光影排版，输出极具吸引力的全链路视觉资产。',
    gallery: [
      {
        id: 'kugou-img-1',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=85',
        title: '酷狗音乐游戏化活动主视觉全景与氛围营造',
        caption: '结合潮流舞台与音乐元素，构筑沉浸式游戏化互动主会场视觉。',
        category: 'ui',
        categoryLabel: '活动主视觉',
        aspectRatio: 'ultrawide'
      },
      {
        id: 'kugou-img-2',
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85',
        title: '萌系卫户专属 IP 角色设定与表情体系',
        caption: '以萌趣亲和力为核心塑造卫户形象，陪伴用户完成每日听歌与集卡打卡任务。',
        category: 'interaction',
        categoryLabel: '萌系IP角色',
        aspectRatio: 'landscape'
      },
      {
        id: 'kugou-img-3',
        url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=85',
        title: 'AIGC 驱动生成的精美集卡卡面矩阵与稀有特效',
        caption: '通过 Prompt 精准调优与风格化控图批量产出高质量卡面底图，再经 PS 强化质感与排版。',
        category: 'system',
        categoryLabel: '集卡资产矩阵',
        aspectRatio: 'landscape'
      },
      {
        id: 'kugou-img-4',
        url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85',
        title: '积分兑奖中心与成就解锁互动流程',
        caption: '设计清晰直观的兑奖层级与抽奖动效反馈，激发用户达成集卡目标与长期留存。',
        category: 'ui',
        categoryLabel: '兑奖流程 UI',
        aspectRatio: 'landscape'
      }
    ],
    designSystem: {
      typography: ['Syne Bold', 'PingFang SC Heavy', 'Plus Jakarta Sans'],
      colors: [
        { name: 'Kugou Cyan', hex: '#38BDF8' },
        { name: 'Vibrant Magenta', hex: '#EC4899' },
        { name: 'Reward Gold', hex: '#FACC15' },
        { name: 'Night Backdrop', hex: '#0B0F19' }
      ],
      components: ['集卡卡册展架', '游戏化任务达成列表', '兑奖进度条', '萌系IP交互弹窗']
    },
    keyFeatures: [
      {
        title: '游戏化运营方案整体构思与规则制定',
        description: '直击新客留存不足痛点，搭建集卡、养成与兑奖的连贯闭环，提升用户每日打开频次。'
      },
      {
        title: 'AIGC 工具赋能 + Photoshop 精修全链路视觉',
        description: '打造萌系卫户形象及配套全套卡面与场景元素，实现高效、高水准的商业化视觉交付。'
      }
    ],
    prototypeType: 'data-viz',
    testimonial: {
      quote: '游戏化机制的设计极具吸引力，萌系IP与卡面质感生动细腻，AIGC与PS的结合大大提升了运营素材的输出效率。',
      author: '酷狗音乐运营项目组',
      role: '运营设计团队评审'
    }
  },
  {
    id: 'kyo-x-street-ip',
    title: 'KYO-X 街舞女孩原创IP设计',
    tagline: '从零打造街舞女孩原创IP，ChatGPT/Gemini协同策划与3D动作服装场景多维延展',
    client: '原创 IP 孵化项目 (KYO-X CREATIVE LAB)',
    year: '2026.03 — 2026.04',
    category: 'interaction',
    categoryLabel: '原创 IP 孵化 · AIGC 多维视觉体系',
    coverImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1400&q=85',
    accentColor: '#EC4899',
    tags: ['原创IP设计', '街舞潮流', 'ChatGPT策划', 'Gemini大模型', 'AIGC多维延展', '3D场景'],
    metrics: [
      { label: '原创 IP 孵化', value: '从 0 到 1', change: '独立全流程策划' },
      { label: 'AI 工具协同', value: 'ChatGPT / Gemini', change: '人设与世界观构建' },
      { label: '多维系统延展', value: '3D/动作/服饰/场景', change: '全套资产体系' }
    ],
    description: 'KYO-X 为从零打造的街舞女孩原创 IP 形象，通过 ChatGPT、Gemini 等大语言模型进行深度人设策划、性格定义与世界观搭建，并构建完整的视觉体系。系统性地推进延展开发，同步驱动 AIGC 工具完成 IP 角色形象的三维延展、动感街舞动作延展、潮流服装换装延展以及多元街头场景延展。',
    challenge: '传统原创 IP 从策划到多维度商业资产延展耗时漫长、成本高昂，且难以在短周期内快速验证不同服装风格与复杂动作场景下的角色一致性。',
    solution: '开创“AI大模型策划人设 + AIGC模型控制角色一致性 + 视觉规范体系把控”的全新 IP 孵化管线。借助 ChatGPT/Gemini 输出丰富性格与故事背景，通过精细化 Prompt 工程实现角色三维立体化、动作多维化、潮流穿搭多样化及场景多元化。',
    gallery: [
      {
        id: 'kyo-img-1',
        url: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1600&q=85',
        title: 'KYO-X 街舞女孩主视觉海报与核心人设三视图',
        caption: '以活力、自信、街头潮流为核心灵魂，确立标志性发型、服饰与态度感神态。',
        category: 'render',
        categoryLabel: 'IP 主视觉',
        aspectRatio: 'ultrawide'
      },
      {
        id: 'kyo-img-2',
        url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1400&q=85',
        title: '街舞力量感与爆发力动作姿态多维延展',
        caption: '驱动 AIGC 生成 Breaking, Popping, Hip-hop 等专业街舞律动动作，姿态自然且张力十足。',
        category: 'interaction',
        categoryLabel: '动作延展库',
        aspectRatio: 'landscape'
      },
      {
        id: 'kyo-img-3',
        url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85',
        title: 'Y2K 与赛博街头潮流服装多维换装延展',
        caption: '为 IP 打造不同季节、潮流机能、复古运动等多种穿搭风格，探索商业跨界联名可能。',
        category: 'system',
        categoryLabel: '服装换装延展',
        aspectRatio: 'landscape'
      },
      {
        id: 'kyo-img-4',
        url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85',
        title: '霓虹街区、城市天台与地下舞室多元场景延展',
        caption: '将角色置于丰富真实与幻想交织的舞台场景中，赋予 IP 饱满的叙事空间。',
        category: 'ui',
        categoryLabel: '场景延展',
        aspectRatio: 'landscape'
      }
    ],
    designSystem: {
      typography: ['Anton Compressed', 'PingFang SC Heavy', 'JetBrains Mono'],
      colors: [
        { name: 'Street Magenta', hex: '#EC4899' },
        { name: 'Electric Violet', hex: '#8B5CF6' },
        { name: 'Cyber Neon Yellow', hex: '#FACC15' },
        { name: 'Asphalt Black', hex: '#111827' }
      ],
      components: ['IP 身份卡片 (ID Badge)', '街舞姿态序列展架', '潮流服饰穿搭矩阵', '多元场景合成展板']
    },
    keyFeatures: [
      {
        title: 'ChatGPT & Gemini 大模型全流程策划赋能',
        description: '深度策划街舞女孩从零到一的世界观、性格细节与视觉标签，构建统一且有深度的 IP 灵魂。'
      },
      {
        title: 'AIGC 驱动的角色三维、动作、服装及场景多维延展',
        description: '突破传统绘制效率边界，系统化输出高精度、高一致性的角色动作库、换装库与场景资产。'
      }
    ],
    prototypeType: 'fluid-gesture',
    testimonial: {
      quote: 'KYO-X 是将大模型策划与 AIGC 视觉生成结合的惊艳实践，角色的动作张力与潮流服装延展展现了极强的商业价值。',
      author: '原创 IP 孵化导师',
      role: '数字创意实验室'
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: '要出发周边游 UI 设计项目 · UI/UX 设计师',
    company: '要出发周边游 (YAOCHUFA TRAVEL)',
    location: '广州 / 远程 (Remote)',
    period: '2026.06 — 2026.08',
    type: 'Full-time',
    description: '参与项目前期的深度用户调研，紧密结合周边游用户的核心诉求与高频决策特征，辅助梳理出“周边游主题推荐-地点选择-套餐定制-支付下单”的高效链路；协助项目进行基础页面的原型图绘制与成套图标系统绘制，涵盖首页、目的地页、会员页等核心功能模块。',
    highlights: [
      '参与项目前期用户调研，深度挖掘周边游用户的短途决策诉求与出行痛点。',
      '辅助梳理并打通“周边游主题推荐-地点选择-套餐定制-支付下单”全流程闭环链路。',
      '协助项目进行基础页面的原型图绘制与图标绘制，涵盖首页、目的地页、会员页等。'
    ],
    skills: ['UI设计', '交互链路梳理', '用户调研', '原型绘制', '图标绘制', 'Figma'],
    metric: '打通4步核心预订闭环链路'
  },
  {
    id: 'exp-2',
    role: '酷狗音乐运营活动项目 · 运营活动与视觉设计师',
    company: '酷狗音乐 (KUGOU MUSIC)',
    location: '广州 / 远程 (Remote)',
    period: '2026.05 — 2026.06',
    type: 'Full-time',
    description: '基于用户打开频次低、新客留存率不足等问题定下清晰的设计目标与设计思路，进行游戏化运营方案的整体构思，完成核心玩法与规则制定、风格改良与玩法探索；负责活动视觉全链路设计，打造萌系卫户形象及配套卡面、场景元素，用 AIGC 工具快速产出并经 Photoshop 精修优化，适配集卡和兑奖全流程。',
    highlights: [
      '基于用户打开频次低与新客留存不足痛点定下设计目标，完成游戏化运营方案构思与规则制定。',
      '进行活动视觉全链路设计，打造萌系卫户专属 IP 形象及配套卡面、场景元素。',
      '熟练运用 AIGC 工具快速产出创意视觉并经 Photoshop 精修，适配集卡和兑奖全流程。'
    ],
    skills: ['运营设计', '游戏化玩法', 'AIGC工具', 'Photoshop精修', 'IP形象设计', '集卡兑奖'],
    metric: '游戏化集卡与兑奖全链路设计'
  },
  {
    id: 'exp-3',
    role: 'KYO-X 街舞女孩 IP 设计 · 原创 IP 设计师',
    company: 'KYO-X CREATIVE LAB',
    location: '福州 / 原创项目',
    period: '2026.03 — 2026.04',
    type: 'Agency',
    description: 'KYO-X 为从零打造的街舞女孩原创 IP，通过 ChatGPT、Gemini 等 AI 工具进行深度策划，并构建完整的视觉体系；系统性地推进延展开发，同步驱动 AIGC 完成 IP 角色形象的三维延展、街舞动作延展、服装延展以及多元场景延展。',
    highlights: [
      '从零打造街舞女孩原创 IP，通过 ChatGPT、Gemini 等 AI 工具策划并构建完整视觉体系。',
      '系统性地推进延展开发，制定统一的角色识别度规范与潮流美学风格。',
      '同步驱动 AIGC 完成 IP 角色形象的三维延展、街舞动作延展、服装延展以及场景延展。'
    ],
    skills: ['IP设计', 'ChatGPT / Gemini', 'AIGC多维延展', '3D动作延展', '服装场景延展'],
    metric: '从0到1原创IP及多维延展'
  },
  {
    id: 'exp-4',
    role: '福州大学（双一流 211）· 产品设计专业学习与实践',
    company: '福州大学 (FUZHOU UNIVERSITY)',
    location: '福州 (Fuzhou, China)',
    period: '2024.09 — 至今',
    type: 'Consulting',
    description: '就读于福州大学产品设计专业，获校级二等奖学金。对工作中的各类细节有敏锐感知力和把控力，积极学习设计新趋势。富有想法和创造力，良好的审美能力，专注于细节和事务的本质。具备快速学习能力与跨团队协作意识。',
    highlights: [
      '就读于双一流 211 高校福州大学产品设计专业，荣获校级二等奖学金。',
      '全面掌握 UI设计、交互设计、运营设计、视觉设计、IP设计与产品设计方法论。',
      '熟练运用 Figma, Photoshop, Illustrator, ChatGPT, Gemini 等设计与生产力工具。'
    ],
    skills: ['产品设计', 'UI/交互设计', 'Figma', 'Photoshop', 'Illustrator', '校级二等奖学金'],
    metric: '双一流211 · 校级二等奖学金'
  }
];

export const SIDE_QUESTS: SideQuest[] = [
  {
    id: 'quest-travel-icons',
    title: '周边游专属图标库与视觉规范',
    category: 'Generative Art',
    description: '为要出发周边游项目定制的一致性图标库，结合微交互与清晰语义提升移动端操作流畅度。',
    previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    linkText: '查看图标系统',
    tags: ['图标设计', '设计系统', 'Figma']
  },
  {
    id: 'quest-aigc-cards',
    title: 'AIGC 萌系卡面与场景探索',
    category: 'Sound Design',
    description: '利用 Midjourney / Gemini 快速迭代游戏化卡面概念，并通过 Photoshop 精细光影合成。',
    previewUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    linkText: '探索卡面资产',
    tags: ['AIGC生成', 'PS精修', '运营视觉']
  },
  {
    id: 'quest-ip-3d',
    title: 'KYO-X 3D 动作姿态与服饰换装',
    category: '3D & Motion',
    description: '街舞女孩 IP 的多维度延展实验，涵盖 Breaking 爆发动作与 Cyber 街头穿搭。',
    previewUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
    linkText: '浏览 IP 延展',
    tags: ['IP多维延展', '街头潮流', 'AI协同']
  },
  {
    id: 'quest-design-lab',
    title: '福州大学产品设计创新研究',
    category: 'Physical Zines',
    description: '探索前沿 AI 工具链与实体/数字产品交互融合的创新课题与高保真原型实践。',
    previewUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    linkText: '查看课题研究',
    tags: ['产品设计', '交互研究', '双一流高校']
  }
];

export const MIXTAPE_TRACKS: MixtapeTrack[] = [
  {
    id: 'track-1',
    title: 'SUMMER GETAWAY // WEEKEND VIBE',
    artist: '要出发周边游 / 旅行律动',
    genre: 'Acoustic Travel Beats',
    duration: '03:20',
    bpm: 85,
    freq: 240
  },
  {
    id: 'track-2',
    title: 'KUGOU GAMIFIED PULSE',
    artist: '酷狗音乐 / 游戏化节奏',
    genre: 'Chiptune & Future Bass',
    duration: '02:48',
    bpm: 128,
    freq: 330
  },
  {
    id: 'track-3',
    title: 'KYO-X STREET DANCE CYPHER',
    artist: 'KYO-X Crew / 街舞女孩',
    genre: 'Boom Bap & Hip-Hop',
    duration: '03:15',
    bpm: 95,
    freq: 180
  }
];

export const DESIGN_SKILLS = [
  { category: '个人专业技能 (Design Skills)', items: ['UI设计', '交互设计', '运营设计', '视觉设计', 'IP设计', '产品设计'] },
  { category: '软件与AI生产力 (Software & AI)', items: ['Figma', 'Photoshop (Ps)', 'ChatGPT', 'Gemini', 'Illustrator (Ai)'] },
  { category: '综合素养与方法论 (Competencies)', items: ['细节敏锐感知与把控', '审美能力与事物本质洞察', '新工具快速学习能力', '团队紧密协同推动', '双一流高校二等奖学金'] }
];

