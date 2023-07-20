// ==UserScript==
// @name		bossyunAutoAnswer
// @author		Yiero
// @description		bossyunAutoAnswer自动答题
// @version		1.0.0
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @icon		https://bx.bossyun.com/favicon.ico
// @match		https://bx.bossyun.com/bx/study/exam*
// @match		https://bx.bossyun.com/bx/study/examine*
// @license		GPL
// @grant		GM_addStyle
// @updateUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/bossyunAutoAnswer.js
// @downloadUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/bossyunAutoAnswer.js
// ==/UserScript==

function matchContentsWithoutSign( Content1, Content2 ) {
	const signList = /[，。！？、；：÷×「」“”《》．（）_—.\-=+`~@#$%…&*<>/;'"{}\[\]()\s]/g;
	Content1 = Content1.replace( signList, "" ).trim();
	Content2 = Content2.replace( signList, "" ).trim();
	return Content1 === Content2 || Boolean( Content1.match( new RegExp( Content2 ) ) ) || Boolean( Content2.match( new RegExp( Content1 ) ) );
}

function matchContentsWithoutLetter( answerContent, optionContent ) {
	const signList = /^[ABCDEFG][.．、]/g;
	answerContent = answerContent.replace( signList, "" ).trim();
	optionContent = optionContent.replace( signList, "" ).trim();
	return answerContent === optionContent;
}

const questionList = [
	{
		question: "下列旅游目的地营销策划中属于市场促销活动的是（  ）。",
		answers: [
			"公共关系活动"
		],
		isFAQ: false
	},
	{
		question: "旅游规划编制的第一步是（  ）。",
		answers: [
			"签订合同,确立规划顶目"
		],
		isFAQ: false
	},
	{
		question: "社会经济、政治、文化、自然环境.以及社会需求结构、目标市场、业内竞争等属于影响旅游组织结构设计的（  ）。",
		answers: [
			"环境因素"
		],
		isFAQ: false
	},
	{
		question: "旅游产业不具有（  ）的特性。",
		answers: [
			"稳定性"
		],
		isFAQ: false
	},
	{
		question: "伊拉克国家旅游组织的机构设置模式属于（  ）。",
		answers: [
			"非中央机构模式"
		],
		isFAQ: false
	},
	{
		question: "（  ）产生于旅游规划与开发的早期。",
		answers: [
			"资源导向模式"
		],
		isFAQ: false
	},
	{
		question: "（  ）的特点是旅游企业各级、各部门从上到下实行垂直领导,下属部门只接受一个上级的指令,各级主管负责人对所属部门的一切问题负责。",
		answers: [
			"直线制组织结构"
		],
		isFAQ: false
	},
	{
		question: "旅游业危机的特性不包括（  ）。",
		answers: [
			"地区性"
		],
		isFAQ: false
	},
	{
		question: "政府旅游部门主导信息化发展战略的依据不包括（  ）。",
		answers: [
			"部分经济效应"
		],
		isFAQ: false
	},
	{
		question: "（  ）是旅游规划与开发演进到成熟发展阶段时出现的一种旅游规划与开发模式。",
		answers: [
			"产品导向模式"
		],
		isFAQ: false
	},
	{
		question: "服务业标准,按其性质可以分为三大类，其中不包括（  ）。",
		answers: [
			"人员标准"
		],
		isFAQ: false
	},
	{
		question: "下列企业不是按投资主体划分的是（  ）。",
		answers: [
			"行业内直属企业"
		],
		isFAQ: false
	},
	{
		question: "西方的系统管理学派盛行于20 世纪（  ）前后。",
		answers: [
			"60年代"
		],
		isFAQ: false
	},
	{
		question: "（  ）的人,以自己的理想为中心,只注意自己生活范围内狭小的事情。",
		answers: [
			"自我中心型"
		],
		isFAQ: false
	},
	{
		question: "PDCA循环的含义不包括（  ）。",
		answers: [
			"分析"
		],
		isFAQ: false
	},
	{
		question: "下列影响旅行社营销的外部因素的是（  ）。",
		answers: [
			"现代信息技术的运用"
		],
		isFAQ: false
	},
	{
		question: "服务过程质量控制的内容不包括（  ）。",
		answers: [
			"分析控制"
		],
		isFAQ: false
	},
	{
		question: "霍桑试验的发起者是（  ）。",
		answers: [
			"梅奥"
		],
		isFAQ: false
	},
	{
		question: "旅游管理的特点不包括（  ）。",
		answers: [
			"稳定性"
		],
		isFAQ: false
	},
	{
		question: "在一个组织中，最主要的要素是（  ）。",
		answers: [
			"人"
		],
		isFAQ: false
	},
	{
		question: "旅游目的地信息系统的功能不包括（  ）。",
		answers: [
			"定位功能"
		],
		isFAQ: false
	},
	{
		question: "员工职业生涯设计属于旅游企业管理中的（  ）。",
		answers: [
			"旅游企业人力资源管理"
		],
		isFAQ: false
	},
	{
		question: "旅游需求产生的客观因素中，基本条件是（  ）。",
		answers: [
			"支付能力"
		],
		isFAQ: false
	},
	{
		question: "运筹学的主要分支不包括（  ）。",
		answers: [
			"分析理论"
		],
		isFAQ: false
	},
	{
		question: "旅游体验的特点不包括（  ）。",
		answers: [
			"创新性"
		],
		isFAQ: false
	},
	{
		question: "旅游规划编制中，完成规划初稿的下一步是（  ）。",
		answers: [
			"规划中期评估"
		],
		isFAQ: false
	},
	{
		question: "菜肴的形状在旅游业产品质量标准属于（  ）。",
		answers: [
			"标准菜肴规格"
		],
		isFAQ: false
	},
	{
		question: "系统管理理论的代表人物不包括（  ）。",
		answers: [
			"梅奥"
		],
		isFAQ: false
	},
	{
		question: "短期旅游规划的时间段是（  ）。",
		answers: [
			"1~2年"
		],
		isFAQ: false
	},
	{
		question: "（  ）几乎主导了所有饭店的经营。",
		answers: [
			"客房"
		],
		isFAQ: false
	},
	{
		question: "行业内外竞争状况分析属于旅游企业管理中的（  ）。",
		answers: [
			"旅游企业营销管理"
		],
		isFAQ: false
	},
	{
		question: "下列属于对旅游从业人员的危机管理的是（  ）。",
		answers: [
			"树立危机意识,正确认识危机"
		],
		isFAQ: false
	},
	{
		question: "景点所提供的基本资源是游客在景点中经历都依赖的三个组成部分中的（  ）。",
		answers: [
			"核心部分"
		],
		isFAQ: false
	},
	{
		question: "世界旅游组织认为,旅游业危机管理的主要途径有四个，其中不包括（  ）。",
		answers: [
			"分析"
		],
		isFAQ: false
	},
	{
		question: "旅游经济管理体制中沟通各管理环节的子系统是（  ）。",
		answers: [
			"旅游经济信息系统"
		],
		isFAQ: false
	},
	{
		question: "组织准备、资料准备、制定计划和仪器准备属于旅游资源调查中的（  ）阶段。",
		answers: [
			"调查准备"
		],
		isFAQ: false
	},
	{
		question: "饭店的总台、楼层服务台等岗位可按每天的早、中、晚班三次配置服务员人数，运用的是（  ）。",
		answers: [
			"岗位定员法"
		],
		isFAQ: false
	},
	{
		question: "质量管理理论发展至今,经过了三个发展阶段。其中不包括（  ）。",
		answers: [
			"部分质量管理阶段"
		],
		isFAQ: false
	},
	{
		question: "（  ）的定义是一个游览者离开常住地到另一个国家旅行,至少停留一夜但不超过 1年,主要目的不是在所访问的地区从事获取经济利益的活动。",
		answers: [
			"国际旅游者"
		],
		isFAQ: false
	},
	{
		question: "世界旅游组织的前身是（  ）。",
		answers: [
			"国际官方旅游组"
		],
		isFAQ: false
	},
	{
		question: "中国旅行社协会成立于（  ）。",
		answers: [
			"1997年"
		],
		isFAQ: false
	},
	{
		question: "以职位和工作的实际要求为标准来选拔符合标准的各类人员，体现了（  ）原则。",
		answers: [
			"因事择人"
		],
		isFAQ: false
	},
	{
		question: "现代旅游的含义中蒙根·罗德提出的是（   ）。",
		answers: [
			"交往定义"
		],
		isFAQ: false
	},
	{
		question: "旅游业的发展受各种环境因素影响,特别是受天气,疾病及战争等灾害性因素影响严重意味着旅游需要（  ）。",
		answers: [
			"超前性"
		],
		isFAQ: false
	},
	{
		question: "车体广告、候车亭广告等这一宣传载体属于宣传方式中的（  ）。",
		answers: [
			"户外广告宣传"
		],
		isFAQ: false
	},
	{
		question: "网络营销的特点不包括（  ）。",
		answers: [
			"提高营销成本"
		],
		isFAQ: false
	},
	{
		question: "下列不属于我国旅游信息化发展现状的是（  ）。",
		answers: [
			"与国际先进水平相距不大"
		],
		isFAQ: false
	},
	{
		question: "客房部服务员按每人每天清扫12间客房的定额来计算客房总服务员人数，云用的是（  ）。",
		answers: [
			"效率定员法"
		],
		isFAQ: false
	},
	{
		question: "目前我国大多数旅游企业已进入了稳步发展期,但在营销方面仍然存在许多问题。其中表现不包括（  ）。",
		answers: [
			"旅游资源缺乏"
		],
		isFAQ: false
	},
	{
		question: "主题旅游形象表现特征不包括（  ）。",
		answers: [
			"创新性"
		],
		isFAQ: false
	},
	{
		question: "下列属于人际关系学说提倡者的是（  ）。",
		answers: [
			"赫茨伯格"
		],
		isFAQ: false
	},
	{
		question: "奥运会在旅游节事活动属于（  ）。",
		answers: [
			"体育型"
		],
		isFAQ: false
	},
	{
		question: "旅行社属于（  ）。",
		answers: [
			"直接旅游企业"
		],
		isFAQ: false
	},
	{
		question: "旅游管理体制的主要功能不包括（  ）。",
		answers: [
			"分析功能"
		],
		isFAQ: false
	},
	{
		question: "旅游景区财务管理不包括（  ）。",
		answers: [
			"人力资源管理"
		],
		isFAQ: false
	},
	{
		question: "国际航空旅游和饭店业市场经历第一次信息技术应用变革是（  ）。",
		answers: [
			"计算机订位系统"
		],
		isFAQ: false
	},
	{
		question: "研究在利益相互矛盾的双方或各方的竞争性活动中,探求战胜对方的最优策略的一种数学方法，是运筹学分支中的（  ）。",
		answers: [
			"对策理论"
		],
		isFAQ: false
	},
	{
		question: "肯尼亚旅游的机构设置模式属于（  ）。",
		answers: [
			"混合职能模式"
		],
		isFAQ: false
	},
	{
		question: "游客购买行为的特点不包括（  ）。",
		answers: [
			"季节性"
		],
		isFAQ: false
	},
	{
		question: "下列不属于组织文化精神层的是（  ）。",
		answers: [
			"组织名称"
		],
		isFAQ: false
	},
	{
		question: "质量管理小组的特点不包括（  ）。",
		answers: [
			"独立性"
		],
		isFAQ: false
	},
	{
		question: "下列不属于金旅工程的是（  ）。",
		answers: [
			"外部办公网"
		],
		isFAQ: false
	},
	{
		question: "近代我国旅游主要表现在（  ）之后，",
		answers: [
			"鸦片战争"
		],
		isFAQ: false
	},
	{
		question: "把不同或相类似的事物加以比较、对照，指的是（  ）。",
		answers: [
			"比较研究法"
		],
		isFAQ: false
	},
	{
		question: "2001 年初,（  ）的爆发给英国旅游业的发展带来了极其不利的影响。",
		answers: [
			"口蹄疫"
		],
		isFAQ: false
	},
	{
		question: "水灾属于旅游企业危机形式中的（  ）。",
		answers: [
			"突发事故危机"
		],
		isFAQ: false
	},
	{
		question: "通货膨胀属于旅游业危机事件种类中的（  ）。",
		answers: [
			"经济类事件"
		],
		isFAQ: false
	},
	{
		question: "指由个别到一般、由事实到概括的推理方法是（  ）。",
		answers: [
			"归纳"
		],
		isFAQ: false
	},
	{
		question: "不属于产品组合要素的影响的是（  ）。",
		answers: [
			"能源利用问题"
		],
		isFAQ: false
	},
	{
		question: "旅游需求的特点不包括（  ）。",
		answers: [
			"稳定性"
		],
		isFAQ: false
	},
	{
		question: "我国旅游业实行的是政府主导下的发展战略模式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游业商品是流通企业制造。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "饭店经营业务随时间和变动幅度的不同而形成不同的需求模式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "梅奥的人群关系理论认为:工人是“社会人”。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "中国旅游业是成长型的市场。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "美国旅游企业具有经营组织形式网络化的特点。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "产品附加值是一种能够使消费者在消费产品时获得“额外”身心满足的效用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "管理工作具有双重属性,即自然属性与非自然属性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "管理是一种以绩效责任为基础的专业职能。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游需求与游客主观意愿有关，与季节无关。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游管理体制改革微观方面主要是旅游企业制度的改革。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "组织变革是指各类组织对于管理理念、工作方式,组织结构、人员配备、组织文化等多方面进行不断地调整、改进和革新的过程。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "人力资源是能为旅游企业创造价值的员工与消费者的总和。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "影响服务质量特性的诸因素中,人的因素是次要因素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "人力资源配置的任务只需要从组织方面来考虑。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游产品具有生产和消费的同时性。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "管理者的职责、人员和物质资源、质量体系结构是相互依存、相互制约和协调的有机整体。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "传统的旅游目的地的营销活动都是双向的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "中国旅游饭店协会不具有社会团体法人地位。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "我国旅游目的地信息化的整体现状,与国际先进水平相距不大。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "国外对旅游危机管理的研究刚刚起步。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游资源主要包括自然风景旅游资源和人文景观旅游资源。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "古典管理理论把人看作为“社会人”。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "公共交通运输属于间接旅游企业。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "从 1986 年到1992 年,主要进行了由政治接待型向经济事业型转变的改革。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "产品导向模式规划思路就是“市场一资源”相结合。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "亚太旅行协会原名太平洋临时旅游协会。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "日本的旅游行政管理机构分为中央和地方两个层次。中央机构和地方机构的关系是垂直领导的行政隶属关系。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "我国旅游电子商务发展水平不高。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游业的发展在我国处于新兴产业,其学科理论已经完善。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游环境保护不属于旅游规划的基本要素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "管理科学理论的重要特征之一是计算机的应用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "国家标准是对需要在全国范围内统一的技术要求。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "组织结构的设计和组织形式的选择可以在一定程度上偏离组织目标的实现。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "组织管理理论是旅游业危机管理的一个重要的理论基础。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游产品主要是满足人们高层次的物质需求。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "景区的营销管理是次要工作，主要工作是开发资源。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "女性对山水风光、民俗风情、田园风光和海滨沙滩等类旅游目的地类型的偏好比男性高。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游动机是形成旅游需求的首要的主观条件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "人力资源配置是为每个岗位配置适当的人。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "玛丽·福莱特是最早认识到应当从个人和群体行为的角度考察组织的学者之一。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "管理科学理论中的计量模型不可以按目的和变量性质来分类。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "景区服务质量是景区旅游业发展的关键因素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "政府旅游组织发挥支持作用的重要方面在于为中小企业联合提供支持。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "危机既给企业带来困难和挫折.但其中又孕育着成功的种子。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "交通工具的购买及其他投资决策不必与收入预测相适应。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游管理学和旅游经济学是从不同的角度研究旅游业。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "全面质量管理是要求全员参加的质量管理。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在危机前兆阶段,致力于从根本上防止危机的形成和爆发或将其及早制止于萌芽状态。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "没有市场与营销.旅游开发就没有目标。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在开始实地调研之前,规划编制组应通过统一学习或会谈交流等途径充分掌握规划地的基本信息。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "景区的营销重点在于围绕固定的供给创造更多的需求。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "信息化管理不可以优化旅行社的内部组织结构。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游规划与城市规划的关系应该是相互协调、互为补充的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "正式组织的工作不受非正式组织的影响。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "企业是社会中的一个子系统。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游管理学的研究对象具有多属性的特点。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "安全性标准是旅游业文明程度的标志。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游规划编制完成后直接实施即可。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "世界旅游组织强调危机发生的第一周至关重要。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游企业不具有一般企业的共性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "麦格雷戈首次提出“如果一那么”函数关系。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游节事活动自古就存在。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游目的地信息系统是旅游业与信息化最优的结合方式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "创新是旅游组织文化的精髓。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游者指的是,在所访问的目的地停留时间在24 小时以内且不过夜的临时性游客(包括游船旅游者)。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游时间比越大越好。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "中国旅游业已经建立起旅游业危机管理体系。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "旅游项目与旅游资源有着非常密切的依托关系。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游经济监督系统是旅游经济管理体制中正确决策的产生和实施的保证。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "简述旅游项目与旅游资源的关系。",
		answers: [
			"①旅游资源所具有的经济特征是一种潜在的经济性。 ②旅游资源所具有的空间特征在旅游项目上的体现也不明显。  ③旅游项目较旅游资源具有更强的文化特征。"
		],
		isFAQ: true
	},
	{
		question: "简述需要层次理论的五个层次。",
		answers: [
			"①生理上的需要 ②安全上的需要 ③感情和归属上的需要 ④地位和受人尊敬的需要 ⑤自我实现的需要"
		],
		isFAQ: true
	},
	{
		question: "简单说明旅游管理体制改革的总体目标。",
		answers: [
			"（一）借鉴经济发达国家督理组织的先进经验和成功做法。 （二）建立及安全行业管理领导机构。 （三）直接或会同有关部门，维护旅游业整体形象。"
		],
		isFAQ: true
	},
	{
		question: "简单说明旅游目的地营销的职能。",
		answers: [
			"（一）制定旅游发展规划，塑造独特旅游形象。 （二）确定目标市场和细分市场的促销重点。 （三）监督旅游产品质量，协调各主体之间利益。"
		],
		isFAQ: true
	},
	{
		question: "简述我国旅游市场营销现状。",
		answers: [
			"（一）盲目低价竞争。 （二）追求短期营销效果，经营手段落后。 （三）忽视售后服务，导致游客流失。 （四）忽视旅游形象。 （五）法律意识淡薄。"
		],
		isFAQ: true
	},
	{
		question: "简单说明旅游管理的定义。",
		answers: [
			"旅游组织通过市场调节及宏观调控等手段，实施计划、组织、领导、控制等职能，协调各种资源在旅游业中有效配置，从而实现既定目标的活动过程。"
		],
		isFAQ: true
	},
	{
		question: "简述旅游管理体制的结构组成。",
		answers: [
			"1.旅游经济决策系统 2.旅游经济调控系统 3.旅游经济信息系统 4.旅游经济监督系统 5.旅游经济组织系统"
		],
		isFAQ: true
	},
	{
		question: "简述旅游业危机管理的内涵。",
		answers: [
			"旅游业危机管理是指为避免和减轻危机事件给旅游业所带来的严重威胁，通过研究危机、危机预警和危机救治达到恢复旅游经营环境、恢复旅游消费信息的目的，进行的非程序化的决策过程。"
		],
		isFAQ: true
	},
	{
		question: "简单说明旅游组织管理的特征。",
		answers: [
			"①组织是一个职务结构或职权结构。 ②组织是一个责任系统，反映着上下级关系和横向沟通网络。 ③正式组织的工作受非正式组织的影响。"
		],
		isFAQ: true
	},
	{
		question: "简述旅游企业管理的基本含义。",
		answers: [
			"旅游企业管理者遵循市场理论与实际，运用各种管理手段，对旅游企业的生产全过程进行有效的决策、计划、组织、指挥、控制、协调，使各种资源要素得以合理配置，以实现企业预定的目标。"
		],
		isFAQ: true
	},
	{
		question: "简述游客购买行为的含义。",
		answers: [
			"游客购买行为是指游客购买和使用旅游产品或服务过程中的各种活动，受个人特点、社会因素和环境因素的影响，表现出复杂多样的购买行为。"
		],
		isFAQ: true
	},
	{
		question: "说明旅游规划编制的要求。",
		answers: [
			"（一）以国家和地区社会经济发展战略为依据，以旅游业发展方针、政策为基础。 （二）以旅游市场为导向，以旅游资源为基础，以旅游产品为主体。 （三）要突出地方特色，注重区域协同，强调空间一体化发展。 （四）鼓励采用先进方法和技术。 （五）工作要符合相关国家标准和技术规范。 （六）技术标准具有适度超前性。 （七）人员应有比较广泛的专业构成。"
		],
		isFAQ: true
	},
	{
		question: "简述旅游目的地营销系统 。",
		answers: [
			"旅游目的地通过互联网进行网络营销的模式，它把基于互联网的高效旅游宣传营销和本地的旅游咨询服务有机地结合在一起，为游客提供全程的周到服务。"
		],
		isFAQ: true
	},
	{
		question: "简述全面质量管理的基本内容。",
		answers: [
			"①要求全员参加的质量管理。 ②范围是产品或服务质量的产生、形成和实现的全过程。 ③要求是全企业的质量管理。 ④要采取多种多样的管理方法。"
		],
		isFAQ: true
	},
	{
		question: "简述矩阵型组织结构的主要优点。",
		answers: [
			"①项目目标显而易见责任明晰客户直接与项目经理沟通对客户反应迅速。 ②在跨职能环境中有利于培养有能力的项目经理或项目管理人员也有利于发挥各方面专业人员的综合优势。 ③最大限度地利用公司资源职能专业知识可供所有的项目使用由项目与职能部门分担资金成本。 ④可以得到职能经理的更多支持更好的协调可广泛征求意见解决问题。 ⑤加强了不同部门之间的配合和信息交流。\n填空题"
		],
		isFAQ: true
	},
	{
		question: "企业的终极目标是形成强大的（  ）。",
		answers: [
			"赢利能力"
		],
		isFAQ: true
	},
	{
		question: "（  ）是整个管理过程中,人们收集、加工、储存和输入、输出信息的总称。",
		answers: [
			"信息管理"
		],
		isFAQ: true
	},
	{
		question: "2001 年,（  ）在澳大利亚各联邦中率先实施了旅游业危机管理方案。",
		answers: [
			"昆士兰"
		],
		isFAQ: true
	},
	{
		question: "采用项目型组织结构的组织是按（  ）来设置的。",
		answers: [
			"项目"
		],
		isFAQ: true
	},
	{
		question: "英国旅游局的最高权力机构为（  ）。",
		answers: [
			"全体委员会"
		],
		isFAQ: true
	},
	{
		question: "我国的旅游机构设置模式是（  ）。",
		answers: [
			"旅游局模式"
		],
		isFAQ: true
	},
	{
		question: "（  ）由国际旅行社联合会和世界旅行社协会组织合并而成。",
		answers: [
			"世界旅行社协会联合会"
		],
		isFAQ: true
	},
	{
		question: "做好危机管理的准备.就是通过建立企业（  ）。",
		answers: [
			"风险预警系统"
		],
		isFAQ: true
	},
	{
		question: "（  ）没有特色是很多地方旅游节事活动寿命短的首要原因。",
		answers: [
			"内容"
		],
		isFAQ: true
	},
	{
		question: "资源的质量、风格，是游客在景点中经历都依赖的三个组成部分中的（  ）。",
		answers: [
			"外形部分"
		],
		isFAQ: true
	},
	{
		question: "建立有效的旅游管理体制，必须要从旅游业的（  ）去考虑。",
		answers: [
			"产业特征"
		],
		isFAQ: true
	},
	{
		question: "我国经济体制改革的目标是建立社会主义（  ）体制。",
		answers: [
			"市场经济"
		],
		isFAQ: true
	},
	{
		question: "（  ）就是人们在日常工作、学习、生活之余以及必需的社会活动之外,可以自由支配的时间。",
		answers: [
			"闲暇时间"
		],
		isFAQ: true
	},
	{
		question: "（  ）是指旅游管理部门或机构通过运用科技、教育、经济、行政、法律等各种手段组织和管理游客的行为过程。",
		answers: [
			"游客管理"
		],
		isFAQ: true
	},
	{
		question: "从管理学发展史看,其理论主要来自于（  ）。",
		answers: [
			"实践"
		],
		isFAQ: true
	},
	{
		question: "（  ）是“管理科学”理论的基础。",
		answers: [
			"运筹学"
		],
		isFAQ: true
	},
	{
		question: "（  ）是人们把进行旅游决策时收集到的各种信息摄入脑中,形成对环境的整体印象。",
		answers: [
			"感知环境"
		],
		isFAQ: true
	},
	{
		question: "（  ）是一个区域的规划概念，它指按照国家和地方旅游业发展纲要精神。",
		answers: [
			"旅游综合规划"
		],
		isFAQ: true
	},
	{
		question: "被后人称为“人事管理之父”的是（  ）。",
		answers: [
			"欧文"
		],
		isFAQ: true
	},
	{
		question: "旅游服务质量是指旅游服务满足（  ）旅游消费所具备的属性和特性。",
		answers: [
			"旅游者"
		],
		isFAQ: true
	},
	{
		question: "定量分析就是研究（  ）的变化对事物的影响。",
		answers: [
			"量"
		],
		isFAQ: true
	},
	{
		question: "“（  ）”是人际关系学说对人性的基本假设。",
		answers: [
			"社会人"
		],
		isFAQ: true
	},
	{
		question: "旅游规划编制要以国家和地区（  ）发展战略为依据。",
		answers: [
			"社会经济"
		],
		isFAQ: true
	},
	{
		question: "（  ）是旅游者对各种旅游信息、机会或备选旅游方案进行整理、评估、筛选,直至最终做出决策的过程。",
		answers: [
			"旅游决策"
		],
		isFAQ: true
	},
	{
		question: "所谓（  ），是指处于动态环境中的旅游组织是在不断变革和发展的,旅游组织对其成员的要求也是在不断变动的。",
		answers: [
			"人事动态平衡"
		],
		isFAQ: true
	},
	{
		question: "（  ）包括旅游资源价值评价、开发条件评价。",
		answers: [
			"旅游资源评价"
		],
		isFAQ: true
	},
	{
		question: "（  ）主要指服务场所的美化,商品陈列的艺术性,环境卫生状况等。",
		answers: [
			"环境质量"
		],
		isFAQ: true
	},
	{
		question: "（  ）是由于不确定性、突发性的重大事件发生而对旅游业造成的重大破坏和潜在的不良影响。",
		answers: [
			"旅游业危机"
		],
		isFAQ: true
	},
	{
		question: "“（  ）”假设,初始条件的细微变化将导致终端事件的动态大变革。",
		answers: [
			"蝴蝶效应"
		],
		isFAQ: true
	},
	{
		question: "（  ）是指为实现特定的偏好或欲望,在某一特定时期内，在核心旅游产品的各种可能价格和在这些价格水平上,潜在旅游者愿意并能购买的数量关系。",
		answers: [
			"旅游需求"
		],
		isFAQ: true
	},
	{
		question: "（  ）这是旅游经济管理体制的中枢。",
		answers: [
			"旅游经济决策系统"
		],
		isFAQ: true
	},
	{
		question: "（  ）作为系统平台的一个重要组成部分,是上层应用系统的基础。",
		answers: [
			"数据库系统"
		],
		isFAQ: true
	},
	{
		question: "（  ）是旅游业发展的前提，是旅游业的基础。",
		answers: [
			"旅游资源"
		],
		isFAQ: true
	},
	{
		question: "（  ）是一个过程，即旅游者通过与外部世界取得联系从而改变其心理水平并调整其心理结构的过程。",
		answers: [
			"旅游体验"
		],
		isFAQ: true
	},
	{
		question: "（  ）小组又称 QC小组。",
		answers: [
			"质量管理"
		],
		isFAQ: true
	},
	{
		question: "（  ）是构成旅游业的主体。",
		answers: [
			"旅游企业"
		],
		isFAQ: true
	},
	{
		question: "（  ）是对没有国家标准而又需要在全国某个行业范围内统一的技术要求。",
		answers: [
			"行业标准"
		],
		isFAQ: true
	},
	{
		question: "（  ）是旅游业的核心部分。",
		answers: [
			"旅游景点"
		],
		isFAQ: true
	},
	{
		question: "（  ）的需求是旅游企业产品设计与生产的基本依据。",
		answers: [
			"消费者"
		],
		isFAQ: true
	},
	{
		question: "（  ）是以服务对象的人数为基础,按定员标准比例来计算编制配备的方法。",
		answers: [
			"比例定员法"
		],
		isFAQ: true
	},
	{
		question: "权变理论学派也称权变学派.有的管理学者还称之为（  ）。",
		answers: [
			"因地制宜理论"
		],
		isFAQ: true
	},
	{
		question: "饭店的营销策划主要在于根据各饭店（  ）所带来的需求潜力和需求特征。",
		answers: [
			"选址"
		],
		isFAQ: true
	},
	{
		question: "饭店的特点是（  ）和无形服务两部分构成的。",
		answers: [
			"有形设施"
		],
		isFAQ: true
	},
	{
		question: "（  ）是旅游组织文化的表层部分,它是组织创造的物质文化是形成旅游组织文化精神层和制度层的条件。",
		answers: [
			"物质层"
		],
		isFAQ: true
	},
	{
		question: "（  ）是由中国旅游行业的有关社团组织和企事业单位在平等自愿基础上组成的全国综合性旅游行业协会。",
		answers: [
			"中国旅游协会"
		],
		isFAQ: true
	},
	{
		question: "从学科划分来说,旅游管理学学科是（    ）《一级学科》下的二级学科。",
		answers: [
			"工商管理学科"
		],
		isFAQ: true
	},
	{
		question: "“管理科学”追求的首先是最大限度的（  ）。",
		answers: [
			"生产率"
		],
		isFAQ: true
	},
	{
		question: "（  ）主要是国家或地方旅游局直接管理的企业。",
		answers: [
			"行业内直属企业"
		],
		isFAQ: true
	},
	{
		question: "签订规划编制合同后,规划编制方应立即着手成立规划（  ）。",
		answers: [
			"编制专家组"
		],
		isFAQ: true
	},
	{
		question: "旅游资源开发规划效益分析包括社会效益、经济效益和生态环境效益分析其中最重要的是（  ）的分析。",
		answers: [
			"经济效益"
		],
		isFAQ: true
	},
	{
		question: "国际化标准组织(ISO)给全面质量管理所下的定义是一个组织以（  ）为中心，建立在全员参与上的一种管理。",
		answers: [
			"质量"
		],
		isFAQ: true
	},
	{
		question: "组织是一个（  ），反映着上下级关系和横向沟通网络。",
		answers: [
			"责任系统"
		],
		isFAQ: true
	},
	{
		question: "（  ）就是政府旅游机关所进行的信息化建设。",
		answers: [
			"政府旅游部门信息化"
		],
		isFAQ: true
	},
	{
		question: "（  ）是以旅游消费需求为导向,协调各种旅游经济活动,提供有效产品和服务,使游客满意。",
		answers: [
			"旅游市场营销"
		],
		isFAQ: true
	},
	{
		question: "我国经济学家（   ）提出,旅游是现代社会中居民的一种短期性的特殊生活方式。",
		answers: [
			"于光远"
		],
		isFAQ: true
	},
	{
		question: "（  ）指通过对信息技术的运用来改进传统的旅游生产、分配和消费机制,以信息化的发展来优化旅游经济的运作,加快旅游经济增长,最终推动旅游产业全面发展的过程。",
		answers: [
			"旅游信息化"
		],
		isFAQ: true
	},
	{
		question: "（  ）这一概念是由美国兰德公司于 1949 年首先提出的。",
		answers: [
			"系统分析"
		],
		isFAQ: true
	},
	{
		question: "（  ）功能指的是利用网络手段对旅游目的地的产品与服务进行虚拟化演示。",
		answers: [
			"形象演示"
		],
		isFAQ: true
	},
	{
		question: "互联网具有（  ），网络营销可以不受时间,空间的限制而进行信息传播和交流。",
		answers: [
			"跨时空性"
		],
		isFAQ: true
	},
	{
		question: "2003 年.世界旅游组织发布了《（  ）》。",
		answers: [
			"旅游业危机管理指南"
		],
		isFAQ: true
	},
	{
		question: "（  ）又称规划—目标结构。",
		answers: [
			"矩阵型组织结构"
		],
		isFAQ: true
	},
	{
		question: "现代管理理论的奠基人（  ）认为,所谓组织是有意识调整两个人或更多人的行为或各种力量的系统。",
		answers: [
			"切斯特·巴纳德"
		],
		isFAQ: true
	},
	{
		question: "（  ）是指由某地方政府旅游组织将本地作为旅游目的地而负责的营销活动。",
		answers: [
			"旅游目的地营销"
		],
		isFAQ: true
	},
	{
		question: "（  ）主要是指当地居民的居住、生产、生活等活动构成目的地的社会文化景观。",
		answers: [
			"社会文化景观形象"
		],
		isFAQ: true
	},
	{
		question: "从操作层面上讲，（  ）是包括政府、社团、企业、公众等构成的全方位、综合性的网络体系。",
		answers: [
			"危机管理体系"
		],
		isFAQ: true
	},
	{
		question: "（  ）产生于旅游规划与开发的发展时期。",
		answers: [
			"市场导向模式"
		],
		isFAQ: true
	},
	{
		question: "所谓（  ）就是为了充分发挥旅游服务功能确保质量标准,对服务质量管理过程中发生的问题、偏差所进行的监督和指导工作。",
		answers: [
			"服务质量管理控制"
		],
		isFAQ: true
	},
	{
		question: "发展旅游业的终极目标是提升当地（   ）。",
		answers: [
			"经济"
		],
		isFAQ: true
	},
	{
		question: "根据（  ），少量的常客所带来的收益在企业整个收益中可能占很高的比例.",
		answers: [
			"帕累托原理"
		],
		isFAQ: true
	},
	{
		question: "旅游包括吃、住、行、游、购、娱、闲、商、景(点)等诸多要素，体现了旅游特点中的（  ）。",
		answers: [
			"综合性"
		],
		isFAQ: true
	},
	{
		question: "（）古称疏勒,西汉时受西域都护府管辖,",
		answers: [
			"喀什"
		],
		isFAQ: false
	},
	{
		question: "（），自然旅游资源为中心的旅游疗养地",
		answers: [
			"第一次世界大战前"
		],
		isFAQ: false
	},
	{
		question: "自然旅游资源的特点包括",
		answers: [
			"地带性"
		],
		isFAQ: false
	},
	{
		question: "（）是西藏主要河流，在下游向南的大拐弯处形成了世界上海拔最高的大峡谷",
		answers: [
			"雅鲁藏布江"
		],
		isFAQ: false
	},
	{
		question: "（）坐落昆明滇池北岸，门前长联被誉为“海内长联第一佳者”",
		answers: [
			"大观楼"
		],
		isFAQ: false
	},
	{
		question: "（）指以旅游资源特征为基础，具有组织旅游活动的相应机构、设施和旅游点的完整体系的旅游区域",
		answers: [
			"旅游区"
		],
		isFAQ: false
	},
	{
		question: "我国第一大岛（）",
		answers: [
			"台湾岛"
		],
		isFAQ: false
	},
	{
		question: "以下不属于湖泊风景型的是（）",
		answers: [
			"青岛海滨"
		],
		isFAQ: false
	},
	{
		question: "联合国教科文组织于（）年在巴黎通过《世界文化与自然遗产保护公约。",
		answers: [
			"1972"
		],
		isFAQ: false
	},
	{
		question: "是观赏长城的最好地段是（）",
		answers: [
			"居庸关"
		],
		isFAQ: false
	},
	{
		question: "“长城第一关”是（）",
		answers: [
			"山海关"
		],
		isFAQ: false
	},
	{
		question: "（）即湘桂运河，在广西兴安县境内，也称兴安运河。",
		answers: [
			"灵渠"
		],
		isFAQ: false
	},
	{
		question: "以下不属于革命历史纪念地型的是（）",
		answers: [
			"云冈石窟"
		],
		isFAQ: false
	},
	{
		question: "以下不属于海滨风景型的是（）",
		answers: [
			"大理洱海"
		],
		isFAQ: false
	},
	{
		question: "（）有中国“革命摇篮”之称",
		answers: [
			"井冈山"
		],
		isFAQ: false
	},
	{
		question: "美国地理学家克·麦克麦里《娱乐活动与土地利用关系》创作时间是",
		answers: [
			"20世纪30年代"
		],
		isFAQ: false
	},
	{
		question: "（），蒙特卡罗出版的国际词典，旅游被解释为“旅行，观光和访问”",
		answers: [
			"1963年"
		],
		isFAQ: false
	},
	{
		question: "（）开启“依山为陵”，墓前立碑",
		answers: [
			"唐朝"
		],
		isFAQ: false
	},
	{
		question: "我国最早的博物馆是（）由张謇创建的南通博物苑。",
		answers: [
			"1905年"
		],
		isFAQ: false
	},
	{
		question: "我国铁路网以()为中心，有多条纵贯南北的干线和横贯东西的干线组成。",
		answers: [
			"北京"
		],
		isFAQ: false
	},
	{
		question: "敦煌艺术以（）成就最大",
		answers: [
			"雕塑"
		],
		isFAQ: false
	},
	{
		question: "（）又称赵州桥",
		answers: [
			"安济桥"
		],
		isFAQ: false
	},
	{
		question: "藏族有自己的拼音文字，信奉（）",
		answers: [
			"喇嘛教"
		],
		isFAQ: false
	},
	{
		question: "日本为主的东亚、太平洋地区属于我国旅游业的（）",
		answers: [
			"短程"
		],
		isFAQ: false
	},
	{
		question: "（），第一次把旅游地理列为一个专业组，旅游地理学作为地理学的分支被确立下来。",
		answers: [
			"1976年"
		],
		isFAQ: false
	},
	{
		question: "“水旱从人、不知饥馑，沃野千里、世号陆海”。是指（）",
		answers: [
			"都江堰"
		],
		isFAQ: false
	},
	{
		question: "我国第一大淡水湖",
		answers: [
			"鄱阳湖"
		],
		isFAQ: false
	},
	{
		question: "（）坐落在湖北省江汉平原、汉水与长江交汇处和南北交通中点上，素有“九省通衢”之称。",
		answers: [
			"武汉"
		],
		isFAQ: false
	},
	{
		question: "自然旅游资源的特点包括",
		answers: [
			"多样性"
		],
		isFAQ: false
	},
	{
		question: "（），旅游开发的萌芽已显现出来",
		answers: [
			"第二次世界大战前"
		],
		isFAQ: false
	},
	{
		question: "以下不属于自然山川风景型的是（）",
		answers: [
			"大连金石滩"
		],
		isFAQ: false
	},
	{
		question: "（）有“仙阁”之称",
		answers: [
			"蓬莱阁"
		],
		isFAQ: false
	},
	{
		question: "（）指风景区内游览、参观、访问、娱乐等活动的直接场所，是构成风景区的基本单元。",
		answers: [
			"旅游点"
		],
		isFAQ: false
	},
	{
		question: "以下不属于历史古迹名胜型的是（）",
		answers: [
			"贵州织金洞"
		],
		isFAQ: false
	},
	{
		question: "清代诗人袁枚的描述“龙湫山高势绝天，一线瀑走兜罗棉。”是指（）",
		answers: [
			"大龙湫瀑布"
		],
		isFAQ: false
	},
	{
		question: "（）位于旧城中心，建于1625年，是我国现保存的第二个古代宫殿建筑群",
		answers: [
			"沈阳故宫"
		],
		isFAQ: false
	},
	{
		question: "（）指某一特有的自然景观为主体，由许多相互联系、有机结合的风景点、古迹组成的独具风格的旅游区域。",
		answers: [
			"风景区"
		],
		isFAQ: false
	},
	{
		question: "“那达慕”是（）一年一度的群体盛会",
		answers: [
			"蒙古族"
		],
		isFAQ: false
	},
	{
		question: "至2015年七月，我国已有（）项世界自然或文化遗产名录，世界排名仅次于意大利。",
		answers: [
			"48"
		],
		isFAQ: false
	},
	{
		question: "东北是（）的发源地",
		answers: [
			"清代"
		],
		isFAQ: false
	},
	{
		question: "美国、西欧为主属于我国旅游业的（）",
		answers: [
			"中程"
		],
		isFAQ: false
	},
	{
		question: "俄罗斯、东欧各国及澳大利亚为主属于我国旅游业的（）",
		answers: [
			"远程"
		],
		isFAQ: false
	},
	{
		question: "（），许多国家采取了以振兴国内旅游为目的的地区经济振兴政策，促进了旅游大众化",
		answers: [
			"第二次世界大战后"
		],
		isFAQ: false
	},
	{
		question: "以下不属于历代宗教名胜型的是（）",
		answers: [
			"井冈山"
		],
		isFAQ: false
	},
	{
		question: "以下不属于森林风景型的是（）",
		answers: [
			"青岛湖滨"
		],
		isFAQ: false
	},
	{
		question: "（）是我国农业开发最早的地区。",
		answers: [
			"黄河中下游地区"
		],
		isFAQ: false
	},
	{
		question: "维吾尔族居民多信奉（）",
		answers: [
			"伊斯兰教"
		],
		isFAQ: false
	},
	{
		question: "以下不属于旅游业规划的特点的是（）",
		answers: [
			"理论的专业性"
		],
		isFAQ: false
	},
	{
		question: "（）是沃野千里的“天府之国”",
		answers: [
			"四川盆地"
		],
		isFAQ: false
	},
	{
		question: "云冈石窟位于山西（）",
		answers: [
			"大同"
		],
		isFAQ: false
	},
	{
		question: "岩浆岩包括（）",
		answers: [
			"花岗岩"
		],
		isFAQ: false
	},
	{
		question: "以下不属于石林溶洞瀑布风景型的是（）",
		answers: [
			"辽宁长白山"
		],
		isFAQ: false
	},
	{
		question: "以下不属于旅游开发的评价的是（）",
		answers: [
			"自然评价"
		],
		isFAQ: false
	},
	{
		question: "长城西端终点，刻有“天下雄关”的四字石碑是（）",
		answers: [
			"嘉峪关"
		],
		isFAQ: false
	},
	{
		question: "（），欧美诸国开始重视旅游开发的经济效益",
		answers: [
			"第一次世界大战后"
		],
		isFAQ: false
	},
	{
		question: "华南地区水系多，河网密度大，汛期长，河流水量丰富，含沙量少。主要有（）三大水系。",
		answers: [
			"珠江",
			"闽江",
			"韩江"
		],
		isFAQ: false
	},
	{
		question: "广东四大名山包括（）",
		answers: [
			"丹霞",
			"罗浮",
			"鼎湖",
			"西樵"
		],
		isFAQ: false
	},
	{
		question: "长江中游平原包括（）",
		answers: [
			"汉江平原",
			"洞庭湖平原",
			"鄱阳湖平原"
		],
		isFAQ: false
	},
	{
		question: "西南旅游区包括（）",
		answers: [
			"四川",
			"云南",
			"贵州"
		],
		isFAQ: false
	},
	{
		question: "敦煌石窟包括（）",
		answers: [
			"千佛洞",
			"西千佛洞",
			"榆林窟"
		],
		isFAQ: false
	},
	{
		question: "我国外流流域包括（）",
		answers: [
			"太平洋流域",
			"印度洋流域",
			"北冰洋流域"
		],
		isFAQ: false
	},
	{
		question: "我国古代园林的类型包括（）",
		answers: [
			"北方型",
			"南方型",
			"岭南型"
		],
		isFAQ: false
	},
	{
		question: "我国自然保护区类型包括（）",
		answers: [
			"生物型",
			"综合型",
			"自然风景型",
			"自然历史遗迹型"
		],
		isFAQ: false
	},
	{
		question: "我国主要海滨旅游资源（）",
		answers: [
			"北方",
			"南方"
		],
		isFAQ: false
	},
	{
		question: "圆明园：由（）组成。",
		answers: [
			"圆明",
			"长春",
			"绮春"
		],
		isFAQ: false
	},
	{
		question: "我国六大古都包括（）",
		answers: [
			"西安",
			"洛阳",
			"开封",
			"南京"
		],
		isFAQ: false
	},
	{
		question: "我国四大河流（）",
		answers: [
			"珠江",
			"长江",
			"黄河",
			"黑龙江"
		],
		isFAQ: false
	},
	{
		question: "我国的特种工艺品特点（）",
		answers: [
			"种类多",
			"历史悠久",
			"富有民族性",
			"工艺精湛"
		],
		isFAQ: false
	},
	{
		question: "我国人文旅游资源的特点包括（）",
		answers: [
			"历史性",
			"民族风格和地方特色",
			"强有力的生命力",
			"活跃性"
		],
		isFAQ: false
	},
	{
		question: "东北旅游区包括（）",
		answers: [
			"黑龙江",
			"吉林",
			"辽宁"
		],
		isFAQ: false
	},
	{
		question: "条件评价是指旅游地理位置、交通条件、景象地理组合条件、景区环境容量条件，以及投资条件和施工条件等",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国积极参加联合国“人与生物圈”计划，成立了我国的“人与生态圈”国家委员会；",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "宗教旅游是以具有特定宗教含义的自然或人文吸引物，如宗教圣地和圣迹等为主要风景观赏对象的一项特殊旅游活动。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "截至2013年，我国已建立各级各类自然保护区有2588处，总面积150余万平方公里。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "北方水榭端庄稳重，南方水榭轻巧妩媚",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "华南地区多民族融洽共居，有汉族、壮族、瑶族、苗族等，是我国历史上旅外华侨最多的地区之一",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "苏州拙政园的水廊，轻盈婉约，美感强烈",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "孔府旧称“衍圣公府”，孔庙珍藏历代碑刻2100余方，仅次于西安碑林，是我国第二个书法艺术宝库",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "海岸带指海洋与陆地接触地带",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游开发是以振兴旅游事业为前提的各种开发，目的是提供旅游、娱乐、休养等的环境。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "地区开发指为了发展地区经济、提高地区文化水平而开发地区经济、扩大经济规模，其重点着眼于经济开发。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国烹饪技术历史悠久，技艺精湛，注重形式美与内容美的结合",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "沉积岩在适宜的气候条件下，常常形成岩溶地貌",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游资源是指旅游产业可以产出经济价值的旅游对象物，是旅游业产生的物质基础。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国降水分配地区间不均匀，时间上不平衡。降水地区由东南向西北逐渐减少",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国外流流域包括太平洋流域、印度洋流域和北冰洋流域",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "海岸带旅游：在海岸带以内，包括海洋、海滩进行观赏、游览、休息以及各种海上娱乐活动。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "战国时期秦国太守李冰父子主持修建都江堰",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "昆明冬暖夏凉，四季如春，被称为“春城”",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "灵渠沟通湘漓二水，连接长江和珠江两大水系。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "人文旅游资源也称文化景观旅游资源，它是自人类出现之日起，由人类活动所产生、经过开发达到引起旅游者兴趣和滞留目的的一切事物。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "秦晋高原由陕北高原和山西高原组成，是黄土高原的一部分。气候偏冷偏干。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "长江下游平原也称苏皖平原。此段江流平缓曲折，平原纵长。其中巢湖面积最大。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游线路指专为旅游者设计，能提供多种旅游活动的旅行游览路线",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "按属性分类法，旅游资源可以分为自然旅游资源和人文旅游资源",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国东部属于耐湿动物群、蒙新地区属于耐旱动物群、青藏高原是耐寒动物群",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "基督教公元635年传入中国，称为景教",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国的自然旅游资源形成千姿百态、丰富多彩的自然景色和旅游风景区。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游开发不仅是经济开发，同时也是文化开发。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "都城一般选在位置适中、水源充足、交通方便、物产丰富的地方，也有明显的防御功能。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "珠江是我国南部最大河流，它以支流众多、水道纷纭而著称",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "民俗旅游就是以比较接近生活中自然形态的民间文化(民间娱乐、民间信仰、民间风俗、民间文艺)为主要观赏对象的旅游活动。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国距世界目前主要客源地欧洲和北美洲较远",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "变质岩常常形成低而和缓的地形。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游资源在合理 开发、利用、保护前提下有永续利用的特点",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "江南园林以小中见大著称，如苏州怡园的螺髻亭",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国早在4000年前就发展了养蚕业、缫丝业和丝绸业，并向海外出口。中国因此被世人称为“东方丝国”",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游资源有明显的地域分异现象、季节性和时代特点",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国海岸线北起鸭绿江口，南至北仑河口，18000公里",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游开发是旅游事业最重要的同时也是最基本的事业活动，它是将资源转换为产品市场推销的行为。其目的是积极振兴旅游业",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国现存最高古阁是北京颐和园佛香阁",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国第一大淡水湖是洞庭湖",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游地理学是一门多学科综合性边缘科学。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国地貌类型齐全，但以山地、高原地形为主,广义的山地占全国总面积的65%",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游线路指专为旅游者设计，能提供多种旅游活动的旅行游览路线",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "陆上丝绸之路于西汉开辟，东起长安，穿过河西走廊，在敦煌分为两路，远至地中海沿岸、罗马、欧洲等地， 主要贩运丝绸。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "第一篇关于旅游地理研究的论文是美国地理学家克·麦克麦里《娱乐活动与土地利用关系》",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游业规划建立在全面调查区域资源状况及特点、社会经济现状的基础上，对未来游客的数量及爱好加以分析研究",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "开展体育探险登山运动要有五六千米以上的高山、极高山山峰，山峰在登山活动中具有特殊的意义。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国森林覆盖占全国土地面积的21.6%，天然草地面积约3.53%亿公顷",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "坎儿井有2000年历史，集中分布在新疆吐鲁番盆地和哈密盆地。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "中国城市最初是以农产品集散中心而发展起来的",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "北方型园林以北京为代表，多为皇家园林。规模宏大，建筑体态端庄，色彩华丽，雍容华贵，",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矿泉是含有一定数量的特殊化学成分、有机物和气体，或具有较高的水温，能影响人体生理作用的泉水",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "黄山是西南——东北走向的花岗岩断块山；因黄帝采药传说，也称“黄岳”，以光明顶为中心。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "东北地区19世纪中叶发展比较迅速，但其后帝国主义侵略、掠夺，摧残经济",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游开发的内容包括旅游资源的评价和保护，建设观光设施，整顿交通，建立有关的旅游情报体系等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国植被的分布有着明显的水平地带性和垂直分布规律。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "五台山是文殊菩萨的经场和居住胜地。主要供奉文殊菩萨。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "喀什是我国最西部一座古老的维吾尔族聚居的城市。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "长江是我国第二长河，全长5464公里，发源于青海巴颜喀拉山",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "荆江地区是古代楚国所在地，是三国时期三国争雄的重要地区，所以楚汉文化和三国遗迹十分丰富。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "自然旅游资源是由自然地理环境的各要素组成的， 如地貌、水体、气候、动植物等等",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在一定水平地带内，山地随海波高度上升，构成植被的垂直带谱",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "广西是我国石灰岩分布面积大、岩溶发育最典型的区域，有四个类型：峰丛、峰林、孤峰、残丘",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "旅游开发是创造价值，同时也是提高价值。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "准噶尔盆地的乌尔河地区，称为“风城”，又称“魔鬼城“",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国1956年在广东肇庆建立了第一个自然保护区。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "石窟寺艺术来源印度。是寺庙建筑的一种。有敦煌莫高窟、大同云冈、洛阳龙门等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国北方、西北春旱大风沙、长江中下游持续高温、东南沿海台风威胁",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国的旅游开发",
		answers: [
			"1、要继续推行旅游业可持续发展战略，实行“绿色开发”，强化生态保护意识； 2、“绿色产品”，发展生态旅游、农业旅游、森林旅游、草原旅游、冰雪旅游、海岛旅游、观鸟旅游、沙漠旅游、探险旅游等项目； 3、还要推广“绿色经营”、建设“绿色体系”，努力实现从亚洲旅游大国向世界旅游强国的历史性跨越。"
		],
		isFAQ: true
	},
	{
		question: "中国古代园林的特色",
		answers: [
			"1、在形式上多样，主要为木构架结构。 2、在造园艺术手段上，充分利用天然湖山的有利条件，因地制宜。 3、园林的题景、门楣、对联等点染景物特点与神韵。 4、色彩上，一般园林多用青灰色砖瓦等，清淡典雅"
		],
		isFAQ: true
	},
	{
		question: "我国旅游地理区位环境对旅游业发展的意义",
		answers: [
			"我国辽阔的国土和自然环境的差异， 1、为旅游者提供了广阔的旅游空间， 2、也创造了多样的旅游环境， 3、既有较大的旅游环境容量， 4、可以适应不同层次游客的需要， 5、开发多种形式和内容的旅游活动。"
		],
		isFAQ: true
	},
	{
		question: "泉的旅游价值及其综合利用",
		answers: [
			"矿泉中富含多种对人体有益的矿物质或微量元素，能起到预防和治疗某些疾病的作用，因此世界上重要的温泉地几乎都成了疗养地"
		],
		isFAQ: true
	},
	{
		question: "旅游开发的类型",
		answers: [
			"充分开发自然景观型 充分开发人文资源型 充分利用交通旅游地型 充分利用知名度开发型 旅游对象创造型"
		],
		isFAQ: true
	},
	{
		question: "京津冀地区发展旅游业的经济基础",
		answers: [
			"1、是我国开发历史较早的地区之一 2、自然资源丰富 3、工业基础雄厚 4、当地城市因地制宜发展经济，为旅游业提供良好经济条件。"
		],
		isFAQ: true
	},
	{
		question: "介绍城市日喀则",
		answers: [
			"1、西藏第二大城市； 2、市区周围土地肥沃，农牧业发达，是西藏的粮仓和农牧产品的集散地； 3、扎什伦布寺是全国重点文物保护单位，寺内有很多珍贵的文物、经书、塑像、壁画等。"
		],
		isFAQ: true
	},
	{
		question: "长江中下游旅游区的经济状况",
		answers: [
			"自然条件优越，人口众多，开发历史悠久 1、历史上便是我国重要的农耕区；依托现代工业发展和交通运输，农业发展迅速。 2、是重要的水稻、小麦、蚕丝、棉、油料作物、淡水水产、海产产地；舟山群岛是我国最大的海洋渔场。"
		],
		isFAQ: true
	},
	{
		question: "旅游开发的概念",
		answers: [
			"1、旅游开发的内容包括旅游资源的评价和保护，建设观光设施，整顿交通，建立有关的旅游情报体系等。 2、旅游开发是旅游事业最重要的同时也是最基本的事业活动，它是将资源转换为产品市场推销的行为。其目的是积极振兴旅游业。"
		],
		isFAQ: true
	},
	{
		question: "受国家保护的文物包括",
		answers: [
			"①具有历史、艺术、科学价值的古文化遗址、古墓葬、石窟寺和石刻 ②与历史事件、革命运动和著名人物有关的具有重要纪念意义和史料价值的建筑筑物、遗址、纪念物 ③历史上各时代珍贵的艺术品、工艺美术品 ④重要的革命文献资料以及具有历史、艺术、科学价值的手稿、古旧图书资料等 ⑤反映历史上各时代代、各民族社会制度、社会生产、社会生活的代表性实物。此外有科学价值的古脊椎动物化石和古人类化石也受国家保护"
		],
		isFAQ: true
	},
	{
		question: "旅游开发和地区开发的关系",
		answers: [
			"1、旅游开发作为地区开发的一环，必须和综合开发统一 2、旅游开发是在国土一定地区把其他产业不可能开发或未开发领域内的被称作“旅游资源”的那类资源开发出来，使其在地区经济开发中发挥一定的作用。 3、旅游开发给地区社会带来非常广泛的影响"
		],
		isFAQ: true
	},
	{
		question: "旅游开发的原则",
		answers: [
			"1、 必须符合国家和地区建设的基本方针 2、充分利用当地资源，不要破坏自然景观和原有氛围 3、 保持历史文物和古迹的固有面貌 4、突出民族性和地方特色 5、 防止污染，保护生态环境 6、 讲究经济效益，要求投资少、收效快"
		],
		isFAQ: true
	},
	{
		question: "长城的意义",
		answers: [
			"1、长城是我国历史上各族劳动人民共同创建的一项伟大工程，是前人为我们留下的一份珍贵遗产； 2、历史上长城成为一条地理上的界线——有形的文化界线，也是一条自然和人文混合物——草原游牧和定居农耕的分野，"
		],
		isFAQ: true
	},
	{
		question: "风景名胜区的建设与保护",
		answers: [
			"1、风景名胜区应以自然风景为主，建筑景观为辅， 2、建筑设计要在与环境密切协调的情况下，因地制宜，因景而异， 3、既反对破坏性建筑，也要防止建设性破坏， 让风景名胜区更长远地为人类服务。"
		],
		isFAQ: true
	},
	{
		question: "佛教及其对我国的影响",
		answers: [
			"1、大约在东汉初年传入中国，建立了中国第一个佛寺——白马寺 2、南北朝时期王室笃信佛教，兴修大量佛寺、宝塔 3、隋唐是佛教的大成时期，于儒家理念结合，形成中国式佛教 佛教在中国流传过程中，形成了自己的派别和理论体系\n填空题"
		],
		isFAQ: true
	},
	{
		question: "我国位于亚洲东部，太平洋西岸；（）个邻国",
		answers: [
			"14"
		],
		isFAQ: true
	},
	{
		question: "（）、杭州与湖州合称为我国的“三大绸市”。",
		answers: [
			"苏州"
		],
		isFAQ: true
	},
	{
		question: "我国自然植被从东南向西北：森林、（）、荒漠",
		answers: [
			"草原"
		],
		isFAQ: true
	},
	{
		question: "（）类型众多、景观内容丰富。宜重点开发游览、观赏、避暑等项旅游。",
		answers: [
			"山地"
		],
		isFAQ: true
	},
	{
		question: "少数民族中人口超千万的只有（）。",
		answers: [
			"壮族"
		],
		isFAQ: true
	},
	{
		question: "北京（）长廊是全国最长的长廊，长728米",
		answers: [
			"颐和园"
		],
		isFAQ: true
	},
	{
		question: "（），旅游开发的萌芽已显现出来",
		answers: [
			"第二次世界大战前"
		],
		isFAQ: true
	},
	{
		question: "（）时期，诸侯国修筑长城，称为“先秦长城”，是我国最早修的长城。",
		answers: [
			"春秋战国"
		],
		isFAQ: true
	},
	{
		question: "京杭大运河的南北贯通始于元代。忽必烈重用（）修筑运河",
		answers: [
			"郭守敬"
		],
		isFAQ: true
	},
	{
		question: "中国城市的传统形制是（）",
		answers: [
			"正方形"
		],
		isFAQ: true
	},
	{
		question: "旅游开发不仅是经济开发，同时也是开发。",
		answers: [
			"文化"
		],
		isFAQ: true
	},
	{
		question: "颐和园的（），是我国现存最大的亭",
		answers: [
			"廓如亭"
		],
		isFAQ: true
	},
	{
		question: "我国面积（）平方公里",
		answers: [
			"960万"
		],
		isFAQ: true
	},
	{
		question: "（）是指一种坐落在高台上的木构建筑。",
		answers: [
			"榭"
		],
		isFAQ: true
	},
	{
		question: "我国山脉按其排列与走向可分为（）个系列",
		answers: [
			"四"
		],
		isFAQ: true
	},
	{
		question: "我国最早发现的一处距今50万年的的中国猿人洞穴是（）",
		answers: [
			"周口店"
		],
		isFAQ: true
	},
	{
		question: "旅游地理位置指旅游地域与（）之间的相对位置",
		answers: [
			"客源地"
		],
		isFAQ: true
	},
	{
		question: "我国菜系主要分为（）菜系",
		answers: [
			"八大"
		],
		isFAQ: true
	},
	{
		question: "（）与湘潭、株洲三市组成湘中工业区。",
		answers: [
			"长沙"
		],
		isFAQ: true
	},
	{
		question: "天津独乐寺观音阁是现存最早的（），建于辽代",
		answers: [
			"木构阁"
		],
		isFAQ: true
	},
	{
		question: "（）是以振兴旅游事业为前提的各种开发，目的是提供旅游、娱乐、休养等的环境。",
		answers: [
			"旅游开发"
		],
		isFAQ: true
	},
	{
		question: "（）美国建立黄石公园，成为世界上最早的自然保护区。",
		answers: [
			"1872年"
		],
		isFAQ: true
	},
	{
		question: "岭南型园林以（）园林为代表。介于以上二者之间，吸收海外造园手法，通透明快。",
		answers: [
			"广东"
		],
		isFAQ: true
	},
	{
		question: "麦积山石窟中（）是最有艺术特色的部分，被称为“东方雕塑馆”",
		answers: [
			"泥塑"
		],
		isFAQ: true
	},
	{
		question: "我国四大长河，均自西向东注入（）",
		answers: [
			"太平洋"
		],
		isFAQ: true
	},
	{
		question: "（）被誉为中华民族的摇篮。",
		answers: [
			"黄河"
		],
		isFAQ: true
	},
	{
		question: "（）为分界，（以北）泥沙质海岸、（以南）基岩海岸",
		answers: [
			"钱塘江口"
		],
		isFAQ: true
	},
	{
		question: "（）出现最早的园林“囿”",
		answers: [
			"殷商"
		],
		isFAQ: true
	},
	{
		question: "（）泛指各个历史时期，人们在生产、生活中遗存在社会上或埋藏与地下的历史遗迹、遗址。",
		answers: [
			"文物"
		],
		isFAQ: true
	},
	{
		question: "从河床纵断面陡坡或悬崖处倾泻下来的水流称为（）",
		answers: [
			"瀑布"
		],
		isFAQ: true
	},
	{
		question: "把能吸引游客的一切因素称为（）",
		answers: [
			"旅游资源"
		],
		isFAQ: true
	},
	{
		question: "我国第一大大长河，世界第三长河是（）",
		answers: [
			"长江"
		],
		isFAQ: true
	},
	{
		question: "我国地势西高东低，呈（）分布",
		answers: [
			"阶梯状"
		],
		isFAQ: true
	},
	{
		question: "（），包括旅游地理位置、旅游资源以及旅游地环境等。",
		answers: [
			"立地条件"
		],
		isFAQ: true
	},
	{
		question: "自然保护区也叫（）。包括保护自然环境和自然资源",
		answers: [
			"禁伐禁猎区"
		],
		isFAQ: true
	},
	{
		question: "我国自然植被种类丰富，种类之多，居世界（）位",
		answers: [
			"第三"
		],
		isFAQ: true
	},
	{
		question: "（）是我过自然地理上的一条重要分界线，两侧气候和地貌环境都有较大差异",
		answers: [
			"淮河"
		],
		isFAQ: true
	},
	{
		question: "我国海岸线长（）公里",
		answers: [
			"一万八千"
		],
		isFAQ: true
	},
	{
		question: "（）往往构成玄武岩高原和台地",
		answers: [
			"玄武岩"
		],
		isFAQ: true
	},
	{
		question: "（）在我国运输中仅次于铁路运输居第二位。",
		answers: [
			"水上运输"
		],
		isFAQ: true
	},
	{
		question: "（）产生于公元前6-公元前5世纪，由释迦牟尼所创，对中国的影响最为广泛、深远",
		answers: [
			"佛教"
		],
		isFAQ: true
	},
	{
		question: "山地自然美是种综合美，包括山地的形象美、色彩美、动态美、听觉美、嗅觉美等，其中以（）为核心和基础。",
		answers: [
			"形象美"
		],
		isFAQ: true
	},
	{
		question: "长江在镇江以下，江面迅速展宽，形成以太湖为中心的（），是三角洲的主体",
		answers: [
			"太湖平原"
		],
		isFAQ: true
	},
	{
		question: "（）是五岳中规模最大、布局最完整的古建筑群。",
		answers: [
			"南岳大庙"
		],
		isFAQ: true
	},
	{
		question: "壮族集中分布在广西，（）年成立广西壮族自治区",
		answers: [
			"1958"
		],
		isFAQ: true
	},
	{
		question: "风力对地面物质的吹蚀和封杀的磨蚀作用称为（）",
		answers: [
			"风蚀"
		],
		isFAQ: true
	},
	{
		question: "温泉是指水温在（）以上的矿泉",
		answers: [
			"34℃"
		],
		isFAQ: true
	},
	{
		question: "1976年，第一次把旅游地理列为一个专业组，（）作为地理学的分支被确立下来。",
		answers: [
			"旅游地理学"
		],
		isFAQ: true
	},
	{
		question: "中国最早开凿的运河，世界上最古老的运河之一是（）",
		answers: [
			"京杭大运河"
		],
		isFAQ: true
	},
	{
		question: "（）时期，长城已经萌芽",
		answers: [
			"西周末年"
		],
		isFAQ: true
	},
	{
		question: "海上丝绸之路也称为（）。起于福建泉州，到达非洲埃及、肯尼亚等国。",
		answers: [
			"瓷器之路"
		],
		isFAQ: true
	},
	{
		question: "（）是分布相当广泛的一种岩浆岩，它一般构成山地的核心",
		answers: [
			"花岗岩"
		],
		isFAQ: true
	},
	{
		question: "地下水的天然露头称之为（）",
		answers: [
			"泉"
		],
		isFAQ: true
	},
	{
		question: "（）指具有自然美的典型山岳景观和渗透着人文景观美的山地空间合体。",
		answers: [
			"风景名山"
		],
		isFAQ: true
	},
	{
		question: "（）一般地势低平，起伏和缓。农耕业发达、交通便利、适于建造田园风光",
		answers: [
			"平原地区"
		],
		isFAQ: true
	},
	{
		question: "（）被称为“塞上江南”",
		answers: [
			"宁夏平原"
		],
		isFAQ: true
	},
	{
		question: "（）必须经过开发才能被利用，才具有旅游价值",
		answers: [
			"旅游资源"
		],
		isFAQ: true
	},
	{
		question: "（）约在公元7世纪中叶传入我国，主要在回族、维吾尔族、哈萨克族等传播",
		answers: [
			"伊斯兰教"
		],
		isFAQ: true
	},
	{
		question: "（），指旅游开发特别要严格遵守国家法律、法令以及地方性法规。",
		answers: [
			"社会条件"
		],
		isFAQ: true
	},
	{
		question: "（）位于松花江畔，有“江城”之称，是全国有名的化工城",
		answers: [
			"吉林"
		],
		isFAQ: true
	},
	{
		question: "京津冀旅游区主要河流多属于（）",
		answers: [
			"海河水系"
		],
		isFAQ: true
	},
	{
		question: "（）是构景因素中最活跃、最富于变化的因素， 常形成宇宙奇观。",
		answers: [
			"大气"
		],
		isFAQ: true
	},
	{
		question: "按属性分类法，旅游资源可以分为自然旅游资源和（）旅游资源",
		answers: [
			"人文"
		],
		isFAQ: true
	},
	{
		question: "（）为佛教传入我国的第一座寺院",
		answers: [
			"白马寺"
		],
		isFAQ: true
	},
	{
		question: "（）是登山探险旅游的重要场所。",
		answers: [
			"高山"
		],
		isFAQ: true
	},
	{
		question: "我国地形多样，（）为主",
		answers: [
			"山地"
		],
		isFAQ: true
	},
	{
		question: "人们称（）为旅游的第一环境",
		answers: [
			"自然旅游资源"
		],
		isFAQ: true
	},
	{
		question: "（）是内蒙古现存唯一完整的喇嘛教庙宇。在内蒙古包头市",
		answers: [
			"五当古刹"
		],
		isFAQ: true
	},
	{
		question: "我国于加入《世界文化与自然遗产保护公约》。",
		answers: [
			"1985年"
		],
		isFAQ: true
	},
	{
		question: "（），包括地形、气候、水以及其他自然环境条件",
		answers: [
			"自然条件"
		],
		isFAQ: true
	},
	{
		question: "在对话框中，压住（  ）键，可使取消按钮变成复位按钮。",
		answers: [
			"Alt"
		],
		isFAQ: false
	},
	{
		question: "可以将图像自动对齐和分布的图层是（  ）。",
		answers: [
			"链接图层"
		],
		isFAQ: false
	},
	{
		question: "移动图层中的图像时，如果每次需移动10个像素的距离，应（  ）。",
		answers: [
			"按住Shift键的同时按键盘上的箭头键"
		],
		isFAQ: false
	},
	{
		question: "当图像偏蓝时，使用变化功能应当给图像增加的颜色是（  ）。",
		answers: [
			"黄色"
		],
		isFAQ: false
	},
	{
		question: "一张RGB的彩色图像使用图像/调整/去色功能后，与（  ）模式的效果相似。",
		answers: [
			"灰度"
		],
		isFAQ: false
	},
	{
		question: "如果影像作品会制成印刷品时，必须先转成（   ）模式才能分色打印。",
		answers: [
			"CMYK"
		],
		isFAQ: false
	},
	{
		question: "不属于在图层面板中可以调节的参数是（  ）。",
		answers: [
			"图层的大小"
		],
		isFAQ: false
	},
	{
		question: "色彩深度是指一个图像中（  ）的数量。",
		answers: [
			"饱和度"
		],
		isFAQ: false
	},
	{
		question: "可使用的内置滤镜最多的色彩模式是（  ）。",
		answers: [
			"RGB"
		],
		isFAQ: false
	},
	{
		question: "在色彩范围对话框中为了调整颜色的范围，应当调整（  ）。",
		answers: [
			"颜色容差"
		],
		isFAQ: false
	},
	{
		question: "按住在Photoshop中的空白区域双击可以实现（  ）。",
		answers: [
			"打开一副图片"
		],
		isFAQ: false
	},
	{
		question: "在平面设计构图的五大关系要素中，（  ）构成形态之间的横竖、正斜、平行、成角等。",
		answers: [
			"方向差异"
		],
		isFAQ: false
	},
	{
		question: "图层控制面板的快捷键是（  ）。",
		answers: [
			"F7"
		],
		isFAQ: false
	},
	{
		question: "（  ）模式的特点是在使用不同的显示器或打印设备时，它所显示的颜色都是相同的。",
		answers: [
			"LAB"
		],
		isFAQ: false
	},
	{
		question: "Photoshop缺省时，设置的保留历史状态数是（  ）。",
		answers: [
			"20次"
		],
		isFAQ: false
	},
	{
		question: "当将CMYK模式的图像转换为多通道模式时，产生的通道名称是（  ）。",
		answers: [
			"青色、洋红、黄色、黑色"
		],
		isFAQ: false
	},
	{
		question: "若想使各以彩色显示，应选择下列哪个命令设定。（  ）",
		answers: [
			"显示与光标"
		],
		isFAQ: false
	},
	{
		question: "下列（  ）为互补的色相。",
		answers: [
			"以上都可以"
		],
		isFAQ: false
	},
	{
		question: "可以选择连续的相似颜色区域的工具是（  ）。",
		answers: [
			"魔棒工具"
		],
		isFAQ: false
	},
	{
		question: "下列颜色中，亮度最高的是（  ）。",
		answers: [
			"黄色"
		],
		isFAQ: false
	},
	{
		question: "滤镜中的（  ）效果，可以使图像呈现塑料纸包住的效果。",
		answers: [
			"塑料包装"
		],
		isFAQ: false
	},
	{
		question: "当使用JPEG作为优化图像的格式时，（  ）。",
		answers: [
			"图像质量百分比值越高，文件越大"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中的图像能被打印出来的有（  ）。",
		answers: [
			"像素"
		],
		isFAQ: false
	},
	{
		question: "图像高速缓存级别的范围是（  ）。",
		answers: [
			"1-8"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop7.0中，（  ）是一种特殊的软件处理模块，也是一种特殊的图像效果处理技术。",
		answers: [
			"滤镜"
		],
		isFAQ: false
	},
	{
		question: "使用钢笔工具可以绘制出最简单的线条是（  ）。",
		answers: [
			"直线"
		],
		isFAQ: false
	},
	{
		question: "如果使用矩形选框工具画出一个以鼠标击点为中心的矩形选区应按住（  ）键。",
		answers: [
			"Alt"
		],
		isFAQ: false
	},
	{
		question: "在路径曲线线段上，方向线和方向点的位置决定了曲线段的（  ）。",
		answers: [
			"形状"
		],
		isFAQ: false
	},
	{
		question: "HSB中的H是指（  ）。",
		answers: [
			"色相"
		],
		isFAQ: false
	},
	{
		question: "在现有选中区域的基础上如果增加选择区域，应按住（  ）键。",
		answers: [
			"Shift"
		],
		isFAQ: false
	},
	{
		question: "对于高斯模糊叙述正确的是（  ）。",
		answers: [
			"使选区中的图像呈现出一种拍摄高速运动中的物体的模糊效果"
		],
		isFAQ: false
	},
	{
		question: "在图层面板中，按住（  ）键的同时单击垃圾桶图标，可直接将选中的通道删除。",
		answers: [
			"Alt"
		],
		isFAQ: false
	},
	{
		question: "不属于平面设计常用的输入设备是（  ）。",
		answers: [
			"打印机"
		],
		isFAQ: false
	},
	{
		question: "Alpha通道最主要的用途是（  ）。",
		answers: [
			"用来存储和建立选择范围"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中的图像最大能放大（  ）倍。",
		answers: [
			"16"
		],
		isFAQ: false
	},
	{
		question: "如果扫描的图像不够清晰，可用于弥补的滤镜是（  ）。",
		answers: [
			"锐化"
		],
		isFAQ: false
	},
	{
		question: "Gamuts值是指在某一色彩系统中所能显示或打印的色彩色域（  ）。",
		answers: [
			"宽度"
		],
		isFAQ: false
	},
	{
		question: "可以使图像产生立体光照效果的滤镜是（  ）。",
		answers: [
			"等高线"
		],
		isFAQ: false
	},
	{
		question: "图像的分辨率为300，则每平方英寸上分布的像素总数为（  ）。",
		answers: [
			"9000"
		],
		isFAQ: false
	},
	{
		question: "按什么字母键可以使图像进入快速蒙版状态（  ）。",
		answers: [
			"Q"
		],
		isFAQ: false
	},
	{
		question: "下列哪项选项是动作调板与历史记录调板都具有的特点。（  ）",
		answers: [
			"虽然记录的方式不同，但都可以记录对图像所做的操作"
		],
		isFAQ: false
	},
	{
		question: "Photoshop生成的文件默认的文件格式扩展名为（  ）。",
		answers: [
			"PSD"
		],
		isFAQ: false
	},
	{
		question: "为了确定磁性套索工具对图像边缘的敏感程度，应调整的数值是（  ）。",
		answers: [
			"边对比度"
		],
		isFAQ: false
	},
	{
		question: "按住（  ）键可以保证椭圆选框工具给出的是正圆形。",
		answers: [
			"Shift"
		],
		isFAQ: false
	},
	{
		question: "不支持无损失压缩的是（  ）。",
		answers: [
			"JPEG"
		],
		isFAQ: false
	},
	{
		question: "色彩中最为被动的颜色是（  ），属中性色，有很强的调和对比作用。",
		answers: [
			"灰色"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中要重复使用上一次用过的滤镜要按（  ）。",
		answers: [
			"Ctrl+F"
		],
		isFAQ: false
	},
	{
		question: "在可见光谱中光波最长的是（  ）。",
		answers: [
			"红色"
		],
		isFAQ: false
	},
	{
		question: "当你使用魔棒工具在图像上单击，只有一个像素被选中，容差的值最可能是（  ）。",
		answers: [
			"0"
		],
		isFAQ: false
	},
	{
		question: "若要进入快速蒙版状态，应该（  ）。",
		answers: [
			"单击工具箱中的快速蒙版图标"
		],
		isFAQ: false
	},
	{
		question: "Alpha通道相当于几位的灰度图。（  ）",
		answers: [
			"8位"
		],
		isFAQ: false
	},
	{
		question: "在一个图像中颜色的数量，每个像素可能是256种颜色中的任意一个，一个24位的图像包含的颜色是（  ）。",
		answers: [
			"1677万种"
		],
		isFAQ: false
	},
	{
		question: "临时切换到抓手工具的快捷键是（  ）。",
		answers: [
			"空格"
		],
		isFAQ: false
	},
	{
		question: "在一个图像中颜色的数量，每个像素可能是256种颜色中的任意一个，一个8位的图像包含的颜色是（  ）。",
		answers: [
			"256种"
		],
		isFAQ: false
	},
	{
		question: "包装产品受内外因素而产生破损的特性，称为产品的易损性，定量描述这种特性的量值，称为易损度或（   ）。",
		answers: [
			"脆值"
		],
		isFAQ: false
	},
	{
		question: "Photoshop最多可以设置的暂存盘的数目是（  ）。",
		answers: [
			"4个"
		],
		isFAQ: false
	},
	{
		question: "将织物作为印刷版，油墨从织物的网孔渗过，在承印物表面复制成图文的印刷方法称为（  ）。",
		answers: [
			"丝网印刷"
		],
		isFAQ: false
	},
	{
		question: "如果要增加一副红色图像，应该（  ）。",
		answers: [
			"亮化A通道"
		],
		isFAQ: false
	},
	{
		question: "你的图像必须是（  ）模式，才可以转换为位图模式。",
		answers: [
			"灰度"
		],
		isFAQ: false
	},
	{
		question: "当单击路径调板下方的“用前景色填充路径”图标时，若想弹出填充路径的设置对话框，应同时按住下列的（  ）键。",
		answers: [
			"Alt"
		],
		isFAQ: false
	},
	{
		question: "平面设计构图基本形式中，凸显科技感与时尚感的是（  ）。",
		answers: [
			"几何型"
		],
		isFAQ: false
	},
	{
		question: "Photoshop支持的最大文件大小为（  ）。",
		answers: [
			"4GB"
		],
		isFAQ: false
	},
	{
		question: "Adobe Photoshop7.0提供了（  ）创建蒙版的方法。",
		answers: [
			"二种"
		],
		isFAQ: false
	},
	{
		question: "当将RGB模式的图像转为多通道模式，产生的通道名称是（  ）。",
		answers: [
			"青色、洋红、黄色"
		],
		isFAQ: false
	},
	{
		question: "如要RGB模式转为双色调模式，则需用（  ）模式作为中间过渡模式。",
		answers: [
			"灰度"
		],
		isFAQ: false
	},
	{
		question: "将三个图层按左对齐，应先将这三个图层（  ）。",
		answers: [
			"链接"
		],
		isFAQ: false
	},
	{
		question: "以下（  ）是在Photoshop5.0环境下可以操作的文件存储格式。",
		answers: [
			"以上都可以"
		],
		isFAQ: false
	},
	{
		question: "显示比例为100%的是（  ）。",
		answers: [
			"实际像素"
		],
		isFAQ: false
	},
	{
		question: "变换选区命令不可以对选择范围进行哪个编辑。（  ）",
		answers: [
			"不规则变形"
		],
		isFAQ: false
	},
	{
		question: "纸张的厚薄程度用（  ）来表示。",
		answers: [
			"克/米2"
		],
		isFAQ: false
	},
	{
		question: "按住Alt键点击任一历史状态可以复制她，被复制的状态变为当前状态。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "找开透境的卷帘窗的快捷键CTRL+F3。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图在图像缩放和放大时画质不受影响。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对一段文字图层进行风格化风滤镜的处理时，没有出现文字的像素被拉扯变长的情况，文字反而出现了像素缺失，这是文字的大小太小。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "形状工具的可选属性是形状。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图有高品质的打印效果。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "光的三原色为红黄蓝。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop的源文件格式为png。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "要为当前历史状态或快照建立一个复制文档可以点击从当前状态创建新文档按钮。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "滤镜功能渲染菜单里面的滤镜。只有树和火焰滤镜无法使用的原因是更改了默认图层样式的设置。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "为查看当前图层的效果，需要关闭其他所有图层的显示，最简便的方法是压住Alt键的同时，在图层面板中单击当前图层左边的眼睛图标。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图在图像缩放时画质容易受损。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "光的三原色为青品黄。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在默认的情况下，对于一组图层，如果上方图层的混合模式为滤色，底部图层混合模式为强光，通过合并上下图层得到新图层混合模式为绿色。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "形状工具的可选属性是路径。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快速蒙版的作用是使得图层某些区域不显示。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "屏幕显示一般使用RGB的图像模式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "使用螺纹工具绘制螺纹形式时，每圈螺纹间距固定不变的是对数式。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "SHB中H是色相。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "当我们新建页面时，我们不能通过属性栏设定的是：分辨率。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "一张图像中所包含的像素越多，图像的效果越差。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "设计师常用文件中，支持透明的格式是PSD。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "形状工具的可选属性是锚点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在视频时间轴中，使一个图层完整的旋转一周至少需要标定3个关键帧。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "当Photoshop警告内存不够时，可以清除历史记录。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "滤镜功能渲染菜单里面的滤镜。只有树和火焰滤镜无法使用的原因是使用了拷贝图层样式的操作。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "钢笔工具可以抠图及绘图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "和套索工具类型不同的工具是魔棒。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "像素是组成图像最基本的单位。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "当Photoshop警告内存不够时，可以删除动作。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PS打开图像并放大后图像出现马赛克，这些马赛克是像素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "滤镜功能渲染菜单里面的滤镜。只有树和火焰滤镜无法使用的原因是没有选中一个路径。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "属性栏的部分图标按钮转换为文字选项的方式是在首选项取消勾选“启用窄选项栏”。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对一段文字图层进行风格化风滤镜的处理时，没有出现文字的像素被拉扯变长的情况，文字反而出现了像素缺失，这是没有将文字图层转换为智能滤镜理。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "光的三原色为青绿蓝。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "调整画笔的大小抖动功能可以将默认笔刷设置为圆点虚线。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "把历史状态中当前图片的某一历史状态拖到另一个图片的窗口会用当前历史状态的内容覆盖目的图片窗口的内容。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快速蒙版的作用是创建选区。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "和套索工具类型不同的工具是快速选择。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图适合与字体设计和商标标志的设计。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "组成图像的基本单元是颜色。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "当Photoshop警告内存不够时，可以清除滤镜。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "和套索工具类型不同的工具是钢笔。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "作图中，想操作剪贴蒙版，但画面未显示剪贴后效果，原因可能是当前图层已执行图案叠加。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "G0是绿色。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "一张长为8英寸，宽为12英寸分辨率为300的照片，其像素数量为28800。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "光的三原色为红绿蓝。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "羽化选区的快捷键是shift+F5。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "按住Alt键的同时，使用路径选择工具将形状选择后，拖拽该形状会把形状复制。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "如果要创建用于因特网的图像应选用的标尺单位是：像素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图有低品质的打印效果。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中前景色跟背景色相互转换的快捷键是X键。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "显示或隐藏图层控制面板的快捷键是F4。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop新建文档常用颜色位深为8位。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "R225是红色。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "色彩范围可以配合容差进行头发丝抠图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对一段文字图层进行风格化风滤镜的处理时，没有出现文字的像素被拉扯变长的情况，文字反而出现了像素缺失，这是没有将文字图层进行删格化的处理。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "图层蒙版可以通过图层面板中的垃圾桶图标进行删除。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "一张图像中所包含的像素越多，图像的效果越好。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "形状工具的可选属性是形状、路径、像素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "新建画布的快捷键是Ctrl+N。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "B0是红色。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "套索工具是辅助类工具，常用于配合或者PNG等素材处理。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在默认的情况下，对于一组图层，如果上方图层的混合模式为滤色，底部图层混合模式为强光，通过合并上下图层得到新图层混合模式为正常。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop主要处理的图片类型是位图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快速蒙版的作用是擦除图层和暂时隐藏图层。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "滤镜功能渲染菜单里面的滤镜。只有树和火焰滤镜无法使用的原因是删除了某些图层样式的预设。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "对一段文字图层进行风格化风滤镜的处理时，没有出现文字的像素被拉扯变长的情况，文字反而出现了像素缺失，这是文字颜色的明度太低。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "调整画笔的间距功能可以将默认笔刷设置为圆点虚线。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "和套索工具类型不同的工具是快速蒙版。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "包装设计的原则 是什么？",
		answers: [
			"（1）实用经济。 （2）商品信息精准传达。 （3）人性化与便利。 （4）表现文化和艺术性。"
		],
		isFAQ: true
	},
	{
		question: "H5的类型是什么？",
		answers: [
			"（1）营销宣传。 （2）知识新闻。 （3）游戏互动。 （4）网站应用。"
		],
		isFAQ: true
	},
	{
		question: "简述插画的概念",
		answers: [
			"插画以宣传主题内容为目的，通过对主题内容进行视觉化的表现，营造出主题突出，感染力、生动性强的视觉效果。在海报、广告、杂志、说明书、图书、包装等设计中，凡是用于宣传主题内容的图画都可以称为插画。"
		],
		isFAQ: true
	},
	{
		question: "简述图像的显示效果。",
		answers: [
			"（1）100%显示图像。 （2）放大和缩小图像。 （3）全屏显示图像。 （4）图像窗口的排列。"
		],
		isFAQ: true
	},
	{
		question: "“风格化”滤镜是什么？",
		answers: [
			"“风格化”滤镜可以产生各种风格的效果，帮助用户模拟真实艺术手法进行创作。"
		],
		isFAQ: true
	},
	{
		question: "App的分类是什么？",
		answers: [
			"常用App的类别包括社区交友、影音娱乐、休闲娱乐、生活服务、旅游出行、电商平台、金融理财、健康医疗、学习教育、资讯阅读等。"
		],
		isFAQ: true
	},
	{
		question: "简述网页的设计流程。",
		answers: [
			"（1）网站策划。 （2）交互设计。 （3）交互自查。 （4）页面设计。 （5）页面测试。 （6）设计验证。"
		],
		isFAQ: true
	},
	{
		question: "路径与选区的转换 的基本步骤是什么？",
		answers: [
			"（1）将选区转换为路径。图像上绘制选区，单击“路径”控制面板右上方的图标，在弹出的菜单中选择“建立工作路径”命令。 （2）将路径转换为选区。在图像中创建路径。单击“路径”控制面板右上方的图标，在弹出的菜单中选择“建立选区”命令，弹出“建立选区”对话框。设置完成后，单击“确定”按钮，将路径转换为选区。"
		],
		isFAQ: true
	},
	{
		question: "简单说明图像制作的基本流程 。",
		answers: [
			"①需求分析。 ②视觉设计。 ③素材搜集。 ④审核修改。 ⑤草稿设计。 ⑥完稿验收。"
		],
		isFAQ: true
	},
	{
		question: "App的设计流程 是什么？",
		answers: [
			"（1）分析调研。 （2）交互设计。 （3）交互自查。 （4）界面设计。 （5）界面测试。 （6）设计验证。"
		],
		isFAQ: true
	},
	{
		question: "插画的分类",
		answers: [
			"插画种类繁多，可以分为出版物插画、商业宣传插画、卡通吉祥物插画、影视与游戏美术设计插画、艺术创作类插画。"
		],
		isFAQ: true
	},
	{
		question: "简述Banner的版式构图。",
		answers: [
			"Banner 的版式构图比较丰富，常用的有左右构图、上下构图、左中右构图、上中下构图、对角线构图、十字形构图和包围形构图。"
		],
		isFAQ: true
	},
	{
		question: "简述绘制和编辑选区。",
		answers: [
			"（1）矩形选框工具。 （2）椭圆选框工具。 （3）套索工具。 （4）魔棒工具。 （5）羽化选区。 （6）取消选区。 （7）快速选择工具。"
		],
		isFAQ: true
	},
	{
		question: "简单说明图形图像的设计工具。",
		answers: [
			"（1）Photoshop。 （2）Illustrator。 （3）InDesign。 （4）CorelDRAW。"
		],
		isFAQ: true
	},
	{
		question: "海报的分类 是什么？",
		answers: [
			"海报按其用途可以分为商业海报、文化海报和公益海报等。\n填空题"
		],
		isFAQ: true
	},
	{
		question: "我们能看到物体是因为物体有形与（  ）的原因。",
		answers: [
			"色"
		],
		isFAQ: true
	},
	{
		question: "在一副画里面，成为视觉对象的叫（  ）。",
		answers: [
			"图"
		],
		isFAQ: true
	},
	{
		question: "如要对当前图层进行锁定透明像素用前景色填充，则按（  ）。",
		answers: [
			"Alt+Shift+Del"
		],
		isFAQ: true
	},
	{
		question: "剪贴路径对话框中的（  ）是用来定义曲线由多少个直线片段组成。",
		answers: [
			"展平度"
		],
		isFAQ: true
	},
	{
		question: "能够断开路径并将对象转换为曲线的工具是：（  ）工具。",
		answers: [
			"擦除器"
		],
		isFAQ: true
	},
	{
		question: "印刷设计的形式大致有：（  ）设计、书籍杂志的装帧设计、包装设计、标贴文字设计、插图、说明书设计等。",
		answers: [
			"海报"
		],
		isFAQ: true
	},
	{
		question: "远看一态，近看百态的平面构成方式为近似构成。",
		answers: [
			"近似构成"
		],
		isFAQ: true
	},
	{
		question: "在Photoshop里，（  ）可以削减图像的饱和度。",
		answers: [
			"海绵工具"
		],
		isFAQ: true
	},
	{
		question: "可以编辑路径的工具有钢笔、（  ）和转换点工具。",
		answers: [
			"直接选择工具"
		],
		isFAQ: true
	},
	{
		question: "当Photoshop警告内存不够时，可以（  ）。",
		answers: [
			"清除历史记录"
		],
		isFAQ: true
	},
	{
		question: "打印机有（  ）打印机、点阵打印机、喷墨打印机三种类型。",
		answers: [
			"激光"
		],
		isFAQ: true
	},
	{
		question: "纹理滤镜包括（  ）和纹理化。",
		answers: [
			"颗粒"
		],
		isFAQ: true
	},
	{
		question: "（  ）有男性的象征，具有坚决，理性的性格。",
		answers: [
			"直线"
		],
		isFAQ: true
	},
	{
		question: "平面广告设计其构成要素可分为语言文字和（  ）两部分。",
		answers: [
			"非语言文字"
		],
		isFAQ: true
	},
	{
		question: "打印机有激光打印机、（  ）打印机、喷墨打印机三种类型。",
		answers: [
			"点阵"
		],
		isFAQ: true
	},
	{
		question: "在Photoshop里，（  ）在新建文件命令对话框中不行设定。",
		answers: [
			"文件格式"
		],
		isFAQ: true
	},
	{
		question: "在平面构成中，有构成要素和（  ）两个方面。",
		answers: [
			"形态要素"
		],
		isFAQ: true
	},
	{
		question: "通道实际上是一种选择区域的（  ）。",
		answers: [
			"映射"
		],
		isFAQ: true
	},
	{
		question: "最基本的形态要素是点、线、（  ）。",
		answers: [
			"面"
		],
		isFAQ: true
	},
	{
		question: "打印机有激光打印机、点阵打印机、（  ）打印机三种类型。",
		answers: [
			"喷墨"
		],
		isFAQ: true
	},
	{
		question: "一副商品广告中的商标放在较宽阔的空间中，在视觉上会起到（  ）的作用。",
		answers: [
			"点"
		],
		isFAQ: true
	},
	{
		question: "当你的图像是（  ）模式时，所有的滤镜都不可使用。",
		answers: [
			"索引颜色"
		],
		isFAQ: true
	},
	{
		question: "文件的大小和图像（  ）的平方成正比。",
		answers: [
			"分辨率"
		],
		isFAQ: true
	},
	{
		question: "在曲线对话框中，X轴和Y轴分别代表的是（  ）和输出值。",
		answers: [
			"输入值"
		],
		isFAQ: true
	},
	{
		question: "色阶是表示图像亮度强弱的指数标准，也就是我们说的（  ）。",
		answers: [
			"色彩指数"
		],
		isFAQ: true
	},
	{
		question: "想增加图层，但在图层调班的最下面创建新图层的按钮是灰色不可选，原因是（  ）。",
		answers: [
			"图像是索引颜色模式"
		],
		isFAQ: true
	},
	{
		question: "平面构成中，基本形或骨骼渐变构成至少要有（  ）以上的变化才有渐变感。",
		answers: [
			"三个"
		],
		isFAQ: true
	},
	{
		question: "（  ）表现出力的美感，但易给人以冷淡，硬的感觉。",
		answers: [
			"直线"
		],
		isFAQ: true
	},
	{
		question: "交互式变形工具包含（  ）种变形方式。",
		answers: [
			"3"
		],
		isFAQ: true
	},
	{
		question: "精确的设定（  ）的方法是：在格式的文本的间距输入数值设定。",
		answers: [
			"字符间距"
		],
		isFAQ: true
	},
	{
		question: "传统纸墨印刷分为激光印刷、凹版印刷、（  ）印刷三种类型。",
		answers: [
			"凸版"
		],
		isFAQ: true
	},
	{
		question: "最基本的形态要素是（  ）、线、面。",
		answers: [
			"点"
		],
		isFAQ: true
	},
	{
		question: "平面设计通常是指通过印刷过程、以印刷加工为载体而进行的设计，因此又称（  ）。",
		answers: [
			"印刷设计"
		],
		isFAQ: true
	},
	{
		question: "任何形都是由图与（  ）两部分组成。",
		answers: [
			"地"
		],
		isFAQ: true
	},
	{
		question: "在一副画里面，成为视觉对象的叫图，其周围的空虚处叫（  ）。",
		answers: [
			"地"
		],
		isFAQ: true
	},
	{
		question: "传统纸墨印刷分为（  ）印刷、凹版印刷、凸版印刷三种类型。",
		answers: [
			"平版"
		],
		isFAQ: true
	},
	{
		question: "平面广告设计其构成要素可分为（  ）和非语言文字两部分。",
		answers: [
			"语言文字"
		],
		isFAQ: true
	},
	{
		question: "印刷设计的形式大致有：海报设计、（  ）的装帧设计、包装设计、标贴文字设计、插图、说明书设计等。",
		answers: [
			"书籍杂志"
		],
		isFAQ: true
	},
	{
		question: "快照和（  ）不会随着文件而存储。",
		answers: [
			"历史记录"
		],
		isFAQ: true
	},
	{
		question: "在Photoshop中，要在图像上实施光照成效，该层图片是（  ）颜色模式。",
		answers: [
			"RG"
		],
		isFAQ: true
	},
	{
		question: "可以编辑路径的工具有（  ）、直接选择工具和转换点工具。",
		answers: [
			"钢笔"
		],
		isFAQ: true
	},
	{
		question: "最基本的形态要素是点、（  ）、面。",
		answers: [
			"线"
		],
		isFAQ: true
	},
	{
		question: "印刷设计的形式大致有：海报设计、书籍杂志的装帧设计、包装设计、标贴文字设计、（  ）、说明书设计等。",
		answers: [
			"插图"
		],
		isFAQ: true
	},
	{
		question: "印刷设计的形式大致有：海报设计、书籍杂志的装帧设计、包装设计、（  ）设计、插图、说明书设计等。",
		answers: [
			"标贴文字"
		],
		isFAQ: true
	},
	{
		question: "分辨率是影像解析度的一种描述方式，是指每英寸所包含的（  ）。",
		answers: [
			"像素"
		],
		isFAQ: true
	},
	{
		question: "印刷设计的形式大致有：海报设计、书籍杂志的装帧设计、包（  ）设计、标贴文字设计、插图、说明书设计等。",
		answers: [
			"包装"
		],
		isFAQ: true
	},
	{
		question: "传统纸墨印刷分为激光印刷、（  ）印刷、凸版印刷三种类型。",
		answers: [
			"凹版"
		],
		isFAQ: true
	},
	{
		question: "（  ）是冷极最冷色。",
		answers: [
			"蓝色"
		],
		isFAQ: true
	},
	{
		question: "可以精确控制图像模糊度的滤镜是动感模糊和（  ）。",
		answers: [
			"高斯模糊"
		],
		isFAQ: true
	},
	{
		question: "互补色光依照肯定的比例混合，可以得到（  ）。",
		answers: [
			"白光"
		],
		isFAQ: true
	},
	{
		question: "可以编辑路径的工具有钢笔、直接选择工具和（  ）。",
		answers: [
			"转换点工具"
		],
		isFAQ: true
	},
	{
		question: "彩色图像在存储，显示，打印有不同方式；常用的彩色模式有RGB和（  ）两种。",
		answers: [
			"CMYK"
		],
		isFAQ: true
	},
	{
		question: "纹理滤镜包括颗粒和（  ）。",
		answers: [
			"纹理化"
		],
		isFAQ: true
	},
	{
		question: "可以精确控制图像模糊度的滤镜是（  ）和高斯模糊。",
		answers: [
			"动感模糊"
		],
		isFAQ: true
	},
	{
		question: "载入上次的选区应按（  ）。",
		answers: [
			"Ctrl+Shift+D"
		],
		isFAQ: true
	},
	{
		question: "色阶是表示图像（  ）的指数标准。",
		answers: [
			"亮度强弱"
		],
		isFAQ: true
	},
	{
		question: "我们能看到物体是因为物体有色与（  ）的原因。",
		answers: [
			"形"
		],
		isFAQ: true
	},
	{
		question: "Photoshop中的图像能被打印出来的是（  ）。",
		answers: [
			"像素"
		],
		isFAQ: true
	},
	{
		question: "（  ）和历史记录不会随着文件而存储。",
		answers: [
			"快照"
		],
		isFAQ: true
	},
	{
		question: "平面设计的基本要素与各种表现技法，具体到作品上表现为图形与（  ）的设计。",
		answers: [
			"文字"
		],
		isFAQ: true
	},
	{
		question: "平面设计的基本要素与各种表现技法，具体到作品上表现为文字与（  ）的设计。",
		answers: [
			"图形"
		],
		isFAQ: true
	},
	{
		question: "（  ）是影像解析度的一种描述方式。",
		answers: [
			"分辨率"
		],
		isFAQ: true
	},
	{
		question: "红光，绿光，蓝光混合是（  ）。",
		answers: [
			"加色混合"
		],
		isFAQ: true
	},
	{
		question: "在曲线对话框中，X轴和Y轴分别代表的是输入值和（  ）。",
		answers: [
			"输出值"
		],
		isFAQ: true
	},
	{
		question: "彩色图像在存储，显示，打印有不同方式；常用的彩色模式有（  ）和CMYK两种。",
		answers: [
			"RGB"
		],
		isFAQ: true
	},
	{
		question: "在平面构成中，有形态要素和（  ）两个方面。",
		answers: [
			"构成要素"
		],
		isFAQ: true
	},
	{
		question: "印刷设计的形式大致有：海报设计、书籍杂志的装帧设计、包装设计、标贴文字设计、插图、（  ）设计等。",
		answers: [
			"说明书"
		],
		isFAQ: true
	},
	{
		question: "合并不相邻的图层可以使用（  ）。",
		answers: [
			"合并链接图层"
		],
		isFAQ: true
	},
	{
		question: "（  ）是暖极最暖色。",
		answers: [
			"橙色"
		],
		isFAQ: true
	},
	{
		question: "减色法混合的三原色是青蓝、洋红、（  ）。",
		answers: [
			"黄"
		],
		isFAQ: true
	},
	{
		question: "有无法真正改进供应链关系的劣势电子采购系统是（   ）。",
		answers: [
			"行业平台"
		],
		isFAQ: false
	},
	{
		question: "电子采购系统的英文缩写是（   ）。",
		answers: [
			"EPS"
		],
		isFAQ: false
	},
	{
		question: "一般由比较大的买方企业开发和运作的电子采购系统是（   ）。",
		answers: [
			"采购方系统"
		],
		isFAQ: false
	},
	{
		question: "属于电子商务一般业务服务层伦理问题的是（   ）。",
		answers: [
			"商业信用问题"
		],
		isFAQ: false
	},
	{
		question: "通过不正当竞争手段取得他人商业秘密，或者无故披露他人商业秘密，或者没有获得授权而使用他人商业秘密都是侵犯商业秘密的行为属于（   ）。",
		answers: [
			"侵犯商业秘密行为"
		],
		isFAQ: false
	},
	{
		question: "属于软件著作财产的是（   ）。",
		answers: [
			"出租权"
		],
		isFAQ: false
	},
	{
		question: "信息、产品和人员的互动模式由需求决定，各个网络单元具有相当的管理决策权，都可以以实体或虚拟的形式进行资源互补和组织优化，提高资源利用率，属于企业重组结构的（   ）。",
		answers: [
			"网络化"
		],
		isFAQ: false
	},
	{
		question: "SPACE矩阵的第一象限表示企业采取的战略模式是（   ）。",
		answers: [
			"进攻"
		],
		isFAQ: false
	},
	{
		question: "下列属于SPACE矩阵中外部因素的是（   ）。",
		answers: [
			"产业态势"
		],
		isFAQ: false
	},
	{
		question: "下列可以成为电子商务专利客体的是（   ）。",
		answers: [
			"商业方法系统"
		],
		isFAQ: false
	},
	{
		question: "下列关于电子采购和传统采购的说法中，正确的是（   ）。",
		answers: [
			"电子采购比传统采购的效率更高"
		],
		isFAQ: false
	},
	{
		question: "“相对市场份额较低，产业销售增长率较高的业务单元”属于波士顿矩阵中的（   ）。",
		answers: [
			"问题业务"
		],
		isFAQ: false
	},
	{
		question: "同一域名的标识部分有数个商标权人，这属于域名争议的（   ）。",
		answers: [
			"权利冲突"
		],
		isFAQ: false
	},
	{
		question: "将供应商、制造商、分销商、零售商、最终用户连成一个整体的网链结构是（   ）。",
		answers: [
			"供应链"
		],
		isFAQ: false
	},
	{
		question: "SPACE矩阵的第二象限表示企业采取的战略模式是（   ）。",
		answers: [
			"保守"
		],
		isFAQ: false
	},
	{
		question: "属于自营物流模式优点的是（   ）。",
		answers: [
			"充分利用自身的资源"
		],
		isFAQ: false
	},
	{
		question: "擅自把知名品牌的装潢、标志、外观、文字、图案，用在自己的产品上，扩大自己网站的知名度和点击率，这种不正当竞争行为属于（   ）。",
		answers: [
			"擅自使用他人商标标识行为"
		],
		isFAQ: false
	},
	{
		question: "物流企业UPS公司属于（   ）。",
		answers: [
			"第三方物流"
		],
		isFAQ: false
	},
	{
		question: "生产及流通过程中，涉及将产品或服务提供给最终用户所形成的网链结构称为（   ）。",
		answers: [
			"供应链"
		],
		isFAQ: false
	},
	{
		question: "下列属于传统企业组织结构典型特征的是（   ）。",
		answers: [
			"职能型"
		],
		isFAQ: false
	},
	{
		question: "企业开展电子商务的同时开展物流业务的物流模式的是（   ）。",
		answers: [
			"企业自营物流"
		],
		isFAQ: false
	},
	{
		question: "下列属于企业软件资源的是（   ）。",
		answers: [
			"企业品牌"
		],
		isFAQ: false
	},
	{
		question: "下列不属于互联网思维特点的是（   ）。",
		answers: [
			"边际收益递减"
		],
		isFAQ: false
	},
	{
		question: "下列属于企业硬件资源的是（   ）。",
		answers: [
			"运输工具"
		],
		isFAQ: false
	},
	{
		question: "下列属于电子商务服务生态系统扩展层的是（   ）。",
		answers: [
			"软件服务商"
		],
		isFAQ: false
	},
	{
		question: "属于企业硬件资源的是（   ）。",
		answers: [
			"生产线"
		],
		isFAQ: false
	},
	{
		question: "逐渐成为物流市场的主力军的是（   ）。",
		answers: [
			"第三方物流"
		],
		isFAQ: false
	},
	{
		question: "企业流程重组的改造对象和中心是（   ）。",
		answers: [
			"业务流程"
		],
		isFAQ: false
	},
	{
		question: "对企业的业务流程进行根本性再思考和再设计指的是（   ）。",
		answers: [
			"业务流程重组"
		],
		isFAQ: false
	},
	{
		question: "组织鼓励员工根据市场的需求主动进行创造性工作，以最大限度发挥员工灵活应变能力，属于企业重组结构的（   ）。",
		answers: [
			"柔性化"
		],
		isFAQ: false
	},
	{
		question: "互联网思维最重要的特点是（   ）。",
		answers: [
			"以消费者为中心"
		],
		isFAQ: false
	},
	{
		question: "下列不属于企业硬件资源的是（   ）。",
		answers: [
			"品牌"
		],
		isFAQ: false
	},
	{
		question: "经济、技术、政策、法律、社会等宏观环境属于电子商务服务业生态系统的（   ）。",
		answers: [
			"社会层"
		],
		isFAQ: false
	},
	{
		question: "下列不属于电子商务背景下供应链企业发展机遇的是（   ）。",
		answers: [
			"规模化效应增强"
		],
		isFAQ: false
	},
	{
		question: "支付宝所属的互联网金融模式是（   ）。",
		answers: [
			"第三方支付"
		],
		isFAQ: false
	},
	{
		question: "下列属于电子商务物流特点的是（   ）。",
		answers: [
			"配送分散性"
		],
		isFAQ: false
	},
	{
		question: "电子采购系统中，对采购方系统理解正确的是（   ）。",
		answers: [
			"一般由买方企业开发，以提高交易效率和加强过程控制"
		],
		isFAQ: false
	},
	{
		question: "互联网金融的行业本质是（   ）。",
		answers: [
			"金融"
		],
		isFAQ: false
	},
	{
		question: "企业业务流程重组的目标是（   ）。",
		answers: [
			"关系客户的需求和满意度"
		],
		isFAQ: false
	},
	{
		question: "互联网金融模式出现于20世纪（   ）。",
		answers: [
			"90年代"
		],
		isFAQ: false
	},
	{
		question: "将他人知名域名抢注为商标的行为是（   ）。",
		answers: [
			"反向域名侵夺"
		],
		isFAQ: false
	},
	{
		question: "利用网络新闻、网络弹出式新闻、电视剧插播、电子邮件、社交网站等强制方式发布虚假广告，这种不正当竞争行为属于（   ）。",
		answers: [
			"虚假宣传"
		],
		isFAQ: false
	},
	{
		question: "多个或两个企业之间为了实现企业自身物流战略目标，通过协议、合同方式结成的风险共担、优势互补、利益共享的网络组织的是（   ）。",
		answers: [
			"物流联盟"
		],
		isFAQ: false
	},
	{
		question: "亚马逊通过租赁平台和提供物流配送获得销售额与利润的双重增长，使用的增值策略是（   ）。",
		answers: [
			"为第三方零售商提供平台和物流服务"
		],
		isFAQ: false
	},
	{
		question: "在SWOT矩阵分析中，“旨在弥补内部劣势并规避外部威胁”属于（   ）。",
		answers: [
			"WT战略"
		],
		isFAQ: false
	},
	{
		question: "自我管理和授权的公司需要所有员工的共同努力，团队工作的概念代表了工作方式的最基本变化，体现出企业组织结构重组的（   ）。",
		answers: [
			"团队化"
		],
		isFAQ: false
	},
	{
		question: "下列不属于网络著作权客体的是（   ）。",
		answers: [
			"网络小说"
		],
		isFAQ: false
	},
	{
		question: "淘宝网通过将各类小商家整合进淘宝和国内外专业品牌整合进天猫商城，形成C2C和B2C商业模式共同运行的局面，使用的增值策略是（   ）。",
		answers: [
			"整合现金流、订单生成和卖家"
		],
		isFAQ: false
	},
	{
		question: "在全球电子商务发展的初期，占主要地位的物流模式是（   ）。",
		answers: [
			"第三方物流"
		],
		isFAQ: false
	},
	{
		question: "“相对市场份额较高，但处于低速增长的产业”属于波士顿矩阵中的（   ）。",
		answers: [
			"金牛业务"
		],
		isFAQ: false
	},
	{
		question: "具有行业特征各不相同，市场流动性不足劣势的电子采购系统是（   ）。",
		answers: [
			"中介系统"
		],
		isFAQ: false
	},
	{
		question: "企业管理层次减少、管理幅度增加的组织结构变化称为（   ）。",
		answers: [
			"扁平化"
		],
		isFAQ: false
	},
	{
		question: "供应链集成者通过对供应链上各级物流服务提供商所拥有的不同的技术、资源和优势，合理地进行重组、优化和整合，为客户制定最佳物流解决方案，这种物流模式是（   ）。",
		answers: [
			"第四方物流"
		],
		isFAQ: false
	},
	{
		question: "针对于波士顿矩阵中的“相对市场份额较低，且处于低速增长的产业”是哪类业务（   ）？",
		answers: [
			"瘦狗业务"
		],
		isFAQ: false
	},
	{
		question: "电子商务服务业生态系统中包括电子商务服务平台、买家（采购商）和卖家（供应商）的是（   ）。",
		answers: [
			"核心层"
		],
		isFAQ: false
	},
	{
		question: "业务流程重组的英文缩写是（   ）。",
		answers: [
			"BPR"
		],
		isFAQ: false
	},
	{
		question: "采用与各大银行签约的方式，提供与银行支付结算系统接口的交易支持平台的网络支付模式是指（   ）。",
		answers: [
			"第三方支付模式"
		],
		isFAQ: false
	},
	{
		question: "下列不属于电子商务供应链管理特点的是（   ）。",
		answers: [
			"供应链管理机构社会化"
		],
		isFAQ: false
	},
	{
		question: "下列受到网络著作权保护的电子商务产品是（   ）。",
		answers: [
			"计算机软件"
		],
		isFAQ: false
	},
	{
		question: "项目的发起者通过互联网融资平台宣传、介绍自己的项目，合格的投资者对感兴趣的项目进行少量投资，使发起者筹集项目运行资金，并由发起者给投资者一定报酬的融资模式是指（   ）。",
		answers: [
			"众筹融资模式"
		],
		isFAQ: false
	},
	{
		question: "下列不属于电子商务信用关系的是（   ）。",
		answers: [
			"第二方信用关系"
		],
		isFAQ: false
	},
	{
		question: "属于软件著作人身权的是（   ）。",
		answers: [
			"修改权"
		],
		isFAQ: false
	},
	{
		question: "具有“买方可能会因竞争过于激烈而不愿参加”劣势的电子采购系统是（   ）。",
		answers: [
			"销售方系统"
		],
		isFAQ: false
	},
	{
		question: "捏造损害竞争对手商誉的虚假信息并利用微博传播，这种不正当竞争行为属于（   ）。",
		answers: [
			"商业诋毁"
		],
		isFAQ: false
	},
	{
		question: "属于电子商务专利中商业方法系统的是（   ）。",
		answers: [
			"网络销售"
		],
		isFAQ: false
	},
	{
		question: "利用计算机网络技术全面规划供应链中的商流、物流、信息流、资金流等并进行计划、组织、协调与控制的是（   ）。",
		answers: [
			"供应链管理"
		],
		isFAQ: false
	},
	{
		question: "电子商务服务业生态系统中包括电子商务交易相关的金融支付机构、物流公司、保险公司、软件服务商、广告服务商的是（   ）。",
		answers: [
			"扩展层"
		],
		isFAQ: false
	},
	{
		question: "主要与电子商务活动相关政府主管部门、行业协会组织、教育和科研机构等，是属于电子商务服务业生态系统的（   ）。",
		answers: [
			"相关层"
		],
		isFAQ: false
	},
	{
		question: "将驰名商标或他人具有一定知名度的注册商标或商标的重要组成部分注册为域名，希望以高价出售、出租或以其他方式转让该域名以获取利益的行为是（   ）。",
		answers: [
			"恶意抢注和盗用"
		],
		isFAQ: false
	},
	{
		question: "针对于波士顿矩阵中的“相对市场份额较高，且处于高速增长的产业”是哪类业务（   ）？",
		answers: [
			"明星业务"
		],
		isFAQ: false
	},
	{
		question: "所有支付宝用户都可享受推荐物流提供的优惠价格。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "信用卡于1915年起源于中国，由商业银行发行。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "病毒必须满足能自行执行和自我复制两个条件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "《电子签名法》规定，可靠的电子签名与手写签名或者盖章具有同等的法律效力。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "我国应坚持长期的资源驱动型增长方式不动摇。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "CPC是指按点击计费，访客每点击网络广告一次，就收一次费用，无论该点击是否产生成交。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "虽然我国作为成文法国家，但在电子商务相关案例的审判中，适当加大司法运用法律的自由度，还是非常必要的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "电子商务物流的特点：物流信息化、物流自动化、物流网络化、物流智能化、物流柔性化。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "病毒营销是指以传播病毒的方式来实现牟利。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "支付宝和微信支付一样都是属于腾讯公司旗下的支付平台。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "通过交易平台网站、黄页网站和搜索引擎等途径，能够完全替代参加商贸展览会、新闻发布会和聘用业务员。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "借记卡不仅可以办理活期存款，还可以直接存入各种存期的定期存款。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对传统实体企业来说，实施电子商务项目的最大利益驱动是绕过中间环节，通过网络获得直接客户。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "传统实体企业通过网上开店的方式增加销售渠道，从而减少物理店铺的数量，这样就能降低房租和员工的数量，达到降低经营费用的目的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "互联网的力量之强大最根本的来源是对人性的最大限度的尊重、对用户体验的敬畏、对人的创造性发挥的重视。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "《合同法》第十六条规定，采用数据电文形式订立合同，未指定特定系统的，该数据电文进入收件人的任何系统的首次时间，视为到达时间。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "微博营销的显著特点是操作简单、互动性强、成本低以及针对性强。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "电子签名就是书面签名的数字图像化。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "虽然当今的电子支付手段非常先进，但是依旧存在一些局限性，我们依旧离不开现金。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "腾讯公司的Q币是一种典型的虚拟货币，可以购买腾讯公司提供的一些增值服务。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "反病毒技术有两个，预防病毒技术和检测病毒技术。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "EDI是一种将表格型数据转换为地理图形显示，然后对显示结果浏览、操作和分析的技术。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "按照信用卡发卡对象不同，可以分为公司卡和个人卡。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "第三方支付平台可以根据交易的总额来收取一定的费用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "搜索引擎的分类有计算机自动搜索型、计算机分类目录型。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "无线营销也叫微信营销。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "SET协议是由Netscape Communication公司设计开发，又称“安全套接层协议”。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "GPS技术可用于车辆定位与轨迹回放功能。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "八达通是在香港地区非常普及的一种银行卡，为居民的日常生活提供了极大的便利。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "互联网安全从本质上来讲就是互联网上的信息安全。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "电子文件差错容易纠正，且保存时间长，电子流程易于规范，能有效防止越权，消除腐败现象。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "“互联网+”的本质是传统产业的在线化、数据化。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "GIS称为地理信息系统。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "电子商务安全可分两大部分：计算机网络安全和银行交易安全。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "反病毒软件的任务是清除病毒。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "第三方支付平台能够为交易的双方提供保障，使买卖双方都能够安心交易。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "流通加工与生产加工的对象不同，但目的相同。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "传统实体企业通过电子商务，能提高管理效率，减少差错。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "电子商务立法需要从实际出发，分阶段发展，重点突破，不断完善。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "传统的口头合同形式是指当事人采用非直接表达方式来表达协议的内容。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "安全套接层协议是S-HTTP。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "通过电子交易的方式降低交易费用，比如电子合同、电子支付、网上看样等方式，可以节省很多差旅费和邮寄费。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "互联网作为一种通用目的技术，和100年前的电力技术以及200年前的蒸汽机技术一样，将对人类经济社会产生巨大、深远而广泛的影响。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "传统实体企业可能因为互联网的应用，扩大原来产品的应用范围，使得客户群体增大，从而增加额外市场。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "第四方物流帮助企业实现降低成本和有效整合资源，为客户提供独特且广泛的供应链解决文案。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对称加密技术采用RSA算法来实现。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在目前的社会诚信程度下，非常贵重的物品一般来说不适合在纯粹的网店销售。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "第一方物流是指供应方（生产厂家或原材料供应商）专业物流企业，提供运输、仓储等单一或某种物流服务的物流业务。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "电子商务是一项社会系统工程，因此关于电子商务的问题不能以地方立法等局部规章的方式尝试解决，而必须要有统一的规章制度。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "物流的柔性化是指根据消费需求多品种、小批量、多批次、短周期的特色，灵活地组织和实施物流作业。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "电子商务与物流是紧密相连、相互促进、共同发展的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "目前，电子货币应用非常广泛，可直接用于消费。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "病毒式营销不需要成本，所以受到商家的欢迎。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "电子商务安全从整体上可分为计算机网络安全和商务交易安全。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "物流的分类，从物流活动的地域划分，可分为水路、公路、铁路、管道运输物流等。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "计算机网络安全的内容包括：计算机网络设备安全、计算机网络系统安全、数据库安全等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "运输决定着物流的时间和速度。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "适当运用动画图片，可以提高网络广告效果。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "SSL协议可以对商家和客户的身份认证。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "“数据电文”，系指以电子手段、光学手段或类似手段生成、发送、接收或存储的信息。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "窃取信息是指攻击者在掌握信息格式和规律后，采用各种手段对截取的信息进行篡改，破坏商业信息的真实性和完整性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "现有的法律体系不适用于网络世界，因此电子商务中的全部问题都需另外立法。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "物流就是一种买卖交易过程，通过物流活动发生商品所有权的转移。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "凡是能在电子通信中起到证明当事人的身份、证明当事人对文件内容的认可的电子技术手段，都可被称为电子签名。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "1997年10月1日起我国实行的新刑法，第一次增加了计算机犯罪的罪名。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "认证中心CA的主要功能之一是发出产品质量证书。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "预防病毒技术是通过自身常驻系统内存优先获得系统的控制权，监视和判断系统中是否有病毒存在。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "邮局快邮是全球邮政特快专递业务，是当前邮政部门为用户提供的一项传递速度最快的邮递类业务。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "网络银行能够完成所有实体银行的业务，所以实体的银行没有存在的必要。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "数字签名就是数字摘要。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "简述广告联盟营销的主要优势。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述网络调研的主要优势。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "网络品牌营销的策略主要有哪些？",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述电子商务有形产品定制生产的好处。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述电子商务生产模式特征。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "说说社会化媒体营销的优势。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述数字产品的特点。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述完整产品的三个层次。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述电子商务生产方式对企业的影响。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述创客空间的运行模式。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述五力模型的内容与实施步骤。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述ERP对企业的作用。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述创客空间发挥作用的形式。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述传统营销和网络营销有何不同？",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简述电子商务产品创新流程。",
		answers: [
			"填空题"
		],
		isFAQ: true
	},
	{
		question: "电子商务是现代电子技术和____________结合的产物。",
		answers: [
			"商务活动"
		],
		isFAQ: true
	},
	{
		question: "____________是借助互联网络、信息通信技术和数字交互式媒体来实现营销目的的活动。",
		answers: [
			"网络营销"
		],
		isFAQ: true
	},
	{
		question: "Tag(标签)是一种采用关键词的____________。",
		answers: [
			"分类技术"
		],
		isFAQ: true
	},
	{
		question: "超文本是一种含有和其它文本衔接的文本，把各文本以____________的形式连接起来。",
		answers: [
			"非线性"
		],
		isFAQ: true
	},
	{
		question: "跟进战略是一种____________，是以营利为目的，以市场为依托，按市场运行的趋势而自行调整的战略。",
		answers: [
			"市场导向型战略"
		],
		isFAQ: true
	},
	{
		question: "____________是电子商务中心必不可少的一部分，也是电子商务生存和发展的基础。",
		answers: [
			"电子支付技术"
		],
		isFAQ: true
	},
	{
		question: "大规模定制模式的市场法则是“____________”。",
		answers: [
			"围着顾客找产品"
		],
		isFAQ: true
	},
	{
		question: "客户延伸是指增加客户从公司购买产品的范围或种类，这一过程通常又被称为____________。",
		answers: [
			"发展客户"
		],
		isFAQ: true
	},
	{
		question: "电子商务生产以顾客为中心，在Web2.O时代，顾客不仅是生产的中心，甚至直接成为____________。",
		answers: [
			"生产者"
		],
		isFAQ: true
	},
	{
		question: "有效的网络营销活动必须深入了解用户群体的需求特征、____________和购买行为方式，找到正确的消费市场。",
		answers: [
			"购买动机"
		],
		isFAQ: true
	},
	{
		question: "硅谷“研究院所+工业园区”模式的倡导者特曼教授也因此常被人称作“____________”。",
		answers: [
			"硅谷之父"
		],
		isFAQ: true
	},
	{
		question: "____________是网络营销取得成效的必要条件。",
		answers: [
			"良好的顾客关系"
		],
		isFAQ: true
	},
	{
		question: "客户保留管理的目标一是要保留现有的客户，二是使客户保持____________。",
		answers: [
			"经常访问"
		],
		isFAQ: true
	},
	{
		question: "____________是电子商务系统的关键。",
		answers: [
			"保证交易数据的安全"
		],
		isFAQ: true
	},
	{
		question: "一些公司在互补产品上实行免费定价，美国经济学家勒维斯把这种现象叫作“____________”原理。",
		answers: [
			"剃须刀和刀片"
		],
		isFAQ: true
	},
	{
		question: "跨境电子商务具有全球性、____________、无形性等特点。",
		answers: [
			"即时性"
		],
		isFAQ: true
	},
	{
		question: "数字产品销售天生就适合____________。",
		answers: [
			"长尾理论"
		],
		isFAQ: true
	},
	{
		question: "____________是一种病毒式营销，其核心内容就是能“感染”目标受众的病毒体--事件，病毒体威力的强弱则直接影响营销传播的效果。",
		answers: [
			"口碑营销"
		],
		isFAQ: true
	},
	{
		question: "____________被认为是Internet进一步延伸，Internet作为物联网主要传输网络之一。",
		answers: [
			"物联网"
		],
		isFAQ: true
	},
	{
		question: "消费者心理是指消费者在整个消费过程中的____________。",
		answers: [
			"心理思维活动"
		],
		isFAQ: true
	},
	{
		question: "____________是网络营销的基础，也是网络品牌建设和推广的基础。",
		answers: [
			"网站建设"
		],
		isFAQ: true
	},
	{
		question: "20世纪后半叶，“以____________”的市场营销策略主导着企业的销售与服务运作。",
		answers: [
			"产品为中心"
		],
		isFAQ: true
	},
	{
		question: "HTML语言是由一定语法结构的标识和____________组成的。",
		answers: [
			"普通文档"
		],
		isFAQ: true
	},
	{
		question: "采购的最终目的是从合适的供应商那里，获得合适数量和质量的产品和服务，并以____________递送到合适的地点。",
		answers: [
			"合适的价格"
		],
		isFAQ: true
	},
	{
		question: "用户检索使用的关键词反映出用户对该____________的关注，这种关注是搜索引擎之所以被应用于网络营销的根本原因。",
		answers: [
			"问题（产品）"
		],
		isFAQ: true
	},
	{
		question: "市场进攻战略的特点是开拓性强，风险性大，____________。",
		answers: [
			"潜在利润高"
		],
		isFAQ: true
	},
	{
		question: "电子商务企业设计赢利模式时应注意的原则是____________。",
		answers: [
			"以客户为中心"
		],
		isFAQ: true
	},
	{
		question: "“创客”是指具有创新理念、自主创业的____________。",
		answers: [
			"人或群体"
		],
		isFAQ: true
	},
	{
		question: "____________密钥被分解为公开密钥和私有密钥。",
		answers: [
			"非对称加密"
		],
		isFAQ: true
	},
	{
		question: "加密密钥和解密密钥是相同的是____________。",
		answers: [
			"对称加密"
		],
		isFAQ: true
	},
	{
		question: "网络广告是一种____________广告，它的营销效果是可以测试的，在一定程度上克服了传统广告效果测试难的问题。",
		answers: [
			"即时交互式"
		],
		isFAQ: true
	},
	{
		question: "数字签名是基于____________和单向散列函数的一种认证技术。",
		answers: [
			"非对称加密技术"
		],
		isFAQ: true
	},
	{
		question: "IC卡是把具有信息储存、加密及处理功能的____________封在塑料片中制成的卡片。",
		answers: [
			"集成电路芯片"
		],
		isFAQ: true
	},
	{
		question: "移动通信网是指移动设备之间、移动设备与固定设备之间通过____________连接起来，按照一定的协议进行通信的网络。",
		answers: [
			"有线或无线介质"
		],
		isFAQ: true
	},
	{
		question: "由于任何决策方案的后果都不可能达到绝对满意，都存在不同程度的遗憾，因此有人主张以可能产生的____________作为决策的基本原则。",
		answers: [
			"遗憾最小"
		],
		isFAQ: true
	},
	{
		question: "这种众多的“分散型”生产者和众多的“分散型”购买者共同形成了图书市场上一个长长的供给和需求曲线--“____________”。",
		answers: [
			"长尾"
		],
		isFAQ: true
	},
	{
		question: "____________的实施要求企业具有过硬的软硬件条件。",
		answers: [
			"定制营销"
		],
		isFAQ: true
	},
	{
		question: "____________是电子商务系统具有权威性、公正性、可信任的第三方。",
		answers: [
			"CA认证中心"
		],
		isFAQ: true
	},
	{
		question: "____________为客户获得、保留、延伸提供了条件和基础。",
		answers: [
			"客户选择"
		],
		isFAQ: true
	},
	{
		question: "目录搜索引擎是以人工方式或____________搜集信息。",
		answers: [
			"半自动方式"
		],
		isFAQ: true
	},
	{
		question: "电子现金是以____________存在的现金货币。",
		answers: [
			"电子化数字形式"
		],
		isFAQ: true
	},
	{
		question: "智能卡是一种安装有____________的支付卡。",
		answers: [
			"嵌入式微型芯片"
		],
		isFAQ: true
	},
	{
		question: "____________这一概念的产生是以互联网的发展为基础的。",
		answers: [
			"网络营销"
		],
		isFAQ: true
	},
	{
		question: "数字化发展的趋向是不但物质产品数字化，____________也数字化。",
		answers: [
			"服务"
		],
		isFAQ: true
	},
	{
		question: "电子采购是指在____________完成的采购过程。",
		answers: [
			"互联网上"
		],
		isFAQ: true
	},
	{
		question: "微信的社交游戏属于____________，微信用户数量庞大，在移动用户中已经非常普及。",
		answers: [
			"带入关系链型"
		],
		isFAQ: true
	},
	{
		question: "品牌是指组织及其提供的产品或服务的____________的综合表现。",
		answers: [
			"有形和无形"
		],
		isFAQ: true
	},
	{
		question: "市场人员把产品的各项指标和特性确定下来，把产品描述出来，把完整产品的____________、外围产品和外延产品等三个层次划分出来。",
		answers: [
			"核心产品"
		],
		isFAQ: true
	},
	{
		question: "企业的生产方式从大规模制造转向____________。",
		answers: [
			"大规模定制"
		],
		isFAQ: true
	},
	{
		question: "电子商务产生的根本性标志是____________。",
		answers: [
			"互联网在商业上的应用"
		],
		isFAQ: true
	},
	{
		question: "____________是电子商务交易的基本平台，它必须具备基本的杀毒和防火墙软件。",
		answers: [
			"互联网"
		],
		isFAQ: true
	},
	{
		question: "定制营销的成功实施必须建立在企业卓越的____________之上。",
		answers: [
			"管理系统"
		],
		isFAQ: true
	},
	{
		question: "竞争是社会走向文明的出发点，文化渗透却是竞争的____________。",
		answers: [
			"归宿"
		],
		isFAQ: true
	},
	{
		question: "____________是现阶段物联网普遍的应用形式，是实现物联网的第一步。",
		answers: [
			"M2M"
		],
		isFAQ: true
	},
	{
		question: "____________是网络营销的重要内容和基本职能。",
		answers: [
			"市场调研"
		],
		isFAQ: true
	},
	{
		question: "最成功的进攻型战略要把____________两方面结合起来。",
		answers: [
			"进攻和防御"
		],
		isFAQ: true
	},
	{
		question: "____________是物联网感知层实现过程中最基本和关键的技术之一。",
		answers: [
			"二维码技术"
		],
		isFAQ: true
	},
	{
		question: "大规模生存模式的市场法则是“____________”。",
		answers: [
			"守着产品找顾客"
		],
		isFAQ: true
	},
	{
		question: "职能拓展战略是指企业可以“____________”和“向后扩张”求得发展。",
		answers: [
			"向前扩张"
		],
		isFAQ: true
	},
	{
		question: "Web数据挖掘的对象不仅是数据库，还可以是任何组织在一起的____________。",
		answers: [
			"数据集合"
		],
		isFAQ: true
	},
	{
		question: "实施跟进战略的经营者的前方必有____________。",
		answers: [
			"战略先行者"
		],
		isFAQ: true
	},
	{
		question: "4Rs营销理论以____________为核心，注重企业和客户关系的长期互动，重在建立顾客忠诚。",
		answers: [
			"关系营销"
		],
		isFAQ: true
	},
	{
		question: "____________是创客们实现创意的重要手。",
		answers: [
			"开源硬件与软件"
		],
		isFAQ: true
	},
	{
		question: "____________是互联网上最早出现的商业活动。",
		answers: [
			"电子邮件营销"
		],
		isFAQ: true
	},
	{
		question: "以舒尔茨教授为首的一批营销学者从____________的角度出发研究市场营销理论，提出了4Cs组合。",
		answers: [
			"顾客需求"
		],
		isFAQ: true
	},
	{
		question: "若以最大或相对满意作为正向决策原则，____________立足于逆向决策。",
		answers: [
			"遗憾最小原则"
		],
		isFAQ: true
	},
	{
		question: "安德森认为，____________是关注“长尾”、发挥“长尾”效益的时代。",
		answers: [
			"网络时代"
		],
		isFAQ: true
	},
	{
		question: "CRM的实现应该从两个层面进行考虑：一是____________，二是技术支持。",
		answers: [
			"管理方面"
		],
		isFAQ: true
	},
	{
		question: "磁条卡是以____________为介质的一种卡。",
		answers: [
			"磁材料"
		],
		isFAQ: true
	},
	{
		question: "蓝牙的实质是为固定设备或移动设备之间的通信环境建立通用的____________。",
		answers: [
			"短距离无线接口"
		],
		isFAQ: true
	},
	{
		question: "期末进行账项调整的会计基础是",
		answers: [
			"权责发生制"
		],
		isFAQ: false
	},
	{
		question: "下列各项中，应作为制造费用核算的是",
		answers: [
			"车间水电费"
		],
		isFAQ: false
	},
	{
		question: "“实收资本”明细账的账页格式一般采用",
		answers: [
			"三栏式"
		],
		isFAQ: false
	},
	{
		question: "“应付账款账户期初贷方余额8000元，本期借方发生额14000元，本期贷方发生额12000元。则该账户的期末余额为",
		answers: [
			"6000元"
		],
		isFAQ: false
	},
	{
		question: "将现金存入银行，一般应编制",
		answers: [
			"现金付款凭证"
		],
		isFAQ: false
	},
	{
		question: "借贷记账法下，下列账户的借方应登记增加金额的是",
		answers: [
			"“库存商品”"
		],
		isFAQ: false
	},
	{
		question: "对会计要素具体内容进行分类核算的项目，称为",
		answers: [
			"会计科目"
		],
		isFAQ: false
	},
	{
		question: "下列项目中，属于流动资产的是",
		answers: [
			"存货"
		],
		isFAQ: false
	},
	{
		question: "本月预收货款200000元；此外，出售产品一批，售价800000元，其中300000元已收到并存入银行。若采用收付实现制，本月应确认收入",
		answers: [
			"500000元"
		],
		isFAQ: false
	},
	{
		question: "下列会计账目中，按照会计要素分属于负债类的是",
		answers: [
			"“预收账款”"
		],
		isFAQ: false
	},
	{
		question: "8月末A企业的资产总额200万元，9月1日发生以下三笔业务：（1）取得短期借款10万元存入银行；（2）从银行提取现金2万元备用；（3)用银行存款偿还应付货款20万元。这些业务发生后，该企业的资金总额应为",
		answers: [
			"190万元"
		],
		isFAQ: false
	},
	{
		question: "下列费用中，不能计入产品成本的是",
		answers: [
			"行政办公大楼折旧费"
		],
		isFAQ: false
	},
	{
		question: "借贷记账法下，简单会计分录的形式是",
		answers: [
			"一借一贷"
		],
		isFAQ: false
	},
	{
		question: "负债按照约定期限偿还，所依据的会计核算基本前提是",
		answers: [
			"持续经营"
		],
		isFAQ: false
	},
	{
		question: "按用途和结构分类，下列账户中属于资本账户的是",
		answers: [
			"“实收资本”"
		],
		isFAQ: false
	},
	{
		question: "在我国会计规范体系中处于最高层次的是",
		answers: [
			"会计法"
		],
		isFAQ: false
	},
	{
		question: "财务报表项目金额填列的主要依据是",
		answers: [
			"账簿记录"
		],
		isFAQ: false
	},
	{
		question: "下列各项中，构成犯罪并应依法追究刑事责任的是",
		answers: [
			"伪造、变造会计凭证、账簿，编制虚假财务报告"
		],
		isFAQ: false
	},
	{
		question: "购进原材料一批，买价100 000元，运费5 000元，会计按105 000元将该批材料登记入账。所采用的计量属性是",
		answers: [
			"历史成本"
		],
		isFAQ: false
	},
	{
		question: "按来源来分，购进货物取得的发票属于",
		answers: [
			"外来原始凭证"
		],
		isFAQ: false
	},
	{
		question: "下列属于资产类账户的是",
		answers: [
			"“原材料”"
		],
		isFAQ: false
	},
	{
		question: "大量成堆且难以逐一清点的材料物资最适用的财产清查方法是",
		answers: [
			"技术推算法"
		],
		isFAQ: false
	},
	{
		question: "将会计凭证分为原始凭证与记账凭证的标准是",
		answers: [
			"凭证的填制程序与用途"
		],
		isFAQ: false
	},
	{
		question: "某公司期末资产总额100万元、负债总额60万元，则该公司期末所有者权益总额应为",
		answers: [
			"40万元"
		],
		isFAQ: false
	},
	{
		question: "规模小、经济业务少的企业，适宜采用的账务处理程序是",
		answers: [
			"记账凭证账务处理程序"
		],
		isFAQ: false
	},
	{
		question: "某公司“长期借款”账户期末余额 800 万元，其中一年内到期应予偿还的金额 100 万元，则资产负债表 中“长期借款”项目的期末余额应填列",
		answers: [
			"700万元"
		],
		isFAQ: false
	},
	{
		question: "本月预收货款200 000元；另出售产品一批，售价800 000元，其中350 000元已收到现款。若采用收付实现制，本月应确认收入",
		answers: [
			"550 000元"
		],
		isFAQ: false
	},
	{
		question: "“应收账款”明细账的账页格式一般采用",
		answers: [
			"三栏式"
		],
		isFAQ: false
	},
	{
		question: "下列会计档案中，需要永久保存的是",
		answers: [
			"年度财务报表"
		],
		isFAQ: false
	},
	{
		question: "从外表形式看，总分类账簿应采用",
		answers: [
			"订本式"
		],
		isFAQ: false
	},
	{
		question: "用银行存款购入固定资产，应填制的专用记账凭证是",
		answers: [
			"付款凭证"
		],
		isFAQ: false
	},
	{
		question: "实物财产盘点完毕，“盘存单”中所记录的实存数与账面结存数不符时，应填制",
		answers: [
			"实存账存对比表"
		],
		isFAQ: false
	},
	{
		question: "同类企业收入应采用相同的标准，所体现的会计信息质量要求是",
		answers: [
			"可比性"
		],
		isFAQ: false
	},
	{
		question: "下列账户中属于集合分配账户的是",
		answers: [
			"“制造费用”"
		],
		isFAQ: false
	},
	{
		question: "下列各项中，不属于对账内容的是",
		answers: [
			"账表核对"
		],
		isFAQ: false
	},
	{
		question: "从账簿的外表形式看，银行存款日记账应采用",
		answers: [
			"订本式"
		],
		isFAQ: false
	},
	{
		question: "永续盘存制下，对财产物资的数量变动平时在账簿中登记的是",
		answers: [
			"既登记增加数，又登记减少数"
		],
		isFAQ: false
	},
	{
		question: "向银行申请贷款时，需要提供与偿债能力有关的信息，所体现的会计信息质量要求是",
		answers: [
			"相关性"
		],
		isFAQ: false
	},
	{
		question: "下列错账能通过试算平衡发现的是",
		answers: [
			"某项业务的借方金额多记"
		],
		isFAQ: false
	},
	{
		question: "因单位撤销所进行的财产清查，从清查范围看属于",
		answers: [
			"全面清查"
		],
		isFAQ: false
	},
	{
		question: "发出材料汇总表属于",
		answers: [
			"汇总原始凭证"
		],
		isFAQ: false
	},
	{
		question: "从事会计工作必须持有的资格证书是",
		answers: [
			"会计从业资格证"
		],
		isFAQ: false
	},
	{
		question: "下列经济业务发生时，会引起会计等式中资产要素项目一增一减的是",
		answers: [
			"从银行提现"
		],
		isFAQ: false
	},
	{
		question: "下列账户中，期末余额在贷方的是",
		answers: [
			"“短期借款”"
		],
		isFAQ: false
	},
	{
		question: "某公司当期全部经济业务登记入账后，现金日记账余额为2000元，现金盘点金额为100元，则盘点结果是",
		answers: [
			"现金1900元盘亏"
		],
		isFAQ: false
	},
	{
		question: "下列各项应在资产负债表中单项列示的是",
		answers: [
			"一年内到期的非流动负债"
		],
		isFAQ: false
	},
	{
		question: "下列会计核算的基本前提中，明确会计确认、计量、记录与报告空间范围的是",
		answers: [
			"会计主体"
		],
		isFAQ: false
	},
	{
		question: "下列关于特种日记账的表述中，正确的是",
		answers: [
			"是用来专门登记某一类经济业务的日记账"
		],
		isFAQ: false
	},
	{
		question: "下列财务报表中，反映期末财务状况的是",
		answers: [
			"资产负债表"
		],
		isFAQ: false
	},
	{
		question: "某公司库存原材料一批，成本 20 万元， 期末市价 22 万元， 期末在资产负债表中按 20 万元列示该项资产的价值，这种做法采用的会计计量属性是",
		answers: [
			"历史成本"
		],
		isFAQ: false
	},
	{
		question: "本期发生的下列业务中，会影响本期成本费用的是",
		answers: [
			"计提折旧"
		],
		isFAQ: false
	},
	{
		question: "记账凭证中，“记账”栏标记的“√”表示",
		answers: [
			"已经登记入账"
		],
		isFAQ: false
	},
	{
		question: "下列各项中，应作为企业营业外收入核算的是",
		answers: [
			"赔款收入"
		],
		isFAQ: false
	},
	{
		question: "下列各项中，不属于利润表项目的是",
		answers: [
			"制造费用"
		],
		isFAQ: false
	},
	{
		question: "按用途和结构分类，“应付利息”账户属于",
		answers: [
			"债务结算账户"
		],
		isFAQ: false
	},
	{
		question: "“应收账款”账户期初借方余额5000元，本期借方发生额6000元，本期贷方发生额4000元，则该账户的期末余额应为",
		answers: [
			"借方余额7000元"
		],
		isFAQ: false
	},
	{
		question: "审核中发现不合法的原始凭证，正确的处理方法是",
		answers: [
			"不予接受并向单位负责人报告"
		],
		isFAQ: false
	},
	{
		question: "下列原始凭证中，由业务经办人员根据经济业务的实际发生或完成情况直接填制的是",
		answers: [
			"材料入库单"
		],
		isFAQ: false
	},
	{
		question: "下列与采购材料相关的各项支出中，不应计入材料采购成本的是",
		answers: [
			"采购员的差旅费"
		],
		isFAQ: false
	},
	{
		question: "在可预见的未来，会计主体不会发生破产或清算，所体现的会计假设是",
		answers: [
			"持续经营"
		],
		isFAQ: false
	},
	{
		question: "按照财产清查的时间分类，月末结账时对银行存款的清查属于",
		answers: [
			"定期清查"
		],
		isFAQ: false
	},
	{
		question: "企业会计凭证保管期限届满时，正确的做法是",
		answers: [
			"经批准后销毁"
		],
		isFAQ: false
	},
	{
		question: "以实际收到或支付现金的时间作为确认收入与费用的标准，该会计基础称为",
		answers: [
			"收付实现制"
		],
		isFAQ: false
	},
	{
		question: "下列有关财务报表的表述中，不正确的是",
		answers: [
			"财务报表仅指资产负债表"
		],
		isFAQ: false
	},
	{
		question: "划分总分类账户和明细分类账户的依据是",
		answers: [
			"账户提供指标的详细程度"
		],
		isFAQ: false
	},
	{
		question: "本期发生的下列业务中，不影响本期费用的是",
		answers: [
			"预付下年保险费"
		],
		isFAQ: false
	},
	{
		question: "采用科目汇总表核算组织程序，总分类账的登记依据是",
		answers: [
			"科目汇总表"
		],
		isFAQ: false
	},
	{
		question: "购进原材料一批，会计按采购成本l00000元将该批材料登记入账，采用的计量属性是",
		answers: [
			"历史成本"
		],
		isFAQ: false
	},
	{
		question: "下列各项中，不属于原始凭证审核内容的是",
		answers: [
			"经济业务涉及的会计科目"
		],
		isFAQ: false
	},
	{
		question: "存货盘亏发生定额内损耗，批准处理时应借记的账户是",
		answers: [
			"“管理费用”"
		],
		isFAQ: false
	},
	{
		question: "企业必须每日编制一次科目汇总表。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "对于银行已经入账而企业尚未入账的业务和企业已经入账而银行尚未入账的业务，月末可以根据“银行存款余额调节表”调节银行存款日记账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "资产负债表中“应交税费”项目，反映企业应交未交的各种税费。应根据“应交税费”账户的期末贷方余额填列。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "为了编制财务报表，财务人员必须及时按期结账，特殊情况下可以提前结账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "账户的金额栏中记录的主要内容是本期增加合计数、本期减少合计数。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "资产=负债＋所有者权益反映了一定时期内企业的会计要素之间的平衡关系，它是一种动态的关系。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "经济业务发生后，按照借贷记账法的记账规则来记账，每一笔会计分录的借贷发生额相等，一定会计期间所有账户的借方发生额与贷方发生额的合计数也相等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "为了保证账簿记录的正确和完整，应当加强会计凭证的日常审核，定期进行账证核对、账账核对、账实核对。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "填制原始凭证时，大写金额“￥5006.82”的正确写法是“人民币伍千零六元捌角贰分”。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "预付账款属于企业的资产。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "原材料应按公允价值的属性进行计量，并按照购进原材料的公允价值入账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "为了避免记账重复，对于现金和银行存款之间的收付业务，企业一般只编制收款凭证。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "企业所购进的原材料验收入库，或原材料虽未到达但已支付货款后，企业就拥有了该项原材料的所有权，该项原材料即应被作为一项资产加以确认。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "涉及外事和其他重要事项的会计凭证和会计账簿，必须保存至少25 年。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "9月2日企业与供应商签订设备采购合同，约定12月2日采购100万元的设备。合同签订日，该企业会计应将设备登记入账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在具体账户中，究竟规定哪一方记录增加额、哪一方记录减少额，取决于会计人员的经验判断。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "收入按照经营活动在企业经营中的地位不同分为销售商品收入、提供劳务收入和让渡资产使用权收入。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "《中华人民共和国会计法》规范了会计人员的行为，是根据会计准则制定的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "未来发生的交易或者事项形成的义务应当确认为负债。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "企业预收的货款、租金等都属于收入，收到时借记“银行存款”科目，贷记“其他业务收入”科目。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "当企业不单独设置“预收账款”账户时，可以用“应付账款”账户同时反映销售产品或提供劳务的应收款项和预收款项，“应付账款”账户便是债权债务结算账户。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "采用收付实现制可以正确地反映本期收入和费用，正确计算本期损益。因此，企业一般采用收付实现制作为会计记账的基础。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "原始凭证表明了经济业务的具体内容，审核无误后，可以直接入账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "采购过程中发生的运输费应计入采购的成本，销售过程中发生的包装费、运输费计入销售费用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "借贷记账法下会计分录的格式为：借方的账户写在上面偏右，贷方的账户写在下面偏左，左右错开一个字。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "实地盘存法下，存货增加或减少时要随时根据会计凭证连续登记入账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "出纳人员根据审核无误的现金收款凭证、现金付款凭证逐日逐笔按顺序登记现金日记账、银行存款日记账、总分类账及有关的明细分类账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "某企业购入一套机械设备用于生产，款项以银行存款支付，该企业应该做的会计分录是：借记固定资产，贷记银行存款。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "资本账户的余额总在借方，表示各项资本、公积金的实有数",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "“预收账款”账户的期末余额可能在借方，也可能在贷方。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "财务会计报告只包括资产负债表、利润表和现金流量表等报表。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "按照我国相关规定，所有企业均需单独设置会计机构。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "取得原材料的计价，按照实际成本计价原则，材料取得成本包括买价和采购费用。采购费用是为完成材料材料采购而发生的费用，包括运杂费、定额内的途中损耗、入库前的整理挑选费、采购人员的差旅费等。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "凡是有贷方余额的都是资产类账户，凡是有借方余额的都是负债和所有者权益类账户。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "复式记账可以对账户记录的结果进行试算平衡",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "企业应该按照实际发生的交易或者事项进行会计处理，不能虚构交易，这体现的是会计信息的谨慎性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "费用类账户的结构与负债及所有者权益类账户结构基本相同。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "借贷记账法下，全部账户的借方期末余额的合计数大于贷方期末余额的合计数。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "收入、费用、利润反映企业的财务状况，构成资产负债表的项目，亦称资产负债表要素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "总分类账及其所属的明细分类账按平行登记规则进行登记，可以概括为：期间相同、依据相同、方向一致、金额相等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "为制造产品和组织生产活动而损耗的固定资产价值形成企业的期间费用。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "企业的各种贵重物资、现金以及银行存款，必需每月清查一次。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "所有的结算账户期末都是没有余额的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "留存收益包括盈余公积和未分配利润。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "永续盘存法下，存货增加时要随时根据会计凭证连续登记入账。但对于存货的正常减少业务，平时不登记入账。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "某企业2014年末预收下年度出租设备租金240000元，会计将其全部确认为2014年度收入。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "单步式利润表中利润形成的排列格式注意了收入与费用支出配比的层次性，考虑了各个损益项目对利润的贡献程度，因此，一般行政事业单位采用单步式利润表。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "企业的各种贵重物资、现金以及银行存款，必需每月清查一次。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "如果试算平衡表检查借贷是平衡的，则说明记账完全正确。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "资产负债表中存货项目的内容仅指库存商品。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在分类核算会计要素的增减变动时，需要将统一性和灵活性相结合。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "基于货币计量的会计核算基本前提，会计计量一般采用历史成本。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "会计职能只有核算与监督",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "填制记账凭证时会计科目使用错误，并已登记入账。此错账应采用划线更正法更正。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "期末账项调整中的应计费用是指企业当期发生的所有费用。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "“应交税费”项目反映企业应交未交的各种税费，应根据“应交税费”账户的期末贷方余额填列资产负债表。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "科目汇总表能起到试算平衡的作用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "利润表编制完成后，可利用“本年利润”账户的数字与利润表有关项目进行核对，以检查报表编制的正确性。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "内部控制是企业的一项管理活动，与会计系统无关。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "抵减账户的余额一定要与被调整账户的余额方向相同。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "明细分类账户是依据企业经济业务的具体内容设置的，它所提供的明细核算资料主要是为满足企业内部经营管理需要。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "盘点时有的材料盘盈，有的材料盘亏，可以把盘盈和盘亏合并处理。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "费用类账户的期末余额在贷方，期末余额结转到下一期就成为期初余额。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "可变现净值一般用于盘盈资产或不能确定价值的捐赠资产的价值确定。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "11月末企业的银行存款有借方余额500000元，应收账款有借方余额100000元，预收账款有贷方余额50000元，则11月末企业的资产为6500000元。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "账户是按照规定的会计科目在账簿中对各项经济业务进行的分类、系统、连续记录的载体，会计科目就是账户的名称。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "“库存商品”账户的借方记录入库库存商品的实际成本，贷方记录发出库存商品的实际成本，借方余额表示结存库存商品的实际成本。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "权责发生制是按照现金的收付日期来确定其归属期的，不存在对账簿记录进行期末账项调整的问题。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "当生产车间或管理部门领用原材料时，该项原材料的价值需摊入产品的生产成本。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "“库存商品”明细分类账应采用数量金额式账页",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "简述财产清查的一般方法",
		answers: [
			"答：① 实地盘点法，通过实地逐一点数或用计量器具确定实存数量； ② 技术推算法，对有些价值低、数量大的材料物资； ③ 查询核实法，对应收应付往来账款。"
		],
		isFAQ: true
	},
	{
		question: "简述企业主要经济业务",
		answers: [
			"答：（1）资金筹集业务；（2）供应过程业务；（3）生产过程业务；（4）销售过程业务；（5）财务成果形成与分配业务。"
		],
		isFAQ: true
	},
	{
		question: "简述“三位一体”的会计监督体系",
		answers: [
			"答：① 建立单位内部会计监督制度的单位内部监督；    ② 注册会计师进行的社会监督；    ③ 以财政部门为主进行的国家监督。"
		],
		isFAQ: true
	},
	{
		question: "简述会计信息质量特征",
		answers: [
			"答：可靠性、相关性、可理解性、可比性、实质重于形式、重要性、谨慎性、及时性。"
		],
		isFAQ: true
	},
	{
		question: "简述原始凭证审核的内容",
		answers: [
			"答：① 真实性；② 合法性；③ 合理性；④ 完整性；⑤ 正确性；⑥ 及时性。"
		],
		isFAQ: true
	},
	{
		question: "简述复式记账法的特点",
		answers: [
			"答：了解经济业务的来龙去脉；进行试算平衡，以检查账户记录的正确性。"
		],
		isFAQ: true
	},
	{
		question: "简述填制和审核会计凭证意义",
		answers: [
			"答：①反映经济业务；②提供记账依据；③有效监督经济业务；④保证核算资料真实、可靠。"
		],
		isFAQ: true
	},
	{
		question: "简述账户的特点",
		answers: [
			"答：① 账户左右两方按相反的方向来记录增加额和减少额； ② 账户金额之间平衡关系应满足“本期期末余额=期初余额+本期增加发生额-本期减少发生额”。 ③ 账户的余额一般在记录增加额的一方，本期的期末余额为下期的期初余额。"
		],
		isFAQ: true
	},
	{
		question: "简述会计各方面的作用",
		answers: [
			"答：为投资者提供财务报告；保证企业投入资产的安全和完整；为国家进行宏观调控、制定经济政策提供信息；加强经济核算，为企业经营管理提供数据。"
		],
		isFAQ: true
	},
	{
		question: "简述会计恒等式的作用",
		answers: [
			"答：① 复式记账的基础；② 试算平衡的理论依据；③ 资产负债表结构的理论基础。"
		],
		isFAQ: true
	},
	{
		question: "简述所有者权益的内容",
		answers: [
			"答：实收资本、资本公积、未分配利润、盈余公积。（留存收益=未分配利润+盈余公积）。"
		],
		isFAQ: true
	},
	{
		question: "简述平行登记的规则",
		answers: [
			"答：① 期间相同；② 方向一致；③ 金额相等；④ 依据相同。"
		],
		isFAQ: true
	},
	{
		question: "简述各会计主体设置账户应遵循的原则",
		answers: [
			"答：①必须结合会计要素的特点，全面反映会计要素的内容；②既要符合对外报告的要求，又要满足内部经营管理的需要；③既要适应经济业务发展的需要，又要保持相对稳定；④统一性与灵活性相结合；⑤简明适用，称谓规范。"
		],
		isFAQ: true
	},
	{
		question: "简述会计反映职能一般特征",
		answers: [
			"答：会计反映职能的特征包括以货币为主要计量单位；反映过去已经发生的经济活动；具有连续性、系统性和全面性和体现在记账、算账、报账三个阶段上。"
		],
		isFAQ: true
	},
	{
		question: "简述常考的企业会计档案保管期限",
		answers: [
			"答：常考的企业会计档案保管期限： ①原始凭证、记账凭证、汇总记账凭证、日记账、总账、明细账、辅助账簿、会计移交清册→15年； ②现金日记账、银行存款日记账→25年； ③银行对账单、银行存款余额调节表→5年； ④月/季度财务报表→3年； ⑤年度财务报表、档案保管清册、档案销毁清册、涉及外事和其他重要的\n填空题"
		],
		isFAQ: true
	},
	{
		question: "企业的利润形成以后，可以分为三部分：一部分作为投资收益，分配给（   ）；一部分以盈余公积的形式留存企业；一部分以未分配利润的形式保留企业账上。后两者合称为企业的留存收益。",
		answers: [
			"投资者"
		],
		isFAQ: true
	},
	{
		question: "公司的所有者权益又称为（   ）。",
		answers: [
			"股东权益"
		],
		isFAQ: true
	},
	{
		question: "为了保证账簿记录的正确和完整，应当加强会计凭证的日常审核，定期进行账证核对、（   ）、账实核对。",
		answers: [
			"账账核对"
		],
		isFAQ: true
	},
	{
		question: "（    ）保管现金，同时负责现金日记账与银行存款日记账的登记，除此之外，不能负责其他登账工作，也不得兼管稽核与会计档案保管工作。",
		answers: [
			"出纳员"
		],
		isFAQ: true
	},
	{
		question: "库存商品等财产物资的明细核算即要（   ），又要核算单价与金额",
		answers: [
			"核算数量"
		],
		isFAQ: true
	},
	{
		question: "所有者权益的构成内容通常划分为实收资本、资本公积、（   ）和未分配利润等项目。",
		answers: [
			"盈余公积"
		],
		isFAQ: true
	},
	{
		question: "收入和（   ）是反映行政事业单位一定时期收入和支出情况的会计要素。",
		answers: [
			"支出"
		],
		isFAQ: true
	},
	{
		question: "企业取得收入，便意味着（    ）可能形成。",
		answers: [
			"利润"
		],
		isFAQ: true
	},
	{
		question: "（     ）对每项经济业务都要在相互联系的两个或者两个以上账户中登记，且登记金额相等。根据账户双重记录的结果，可了解每项经济业务的来龙去脉。",
		answers: [
			"复式记账"
		],
		isFAQ: true
	},
	{
		question: "目前，我国的行政单位会计采用收付实现制，事业单位会计除经营业务可以采用权责发生制外，其他大部分业务也采用（   ）。",
		answers: [
			"收付实现制"
		],
		isFAQ: true
	},
	{
		question: "（    ）是依据企业经济业务的具体内容设置的，它所提供的明细核算资料主要是为满足企业內部经营管理的需要。",
		answers: [
			"明细分类账户"
		],
		isFAQ: true
	},
	{
		question: "《企业会计准则》规定，企业在会计确认、计量和报告应当以（    ）为基础。",
		answers: [
			"权责发生制"
		],
		isFAQ: true
	},
	{
		question: "“库存商品”属于（    ）账户，资产类账户的结构是账户的借方记录资产的增加额，贷方记录资产的减少额，因此，“库存商品”账户的借方记录入库库存商品的实际成本，贷方记录发出库存商品的实际成本，借方余额表示结存库存商品的实际成本。",
		answers: [
			"资产类"
		],
		isFAQ: true
	},
	{
		question: "（   ）是对会计对象进行的基本分类，是会计核算对象的具体化。会计要素是构成会计报表的基本要素，同时也是设置账户的依据。",
		answers: [
			"会计要素"
		],
		isFAQ: true
	},
	{
		question: "在会计学说史上，将帕乔利复式簿记著作的出版和（    ）的出现视为近代会计史中的两个里程碑。",
		answers: [
			"会计职业"
		],
		isFAQ: true
	},
	{
		question: "溢价部分，此外，还包括直接计入（   ）的利得和损失。",
		answers: [
			"所有者权益"
		],
		isFAQ: true
	},
	{
		question: "科目汇总表根据记账凭证定期汇总每个账户的借方本期发生额和贷方本期发生额，并根据借贷记账法的记账规则进行试算平衡。因此，它能起到（   ）的作用。",
		answers: [
			"试算平衡"
		],
		isFAQ: true
	},
	{
		question: "企业的负债按其流动性可分为流动负债和（   ）。",
		answers: [
			"非流动负债"
		],
		isFAQ: true
	},
	{
		question: "对账工作一般分三步进行：一是账证核对，二是账账核对，三是（   ）。",
		answers: [
			"账实核对"
		],
		isFAQ: true
	},
	{
		question: "流动负债包括（   ）、应付及预收账款、应交税费、应付职工薪酬等。",
		answers: [
			"短期借款"
		],
		isFAQ: true
	},
	{
		question: "留存收益是指企业实现的净利润留存于企业的部分，包括计提的盈余公积和（   ）。",
		answers: [
			"未分配利润"
		],
		isFAQ: true
	},
	{
		question: "企业的六大会计要素为资产、负债、（   ）、收入、费用和利润。",
		answers: [
			"所有者权益"
		],
		isFAQ: true
	},
	{
		question: "经济业务发生后，按照（    ）的记账规则来记账，借贷两方的发生额必然是相等的。",
		answers: [
			"借贷记账法"
		],
		isFAQ: true
	},
	{
		question: "多数记账凭证须附有原始凭证，但是对于结账和更正错账的记账凭证可以不附（    ）。",
		answers: [
			"原始凭证"
		],
		isFAQ: true
	},
	{
		question: "（   ）是以折旧费的形式转移的。为生产产品而发生的固定资产折旧构成制造成本的一部分，应当计入产品成本；于制造产品无直接关系的固定资产折旧构成管理费用的一部分，不应当计入产品成本。",
		answers: [
			"固定资产折旧"
		],
		isFAQ: true
	},
	{
		question: "企业所购进的原材料验收入库，或原材料虽未到达但已支付付款后，企业就拥有了该项原材料的（    ），该项原材料即应被作为一项资产加以确认。当生产车间或管理部门领用原材料时，该项原材料被作为一项费用加以确认。",
		answers: [
			"所有权"
		],
		isFAQ: true
	},
	{
		question: "留存收益包括盈余公积与（    ）。",
		answers: [
			"未分配利润"
		],
		isFAQ: true
	},
	{
		question: "与所有者权益相比，（    ）无权参与企业的生产经营、管理和收益分配，而所有者则相反。",
		answers: [
			"债权人"
		],
		isFAQ: true
	},
	{
		question: "“营业外收入”账户核算企业发生的与企业生产经营无直接关系的各项收入，包括（    ）、确实无法支付的应付款项等。企业发生营业外收入款项时，记入“营业外收入”账户的贷方；期末将其贷方余额从借方转入“本年利润”账户，结转后该账户无余额。",
		answers: [
			"固定资产盘盈"
		],
		isFAQ: true
	},
	{
		question: "权责发生制又称（    ），是按照权利和责任是否转移或发生来确认收入和费用归属期间的制度。",
		answers: [
			"应收应付制"
		],
		isFAQ: true
	},
	{
		question: "根据平行登记规定，每项业务发生后应在相关总分类账户及其明细分类账户进行同期间、（   ）、同金额记录，据此，“应收账款”总分类账户本期发生额与所属明细分类账户本期发生额合计金额相等。",
		answers: [
			"同方向"
		],
		isFAQ: true
	},
	{
		question: "所有者权益的来源包括所有者投入的资本、直接让入所有者权益的利得和损失、（   ）等。",
		answers: [
			"留存收益"
		],
		isFAQ: true
	},
	{
		question: "由于复式记账法要求以相等的金额在两个或两个以上账户同时登记，所以能进行（   ）。",
		answers: [
			"试算平衡"
		],
		isFAQ: true
	},
	{
		question: "收付实现制又称（    ），是以实际收到或支付款项为依据，进而确认收入和费用归属期间的制度。",
		answers: [
			"现收现付制"
		],
		isFAQ: true
	},
	{
		question: "存货盘存制度包括（    ）和实地盘存制。",
		answers: [
			"永续盘存制"
		],
		isFAQ: true
	},
	{
		question: "会计的反映职能具体体现在记账、（    ）、报账三个阶段。",
		answers: [
			"算账"
		],
		isFAQ: true
	},
	{
		question: "（   ）中各项目的数据与“本年利润”借贷方的数据来源相同。利润表编制完成后，可利用“本年利润”账户的数字与利润表有关项目进行核对，以检查报表编制的正确性。",
		answers: [
			"利润表"
		],
		isFAQ: true
	},
	{
		question: "“预收账款”账户属于（   ）结算账户，因此其期末余额可能在借方，也可能在贷方。",
		answers: [
			"债权债务"
		],
		isFAQ: true
	},
	{
		question: "总分类账及其所属的明细分类账按平行登记规则进行登记，可以概括为：（   ）、依据相同、方向一致、金额相等。",
		answers: [
			"期间相同"
		],
		isFAQ: true
	},
	{
		question: "将“生产成本”账户借方归集的全部制造成本在完工产品和在产品之间进行分配，完工产品的制造成本从账户的贷方转出，剩余部分便是在产品的（   ）。",
		answers: [
			"制造成本"
		],
		isFAQ: true
	},
	{
		question: "银行存款日记账必须采用（    ）账簿，是因为订本式账簿可以避免账页散失，并防止抽换账页。",
		answers: [
			"订本式"
		],
		isFAQ: true
	},
	{
		question: "账户是按照规定的会计科目在账簿书对各项经济业务进行的分类、系统、连续记录的载体，账户的名称就是（   ），通过会计科目可以了解该账户记录的是哪一类经济业务。",
		answers: [
			"会计科目"
		],
		isFAQ: true
	},
	{
		question: "会计六要素中既有反映财务状况的要素，也含反映（    ）的要素。",
		answers: [
			"经营成果"
		],
		isFAQ: true
	},
	{
		question: "购入一套设备，（   ）增加，计借方；用银行存款付钱，银行存款减少，计贷方。固定资产和银行存款都是资产类，借增贷减。",
		answers: [
			"固定资产"
		],
		isFAQ: true
	},
	{
		question: "收入、费用及利润表现资金运动的显著变动状态，是反映（   ）的会计要素。",
		answers: [
			"企业经营成果"
		],
		isFAQ: true
	},
	{
		question: "（   ）是指企业过去的交易或者事项形成的，并由企业拥有或控制，预期会给企业带来经济利益的资源。",
		answers: [
			"资产"
		],
		isFAQ: true
	},
	{
		question: "采购过程中发生的运输费应计入采购的成本，销售过程中发生的包装费、运输费计入（   ）。",
		answers: [
			"销售费用"
		],
		isFAQ: true
	},
	{
		question: "资产按其流动性可分为（   ）、非流动资产两类。",
		answers: [
			"流动资产"
		],
		isFAQ: true
	},
	{
		question: "企业的经济业务千差万别，在分类核算会计要素的增减变动时，需要将统一性和（   ）相结合。",
		answers: [
			"灵活性"
		],
		isFAQ: true
	},
	{
		question: "会计恒等式：（    ），当负债增加时，为保持等式平衡，可能会引起所有者权益的减少或资产增加。",
		answers: [
			"资产=负债+所有者权益"
		],
		isFAQ: true
	},
	{
		question: "预付账款是企业预付供货单位的货款，属于企业的债权，是一项（    ）。",
		answers: [
			"资产"
		],
		isFAQ: true
	},
	{
		question: "会计学科体系中包括理论会计学和（    ）两大部分。",
		answers: [
			"应用会计学"
		],
		isFAQ: true
	},
	{
		question: "资产、负债和净资产反映是行政事业单位财务状况的（   ）。",
		answers: [
			"会计要素"
		],
		isFAQ: true
	},
	{
		question: "将按历史成本计价登记的“固定资产”账户的借方余额减去按磨损价值计价登记的“（    ）”账户的贷方余额，即可确定固定资产的实际价值－固定资产净值。本题中国定资产净值=100000-20000=80000（元）。",
		answers: [
			"累计折旧"
		],
		isFAQ: true
	},
	{
		question: "“预收账款”账户核算企业按照合同规定向购货单位预收的货款。企业向购货单位预收货款时，记入该账户的（    ）；产品销售实现时，按销售价记入该账户的借方。",
		answers: [
			"贷方"
		],
		isFAQ: true
	},
	{
		question: "“应交税费”项目，反映企业应交未交的（   ）。应根据“应交税费”账户的期末贷方余额填列资产负债表。如果“应交税费”账户为借方余额，则表示多交的税金，应以“—”号填列。",
		answers: [
			"各种税费"
		],
		isFAQ: true
	},
	{
		question: "（   ）是指企业由过去的交易或者事项形成的、预期会导致经济利益流出企业的现时义务。由未来发生的交易或者事项形成的义务不属于现时义务，不得确认为负债。",
		answers: [
			"负债"
		],
		isFAQ: true
	},
	{
		question: "与所有者权益相比，负债一般有规定的偿还期，而（    ）没有。",
		answers: [
			"所有者权益"
		],
		isFAQ: true
	},
	{
		question: "非流动负债是指（   ）以外的负债，主要包括长期借款、应付债券和长期应付款。",
		answers: [
			"流动负债"
		],
		isFAQ: true
	},
	{
		question: "所有者权益也称为（   ），是指企业资产扣除负债后由所有者享有的剩余权益。",
		answers: [
			"净资产"
		],
		isFAQ: true
	},
	{
		question: "资产、负债和所有者权益表现为资金的相对静止状态，是用于反映企业的财务状况，也称为（   ）。",
		answers: [
			"静态会计要素"
		],
		isFAQ: true
	},
	{
		question: "计算出的应缴纳的税款构成对税务部门的负债，应通过“（    ）”账户进行核算，该账户属于负债类账户，贷方登记应缴纳的税款，借方登记实际缴纳的税款，期末贷方余额反映尚未缴纳的税款。某企业以银行存款缴纳税款，会计人员应借记“应交税费”账户，贷记“银行存款”账户。",
		answers: [
			"应交税费"
		],
		isFAQ: true
	},
	{
		question: "狭义的会计方法是指（    ）。",
		answers: [
			"会计核算方法"
		],
		isFAQ: true
	},
	{
		question: "利息的核算通过“财务费用”账户进行。该账户属于费用类账户，借方登记发生的利息支出，贷方登记取得的利息收入，期末将余额转入“本年利润”账户，结转后一般没有余额。企业向银行支付的利息，应借记“财务费用”账户，贷记“（   ）”账户。",
		answers: [
			"银行存款"
		],
		isFAQ: true
	},
	{
		question: "货币计量假设的主要内容是币值稳定。在此前提下，会计计量采用历史成本可提高会计信息的可比性。因此，采用（   ）是目前通行的做法。",
		answers: [
			"历史成本计量"
		],
		isFAQ: true
	},
	{
		question: "行政事业单位的会计要素有资产、负债、（   ）、收入和支出。",
		answers: [
			"净资产"
		],
		isFAQ: true
	},
	{
		question: "“短期借款”“应付职工薪酬”“应交税费”“应付股利”“其他应付款”“实收资本”“盈余公积”等项目，可以直接根据（    ）的余额填列。",
		answers: [
			"总账科目"
		],
		isFAQ: true
	},
	{
		question: "（   ）主要是指企业收到投资者出资额超出其在企业注册资本或股本中所占份额的部分，也就是“资本（或股本）",
		answers: [
			"资本公积"
		],
		isFAQ: true
	},
	{
		question: "在会计上有两种核算制度，即（      ）。",
		answers: [
			"权责发生制和收付实现制"
		],
		isFAQ: true
	},
	{
		question: "资产负债表中的“应交税费”项目，反映企业应交未交的各种税费。应根据“（    ）”账户的期末贷方余额填列。如果“应交税费”账户为借方余额，则表示多交的税金，应以“-”号填列。",
		answers: [
			"应交税费"
		],
		isFAQ: true
	},
	{
		question: "波特的行业竞争结构影响因素分析中不包括()",
		answers: [
			"政府管制机构"
		],
		isFAQ: false
	},
	{
		question: "实际中，（）必须与控制关键点原则相结合，集中精力于关键点的例外情况控制。",
		answers: [
			"例外原则"
		],
		isFAQ: false
	},
	{
		question: "市场创新的更多内容是通过企业的（）来进行的。",
		answers: [
			"营销活动"
		],
		isFAQ: false
	},
	{
		question: "关于企业战略创新的说法，以下选项错误的是（）。",
		answers: [
			"新来者面对巨大资源短缺也能成功的唯一途径"
		],
		isFAQ: false
	},
	{
		question: "制度结构规范了（）之间的正式关系，文化结构规范了作为类群或个体的参与者在企业生产经营活动过程中的（），层级结构规范了（）之间的正式关系。",
		answers: [
			"作为类群的企业不同参与者，非正式关系，作为个体的这些参与者"
		],
		isFAQ: false
	},
	{
		question: "寻找问题的“根本解”是指以下（）类型的组织学习。",
		answers: [
			"再学习"
		],
		isFAQ: false
	},
	{
		question: "市场控制的动因是（）。",
		answers: [
			"企业内部组织管理成本过高"
		],
		isFAQ: false
	},
	{
		question: "领导方式可以分成专制、民主、放任三种，其中民主型领导方式的主要优点是",
		answers: [
			"员工关系融洽，工作积极主动，富有创造性"
		],
		isFAQ: false
	},
	{
		question: "下列不属于管理“维持职能”的是（）。",
		answers: [
			"创新"
		],
		isFAQ: false
	},
	{
		question: "一位父亲为了鼓励小孩用功学习，向小孩提出：如果在下学期每门功课都考到95分以上，就给物质奖励。在（）情况下，小孩会受到激励而用功学习。",
		answers: [
			"上述三种情况同时存在"
		],
		isFAQ: false
	},
	{
		question: "风险评估的方法很多，其中采用热图定量或定性估计风险可能性及影响的风险评估方法是（）。",
		answers: [
			"风险地图"
		],
		isFAQ: false
	},
	{
		question: "关于创新的说法，以下选项错误的是（）。",
		answers: [
			"熊比特认为新的生产函数包括四种基本形式。"
		],
		isFAQ: false
	},
	{
		question: "“通过加强和支持手段，使得变革与创新活动锁定成为组织的新范式和新规范”是指理性组织变革的三个阶段模式中的（）。",
		answers: [
			"冻结"
		],
		isFAQ: false
	},
	{
		question: "关于风险管理，以下正确的是（）。",
		answers: [
			"它涉及管理目标的确定"
		],
		isFAQ: false
	},
	{
		question: "最具分权化特点的正式沟通网络是",
		answers: [
			"星式"
		],
		isFAQ: false
	},
	{
		question: "获取持久变革的动力不包括（）。",
		answers: [
			"创客时代的需求"
		],
		isFAQ: false
	},
	{
		question: "某公司销售部经理被批评为“控制的太多，而领导的太少”，据此你认为该经理在工作中存在的主要问题可能是",
		answers: [
			"事无巨细，过分亲力亲为，没有做好授权工作"
		],
		isFAQ: false
	},
	{
		question: "领导者角色理论中，“在组织及其环境中寻求机会，制定改进性方案来从事变革；对某些方案的设计进行监督”是对（ ）角色的描述。",
		answers: [
			"企业家"
		],
		isFAQ: false
	},
	{
		question: "以下属于信任激励的是",
		answers: [
			"允许犯错"
		],
		isFAQ: false
	},
	{
		question: "六西格玛管理的宗旨是消除无增值活动，缩短生产周期，（）。",
		answers: [
			"提高客户的满意度"
		],
		isFAQ: false
	},
	{
		question: "王先生是某公司的一名年轻技术人员，一年前被调到公司企划部任经理，考虑到自己的资历、经验等，他采取了较为宽松的管理方式，在（ ）情况下，王先生的领导风格最有助于产生较好的管理效果。",
		answers: [
			"企划部任务明确，王先生与下属关系差但职位权力弱"
		],
		isFAQ: false
	},
	{
		question: "在工作方法或程序与预期工作成果之间有比较明确或固定关系的常规性活动中，（）是主要的控制对象。",
		answers: [
			"活动过程"
		],
		isFAQ: false
	},
	{
		question: "文化、战略以及环境等因素的不同组合形成了组织文化的不同类型，以下选项中错误的是",
		answers: [
			"大团体型组织文化"
		],
		isFAQ: false
	},
	{
		question: "在工作成果较难衡量而工作过程也难以标准化、程序化的高层管理和创新性活动中，（）是主要的控制对象。",
		answers: [
			"工作者的数字和技能"
		],
		isFAQ: false
	},
	{
		question: "职工成绩评定不包括",
		answers: [
			"给职工委派任务"
		],
		isFAQ: false
	},
	{
		question: "以下不属于反馈控制的作用的是（）。",
		answers: [
			"在非周期性重复活动中，可以避免下一次活动发生类似的问题"
		],
		isFAQ: false
	},
	{
		question: "德鲁克认为七种创新来源中，与其他类型的创新相比，（）创新具有最漫长的前置期。",
		answers: [
			"知识性"
		],
		isFAQ: false
	},
	{
		question: "管理者在组织管理活动的实践中必须遵循的基本原理不包括()",
		answers: [
			"权变原理"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"通过增加投入，改变自己的相对报酬"
		],
		isFAQ: false
	},
	{
		question: "（）能够监督各种管理信息真实、正确、合理、合法，推动各项内部控制制度的健全适用和有效实施，从而维护组织财产的安全，促成管理目标的实现。",
		answers: [
			"内部审计"
		],
		isFAQ: false
	},
	{
		question: "组织变革的资源路径依赖因素除了企业核心能力和企业家行为因素还包括（）。",
		answers: [
			"企业文化"
		],
		isFAQ: false
	},
	{
		question: "委员会方式是（  ）正式沟通网络的实际应用",
		answers: [
			"全通道式"
		],
		isFAQ: false
	},
	{
		question: "企业进行经济活动有一定的活动背景，下列不属于此活动背景的是（）",
		answers: [
			"企业外部活动的成果需要到内部去实现"
		],
		isFAQ: false
	},
	{
		question: "日本松下电器公司的创始人松下幸之助曾有一段名言：当你仅有100人时，你必须站在第一线。但如果发展到1000人，你就不可能留在第一线，而是身居其中。当企业增至10000名职工时，你就必须退居到后面，并对职工们表示敬意和谢意。这段话说明",
		answers: [
			"企业规模扩大之后，管理的复杂性随之增大，管理者也应有所分工"
		],
		isFAQ: false
	},
	{
		question: "企业发现不合格产品后追究当事人的责任且制定防范再次出现质量事故的新规章，发现产品销路不畅而相应做出减产、转产或加强促销的决定，以上例子描述的控制进程是（）。",
		answers: [
			"反馈控制"
		],
		isFAQ: false
	},
	{
		question: "风险造成的损失和带来的影响可能是多方面的，因此涉及风险评估的原则中的（）。",
		answers: [
			"系统性原则"
		],
		isFAQ: false
	},
	{
		question: "财务比率中，（）衡量了公司应用资产来产生利润的效率和效果程度。",
		answers: [
			"收益率"
		],
		isFAQ: false
	},
	{
		question: "多数大中型企业组织里最基本的控制方式是（）。",
		answers: [
			"层级控制"
		],
		isFAQ: false
	},
	{
		question: "关于组织文化的特征，下列说法中错误的是",
		answers: [
			"组织文化的核心是组织精神"
		],
		isFAQ: false
	},
	{
		question: "以下不属于工作扩大法的是",
		answers: [
			"将一道工序改为几个人共同负责"
		],
		isFAQ: false
	},
	{
		question: "以下（）是消除变革抵触情绪的方法中的教育和沟通的优点。",
		answers: [
			"人们一旦被说服，就往往会帮助实施变革"
		],
		isFAQ: false
	},
	{
		question: "在企业具体的核心能力的载体中，刚性特征最为明显的是（）。",
		answers: [
			"企业非人力资本"
		],
		isFAQ: false
	},
	{
		question: "当冲突水平过低时，组织内部特征为",
		answers: [
			"冷漠、迟钝、对变化反应慢、缺乏新观念"
		],
		isFAQ: false
	},
	{
		question: "在一个大雪的冬天,天上下着鹅毛大雪。几个秀才烘着火炉在饮酒作乐。一位秀才建议赋诗,大伙赞同。第一位说:“大雪纷纷落地。”第二位说:“今年一定瑞气。”第三位说:“再下三天何妨。”此时一位饥寒交迫的农夫从这里经过,听见此话,不禁大喝一声:“放你娘的狗屁。”试分析,下面的结论哪一个更有说服力。农夫的话表明____________。",
		answers: [
			"环境影响人的判断"
		],
		isFAQ: false
	},
	{
		question: "一个人又想买房又想买车，然后手头资金有限无法同时满足这两个愿望。以上描述的冲突是个体冲突中的",
		answers: [
			"接近-接近型冲突"
		],
		isFAQ: false
	},
	{
		question: "为了成为有效的全球化管理者，必须具备一些关键的知识与能力，以下不属于这些知识与能力的是()。",
		answers: [
			"观察能力"
		],
		isFAQ: false
	},
	{
		question: "下列不符合职务说明书的内容的描述是",
		answers: [
			"任职者的专业背景与经验积累"
		],
		isFAQ: false
	},
	{
		question: "关于“不要把鸡蛋放在一个篮子里”是说明（）的风险管理方式。",
		answers: [
			"风险分散"
		],
		isFAQ: false
	},
	{
		question: "俄亥俄州立大学的研究中，下面哪个模式是既关心生产又关心员工，可以带来高绩效和高满意度。",
		answers: [
			"高定规-高关怀"
		],
		isFAQ: false
	},
	{
		question: "塑造组织文化时应该注意",
		answers: [
			"组织领导者的模范行为在组织文化的塑造中起到号召和导向作用"
		],
		isFAQ: false
	},
	{
		question: "（）是六西格玛管理中最重要的角色，他们从事六西格玛改进项目，是成功完成项目的技术骨干，是组织的核心力量。",
		answers: [
			"黑带"
		],
		isFAQ: false
	},
	{
		question: "假定请你主持召开一个由公司有关“智囊”参加的会议，讨论公司发展战略的制定问题。如果在会上你听到了许多与你观点不同的意见，而且你也知道这些意见有失偏颇是因为发言者掌握的资料不全。对此你认为最好采取哪一种做法？",
		answers: [
			"补充提供资料，对一些重要问题也适时表达一下自己的看法"
		],
		isFAQ: false
	},
	{
		question: "如果发现一个组织中小道消息很多，而正式渠道的消息很少，这意味着该组织",
		answers: [
			"正式沟通渠道中消息传递存在问题，需要调整"
		],
		isFAQ: false
	},
	{
		question: "“当环境发生变化时，行为人可以主动调解需要、动机甚至目标来改变行为的方向和方式。”以上描述的是动机的（  ）特点。",
		answers: [
			"可塑性"
		],
		isFAQ: false
	},
	{
		question: "制定计划方案不包括（）工作",
		answers: [
			"修改方案"
		],
		isFAQ: false
	},
	{
		question: "康全公司是一家设计环保设备的公司，经营规模虽然不大但发展迅速。公司成立以来，为了保持行动的统一性，一直实行较强的集权，当____________时，公司更有可能改变其过强的集权倾向。",
		answers: [
			"公司经营业务范围拓宽"
		],
		isFAQ: false
	},
	{
		question: "张教授到某企业进行管理咨询。该企业总理热情地接待了张教授，并介绍公司的具体情况，才说了15分钟，就被人叫了出去，10分钟后回来继续，不到15分钟，又被叫出去。这样，整个下午总经理一共被叫出去10次之多，使得企业情况介绍时断时续，这说明",
		answers: [
			"总经理可能过度集权"
		],
		isFAQ: false
	},
	{
		question: "按照风险事故发生后果的严重程度，风险因素可以划分为（）。",
		answers: [
			"ABC"
		],
		isFAQ: false
	},
	{
		question: "决策追踪与调整的原则，以下除了（）之外其他都是要考虑的",
		answers: [
			"实践性与理论性相结合的原则"
		],
		isFAQ: false
	},
	{
		question: "以下不属于超Y理论的基本观点的是",
		answers: [
			"组织方式的相同性"
		],
		isFAQ: false
	},
	{
		question: "（）是（）基础上的发展，而（）则是（）的逻辑延续。针对空格选择以下最合适的一个选项。",
		answers: [
			"创新，维持，维持，创新"
		],
		isFAQ: false
	},
	{
		question: "企业创新决策涉及创新基础选择、创新对象选择等多个方面，以下描述错误的是（）。",
		answers: [
			"创新水平选择涉及率先行动以取得先发优势或模仿先行者但仍努力后发制人"
		],
		isFAQ: false
	},
	{
		question: "以下不属于具体或微观环境的是()",
		answers: [
			"技术环境"
		],
		isFAQ: false
	},
	{
		question: "相对于个人决策而言，群体决策既有其优点，也存在着比较明显的缺点。因此，必须根据所做决策的具体情况，决定采用相应的决策方式。以下几种情况中，通常不采取群体决策方式（）",
		answers: [
			"决定一个重要副手的工作安排"
		],
		isFAQ: false
	},
	{
		question: "管理者在组织管理活动的实践中必须遵循的基本原理不包括()",
		answers: [
			"权变原理"
		],
		isFAQ: false
	},
	{
		question: "以下不属于工作轮换方法的是",
		answers: [
			"培养经营骨干的管理人员轮换"
		],
		isFAQ: false
	},
	{
		question: "以下不属于组织文化的特征的是",
		answers: [
			"以不变应万变，始终保持绝对稳定性"
		],
		isFAQ: false
	},
	{
		question: "采取工作轮换的方式来培养管理人员，其最大的优点是有助于",
		answers: [
			"增强受训者的综合管理能力"
		],
		isFAQ: false
	},
	{
		question: "（）是成功推行六西格玛管理的关键因素。",
		answers: [
			"高层领导"
		],
		isFAQ: false
	},
	{
		question: "科学管理理论着重研究的是()",
		answers: [
			"提高单个工人的生产率"
		],
		isFAQ: false
	},
	{
		question: "下列不属于间断强化的是",
		answers: [
			"连续强化"
		],
		isFAQ: false
	},
	{
		question: "因为与供应商、顾客、政府机构等之间的相互依存关系而发生冲突，这种冲突是",
		answers: [
			"组织间冲突"
		],
		isFAQ: false
	},
	{
		question: "关于组织文化正确的说法是",
		answers: [
			"变化较慢，一旦形成便日趋加强"
		],
		isFAQ: false
	},
	{
		question: "在管理方格图中，“领导方式高度关心生产，很少关心人，为达到生产目的，常常会强制人们去完成必要的任务”描述的领导方式是",
		answers: [
			"任务型管理"
		],
		isFAQ: false
	},
	{
		question: "一般而言，造成偏差的原因多种多样，较为复杂，但基本可以分为三类，以下不属于这三类的是（）。",
		answers: [
			"相关工作人员的失误"
		],
		isFAQ: false
	},
	{
		question: "作为企业的总裁，王晶在近几个月里一直都在寻找时间来思考一下公司的长远发展问题。这个星期他加班加点把手里的一些琐事都处理完了，从今天开始他准备不受干扰地集中考虑重大问题。一大早他就坐在办公室考虑这个问题。但好景不长，上班时间一到每隔二十分钟左右就有人进来签字或者请示。 王晶非常恼火。你认为这种情况的原因最可能是",
		answers: [
			"王晶可能比较集权"
		],
		isFAQ: false
	},
	{
		question: "不属于组织文化潜层次精神的是",
		answers: [
			"道德规范"
		],
		isFAQ: false
	},
	{
		question: "风险识别方法中的（）适用于各类企业的风险识别。",
		answers: [
			"组织结构图示法"
		],
		isFAQ: false
	},
	{
		question: "“中等程度的坚持己见，中等程度的合作”描述的抑制冲突策略是",
		answers: [
			"妥协"
		],
		isFAQ: false
	},
	{
		question: "在情境领导模型下，参与型领导的任务和关系行为是",
		answers: [
			"低任务/高关系行为"
		],
		isFAQ: false
	},
	{
		question: "企业所选择的管理者本身就应该具备正确的伦理道德观念，这表明的是（）。",
		answers: [
			"文化控制"
		],
		isFAQ: false
	},
	{
		question: "下列关于伦理说法正确的是",
		answers: [
			"合乎伦理的管理超越了法律的要求"
		],
		isFAQ: false
	},
	{
		question: "实现组织目标的直接环节是以下选项中的（）。",
		answers: [
			"具体操作活动"
		],
		isFAQ: false
	},
	{
		question: "一份英国杂志比较了欧洲各国经理的习性和处事手法后得出这样的结论：法国经理最“独裁”，意大利经理最“无法无天”，德国经理最“按意气办事”，英国经理最不能“安于位”。各国经理的习性和处事法的不同，最有可能是因为",
		answers: [
			"各国的文化传统不同"
		],
		isFAQ: false
	},
	{
		question: "下列不属于现代企业制度基本特征在的是（）",
		answers: [
			"职业经理人实际控制企业"
		],
		isFAQ: false
	},
	{
		question: "管理过程是各职能活动相互交叉,周而复始的不断循环的过程,一项管理措施,管理活动的执行,所起的作用往往也不是单一的。下面哪些管理方法当中包含了激励的作用? ()",
		answers: [
			"以上都是"
		],
		isFAQ: false
	},
	{
		question: "下列关于组织文化的说法中不正确的是",
		answers: [
			"仁者见仁，智者见智，组织文化应该使组织成员面对某些伦理问题时产生多角度的认识"
		],
		isFAQ: false
	},
	{
		question: "柔性作业系统是（）的产物。",
		answers: [
			"市场竞争"
		],
		isFAQ: false
	},
	{
		question: "田力是某大型企业集团的总裁助理,年富力强,在助理岗位上工作的十分出色。他最近被任命为集团销售总公司的总经理,从而由一个参谋人员变成了独立部门的负责人。下面是田力最近参与的几项活动,你认为这其中的哪一项几乎与他的领导职能无关（）",
		answers: [
			"与某用户谈判以期望达成一项长期销售协议"
		],
		isFAQ: false
	},
	{
		question: "在(   )的正式沟通网络中，会出现成员们只可以与相邻的成员相互沟通，而与较远的成员缺乏沟通渠道这种情况。",
		answers: [
			"环式"
		],
		isFAQ: false
	},
	{
		question: "需要选聘的人员来自组织外部，其具体来源不包括",
		answers: [
			"招聘广告"
		],
		isFAQ: false
	},
	{
		question: "关于“分工原则不仅体现在与产品制造过程相关的生产劳动中，而且体现在与生产过程协调有关的管理劳动中”的描述，以下选项更贴切的是（）。",
		answers: [
			"分工细致，权责明确"
		],
		isFAQ: false
	},
	{
		question: "人员配备的主要任务不包括",
		answers: [
			"充分开发和挖掘组织内外的人力资源"
		],
		isFAQ: false
	},
	{
		question: "“它将调整组织运作方式，往往波及许多变革计划”这个特征是指组织变革的四条路径中的（）。",
		answers: [
			"改造"
		],
		isFAQ: false
	},
	{
		question: "深化创新就是利用对前一阶段成果的良好信任，改革与愿景规划不相适应的体制、结构、政策；培养、任用、晋升能执行愿景规划的员工。这些说法涉及创新领导的（）。",
		answers: [
			"巩固已有成果"
		],
		isFAQ: false
	},
	{
		question: "创新管理决策涉及多个方面，以下不属于创新决策逻辑的是（）。",
		answers: [
			"创新战略的选择"
		],
		isFAQ: false
	},
	{
		question: "作为危机管理的最高权力机构和协调机关的是（）。",
		answers: [
			"危机处理小组"
		],
		isFAQ: false
	},
	{
		question: "衡量组织偿还流动负债能力的财务比率是（）。",
		answers: [
			"流动性比率"
		],
		isFAQ: false
	},
	{
		question: "当组织对风险进行评估后发现，一步到位开展某项经营活动的风险太大却组织难以承担时，应选择的风险规避方式是（）。",
		answers: [
			"试探承担部分风险"
		],
		isFAQ: false
	},
	{
		question: "政府信息化的主要内容不包括（）。",
		answers: [
			"G2O"
		],
		isFAQ: false
	},
	{
		question: "组织文化的特征不包括",
		answers: [
			"绝对性"
		],
		isFAQ: false
	},
	{
		question: "组织创新者呈现出不同的形式和风格，扮演不同的关键角色，不包括（）。",
		answers: [
			"围观者"
		],
		isFAQ: false
	},
	{
		question: "组织文化不包括哪个因素",
		answers: [
			"组织素养"
		],
		isFAQ: false
	},
	{
		question: "以下情况中不需要管理者修订标准的是（）。",
		answers: [
			"工作本身造成了偏差"
		],
		isFAQ: false
	},
	{
		question: "某企业在成立之时根据业务活动的相似性设立了生产、营销、财务等各个管理部门，近年来，随着企业的发展壮大，产品由原来的单一品种发展出三个大的品种， 它们的制造工艺和用户特点有很大不同，因此各个部门的主管都感觉到管理上有诸多不变。在这种情况下企业应当进行____________组织结构调整",
		answers: [
			"按产品划分部门"
		],
		isFAQ: false
	},
	{
		question: "难以辨认的字迹、沟通双方使用较难听懂的语言、固有的成见、身体的不适，以上描述的是沟通过程的（ ）要素",
		answers: [
			"噪声"
		],
		isFAQ: false
	},
	{
		question: "下列关于强化理论的说法正确的是",
		answers: [
			"该理论过于强调对人的行为的限制和控制，而忽视了人的内在心理过程和状态"
		],
		isFAQ: false
	},
	{
		question: "反映企业流动资产中可以立即用于偿付流动负债的能力的是（）。",
		answers: [
			"速动比率"
		],
		isFAQ: false
	},
	{
		question: "员工培训的主要目标是",
		answers: [
			"培养他们的岗位职务所需的操作技能"
		],
		isFAQ: false
	},
	{
		question: "当争论的问题对你不是很重要或者你希望为以后的工作建立信任时，你应该采取的抑制冲突策略是",
		answers: [
			"迁就"
		],
		isFAQ: false
	},
	{
		question: "以下关于双因素理论说法错误的是",
		answers: [
			"当保健因素很好时，人们会因此而产生积极的工作态度"
		],
		isFAQ: false
	},
	{
		question: "关于“备份计算机文件并将备份文件隔离存放，有助于起到减少损失的作用”是说明（）的风险管理方式。",
		answers: [
			"损失减低管理"
		],
		isFAQ: false
	},
	{
		question: "（）指在经济环境没有变化时发生损失的可能性，通常是由自然客观因素或者人们的错误或不当行为而造成的。",
		answers: [
			"静态风险"
		],
		isFAQ: false
	},
	{
		question: "20世纪80年代,面对日本所取得的经济成就,日本企业管理模式一时间引起了世界各国企业的关注和借鉴。但90年代,特别是东南亚金融风暴出现之后,一方面显示了美国经济的强大活力,另一方面也反映出日本经济脆弱的一面。此时许多人又下结论,日本企业管理模式已经过时,美国企业管理模式更加有效。对于这种情况,你赞同以下哪种说法?",
		answers: [
			"每种管理模式都有其自身的环境适应性与局限性"
		],
		isFAQ: false
	},
	{
		question: "信息技术在企业价值链中的应用的主要表现不包括（）。",
		answers: [
			"供应商管理信息化"
		],
		isFAQ: false
	},
	{
		question: "战术计划是在战略计划指导下制定的，是战略计划的落实",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "能实现最小的成本的计划是有效率的",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "根据对企业经营范围影响程度和影响时间长短的不同，可以把计划分类为长期计划，中期计划和短期计划",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "根据戴维·麦克利兰的研究，对一般职员来说，成就需要比较强烈。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "当组织规模一定时，管理幅度与组织层级呈现出反比例关系。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "保健因素同工作内容有关，激励因素与工作环境有关。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "迈克尔•波特的五种力量模型只适用于企业",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "通常用来指导组织战略决策的目标是短期目标",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "战术计划是在战略计划指导下制定的，是战略计划的落实",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "有效的领导方式与环境和个性无关。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "双因素理论认为，消除了人们工作中的不满意因素，就会使工作结果令人满意。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在领导生命周期理论中，“四种领导方式”不能主观确定哪一种领导方式最好。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "泰勒是第一个全面系统的提出管理的计划、组织、指挥、协调与控制五项职能。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "根据激励理论，增加职工的工资就能提高他们的工作积极性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在紧急情况下，专制式的领导是必要的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "能以合理的代价实现目标的计划是有效率的",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "科学思维不包括市场思维",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "费德勒模型认为，某一领导方式的有效性与他是否和其所处的环境相适应无关。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "企业中管理干部的管理幅度，是指所管理的全部下属数量",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "拟订和选择行动计划不包括修改计划",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "目标或使命决定了组织的性质，是不同组织相互区别的主要标志",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "决策树方法是比较不同方案平均收益值的决策方法",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "关于组织内部员工的提升是否能真正起到激励作用，还取决于组织内部提升工作做的是否完善",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "组织人力资源培训，是为了实现组织与个人的共同成长",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "行为决策代表性模型不包括DHS模型",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "扁平化的优点在于减少组织层级，便于高层管理者了解各科层组织的运行情况。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "阿吉利斯认为，领导方式会影响人的成熟过程，如果让职工长期从事简单的重复性工作会造成依赖心理，从而阻碍其向成熟发展。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对绩效进行全面的评价与提高组织的道德标准或提升员工道德修养无关",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "表彰和奖励能起到激励的作用，批评和惩罚不能起到激励的作用。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "提升内部员工是填补组织内部空缺的最好办法。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "马斯洛认为只有个体低级层次的需要得到完全满足后，才会转向追求更高层次的需要。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "每个人都有一些基本的需要，但不同的人，其基本需要的内容不同。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "非正式沟通是正式沟通的重要补充形式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "师徒传承法的优点是可以避免不合理操作习惯的模仿",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矩阵制组织结构是最早出现的一种组织结构形式",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "战术计划是战略计划的依据",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "计划是关于组织未来的蓝图，是对组织在未来一段时间内的目标和实现目标 途径的策划与安排。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "根据计划的程序化程度，可以把计划分类为程序性计划和非程序性计划",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "一个优秀的领导通常是以一种领导方式为主。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "非正式沟通就是传播小道消息，应予以杜绝。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "分权式的领导总比独裁式的领导更有效。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "领导者只要拥有职权，就会对下属有激励力和鼓舞力。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "领导采用的领导方式应与下属的“成熟”程度一致。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "分红是物质性奖励。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "为缩小现状与目标之间的差距，可以在现状的基础上力求改进，随着时间的推移不断地逼进目标，也可以通过变革现状缩小差距",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "领导工作是组织结构中一种特殊的人与人的关系，其实质是影响。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "管理不仅需要理性分析，也可借助直觉判断",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "一般认为管理过程学派的创始人是法约尔",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "简述双因素理论。",
		answers: [
			"美国心理学家赫茨伯格提出了双因素理论。其中，使人们感到不满意的因素往往都是属于工作环境或外界因素方面的，被称为保健因素；使人们感到满意的因素往往都是属于工作本身或工作内容方面的，被称为激励因素。保健因素只能消除不满意，激励因素才是调动人们积极性的关键。当保健因素恶化到可以接受的水平以下时，就会使得人们对工作产生不满；当保健因素很好时，人们并不会因此而产生积极的工作态度。当激励因素不足时，人们并 不会对工作产生不满；当激励因素上升到一定的水平时，人们会产生积极的工作态度和对工作的满意感。"
		],
		isFAQ: true
	},
	{
		question: "决策追踪与调整的原则",
		answers: [
			"（一） 科学性与全面性相结合的原则（二） 相对性与系统性相结合的原则（三） 指挥与授权相结合的原则（四） 可比，性与可操作性相结合的原则（五） 任务与关系相结合的原则"
		],
		isFAQ: true
	},
	{
		question: "人员配备的任务是什么？",
		answers: [
			"（—）为组织岗位物色合适的人选；（二） 促进组织结构功能的有效发挥；（三） 充分开发和挖掘组织内的人力资源；（四）促进人的全面和自由的发展"
		],
		isFAQ: true
	},
	{
		question: '大型连锁零售企业的B2B信息化应用 ——以苏宁电器为例 南京大学商学院陈曦 一、背景 苏宁电器的年度决算报告摆在了公司董事长张近东的办公桌上。从财务报表上看来，过去的一年情况不算坏。自从落实了第一期与多家供应商的B2B信息系统项目后，为保证项目的顺利实施，苏宁电器对管理结构和部门进行了较大服务的调整，所幸随着项目的进展，没有出现太大的纰漏，而且现在很多部门都围绕新的职能和流程运转起来了，这让张近东悬着的心放了下来。 但是，如果要从这些报表中看出B2B信息化带来的“好处”，好像就不是那么明显了。张近东立刻把信息中心的何经理和财务部的陆经理叫到办公室，他需要了解B2B的好处到底在哪里。财务部的陆经理告诉他，信息化带来了订单管理费用减少约500万元，库存周转率提高约20%，订单的及时性达到90%以上，准确性达到95%以上，平均送货周期为5天以内等这些好处。 不过，这些好处是否就可以归结为B2B信息化带来的好处?信息中心的何经理认为，与其把这笔账的功劳算在B2B上，还不如说是支撑B2B信恩化项目顺利实施和运行的管理制度上更为切合。比如，就采购制度来说，过去存在的问题主要是采购盲目性大，存货周期长，与供应商以及公司各门店的信息流通不畅等。这些问题通过B2B信息化得到了很大改善,不但降低了供应商和苏宁的运营成本，还提高了双方物流和资金流的速度。 二、连锁零售企业B2B信息化目标 事件还要追溯到十几年前，年轻的张近东刚刚进入零售业，苏宁在南京宁海路上一间200平米的店面中开业，专门从事空调零售。家电零售业不需要生产，相比较而言,更重视上下游的流通,所以供应链是零售企业业务与信息化的核心。可以说，降低运作成本是行业竞争的关键所在。然而，降低成本是零售企业最薄弱的环节。 经历了1993年至1996年的发展阶段，1996年至1998年的探索扩张阶段，苏宁电器在1999年以后迎来了全面升级阶段。从那时起，苏宁为顺应市场变化，开始实施综合电器连锁经营战略,由单一销售空调转为各种家用电器如冰箱、彩电、洗衣机、通信和小家电等的销售。截至2009年，苏宁电器连锁网络覆盖中国大陆30个省，300多个城市、香港和日本地区,拥有1000家连锁店,8O多个配送中心、3000家售后网点,纷繁复杂和数量日益增多的连锁店给苏宁的供应链管理提出了新的挑战。 2004年，苏宁实现业务收入约为9.12亿元，其中净利润约为1.74亿元。在当时的经济形势下，这样的成绩自然是光鲜的事情，但是同时，包括张近东在内的董事会发现一个重大问题:订单的交付水平在不断下降。起初，大家都觉得，只要销售总量上去了，订单的交付偶尔发生波动也是很正常的。但是，类似情况不定期经常出现，订单准时交付率从原先公司规模较小时的超过90%下降到如今的不到80%，甚至有时一周内的准时交付率还会低于70%，而且不仅仅是一家供应商如此，大家都这样，现象具有非常强的普遍性。 上述感觉令张近东焦急万分，他认识到必须进行管理整顿。但如何整顿呢?他请来了流程管理顾问，并坦诚地向顾问说明了自己遇到的难题。顾问在做了多方面调研之后,仔细分析得出以下结论:(1)苏宁电器所销售的电器种类的增多，增加了整条家电零售供应链系统的复杂程度。(2)面对日益复杂的供应体系和日益旺盛的市场，管理机构的变革显然落后了，几乎没有与时俱进的新办法出台。从上述观点的角度出发，苏宁B2B电子商务平台的建设肩负着供应链系统的重要一环。 在苏宁电器的门店中，销售的电器品种已经达到了几万种，这也意味着苏宁供应商的数量是惊人的。在这种情况下，供应链管理的脱节必然会带来很大的问题，而从前由于考虑成本以及IiT技术的落后，苏宁与供应商之间的数据、信息相互封闭，供应商根本不可能掌握苏宁的销售、库存、促销等数据信息。事实上,作为供应链上下游联系紧密的双方，只有实现面对面的公开化，让对方都了解自己目前的运营状况，才能心中有底采取正确和及时的行动，避免不合理库存的产生,从而实现顺利的销售。比如从订单这方面来看,如果信息系统能够得到完善，就可以借助自动订单补货系统，实现精准及时进货或者补货。当相应的一系列的系统建立后，苏宁这些环节的竞争力就会有较大的优势。针对的连锁零售企业供应链上的劣势，B2B信息化似乎是个比较不错的选择。 三、苏宁电器B2B信息化解决方案 多年来,苏宁电器视信息化为企业神经系统，在董事长张近东的领导与信息化中心各位成员的鼎力支持下，苏宁在集团内部建立了集数据、语音、视频、监控于一体的信息网络系统，有效支撑了全国300多个城市、数千个店面、物流、售后、客服终端运作和十多万人的一体化管理。在优化自身运营的同时，信息系统更是苏宁改善与供应商关系的重要手段。 家电零售企业作为直接面向消费者的服务性企业,必须要知道自己什么时候该干什么事，比如客户何时需要配送、安装、维修，供应商何时能到货。这不仅取决于对供应商定单状态的管理，还需要把整个环节串联起来。对零售业来说，首先需要是做大规模、压低成本，而涉及的成本首先是物流成本和管理成本。这两类成本。很大一部分体现在供应链的合理整合上。苏宁知道，如果不能建立一个稳定的可持续发展的“生态系统”，自己即便处在“食物链顶端”意义也不大。正因为如此,苏宁一直十分注重加强厂商合作，坚持与国内外供应商探讨供应链整合。在不同时期，苏宁根据上游的供应商规模和需求不同，合作共建了多种创新的供应链模式。 苏宁目前有1000多家零售终端门店，供应商数量众多，供应链的运作相当复杂。对于下游业务，苏宁电器需要通过分布在全国的门店，将商品销售给最终消费者:对于上游业务，苏宁电器同时从商品、采购计划、订单、收发货、结算对账、信息交流等多方面和供应商进行沟通,包含物流、资金流、信息流等。因此，供应链上的每一环节增值与否、增值的大小都会成为影响苏宁电器以及上游供应商各自的竞争能力。 为建立与供应商的无缝链接,苏宁电器全力打造连锁经营的“IT神经网络”"。2004年总投资1.36亿元，启动中国零售业信息化一号工程。2005年6月，苏宁电器和索尼联姻，确立知识管理和数据库营销的基本工作方式，标志着中国家电和消费电子类产品的供应链管理从上游厂商的制造环节，延伸到零售渠道环节，在技术上实现供应商管理库存。随后，苏宁电器与三星也实现了B2B或功对接，双方围绕客户需求分析、终端商业设计、产品展示演示、产品零售技术等“一体化”实施全程合作。为此，苏宁电器投入逾9000万元。2006年4月SAP/ERP在全国苏宁成功上线。建立了国际一流信息平台和功能强大的网链结构，实现了跨区域、跨行业的紧密协作，产生巨大的产业合力。 苏宁合作最深入的是三星公司，从2006年起，其ERP系统基本流程已与苏宁全部打通,包括订单、发货、收货、结算清单、对账、销售数据、库存数据这几个方面。目前，苏宁与索尼、三星等供应商都建立了以消费者需求和市场竞争力为导向的协同工作关系。苏宁实施“基于B2B的供应链系统”，目的是通过厂商间计划协同，提高相互数据交互的简单化、标准化、快捷化、透明化和信息化，最终实现双赢。 2007年，苏宁与海尔共建ECR——高效消费者响应的供应链管理模式，也是双方基于信息平台的良好互动关系而开创的供应链管理策略.这里有必要介绍一下ECR，ECR是现代供应链管理的一种全新模式，是一种在分销系统中，为降低与消除销售渠道与制造商体系中不必要的成本和费用,为消费者带来更大利益而进行密切合作的一种供应链管理策略。ECR的最终目标是建立一个具有高效反应能力和以客户需求为基础的体系，使零售与制造以业务伙伴方式合作，提高整条供应链的效率，以降低整条供应链体系的运作成本，同时为客户提供更好的服务。四、苏宁电器B2B信息系统 苏宁的B2B信息系统由三部分组成:公共平台、B2B功能模块和增值模块。公共平台提供了B2B平台中的基本功能，如协议转换、访问权限管理等，还包括对账系统和供应商安全认证系统,其中对账系统最重要的目标是实现与供应商的网上对账，达到交易双方（苏宁总部、分公司和上游供应商）财务数据、单据、报表交换的目的:供应商安全认证系统首先要保证登录平台的用户能辨认其用户身份:要保证信息的机密性及抗抵赖性:确保签署的单据具有法律效力。为此，苏宁B2B建立了从服务器认证、用户认证、单据数字签名等一整套安全认证平台。B2B功能包括业务流程管理、业务文档管理等;增值模块则提供了对内和对外的服务功能。通过B2B，将实现包括订单、发货、入库和销售汇总等数据的实时传递、交流。无论是苏宁的采购人员还是三星的销售人员，双方都基于一个共同的销售信息平台，决定采购供应和终端促销，在技术上实现供应商管理库存的功能。 苏宁的B2B作为SAP的延伸，是与SAP结合在一起的。在国内，苏宁已基本实现了与大型制造企业的全程互联,先进的技术手段保障了苏宁的业务发展，始终在同业间处于领先地位。实现苏宁与供应商及门店的全程互联，从项目实施角度来讲，实际上是比较复杂的，这涉及双方的流程，涉及变革。苏宁每一次进行B2B的工作，谈到更多的是业务流程，如发货，一周发几次货，一周开几次订单，哪些订单需要定期开，哪些订单是即时的，价格信息怎么调整,收发货的出库单和入库单、供应商开的增值税发票等全部都是一单对一单的――更多在谈如何将原来不规范的做法规范起来。 在开票、收发货等环节原本都会存在很多不规范的操作，什么货该收，什么不该收，出现什么情况的时候货要怎么退回去，很多流程都需要在B2B上体现出来，还包括日常性的样机处理、预测、补货的CPFR系统上的协同等。苏宁与摩托罗拉、三星之间都部署了CPFR，这些也都会在B2B上充分体现出来，真正将供应链上所有环节连接了起来。 目前苏宁B2B平台上运营的供应商已达一万多家，主要采用的方式有两种:一种是直联方式，即两个ERP之间的对接。直联方式接入的多为规模较大的供应商，包括三星、LG、摩托罗拉、海信、海尔，2009年又添加了长虹和夏普两大品牌:直连系统将苏宁的B2B平台与供应商的ERP系统进行对接，双方能够根据对方的业务数据快速地调整经营计划,苏宁可以进行采购、补货、物流的调整，供应商可以进行采购原料料、生产计划的变更。直连系统的数据传输技术采用Rosetta Net(致力于协同开发的开放式电子商务标准)，通过IBM WebSphereBusiness Connect (wBIC）来实现用户的业务流程及数据与其贸易伙侔实现共享。 另外一种是门户方式,由苏宁提供统一的平台，那些受技术条件限制的供应商可以登录门户，实现与直联相同的基本功能。门户平台对供应商提供了免费的FTP数据下载服务，供应商可以快速得到苏宁的销售数据来指导自己的生产。 B2B供应链系统最有突破性的地方在于它对流程的改造。B2B系统实施后，对采购、商品入库和与供应商的协作管理都带来了本质的改变,实现了流程再造。而且，使用了B2B平台之后，所有流程都在系统上跑，数据非常透明。正是通过各类B2B信息化技术,苏宁的供应链管理水平在充分的信息共享中不断得到提升。据了解，苏宁电器B2B项目已经获得国务院信息化工作办公室、科技部高新技术发展及产业司等机构联合评测的“2005年度中国企业信息化500强应用奖一最佳供应链管理应用奖”。 五、B2B信息化建设初见成效 随着观念和技术的不断进步，苏宁电器在上市之后斥巨资打造的B2B信息化平台开始在供应链整合中起着越来越重要的作用。信息化强有力地促进了苏宁在商业模式上的转变。从一开始的单纯的差价赢利，到门店多了，向上游供应商收取集道费、进场费、广告费、促销费，发展到优化上下游供应链，加快周转，减少损耗,最终靠品牌和服务取胜，信息系统功不可没。 综合起来,苏宁的服务信息系统对苏宁本身在效益方面带来的影响主要包括以下五方面: (一）成本效益 苏宁通过B2B向部分供应商开放数据能够得到可观的收益。根据苏宁电器目前的情况，一份订单的管理成本大约为40~50元，采用B2B系统网上订单后，一份订单的管理成本只为10~20元，按目前苏宁电器的规模，每年大约有50万份订单，项目实施后按25万份订单在网上进行，每份订单节约20元计算，每年大约节约成本500万元。 (二）信息集成 通过供应链上各方的数据交换(合同/协议、订单，出库单、入库单、发票、退厂单、结算单、市场数据等)，达到数据共享的目的，从而使整条供应链的透明度上升:同时，实现苏宁内部集团与分公司间、外部公司与供应商之间的信息集成和控制。 (三)供应链协同 在信息共享的基础上,苏宁电器通过供应链上各节点企业的业务流程的协同运作，达到整合和优化供应链的目的。由于采用电子采购、自动结算，大大简化了业务流程,缩短了交易周期，提高了物流的效率和速度。同时，供应商可以及时掌握各终端的销售和库存信息,便于提前对市场作出准确预测,及时安排生产，组织补货，从而增强了供应链整体的市场竞争力。创造出协同的供应链，包括供应链的上、中、下游的各个环节，生产、销售、物流等各个相互.作用的流程的合理整合。 通过信息化技术全面提升B2B系统,苏宁实现数据交流、自动下单、补货、自动结算等一系列的全数字化、标准化、流水线式的作业管理，与供应商实现全面、系统、透明的信息化战略。建立了现代化的物流配送系统，通过信息化平台进行实时采购，通过订单化采购，供应商按照苏宁全国的区域需求，进行物流最佳配送，节约采购成本35%以上，尤其是节约库存成本80%以上。 (四）建立“金字塔式”服务链 苏宁电器作为服务型企业，最根本的任务就是为顾客提供优质的服务。服务是苏宁的唯一产品，所有服务均建立在信息化平台上，涉及“售前一售中―售后”的全流程，建立了“连锁店一物流―售后一客服”的服务链条，四大终端构成了“金字塔”式的服务网络,前台的销售与后台的服务紧密协同,全天候作业，成为苏宁最具有竞争力的撒手锏，也是苏宁品牌最核心的要素。例如，苏宁创立了“5S”“阳光包”服务等，在“家电下乡”“以旧换新”等方面，发挥了巨大的作用，成为家电服务业的领先企业。 （五)提升与供应商的关系 苏宁和英特尔、海尔建立了跨领域产业链全方位合作平台，基本上形成了从技术研发、产品制造到市场销售整个产业链中各个环节的具体合作，目的在于实现三方资源的最有效整合、优势互补和市场竞争力最大化。利用苏宁的消费者信息优势，两家供应商可以更准确地把握市场，苏宁利用这个平台，可以获取海尔电脑和英特尔提供的最具价格优势的采购大单,在价值链重塑中三方均找到了自身的盈利点。 借助自身的信息平台，苏宁与相关厂商的信息实现互通。以IT产品为例，公司与主流叮厂商之间的合作已经实现了向B2B(厂商直接供应)模式的转变,目前已与众多厂家建立起直供的关系。这标志着苏宁和供应商的关系已从简单的上下游模式演变成了具有一定排他性的战略合作伙伴关系,这意味着公司能够在有限的供应商资源中比竞争对手占得先机。 苏宁电器在其创始人张近东的带领之下,通过坚持不懈的努力以及过去几个阶段的信息化战略调整，所取得的成绩是显而易见的，苏宁电器B2B信息化逐渐步入正轨。但是随着目前市场经济的不断发展和完善，连锁零售企业将面临更为激烈的竞争。陆经理口中这些振奋人心的数字是否应该全部归功于信息化?随着互联网技术的不断发展，苏宁的B2B信息化之路今后又将如何进一步保持优势?一长串的问号使张近东不禁又陷入了深思-…- 资料来源: 1.陈曦、马赫:《慢国美PK快苏宁》，《中国企业家》2014年第6期。2.逸凡、于小娟:《苏宁管理模式全集》，武汉大学出版社2010年版，第212-227页。 3.彭虎锋、黄漫宇:《新技术环境下零售商业模式创新及其路径分析——以苏宁云商为例》。《宏观经济研究》2014年第2期。 问题讨论: 1.控制包括很多类型，苏宁的B2B信息化包括了哪些控制?有哪些改善? 2.苏宁的这些信息化应用手段是否适合所有公司?企业在选择控制手段时,除了考虑效率还会考虑哪些其他因素?',
		answers: [
			"答案没搜到，需补充"
		],
		isFAQ: true
	},
	{
		question: "简述组织文化的功能。",
		answers: [
			"从组织文化的导向功能、凝聚功能、激励和约束功能、辐射功能、调试功能方面进行分析"
		],
		isFAQ: true
	},
	{
		question: "评述泰勒科学管理的基本思想。",
		answers: [
			"(―)改进工作方法，并根据工作的要求挑选和培训工人(二)改进分配方法，实行差别计件工资制(三)改进生产组织，加强企业管理"
		],
		isFAQ: true
	},
	{
		question: "请描述决策的制定过程",
		answers: [
			"决策过程通常包括识别问题，诊断原因，确定目标，制定备选方案，评价、 选择方案以及实施和监督六个阶段的工作"
		],
		isFAQ: true
	},
	{
		question: "简述计划编制的过程",
		answers: [
			"1-制定计划目标2.估量现状与目标之间的差距3.预测未来情况4.制定计划方案5.实施和总结计划方案"
		],
		isFAQ: true
	},
	{
		question: "评述西蒙决策理论的主要思想。",
		answers: [
			"1. 管理就是决策，决策贯穿于整个管理过程2.决策过程3.决策的准则4.程序化决策和非程序化决策"
		],
		isFAQ: true
	},
	{
		question: "简述领导权力的来源。",
		answers: [
			"从奖赏权力、强制权力、法定权力、参照权力和专家权力方面进行分析"
		],
		isFAQ: true
	},
	{
		question: "如何理解管理的本质？",
		answers: [
			"(—)管理是对人或对人的行为的管理(二)管理的本质是对人的行为进行协调（三）管理的科学性与艺术性（四）管理的自然属性与社会属性"
		],
		isFAQ: true
	},
	{
		question: "管理活动的基本原理有哪些？",
		answers: [
			"管理的基本原理是管理者在组织管理活动的实践中必须依循的基本规律。这 些规律主要有人本原理、系统原理、效益原理以及适度原理。"
		],
		isFAQ: true
	},
	{
		question: "简述学习和研究管理学的科学思维",
		answers: [
			"科学的管理思维是战略 思维、历史思维、辩证思维、创新思维以及底线思维的统一。战略思维是整体的思维、长期的思维、 系统的思维。历史思维，就是要“以史为鉴、知古 鉴今，善于运用历史眼光认识发展规律”，以把握前进方向，指导现实，走向未 来。辩证思维，就是要“承认矛盾、分析 矛盾、解决矛盾，善于抓住关键、找准重点，洞察事物发展规律”。创新思维要求破除迷信，因时制宜，知难而进，敢为人先。底线思维不仅指企业经营活动内容、 方向以及方式的选择要在道德和法律的框架内进行，而且强调企业活动目标的确 定要同时考虑期望达到的状况与水平以及目标活动中可以接受的不利结果的范围 和程度。"
		],
		isFAQ: true
	},
	{
		question: "马克思主义对学习和研究管理学的指导意义是什么？",
		answers: [
			"首先，要用辩证唯物主义与历史唯物主义的观点去分析管理理论与管理实践 的关系。其次，要用辩证唯物主义与历史唯物主义的观点去分析管理理论的一般抽象 与具体运用的关系。再次，要用辩证唯物主义与历史唯物主义的观点去分析作为管理对象的组织 活动与组织环境关系。组织活动是运用可支配资源提供社会所需服务的过程。"
		],
		isFAQ: true
	},
	{
		question: 'TESIRO通灵的知识管理 驻足华丽的通灵总部门外，望着发散出宝石光芒的""TESIRO""标志，公司总裁沈东军先生为公司取得的成就感到高兴和鼓舞———TESIRO通灵的前身是成立于1997年的本土珠宝品牌运营商“江苏通灵翠钻有限公司”"，现在已成长为一家年营业额达15亿元人民币的国内知名珠宝品脾。然而，作为一名管理学者的见识也让他陷入了深深的思考: 如何才能在企业中建立相互学习、共享知识的内部机制，通过结构化的驱动方式,将某个员工的发现、创意、心得、或者经验等迅速放大为整个组织的行为，并得以传承?这样,即使某一天这个员工离开了组织,组织也仍然能够高效运转。 在沈东军的大力推动下，TESIRO通灵非常强调组织学习和知识共享，形成了一系列有特色的知识管理制度和方法。TESIRO通灵将属于自己的组织知识贯穿到了公司的每一个角落。 一、公司简介 1997年，江苏通灵翠钻有限公司在南京成立，是一家以珠宝销售为主营业务的企业。2005年12月，江苏通灵翠钻有限公司与欧陆之星(Eurostar DiamondTraders）结盟，从此在中国使用“TESIRO”商标作为品牌商标，致力于优质切工钻石在中国的推广。目前，公司的组织结构如图1所示。   作为珠宝销售企业，公司管理的重点在于给顾客创造价值，通过这种顾客价值的最大化实现自身利润的最大化.为了在市场中获取核心竞争能力和优势地位，公司必须致力于有效的管理运作和迅速的品牌推广。因此，通灵珠宝股份有限公司非常强调知识流动和知识共享，形成了-系列有效的管理制度和管理方法。 通灵公司的组织管理系统非常强调将个人知识上升到组织层面,并加以固化和传承，公司有许多很有特色的管理制度和方法来促进组织知识建设，并且在实际运作中取得一些实效。 二、组织知识的获取 (一)组织知识的来源:员工建议广纳、细分 员工是一个企业的基本构成单位，因而要形成组织知识，员工的意见必不可少。在沈东军的观念中，“企业的成功就是让平凡的人做不平凡的事，充分发挥公司每一-位员工的知识，把个人竞争力变为企业竞争力”。因此，通灵尝试着“逼迫”员工提建议，把员工的工作建议列入绩效考核体系。仅2010- 2011 财年第一财季，通灵就收到了177条行政员工工作建议,其中有134条得到采纳或部分采纳。在这177 条建议中，有3条都来自财务部的陈林。他所提的建议都与自己的本职工作息息相关，也正是有了平时的工作经验和思考，他的建议均得到采纳，其中有两条在优秀员工建议评比中分获一、二等奖。然面，提建议仅是第一步，组织对于员工工作建议的处理态度和方式同样重要。通灵的管理者对接到的每一-份工作建议都给出认真、公开的答复，闸述采纳或者不采纳的理由。同时，通灵还拥有着一种集体参与的公开交流环境，使公司所有员工都能定期交流对- -些问题的看法，提出工作建议的员工对于敷衍的部门负责人可以进行申诉。这种强制性的标准化管理，能够让员工的知识贯穿于组织的成长脉络中，导致每-位员工都是管理者，与组织共享成长的力量。 (二)组织知识的提炼:火花碰撞分析会 中国有句古话，“授人以鱼，不如投人以渔"。组织知识就发挥这个“渔”的作用。企业必须建立一种内部机制，根据前人的理论和经验，结合自身的特点，在实践中提炼出指导公司发展的规律性的精华,将某个个体的成功发现、创意、感悟或经验、技能等迅速放大为整个组织行为。 通灵分析会制度正是这样的一一个提炼的过程，通灵公司通过各种委员会，对公司内部的管理问题进行查找、分析和解决。通灵的分析会本质上是一一个战略纠偏工具，所有分析会中解决的问题都会在公司内网上公开共享，并且也会监督其改进，参与分析会同样也与部门的奖励挂钩。 一个公司的组织知识体系，要求结合自己的行业特征、发展历史阶段、自己拥有的资源、企业文化等要素，从自身的需求出发，提炼出指导企业未来发展的规律性原则。分析会给管理者们做出了适时的提醒，让他们在纷繁复杂的知识面前能够意志坚定，排除掉不适用于本公司长远发展的各种问题，而提炼出对公司有益的知识精华，保证公司各项事务都能沿着正确的轨道前行。 (三)组织知识的固化:系统创新见真招 当种种组织知识的来源经过分析会的讨论，再结合TESIRO通灵的实际，被提炼成了组织知识的雏形。提炼的精华必领经过固化才能成为可以被人们理解的组织知识。TESIRO通灵通过系统创新制度的实施来固化组织知识。所谓系统创新制度，是指公司鼓励员工进行管理创新，并将创新的管理实践以申报“系统创新”的方式固化“下来，以便在全公司范围内共享，这正是野中郁次郎所提出的组织知识显性化和联合化的过程(Nonaka & Takeuchi, 1995)。 2010年柏林电影节迎来了60华涎，而赞助商争夺战也随着电影节组委会筹备工作的展开而硝烟四起。对于贵宾用珠宝，组委会要求从设计到做工都必须精益求精、大气优雅，对赞助商的要求也极其严格，设计、做工、细节、品牌名气等，都是能否胜出的重要因素。 在“60届"这样一个具有里程碑意义的电影节上, TESIRO通灵打败众多对手，成为唯--官方珠宝赞助商。因而他们将这个项目申报了公司的系统创新，把经验和知识的结晶固化下来。 李妍对于自己亲身参与其中感到十分兴奋。她介绍说，TESIRO 在此次柏林电影节上大放异彩，在比利时驻德大使馆内实施了“蓝色火焰周年庆”活动，电影节主席与国际著名导演张艺谋到场共贺，现场明星云集:镶嵌了5688颗蓝色火焰切工钻石的钻石柏林熊“作为柏林电影节60岁生日礼物: Shooing Day成为TESIRO的专属拍片日，当天10位Shooing Stars到场为TESIRO拍摄大片，其中各个主题系列产品被选用于后期的平面画册及媒体推广中。 三、组织知识的共享 (一)内刊:让知识走进员工的心 通灵的内刊创办于1998 年，每半个月发行一期，到现在坚持做了将近200期了。内刊最大特点就是其上面的新闻纯粹是对内宣传，其实就是在企业内部传播通灵的组织知识。TESIRO通灵的体制是连锁经营的体制，需要把组织的思想传递下去，通过这样一个报纸是很好的方法。 为了使内刊达到预期的效果，TESIRO 通灵设计了一套“结构“来驱动内刊传播组织知识。首先，组织员工定期学习是必需的。但是，通灵的相关绩效考核制度与其他企业有所不同，即内刊的学习牵涉到的利益不仅是个人的，还有所在部门的。在这样的集体中，自己的利益关系到大家的利益，通灵的员工通常都会很热情地去学习内刊，去理解通灵的组织知识。内刊会刊登组织的一些管理理念或方法:内刊也接受一些员工工作方法和工作心得的交流。TESIRO 通灵的每家门店都会有自己的内刊通讯员，这些通讯员将自己或自己部门]值得推荐的销售经验分享在内刊上，有时成为公司范围内[ ]店的标准，从而推动组织知识的共享。 (二)培训:“大家来分享” 培训是通灵公司组织知识共享的重要方式,员工可以- -起来分享各种专业知识和管理知识。通灵的培训体系包括三大部分:行政员工培训、专业技能培训和业务组织培训，通过这些课程的设置，组织中的知识得到了很好的分享和交流。为了鼓励大家积极通过培训来提升自己的知识和能力,通灵所有的培训课程都有学分，和员工的绩效评估以及升职相挂钩，同时公司还通过各种大赛来促进培训效果。 那么，如何促进拥有知识的员工来分享他们的知识呢?通灵公司主要是运用一些激励和选拔措施来建立自己的内部讲师团队。通灵公司的内部讲师分为两部分，一部分是管理培训师，他们主导了大部分管理知识课程，另一部分是专业培训师，他们负贵开设专业知识类课程。公司从内部选拔出讲师，让其承担相应的授课任务，并支付授课经费。除了物质激励外，内部讲师还可以作为加薪、升职的一个重要凭证。 四、组织知识的传承 组织知识如果不能在员工中传承下去，那也只能是个人知识，而不能称之为组织知识。怎样传承公司的组织知识? TESIRO通灵给出了自己的答案:固化的组织知识只有与组织的人力资源管理有机地结合，才能发挥出它最大的效用。 (一)大赛“亮剑” TESIRO通灵首先想到的是“以赛代练”的方法，重磅推出了每年一届的读报大赛。首先，我们来还原比赛当中几个真实的场景:进入比赛决赛的六支队伍出自通灵总部的行政部门和通灵下属的各家门店，六支队伍的啦啦队绝对铁杆，进入比赛会场:员工们头戴印有“必胜"二字的头巾，高喊着各个部门的口号。 读报大赛的比赛环节分为表演题、必答题、配音题和抢答题。表演题是非常新颖的题型，这个环节的设置可谓别出心裁一-围绕通灵 的组织知识，参赛选手可以借助各种表现形式进行呈现。配音题也是同样精彩，大家充分发挥自己的想象力，演绎着自己对各类管理知识和组织文化的理解。抢答题和必答题的题目主要来自当年通灵的内刊，场上的选手绝对是组织知识传承的楷模，是学习和运用组织知识的行家里手。 2010年的读报大赛的桂冠戴在了人力资源部，人力资源部的员工在谈到此次夺冠，一个个都非常兴奋，这也是TESIRO通灵在传承组织知识的过程中希望看到的--在快乐中， 在不知不觉中掌握了知识，并且以此为荣。 (二)跨部门辅导: 知识的对搂 TESIRO通灵里活跃着这样一群人一他们不是搞培训的老师，但是他们却引导通灵的新员工尽快领悟通灵的组织文化。人力资源主管苏维红认为，辅导员制度是传承组织知识的-个重要桥梁。 辅导员制度面向的对象是新员工,一般在新员工入职后三个月内进行。从人力资源的角度，一个新人进入一-个新的环境，在短时间内离职的概率是最高的。于是，通灵创建了辅导员制度，就是任命一些优秀的、被公司认可同时也认可和理解公司组织文化的资深员工为辅导员，而且辅导的对象必须是跨部门的。之所以选择跨部门辅导, -方面为了防止本部门的员工之间或多或少会有一些利益的关联导致无法进行深入的交流:另一方面，也向新员工介绍通灵的组织知识:以一个旁观者的角度，关注另一部门的新员工(辅导对象)个人或者部门遇到的问题，为其提供工作方法的指导，启示他们用更广阔的思路去思考问题。 TESIRO通灵的辅导员每个月要按照公司制定的“辅导手册”，至少和新员工沟通一次。到最终辅导结束的时候，辅导对象要按照评估表给自己的辅导老师打分，评估结果会向辅导员做-一个反馈。 组织定期评选“金牌辅导员"，加以物质和精神奖励，以激励这些辅导员对新员工进行知识共享。 TESIRO通灵也要求辅导员对新员工进行评价，辅导员会对辅导对象做一些考察，因为通灵在招聘的时候很强调人-组织匹配，即强调所招聘的员工能认可通灵的组织文化和管理制度。员工和辅导员在辅导期结束后，一般也会形成适当的"友谊”:通过非正式的-些渠道，辅导员继续给辅导对象传递工作经验和组织文化，或是与辅导对象交流各自对组织知识或是一些制度、方法的理解和认识。 五、知识管理的关键 在通灵公司已经构成了一套系统化的机制来推动组织知识的共享，所有的制度、举措都不再是孤立的一项项制度，而是整个管理系统的一个环节，并且最终都和公司的激励机制挂钩，即形成所谓的“结构驱动”管理模式,这也是它们能发挥作用的关键。员工遵循组织知识，再结合具体方法做出的成绩，让组织知识通过检验得以成型，并受到人们的重视。 TESIRO通灵每半年召开- -次财季大会，进行优秀员工的评优和表彰。当然除了颁奖，每个财季大会都会围绕着通灵的组织知识及其衍生物进行辩论赛。总裁沈东军就认为，“员工优秀还是一-般，取决于个人智力和能力的高低，也取决于所在企业组织知识的高低，还取决于他对组织知识掌握到什么程度"。所以，通过辩论赛的形式强化组织知识，加深员工对组织知识的掌握。 2010年12月的财季大会，就围绕着通灵的目标激励制度和员工满意度的关系进行了辩论赛，由此衍生出对“蜗牛奖”(“蜗牛奖”就是对绩效最差部门的一种称呼)的评选是否合适的探讨。作为正方的人力资源部认为“蜗牛奖"体现了通灵目标激励衔生出的排序管理的思想，而作为反方的运营中心则认为“蜗牛奖”伤害了员工的满意度，有违通灵的组织文化。事实上，对“蜗牛奖”的辩论，目的并不是为了单纯肯定或者否定“蜗牛奖”的实施，而是让大家明确，通灵的管理理念包括了目标激励和员工满意，从而使得这些管理理念深入员工内心。 财季大会的重头戏是颁奖，每一个奖项都包含了一个关键词的分享。比如，在颁出优秀行政管理部门奖时，关键词分享的是“协作”，而协作正体现了通灵知识共享的文化。优秀行政管理部门奖就是为了激励行政管理部门与各部门的交流和通力合作，这是一种以奖励的形式固化组织知识的手段。另外，最具行动力大奖体现的关键词是"行动"，行动力也是通灵所强调的，这种辩论和奖励也同样帮助通灵强化了他们的组织知识。 六、新的问题与困感 从通灵的管理实践来看，公司在知识管理方面取得了一定的实效，访谈中许多管理者和员工都提及了“公司鼓励我们知识共享“我非常想担任辅导员/调查委员”，等等。然而，随着组织进一步的在全国范围内扩张，新的问题也开始显现:首先，如何去进一步发挥更广大范围的员工的作用，将他们的聪明才智纳入到组织知识中来?随着公司在全国范围内市场和地域的扩张，公司现有的知识管理方法是否还适用?公司知识管理可能面临哪些新的难题呢?其次，可能更重要的是，如何有效地对知识共享和知识管理活动加以测评，从而进一步提升企业知 识管理的效果呢?或许，TESIRO通灵知识管理的发展，还有更长的路需要去走。 资料来源: 1.龙静、冯帆、杨忠:《企业知识共享的促进、阻碍与管理举措- 以江苏通 灵公司“组织智慧”构建为例》，《经济管理》 2012年第7期，第60-70 页。 2.沈东军:《组织智慧》 ，商务印书馆2008年版。 问题讨论 1.企业应 该怎样进行制度创新以促进知识共享? 2.结合知识管理过程， 谈谈如何实施组织文化的创新?',
		answers: [
			"答案没搜到，需补充。"
		],
		isFAQ: true
	},
	{
		question: "在组织理论中，组织协调机制主要有哪些形式？",
		answers: [
			"明茨伯格指出，不论企业釆用的具体协调方法有多少种， 都可以归纳为六种基本的机制①： (1)相互调适。通过私下沟通来达成协调的目的，如两个基层作业人员之间 的沟通。 (2)直接监督。由一个人向其他在工作上相关的人下达命令或进行指示，进 而达到协调的目的。 (3)工作程序标准化。为相关任务下的工作人员明确制定工作程序，以达成 协调的目的。这些标准通常由技术官僚制定，由作业层去执行。 (4)成果标准化或产出标准化。通过规定工作的结果来对组织成员的活动进 行协调或控制。 (5)技术(技能)以及知识标准化。让员工接受相关的训练，使之具有共同 的技术或知识背景，从而达成协调的目的。 (6)规范标准化。把行为规范注入整个组织工作当中，使所有成员根据相同 的信念选择和表现其行为。"
		],
		isFAQ: true
	},
	{
		question: "简述预算管理的内涵",
		answers: [
			"首先，预算管理是一种计划思想的体现。其次，预算管理是预测方法的运用。其次，预算管理是预测方法的运用。"
		],
		isFAQ: true
	},
	{
		question: "简述克服沟通障碍的技巧。",
		answers: [
			"从学会倾听、重视反馈、克服认知差异和抑制情绪化反应方面进行分析。"
		],
		isFAQ: true
	},
	{
		question: "组织整合包括哪些内容",
		answers: [
			"正式组织与非正式组织的整合、层级整合、直线与参谋的整合"
		],
		isFAQ: true
	},
	{
		question: "简述管理工作的主要内容。",
		answers: [
			"管理包括决策、组织、 领导、控制以及创新等一系列工作。再具体描述五个方面"
		],
		isFAQ: true
	},
	{
		question: "什么是目标管理",
		answers: [
			"目标管理（management by objectives MB0）是德鲁克1954年在《管理的实 践》一书中提出的，目前已成为西方许多国家普遍采用的系统制定目标并进行管 理的有效方法。目标管理是一种鼓励组织成员积极参加工作目标的制定，并在工 作中实行自我控制、自觉完成工作任务的管理方法或管理制度。该理论假设所有 下属能够积极参加目标的制定，在实施中能够进行自我控制。目标管理的重点是 让组织中的各层管理人员都与下属围绕工作目标和如何完成目标进行充分沟通。"
		],
		isFAQ: true
	},
	{
		question: "简述计划的作用",
		answers: [
			"通常，经过科学而周密的分析研究制定出的计划具有下述几方面的作用： 1.计划是管理者进行指挥的抓手2.计划是管理者实施控制的标准计划是降低未来不确定性的手段4.计划是提高效率与效益的工具5计划是激励人员士气的依据"
		],
		isFAQ: true
	},
	{
		question: "非理性决策的模型有哪些",
		answers: [
			"从渐进决策模型、政治协调决策模型以及领导集体决策模型说明"
		],
		isFAQ: true
	},
	{
		question: "决策有哪些基本特征？",
		answers: [
			"(—)目标性(二)可行性（三） 动态性（四） 整体性（五） 创造性"
		],
		isFAQ: true
	},
	{
		question: "什么是PDCA循环",
		answers: [
			"PDCA循环又叫戴明环，是美国质量管理专家威廉•戴明博士提出的，已经成 为当今管理实践中广为应用的科学程序。PDCA分别代表计划（plan）、实施 （do）、检查（check）和改进（action）四个基本阶段。"
		],
		isFAQ: true
	},
	{
		question: "简述一般或宏观环境",
		answers: [
			"经济环境因素是指组织运行所处经济系统的情况，如国内外的经济形势、政 府财政和税收政策、银行利率、物价波动、市场状况等。技术的含义很广，它既包括生产技术（如劳动手段、 工艺流程的改进、发展与完善，特别是新技术、新设备、新工艺、新材料、新能 源的生产与制造等），也包括管理技术（如管理方法、计划决策方法、组织方法及 推销方法的改进与更新等），还包括生活技术、服务技术等内容。风俗习惯、文化传统、受教育程度、价值观念、道德伦理、宗教信仰、商业 习惯等构成了一个组织所处的社会环境。政治法律环境因素是指政治制度、政治形势、国际关系、国家法律和法令、 政府政策等。\n填空题"
		],
		isFAQ: true
	},
	{
		question: "管理方格理论中，（1，1）象限对应的是（）管理。",
		answers: [
			"贫乏型管理"
		],
		isFAQ: true
	},
	{
		question: "职位权力包括三种，分别为（）、（）和（）",
		answers: [
			"奖赏权力强制权力法定权力"
		],
		isFAQ: true
	},
	{
		question: "一个完整的组织结构设计至少包括（）、（）和（）三个方面",
		answers: [
			"职能设计部门设计层级设计"
		],
		isFAQ: true
	},
	{
		question: "组织文化的特征表现为（ ）、（ ）、（ ）和（ ）。",
		answers: [
			"精神性系统性相对稳定性融合性"
		],
		isFAQ: true
	},
	{
		question: "人员考核的基本要求主要包括（）、（）、（）和（）四个方面",
		answers: [
			"职业品德工作态度工作能力工作业绩"
		],
		isFAQ: true
	},
	{
		question: "泰勒认为,为提高劳动生产率,必须为工作配备（）。",
		answers: [
			"合适的操作流程"
		],
		isFAQ: true
	},
	{
		question: "（）是法约尔的代表作",
		answers: [
			"《工业管理与一般管理》"
		],
		isFAQ: true
	},
	{
		question: "基于个体决策的追踪与调整方法有：",
		answers: [
			"鼠标实验室眼动技术决策移窗技术"
		],
		isFAQ: true
	},
	{
		question: "在领导者角色理论中，（）角色是指在重大的谈判中负责代表组织。",
		answers: [
			"谈判者"
		],
		isFAQ: true
	},
	{
		question: "一般环境分析方法中最常见的PEST分析方法分别从（）、（）、（）、（）四个方面来探察、认识影响组织发展的重要因素",
		answers: [
			"政治与法律环境经济环境社会与文化环境技术环境"
		],
		isFAQ: true
	},
	{
		question: "马斯洛需要层次理论中，最低层次的需要指的是（）需要。",
		answers: [
			"生理需要"
		],
		isFAQ: true
	},
	{
		question: "活动方案生成方法有（）、（）、（）以及强迫联系法",
		answers: [
			"5W2H头脑风暴法德尔菲法"
		],
		isFAQ: true
	},
	{
		question: "激励方法中工作激励包括（）、（）和（）",
		answers: [
			"工作扩大法工作丰富法岗位轮换法"
		],
		isFAQ: true
	},
	{
		question: "（）沟通是指借助文字进行的信息传递与交流，如报告、通知等。",
		answers: [
			"书面"
		],
		isFAQ: true
	},
	{
		question: "被称为决策“硬技术”的决策方法是指（）",
		answers: [
			"计量决策法"
		],
		isFAQ: true
	},
	{
		question: "为缩小现状与目标之间的差距，可以在现状的基础上力求改进，随着时间的推移不断地逼进目标，也可以通过（）缩小差距",
		answers: [
			"变革现状"
		],
		isFAQ: true
	},
	{
		question: "大型组织和小型组织在组织结构上的区别主要表现在（）不同、（）不同、（）不同和人员结构不同",
		answers: [
			"规范程度集权程度复杂程度"
		],
		isFAQ: true
	},
	{
		question: "从组织层面上对沟通进行划分，可分为（）和（）。",
		answers: [
			"正式沟通非正式沟通"
		],
		isFAQ: true
	},
	{
		question: "在现代社会，经济活动主要是以（）为单位进行的",
		answers: [
			"企业"
		],
		isFAQ: true
	},
	{
		question: "()职能本身并没有某种特有的表现形式，总是在与其他管理职能的结合中表现自身的存在与价值",
		answers: [
			"创新"
		],
		isFAQ: true
	},
	{
		question: "激励方法中成果激励包括（）和（）",
		answers: [
			"物质激励精神激励"
		],
		isFAQ: true
	},
	{
		question: "对于组织中确定性的决策,通常可以通过()方法进行备选方案的优化选择",
		answers: [
			"排队论"
		],
		isFAQ: true
	},
	{
		question: "人员录用流程包括（）、（）、（）和录用评估四个阶段",
		answers: [
			"录用准备录用甄选录用实施"
		],
		isFAQ: true
	},
	{
		question: "组织运行制度设计是指为了保证组织的高效运行而进行的制度和人员方面的安排，包括（）设计、（）设计",
		answers: [
			"沟通系统管理规范激励"
		],
		isFAQ: true
	},
	{
		question: "组织文化的外部影响因素主要有（）、（ ）和（ ）。",
		answers: [
			"民族文化制度文化外来文化"
		],
		isFAQ: true
	},
	{
		question: "（）类型的沟通是全方位开放的沟通网络系统，每个成员都可以同其他成员进行交流。",
		answers: [
			"全通道式"
		],
		isFAQ: true
	},
	{
		question: "外部招聘的程度通常分为（）、（）、（）和择优录取四个阶段",
		answers: [
			"准备筹划宣传报名全部考评"
		],
		isFAQ: true
	},
	{
		question: "制定计划方案包括（）、（） 以及（）",
		answers: [
			"提出方案比较方案选择方案"
		],
		isFAQ: true
	},
	{
		question: "计划编制的方法包括（）、（）、（）以及（）",
		answers: [
			"滚动计划法项目计划技术计划评审技术甘特图"
		],
		isFAQ: true
	},
	{
		question: "组织文化可以从（ ）、（ ）、（ ）和（ ）方面进行塑造。",
		answers: [
			"选择价值观强化认同提炼定格巩固完善"
		],
		isFAQ: true
	},
	{
		question: "霍桑实验标志着（）的产生",
		answers: [
			"人际关系学说"
		],
		isFAQ: true
	},
	{
		question: "马斯洛需要层次理论中，最高层次的需要指的是（）需要。",
		answers: [
			"自我实现需要"
		],
		isFAQ: true
	},
	{
		question: "PDCA循环的四个基本阶段包括",
		answers: [
			"计划实施检查改进"
		],
		isFAQ: true
	},
	{
		question: "影响有效管理幅度的因素包括管理者和被管理者的（）、（）、以及（）",
		answers: [
			"工作内容工作能力工作环境"
		],
		isFAQ: true
	},
	{
		question: "行为决策代表性模型包括：（）、（）以及（）",
		answers: [
			"DHS模型HS模型BHS模型"
		],
		isFAQ: true
	},
	{
		question: "相对报酬是在（）理论中提出。",
		answers: [
			"公平理论"
		],
		isFAQ: true
	},
	{
		question: "“管理就是决策”是著名管理学院()给管理所下的定义。",
		answers: [
			"西蒙"
		],
		isFAQ: true
	},
	{
		question: "强化可分为正强化、负强化惩罚和（）。",
		answers: [
			"自然消退"
		],
		isFAQ: true
	},
	{
		question: "喜好风险的人往往会选取风险程度",
		answers: [
			"较高较高"
		],
		isFAQ: true
	},
	{
		question: "就管理的职能而言,法约尔认为()",
		answers: [
			"管理就是决策"
		],
		isFAQ: true
	},
	{
		question: "（ ）是某一社会主流文化中一个较小的组成部分。",
		answers: [
			"亚文化"
		],
		isFAQ: true
	},
	{
		question: "管理方格理论提出有（）种代表性的领导方式",
		answers: [
			"五"
		],
		isFAQ: true
	},
	{
		question: "决策追踪与调整需要考试的原则（）、（）以及（）",
		answers: [
			"任务型与关系型相结合的原则科学性与全面性相结合的原则可比性与可操作性相结合的原则"
		],
		isFAQ: true
	},
	{
		question: "一般情况下，根据决策的特征，决策选择的目标是一种()目标",
		answers: [
			"满意"
		],
		isFAQ: true
	},
	{
		question: "组织结构本擀是组织内部成员的分工协作关系，包括（）、（）和（）三个方面内容",
		answers: [
			"工作任务的分解任务组合组织协调"
		],
		isFAQ: true
	},
	{
		question: "下列()是由波士顿咨询公司提出来的",
		answers: [
			"经由单位组合分析法"
		],
		isFAQ: true
	},
	{
		question: "在情境领导模型下，参与型领导的任务和关系行为是（）。",
		answers: [
			"低任务/高关系行为"
		],
		isFAQ: true
	},
	{
		question: "在人事考评方法中，适用于对被考评者所掌握的理论知识进行测定的方法是（）",
		answers: [
			"书面考试法"
		],
		isFAQ: true
	},
	{
		question: "管理方格理论中，（9，9）象限对应的是（）管理",
		answers: [
			"团队型管理"
		],
		isFAQ: true
	},
	{
		question: "（）是信息的传递与理解的过程，是在两人或更多人之间进行的在事实、思想、意见和情感等方面的交流。",
		answers: [
			"沟通"
		],
		isFAQ: true
	},
	{
		question: "人员培训的分类有",
		answers: [
			"岗前培训在职培训专题培训"
		],
		isFAQ: true
	},
	{
		question: "某企业生产某种产品,固定成本为160000元,单位变动成本为10000元,每台售价12,000元,试计算该产品的盈亏平衡点是()台",
		answers: [
			"80"
		],
		isFAQ: true
	},
	{
		question: "当产量增加时，LAC下降，这是由于（   ）。",
		answers: [
			"规模报酬递增"
		],
		isFAQ: false
	},
	{
		question: "在完全竞争市场上，平均收益AR与边际收益MR的关系是（   ）。",
		answers: [
			"AR＝MR"
		],
		isFAQ: false
	},
	{
		question: "通常由政府提供的公共物品具有（   ）。",
		answers: [
			"非排他性和非竞争性"
		],
		isFAQ: false
	},
	{
		question: "由于经济萧条而形成的失业属于（   ）。",
		answers: [
			"周期性失业"
		],
		isFAQ: false
	},
	{
		question: "属于GNP但不属于NI的项目是（   ）。",
		answers: [
			"间接税"
		],
		isFAQ: false
	},
	{
		question: "菲利普斯曲线反映了哪两个宏观经济变量之间的交替关系（   ）。",
		answers: [
			"通货膨胀率与失业率"
		],
		isFAQ: false
	},
	{
		question: "需求量的变动反映在需求曲线上，通常表现为（   ）。",
		answers: [
			"沿着同一条需求曲线上下移动"
		],
		isFAQ: false
	},
	{
		question: "宏观经济学的核心理论是（   ）。",
		answers: [
			"国民收入决定理论"
		],
		isFAQ: false
	},
	{
		question: "外部性发生在人们（   ）。",
		answers: [
			"无偿享有了额外收益或承担了不是由他导致的额外成本时"
		],
		isFAQ: false
	},
	{
		question: "国民收入决定理论认为国民收入均衡水平取决于（   ）。",
		answers: [
			"总需求"
		],
		isFAQ: false
	},
	{
		question: "竞争程度最强的市场是（   ）。",
		answers: [
			"完全竞争市场"
		],
		isFAQ: false
	},
	{
		question: "市场均衡要求（   ）。",
		answers: [
			"在某一价格水平上，买者想要购买的数量恰好等于卖者想卖的数量"
		],
		isFAQ: false
	},
	{
		question: "在经济学中，为得到某种物品或服务而必须放弃的东西用成本表示被称为（   ）。",
		answers: [
			"机会成本"
		],
		isFAQ: false
	},
	{
		question: "基尼系数是反映收入分配不平等程度的重要指标，其特征是（   ）。",
		answers: [
			"为0到1之间的数值，数值越小越平等"
		],
		isFAQ: false
	},
	{
		question: "长期边际成本曲线呈U型的原因是（   ）。",
		answers: [
			"边际报酬递减规律"
		],
		isFAQ: false
	},
	{
		question: "下列有关无差异曲线的特点说法正确的是（   ）。",
		answers: [
			"无差异曲线的斜率为负值"
		],
		isFAQ: false
	},
	{
		question: "某人由于纺织行业不景气而失去工作，这种失业属于（   ）。",
		answers: [
			"结构性失业"
		],
		isFAQ: false
	},
	{
		question: "个人可支配收入是（   ）。",
		answers: [
			"个人收入－个人所得税"
		],
		isFAQ: false
	},
	{
		question: "假定其他条件不变，生产某种商品所需的原材料价格上升，则该商品的（   ）。",
		answers: [
			"供给曲线向左移动"
		],
		isFAQ: false
	},
	{
		question: "财政政策的内在稳定器作用体现在（   ）。",
		answers: [
			"减缓经济波动"
		],
		isFAQ: false
	},
	{
		question: "下面会导致市场失灵的情况是（   ）。",
		answers: [
			"垄断"
		],
		isFAQ: false
	},
	{
		question: "如果某厂商在完全竞争市场中以5元的价格生产和销售其产品，而现有的产出水平下，其平均成本为4元，则可以判定该厂商（   ）。",
		answers: [
			"存在超额利润"
		],
		isFAQ: false
	},
	{
		question: "商品X、Y的价格不变而消费者收入增加，则预算约束线（   ）。",
		answers: [
			"向右上方平移"
		],
		isFAQ: false
	},
	{
		question: "下列情况应采取薄利多销政策的是（   ）。",
		answers: [
			"需求价格弹性大于1时"
		],
		isFAQ: false
	},
	{
		question: "经济学中短期与长期的划分取决于（   ）。",
		answers: [
			"可否调整生产规模"
		],
		isFAQ: false
	},
	{
		question: "收入完全平等分配时的洛伦兹曲线将会（   ）。",
		answers: [
			"与45°对角线重合"
		],
		isFAQ: false
	},
	{
		question: "如果政府对某商品的生产者征税，以下哪种情况下消费者负担的税收较重（   ）。",
		answers: [
			"需求缺乏弹性，供给富于弹性"
		],
		isFAQ: false
	},
	{
		question: "典型的经济周期会依次经历（   ）。",
		answers: [
			"繁荣、衰退、萧条、复苏"
		],
		isFAQ: false
	},
	{
		question: "短期完全竞争厂商选择停止营业而不是继续生产的条件是（   ）。",
		answers: [
			"市场价格低于平均可变成本"
		],
		isFAQ: false
	},
	{
		question: "衡量社会收入分配公平承担的曲线是（   ）。",
		answers: [
			"洛伦兹曲线"
		],
		isFAQ: false
	},
	{
		question: "下面哪一点是完全竞争厂商短期均衡时的停止营业点（   ）。",
		answers: [
			"平均可变成本曲线与边际成本曲线的交点"
		],
		isFAQ: false
	},
	{
		question: "GDP与NDP之间的差别是（   ）。",
		answers: [
			"折旧"
		],
		isFAQ: false
	},
	{
		question: "总成本减去固定成本等于（   ）。",
		answers: [
			"可变成本"
		],
		isFAQ: false
	},
	{
		question: "企业的短期生产中，当平均产量开始递减时，边际产量（   ）。",
		answers: [
			"一定递减"
		],
		isFAQ: false
	},
	{
		question: "下列属于纯公共物品的是（   ）。",
		answers: [
			"国防设施"
		],
		isFAQ: false
	},
	{
		question: "假定某商品的需求弹性为零，供给为正常弹性，如果政府对该商品的生产方征收每单位5元的税，则该商品的价格上升（   ）。",
		answers: [
			"等于5元"
		],
		isFAQ: false
	},
	{
		question: "下列不是完全竞争市场的特征是（   ）。",
		answers: [
			"每个企业都生产略有差别的产品"
		],
		isFAQ: false
	},
	{
		question: "费雪的交易方程式最活跃的因素是（   ）。",
		answers: [
			"货币量"
		],
		isFAQ: false
	},
	{
		question: "天气寒冷，游客大大减少，海滨旅游区部分人失业应属于（   ）。",
		answers: [
			"季节性失业"
		],
		isFAQ: false
	},
	{
		question: "某商品的需求曲线是一条平行于横轴的水平直线，则其需求价格弹性是（   ）。",
		answers: [
			"无限弹性"
		],
		isFAQ: false
	},
	{
		question: "当某商品的供给和需求同时增加时，该商品的均衡数量将（   ）。",
		answers: [
			"上升"
		],
		isFAQ: false
	},
	{
		question: "根据消费函数，引起消费增加的因素是（   ）。",
		answers: [
			"收入增加"
		],
		isFAQ: false
	},
	{
		question: "生产要素的需求是一种（   ）。",
		answers: [
			"A，B两者"
		],
		isFAQ: false
	},
	{
		question: "边际技术替代率递减规律表明，连续每增加1单位劳动力要素的投入（   ）。",
		answers: [
			"当产量不变时，资本投入的变化量逐渐减少"
		],
		isFAQ: false
	},
	{
		question: "市场不能向公众提供纯粹的公共物品是因为（   ）。",
		answers: [
			"以上三种情况都有"
		],
		isFAQ: false
	},
	{
		question: "煤炭有多种用途，作为最终产品的是（   ）。",
		answers: [
			"家庭用于做饭"
		],
		isFAQ: false
	},
	{
		question: "如果某种商品的价格下降时，该商品的替代效应为需求量增加，收入效应为需求量减少，那么可以断定该商品不是（   ）。",
		answers: [
			"正常商品"
		],
		isFAQ: false
	},
	{
		question: "在垄断竞争中，利润会趋于零是由于（   ）。",
		answers: [
			"进入该行业相对容易"
		],
		isFAQ: false
	},
	{
		question: "当经济过热时，中央银行可以在金融市场上（   ）。",
		answers: [
			"卖出政府债券，提高再贴现率"
		],
		isFAQ: false
	},
	{
		question: "“面粉是中间产品”这一命题（   ）。",
		answers: [
			"可能是对的，也可能是不对的"
		],
		isFAQ: false
	},
	{
		question: "经济增长的标志是（   ）。",
		answers: [
			"社会生产能力的不断提高"
		],
		isFAQ: false
	},
	{
		question: "3-4年的经济周期被称为（   ）。",
		answers: [
			"基钦周期"
		],
		isFAQ: false
	},
	{
		question: "完全竞争的厂商不能控制（   ）。",
		answers: [
			"价格"
		],
		isFAQ: false
	},
	{
		question: "垄断厂商利润极大时（   ）。",
		answers: [
			"P＞MR＝MC"
		],
		isFAQ: false
	},
	{
		question: "会致使供给大于需求的情况是（   ）。",
		answers: [
			"实际价格高于均衡价格"
		],
		isFAQ: false
	},
	{
		question: "假定其他因素不变，自发投资增加时，IS曲线将（   ）。",
		answers: [
			"向右平行移动"
		],
		isFAQ: false
	},
	{
		question: "垄断者要实现市场分割的条件之一是（   ）。",
		answers: [
			"各个子市场必须具有不同的需求价格弹性"
		],
		isFAQ: false
	},
	{
		question: "某人由于刚刚进入劳动力市场尚未找到工作，这属于（   ）。",
		answers: [
			"摩擦性失业"
		],
		isFAQ: false
	},
	{
		question: "垄断竞争厂商的边际收益（   ）。",
		answers: [
			"小于价格"
		],
		isFAQ: false
	},
	{
		question: "假定商品X、Y的价格分别为PX、PY，当MRSXY＞PX/PY时，消费者收入不变时，为实现更大的满足，将会（   ）。",
		answers: [
			"增加X，减少Y的消费"
		],
		isFAQ: false
	},
	{
		question: "以下关于国民经济核算的表述中，不正确的是（   ）。",
		answers: [
			"GDP和GNP都是存量的概念"
		],
		isFAQ: false
	},
	{
		question: "如果某种商品的需求函数为P＝10－0.5Q，价格为5时的需求价格弹性为（   ）。",
		answers: [
			"-1"
		],
		isFAQ: false
	},
	{
		question: "货币乘数大小与多个变量有关，这些变量不包括（   ）。",
		answers: [
			"银行存款"
		],
		isFAQ: false
	},
	{
		question: "边际成本低于平均成本时（   ）。",
		answers: [
			"平均成本下降"
		],
		isFAQ: false
	},
	{
		question: "经济学产生的原因是（   ）。",
		answers: [
			"稀缺性与选择的必要"
		],
		isFAQ: false
	},
	{
		question: "收入分配绝对平均时，基尼系数（   ）。",
		answers: [
			"等于零"
		],
		isFAQ: false
	},
	{
		question: "一个厂商在生产规模扩大时由自身内部所引起的产量增加称为（   ）。",
		answers: [
			"内在经济"
		],
		isFAQ: false
	},
	{
		question: "长期菲利普斯曲线说明（   ）。",
		answers: [
			"通货膨胀与失业之间长期中不存在相互替代关系"
		],
		isFAQ: false
	},
	{
		question: "均衡价格是指（   ）。",
		answers: [
			"使得需求量等于供给量的价格"
		],
		isFAQ: false
	},
	{
		question: "GDP是指一国一年内所生产的________的市场价值的总和。（   ）。",
		answers: [
			"最终产品和劳务"
		],
		isFAQ: false
	},
	{
		question: "生产要素的价格一旦确定，等成本曲线斜率随之确定。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "“最好的经济政策是使一个国家的经济增长率达到最高的政策”，这一命题属于规范经济学命题。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对一个国外净要素收入为负的国家而言，GDP应小于GNP。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "减少再贴现率和法定准备金比率可以增加货币供给量。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "消费者均衡点可以是无差异曲线与预算约束线的相交点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "规模报酬递减是边际报酬递减造成的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "LM曲线是描述货币市场达到均衡时，国民收入与利息率之间存在着反方向变动关系的曲线。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "寡头垄断市场的形成与产品是否有差别并没有什么关系。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "用商品X代替商品Y的边际替代率等于3意味着，1单位商品X和3商品Y具有同样的总效用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在西方发达国家，由财政部、中央银行和商业银行共同运用货币政策来调节经济。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "宏观经济政策目标之一是价格稳定，价格稳定指价格指数相对稳定，而不是所有商品价格固定不变。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "同一瓶矿泉水具有相同的效用。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "商品的边际替代率递减规律决定了无差异曲线形状是凸向原点的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "扩张性货币政策使LM曲线右移，而紧缩性货币政策使LM曲线左移。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "垄断厂商可以任意制定价格。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "加速原理的基本含义是产量的增长率大于投资的增长率。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在完全竞争市场上，整个行业的需求曲线是一条与横轴平行的线。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "需求的减少会引起均衡价格的下降和均衡数量的减少。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "家庭购买小汽车是消费的一部分。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "实行三级价格歧视的两个市场中的需求价格弹性一定不一样。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "一个垄断者在两个地区的市场上以差别价格进行销售，它将选择在需求弹性大的市场上销售更多的产品。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "公共物品必须同时具有非竞争性和非排他性。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "寡头垄断市场的一个明显特征是寡头间的相互独立性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "如果某人大学毕业时选择继续升学，他的机会成本就是学习期间的所有费用。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "完全垄断厂商在价格歧视中，将在需求价格弹性较大的市场上，以较低的价格销售较大的产量。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在各种类型的市场上，边际收益与价格都是相等的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "需求规律告诉我们，随着某种物品价格上升，其需求量将减少。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "如果收入是完全平均分配的，则基尼系数将等于0。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "只要人们普遍把“万宝路”香烟作为交换媒介而接受，“万宝路”香烟就是货币。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "一级价格歧视使得消费者剩余几乎等于零。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "如果农民种植的粮食用于自己消费，则这种粮食的价值就无法计入GDP之内。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "农民生产并用于自己消费的粮食不应计入GNP。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "如果某生产厂商今年比去年多卖了200台电脑，则该厂商本年度对GDP的贡献也相应地会增加。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用等产量线上任意一点所表示的生产要素组合都可以生产出同一数量的产品。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "完全竞争厂商面对的需求曲线由市场价格所决定，故其完全缺乏弹性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在商品过剩的情况下，某种商品的价格变化将导致它的供给量变化，但不会引起供给的变化。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "垄断厂商出现亏损是不可能的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "垄断竞争企业短期内不一定存在利润，长期中一定不存在利润。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "等成本曲线斜率等于纵轴表示的生产要素Y的价格与横轴表示的生产要素X的价格之比。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "供给规律告诉我们，在其他条件相同时，随着某种物品价格的上升，该物品的供给量将增加。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "当一个国家出现恶性通货膨账时，政府只能通过采取紧缩性货币政策加以遏制。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "寡头垄断市场上有精确的价格和产量线。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "边际消费倾向大于0小于1。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "完全垄断厂商具有垄断权力，所以可以“价格不封顶，质量不保底”。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "价格歧视就是价格差别。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "支持价格是政府为了扶植某一行业的生产而规定的该行业产品的价格。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "无论哪个行业，企业的规模并不是越大越好。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "菲利普斯的基本含义是失业和通货膨胀同时上升。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "当我们测度一个特定时期所发生的事时，我们涉及的是一个流量。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "寡头垄断厂商之间的产品都是有差异的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "如果某企业用6台新机器替换6台旧机器，则GDP没有发生变化，因为机器数量未变。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "规范经济学回答的是“应该是什么”的问题。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "边际产量可由总产量线上的对应点的切线的斜率来表示。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "只要有人类社会，就会存在资源的稀缺性。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "当其他生产要素不变时，一种生产要素投入越多，则产量越高。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "政府的财政支出政策主要通过转移支付、政府购买和税收对国民经济产生影响。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "产出增加时，总成本亦上升，即为规模不经济。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "可变要素的报酬总是递减的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "由于寡头之间可以进行勾结，所以，它们之间并不存在竞争。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "当一个追求利润最大化的垄断者在不同的市场上定出不同的价格时，则价格的差别必然反映出在两个市场上供给产品的成本差别。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "菲利普斯曲线反映了通货膨胀率与失业率之间存在螺旋式上升关系。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "垄断竞争与完全竞争的关键差别是垄断竞争存在产品差别。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "扩张性财政政策使IS曲线左移，而紧缩性财政政策使IS曲线右移。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "只要市场价格高于边际成本，垄断厂商必定扩大产量。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "亚当·斯密在《国富论》中指出：劳动生产力上最大的增进、以及运用劳动时所表现的更大熟练、技巧和判断力，似乎都是技术进步的结果。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "假如以生产要素X代替Y的边际技术替代率等定3，意味着这对增加1个单位X所增加的产量，等于减少3个单位Y所减少的产量。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在国民收入核算中所说的储蓄恒等于投资，是指计划的储蓄恒等于计划的投资。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "从NNP中扣除间接税、政府转移支出，再加上政府补助金就等于国民收入。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在一条等产量曲线上，其上部代表的产量大于该等产量曲线下部所代表的产量。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "边际报酬递减是规模报酬递减造成的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "边际收益递减规律及其存在的条件。",
		answers: [
			"答：（1）边际收益递减规律是指在技术水平不变的条件下，若其他生产要素不变，连续增加某种生产要素的投入量，最初这种生产要素的增加会使报酬增加，但在到达一定的限度后，增加的报酬将会减少；（2）存在的条件：①边际报酬递减规律作用前提条件之一是技术水平不变，它不否认技术水平的提高可能会导致劳动生产率提高；②规律表述有“最终”二字限制条件。也就是说，某一投入要素边际报酬并非自始至终递减，它有可能在一定范围内呈现增加趋势。"
		],
		isFAQ: true
	},
	{
		question: "财政政策与货币政策的区别。",
		answers: [
			"答：（1）财政政策与货币政策调节范围的不同，要求两者协调配合；（2）财政政策与货币政策目标的侧重点不同，要求两者协调配合；（3）财政政策与货币政策在政策时效和强度方面不同，要求两者协调配合。"
		],
		isFAQ: true
	},
	{
		question: "寡头市场的特征。",
		answers: [
			"答：①厂商数目屈指可数，厂商一定程度控制某种产品价格和绝大部分市场份额；②产品差别可有可无，由此可分为无差别寡头垄断市场和有差别寡头垄断市场；③存在进入的障碍，其他厂商无法顺利地进入该行业；④寡头垄断之间相互利害关系极为密切，双方均是反应后再决策，是价格搜寻者。"
		],
		isFAQ: true
	},
	{
		question: "财政政策与货币政策配合运用的主要模式。",
		answers: [
			"答：（1）双松政策；（2）双紧政策；（3）紧财政，松货币；（4）紧货币，松财政。"
		],
		isFAQ: true
	},
	{
		question: "宏观经济政策目标之间的关系。",
		answers: [
			"答：（1）互补性：充分就业促进经济增长，物价稳定是经济增长的根本；（2）矛盾性：①经济增长和充分就业的矛盾：经济增长的技术进步→文化技术水平低的工人失业；②充分就业和物价稳定的矛盾：实现充分就业需扩张性政策，由此会导致通货膨胀。"
		],
		isFAQ: true
	},
	{
		question: "等产量线的特征。",
		answers: [
			"答：①等产量线的斜率为负；②在一组等产量曲线中，离原点越远的等产量线，代表产量越高；③对同一生产者而言，两条等产量曲线不能相交；④等产量曲线的斜率递减，凸向原点，原因在于生产要素的边际技术替代率递减。"
		],
		isFAQ: true
	},
	{
		question: "工资差异的原因。",
		answers: [
			"答：（1）补偿性工资差别；（2）非补偿性工资差别；（3）歧视性造成的工资差别；（4）市场不完全竞争造成的工资差别；（5）不同的职业间缺乏竞争。"
		],
		isFAQ: true
	},
	{
		question: "财政政策与货币政策的一致性。",
		answers: [
			"答：（1）配合基础；（2）双方政策调控最终目标一致；（3）政策手段具有互补性，传导机制具有互动性；（4）同是资金分配的渠道，都与货币流通密切联系。"
		],
		isFAQ: true
	},
	{
		question: "乘数发生作用的条件是什么？",
		answers: [
			"答：（1）社会存在闲置资源；（2）投资和储蓄的决定相互独立；（3）货币供给量增加能适应支出增加的需要；（4）增加的收入不能用于购买进口货物，否则GDP不会增加；（5）挤出效应和高税收会使乘数作用被部分抵消。"
		],
		isFAQ: true
	},
	{
		question: "短期总供给曲线影响因素以及移动情况。",
		answers: [
			"答：（1）影响因素：经济要素，包括技术、资源、生产成本（影响最大）；（2）移动情况：①技术进步、资源增加→总供给增加→AS曲线右下方移动；②生产成本上升→同样产出水平，价格上升→AS曲线左上方移动。"
		],
		isFAQ: true
	},
	{
		question: "GDP的统计缺陷。",
		answers: [
			"答：（1）不能反映经济发展对资源环境所造成的负面影响；（2）不能反映某些重要的非市场经济活动；（3）不能全面的反映人们的福利状况；（4）不能反映收入分配的平等程度。"
		],
		isFAQ: true
	},
	{
		question: "何为自动稳定器？请说明它对缓和经济波动的作用。",
		answers: [
			"答：（1）定义：是指财政政策中自动调节社会总需求，使经济稳定的机制和某些工具；（3）作用：①减缓经济波动；作用十分有限，并且需要比较长的时间。②内在稳定器只能减轻萧条或通货膨胀的程度，并不能改变经济萧条或通货膨胀的总趋势，只能对财政政策起到自动配合的作用，并不能代替财政政策。"
		],
		isFAQ: true
	},
	{
		question: "宏观经济政策目标。",
		answers: [
			"答：（1）充分就业；（2）价格稳定；（3）经济增长；（4）国际收支平衡。"
		],
		isFAQ: true
	},
	{
		question: "对寡头市场的评价。",
		answers: [
			"答：（1）积极的评价：①能较好的实现规模经济，从而降低成本，提高效率；②利于促进技术进步，寡头企业之间的竞争是促使寡头创新的动力。（2）批评：当寡头企业为他们的共同利益勾结时，会抬高产品价格，损害消费者利益。"
		],
		isFAQ: true
	},
	{
		question: "货币的职能。",
		answers: [
			"答：①流通手段；②价值尺度；③储藏手段；④支付手段。\n填空题"
		],
		isFAQ: true
	},
	{
		question: "生产函数每点的切线斜率是（   ）。",
		answers: [
			"边际产量"
		],
		isFAQ: true
	},
	{
		question: "完全垄断厂商满足长期均衡的条件是（   ）。",
		answers: [
			"MR＝SMC＝LMC"
		],
		isFAQ: true
	},
	{
		question: "如果企业在生产过程中只增加一种生产要素的使用量，产量的增加将小于要素增加的比例。这时候生产函数表现为（   ）。",
		answers: [
			"报酬递减"
		],
		isFAQ: true
	},
	{
		question: "如果消费者消费15个面包获得的总效用是100个效用单位，消费16个面包获得的总效用是106个效用单位，则第16个面包的边际效用是（   ）效用单位。",
		answers: [
			"6个"
		],
		isFAQ: true
	},
	{
		question: "公开市场业务是指（   ）。",
		answers: [
			"中央银行在金融市场上买进或卖出有价证券"
		],
		isFAQ: true
	},
	{
		question: "衡量社会收人分配公平程度的曲线是（   ）。",
		answers: [
			"洛伦兹曲线"
		],
		isFAQ: true
	},
	{
		question: "由于工会垄断力量要求提高工资、导致雇主提高商品售价，最终引发整个社会物价水平上涨，这就是（   ）。",
		answers: [
			"成本推动型通货膨胀"
		],
		isFAQ: true
	},
	{
		question: "“没有免费的午餐”这种说法的前提是（   ）。",
		answers: [
			"任何事物都有机会成本"
		],
		isFAQ: true
	},
	{
		question: "收入缺乏弹性是指（   ）。",
		answers: [
			"需求量变动的百分比小于收人变动的百分比"
		],
		isFAQ: true
	},
	{
		question: "平均成本减平均固定成本等于（   ）。",
		answers: [
			"平均可变成本"
		],
		isFAQ: true
	},
	{
		question: "短期中如果完全竞争厂商的（   ）高于其得到的价格，厂商将停止营业。",
		answers: [
			"平均可变成本"
		],
		isFAQ: true
	},
	{
		question: "（   ）是做出关于世界应该是什么样子的表述。",
		answers: [
			"规范经济学"
		],
		isFAQ: true
	},
	{
		question: "乘数原理和加速原理的不同在于（   ）。",
		answers: [
			"乘数原理说明国民收入的决定，加速原理说明投资的决定"
		],
		isFAQ: true
	},
	{
		question: "在垄断竞争中，利润会趋于零是由于（   ）。",
		answers: [
			"进入该行业相对容易"
		],
		isFAQ: true
	},
	{
		question: "即使企业不生产也必须支付的成本是（   ）。",
		answers: [
			"固定成本"
		],
		isFAQ: true
	},
	{
		question: "公共产品的产权是属于社会，而不属于任何个人是指它的（   ）。",
		answers: [
			"非排他性"
		],
		isFAQ: true
	},
	{
		question: "为提高经济增长率，可采取的措施是（   ）。",
		answers: [
			"推广基础科学及应用科学的研究成果"
		],
		isFAQ: true
	},
	{
		question: "当产量增加时，（   ）经常是减少的。",
		answers: [
			"平均固定成本"
		],
		isFAQ: true
	},
	{
		question: "如果一个企业提高其商品价格后发现总收益减少，这意味着该商品（   ）。",
		answers: [
			"需求富有弹性"
		],
		isFAQ: true
	},
	{
		question: "中央银行通过提高法定准备金比率属于（   ）。",
		answers: [
			"紧缩性货币政策"
		],
		isFAQ: true
	},
	{
		question: "如果在厂商的短期均衡产量上，AR小于SAC，但大于AVC，则厂商（   ）。",
		answers: [
			"亏损，但继续生产"
		],
		isFAQ: true
	},
	{
		question: "某一经济活动存在外部不经济是指该经济活动（   ）。",
		answers: [
			"私人成本小于社会成本"
		],
		isFAQ: true
	},
	{
		question: "一个完全竞争厂商在短期均衡时可能是个（   ）。",
		answers: [
			"AC下降阶段"
		],
		isFAQ: true
	},
	{
		question: "如果一种商品的价格从5元上升至5.50元，需求量从200下降至190，因此该种商品的需求（   ）。",
		answers: [
			"缺乏弹性"
		],
		isFAQ: true
	},
	{
		question: "最接近垄断竞争的产品市场是（   ）。",
		answers: [
			"啤酒、糖果"
		],
		isFAQ: true
	},
	{
		question: "货币的最基本职能是（   ）。",
		answers: [
			"交换媒介"
		],
		isFAQ: true
	},
	{
		question: "厂商之间关系最密切的市场是（   ）。",
		answers: [
			"寡头垄断市场"
		],
		isFAQ: true
	},
	{
		question: "一国的国内生产总值小于国民生产总值，说明该国公民从外国取得的收入（   ）外国公民从该国取得的收入。",
		answers: [
			"大于"
		],
		isFAQ: true
	},
	{
		question: "如果（   ），我们就说一种商品的需求缺乏弹性。",
		answers: [
			"需求量变化百分比小于价格变化百分比"
		],
		isFAQ: true
	},
	{
		question: "在完全垄断厂商的最好或最优产量处（   ）。",
		answers: [
			"MR＝MC"
		],
		isFAQ: true
	},
	{
		question: "在竞争性市场和垄断市场中，厂商将扩大其产出水平的情况是（   ）。",
		answers: [
			"边际收益高于边际成本"
		],
		isFAQ: true
	},
	{
		question: "如果一种商品的价格上升时，需求量完全没有下降，那么该商品的需求（   ）。",
		answers: [
			"无弹性"
		],
		isFAQ: true
	},
	{
		question: "奔腾型通货膨胀，其通货膨胀率为（   ）。",
		answers: [
			"10%以上和100%以内"
		],
		isFAQ: true
	},
	{
		question: "在不完全竞争市场中出现低效率的资源配置是因为产品价格（   ）边际成本",
		answers: [
			"大于"
		],
		isFAQ: true
	},
	{
		question: "总需求曲线向右下方倾斜的原因在于（   ）。",
		answers: [
			"价格水平下降，消费的增加"
		],
		isFAQ: true
	},
	{
		question: "假如某商品的价格从9元下降到8元，需求量从50增加到60，则该商品的需求（   ）。",
		answers: [
			"富有弹性"
		],
		isFAQ: true
	},
	{
		question: "厂商的要素需求曲线向右下方倾斜的原因在于（   ）。",
		answers: [
			"边际产量递减"
		],
		isFAQ: true
	},
	{
		question: "政府提供的物品（   ）。",
		answers: [
			"不都是公共物品"
		],
		isFAQ: true
	},
	{
		question: "从国民生产总值减去下列项目称为国民生产净值（   ）。",
		answers: [
			"折旧"
		],
		isFAQ: true
	},
	{
		question: "在完全竞争市场上，厂商短期内继续生产的最低条件是（   ）。",
		answers: [
			"AVC＜AR或AVC＝AR"
		],
		isFAQ: true
	},
	{
		question: "如果一种商品的价格变化5%，需求量因此变动2%，那么该商品的需求（   ）。",
		answers: [
			"缺乏弹性"
		],
		isFAQ: true
	},
	{
		question: "在同一个平面图上有（   ）。",
		answers: [
			"无数条无差异曲线"
		],
		isFAQ: true
	},
	{
		question: "如果一种商品的价格变化5%，需求量因此变动10%，则该商品的需求价格弹性为（   ）。",
		answers: [
			"富有弹性"
		],
		isFAQ: true
	},
	{
		question: "一般说来，某个大学生毕业后未能立即找到工作，属于（   ）。",
		answers: [
			"摩擦性失业"
		],
		isFAQ: true
	},
	{
		question: "经济增长在图形上表现为（   ）。",
		answers: [
			"生产可能性曲线向外移动"
		],
		isFAQ: true
	},
	{
		question: "当经济过热时，中央银行可以在金融市场上（   ）。",
		answers: [
			"卖出政府债券，提高再贴现率"
		],
		isFAQ: true
	},
	{
		question: "如果生产6单位产量用54元，生产5单位产量用40元，则平均成本（   ）。",
		answers: [
			"小于边际成本并上升"
		],
		isFAQ: true
	},
	{
		question: "由于利率的不确定性，根据对市场利率变化的预期需要持有货币以便从中获利的动机是（   ）。",
		answers: [
			"投机动机"
		],
		isFAQ: true
	},
	{
		question: "交易型货币数量学说的提出者是（   ）。",
		answers: [
			"费雪"
		],
		isFAQ: true
	},
	{
		question: "菲利普斯曲线说明（   ）。",
		answers: [
			"通货膨胀与失业率之间呈负相关"
		],
		isFAQ: true
	},
	{
		question: "令FC＝固定成本，Q＝产量，MC＝边际成本，TC＝总成本，VC＝可变成本，则平均成本等于（   ）。",
		answers: [
			"（FC+VC）/Q"
		],
		isFAQ: true
	},
	{
		question: "一垄断者如果有一线性需求函数，总收益增加时（   ）。",
		answers: [
			"边际收益为正值且递减"
		],
		isFAQ: true
	},
	{
		question: "一个垄断厂商在长期中一直获得经济利润，那么（   ）。",
		answers: [
			"其他厂商无法进入该行业与其竞争"
		],
		isFAQ: true
	},
	{
		question: "经济周期的四个阶段依次是（   ）。",
		answers: [
			"繁荣、衰退、萧条、复苏"
		],
		isFAQ: true
	},
	{
		question: "经济中的总供给曲线描述的是（   ）。",
		answers: [
			"总供给量与价格总水平之间的关系"
		],
		isFAQ: true
	},
	{
		question: "在完全竞争市场上，生产要素的需求曲线向右下方倾斜是由于（   ）。",
		answers: [
			"要素的边际产量递减"
		],
		isFAQ: true
	},
	{
		question: "如果一种商品的需求缺乏弹性（   ）。",
		answers: [
			"价格上升时总收益增加"
		],
		isFAQ: true
	},
	{
		question: "8～10年一次的经济周期称为（   ）。",
		answers: [
			"朱格拉周期"
		],
		isFAQ: true
	},
	{
		question: "政府运用赤字财政政策是（   ）。",
		answers: [
			"将公债卖给中央银行"
		],
		isFAQ: true
	},
	{
		question: "在通货膨胀中受益的群体是（   ）。",
		answers: [
			"债务人"
		],
		isFAQ: true
	},
	{
		question: "当产量增加时，LAC下降，这是由于（   ）。",
		answers: [
			"规模报酬递增"
		],
		isFAQ: true
	},
	{
		question: "可用来描述一个养蜂主与其邻近的经营果园的农场主之间的影响的术语是（   ）。",
		answers: [
			"外部经济"
		],
		isFAQ: true
	},
	{
		question: "如果收入分配不均等，洛伦兹曲线就会（   ）。",
		answers: [
			"越弯曲"
		],
		isFAQ: true
	},
	{
		question: "某国2004年的名义GDP总值为1500亿美元，以2000年为基期的实际GDP总值为1200亿美元，则2004年的价格平减指数为（   ）。",
		answers: [
			"125"
		],
		isFAQ: true
	},
	{
		question: "为了提高资源配置效率，政府对自然垄断部门的垄断行为是（   ）。",
		answers: [
			"加以管制的"
		],
		isFAQ: true
	},
	{
		question: "需求规律说明（   ）。",
		answers: [
			"计算机价格下降导致销售量增加"
		],
		isFAQ: true
	},
	{
		question: "一般来说，无差异曲线的形状是（   ）。",
		answers: [
			"向右下方倾斜的曲线"
		],
		isFAQ: true
	},
	{
		question: "当一个垄断竞争厂商实现短期均衡时，（   ）。",
		answers: [
			"它获得超额利润、发生亏损及只获得正常利润这三种情况都可能发生"
		],
		isFAQ: true
	},
	{
		question: "商品的价格不变而消费者的收入增加，预算约束线（   ）。",
		answers: [
			"向右上方移动"
		],
		isFAQ: true
	},
	{
		question: "总效用曲线达到顶点时（   ）。",
		answers: [
			"边际效用为零"
		],
		isFAQ: true
	},
	{
		question: "A: Do I know you? B:_______.",
		answers: [
			"Maybe"
		],
		isFAQ: false
	},
	{
		question: "Are you fluent in_______?",
		answers: [
			"English"
		],
		isFAQ: false
	},
	{
		question: "A: Allow me to introduce myself. I’m Jim. B:_______.",
		answers: [
			"Nice to see you"
		],
		isFAQ: false
	},
	{
		question: "A:You are so smart. B:_______.",
		answers: [
			"Thank you"
		],
		isFAQ: false
	},
	{
		question: "A: I’m sorry, I didn’t catch what you said. Can you _______ it again?",
		answers: [
			"say"
		],
		isFAQ: false
	},
	{
		question: "10.A:Where do you live.   B:_______.",
		answers: [
			"I live in China"
		],
		isFAQ: false
	},
	{
		question: "A:Good night!   B: _______.",
		answers: [
			"Good night"
		],
		isFAQ: false
	},
	{
		question: "A: Where are you from ?    B: I come from_______.",
		answers: [
			"America"
		],
		isFAQ: false
	},
	{
		question: "A: How are you.  B:_______.",
		answers: [
			"I am fine"
		],
		isFAQ: false
	},
	{
		question: "A: Can you tell me how _____ is that coat? B: It is 5 yuan.",
		answers: [
			"much"
		],
		isFAQ: false
	},
	{
		question: "仲裁:凡有关本合同或执行本合同而发生的一切争执，应通过友好协商解决。如不能解决，则应提交中国国际经济贸易仲裁委员会，按照该会的仲裁规则在北京进行仲裁。该仲裁委员会作出的裁决是最终的，买卖双方均应受其约束，任何一方不得向法院或其它机关申请变更。仲裁费用由败诉一方承担。",
		answers: [
			"ARBITRATION：All disputes in connection with this contract or the execution thereof shall be settled through friendly negotiations. In case no settlement can be reached through negotiations the case should then be submitted for arbitration to China International Economic and Trade Arbitration Commission Beijing in accordance with its arbitration rules. The arbitration shall be final and binding upon both parties neither party shall seek recourse to a law court or other authorities for revising the decision. The arbitration fee shall be borne by the losing party."
		],
		isFAQ: true
	},
	{
		question: "DOCUMENT：The sellers shall present the following documents to the paying bank for negotiation/collection, or to the buyers in case of payment by M/T. (1) Full set of Negotiable Clean on Board Ocean Bills of Lading marked “FREIGHT TO COLLECT” and made out to order, blank endorsed, and notifying the China National Foreign Trade Transportation Corporation at the port of destination. (2) parcel post Receipt, indicating postage/Air Way Bill. (3)Insurance Policy or Certificate, covering War risk and all risks including TPND, Breakage and Leakage irrespective of percentage and indicating “In the event of loss or damage, request for survey upon arrival of the cargo at the port of destination be made to the China Commodity Inspection Bureau of that port”. (4)Invoice in quintuplicate, indicating contract number and shipping mark. (5)Packing List in duplicate with indication of both gross and net weights, measurements and quantity of each item packed. (6)Certificate of Quality and Quantity/Weight and Testing Report, each in duplicate issued by the manufacturers as specified in items of Clause 18 hereof.",
		answers: [
			"单据：卖方应将下列单据提交付款银行议付货款/托收付款，如为信汇付款，下列单据应径寄买方： (1)全套可议付的洁净已装运海运提单，空白抬头，空白背书。注明“运费到付”，并通知到货口岸中国对外贸易运输公司。 (2)邮包收据注明邮费/空运提单。 (3)保险单或保险证明书注明投保战争险，一切险包括偷窃提货不着险、破碎险、渗漏险、不计免赔率，并注明货物到达后倘发现残损情况，须向到货口岸之中国商品检验局申请检验。 (4)发票五份，注明合同号，唛头。 (5)装箱单两份，注明毛重、净重、尺码和所装货物每项的品名数量。 (6)按照本合同第18条项规定由制造厂签发的质量和数量/重量证明书及检验报告各两份。"
		],
		isFAQ: true
	},
	{
		question: "The vender shall deliver the goods to the vendee by June 15.",
		answers: [
			"卖方须于6月15日或之前将货物交给买方。"
		],
		isFAQ: true
	},
	{
		question: "装运条款：每次发货如毛重超过两公吨，卖方应于本合同第8条规定的装运期六十天前，将合同编号、商品名称、数量、价值、件数、毛重、尺码以及货物在装货口岸备妥日期函/电告买方，以便买方订舱。如毛重不超过两公吨，则卖方应与装货口岸的买方货运代理人直接联系装运事宜。",
		answers: [
			"TERMS OF SHIPMENT： For each shipment exceeding two metric tons in gross weight the sellers shall 60 days before the date of shipment stipulated in Clause 8 hereof advise the buyers by cable/letter of the contract number name of commodity quantity value number of packages gross weight and measurements and date of readiness at the port of shipment in order for the buyers to book shipping space. For each shipment not over two metric tons in gross weight the sellers shall get in direct touch with the buyers shipping agent at the loading port."
		],
		isFAQ: true
	},
	{
		question: "西林山清水秀，景色怡人，旅游资源丰富。",
		answers: [
			"Xinlin is proud of its picturesque scenery and rich tourism resources."
		],
		isFAQ: true
	},
	{
		question: "投标书格式      致：（招标机构）      根据贵方为（项目名称） 项目招标采购货物及服务的投标邀请 （招标编号），签字代表 （姓名、职务） 经正式授权并代表投标人 （投标人名称、地址）提交下述文件正本一份及副本   份。    1. 开标一览表    2. 投标分项报价表    3. 货物说明一览表    4. 技术规格响应/偏离表    ……    投标人代表签字：    投标人名称：    公 章：    日 期： 译文：    Form of Tender   To: (name of Bidding Agent)   In compliance with your IFB    No.        for Goods and Services to be supplied for the          Project, the undersigned representative (full name and title) duly authorized to act in the name and for the account of the Bidder (name and address of the Bidder) hereby submit the following in one original and _______copies:   1. Summary Sheet for Bid Opening;   2. Bid Schedule of Prices;   3. Brief Descriptions of the Goods;   4. Responsiveness/Deviation Form for Technical Specifications;   …   Name of Representative:   Name of the Bidder:   Official Seal:   Date:  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：中英文投标书行文语序基本相同，但是为了使译文的表达更符合专业特点，翻译时套用了许多专用词语和文体词语。如表示“根据”不是“according to”而是用“in compliance with”；“经正式授权并代表”增加了“to act in the name”（以...的名义）， 补充“for the account of”（代表），使得译文更加严密；虽然原文中并没有复合副词“特此”，但译文在套用文体词语“hereby”之后，不仅意思完全正确，而且也体现了招标投标文本作为法律文本的规范性、庄重性。      同样，原文中要求提交的四份“表”，译文对应采用“sheet”、“schedule”、“brief descriptions”和“form”的四种不同翻译，这些“表”是招投标文本中通常使用的普通术语，可以套用专业词典中现成的对等英译；“投标人代表签字”则简化成“Name of Representative”（代表名称），译文的排列套用了下一行译法格式，整齐统一。"
		],
		isFAQ: true
	},
	{
		question: "装运条款：每次发货如毛重超过两公吨，卖方应于本合同第8条规定的装运期六十天前，将合同编号、商品名称、数量、价值、件数、毛重、尺码以及货物在装货口岸备妥日期函/电告买方，以便买方订舱。如毛重不超过两公吨，则卖方应与装货口岸的买方货运代理人直接联系装运事宜。",
		answers: [
			"TERMS OF SHIPMENT： For each shipment exceeding two metric tons in gross weight the sellers shall 60 days before the date of shipment stipulated in Clause 8 hereof advise the buyers by cable/letter of the contract number name of commodity quantity value number of packages gross weight and measurements and date of readiness at the port of shipment in order for the buyers to book shipping space. For each shipment not over two metric tons in gross weight the sellers shall get in direct touch with the buyers shipping agent at the loading port."
		],
		isFAQ: true
	},
	{
		question: "What is the matter?",
		answers: [
			"怎么了？"
		],
		isFAQ: true
	},
	{
		question: "commercial invoice",
		answers: [
			"商业发票"
		],
		isFAQ: true
	},
	{
		question: "confirming bank",
		answers: [
			"保兑行"
		],
		isFAQ: true
	},
	{
		question: "Foreign Direct Investment",
		answers: [
			"直接投资"
		],
		isFAQ: true
	},
	{
		question: "There are quantities of this item here, in different weight and sizes, with varied colors and shapes. The price is very reasonable and the quotations will be given upon request.",
		answers: [
			"我方现有各种不同重量、不同体积、颜色丰富、形状各异的大理石 数量甚巨。价格合理 受函报价。"
		],
		isFAQ: true
	},
	{
		question: "Please kindly send us your price list and catalogue as soon as possible．",
		answers: [
			"恳请贵方尽快将价格单和目录表寄给我方。"
		],
		isFAQ: true
	},
	{
		question: "But I would appreciate it if you could arrange it for us.",
		answers: [
			"如果你能为我们安排一下，我们会感激不尽的。"
		],
		isFAQ: true
	},
	{
		question: "The L/ C shall reach the seller 30 days before the shipment.",
		answers: [
			"信用证须在装船前30天到达卖方。"
		],
		isFAQ: true
	},
	{
		question: "真诚欢迎海内外各界朋友前来参观考察、观光旅游和投资创业。",
		answers: [
			"We sincerely welcome friends from home and abroad to visit and place investments."
		],
		isFAQ: true
	},
	{
		question: "We regret to inform you that our buyers in London find your price much too high.",
		answers: [
			"我们遗憾地通知贵方我们在伦敦的买家认为贵方的价格太高。"
		],
		isFAQ: true
	},
	{
		question: "Sales or Purchase Contract",
		answers: [
			"销售或购货合同"
		],
		isFAQ: true
	},
	{
		question: "ordering costs",
		answers: [
			"订货成本"
		],
		isFAQ: true
	},
	{
		question: "（山东馆）展馆外观以雄峙天东的泰山为主视角，侧面是抽象的大海浪涌形象，形成“青山连绵不绝，绿水长流不断”的文化意境，勾勒出“海岱文化”的山东地理形态。入口设计成敞开式，表达“有朋自远方来，不亦乐乎”的热情与好客。馆内有“智慧长廊”、“城市窗口”和“齐鲁家园”三大展区，展示文化山东、魅力山东、好客山东以及山东人未来的城市生活，进而表达“和而不同，我们的家园”的城市内涵。",
		answers: [
			"The pavilion forms the cultural conception of “stretching mountains and rivers” and depicts Shandong’s geographical features from the main perspective of the towering Mt. Tai. The open entrance displays the hospitality for friends from afar. The three sections of “Wisdom Corridor” “City Window” and “Shandong Home” show Shandong’s culture charm and hospitality and future city life and express the connotation of “Harmonious but Different Our Home”."
		],
		isFAQ: true
	},
	{
		question: "Shipment must be effected in three equal lots by separate steamers with an interval of at least 30 days between shipments. Documents must separately negotiated.",
		answers: [
			"货物必须分成3次相同数量每次装运时间至少间隔30天由不同的轮船装运。单据必须分开议付。"
		],
		isFAQ: true
	},
	{
		question: "我公司正在考虑为每位销售代表配备一台袖珍计算器。而我们从上月举行的广交会上看到贵方展出的AMB 型，认为这款计算器能满足我方要求。   据我所知，AMB 每台售价36.2 美元，不知大批订购是否另有优惠，我方首批订货将为200台。   除价格信息外，我方还想了解有关贵方服务、保修、携带护套、电池等细节，即有助于我方做出购买决定的任何信息。",
		answers: [
			"We are considering providing each of our sales representatives with a pocket calculator. We saw your Model AMB displayed at Guangzhou Commodities Fair last month and found that it would fill our needs very well.    We know that AMB costs US $36.2 each but we wonder whether there is a trade discount for fairly large quantities. Our first order would be 200.   Besides the price information we also need complete details about your services warranties carrying case battery—any information that may help us in making the purchase decision.   Your prompt reply would be appreciated."
		],
		isFAQ: true
	},
	{
		question: "force majeure",
		answers: [
			"不可抗力"
		],
		isFAQ: true
	},
	{
		question: "warranty",
		answers: [
			"保修期"
		],
		isFAQ: true
	},
	{
		question: "The offer is based on an expanding market and is competitive．",
		answers: [
			"此报盘着眼于扩大销路且很有竞争性。"
		],
		isFAQ: true
	},
	{
		question: "with a long standing reputation",
		answers: [
			"久负盛名"
		],
		isFAQ: true
	},
	{
		question: "If serious pains can not be alleviated, 1-2 minutes later, reapply it.",
		answers: [
			"若剧烈疼痛仍不缓解，可间隔1-2分钟重复给药。"
		],
		isFAQ: true
	},
	{
		question: "Letter of Acceptance",
		answers: [
			"中标函"
		],
		isFAQ: true
	},
	{
		question: "Sales or Purchase Contract",
		answers: [
			"销售或购货合同"
		],
		isFAQ: true
	},
	{
		question: "原文：Packing must be suitable for ocean shipment and sufficiently strong to withstand rough handling. Bales must be press-packed and hooped, with adequate inside waterproof protection and the outer wrapping must comprise good quality canvas. 译文：包装必须适用于海洋运输并非常结实能够抵抗野蛮装卸。捆包必须压紧包装并加扣环，内有防水保护，外用质地优良的帆布包装。                     原文：Drafts at sight for full invoice value drawn on Bank of China, Nanjing Branch. 译文：以发票总金额开给中国银行南京分行的即期汇票。  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：包装条款是信用证中的常见条款，一般包括包装单据、包装材料、包装方式和包装要求等。常用的与包装相关的术语有装箱单（packing list)、包装说明（packing specification)、重量单（weight list/weight note)、花色搭配单（assortment list)、重量尺码明细单（specification list of weights and measurements)。   介词 on 常见的意思是 “在……之上”。于是在短语 on board 中，意思是在船的甲板上，也就是指货物已经装上船了，应译为“已装船”。而在句中 drawn on …意思是汇票的付款人 （drawee），根据句意也就是指该汇票由中国银行南京分行来进行付款。虽然在字面翻译上没有直接体现出来，但必须正确理解其含义才能将其正确地翻译出来。"
		],
		isFAQ: true
	},
	{
		question: "Legal Instruments",
		answers: [
			"法律文本"
		],
		isFAQ: true
	},
	{
		question: "Please kindly send us your price list and catalogue as soon as possible．",
		answers: [
			"恳请贵方尽快将价格单和目录表寄给我方。"
		],
		isFAQ: true
	},
	{
		question: "open account",
		answers: [
			"赊账"
		],
		isFAQ: true
	},
	{
		question: "The Seller shall sell to the Buyer，and the Buyer shall purchase from the Seller 3,000 units of the goods at the price of US $ 150 per unit．",
		answers: [
			"卖方以每单位150 美元的价格出售3000 件货物。买方同意以此价格购买该批货物。"
		],
		isFAQ: true
	},
	{
		question: "The full set of shipping documents shall accompany the collection draft and only be released after full payment of the invoice value.",
		answers: [
			"全套装运单据联同托收汇票，仅在全额发票总值得以支付后放单。"
		],
		isFAQ: true
	},
	{
		question: "受益人必须证实商品的规格、数量和价格与其形式发票上所提交的一致。",
		answers: [
			"Beneficiary must certify that specifications quantities and prices of goods are in conformity with those mentioned in their proforma invoice."
		],
		isFAQ: true
	},
	{
		question: "Party B shall check the quality of each discharge in accordance with the contract.",
		answers: [
			"乙方应按合同规定检查发出的每批货物的质量。"
		],
		isFAQ: true
	},
	{
		question: "bill of lading",
		answers: [
			"海运提单"
		],
		isFAQ: true
	},
	{
		question: "原文：         Hong Kong Disneyland Resort brings the magic of a world-class entertainment experience to people of all ages. Hong Kong is home to the fifth Disney Resort in the world. The city's landscape and vibrant, diverse culture have inspired our imagineers to create a variety of entertainment that is unique to Hong Kong Disneyland Resort.          Hong Kong Disneyland Resort is owned by a joint venture company, Hong Kong International Theme Parks Limited, with shareholders, the Hong Kong Government and The Walt Disney Company. As of the end of fiscal 2012, the Hong Kong Government holds 52 per cent of shares in the company and The Walt Disney Company holds 48 per cent.      In addition to Main Street, U.S.A., Adventureland, Tomorrowland and Fantasyland, three new themed areas, Toy Story Land, Grizzly Gulch and Mystic Point, were opened in 2011, 2012 and 2013 respectively. More than 30 new attractions, as well as immersive and entertainment experiences were added, bringing the total number of attractions and experiences at Hong Kong Disneyland to more than 100. The park's physical footprint has increased by nearly 25 per cent. To date, Hong Kong Disneyland Resort has welcomed millions of Guests, both local and international, making it one of the top destinations in the region.    译文：     香港迪士尼乐园度假区致力为不同年龄的宾客带来世界级娱乐体验。香港是全球第五个拥有迪士尼乐园的城市，其优美景致、活力及多元文化启发幻想工程师创造出多个香港迪士尼乐园独有的游乐设施。      香港迪士尼乐园度假区由合营公司----香港国际主题乐园有限公司拥有，股东为香港特区政府和华特迪士尼公司。截至2012年年度财政，香港特别行政区政府持有香港国际主题乐园有限公司52%的权益，华特迪士尼公司则持有48%的权益。 除了“美国小镇大街”、“探险世界”、“明日世界”及“幻想世界”，三个扩建园区包括“反斗奇兵大本营”、“灰熊山谷”及“迷离庄园”已分别于2011、2012及2013年开幕，增加超过30个新的游乐设施及体验，令现时乐园内有逾百个游乐设施及体验。乐园的实际面积亦因此增加了25%。至今，乐园度假区已接待逾千万本地及海外宾客，成为香港的一个旅游热点。  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析:         由于原文逻辑清晰，语言规范，内容区分条理性强，因此译者的主要任务就是以通畅的语言、妥帖的语气，完整地译出原文即可。在文中提到的各种游艺设施译名不确定的情况下，译者需本着求真的态度，利用网络资源查证后再定夺。全文基本采用直译法。"
		],
		isFAQ: true
	},
	{
		question: "non-performing loans",
		answers: [
			"不良贷款"
		],
		isFAQ: true
	},
	{
		question: "Term of payment",
		answers: [
			"付款条件"
		],
		isFAQ: true
	},
	{
		question: "Dear Sirs,   Thank you very much for your inquiry of 20th Oct. We are pleased to send you samples of our Fancy Buttons Nos. 42 and 81 for spring coats.   Pattern No. 42: US$26 per box CIF Bombay, each box containing five dozen.   Pattern No. 81: US$36 per box CIF Bombay, each box containing five dozen.   The above prices are subject to market fluctuations. For quantities more than 150 dozen, we will reduce the price by 3 percent.   These buttons are of exceptional beauty and are packed in wooden cases, each containing twenty boxes.   Shipment will be made within three weeks from acceptance of your order. Our terms are draft at sight under an irrevocable letter of credit.   Thank you again for your interest in our products. We are looking forward to your order and you may be assured that it will receive our prompt and careful attention.                                                                                                                                                                        Yours truly，",
		answers: [
			"尊敬的先生：   多谢10月20日来函询价，现寄去第42号和 81号春装花式纽扣样品。   42号款式：每盒五打装，成本加保险、运费到孟买价每盒26元。   81号款式：每盒五打装，成本加保险、运费到孟买价每盒36元。   上述价格随市价变动。订货数量150打以上者，可减价3%。   这两款纽扣特别美观，木箱包装，每箱装20盒。接受订单后3周内交货。货款以不可撤销信用证即期汇票支付。   再次感谢你们寻购我方产品，盼来订单，我们保证迅速妥为办理。  敬上"
		],
		isFAQ: true
	},
	{
		question: "savings account",
		answers: [
			"储蓄账户"
		],
		isFAQ: true
	},
	{
		question: "（重庆馆）展馆外观造型以“夔门天下雄”和山城险峭的山峰元素抽象变形，突出“两江环抱、城中山、山中城”的城市形态。展馆主要分“天生重庆”、“人文重庆”、“奇迹重庆”三个展示区和“新能源 4D 体验”、“非遗与高科技演示”两个互动体验区，通过梳理重庆的生态足迹、人文足迹和城市足迹演绎城市的变迁。展馆以“宜居重庆”、“畅通重庆”、“森林重庆”、“平安重庆”、“健康重庆”来展现重庆新的经济增长方式和构建山地森林城市体系的美好愿景。",
		answers: [
			"The shape of the pavilion borrows the elements of Kuimen and steep mountains highlighting the pattern of “a mountain city surrounded by two rivers”. The three sections and the two interaction areas interpret the city’s changes by presenting the city’s footprints of ecological cultural and urban development. The pavilion shows Chongqing’s new mode of economic growth and vision of the mountains and forest city system from aspects of Habitable Chonging Forest Chongqing and Healthy Chongqing."
		],
		isFAQ: true
	},
	{
		question: "global liquidity",
		answers: [
			"全球流动性"
		],
		isFAQ: true
	},
	{
		question: "建议投标者去工程现场参观，以便获得足够的信息准备标书，撰写合同。现场参观费用由投标者自己承担。",
		answers: [
			"The tenderer is advised to visit and examine the Site of the Works and the surroundings and to obtain for himself on his own responsibility all information that may be necessary for preparing the tender and entering into a contract. The costs of visiting the site shall be at the tenderer’s own expense."
		],
		isFAQ: true
	},
	{
		question: "We hereby issue this irrevocable documentary credit in your favour, which is available by payment against presentation of the following documents.",
		answers: [
			"我方在此开具了以你方为受益人的不可撤销的跟单信用证该信用证将凭出示以下单据议付。"
		],
		isFAQ: true
	},
	{
		question: "湖南因地处洞庭湖之南，所以叫做湖南。",
		answers: [
			"As it is situated south of Lake Dongting Hunan Province has the name Hunan which means “south of the lake”."
		],
		isFAQ: true
	},
	{
		question: "Sitting in the north of the Pacific Ocean, the string of Hawaii islands has some of the most beautiful beaches on earth. With pure white sands lined with green cliffs, in summer the sea is great for surfing, swimming and diving. The mild climate, green trees and charming flowers offer beauty and harmony to tourists all year round.",
		answers: [
			"夏威夷群岛位于太平洋北部，拥有世界上最迷人的海滩。洁白纯净的沙滩，绿绿的悬崖，夏天，这里是人们冲浪、游泳和潜水的圣地。夏威夷的气候温和宜人，树木葱绿，鲜花绽放，一年四季都令人赏心悦目。"
		],
		isFAQ: true
	},
	{
		question: "irrevocable letter of credit",
		answers: [
			"不可撤销信用证"
		],
		isFAQ: true
	},
	{
		question: "Please allow me to introduce myself.",
		answers: [
			"请允许我做一个自我介绍。"
		],
		isFAQ: true
	},
	{
		question: "negotiating bank",
		answers: [
			"议付行"
		],
		isFAQ: true
	},
	{
		question: "cost, insurance and freight",
		answers: [
			"成本加保险费、运费"
		],
		isFAQ: true
	},
	{
		question: "原文：                                  第十一届北京国际汽车展览会（2010）新闻推介宣传稿（节选）         2009 年，受国际金融危机影响，全球汽车业受到严重冲击，陷入普遍低迷境地。为应对金融危机的影响，落实保增长、扩内需、调结构的总体要求，稳定汽车消费，加快结构调整，增强自主创新能力，推动产业升级，促进我国汽车产业持续、健康、稳定发展，中国政府制定并出台了《汽车产业调整和振兴规划》等一系列积极、有效的促进政策。在国家政策的支持下，伴随着我国经济良好、稳定的发展，我国汽车市场在全球逆势上行，在经济危机中呈现出积极的增长态势。2009 年我国汽车产销均突破 1360万辆，成为全球汽车市场中增速最快和最重要的新兴市场，是跨国汽车巨头汽车销售业绩的主要增长点。 译文：        Affected seriously by the global financial crisis, automobile industry was suffering and slumping in 2009. In order to spur the development of Chinese automobile industry under the global financial crisis, to keep China’s economic growth, and to adjust industry structure, the Chinese government approved the “Adjustment and Vitalization Plan for Auto Industry” in 2009. It aimed at expanding domestic demand, speeding up adjustment of structure, stabilizing vehicle consumption, enhancing the independent innovation capability, propelling industry upgrading, and assisting auto industry with healthy and sustainable development. Thanks to the adjustment and stimulus plan for the automotive industry and a series of policies boosting economic growth, China’s automotive markets buck the trend, showing the positive trend of development in the financial crisis. The annual vehicle sales volume in China was over 13.6 million in 2009, becoming the fastest and the most important emerging auto market worldwide, as well as the main growth points of multinational auto companies.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：        这段汉语原文主要介绍了第十一届北京国际汽车展览会（2010）举办车展的国内特殊经济背景，其中不惜笔墨，花大气力描写了中国政府为了促进汽车业的发展，详细列举了国家的相关产业政策，目的是为了衬托中国汽车市场在全球逆势而上，在经济危机之中仍然能够呈现出增长的势头等。原文这样大费周折目的就是为了说明中国是世界汽车商家最好的投资市场，以便吸引更多的投资者。        这段文字对于中国读者而言，会使其具有身临其境的感觉和产生身同感受的共鸣，但是对于外国商家受众来讲，他们的阅读兴趣和关注点并不在于中国政府采取什么样的具体措施加以调整汽车产业结构，也不在于汽车产业要达到什么样的光明前景。他们只需要简要大致地了解一下作为铺垫性的中国国内的经济背景和政府为之出台的一些政策措施就足够了。        所以这段会展推介文本中的“为应对金融危机的影响，落实 ……等一系列积极、有效的促进政策”的介绍性文字，就显得累赘冗长，而且与会展英语语言明晰简洁的特点相左。考虑到译文的接受效果，在翻译中宜一笔带过，删减细枝末叶，加以灵活变译，方能达到会展推介文本的感召功能。所以上述译文应删减“It aimed at expanding domestic demand speeding up adjustment of structure stabilizing vehicle consumption enhancing the independent innovation capability propelling industry upgrading and assisting auto industry with healthy and sustainable development.”语句，做出灵活的变通减译。这样字斟句酌、一字不漏地译出该段文字的所有内容，只会让译文读者感到费解，而于宣传效果无益。"
		],
		isFAQ: true
	},
	{
		question: "Documents to be negotiated by drafts drawn at 60 days’ sight for full invoice amount on DBS Bank Ltd, Singapore accompanied with the following documents.                          单证可凭按全额发票开给新加坡DBS银行的60天期汇票，随下列单据议付。 Bank of China, Beijing branch, China is authorized to release documents, once negotiated under and in strict compliance with terms and conditions of the present L/C,to ABC Company. 一旦本信用证项下议付且单据与本信用证条款完全相符后，兹授权中国银行北京分行放单给ABC公司。  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析： 信用证出票条款中常用的动词是“draw”经常组成“draw on ”或者“be drawn on somebody/something”等词组，表示开给（以某方为付款人）的汇票，出票给……的意思，对象物前面要用介词“on”。                                               议付信用证多使用“negotiate/negotiation”议付条款一般来说伴有介词或介词短语的使用，以表示“议付条款”的议付条件和依据。但是需要注意，“negotiate/negotiation/negotiable”在不同的信用证条款中可能表达不同的意思，在翻译的时候要格外注意。"
		],
		isFAQ: true
	},
	{
		question: "Party A agrees that the expiration of this license shall not discharge party B from its obligation.",
		answers: [
			"甲方同意在许可证到期时并不免除乙方应尽的义务。"
		],
		isFAQ: true
	},
	{
		question: "certificate of origin",
		answers: [
			"原产地证书"
		],
		isFAQ: true
	},
	{
		question: "该条款要求卖方出具经签署的正本商业发票一式三份，且发票应反映出500 美元的佣金扣减。",
		answers: [
			"Signed original commercial invoice in triplicate showing a deduction of USD 500 being commission．"
		],
		isFAQ: true
	},
	{
		question: "open policy",
		answers: [
			"预约保函"
		],
		isFAQ: true
	},
	{
		question: "西林山清水秀，景色怡人，旅游资源丰富。",
		answers: [
			"Xinlin is proud of its picturesque scenery and rich tourism resources."
		],
		isFAQ: true
	},
	{
		question: "asset prices",
		answers: [
			"资产价值"
		],
		isFAQ: true
	},
	{
		question: "We open this Irrevocable Documentary Credit favoring yourselves for a sum not exceeding a total of USD 33,677.00 available against your draft at sight by negotiation on us.",
		answers: [
			"我们开出了以你方为受益人的总金额不超过33677美元的即期在我方议付的不可撤销的信用证。"
		],
		isFAQ: true
	},
	{
		question: "confirmed letter of credit",
		answers: [
			"保兑信用证"
		],
		isFAQ: true
	},
	{
		question: "如果我方得到同意放弃不符点，我方可以放单并进行结算。",
		answers: [
			"We may release the documents and effect settlement should such a waiver of discrepancy be obtained．"
		],
		isFAQ: true
	},
	{
		question: "昆曲源于江苏，是典型的古老剧种。昆剧表演的最大特点是抒情性强、唱词清晰，因此，昆曲被列为“人类口头和非物质遗产代表作”。",
		answers: [
			"Kunqu Opera which originated around Jiangsu Province is a typical ancient opera style and features gentleness and clearness. This enabled it to be ranked among the Masterpieces of the Oral and Intangible Heritage of Humanities."
		],
		isFAQ: true
	},
	{
		question: "本届论坛将直接服务于进口博览会的总体目标，紧扣当前国际国内经贸发展的新趋势和新变化，体现开放发展新理念，着眼于推进开放、包容、普惠、平衡、共赢的经济全球化和构建开放型世界经济，促进全球贸易增长。    届时，有关国家政要和国际组织负责人、全球商界领袖、知名专家学者将齐聚上海，共同探讨实现经济全球化、贸易投资自由化便利化的新路径，就国际经贸发展新趋势、新变化、新动向展开精彩纷呈的思维交锋，为新时期国际经贸发展建言献策。",
		answers: [
			"The Hongqiao International Economic and Trade Forum directly serves the overall objectives of the China International Import Expo. It focuses on the new trends and new changes in economic development at home and abroad reflects new philosophies derived from inclusive development aims at promoting economic globalization that is open inclusive comprehensively-beneficial balanced and win-win building an open world economy and prompting global trade growth.   At the Forum heads of states entrepreneurs scholars will discuss new paths for economic globalization trade and investment liberalization and facilitation share their knowledge and views on the new economy and new forms of business and propose suggestions on international trade development in the new era."
		],
		isFAQ: true
	},
	{
		question: "Designed with a computer．Silenced by a laser．Built by a robot．",
		answers: [
			"电脑设计，激光消音，机器人制造。"
		],
		isFAQ: true
	},
	{
		question: "真诚欢迎海内外各界朋友前来参观考察、观光旅游和投资创业。",
		answers: [
			"We sincerely welcome friends from home and abroad to visit and place investments."
		],
		isFAQ: true
	},
	{
		question: "Contract for Technology Transfer",
		answers: [
			"技术转让合同"
		],
		isFAQ: true
	},
	{
		question: "红灯亮时即可切断电源。",
		answers: [
			"When the red indicator is on the switch can be turned off."
		],
		isFAQ: true
	},
	{
		question: "monetary policy",
		answers: [
			"货币政策"
		],
		isFAQ: true
	},
	{
		question: "cultural gap",
		answers: [
			"文化差异"
		],
		isFAQ: true
	},
	{
		question: "It’s not an easy task for you to persuade your potential sponsors to become your partners.",
		answers: [
			"让潜在的赞助商成为你的合伙人，可不是一件容易的事情。"
		],
		isFAQ: true
	},
	{
		question: "原文：     本合同的订立、效力、解释、履行和争议的解决均受中华人民共和国法律的管辖。 原译：     It is mutually understood that this is a contract of which the entering, effects, construction, performance and solution of disputes are all subject to the laws of the People's Republic of China. 改译：     It is mutually agreed that the making, validity, interpretation and performance of the contract and the settlement of its disputes shall all be subject to the relevant laws of the People’s Republic of China.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         原译将合同条款中的“订立、效力、解释”分别译为“entering effects construction”不妥。首先，“enter”在合同中，常用“enter into”的形式，表示订立合同之意，例如：本合同于己于2018 年8 月31 日订立。This contract is made and entered into on this 31st day of August 2018.这里将“订立”译为“making”较为妥当。其次，“effects”一般意为“效果、作用、影响”，与“效力”有一定的区别，不如把“效力”译为“validity” 准确，如term of validity即为有效期。再次，“construction” 也不如“interpretation”更为直截了当和地道。“solution of disputes”远不如“settlement of disputes”普遍，如WTO（World Trade Organization）的争端解决机构英文就是“Dispute Settlement Body (DSB)。句子前面的“It is mutually understood”也不如译为“It is mutually agreed”更为妥当和保险，因为你理解并不代表你会同意并执行。原译中的“are all subject to”也不如译为“shall all be subject to”因为，本句中的“均受”就是“必须、应该”之意，而“shall” 正好对应“必须、应该”，有法律上的强制性，而“are”不是法律用语。"
		],
		isFAQ: true
	},
	{
		question: "freight to collect",
		answers: [
			"运费到付"
		],
		isFAQ: true
	},
	{
		question: "documents against payment",
		answers: [
			"付款交单"
		],
		isFAQ: true
	},
	{
		question: "packing list",
		answers: [
			"装箱单"
		],
		isFAQ: true
	},
	{
		question: "原文：     董事会由______ 名董事组成，其中甲方委派_____ 名，乙方委派____ 名。董事长和副董事长由甲乙双方协商确立或董事会选举产生（甲乙双方一方担任董事长的，由他方担任副董事长）。董事、董事长和副董事长任期四年，经委派方继续委派可以连任。 原译：      Board of Directors is made of _____directors, of which ____are appointed by Party A and ____are appointed by Party B. Chairman of the Board is chosen by agreements of the parties or by election of the Board of Directors (If chairman of the Board is chosen from Party A while vice chairman shall be chosen from Party B). The chairman, vice chairman and directors are appointed for four years and will be eligible for reappointment where the appointing party chooses. 改译：      The Board of Directors shall be made up of_____directors, of which ____shall be appointed by Party A and ____shall be appointed by Party B. Chairman and vice chairman of the Board shall be chosen by agreement of the parties or by election of the Board of Directors (If chairman of the Board is chosen from Party A, then vice chairman shall be chosen from Party B). The term of office for directors, vice chairman and chairman shall be four years, whose term of office may be renewed if they are reappointed by the relevant parties.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：     改译中除了“if”引出的假设条件句中仍然使用一般现在时动词“is”或“are”外，其余谓语动词部分几乎都改译成了“shall be done”或“shall be”结构。“shall”在句中并不是一般将来时的助动词，而是用作情态动词，意为“必须”，在条约、规章、法令等文件中表示义务或规定。原译中还有以下错误：“由……组成”应译为“be made up of” 或“be composed of”而不是“be made of”。“If chairman of the Board is chosen from Party A while vice Chairman shall be chosen from Party B.”此句的结构有错误，“If”与“while”不要同时用，应去掉“while”，以逗号代之，再在其后加上“then”，以贴合合同的公函语体。“任期”译为“the term of office”才比较准确。"
		],
		isFAQ: true
	},
	{
		question: "让我们携起手来，互惠互利，共同发展，共铸辉煌!",
		answers: [
			"Let’s cooperate with each other and share a splendid future!"
		],
		isFAQ: true
	},
	{
		question: "the dominant market share",
		answers: [
			"主导的市场份额"
		],
		isFAQ: true
	},
	{
		question: "What are you from?",
		answers: [
			"你的国籍是？/你是哪国人？"
		],
		isFAQ: true
	},
	{
		question: "Marine insurance policy or certificate(original plus copy)dated not later than the date of bills of lading signed and issued by insurance company made to order of ICICI Bank Limited and blank endorsed for 110 PCT of CIF value of foods supplied, covering Institute Cargo Clause (A), with extended cover for transshipment risks if applicable, theft, pilferage, breakage and non-delivery, Institute War Clause (Cargo) and Institute Strikes Clause (Cargo), Institute Transit Clauses for warehouse to warehouse cover with claims payable in India irrespective of percentage.",
		answers: [
			"海运保险单/凭证（正本+副本），出单日期不得迟于提单日，由保险公司出具并签署，做成“凭ICICI银行有限公司指示”，空白背书，按所提供货物CIF总值的110%投保协会货物条款（A）险，同时投保转运险（如需要），偷窃、破损、提货不到险，协会战争险条款，协会罢工险条款，协会转运险条款承保仓至仓条款，在印度办理陪付，不计免赔率。"
		],
		isFAQ: true
	},
	{
		question: "existing markets",
		answers: [
			"现有市场"
		],
		isFAQ: true
	},
	{
		question: "The payment shall be made within 40 days after delivery of the product to customers.",
		answers: [
			"款项需在产品送达消费者40 日之内支付。"
		],
		isFAQ: true
	},
	{
		question: "For goods ordered we require payment to be made by a confirmed and irrevocable L/C payable at sight upon the presentation of shipment documents.",
		answers: [
			"所订货物的付款方式 我方要求凭装船单据 以保兑的、不可撤消的即期信用证支付。"
		],
		isFAQ: true
	},
	{
		question: "巴国古都涪陵因乌江（古称涪水）而得名，涪陵榨菜名冠世界三大名腌菜之首。乌江榨菜色如暖玉，其味鲜、香、嫩、脆，更为涪陵榨菜之珍品！",
		answers: [
			"Fuling the ancient Ba capital city is famous for Wujiang River that was called Fu River in ancient times. Fuling Zhacai ranks first place of the Famous World Three Pickles. Wujiang Brand Zhacai has not only beautiful color just like pure jade but also tastes fresh fragrant crisp and tender it naturally becomes the essence of Fuling Zhacai."
		],
		isFAQ: true
	},
	{
		question: "上海世博会主题演绎工作的目标，是希望藉此提高公众对“城市时代”中各种挑战的忧患意识，并提供可能的解决方案；促进对城市遗产的保护；使人们更加关注健康的城市发展；推广可持续的城市发展理念、成功实践和创新技术；寻求发展中国家的可持续的城市发展模式；促进人类社会的交流融合和理解。",
		answers: [
			"The theme development for Expo 2010 is to raise public awareness of every challenge in the Era of City and provide possible solutions enhance the protection for city heritage make people pay more attention to the city’s healthy development promote the concept successful practices and innovative technologies of sustainable city development search for the sustainable city development mode for the developing countries enhance the exchange integration and understanding in and between societies."
		],
		isFAQ: true
	},
	{
		question: "consumer product",
		answers: [
			"消费者产品"
		],
		isFAQ: true
	},
	{
		question: "real estate",
		answers: [
			"房地产"
		],
		isFAQ: true
	},
	{
		question: "本票的出票人必须具有支付本票金额的可靠资金来源, 并保证支付。",
		answers: [
			"The maker of a promissory note shall possess a reliable source of funds to pay the sum of the note and guarantee its payment."
		],
		isFAQ: true
	},
	{
		question: "bad debts",
		answers: [
			"坏帐"
		],
		isFAQ: true
	},
	{
		question: "原文： Shop at CARSON’S GROCERY     Look what we’ve got! We’ve got the best cakes in town. We’ve got the cheapest prices and We’ve got the best quality goods. Sorry，We’ve not got any stale bread, dry cakes or bad eggs! Try us. If you want the best value for your money, we’ve got it.   译文： 请光临卡森食品店         请看我们有什么食品！我们有本城最好的蛋糕，我们有最便宜的价格，我们还有最好质量的货物。对不起，我们没有不新鲜的面包，我们没有干硬的蛋糕，我们也没有变质的臭鸡蛋！请尝尝我们的食品！你想买到的最价有所值的食品，我们这里都有！  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         这是一家商店招徕顾客的售货广告，广告短文运用了重复、祈使句等手段，简洁明了，颇具气势；广告译文使用了直译法和增译法。广告译文以排比的修辞手法译出了重复使用的多个“we’ve got”，增强了语势，突出了该商店的商品种类繁多，价廉物美，诚实守信的特点；此外，运用增译法以同样排比的形式翻译出与先前的“we’ve got”形成鲜明对比的“we’ve not got”，即连用了三个与之前“我们有……我们有……我们还有……”相对应的“我们没有……我们没有……我们也没有……”，语势之强，令人读后便记忆深刻，且反映出该商店从不出售劣质产品，进一步从反面强调了该商店讲究信誉、质优价廉的优势。再加上译文中祈使句的劝诱、鼓动作用，使人不禁想去卡森食品店选购一番。"
		],
		isFAQ: true
	},
	{
		question: "原文：     本合同的订立、效力、解释、履行和争议的解决均受中华人民共和国法律的管辖。 原译：     It is mutually understood that this is a contract of which the entering, effects, construction, performance and solution of disputes are all subject to the laws of the People's Republic of China. 改译：     It is mutually agreed that the making, validity, interpretation and performance of the contract and the settlement of its disputes shall all be subject to the relevant laws of the People’s Republic of China.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         原译将合同条款中的“订立、效力、解释”分别译为“entering effects construction”不妥。首先，“enter”在合同中，常用“enter into”的形式，表示订立合同之意，例如：本合同于己于2018 年8 月31 日订立。This contract is made and entered into on this 31st day of August 2018.这里将“订立”译为“making”较为妥当。其次，“effects”一般意为“效果、作用、影响”，与“效力”有一定的区别，不如把“效力”译为“validity” 准确，如term of validity即为有效期。再次，“construction” 也不如“interpretation”更为直截了当和地道。“solution of disputes”远不如“settlement of disputes”普遍，如WTO（World Trade Organization）的争端解决机构英文就是“Dispute Settlement Body (DSB)。句子前面的“It is mutually understood”也不如译为“It is mutually agreed”更为妥当和保险，因为你理解并不代表你会同意并执行。原译中的“are all subject to”也不如译为“shall all be subject to”因为，本句中的“均受”就是“必须、应该”之意，而“shall” 正好对应“必须、应该”，有法律上的强制性，而“are”不是法律用语。"
		],
		isFAQ: true
	},
	{
		question: "我们从蒂科公司得知贵司商号与地址，特此来函，希望能同贵司发展商务关系。   多年来，本公司经营鞋类进口生意，目前想扩展业务范围。请惠寄商品目录与报价单。如贵司产品价格合理，本公司必定向贵方下定单。",
		answers: [
			"We have obtained your name and address from Dee & Co. Ltd and we are writing to enquire whether you would be willing to establish business relations with us.    We have been importers of shoes for many years. At present we are interested in extending our range and would appreciate your catalogues and quotations.   If your prices are competitive we would expect to place volume orders on you."
		],
		isFAQ: true
	},
	{
		question: "It would be appreciated if you would let us know by returning your lowest possible price for the following goods on FOB London.",
		answers: [
			"请报下列商品伦敦船上交货之最低价。"
		],
		isFAQ: true
	},
	{
		question: "西安是古丝绸之路的起点，也是中国历史上建都最多的城市之一。新发掘的秦兵马俑被称为“世界第八大奇迹”；大雁塔、鼓楼是唐代留下来的建筑；您可以到杨贵妃洗澡的华清池去洗温泉浴；作为炎黄子孙，您或许有兴趣去拜谒离西安不远的黄帝陵。",
		answers: [
			"Xi’an the starting point of the ancient Silk Road served as one of the capitals of Chinese dynasties for the most times. The life size terra cotta soldiers and horses of the Qin Dynasty (221-206 B. C.) unearthed recently are known as the “Eighth Wonder of the World”. Other interesting sites include Dayan Ta (Great Wild Goose Pagoda) and Gu Lou (Drum Tower) both erected in theTang Dynasty and Huaqing Chi (the Huaqing Hot Springs) where visitors may bathe in the warm mineral water. This site used to be the private baths for YangGuifei favorite concubine of a Tang emperor. If you are of Chinese descent you may be interested in paying homage to the Tomb of Huangdi (Yellow Emperor) the first Chinese emperor not far away from Xian."
		],
		isFAQ: true
	},
	{
		question: "macroeconomic policy",
		answers: [
			"宏观经济政策"
		],
		isFAQ: true
	},
	{
		question: "We have received your letter of July 1, enquiring about the best terms of the goods．",
		answers: [
			"已收悉贵公司7月1日就优惠条款询盘的来函。"
		],
		isFAQ: true
	},
	{
		question: "What a beautiful day!",
		answers: [
			"多么美好的一天!"
		],
		isFAQ: true
	},
	{
		question: "offer and counter-offer",
		answers: [
			"发盘还盘"
		],
		isFAQ: true
	},
	{
		question: "We are pleased to serve you at any time．",
		answers: [
			"我们随时乐意为您服务。"
		],
		isFAQ: true
	},
	{
		question: "sight letter of credit",
		answers: [
			"即期信用证"
		],
		isFAQ: true
	},
	{
		question: "The distributor agrees to accept, on presentation, and to pay with exchange, sight draft against bill of lading attached.",
		answers: [
			"经销商同意在提示时予以承兑，凭所附提单以即期汇票的方式支付。"
		],
		isFAQ: true
	},
	{
		question: "enter into agreement",
		answers: [
			"订约"
		],
		isFAQ: true
	},
	{
		question: "原文： 第一条 为了扩大对外经济合作和技术交流，促进中国国民经济发展，中华人民共和国允许外国的企业和其他经济组织或者个人（以下简称外国投资者）来华建立外资企业，保护外资企业的合法权益。 译文：                          LAW OF THE PEOPLE'S REPUBLIC OF CHINA ON FOREIGN-CAPITAL ENTERPRISES（excerpt）      Article 1  With a view of expanding economic cooperation and technological exchange with foreign countries and promoting the development of China’s national economy, the People’s Republic of China permits foreign enterprises, and other foreign economic organizations and individuals (hereinafter collectively referred to as “foreign investors”) to set up enterprises with foreign capital in China and protects the lawful rights and interests of such enterprises.    第二条 本法所称的外资企业是指依照中国法律在中国境内设立的全部资本由外国投资者投资的企业，不包括外国的企业和其他经济组织设立的分支机构。 Article 2  As mentioned in this Law, “enterprises with foreign capital”refers to those enterprises established in China by foreign investors, exclusively with their own capital, in accordance with relevant Chinese laws. The term does not include branches set up in China by foreign enterprises and other foreign economic organizations.  第三条 设立外资企业，必须有利于中国国民经济的发展。国家鼓励建立出口或者技术先进的外资企业。国家禁止或者限制设立外资企业的行业由国务院规定。   Article 3  Enterprises with foreign capital shall be established in such a manner as to help the development of China’s national economy. The state may encourage the establishment of foreign enterprises that are export-oriented or technologically advanced. Regulations are formulated by the State Council regarding the lines of business which the State forbids enterprises with foreign capital to engage in or on which it places certain restrictions.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：           1.上述原文摘自2000年10月31日发布的《关于修改〈中华人民共和国外资企业法〉的决定》，是法律性文件，因此在译成英文时要尽量保持法律文件的文体特点，语言规范严谨、表意准确、语义精练，无需华丽的辞藻。           2.法律文件要求用词正式，语意严谨，因此多使用较为正式的介词词组来代替日常使用的普通词汇，文中表示“为了”用with a view of 或者as to而不用in order to；表示“根据”使用in accordance with而不用according to。  3.“以下简称……”译作hereinafter collectively referred to as…，这在公文翻译中是很常见的现象，法律英语中较多采用古体英语或外来语，即here/where/there+介词，以起到简化语言并显得正式的作用，如herein=in the law（or the contract）。          4.“必须”一词表示法定的义务，因此在英文中对应使用shall表示法律强制性，而不使用must或者have to。          5.“设立外资企业，必须有利于……”该句子没有指明施动者，在译成英文时通常要转换成被动句“Enterprises with foreign capital shall be established in such a manner as to help···”。需要注意的是，在招商引资文本翻译中，经常使用被动语态的句子。中文的被动句常常是隐含在句意中，而不是用“被”字来表达，但是英文则常常使用被动语态的句子结构来表达被动，因此要仔细体会中文句意，准确翻译。"
		],
		isFAQ: true
	},
	{
		question: "We shall cover TPND on your order.",
		answers: [
			"我们将为你方的货物投保盗窃和提货不着险。"
		],
		isFAQ: true
	},
	{
		question: "proforma invoice",
		answers: [
			"形式发票"
		],
		isFAQ: true
	},
	{
		question: "All costs associated with the preparation and submission of its Bid, as well as the cost for Bidder attending the negotiation and finalization of Contract shall be borne by the bidder.",
		answers: [
			"投标人必须承担所有与投标准备和递标相关以及投标人参与合同谈判的所有一切费用。"
		],
		isFAQ: true
	},
	{
		question: "The buyer shall make a claim against the Seller (including replacement of the goods) by the further inspection certificate and all the expenses incurred therefrom shall be borne by the Seller.",
		answers: [
			"买方须凭复检证明向卖方提出索赔（包括换货），由此引起的全部费用应由卖方负担。"
		],
		isFAQ: true
	},
	{
		question: "价格为装运港船上交货价FOB，包括5%佣金。",
		answers: [
			"The price includes 5% commission on F. O. B. basis."
		],
		isFAQ: true
	},
	{
		question: "If any of the terms or provisions of this contract shall be declared illegal or unenforceable by any court of competent jurisdiction，then the parties hereto agree to do all things and cooperate in all ways open to them to obtain substantially the same result or as much thereof as may be possible，including the amendment or alternation of these presents.",
		answers: [
			"若主管法庭宣布本合同任何条款或规定非法或无效，双方同意将尽最大努力采取一切可行措施，包括修改或更换合同，以取得大体相同或尽可能多的效益。"
		],
		isFAQ: true
	},
	{
		question: "revocable credit",
		answers: [
			"可撤销信用证"
		],
		isFAQ: true
	},
	{
		question: "本合约由甲方和乙方签订。",
		answers: [
			"This contract is made and entered into by and between Party A and Party B."
		],
		isFAQ: true
	},
	{
		question: "complaints and claims",
		answers: [
			"投诉与索赔"
		],
		isFAQ: true
	},
	{
		question: "Advance Payment Security",
		answers: [
			"预付款保函"
		],
		isFAQ: true
	},
	{
		question: "We will meet you half way by offering a discount of 5% in view of our long pleasant relations.",
		answers: [
			"鉴于我们之间长期愉快的业务关系，本公司将酌情考虑给予5%的折扣。"
		],
		isFAQ: true
	},
	{
		question: "原文：山西省五台山是闻名中外的佛教圣地，境内迄今仍保存着北魏、唐、宋、元、明、清及民国历朝历代的寺庙建筑47座。精美绝伦的古建筑艺术、稀世文物及博大雄宏的佛教文化充满了无限的神秘感。同时，五台山的自然风光亦令人陶醉，夏季清凉宜人，而一到冬天，漫天的飞雪盖地而来，整个台怀景区便成了银装玉砌的冰雪世界。 译文: On Wutai Mountain, located in Shanxi Province, there are 47 temples built during the seven dynasties from Northern Wei (386- -534)to the Republic of China (1912-1949). Splendid ancient architecture, rare relics and unparalleled Buddhist culture have all lent mystery to the mountain. Its natural landscape is also gorgeous. Cool and verdant in summer, the mountain becomes shrouded in snow and ice in winter.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：汉英两种语言读者的社会历史背景、心理认知环境不同，各自的关注点也不一样。 汉语强调历朝历代是为了将其久远的历史以及丰富的文化凸显出来，中国人看到朝代的名称就会理解其中的含义，但外国游客则会觉得茫然。因此译文只对两个起止年代进行了保留，并将具体时间标注出来。将中间各朝代省去不译，而用“七个朝代”来概括，这就免去了很多麻烦，还保持了译文的通畅。同时，原文中最后一句“整个台怀景区便成了银装玉砌的冰雪世界”属于评述性语句，译者将其省略，处理得当，使译文主题突出、简明扼要，符合英文旅游文本描述客观的特点。"
		],
		isFAQ: true
	},
	{
		question: "Bidder shall be in compliance with the Invitation and these Instructions in preparing and submitting his Bid.",
		answers: [
			"在编写和递交投标书时，投标人须遵守邀请函和此须知所规定的条款。"
		],
		isFAQ: true
	},
	{
		question: "credit and loans",
		answers: [
			"信贷"
		],
		isFAQ: true
	},
	{
		question: "We thank you for your Quotation No.97028. A comparison between this Quotation and your Quotation No.97001 for our last order shows that you are now quoting for container shipment and are raising your price by 2%.    Admittedly, there is some slight increase for sheep shearing machines in the market price, we would like to point out that since your present Quotation is on C&F terms and freight for container shipment is lower than the usual freight, the increase in price can be well set off by the saving in freight and therefore the unit price of this order should be identical with that of our last order. Please consider our comments and let us have your confirmation by Fax.",
		answers: [
			"贵方第97028号报价单已收到，谢谢。我们把它和我方上次订货时贵方的第97001号报价单相比较，发现有两点不同：一是交货改用集装箱；二是价格提高了2%。我们承认剪羊毛机的市场最近略有提升， 但贵方是以成本加运费为基础，而集装箱的运费比普通运费低，该货价格上涨完全可由节省的运费抵消。因此，这次的报价应与上次相同，希贵方予以考虑并请传真确认。"
		],
		isFAQ: true
	},
	{
		question: "wholesale price",
		answers: [
			"批发价"
		],
		isFAQ: true
	},
	{
		question: "Insurance premium",
		answers: [
			"保险费"
		],
		isFAQ: true
	},
	{
		question: "Change your homeward ticket to Northwest and you’ve changed for more. More nonstop from Tokyo and Seoul straight to nearly 200 U.S. cities, including Northwest’s Airline service. More comfort too, with our full sized 747s and exclusive regal Imperial Service. Any day every day, for more to America, you can look to one leader.",
		answers: [
			"把您回家的机票改成西北航空公司的，变化可就大了。从东京和汉城有更多的直达航班，可到达两百个美国城市，包括西北航空服务站。我们拥有最大的747航班和唯一的豪华帝王服务。任何时候，我们都可以带您去享受更多的美国生活。"
		],
		isFAQ: true
	},
	{
		question: "create a dominant position",
		answers: [
			"创造优势地位"
		],
		isFAQ: true
	},
	{
		question: "端午节喝黄酒也与屈原息息相关。在屈原自尽那天，据说有一位老医师拿来一坛雄黄酒倒进江里，说是要药晕蛟龙水兽，以免伤害屈大夫的遗体。",
		answers: [
			"The custom of drinking yellow wine at the Dragon Boat Festival is related with Quyuan. It’s said that on the day of Qu Yuan’s death an old doctor poured a jug of yellow wine into the river hoping to intoxicate all aquatic animals which might eat Qu Yuan’s corpse."
		],
		isFAQ: true
	},
	{
		question: "Please look into the matter at once and let us have your definite reply by cable without any further delay.",
		answers: [
			"请立即着手此事，并尽快电告确切答复。"
		],
		isFAQ: true
	},
	{
		question: "opening bank",
		answers: [
			"开证行"
		],
		isFAQ: true
	},
	{
		question: "This contract is made by and between the two parties.",
		answers: [
			"双方签定本合同。"
		],
		isFAQ: true
	},
	{
		question: "In accordance with the provision of article 16 c III B of UCP 600, if we give notice of refusal of documents presented under this credit we shall however retain the right to accept a waiver of discrepancies from the applicant and, subject to such waiver being acceptable to us, to release documents against that waiver without reference to the presenter provided that no written instructions to the contrary have been received by us from the presenter before the release of the documents.",
		answers: [
			"根据UCP600第16条c款III B的规定，就本信用证项下所提交的单证，如果我行发出拒付通知，在弃权声明书为我行所接受的情况下，我行仍有权接受申请人放弃不符点的声明书，我行将凭此声明书放单而不再接洽交单人，只要在我行放单之前我行没有收到交单人相反的书面通知。"
		],
		isFAQ: true
	},
	{
		question: "Foreign Indirect Investment",
		answers: [
			"间接投资"
		],
		isFAQ: true
	},
	{
		question: "Retention money",
		answers: [
			"保留金"
		],
		isFAQ: true
	},
	{
		question: "packing list",
		answers: [
			"装箱单"
		],
		isFAQ: true
	},
	{
		question: "原文： Dear sir / madam, 　  Thank you for your letter of Nov. 11. We were glad to know the consignment was delivered promptly, but it was with regret that we heard case No. 2 didn’t contain the goods you ordered.         On going into the matter we find that a mistake was indeed made in the packing, through a confusion of numbers, and we have arranged for the right goods to be dispatched to you at once. Relative documents will be mailed as soon as they are ready. We have already cabled to inform you of this, and we enclose a copy of the telegram.   We shall be grateful if you will keep case No. 2 and the contents until called for by the local agents of World Transport Ltd., our forwarding agent, whom we have instructed accordingly. 　    Please accept our apologies for no little inconvenience caused to you by the error.                                                                                                                         Yours faithfully, 译文： 尊敬的先生/女士/敬启者：          感谢你方11 月11 日来函。我方很高兴得知货物已迅速运到, 但非常遗憾的是, 第2号箱子所装货物并不是所订购的货物。          经调查, 造成错发货物的原因是在包装时把货号弄混了, 我方现已安排将正确的货物立即发运你方。有关单据一经缮制完毕就将寄给你方。         我方已电报告知你方此事, 且随函附寄了该电报一份。         如果你方把第2号箱子和内装物品存放你处,直到当地运输代理商世界运输公司与你方取得联系, 我方将不胜感激。我方已给我方当地货运代理商作出相应指示。         因为我们的过错而造成你们很大不便, 请接受我们的歉意。                                                                                                                               敬上/ 谨上  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：          这封商务信函的中文译文很好地体现了归化与异化法的结合。对基本事实用异化法，力求准确；对礼貌用语用归化法，力求通顺。这封信的第1 段表示感谢对方，指出错发货物 第2段、第3段、第4段简要说明造成错误的原因，并告诉对方已经为解决问题采取了行动 建议对方暂时处理错发货物的办法 最后一段表示抱歉。全文尊人而未贬己 斯文有礼 为自己的错误向对方诚恳的道歉 易于对方接受 尤其是该信最后一句中“no little inconvenience”（很大不便）这一双重否定短语语气强度大于肯定，站在对方的角度，考虑到对方的损失。          本信折射出国际商务领域既严格又灵活的用语习惯。商海如战场 是激烈而残酷的竞争 但商务交际中信函交往又很讲究礼节。因此 作为译者 在翻译商务信函时 应斟酌选词 要翻译得柔和、婉转、礼貌。对于发现和纠正商品和服务中存在的错误这样不愉快的事件更是一次危机公关。为了避免损害双方友好合作关系 应尽量避免使用表示不满情绪如“claim”（索赔）、“defective”（有缺陷的）、“fault”（错误）、“regret”（遗憾）等用词。"
		],
		isFAQ: true
	},
	{
		question: "PACKING: To be packed in new strong wooden case(s)/carton(s)suitable for long distance ocean transportation and well protected against dampness, moisture, shock, rust and rough handling. The sellers shall be liable for any damage to the goods on account of improper packing and for any rust damage attributable to inadequate or improper protective measures taken by the sellers, and in such case or cases any and all losses and/or expenses incurred in consequence thereof shall be borne by the sellers.",
		answers: [
			"包装：须用坚固的新木箱/纸箱包装，适合长途海运，防湿、防潮、防震、防锈，和粗暴搬运。由于包装不良所发生的损失，由于采用不充分或不妥善的防护措施而造成的任何锈损，卖方应负担由此而产生的一切费用和/或损失。"
		],
		isFAQ: true
	},
	{
		question: "In the meantime we look forward to your shipping advice．",
		answers: [
			"我们期待贵方的已装船通知。"
		],
		isFAQ: true
	},
	{
		question: "We hereby issue our irrevocable Documentary Credit which is available against beneficiary’s drafts drawn in duplicate on us at sight for 100% invoice value, accompanied by the following documents.",
		answers: [
			"我行兹开立此不可撤销信用证凭受益人开具给我行的一式两份的全额发票金额的即期汇票付款，并附以下单据。"
		],
		isFAQ: true
	},
	{
		question: "export centers",
		answers: [
			"出口中心"
		],
		isFAQ: true
	},
	{
		question: "郑陆镇地处长江三角洲的中心地带，位于江苏省常州市东北部，东与无锡、江阴接壤，西望常州市，南濒太湖，北靠长江。",
		answers: [
			"Located in the center of the Yangtze River Delta Zhenglu town is in the northeast of Changzhou City Jiangsu Province. It boarders Wuxi and Jiangyin on the east near Changzhou on the west is adjacent to Taihu Lake to the south and by Yangtze River to the north."
		],
		isFAQ: true
	},
	{
		question: "全部单据的正本须用航邮，副本用平邮寄交我行。",
		answers: [
			"All original documents are to be forwarded to us by air mail and duplicate documents by sea-mail."
		],
		isFAQ: true
	},
	{
		question: "force and effect",
		answers: [
			"效力"
		],
		isFAQ: true
	},
	{
		question: "请贵方告知该产品的价格，船期和其他交易条件。",
		answers: [
			"It would be appreciated if you let us know your price，shipping date and other terms of business for this article."
		],
		isFAQ: true
	},
	{
		question: "Direction: This part is to test your ability to do practical writing. You are required to write an Introduction letter according to the following information given in Chinese. Remember to do your writing on the answer sheet. 自我介绍 假定你是Lucy，要去广州的一家公司面试外贸业务员，面试的时候需要用英文做一个简单的自我介绍。请你自拟一份自我介绍，自我介绍应包括下列内容： 1.个人基本信息； 2.兴趣爱好； 3.工作经历； 4.文章不可少于50个单词",
		answers: [
			"根据学生回答酌情给分"
		],
		isFAQ: true
	},
	{
		question: "The Seller shall present the following documents required for negotiation/ collection to the banks.",
		answers: [
			"卖方必须将下列单据提交银行议付或托收。"
		],
		isFAQ: true
	},
	{
		question: "只要有梦想，万事可成真。",
		answers: [
			"What can be imagined can be realized."
		],
		isFAQ: true
	},
	{
		question: "Request for Proposal",
		answers: [
			"招标说明书"
		],
		isFAQ: true
	},
	{
		question: "The payment shall be made within 40 days after delivery of the product to customers.",
		answers: [
			"款项需在产品送达消费者40 日之内支付。"
		],
		isFAQ: true
	},
	{
		question: "Its subterranean world holds some of Europe’s most magnificent underground galleries. Time loses all meanings in the formation of these underground wonders. Dripstones, stalactites, in different shapes——columns, pillars and translucent curtains, conjure up unforgettable images.",
		answers: [
			"这里的落润景观美如画廊，恢宏壮阔堪称欧洲之冠。洞中的奇观异景，其形成过程之漫长，使时光在这里也失去了意义。各种钟乳石形态各异——有的如玉柱浑圆；有的如栋梁擎天；有的如瀑布飞帘，晶莹剔透——大自然鬼斧神工，妙景天成，令人难忘。"
		],
		isFAQ: true
	},
	{
		question: "reimbursement bank",
		answers: [
			"偿付行"
		],
		isFAQ: true
	},
	{
		question: "product life cycle",
		answers: [
			"产品寿命周期"
		],
		isFAQ: true
	},
	{
		question: "原文：Since 1872, Yellowstone National Park was founded, there have been more than 60 million tourists who come here. Visitors from all over, all kinds. The feeling is naturally rich and varied: there is pleasant praise, there is fear, or surprised sighs, there is awe of meditation, there are thrills to stimulate fear, there are pairs of natural power and quiet insight, as well as bittersweet experiences.. 译文：自从1872年黄石公园建成以来，已有六千多万人来此观光。游人来自五湖四海，形形色色，所获得的感受自然也就丰富多彩，各不相同：有赏心悦目的赞美，有敬畏或惊诧的感叹，有肃然起敬的沉思，有惊险恐惧的刺激，有对大自然威力的沉静领悟，还有悲喜交加的经历……  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：          原文用词朴实，句子简短，逻辑关系清晰，通俗易懂。译文用词凝练，多用四字词语和并列结构，句式整齐，读起来朗朗上口，富有节奏感，符合汉语语言的审美特点，使中国游客对黄石公园充满了遐想，起到了很好的宣传作用。"
		],
		isFAQ: true
	},
	{
		question: "Partial shipment",
		answers: [
			"分批装运"
		],
		isFAQ: true
	},
	{
		question: "Answering to your letter, we are pleased to inform you that we have shown the sample to our buyer.",
		answers: [
			"贵函收悉，我方已将样本提交本公司的买方，特此奉告。"
		],
		isFAQ: true
	},
	{
		question: "Located in southwestern South Dakota, Badlands National Park consists of 224,000 acres of sharply eroded buttes, pinnacles and spires blended with the largest, protected mixed grass prairie in the United States. Established as Badlands National Monument in 1939, the area was redesignated “National Park” in 1978. Over 11,000 years of human history pale to the ages old paleontological resources, Badlands National Park contains the world’s richest Oligocene epoch fossil beds, dating 23 to 35 million years old.",
		answers: [
			"巴德兰兹国家公园位于南达科他州西南部，占地20英亩，园内冲蚀而成的石丘遍地，尖峰林立，与美国最大的草原保护区融为一体。1939年确定为巴德兰兹国家保护区，1978 年更名为“巴德兰兹国家公园”，这里拥有世界上最丰富的化石资源。尽管人类已有11000多年的历史，但在这些生成于2500--3500 万年前的渐新世化石面前，还是要自惭形秽。"
		],
		isFAQ: true
	},
	{
		question: "江岸上彩楼林立，彩灯高悬，旌旗飄摇，呈现出一派喜气洋洋的节日场面。千姿百态的各式彩龙在江面游弋，舒展着优美的身姿，有的摇头摆尾，风采奕奕；有的喷火吐水，威风八面。",
		answers: [
			"High-rise buildings ornamented with colored lanterns and bright banners stand out along the river banks. On the river itself gaily decorated dragon-shaped boats await their challenge displaying their individual charms to their hearts’ content. One boat wags its head and tail another spits fire and sprays water."
		],
		isFAQ: true
	},
	{
		question: "原文： 尊敬的先生:     二零一八年五月二十日来函收到，不胜感激。得知贵公司认为火焰牌打火机价格过高，无利可图，本公司极感遗憾。     来函又提及日本同类货品报价较其低近百分之十。本公司认同来函的说法，然而，其他厂商的产品质量绝对不能与本公司的相提并论。         虽然极望与贵公司交易，但该还盘较本公司报价相差极大，故未能接受贵公司定单。特此调整报价，降价百分之二，祈盼贵公司满意。     谨候佳音                                                                                                                                     销售部主任托尼·斯密思 谨上                                                      2018年5月30日               译文：                                                                                                                       30 May 2018 Dear Sirs，           Thank you for your letter of 20 May 2018. We are disappointed to hear that our price for Flame cigarette lighters is too high for you to work on. You mention that Japanese goods are being offered to you at a price approximately 10% lower than that quoted by us.         We accept what you say, but we are of the opinion that the quality of the other makers does not measure up to that of our products.         Although we are keen to do business with you, we regret that we cannot accept your counter offer or even meet you half way.         The best we can do is to reduce our previous quotation by 2%. We trust that this will meet with your approval.    We look forward to hearing from you.                                                                                                               Yours faithfully,                                                                                                                   Tony Smith                                                                                                                    Chief Seller   （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         中文的正式性主要体现在一些文言词语和成语上，英文的正式性主要体现在复杂的句子结构上。“得知贵公司认为火焰牌打火机价格过高，无利可图，本公司极感遗憾。”三小句被合并成一个含宾语从句的长句，显得严谨。第二段中“we are of the opinion that” 也比“we think”更加正式。“虽然极望与贵公司交易，但该还盘较本公司报价相差极大，故未能接受贵公司定单”。翻译时省略了凭常识就能想到“该还盘较本公司报价相差极大”，使得重点更突出。“谨候佳音。”是中文的习惯表达法，不需要翻成“good news”之类，可用英语中的习惯表达法“We look forward to hearing from you.”代替。"
		],
		isFAQ: true
	},
	{
		question: "debt reduction",
		answers: [
			"债务削减"
		],
		isFAQ: true
	},
	{
		question: "money supply",
		answers: [
			"货币供应"
		],
		isFAQ: true
	},
	{
		question: "I would suggest you make a reservation with your credit card now, otherwise we can’t guarantee your booth.",
		answers: [
			"我建议您现在就用信用卡预订，否则我们无法保证您的摊位。"
		],
		isFAQ: true
	},
	{
		question: "the stock market",
		answers: [
			"股票市场"
		],
		isFAQ: true
	},
	{
		question: "Temporary works",
		answers: [
			"临时工程"
		],
		isFAQ: true
	},
	{
		question: "We are glad to place an order with you for 50 cases Black Tea.",
		answers: [
			"我们乐于向你方订购50箱红茶。"
		],
		isFAQ: true
	},
	{
		question: "原文：    1. The buyer shall make a claim against the seller by the further inspection certificate and all the expenses incurred therefrom shall be borne by the seller．  原译:          买方向卖方提出索赔并出具复检证明书后由卖方支付全部费用。 改译:         买方须凭复检证明书向卖方提出索赔，由此引起的全部费用应由卖方承担。                    2. 原文：     Payment by draft drawn on buyer payable at sight, documents against payment. 原译：                                           付款凭买方开具的汇票，见票后凭付款文件支付款项。 改译：   凭买方为付款人的即期汇票支付，付款交单。  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         原译是死译，未根据中文习惯采取分译法，导致对双方法律义务表述不清，未讲明买方如何获得索赔权利及卖方如何承担法律责任。当英文中有介词短语、现在分词和过去分词短语作后置定语时，一般宜将原结构从原句中分离出来，改译成独立的分句；当英文中有并列句及各种从句时，宜根据原句中内容隐含的逻辑关系分译成若干短句。改译才符合中文表达习惯。                                    译文评析2：          原译存在常识上的错误，首先译者把“draft drawn on buyer”误解为“买方开具的汇票”。而事实恰恰相反，“draft drawn on buyer”是卖方的代理银行向买方开具要求其付款的一种付款凭证。卖方将货物出售给买方后，理所当然地要求买方按照汇票上的金额付款。英语中的“draft”（汇票）指“any order in writing to pay a specific sum”。 原译文中的另一个逻辑错误是未能正确理解“documents against payment”中的“document” 与“payment” 之间对应的逻辑关系。介词“against” 在本句中意思是“subject to”（以…为条件），即以买方或进口商付款为条件，然后再将货运单据（通常指Bill of lading提单）等交给买方。“Documents against payment (D/A) ” 即“付款交单”，指“Documents to be tendered to the importer subject to his payment.”（以进口人付清货款为交出货运单据的依据）。原译者由于缺乏经贸常识不了解经贸英语的用法，因而把“payable at sight” 译为“见票”，而没有将其连同前面的“draft”一起翻译为“即期汇票”，改译对此作了了纠正。"
		],
		isFAQ: true
	},
	{
		question: "inflation",
		answers: [
			"通货膨胀"
		],
		isFAQ: true
	},
	{
		question: "Ａ公司邀请具有资格的投标者提供密封的标书，提供完成合同工程所需的劳力、材料、设备和服务。",
		answers: [
			"A Company now invites sealed tenders from pre-qualified tenderers for provision of the necessary labour materials equipment and services for the construction and completion of the project."
		],
		isFAQ: true
	},
	{
		question: "rice noodles with minced pork",
		answers: [
			"蚂蚁上树"
		],
		isFAQ: true
	},
	{
		question: "responsibility and duties",
		answers: [
			"责任"
		],
		isFAQ: true
	},
	{
		question: "port of delivery",
		answers: [
			"交货港口"
		],
		isFAQ: true
	},
	{
		question: "transferable letter of credit",
		answers: [
			"可转让信用证"
		],
		isFAQ: true
	},
	{
		question: "brand loyalty",
		answers: [
			"品牌忠诚"
		],
		isFAQ: true
	},
	{
		question: "关于火焰牌打火机的供应事宜，本公司曾于五月十日报价和于五月二十日邮寄报盘。现特此通知，该报盘的有效期在本月底结束。     该货品市场需求量很大，供货有限。宜从速接受该报价为荷。",
		answers: [
			"We refer to our quotation of 10 May and our mail offer of 20 May regarding the supply of Flame cigarette lighters.    We are prepared to keep our offer open until the end of this month.    As this product is in great demand and the supply is limited we would recommend that you accept this offer as soon as possible."
		],
		isFAQ: true
	},
	{
		question: "Free on board",
		answers: [
			"离岸价"
		],
		isFAQ: true
	},
	{
		question: "受益人必须证实商品的规格、数量和价格与其形式发票上所提交的一致。",
		answers: [
			"Beneficiary must certify that specifications quantities and prices of goods are in conformity with those mentioned in their proforma invoice."
		],
		isFAQ: true
	},
	{
		question: "It can be served with your favorite curry or with your daily dishes. You may also serve with spaghetti sauce or salads.",
		answers: [
			"可搭配您最喜欢的咖喱或日常菜肴享用。您也可配以通心面酱或色拉食用。"
		],
		isFAQ: true
	},
	{
		question: "place of receipt",
		answers: [
			"收货地点"
		],
		isFAQ: true
	},
	{
		question: "Where did you spend your childhood?",
		answers: [
			"你的童年是在哪里度过的？"
		],
		isFAQ: true
	},
	{
		question: "泰山称东岳，以“五岳独尊”的盛名享誉古今。按照“五行学说”，东方属木，主生发，有生命之源、万物之本的含义。这就是古代帝王通常在自己登基或晚年时到泰山封禅祭拜的原因。泰山拔地通天，气势磅礴，汉语又有“稳如泰山”、“重于泰山”之说。1987年，联合国教科文组织将泰山列为世界自然与文化遗产。",
		answers: [
			"Mount Tai called the East Sacred Mountain has a great reputation for the most important mountain of the Five Sacred Mountains. According to the theory of five elements the East belongs to mu (wood)  which symbolizes liveliness and has the meaning of the soul of life and the root of all creatures. This explains why ancient emperors made pilgrimages to Mount Tai when they were crowned or in their later years. It is a symbol of loftiness and might hence there are the Chinese idioms: “as firm as Mount Tai” and “as weighty as Mount Tai”. Mount Tai was proclaimed world natural and cultural heritage by UNESCO in 1987."
		],
		isFAQ: true
	},
	{
		question: "freight to collect",
		answers: [
			"运费到付"
		],
		isFAQ: true
	},
	{
		question: "原文：处在世纪之交的××铁路车辆（集团）有限责任公司，正在奋力实现“再现国家队雄风、再造新世纪辉煌、再为社会主义增光”的宏伟意愿，朝着“发展规模集团化，产品品种系列化，市场营销国际化，经营格局多元化，企业规模现代化”的目标迈进。公司将一如既往地坚持“信誉第一，用户至上”的宗旨，不仅以更多的高质量、高品位、高档次的新产品满足市场，而且以良好的作风，为广大用户提供一流的全过程的服务。 公司董事长、党委书记×××和总经理×××携全体员工，向广大客户及社会各界朋友表示诚挚的谢意。  译文：         At the turn of the new century, ××Railway Rolling Stock (Group) Co., Ltd. is on the way towards a global-market-oriented enterprise group. We aim at achieving well-developed management, marketing and product series. Focusing on our clients, we will continue with our credit to offer high quality and advanced products as well as our cover-all services.  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         比较原文和译文，可以看出译文对原文做了多处调整，首先是将一些华美空泛的溢美之词或涉及政治意识形态的词删去，如“国家队雄风”、“新世纪辉煌”、“为社会主义增光”，而以朴实客观的语汇译出。同时，将原文中同义重复的结构，如“高质量、高品位、高档次”等提炼出中心意思译出，使行文更简洁。此外，篇首对企业名完整译出，下文再次提及则选用更符合英文企业外宣资料的人称词“we”，以平等的地位与潜在客户交流，使译文更平实可信。这些处理符合英语企业外宣资料的文体特点，让目标语读者更易接受。"
		],
		isFAQ: true
	},
	{
		question: "All offers and sales are subject to the terms and conditions printed on the reverse side hereof.",
		answers: [
			"所有报盘和销售均应遵守本报价单背面所印的条款。"
		],
		isFAQ: true
	},
	{
		question: "原文： 尊敬的先生：     今天收到你们寄来的带条纹外衣料样品，谢谢。请按照信内附寄的第2602号订单发货。订单价格以当前的运费率计算，装运时运费的增减均属买方。卖方则承担至交货地的全部运费。请特别注意交货日期。因为我们已经广泛做了出售日期的广告，故必须按上述确切日期收货。所有订货都必须全部交完，不能陆续发运。相信贵方会按期发货，因迟误势必会给我们造成不小的麻烦和经济损失。     如果你们在供应急需订货方面有什么困难，请立即通知我们。                                                                 敬上/ 谨上                                     译文： Dear Sirs，        Thank you for your samples of striped coatings received today. Please make shipment in accordance with our Order No.2602 enclosed herewith. The prices stated are based on current freight rates, any increase or decrease in freight rates at time of shipment is to be the benefit of the buyer, with the seller assuming the payment of all transportation charges to the point or place of delivery. We would like to ask you to pay special attention to time of delivery. It is important that we receive these goods on the exact day mentioned as we have extensively advertised the day of our sale. All orders must be delivered complete; no remainders must follow. We trust you will see to it that the order is shipped within the stipulated time, as any delay would cause us no little inconvenience and financial loss.          Please let us know immediately if you have any difficulty in supplying the exact goods ordered.                                                                                                                    Yours sincerely,  （请从文体特征、遣词造句、翻译技巧等方面评析下列译文。字数不少于200字。)",
		answers: [
			"译文评析：         汉语是竹型结构，句子较短，结构简单。英语是树形结构，句子较长，结构复杂，修饰语层层相叠。因此“今天收到你们寄来的带条纹外衣料样品，谢谢。”如用直译法做成“We have received your samples of striped coatings today thanks”必然会使英文读者觉得译文句子太短，内容太散，不够严谨。而“Thank you for your samples of striped coatings received today.”要显得通顺许多。“herewith”带有古体英语的特征，使行文较正式。第三、四句主语不断变化，但其实都涉及一个主题价格。如直接翻译，英文读者觉得主语变化过快，内容太散，不知所云。因此可用“with”来将几个短句并在一起形成一个长句，让整段文字重点更突出。因为销售方已经将出售日期广而告之，故必须按确切日期收货，用“as”连接，构成一个长句。"
		],
		isFAQ: true
	},
	{
		question: "Payment: By irrevocable L/ C at sight to reach the sellers 30 days before the time of shipment. The L/ C shall be valid for negotiation in China until the 15th day after the date of shipment.",
		answers: [
			"支付:买方应当在装船前30 天将不可撤销的即期信用证开到卖方。信用证在中国议付的有效期至装船后的第15 天。"
		],
		isFAQ: true
	},
	{
		question: "货到目的港后即行付清余款。",
		answers: [
			"The balance shall be settled upon the arrival of the goods at the port of destination."
		],
		isFAQ: true
	},
	{
		question: "Thirty percent ( 30%) shall be payable upon mobilization．",
		answers: [
			"设备进场时，应支付30%的款项。"
		],
		isFAQ: true
	},
	{
		question: "本票的出票人必须具有支付本票金额的可靠资金来源, 并保证支付。",
		answers: [
			"The maker of a promissory note shall possess a reliable source of funds to pay the sum of the note and guarantee its payment."
		],
		isFAQ: true
	},
	{
		question: "We undertake to honour your drafts drawn and negotiated in conformity with the terms of this credit provided that such negotiation has been made prior to receipt by the notice of cancellation.",
		answers: [
			"我们承担承兑和议付你方根据信用证开出的相一致的汇票该信用证在收到取消通知书之前都将被议付。"
		],
		isFAQ: true
	},
	{
		question: "敬请立刻修改信用证以便我方及时发货。",
		answers: [
			"We should be obliged for your immediate amendment of the L/C to enable us to make timely shipment."
		],
		isFAQ: true
	},
	{
		question: "I’m afraid we don’t have suitable convention rooms available.",
		answers: [
			"我们恐怕没有适合您的会议室了。"
		],
		isFAQ: true
	},
	{
		question: "We thank you for your promptness in delivering the coffee we ordered on 20th, July. The number of bags delivered by your carrier this morning was, however, 160 whereas our order was for only 120.   Unfortunately, our present needs are completely covered and as we cannot make use of the 40 bags in excess of order, we have put them in our warehouse to be held for you until we receive your instructions.",
		answers: [
			"收到我方7月20日订购的咖啡，并对你方迅速交货表示感谢。但是，你方承运人上午交来160袋，而我们只订购120袋。    遗憾的是，我方需求已满，无法接受你方多交的40袋。我们已将此货入库保存，等候你方指示。"
		],
		isFAQ: true
	},
	{
		question: "This is the most beautiful lake I have_______visited.",
		answers: [
			"ever"
		],
		isFAQ: false
	},
	{
		question: "There are four ______ in a year.",
		answers: [
			"seasons"
		],
		isFAQ: false
	},
	{
		question: "Tom studies_______. He_______plays with his friends.",
		answers: [
			"hard; hardly"
		],
		isFAQ: false
	},
	{
		question: "I actually get __________ quite well with my friends.",
		answers: [
			"along"
		],
		isFAQ: false
	},
	{
		question: "The notes are very _______.",
		answers: [
			"brief"
		],
		isFAQ: false
	},
	{
		question: "It was a happy_______.",
		answers: [
			"journey"
		],
		isFAQ: false
	},
	{
		question: "They gave money to the old people's home either_______or through their companies.",
		answers: [
			"personally"
		],
		isFAQ: false
	},
	{
		question: "Thank you for your _______.",
		answers: [
			"assistance"
		],
		isFAQ: false
	},
	{
		question: "Everyone is _______.",
		answers: [
			"equal"
		],
		isFAQ: false
	},
	{
		question: "I’m here on ___________, not on business.",
		answers: [
			"vacation"
		],
		isFAQ: false
	},
	{
		question: "Thank you for  ______me to leave earlier.",
		answers: [
			"agreeing"
		],
		isFAQ: false
	},
	{
		question: "I usually get ___________ at 7:00 AM, and have breakfast at 7:30",
		answers: [
			"up"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"yet; already"
		],
		isFAQ: false
	},
	{
		question: "The  ______ was busy this morning.",
		answers: [
			"traffic"
		],
		isFAQ: false
	},
	{
		question: "He is very _______ even though he is only ten years old.",
		answers: [
			"independent"
		],
		isFAQ: false
	},
	{
		question: "In 2008, an  ______happened in Sichuan.",
		answers: [
			"earthquake"
		],
		isFAQ: false
	},
	{
		question: "If you ask him_______, he will be willing to help you.",
		answers: [
			"politely"
		],
		isFAQ: false
	},
	{
		question: "He ______ at his study now.",
		answers: [
			"is studying"
		],
		isFAQ: false
	},
	{
		question: "He finally got his driver's_______.",
		answers: [
			"license"
		],
		isFAQ: false
	},
	{
		question: "I lost my wallet on my way home._______, someone found it and returned it to me.",
		answers: [
			"Luckily"
		],
		isFAQ: false
	},
	{
		question: "This organization aiming at the protection of the environment is______. All its members do for the animals are free.",
		answers: [
			"nonprofit"
		],
		isFAQ: false
	},
	{
		question: "I’d like to __________ the meeting. Some people cannot attend today.",
		answers: [
			"reschedule"
		],
		isFAQ: false
	},
	{
		question: "He had a minor _______ yesterday.",
		answers: [
			"operation"
		],
		isFAQ: false
	},
	{
		question: "I'm very _______ about the coming exam.",
		answers: [
			"anxious"
		],
		isFAQ: false
	},
	{
		question: "Tom said he didn’t know much about computers, but he’d try and help us_______.",
		answers: [
			"anyway"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"somewhere"
		],
		isFAQ: false
	},
	{
		question: "She is carrying a  ______  baby.",
		answers: [
			"two-year-old"
		],
		isFAQ: false
	},
	{
		question: "Mary was born blind so she has_______seen our beautiful world．",
		answers: [
			"never"
		],
		isFAQ: false
	},
	{
		question: "I _______ with them.",
		answers: [
			"disagree"
		],
		isFAQ: false
	},
	{
		question: "He likes eating ______.",
		answers: [
			"sandwiches"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"yet; already"
		],
		isFAQ: false
	},
	{
		question: "I want to  _______ some money from him.",
		answers: [
			"borrow"
		],
		isFAQ: false
	},
	{
		question: "The girl used to be shy, _______ getting active in group work and is more willing to express herself.",
		answers: [
			"gradually"
		],
		isFAQ: false
	},
	{
		question: "Tom is such a ______person that he forgot to take money with him when going out for shopping.",
		answers: [
			"careless"
		],
		isFAQ: false
	},
	{
		question: "Miss Li is in _______ of class 1.",
		answers: [
			"charge"
		],
		isFAQ: false
	},
	{
		question: "Laptops are smaller and lighter so that they can be carried very_______.",
		answers: [
			"easily"
		],
		isFAQ: false
	},
	{
		question: "You can buy some______ in that bookstore.",
		answers: [
			"second-hand books"
		],
		isFAQ: false
	},
	{
		question: "He looks ______ of his new look.",
		answers: [
			"proud"
		],
		isFAQ: false
	},
	{
		question: "I am planing to ___________ smoking.",
		answers: [
			"quit"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"much faster than"
		],
		isFAQ: false
	},
	{
		question: "The people there are suffering from air ______.",
		answers: [
			"pollution"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"hardly ever"
		],
		isFAQ: false
	},
	{
		question: "I don’t like the team, because it always lose. He doesn’t like it,_______.",
		answers: [
			"either"
		],
		isFAQ: false
	},
	{
		question: "You will find_______to learn to repair bikes. Many people learn it all by_______.",
		answers: [
			"it easy; themselves"
		],
		isFAQ: false
	},
	{
		question: "It's ______ for her to finish the work in one hour.",
		answers: [
			"possible"
		],
		isFAQ: false
	},
	{
		question: "Have you read the book_______?",
		answers: [
			"yet"
		],
		isFAQ: false
	},
	{
		question: "Would you like a beer? No, I can’t - I’m __________.",
		answers: [
			"driving"
		],
		isFAQ: false
	},
	{
		question: "I got ___________ ( = became interested in) playing basketball.",
		answers: [
			"into"
		],
		isFAQ: false
	},
	{
		question: "We already did some ___________ yesterday.",
		answers: [
			"sight-seeing"
		],
		isFAQ: false
	},
	{
		question: "Her ______ was delayed.",
		answers: [
			"flight"
		],
		isFAQ: false
	},
	{
		question: "He ______with the plan as it is against his own interest.",
		answers: [
			"disagrees"
		],
		isFAQ: false
	},
	{
		question: "I was moved by his ______.",
		answers: [
			"kindness"
		],
		isFAQ: false
	},
	{
		question: "Your answer is  _______ to the question I asked.",
		answers: [
			"irrelevant"
		],
		isFAQ: false
	},
	{
		question: "The doctor is always ______ with his patients.",
		answers: [
			"patient"
		],
		isFAQ: false
	},
	{
		question: "She __________ great jokes.",
		answers: [
			"tells"
		],
		isFAQ: false
	},
	{
		question: "The meeting will _______.",
		answers: [
			"begin"
		],
		isFAQ: false
	},
	{
		question: "______, an accident happened to him yesterday.",
		answers: [
			"Unluckily"
		],
		isFAQ: false
	},
	{
		question: "Don't  ______ to take your homework with you next time.",
		answers: [
			"forget"
		],
		isFAQ: false
	},
	{
		question: "She didn’t pass the test. she’ll have to __________ the driving test.",
		answers: [
			"retake"
		],
		isFAQ: false
	},
	{
		question: "The methods are _______.",
		answers: [
			"flexible"
		],
		isFAQ: false
	},
	{
		question: "Do you want to __________ ( = eat at home) tonight? No, let’s go out.",
		answers: [
			"eat in"
		],
		isFAQ: false
	},
	{
		question: "He made a great  _______ to the company",
		answers: [
			"contribution"
		],
		isFAQ: false
	},
	{
		question: "I __________ to go out these days. I have almost no money.",
		answers: [
			"can’t afford"
		],
		isFAQ: false
	},
	{
		question: "They clapped and shouted_______when they saw Sun Yang appear on the swimming pool.",
		answers: [
			"excitedly"
		],
		isFAQ: false
	},
	{
		question: "He is an _______boy.",
		answers: [
			"honest"
		],
		isFAQ: false
	},
	{
		question: "He always lets __________. She will not believe him again.",
		answers: [
			"her down"
		],
		isFAQ: false
	},
	{
		question: "—You know, I met my girlfriend's parents for the first time only yesterday.—_______? I thought you'd met them before.",
		answers: [
			"Really"
		],
		isFAQ: false
	},
	{
		question: "I _______ my grandfather to him.",
		answers: [
			"describe"
		],
		isFAQ: false
	},
	{
		question: "It's good for your body______.",
		answers: [
			"health"
		],
		isFAQ: false
	},
	{
		question: "The meeting couldn't go on as usual because the manager was _____.",
		answers: [
			"absent"
		],
		isFAQ: false
	},
	{
		question: "My name is Jenny. I have four good friends. I like hamburgers, but Ben doesn’t like them. I don’t like strawberries. Cara doesn’t like them, either(也). Cara and Amy like French fries, and they have them every day. But Dale doesn’t. Dale and Ben like vegetable salad, but Amy doesn’t. She likes fruit salad. 　　根据短文内容，判断句子正(T)、误(F)。 　( ) 1. Ben doesn’t like hamburgers.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "This is the steel plant where we visited last week.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：She lives in a small town near New York.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：That is why she failed to pass the exam.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：There is no water or no air on the moon.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Do you know Huaxing? You can have a great sale there. Look! It’s a clothes store. It sells sweaters, T-shirts and shorts. These sweaters are very good. Do you like shoes? There are four shoe stores. Oh, here is a hat store. Red hats, blue hats, black hats and orange hats, it has hats in all colors. I like them very much.根据短文内容，判断句子正(T)、误(F)。( ) 1. You can have a great sale at Huaxing.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：Does he likes going fishing?",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Having spent his childhood in France,John is able to converse in French rather good.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：The question is why he cried yesterday.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Do you know Huaxing? You can have a great sale there. Look! It’s a clothes store. It sells sweaters, T-shirts and shorts. These sweaters are very good. Do you like shoes? There are four shoe stores. Oh, here is a hat store. Red hats, blue hats, black hats and orange hats, it has hats in all colors. I like them very much.根据短文内容，判断句子正(T)、误(F)。( ) 3. You can find five shoe stores in Xuaxing.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：Though he was tired, but he still work hard.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：What I told him was I would find him a good play.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "This is the steel plant where we visited last week.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：That's because we never thought of it.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：Is your brother speak English?",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：She don’t do her homework every evening.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I have a friend. His name is Jeff. He is 14years old. His father is 40. His mother is 41. He has a brother and a sister. His brother is 9 and his sister is 6. Today is his mother’s birthday. It’s October fifth. There is a big birthday cake on the table. It is 20 dollars. Many friends come to the party.根据短文内容，判断句子正(T)、误(F)。( ) 1. Jeff is 9 years old.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "If you wish to remain healthy,you should drink several glasses of the water every day.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Jim is an English boy. He comes to China with his father and mother. They come here to work. Jim comes here to study.He is in No.5 Middle School. He gets up early every day. He isn’t late for school. He studies hard. He can read English well. He often helps us with our English, and we often help him with his Chinese. After class he likes playing football, swimming, running, jumping and riding. He makes many friends here. We are glad to stay with him. On Sunday he often helps his mother clean the house, mend something or do the shopping. He likes Chinese food very much.。 He likes living here. He likes Chinese students very much. We all like him, too.根据短文内容，判断以下句子的正误。对的在括号内填― T ‖, 错的填― F ‖.（ 2 ）He often teaches us English.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Dear Jack, How are you? I have been in the USA for six months. I like the life here. I have a few friends. I don’t have much homework. There are a lot of sports at my school, but I don’t like sports at all. I like the food very much. I eat a lot of different kinds of food every day. I like coke(可乐)very much. I don’t drink water. I drink coke instead(代替). I’m enjoying my life here. The sad thing is that sometimes I get ill. I don’t know why. My parents say I must go on a diet and do more sports. Must I? Yours, David( F ) 5. David knows why he is often ill",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "This is all what Dr. Smith said at the meeting.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "My name is Jenny. I have four good friends. I like hamburgers, but Ben doesn’t like them. I don’t like strawberries. Cara doesn’t like them, either(也). Cara and Amy like French fries, and they have them every day. But Dale doesn’t. Dale and Ben like vegetable salad, but Amy doesn’t. She likes fruit salad. 　　根据短文内容，判断句子正(T)、误(F)。 　　( ) 4. Dale and Ben like vegetable salad.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Dear Jack, How are you? I have been in the USA for six months. I like the life here. I have a few friends. I don’t have much homework. There are a lot of sports at my school, but I don’t like sports at all. I like the food very much. I eat a lot of different kinds of food every day. I like coke(可乐)very much. I don’t drink water. I drink coke instead(代替). I’m enjoying my life here. The sad thing is that sometimes I get ill. I don’t know why. My parents say I must go on a diet and do more sports. Must I? Yours, David( T ) 4. David likes coke better than water.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：The problem is how can we get the things we need.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I have a friend. His name is Jeff. He is 14years old. His father is 40. His mother is 41. He has a brother and a sister. His brother is 9 and his sister is 6. Today is his mother’s birthday. It’s October fifth. There is a big birthday cake on the table. It is 20 dollars. Many friends come to the party.根据短文内容，判断句子正(T)、误(F)。( ) 5. The birthday cake is 20 yuan.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "It was about 600 years ago that the first clock with a face and an hour hand was made.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "I have caught a bad cold for a week and I can’t get rid of it.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：Either you or I am right.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：Tom as well as his parents like reading.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Jim is an English boy. He comes to China with his father and mother. They come here to work. Jim comes here to study.He is in No.5 Middle School. He gets up early every day. He isn’t late for school. He studies hard. He can read English well. He often helps us with our English, and we often help him with his Chinese. After class he likes playing football, swimming, running, jumping and riding. He makes many friends here. We are glad to stay with him. On Sunday he often helps his mother clean the house, mend something or do the shopping. He likes Chinese food very much.。 He likes living here. He likes Chinese students very much. We all like him, too.根据短文内容，判断以下句子的正误。对的在括号内填― T ‖, 错的填― F ‖. (   )3. After class , he likes singing and playing basketball.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：We have four lessons.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：The scissors are not what I need.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：I don’t know if it rains tomorrow.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Dear Jack, How are you? I have been in the USA for six months. I like the life here. I have a few friends. I don’t have much homework. There are a lot of sports at my school, but I don’t like sports at all. I like the food very much. I eat a lot of different kinds of food every day. I like coke(可乐)very much. I don’t drink water. I drink coke instead(代替). I’m enjoying my life here. The sad thing is that sometimes I get ill. I don’t know why. My parents say I must go on a diet and do more sports. Must I? Yours, David( T ) 1. David has been in America for six months.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：While I came home, my mother was cooking dinner.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "His best movie,which won several awards,was about the life of Gandhi.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I have a friend. His name is Jeff. He is 14years old. His father is 40. His mother is 41. He has a brother and a sister. His brother is 9 and his sister is 6. Today is his mother’s birthday. It’s October fifth. There is a big birthday cake on the table. It is 20 dollars. Many friends come to the party.根据短文内容，判断句子正(T)、误(F)。( ) 2. Jeff has a brother and a sister.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：Because he was tired, so he went to bed.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "My name is Jenny. I have four good friends. I like hamburgers, but Ben doesn’t like them. I don’t like strawberries. Cara doesn’t like them, either(也). Cara and Amy like French fries, and they have them every day. But Dale doesn’t. Dale and Ben like vegetable salad, but Amy doesn’t. She likes fruit salad. 　　根据短文内容，判断句子正(T)、误(F)。 　　( ) 3. Dale doesn’t like French fries.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Everyone was in his room when the bell rings.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Jim is an English boy. He comes to China with his father and mother. They come here to work. Jim comes here to study.He is in No.5 Middle School. He gets up early every day. He isn’t late for school. He studies hard. He can read English well. He often helps us with our English, and we often help him with his Chinese. After class he likes playing football, swimming, running, jumping and riding. He makes many friends here. We are glad to stay with him. On Sunday he often helps his mother clean the house, mend something or do the shopping. He likes Chinese food very much.。 He likes living here. He likes Chinese students very much. We all like him, too.根据短文内容，判断以下句子的正误。对的在括号内填― T ‖, 错的填― F ‖.(   )5. He doesn’t like Chinese food.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "We did the research as good as we could; however,it did not turn out to be satisfactory.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：For it’s raining heavily, we cancel the competition.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子连词的用法是否正确：If it is sunny tomorrow , I will go swimming.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "I have a friend. His name is Jeff. He is 14years old. His father is 40. His mother is 41. He has a brother and a sister. His brother is 9 and his sister is 6. Today is his mother’s birthday. It’s October fifth. There is a big birthday cake on the table. It is 20 dollars. Many friends come to the party.根据短文内容，判断句子正(T)、误(F)。( ) 4. The birthday cake is on the table.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Since their beginning,human survival has depended on their interaction with the environment.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：It looked as if he had understood this question.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：He likes play games after class.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：I have many books.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "I have a friend. His name is Jeff. He is 14years old. His father is 40. His mother is 41. He has a brother and a sister. His brother is 9 and his sister is 6. Today is his mother’s birthday. It’s October fifth. There is a big birthday cake on the table. It is 20 dollars. Many friends come to the party.根据短文内容，判断句子正(T)、误(F)。( ) 3. Jeff’s father’s birthday is October fifth.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：Miss Wu teachs us English.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Following the road and you will find the store.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：Nancy don’t run fast",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "He promised to come and see us after the supper",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：David has a goal.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Jim is an English boy. He comes to China with his father and mother. They come here to work. Jim comes here to study.He is in No.5 Middle School. He gets up early every day. He isn’t late for school. He studies hard. He can read English well. He often helps us with our English, and we often help him with his Chinese. After class he likes playing football, swimming, running, jumping and riding. He makes many friends here. We are glad to stay with him. On Sunday he often helps his mother clean the house, mend something or do the shopping. He likes Chinese food very much.。 He likes living here. He likes Chinese students very much. We all like him, too.根据短文内容，判断以下句子的正误。对的在括号内填― T ‖, 错的填― F ‖. (  )1. He gets up late every day.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Jim is an English boy. He comes to China with his father and mother. They come here to work. Jim comes here to study.He is in No.5 Middle School. He gets up early every day. He isn’t late for school. He studies hard. He can read English well. He often helps us with our English, and we often help him with his Chinese. After class he likes playing football, swimming, running, jumping and riding. He makes many friends here. We are glad to stay with him. On Sunday he often helps his mother clean the house, mend something or do the shopping. He likes Chinese food very much.。 He likes living here. He likes Chinese students very much. We all like him, too.根据短文内容，判断以下句子的正误。对的在括号内填― T ‖, 错的填― F ‖.(  )4. On Sunday he often helps his mother clean the house.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下句子时态的用法是否正确：Do you often play football after school?",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：The question is who will travel with me to Beijing tomorrow.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Dear Jack, How are you? I have been in the USA for six months. I like the life here. I have a few friends. I don’t have much homework. There are a lot of sports at my school, but I don’t like sports at all. I like the food very much. I eat a lot of different kinds of food every day. I like coke(可乐)very much. I don’t drink water. I drink coke instead(代替). I’m enjoying my life here. The sad thing is that sometimes I get ill. I don’t know why. My parents say I must go on a diet and do more sports. Must I? Yours, David( T ) 3. There are many sports at David’s school.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "The only way to influence others is to talk about what they want and show them how to get it.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Do you know Huaxing? You can have a great sale there. Look! It’s a clothes store. It sells sweaters, T-shirts and shorts. These sweaters are very good. Do you like shoes? There are four shoe stores. Oh, here is a hat store. Red hats, blue hats, black hats and orange hats, it has hats in all colors. I like them very much.根据短文内容，判断句子正(T)、误(F)。( ) 2. There are some books in the store.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：The question is when can he arrive at the hotel.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "The relationship consists of a general pattern of human interference and its corresponding environmental modification.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "My name is Jenny. I have four good friends. I like hamburgers, but Ben doesn’t like them. I don’t like strawberries. Cara doesn’t like them, either(也). Cara and Amy like French fries, and they have them every day. But Dale doesn’t. Dale and Ben like vegetable salad, but Amy doesn’t. She likes fruit salad. 　　根据短文内容，判断句子正(T)、误(F)。 　　( ) 5. Amy doesn’t like fruit salad.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "判断以下表语从句的用法是否正确：The question is if the enemy is marching towards us.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Everyone of us is working hard in the factory.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Somehow,in the panic,the crew of the airplane were able to rescue nearly all of the passengers.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "My name is Jenny. I have four good friends. I like hamburgers, but Ben doesn’t like them. I don’t like strawberries. Cara doesn’t like them, either(也). Cara and Amy like French fries, and they have them every day. But Dale doesn’t. Dale and Ben like vegetable salad, but Amy doesn’t. She likes fruit salad. 　　根据短文内容，判断句子正(T)、误(F)。 　　( ) 2. Cara and Amy don’t like French fries.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Dear Jack, How are you? I have been in the USA for six months. I like the life here. I have a few friends. I don’t have much homework. There are a lot of sports at my school, but I don’t like sports at all. I like the food very much. I eat a lot of different kinds of food every day. I like coke(可乐)very much. I don’t drink water. I drink coke instead(代替). I’m enjoying my life here. The sad thing is that sometimes I get ill. I don’t know why. My parents say I must go on a diet and do more sports. Must I? Yours, David( F ) 2. David has to do much homework.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Running is ____________________（我最喜爱的体育运动）.",
		answers: [
			"my favorite sport"
		],
		isFAQ: true
	},
	{
		question: "Is this your wedding ring, Marry? I find it___________________.（今天早上打扫房间的时候）",
		answers: [
			"thanked Tom for helping her"
		],
		isFAQ: true
	},
	{
		question: "____________________（天气很冷）in winter here.",
		answers: [
			"It's very cold."
		],
		isFAQ: true
	},
	{
		question: "Tomorrow he will go to the railway station ________________ (为朋友送行).",
		answers: [
			"the ideas which/that occurred to him"
		],
		isFAQ: true
	},
	{
		question: "It is said that John ________________ (在那个房子里住了两年).",
		answers: [
			"whether we can finish the work tomorrow"
		],
		isFAQ: true
	},
	{
		question: "____________________（沿着这条街走五分钟），and you will see the cinema.",
		answers: [
			"Go/Walk along this street for 5 minutes"
		],
		isFAQ: true
	},
	{
		question: "To our surprise, ____________________（他没有参加本次会议）.",
		answers: [
			"he didn't attend this party"
		],
		isFAQ: true
	},
	{
		question: "________________ (她没赶上那班飞机) because of the traffic jam.",
		answers: [
			"let him take part in the competition"
		],
		isFAQ: true
	},
	{
		question: "He wants to know___________________.（我们明天能否完成）",
		answers: [
			"has lived in that house for two years"
		],
		isFAQ: true
	},
	{
		question: "In her e-mail, Mary ________________ (感谢Tom对她的帮助).",
		answers: [
			"when I was cleaning the room this morning"
		],
		isFAQ: true
	},
	{
		question: "Ralph.Wang Emerson would always write down___________________.（他突然想到的新主意）",
		answers: [
			"to see his friend off"
		],
		isFAQ: true
	},
	{
		question: "Some students are interested in music and___________________.（另一些学生喜欢踢足球）",
		answers: [
			"he didn't do his homework"
		],
		isFAQ: true
	},
	{
		question: "He explained the reasons why ________________（他没做作业）.",
		answers: [
			"others like playing football"
		],
		isFAQ: true
	},
	{
		question: "____________________（我认为有必要）to discuss the matter in class.",
		answers: [
			"I think it is necessary/I find it necessary"
		],
		isFAQ: true
	},
	{
		question: "Since he is the best student in our class,___________________.（让他去参加比赛吧）",
		answers: [
			"She didn't catch that flight\n填空题"
		],
		isFAQ: true
	},
	{
		question: "I want______(buy) a book.",
		answers: [
			"to buy"
		],
		isFAQ: true
	},
	{
		question: "Do your brother and you _______ (have) any questions?",
		answers: [
			"have"
		],
		isFAQ: true
	},
	{
		question: "Thanks for _______ (ask) me.",
		answers: [
			"asking"
		],
		isFAQ: true
	},
	{
		question: "One of his ______ ( foot be) hurt.",
		answers: [
			"feet…was"
		],
		isFAQ: true
	},
	{
		question: "Would you like me ________ (go) with you ?",
		answers: [
			"to go"
		],
		isFAQ: true
	},
	{
		question: "but his _________(speak)doesn't improve.",
		answers: [
			"speaking"
		],
		isFAQ: true
	},
	{
		question: "My father bought ____ (I) a new watch.",
		answers: [
			"me"
		],
		isFAQ: true
	},
	{
		question: "I felt _____(tire) after a long walk.",
		answers: [
			"tired"
		],
		isFAQ: true
	},
	{
		question: "This story is as _________ (interest) as that one.",
		answers: [
			"interesting"
		],
		isFAQ: true
	},
	{
		question: "A number of students always ________ (study) hard.",
		answers: [
			"study"
		],
		isFAQ: true
	},
	{
		question: "Beijing is a good place _________(go) sightseeing.",
		answers: [
			"to go"
		],
		isFAQ: true
	},
	{
		question: "There ______________ (be) a football match tomorrow.",
		answers: [
			"will be"
		],
		isFAQ: true
	},
	{
		question: "The little boy is _________ (interest)  in the ____________(interest) story.",
		answers: [
			"interestedinteresting"
		],
		isFAQ: true
	},
	{
		question: "I always like ______ (make friend) with others.",
		answers: [
			"making friends"
		],
		isFAQ: true
	},
	{
		question: "He'd like _______ (go) with Tom.",
		answers: [
			"to go"
		],
		isFAQ: true
	},
	{
		question: "We'll have to sweep the floor before mother ____________(come) back.",
		answers: [
			"comes"
		],
		isFAQ: true
	},
	{
		question: "Tom doesn't like his __________ (old) brother.",
		answers: [
			"elder"
		],
		isFAQ: true
	},
	{
		question: "I ______ (go) to bed until I finished my homework yesterday.",
		answers: [
			"didn’t go"
		],
		isFAQ: true
	},
	{
		question: "This coat is really _________ (beautiful).",
		answers: [
			"beautiful"
		],
		isFAQ: true
	},
	{
		question: "Do you finish ________ (read) this story book?",
		answers: [
			"reading"
		],
		isFAQ: true
	},
	{
		question: "Ann didn't come to school because of her _________ (ill)",
		answers: [
			"illness"
		],
		isFAQ: true
	},
	{
		question: "Sunday is _______ day.",
		answers: [
			"the first"
		],
		isFAQ: true
	},
	{
		question: "I want to learn how ________( run) quickly.",
		answers: [
			"to run"
		],
		isFAQ: true
	},
	{
		question: "Which subject do you like ________(well). Chinese. maths or History?",
		answers: [
			"best"
		],
		isFAQ: true
	},
	{
		question: "The cat has four ______ (foot).",
		answers: [
			"feet"
		],
		isFAQ: true
	},
	{
		question: "When ______ he ______ (have) lunch yesterday?",
		answers: [
			"didhave"
		],
		isFAQ: true
	},
	{
		question: "Mom wants me ________ (eat) more.",
		answers: [
			"to eat"
		],
		isFAQ: true
	},
	{
		question: "Can you help Tom? He needs some _____ (help).",
		answers: [
			"help"
		],
		isFAQ: true
	},
	{
		question: "I won't come late any ________ (much).",
		answers: [
			"more"
		],
		isFAQ: true
	},
	{
		question: "I had no time ________(have) my breakfast.",
		answers: [
			"to have"
		],
		isFAQ: true
	},
	{
		question: "You will be possibly _____ (wake) if you drink dark tea before you go to bed.",
		answers: [
			"to wake"
		],
		isFAQ: true
	},
	{
		question: "They _____ (be) also students five years ago.",
		answers: [
			"were"
		],
		isFAQ: true
	},
	{
		question: "It's important ________ (learn) the language.",
		answers: [
			"to learn"
		],
		isFAQ: true
	},
	{
		question: "How ______Tom often _________ (get to) there?",
		answers: [
			"doseget to"
		],
		isFAQ: true
	},
	{
		question: "The old woman is walking ________(slow).",
		answers: [
			"slowly"
		],
		isFAQ: true
	},
	{
		question: "Can you help me feed the dog?  ---I _________ (feed) now, Mom.",
		answers: [
			"am feeding"
		],
		isFAQ: true
	},
	{
		question: "I have to _______ (visit) my best friend Lin. tomorrow.",
		answers: [
			"visit"
		],
		isFAQ: true
	},
	{
		question: "You'd better ________ ( not forget) send me an e-mail.",
		answers: [
			"not forget to"
		],
		isFAQ: true
	},
	{
		question: "As soon as I went to bed. I fell ________ (sleep).",
		answers: [
			"asleep"
		],
		isFAQ: true
	},
	{
		question: "She plans ________ (study) English.",
		answers: [
			"to study"
		],
		isFAQ: true
	},
	{
		question: "thanks for ______ (ask) me.",
		answers: [
			"asking"
		],
		isFAQ: true
	},
	{
		question: "I want to go home __________ (help) my mother.",
		answers: [
			"to help"
		],
		isFAQ: true
	},
	{
		question: "He is much __________ (athletic).",
		answers: [
			"more athletic"
		],
		isFAQ: true
	},
	{
		question: "Do you like going ___________ (ride)?",
		answers: [
			"riding"
		],
		isFAQ: true
	},
	{
		question: "When spring comes. it gets ________ and _______ (long).",
		answers: [
			"longerlonger"
		],
		isFAQ: true
	},
	{
		question: "How about _________ (shop)?",
		answers: [
			"shopping"
		],
		isFAQ: true
	},
	{
		question: "Look,he __________(wait) for his brother.",
		answers: [
			"is waiting"
		],
		isFAQ: true
	},
	{
		question: "Yesterday. we _______(win) the first in the _______(run) race.",
		answers: [
			"won…running"
		],
		isFAQ: true
	},
	{
		question: "Look out! The train ______________ (leave).",
		answers: [
			"is leaving"
		],
		isFAQ: true
	},
	{
		question: "It is easier ______(say) it than ______(do) it.",
		answers: [
			"to sayto do"
		],
		isFAQ: true
	},
	{
		question: "Mrs King has much __________(much) money than Mrs Lee.",
		answers: [
			"more"
		],
		isFAQ: true
	},
	{
		question: "Spring is the _______(good) time of the year.",
		answers: [
			"best"
		],
		isFAQ: true
	},
	{
		question: "Sandy is an ______ (usual) girl.",
		answers: [
			"unusual"
		],
		isFAQ: true
	},
	{
		question: "________(final),the old mother cried.",
		answers: [
			"Finally"
		],
		isFAQ: true
	},
	{
		question: "They are ________ (friend) to us.",
		answers: [
			"friendly"
		],
		isFAQ: true
	},
	{
		question: "They all enjoy _______ (speak) English.",
		answers: [
			"speaking"
		],
		isFAQ: true
	},
	{
		question: "They ___________ (exercise) at the moment.",
		answers: [
			"are exercising"
		],
		isFAQ: true
	},
	{
		question: "The students enjoy __________ (read) English stories.",
		answers: [
			"reading"
		],
		isFAQ: true
	},
	{
		question: "The baby has two _______( tooth) now.",
		answers: [
			"teeth"
		],
		isFAQ: true
	},
	{
		question: "We decide _____ (go)shopping tomorrow.",
		answers: [
			"to go"
		],
		isFAQ: true
	},
	{
		question: "Please stop _______(have) a rest if you feel tired.",
		answers: [
			"to have"
		],
		isFAQ: true
	},
	{
		question: "Hi. look! I can _________ (fly) the kite now.",
		answers: [
			"fly"
		],
		isFAQ: true
	},
	{
		question: "You should take the medicine ___________ ( two) a day",
		answers: [
			"twice"
		],
		isFAQ: true
	},
	{
		question: "_________ is the fourth day of a week.",
		answers: [
			"Wednesday"
		],
		isFAQ: true
	},
	{
		question: "I have a stomachache. I don't feel like ______ (eat) anything.",
		answers: [
			"eating"
		],
		isFAQ: true
	},
	{
		question: "Zhang Bing's ________(write) is very good.(write)",
		answers: [
			"writing"
		],
		isFAQ: true
	},
	{
		question: "Which do you like _______(well),carrots or tomatoes?",
		answers: [
			"better"
		],
		isFAQ: true
	},
	{
		question: "Mr Tang teaches __________(our) maths.",
		answers: [
			"us"
		],
		isFAQ: true
	},
	{
		question: "Let the cat ______ (go) out now.",
		answers: [
			"go"
		],
		isFAQ: true
	},
	{
		question: "There ________________ (be) a Monkeys Show in a minute.",
		answers: [
			"will be"
		],
		isFAQ: true
	},
	{
		question: "_____ right now, she would get there on Tuesday.",
		answers: [
			"Were she to leave"
		],
		isFAQ: false
	},
	{
		question: "As Commander-in-Chief of the armed forces, I have directed that all measures ____ for our defense.",
		answers: [
			"be taken"
		],
		isFAQ: false
	},
	{
		question: "The discussion ________ alive when an funny joke was brought in.",
		answers: [
			"came"
		],
		isFAQ: false
	},
	{
		question: "Now that she is out of a job, Amy ________ going back to school, but she hasn't decided yet.",
		answers: [
			"has been considering"
		],
		isFAQ: false
	},
	{
		question: "The boss would rather his daughter _____ in the same office.",
		answers: [
			"did not work"
		],
		isFAQ: false
	},
	{
		question: "Jim doesn't want to work right away because he thinks that if he _____ a job he probably wouldn't be able to see his friends very often.",
		answers: [
			"were to get"
		],
		isFAQ: false
	},
	{
		question: "He suggested _____ to tomorrow's exhibition together.",
		answers: [
			"we go"
		],
		isFAQ: false
	},
	{
		question: "She ________ her hairstyle in her hometown before she came to Guangzhou for a better job.",
		answers: [
			"changed"
		],
		isFAQ: false
	},
	{
		question: "I ________ you not to move my dictionary — now I can't find it.",
		answers: [
			"asked"
		],
		isFAQ: false
	},
	{
		question: "You didn't allow me to drive. If we ______ in turn, you ______ so tired.",
		answers: [
			"had driven; wouldn't have got"
		],
		isFAQ: false
	},
	{
		question: "How can you possibly miss the news? It ________ on TV all day long.",
		answers: [
			"has been"
		],
		isFAQ: false
	},
	{
		question: "— You haven't said a word about my new coat, Linda. Do you like it?—I'm sorry I ________ anything about it sooner. I certainly think it's pretty on you.",
		answers: [
			"didn't say"
		],
		isFAQ: false
	},
	{
		question: "The first use of atomic weapons was in 1945, and their power ________ increased enormously ever since.",
		answers: [
			"has been"
		],
		isFAQ: false
	},
	{
		question: "If the whole operation ____ well beforehand, a great deal of time and money would have been lost.",
		answers: [
			"had not been planned"
		],
		isFAQ: false
	},
	{
		question: "My mind wasn't on what she was saying so I'm afraid I ________ half of it.",
		answers: [
			"missed"
		],
		isFAQ: false
	},
	{
		question: "We are all for your proposal that the meeting _____.",
		answers: [
			"be put off"
		],
		isFAQ: false
	},
	{
		question: "More man-made satellites ____ in the near future.",
		answers: [
			"will be sent up"
		],
		isFAQ: false
	},
	{
		question: "—I hear Jane has gone to Beijing for her holiday.—Oh, how nice! Do you know when she ________?",
		answers: [
			"left"
		],
		isFAQ: false
	},
	{
		question: "I wonder why Kimmy ________ us recently. We should have heard from her by now.",
		answers: [
			"hasn't written"
		],
		isFAQ: false
	},
	{
		question: "It is necessary that these gifts _____ back as early as possible.",
		answers: [
			"be sent"
		],
		isFAQ: false
	},
	{
		question: "We desire that our guide ______ us immediately of any change in plans.",
		answers: [
			"inform"
		],
		isFAQ: false
	},
	{
		question: "Wouldn't you rather your child _____ to bed early?",
		answers: [
			"went"
		],
		isFAQ: false
	},
	{
		question: "It was essential that the files _____ back before the deadline.",
		answers: [
			"be sent"
		],
		isFAQ: false
	},
	{
		question: "Many people _____ during the earthquake in May, 00",
		answers: [
			"died"
		],
		isFAQ: false
	},
	{
		question: "Jim ________ he didn't like his father's job.",
		answers: [
			"said"
		],
		isFAQ: false
	},
	{
		question: "I ________ while reading the Chinese textbook. Luckily, my roommate woke me up in time!",
		answers: [
			"fell asleep"
		],
		isFAQ: false
	},
	{
		question: "All morning as she waited for the medical report from the doctor, her nervousness ________.",
		answers: [
			"grew"
		],
		isFAQ: false
	},
	{
		question: "_____ before we depart tomorrow, we should have a wonderful dinner party.",
		answers: [
			"Were they to arrive"
		],
		isFAQ: false
	},
	{
		question: "—Michale, do you know who wanted me on the phone?—Sorry. I don't know. I ________ a bath in the bathroom.",
		answers: [
			"was having"
		],
		isFAQ: false
	},
	{
		question: "The lost girl ______ at the street corner last night.",
		answers: [
			"was found"
		],
		isFAQ: false
	},
	{
		question: "Three bridges ____ since last year.",
		answers: [
			"have been built"
		],
		isFAQ: false
	},
	{
		question: "Why don't you put the meat in the fridge? It will ________ fresh for several days.",
		answers: [
			"stay"
		],
		isFAQ: false
	},
	{
		question: "You _____ Jim so closely. You should have kept your distance.",
		answers: [
			"shouldn't have been following"
		],
		isFAQ: false
	},
	{
		question: "—Could you tell me how your mother usually goes to work?—Yes. If it is fine, she ________ to her office.",
		answers: [
			"walks"
		],
		isFAQ: false
	},
	{
		question: "She has set a new record, that is, the sales of her latest book ________ 0 million.",
		answers: [
			"have reached"
		],
		isFAQ: false
	},
	{
		question: "I ________ ping-pong quite well, but I haven't had time to play since the new year.",
		answers: [
			"play"
		],
		isFAQ: false
	},
	{
		question: "It's necessary _____ the dictionary immediately.",
		answers: [
			"that he return"
		],
		isFAQ: false
	},
	{
		question: "It is said in the book that Thomas Edison (1847～1931) ________ the world-leading inventor for seventy years.",
		answers: [
			"was"
		],
		isFAQ: false
	},
	{
		question: "Children should ___.",
		answers: [
			"be taken good care of"
		],
		isFAQ: false
	},
	{
		question: "—What were you doing when Jim phoned you?—I had just finished my work and________ to take a shower.",
		answers: [
			"was starting"
		],
		isFAQ: false
	},
	{
		question: "The suggestion that the Professor Li _____ the prizes was accepted by everyone.",
		answers: [
			"present"
		],
		isFAQ: false
	},
	{
		question: "If you ______ with Tom earlier, you _____ so angry now.",
		answers: [
			"had talked; would not be"
		],
		isFAQ: false
	},
	{
		question: "Now Chinese ______ by more and more people all over the world.",
		answers: [
			"is spoken"
		],
		isFAQ: false
	},
	{
		question: "Sales of CDs have greatly increased since the early 0s, when people ________ to enjoy the advantages of the new technology.",
		answers: [
			"began"
		],
		isFAQ: false
	},
	{
		question: "The crazy fans ________ patiently for three hours and they would wait till the movie star arrived.",
		answers: [
			"had been waiting"
		],
		isFAQ: false
	},
	{
		question: "Flowers ______ every day.",
		answers: [
			"should be watered"
		],
		isFAQ: false
	},
	{
		question: "—You were out when I visited your house.—Oh, I ________ for a friend from England at the airport.",
		answers: [
			"was waiting"
		],
		isFAQ: false
	},
	{
		question: "Monica's uncle insists _____ in this hotel.",
		answers: [
			"that he not stay"
		],
		isFAQ: false
	},
	{
		question: "It ______that there was a car over there.",
		answers: [
			"so happened"
		],
		isFAQ: false
	},
	{
		question: "A short time before he ________ , the old man ________ a will, leaving all her money to his brother.",
		answers: [
			"died; had written"
		],
		isFAQ: false
	},
	{
		question: "As time ________ on, Sophie began to wonder if Bruce ________ Bilks' new poem called Tabled Hute.",
		answers: [
			"went; had read"
		],
		isFAQ: false
	},
	{
		question: "—Jane doesn't look very well. What's wrong with her?— She has a headache because she ________ too long; she ought to stop reading.",
		answers: [
			"has been reading"
		],
		isFAQ: false
	},
	{
		question: "Had she worked harder, she _____ the exams.",
		answers: [
			"would have got through"
		],
		isFAQ: false
	},
	{
		question: "—Has Sam finished his homework today?—I have no idea. He ________ it this morning.",
		answers: [
			"was doing"
		],
		isFAQ: false
	},
	{
		question: "The manager of the hotel requests that their guests _____ after :00 p.m..",
		answers: [
			"shouldn't play loud music"
		],
		isFAQ: false
	},
	{
		question: "_____ for my illness I would have lent her a helping hand.",
		answers: [
			"Had it not been"
		],
		isFAQ: false
	},
	{
		question: "He kept looking at Jenny, wondering whether he ________ her somewhere.",
		answers: [
			"had seen"
		],
		isFAQ: false
	},
	{
		question: "Your bike ______.",
		answers: [
			"needs repairing"
		],
		isFAQ: false
	},
	{
		question: "Let's keep to the point or we ________ any decisions.",
		answers: [
			"will never reach"
		],
		isFAQ: false
	},
	{
		question: "Because the shop ________ , all the T-shirts are sold at half price.",
		answers: [
			"is closing down"
		],
		isFAQ: false
	},
	{
		question: "Turn on the television and you ________ advertisements showing happy families.",
		answers: [
			"will often see"
		],
		isFAQ: false
	},
	{
		question: "Although she has lived with us for years, she _______ us much impression.",
		answers: [
			"doesn't leave"
		],
		isFAQ: false
	},
	{
		question: "— What' s that terrible noise?—The neighbors ________ for a birthday party.",
		answers: [
			"are preparing"
		],
		isFAQ: false
	},
	{
		question: "Jim wishes that he _____ business instead of English when he was in university.",
		answers: [
			"had studied"
		],
		isFAQ: false
	},
	{
		question: "It is essential that enough money _____ to fund the project.",
		answers: [
			"be collected"
		],
		isFAQ: false
	},
	{
		question: "I wish I _____ longer this morning, but I had to get up and go to work.",
		answers: [
			"had slept"
		],
		isFAQ: false
	},
	{
		question: "The teacher, with 10 girls and  boys of her class, ________ visiting a museum when the earthquake struck.",
		answers: [
			"was"
		],
		isFAQ: false
	},
	{
		question: "The millions of calculation involved, had they been done by hand, _____ all practical value by the time they were finished.",
		answers: [
			"would have lost"
		],
		isFAQ: false
	},
	{
		question: "Jimmy arrived late; he ________ the road to be so icy.",
		answers: [
			"hadn't expected"
		],
		isFAQ: false
	},
	{
		question: "It is important that the parents _____ that their children are taken good care of.",
		answers: [
			"make sure"
		],
		isFAQ: false
	},
	{
		question: "I still cannot believe that I am taking up this prize I won last year.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "But China’s human population has been great growing.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "All the pupils in the school was very young.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "He just gentle said a sentence I will never forget: “Whatever you need.”",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "As I was waiting my order to come, I noticed an old man in a wheel chair roll himself over to a table.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Well-known for their expertise,his parents company transported me safely into the future in a time capsule.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "At the same time, my mother was in the final stages of the cancer.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Miss Jones was math teacher.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I am good at all the subjects, and always ready help others．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "He smiled and said, “Thank you. You are generously. I’d like some orange juice, please.”",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I warmly welcome you to Shanghai.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Yesterday I stepped into a restaurant for lunch.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "A young woman passes by saw the little boy and could read the desire in his pale blue eyes.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "So I was very nervous and uncertain at first.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "It’s the relationship among my desk mate and me．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "What’s more, he got angry easily．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Her home not far from her school, but she always walked there in the morning.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "There she bought her some new shoes and a complete suit of warmly clothing.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "One cold evening during the holiday season, a little boy about six or seven was standing out in the front of a store window.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Shanghai a beautiful city　with a long history.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I value our friendship．",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "More population means more land is needed for farming.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "I learn that you’d come to Shanghai for a visit during this summer holiday.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I have to remind yourself constantly that I am really in AD 3008.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Loss of habitat in lowland areas has forced pandas live only in the mountains.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I didn’t want to bother the president with my trouble, yet I felt someone at the company needed to know about it.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I worked during the day and drive 40 miles home to be with her every night.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "He thanked me again and told me I had made his days, coming over and helping him out.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I’ll meet you in the airport.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "I’ll show you around in Shanghai when you arrive.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "It also mean more forests are cut for wood to build and heat houses.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "She smiled and replied that she was just one of His child.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Therefore, the president called me into his office one day.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "She took the child by the hand and led him into the store.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "No one and me seemed to notice him.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "But then a small boy looked at her for a few seconds, to put his arms around her and said kindly.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "The little boy looked her and asked if she was God.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I got up and go over to his table and asked if that I could get him something to drink.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Maybe that ’s why we’ve seldom sat down to exchange our feelings and thoughts．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Please phone me when you arrive in Shanghai.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I was caught by surprise and burst into tear.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "At school I get along well with my classmates．",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "This is similar with the “jet lag” you get from flying, but it seems that you keep getting flashbacks from your previous time period.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "There are many sight in Shanghai,such as the Bund, the Yu Garden, the Oriental Pearl TV Tower, the People's Square, the Shanghai Zoo and so on.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "But he’s a person with few words．",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "I don’t know what to deal with him．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "The most damaged result of development has been that it has divided the pandas habitat into little islands of forest.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "When I was getting ready to leave, I walked by the old man’s table to saying goodbye.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "However, Wang Ping, my friend and guide, were very understanding and gave me some green table which helped a lot.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I was working in a beer company, helped the president do something important.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "It was tired, but it was what I wanted to do.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "They walked back outside into the street, so the woman told the child to go home and have a happy holiday.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "As a result, I suffer from “time lag”.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "They are very worth visiting.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "He faced me from across her large desk, looked at me and said, “Alice, I hear your mother is very ill.”",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "He is a hard-working student, who keeps school rule well．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "It was nice and warm here and Miss Jones was happily.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I haven’t seen you, my dear friend, for long time.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "In China, people and giant pandas had been living together for thousands of years.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I hope we can know more about with each other and understand each other better．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I do hope we will be close to each other than before.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Therefore, I have a problem that troubles me all the time．",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "The little child has no shoes and his clothes were just rags.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "The result is that the giant pandas can connect with one another to mate and have babies.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Besides, to our relief, there is still some good news that people are trying to help the giant pandas by creating protected areas.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I gave him a hug and told him he had made my day, either.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "In a cold and windy morning, Miss Jones walked to the school, and the cold wind goes into her eyes.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Today, many panda are isolated in these small sections of forest, because of they will cross into areas where people live.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "I miss you badly. I hope everything is OK with you.",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Worrying about the journey, I was unsettled for the first few days.",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Why is it important to establish business relations?",
		answers: [
			"The development and expansion of a business depends on customers. Needless to say no customer no business. The establishment of business relations is the fundamental step in foreign trade and in international exchange."
		],
		isFAQ: true
	},
	{
		question: "What is called a letter of claim?",
		answers: [
			"A claim is written to inform the company of the problem and suggest a fair compensation the purpose of a claim is not to express anger bu to get result. Therefore it is important to avoid a hostile or demanding tone."
		],
		isFAQ: true
	},
	{
		question: "Name at least 5 reasons for writing request letters.",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "Why people should avoid a hostile or demanding tone in a claim letter?",
		answers: [
			"A claim is written to inform the company of the problem and suggest fair compensation. No matter how infuriating the nature of the problem or how great the inconvenience the purpose of a claim is NOT to express anger but to get results. Therefore it is important to avoid a hostile or demanding tone. A claim must be calm and polite but firm."
		],
		isFAQ: true
	},
	{
		question: "Why your first letter to establish business relations is so important?",
		answers: [
			"Your first letter to open up a market or enlarge your firm scope is very important because it is known that the first impression will count heavily. Therefore transaction can only be made after the business connections have been set up. This type of letter may also be called a first enquiry."
		],
		isFAQ: true
	},
	{
		question: "Under what conditions does a buyer or a seller make a counter offer?",
		answers: [
			"If the buyer finds any terms or conditions in the offer unacceptable he can make a counter-offer to renew the terms negotiating with the seller. Likewise if the seller rejects the buyer’s request he can make a counter-counter offer to discuss with the buyer. The letter of rejection should cover the expression of either thanks for the offer or quotation or the reason and regret not being able to accept. Make your counter-offer in the reasonable and appropriate way. Finally suggest other opportunities to cooperate with a view to goodwill and to encoring business.The following suggestions should be borne in mind while writing letters of offer."
		],
		isFAQ: true
	},
	{
		question: "Name at least 5 elements which should be covered in a specific inquiry.",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "What specific information should be included in an order acknowledgment?",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "What information should be included in a letter of first enquiry?",
		answers: [
			"Generally speaking this type of letter begins by telling the addressee how his name is known. Then some general information should be given as to the lines of business being handled. The writer should state simply clearly and concisely what he can sell or what he expects to buy."
		],
		isFAQ: true
	},
	{
		question: "When do people usually send memos?",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "What are the differences between a full adjustment a partial adjustment?",
		answers: [
			"A full adjustment means that the company is at fault. A partial adjustment means that neither the company nor the customer is entirely at fault. A full adjustment letter should be cheerful freely admitting errors and willingly offering the adjustment. It should express appreciation for the information provided in the claim. The letter may include an explanation of what went wrong it should include an indication that similar errors will be unlikely in the future. Finally it should reassure long-term cooperation and mutual benefit perhaps by suggesting future business. A partial adjustment letter will be written when neither the company nor the customer is entirely at fault. It must express an attitude of pleasant cooperation. It should be based on facts and offer a reason for refusing the requested adjustment. Of course it should leave the decision to accept the adjustment to the customer and suggest a course of action."
		],
		isFAQ: true
	},
	{
		question: "Under what conditions do people write letter of complaints?",
		answers: [
			"A customer may receive the wrong merchandise slow services invoices or statements that contain errors. The best steps you take to correct the above situations are to make complaints. Your complaints can be either mild and polite or direct and strong."
		],
		isFAQ: true
	},
	{
		question: "What is the function of a letter of sympathy?",
		answers: [
			"An immediate short and sincere note of support condolence or sympathy gives the employee a sense of being cared about of belonging. Not only is such a letter much appreciated but it does serve to provide real strength and comfort in helping the employee face the crisis."
		],
		isFAQ: true
	},
	{
		question: "How to write an easy to read but impressive resume?",
		answers: [
			"By careful planning and preparing your resume you can avoid cluttering your application letter with numerous details that would interfere with its lively readable “sales presentation”. Further you can present all the appropriate background information about yourself in a greatly condensed well-organized easy to understand attractive format--probably on one page! You should divide your resume into various sections as shown below each with an appropriate heading also you should be consistent in the form and phrasing of statements but you need not use complete sentences."
		],
		isFAQ: true
	},
	{
		question: "Why you must make your inquiry easy to answer?",
		answers: [
			"Usually an inquiry offers the recipient no immediate reward or advantage beyond the prospect of a future customer or the maintenance of goodwill. Therefore your inquiry must be worded in such a way that the recipient will respond despite a hectic schedule. To do this you must make your inquiry easy to answer.\n填空题"
		],
		isFAQ: true
	},
	{
		question: "For a long time I regretted not ____(do) much sport, but recently, I decided things needed to change.",
		answers: [
			"doing"
		],
		isFAQ: true
	},
	{
		question: "The professor _______ the lesson where he left off last time.（fall into, take up, take on）",
		answers: [
			"took up"
		],
		isFAQ: true
	},
	{
		question: "I went swimming in the local pool and started going to a gym. I then ____(join) a group of runners.",
		answers: [
			"joined"
		],
		isFAQ: true
	},
	{
		question: "I now go running twice a day as well as going to the gym and I run marathons ____(regular).",
		answers: [
			"regularly"
		],
		isFAQ: true
	},
	{
		question: "It is difficult to figure out a global population of polar bears as much of the range has been ____(poor) studied; however, biologists calculate that there are about 20,000-25,000 polar bears worldwide.",
		answers: [
			"poorly"
		],
		isFAQ: true
	},
	{
		question: "We must be careful not to do anything that might _______ the economic recovery. ( danger )",
		answers: [
			"endanger"
		],
		isFAQ: true
	},
	{
		question: "Helen’s brother is a big man of about forty, wide-shouldered and _______ built. ( heavy )",
		answers: [
			"heavily"
		],
		isFAQ: true
	},
	{
		question: "To tell the truth, I wish I  ____(run) a marathon years ago.",
		answers: [
			"had run"
		],
		isFAQ: true
	},
	{
		question: "Jan _______ the African Affairs Bureau before I was informed.（assign to, refer to as, endow with）",
		answers: [
			"had been assigned to"
		],
		isFAQ: true
	},
	{
		question: "In _______, my father takes up painting and gardening for relaxation. ( retire )",
		answers: [
			"retirement"
		],
		isFAQ: true
	},
	{
		question: "I now go running twice a day as well as going to the gym and I run marathons ____ (regular).",
		answers: [
			"regularly"
		],
		isFAQ: true
	},
	{
		question: "On our way to the house, it was raining ____ hard that we couldn􀆳t help wondering how long it would take to get there.",
		answers: [
			"so"
		],
		isFAQ: true
	},
	{
		question: "We met each week and we had ____ excellent coach who gave us guidance and training tips.",
		answers: [
			"an"
		],
		isFAQ: true
	},
	{
		question: "The police described one of the arrested men as a leading _______. ( terror )",
		answers: [
			"terrorist"
		],
		isFAQ: true
	},
	{
		question: "The melody _______ Bach, the famous composer.（defer from, ascribe to, contribute to）",
		answers: [
			"is ascribed to"
		],
		isFAQ: true
	},
	{
		question: "One of my _______ saying is “There is no smoke without fire.” ( favor )",
		answers: [
			"favorite"
		],
		isFAQ: true
	},
	{
		question: "I thought that everyone was ____(good) than me.",
		answers: [
			"better"
		],
		isFAQ: true
	},
	{
		question: "I realized that ____ I wanted to take part in such a big race, I had to be willing to try.",
		answers: [
			"if"
		],
		isFAQ: true
	},
	{
		question: "I realized that ____ I wanted to take part in such a big race, I had to be willing to try.",
		answers: [
			"if"
		],
		isFAQ: true
	},
	{
		question: "People_______get fat when they grow older.（suit for, tempt to, tend to）",
		answers: [
			"tend to"
		],
		isFAQ: true
	},
	{
		question: "Several people have been _______ for the chairmanship.（put forward, stem forward, take step）",
		answers: [
			"put forward"
		],
		isFAQ: true
	},
	{
		question: "Although she is not officially our boss, she is in _______ control of the office. ( effect )",
		answers: [
			"effective"
		],
		isFAQ: true
	},
	{
		question: "For a long time I regretted not ____(do)much sport, but recently, I decided things needed to change.",
		answers: [
			"doing"
		],
		isFAQ: true
	},
	{
		question: "The policemen on patrol became _______ of the two men in a car. ( suspicion )",
		answers: [
			"suspicious"
		],
		isFAQ: true
	},
	{
		question: "Many new grand hotels _______ since the reform of opening-up of our country.（divide into, come into being, be oblige to）",
		answers: [
			"have come into being"
		],
		isFAQ: true
	},
	{
		question: "We must _______ to prevent the spread of flu.（put forward, stem forward, take step）",
		answers: [
			"take steps"
		],
		isFAQ: true
	},
	{
		question: "In order to meet changing needs of customers, the Research and Development Department has to _______ new products.（apply to, come up with, distinguish from）",
		answers: [
			"come up with"
		],
		isFAQ: true
	},
	{
		question: "I went swimming in the local pool and started going to a gym. I then ____(join) a group of runners.",
		answers: [
			"joined"
		],
		isFAQ: true
	},
	{
		question: "I saw a marathon on TV and made up my mind that was ____ I wanted to do.",
		answers: [
			"what"
		],
		isFAQ: true
	},
	{
		question: "Elizabeth listened to the speaker, but only out of _______. ( polite )",
		answers: [
			"politeness"
		],
		isFAQ: true
	},
	{
		question: "The social significance _______ the great appreciation of other cultures.（put forward, stem forward, take step）",
		answers: [
			"stems from"
		],
		isFAQ: true
	},
	{
		question: "If we act fast, we can once and for all prevent wild animals from suffering terrible _______. ( cruel )",
		answers: [
			"cruelty"
		],
		isFAQ: true
	},
	{
		question: "We met each week and we had ____ excellent coach who gave us guidance and training.",
		answers: [
			"an"
		],
		isFAQ: true
	},
	{
		question: "In the film the main character is depicted as a ( n ) _______ and clever person. ( agree )",
		answers: [
			"agreeable"
		],
		isFAQ: true
	},
	{
		question: "Consumer Report is a _______ publication with no commercial ties. ( profit )",
		answers: [
			"nonprofit"
		],
		isFAQ: true
	},
	{
		question: "Through painstaking effort, they at last worked out a way to _______ that substance. ( pure )",
		answers: [
			"purify"
		],
		isFAQ: true
	},
	{
		question: "We cannot afford a mistake like that. It will perhaps _______ disastrous consequences.（lead to, take on, confine to）",
		answers: [
			"lead to"
		],
		isFAQ: true
	},
	{
		question: "As a new global practice of flexible production, the travel and leisure industry _______ and rapidly outpaced the manufacturing sector in adopting flexible production.（decide against, take hold, give priority to）",
		answers: [
			"took hold"
		],
		isFAQ: true
	},
	{
		question: "In many countries, men were traditionally expected to be the _______ in a family. ( bread, winner )",
		answers: [
			"breadwinner"
		],
		isFAQ: true
	},
	{
		question: "The tourism industry _______computer technology.（suit for, tempt to, tend to）",
		answers: [
			"is suited for"
		],
		isFAQ: true
	},
	{
		question: "Her years of hard work have _____(final) been acknowledged after a customer nominated (提名) her to be Cheshire􀆳s Woman Of The Year.",
		answers: [
			"finally"
		],
		isFAQ: true
	},
	{
		question: "She had given me a ( n ) _______ list. One name was missing from it. ( complete )",
		answers: [
			"incomplete"
		],
		isFAQ: true
	},
	{
		question: "I’d certainly advise anybody to give ____ a try.",
		answers: [
			"it"
		],
		isFAQ: true
	},
	{
		question: "I love the way little kids dress themselves. They’re completely _______ about how other perceive them. ( free care )",
		answers: [
			"carefree"
		],
		isFAQ: true
	},
	{
		question: "They are going to _______ a school for deaf-mutes.（set up, transfer to, depend on）",
		answers: [
			"set up"
		],
		isFAQ: true
	},
	{
		question: "Tooth loss mainly affects people in later life and is strongly associated with ageing and decline, but many people prefer not to think ____ this subject.",
		answers: [
			"about/of"
		],
		isFAQ: true
	},
	{
		question: "I started slowly because I felt I needed to get used to ____(thing) gradually.",
		answers: [
			"things"
		],
		isFAQ: true
	},
	{
		question: "My opinions on this dispute _______ the superior director's.（be similar to, refer to, keep to oneself）",
		answers: [
			"are / were similar to"
		],
		isFAQ: true
	},
	{
		question: "This is an example of a _______ application of these principles. ( create )",
		answers: [
			"creative"
		],
		isFAQ: true
	},
	{
		question: "He resigned suddenly, leaving the company’s financial affairs in complete _______. ( order )",
		answers: [
			"disorder"
		],
		isFAQ: true
	},
	{
		question: "At present, the development of domestic tourism services should _______ the economically advanced metropolitan areas.（fascinate with, focus on, lead to）",
		answers: [
			"be focused on"
		],
		isFAQ: true
	},
	{
		question: "It is a ( n ) _______ fact that we can secure peace only by preparing for war. ( fortunate )",
		answers: [
			"unfortunate"
		],
		isFAQ: true
	},
	{
		question: "The threat of global warming will _______ force some developed countries to slow down their energy consumption. ( eventual )",
		answers: [
			"eventually"
		],
		isFAQ: true
	},
	{
		question: "n recent years some Inuit people in Nunavut ____(report) increases in bear sightings around human settlements.",
		answers: [
			"have reported"
		],
		isFAQ: true
	},
	{
		question: "The doctor suggested that the patient go on a diet but he couldn’t resist the _______ of rich food. ( tempt )",
		answers: [
			"temptation"
		],
		isFAQ: true
	},
	{
		question: "The entire tourism industry _______ a base of natural resources.（begin with, give way to, rest on）",
		answers: [
			"rests on"
		],
		isFAQ: true
	},
	{
		question: "Getting the two leaders to sign the peace treaty was his greatest _______. ( accomplish )",
		answers: [
			"accomplishment"
		],
		isFAQ: true
	},
	{
		question: "I don’t know if he did it through ignorance or just plain _______. ( stupid )",
		answers: [
			"stupidity"
		],
		isFAQ: true
	},
	{
		question: "To tell the truth, I wish I ____(run) a marathon years ago.",
		answers: [
			"had run"
		],
		isFAQ: true
	},
	{
		question: "The farmer _______ to beat the boy if he came into the field to steal vegetables again. ( threat )",
		answers: [
			"threatened"
		],
		isFAQ: true
	},
	{
		question: "Linda reads her children a _______ story every night. ( bed, time )",
		answers: [
			"bedtime"
		],
		isFAQ: true
	},
	{
		question: "I started slowly because I felt I needed to get used to ____(thing) gradually.",
		answers: [
			"things"
		],
		isFAQ: true
	},
	{
		question: "I saw a marathon on TV and made up my mind that was ____ I wanted to do.",
		answers: [
			"what"
		],
		isFAQ: true
	},
	{
		question: "To show our _______ for all your hard work, we’d like to give you a bonus. ( appreciate )",
		answers: [
			"appreciation"
		],
		isFAQ: true
	},
	{
		question: "Mr. Brown was once regarded as the president’s closest political _______. ( advise )",
		answers: [
			"advisor"
		],
		isFAQ: true
	},
	{
		question: "Helen became very emotional--almost _______ when pressed to talk about her miserable experience. ( tear )",
		answers: [
			"tearful"
		],
		isFAQ: true
	},
	{
		question: "The room was completely dark and I fumbled _______ for the door. ( blind )",
		answers: [
			"blindly"
		],
		isFAQ: true
	},
	{
		question: "The government was convinced that the bombers wanted to _______ away foreign investors.( fright )",
		answers: [
			"frighten"
		],
		isFAQ: true
	},
	{
		question: "It is _______ whether we can finish this task in time. ( question )",
		answers: [
			"questionable"
		],
		isFAQ: true
	},
	{
		question: "_______ what we’ve already saved, it gives us $550.（involve in, vary in, add to）",
		answers: [
			"Added to"
		],
		isFAQ: true
	},
	{
		question: "支持透明背景和动画的图像文件格式是（）。",
		answers: [
			"GIF"
		],
		isFAQ: false
	},
	{
		question: "对于Photoshop里的文字图层、形状图层、矢量蒙版图层和智能对象图层等包括矢量数据的图层，不能直接在上面进行编辑，需要先将其才能进行相应的操作。",
		answers: [
			"栅格化"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，图像大小的快捷键为（   ）。",
		answers: [
			"Alt+Ctrl+I"
		],
		isFAQ: false
	},
	{
		question: "Illustrator要将文件以PNG格式保存，需执行（   ）操作。",
		answers: [
			"导出"
		],
		isFAQ: false
	},
	{
		question: "打印分辨率是指（   ）。",
		answers: [
			"DPI"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，新建文档对话框中不可以设置（   ）。",
		answers: [
			"文件的格式"
		],
		isFAQ: false
	},
	{
		question: "以下哪种不属于路径类型（   ）。",
		answers: [
			"复合路径"
		],
		isFAQ: false
	},
	{
		question: "Photoshop里填充图层不包括以下哪种填充(   )。",
		answers: [
			"形状"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，如果选择了（  ）的图层，使用移动工具，在其属性栏中可以将所选图层对齐。",
		answers: [
			"2个或2个以上"
		],
		isFAQ: false
	},
	{
		question: "RGB颜色模式的颜色构成中，不包括以下哪种颜色（  ）。",
		answers: [
			"洋红"
		],
		isFAQ: false
	},
	{
		question: "一般用于彩色图像的打印或印刷输出的颜色模式是（）。",
		answers: [
			"CMYK颜色模式"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，使用（  ）命令可以在任意方向上倾斜图像。",
		answers: [
			"斜切"
		],
		isFAQ: false
	},
	{
		question: "以下哪个不是矢量图的优点（）。",
		answers: [
			"色彩和色调变化丰富"
		],
		isFAQ: false
	},
	{
		question: "（  ）软件不能用来进行平面设计。",
		answers: [
			"Animate"
		],
		isFAQ: false
	},
	{
		question: "以下哪个适用于照片。",
		answers: [
			"位图"
		],
		isFAQ: false
	},
	{
		question: "（  ）是指位图中细节的精细度。",
		answers: [
			"位图"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，显示当前文档的大小、尺寸、当前工具和窗口缩放比例等信息是（   ）窗口。",
		answers: [
			"状态栏"
		],
		isFAQ: false
	},
	{
		question: "（  ）是组成数码图像的最小单位。",
		answers: [
			"像素"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，使用“缩放”命令时，如果按住（  ）键，可以以中心点为基准点等比例缩放图像",
		answers: [
			"Alt"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，对于具有多个图层或多个图层组的图像，使用移动工具勾选（   ）后，在图像窗口中单击，软件会自动选中单击位置所在的图层或图层组",
		answers: [
			"自动选择"
		],
		isFAQ: false
	},
	{
		question: "以下哪个是Photoshop的标准颜色模式（）。",
		answers: [
			"Lab颜色模式"
		],
		isFAQ: false
	},
	{
		question: "如果要对Photoshop的“背景”图层进行操作，就需要将其转换为（    ）。",
		answers: [
			"普通图层"
		],
		isFAQ: false
	},
	{
		question: "不能能帮助用户精确地定位图像或元素的是（   ）。",
		answers: [
			"抓手工具"
		],
		isFAQ: false
	},
	{
		question: "表现同样的内容的图像，哪种图像尺寸的文件所占的空间最大（   ）。",
		answers: [
			"2000像素×3000像素"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，以下哪个不是裁剪图像主要使用的命令。",
		answers: [
			"“剪裁”命令"
		],
		isFAQ: false
	},
	{
		question: "能够保存图层的图像文件格式是（）。",
		answers: [
			".PSD"
		],
		isFAQ: false
	},
	{
		question: "以下哪个软件不能创作矢量图形（）。",
		answers: [
			"Photoshop"
		],
		isFAQ: false
	},
	{
		question: "以下哪个是Illustrator的源文件格式(   )。",
		answers: [
			".AI"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，如果选择了（  ）的图层，使用移动工具，在其属性栏中可以将所选图层按一定规则均匀排列。",
		answers: [
			"3个或3个以上"
		],
		isFAQ: false
	},
	{
		question: "四张尺寸相同、内容相同的图像，以下哪种分辨率的图像清晰度更高（   ）。",
		answers: [
			"500 ppi"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，新建文件的快捷键为（   ）。",
		answers: [
			"Ctrl+N"
		],
		isFAQ: false
	},
	{
		question: "屏幕显示的最佳颜色模式是（）。",
		answers: [
			"RGB颜色模式"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，使用（  ）命令可以对图像的局部内容进行扭曲。",
		answers: [
			"变形"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，以下哪个不是新建图层的方法（   ）。",
		answers: [
			"按住Alt键，单击图层菜单命令"
		],
		isFAQ: false
	},
	{
		question: "位图由(   )组成。",
		answers: [
			"像素"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中要绘制精确路径可使用（  ）。",
		answers: [
			"钢笔工具"
		],
		isFAQ: false
	},
	{
		question: "以下属于平面设计软件的是（  ）。",
		answers: [
			"Photoshop"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，(   )命令不可以旋转或翻转整个图像。",
		answers: [
			"图像 > 图像旋转"
		],
		isFAQ: false
	},
	{
		question: "图层的数量较多时，可以创建（   ）来管理同一个内容部分的图层，就可以使“图层”面板中的图层结构更加有条理，寻找起来也更加方便快捷。",
		answers: [
			"图层组"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，显示与编辑图像是在（   ）窗口。",
		answers: [
			"图像窗口"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，“自由变换”命令的快捷键为（  ）。",
		answers: [
			"Ctrl+T"
		],
		isFAQ: false
	},
	{
		question: "以下哪个图标是Photoshop图层缩览图用来控制图层的可见性。",
		answers: [
			"眼睛图标"
		],
		isFAQ: false
	},
	{
		question: "如果需要使用Illustrator的基本绘图工具绘制大量的按一定规律重复的图形，则在绘制图形的过程中按住（   ）键，拖动鼠标到合适的位置后释放鼠标即可完成绘制。",
		answers: [
			"~"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，调整画布大小中(   )选项组中显示的是文档的实际大小，以及图像的实际宽度和高度。",
		answers: [
			"当前大小"
		],
		isFAQ: false
	},
	{
		question: "Illustrator默认将绘制的图形填充为（   ）色，且图形边框为（   ）色。",
		answers: [
			"白色，黑色"
		],
		isFAQ: false
	},
	{
		question: "以下哪个不是图像尺寸的单位（）。",
		answers: [
			"字节"
		],
		isFAQ: false
	},
	{
		question: "CMYK颜色模式的颜色构成中，不包括以下哪种颜色（  ）。",
		answers: [
			"蓝色"
		],
		isFAQ: false
	},
	{
		question: "在Photoshop中，图像大小对话框中不可以设置（   ）。",
		answers: [
			"图像颜色模式"
		],
		isFAQ: false
	},
	{
		question: "在一般情况下，Photoshop的“背景”图层都处于被（  ），无法编辑的状态",
		answers: [
			"锁定"
		],
		isFAQ: false
	},
	{
		question: "Photoshop的源文件的扩展名为（  ）。",
		answers: [
			".PSD"
		],
		isFAQ: false
	},
	{
		question: "Lab颜色模式下，使用不同显示器或打印设备时显示的颜色都是相同的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图不易制作色调丰富或色彩变化多的图像。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "调整图层可以通过点击切换图层可见性按钮，来隐藏或显示调整图层。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，在移动对象的过程的同时按下Shift键拖动鼠标，可实现对象复制。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图像与分辨率有关，将矢量图形打印到不同尺寸的介质上图像边缘清晰度会有所不同。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "图像尺寸与图像文件大小同一个概念。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Illustrator中，使用“直接选择工具”拖动手柄的端点，可以调整路径的形态，改变图形的形状。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，图像大小主要用来设置图像的打印尺寸。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "开发路径不可以设置填充颜色。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图不易在不同的软件间交换。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图的优点是所占容量较小，放大、缩小或旋转会失真，精确度较高。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已经运行了Photoshop，直接将文件拖曳到图像窗口中,可以打开文件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，点击“属性”面板中的切换图层可见性按钮，只能隐藏调整图层。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+S可以新建文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图的色彩和色调变化丰富。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "位图的图形不是很逼真。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，栅格化文字图层以后，文本内容将不能再编辑。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "GIF属于位图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，“画笔工具” 可以使用前景色绘制具有画笔特性的线条或图像。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "JPEG属于位图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "位图不易在不同的软件间交换。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，背景色决定画笔的颜色。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用Photoshop调整画布大小时，当新画布大小小于当前画布大小时，Photoshop 将无法进行调整。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在各种印刷输出中矢量图形是最佳的选择。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，画笔只能是圆形。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "不透明度会决定画笔绘制的内容整体颜色的浓度，数值越小，笔迹的不透明度越高。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，画笔可以是任何形状，如圆、方块、白云、星空、飞鸟和花朵等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "色彩和色调变化丰富是位图的优点。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "从数学角度定义线条和形状的图是位图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在移动对象的过程中，同时按下Shift键拖动鼠标，可实现对象复制。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop是创作位图的软件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "利用Photoshop调整画布大小时，如果图像的背景是透明的，那么“画布扩展颜色”选项可设置颜色，没有设置的话新增加的画布会设置为白色的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中不可以将普通图层转换为“背景”图层",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中可以在创建选区后按键盘上的→、←、↑和↓键来进行小幅度移动。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中可以在创建选区后按键盘上的→、←、↑和↓键来进行大幅度移动。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "JPEG属于矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "位图又称栅格图像。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在 RGB 色彩模式中，任何色彩都可被分解为不同强度的红、绿、蓝3种色光。其中，R代表红色，G代表绿色，B代表蓝色。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，画布指整个图像的大小。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用矩形工具绘制正方形时，需要同时按下Ctrl键。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，利用“填充”命令可以在当前图层或选区内填充颜色或图案，但不可以设置填充时的不透明度和混合模式。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Illustrator中，使用“选择工具”单击锚点可以选中锚点，选中的锚点是实心状，未选中的锚点呈空心状。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "如果要对Photoshop的“背景”图层进行操作，就需要将其转换为普通图层。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "使用【矩形】工具，可以绘制出更加易于控制和修改的矩形形状。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量对象不是矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Illustrator是创作矢量图的软件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop是创作矢量图的软件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "闭合路径就是复合路径。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+O可以打开文件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "拖动任意一侧的平滑锚点的手柄端点，可改变路径的走向和弧度。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "缩放和旋转不会失真是矢量图的优点。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+S可以打开文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图的优点是所占容量较小，放大、缩小或旋转会失真，精确度较低。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "彩色图像的打印应该使用RGB颜色模式。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "编辑图像时，每进行一次操作，Photoshop都会将其记录到“历史记录”面板中，我们可以通过历史记录面板恢复到某一步的状态，恢复后不能再返回到当前的操作状态。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+S可以保存文件。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中执行“图像>画布大小”菜单命令（快捷键为Alt+Ctrl+C），打开“画布大小”对话框，在该对话框中可以对画布的宽度、高度进行调整，但不能调整定位和扩展背景颜色。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "选择“裁剪工具”后，在画布中会自动出现一个裁剪框，拖曳裁剪框上的控制点可以选择要保留的部分或旋转图像，然后按Enter键或双击即可完成裁剪。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "选择“裁剪工具”后，在画布中会自动出现一个裁剪框，拖曳裁剪框上的控制点可以选择要保留的部分或旋转图像，然后按Enter键或双击可继续裁剪。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中在画布中显示出标尺，将鼠标指针放置在左侧的竖直标尺上，然后按住鼠标左键向右拖曳即可拖出水平参考线。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Illustrator是创作位图的软件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图图形不是很逼真。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "路径的起点与终点没有重合的路径是复合路径。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "两个或多个开放路径和闭合路径组合形成的路径就是闭合路径。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，对于尚未制作完成的图像，选用PSD格式保存是最佳的选择。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "裁剪是指移去部分图像，以突出或加强构图效果的过程。使用“裁剪工具” 可以裁剪掉多余的图像，但不能重新定义画布的大小。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用Illustrator完成路径绘制后不能修改。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "创建调整图层以后，不可以在“属性”面板中修改其参数。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中在画布中显示出标尺，将鼠标指针放置在左侧的竖直标尺上，然后按住鼠标左键向右拖曳即可拖出竖直参考线。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "创建调整图层以后，不可以将其删除。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "GIF属于矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，在“图像大小”对话框中可更改图像的尺寸，减小文档的“宽度”和“高度”值，就会减少像素数量，此时画面质量与图像尺寸均会变小。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "随着锚点的删除，与锚点相连的路径不会被删除。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "螺旋线是开发路径。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "位图不易制作色调丰富或色彩变化多的图像。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中执行“图像>画布大小”菜单命令（快捷键为Alt+Ctrl+C），打开“画布大小”对话框，在该对话框中可以对画布的宽度、高度、定位和扩展背景颜色进行调整。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "裁剪是指移去部分图像，以突出或加强构图效果的过程。使用“裁剪工具” 可以裁剪掉多余的图像，并重新定义画布的大小。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "新建文件的快捷键为Ctrl+N。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+O可以新建文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "对于新建的文件，“恢复”命令是可用的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，隐藏的图层不能编辑，但可以合并和删除",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+S可以删除文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "位图的优点是放大后会失真。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "栅格图像就是矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在调整图层的蒙版上绘画，可以将调整应用于图像的一部分。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图文件较大，对内存和硬盘空间容量需求较高。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "直接执行“图像>调整”菜单中的调色命令进行调整后，不满意调色效果可以再重新修改调色命令的参数。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已经运行了Photoshop，直接将文件拖曳到图像窗口中,可以关闭文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "色彩和色调变化丰富是矢量图的优点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用Illustrator中的钢笔工具不能绘制直线路径。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在调整图层的蒙版上绘画，可以将调整应用于图像的全部。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，前景色决定画笔的颜色。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中可以对“背景”图层随意编辑。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "星形是闭合路径。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "BMP属于矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，“画笔工具” 的画笔硬度决定画笔边缘的锐利程度，硬度越大边缘越锐利。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "利用矩形工具绘制正方形时，需要同时按下Ctrl键。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用椭圆工具绘制正圆形时，需要同时按下Shift键。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "直接执行“图像>调整”菜单中的调色命令进行调整，这种方式属于不可修改方式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+N可以关闭文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "闭合路径只能设置填充颜色，不能设置描边颜色。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用Illustrator中的多边形工具，在画板中按住鼠标左键并拖动鼠标指针的同时，按【↑】键可增加多边形的边数。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "BMP属于位图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "不透明度会决定画笔绘制的内容整体颜色的浓度，数值越大，笔迹的不透明度越高。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "利用Photoshop调整画布大小时，“画布扩展颜色”指填充新画布的颜色，可针对所有图层进行操作。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "尖角锚点所在的路径较为平滑。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "图层蒙版是将不同灰度数值转换为不同的透明度，并作用到它所在的图层上，使图层不同部位的透明度产生相应的变化。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "点阵图像就是位图。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "利用Photoshop调整画布大小时，如果图像的背景是透明的，那么“画布扩展颜色”选项将不可用，新增加的画布也是透明的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "绘制椭圆时，按住【Shift+Alt】组合键，则以单击点为中心向外绘制圆形。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "使用【选择】工具选择对象时，按住 Alt键，单击所需选中的对象，可以选中多个对象。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "点阵图像就是矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已经运行了Photoshop，直接将文件拖曳到图像窗口中,可以复制文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在一般情况下，图像的分辨率越高，印刷出来的质量就越好。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量图的缺点是不易制作色调丰富或色彩变化多的图像，图形不是很逼真，不易在不同的软件间交换。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，在创建图层时，“图层”面板将按照创建的先后顺序来排列图层。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "图层组创建后不能删除。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，如果要同时处理多个图层中的内容（如移动、应用变换或创建剪贴蒙版），可以将这些图层链接在一起。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "颜色模式常见的有“RGB颜色”“CMYK颜色”或“Lab颜色”。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "编辑图像时，每进行一次操作，Photoshop都会将其记录到“历史记录”面板中。但不能通过历史记录面板恢复到某一步的状态。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用Photoshop调整画布大小时，“画布扩展颜色”指填充新画布的颜色，只针对背景图层操作。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在处理位图时所编辑的对象是像素而不是对象或形状。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，隐藏的图层可以编辑。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "利用Illustrator中的钢笔工具，在绘制开放路径时，按【Enter】键可结束绘制。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "windows画图的默认格式是JPEG格式。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "位图适用于照片。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "单击【对齐】面板中【间隔】区域中的【垂直平均间隔】按钮，可使对象在水平方向上等间距分布。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "编辑不会破坏图像是调整图层的优点之一。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "矢量形状不是矢量图。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图的优点是所占容量较大，放大、缩小或旋转不失真，精确度较高。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "平滑锚点可以转换成尖角锚点，但尖角锚点无法转换成平滑锚点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "对于新建的文件，“恢复”命令不可用。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "将位图放大到足够时，就可以清晰地观察到图像中有很多小方块，这些小方块就是构成图像的像素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，使用“矩形选框工具” 或“椭圆选框工具” 创建选区后，在选区内部按住鼠标左键拖曳，可以移动选区。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+N可以打开文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图像与分辨率无关，当调整矢量图形的大小、将矢量图形打印到任何尺寸的介质上、在PDF文件中保存矢量图形或将矢量图形导入基于矢量的图形应用程序中时，矢量图形都将保持清晰的边缘。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "“裁切”命令不能完成裁剪图像。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "使用“图像旋转”命令可以旋转或翻转整个图像，但不能翻转画布。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图的优点是所占容量较小，放大、缩小或旋转不失真，精确度较高。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "调整图层能够将调整应用于多个图层。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "缩放和旋转会失真是位图的缺点。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "【手形】工具用于缩放视图的局部和全部。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "调整图层的缺点是编辑具有选择性。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "快捷键Ctrl+O可以关闭文件。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图是由一个个像素组成的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，利用“填充”命令可以在当前图层或选区内填充颜色或图案，同时也可以设置填充时的不透明度和混合模式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Photoshop中，图层缩览图左侧的眼睛图标用来控制图层的可见性。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "利用Photoshop调整画布大小时，当新画布大小小于当前画布大小时，Photoshop 会对当前画布进行裁切。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "若要把下方的图形放置在最上方，选中该对象后，执行【修改】|【排列】|【移至顶层】命令完成操作。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在各种印刷输出中位图是最佳的选择。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "矢量图适用于照片。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "用来绘制矩形或多边形和星形的是椭圆工具。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "尖角锚点常被用于表现线段的直角。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "编辑图像时，每进行一次操作，Photoshop都会将其记录到“历史记录”面板中，我们可以通过历史记录面板恢复到某一步的状态，同时也可以返回到当前的操作状态。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "借助标尺、参考线、网格等辅助工具可以进行对齐和对位等操作，有助于更快速、精确地处理图像。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "参考线以浮动的状态显示在图像上方，在输出和打印图像的时，参考线会显示。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "裁剪图像主要使用“裁剪工具” （快捷键为C）、“裁剪”命令和“裁切”命令来完成。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "PhotoShop中，“画笔工具” 的画笔硬度决定画笔边缘的锐利程度，硬度越大边缘越柔和。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "两侧没有手柄和方向点的锚点是平滑锚点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Illustrator的线型绘图工具组包含哪些工具？",
		answers: [
			"①直线段工具 ②弧形工具 ③螺旋线工具 ④矩形网格工具 ⑤极坐标网格工具"
		],
		isFAQ: true
	},
	{
		question: "简述“存储”命令与“存储为”命令的区别。",
		answers: [
			"编辑完文件以后，可以执行“文件>存储”菜单命令（快捷键为Ctrl+S）保存文件。存储时将保留对文件所做的更改，并且替换上一次保存的文件。”存储为”菜单命令会将文件保存到另一个位置或使用另一文件名进行保存，执行步骤为“文件>存储为”菜单命令（快捷键为Shift+Ctrl+S）。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop置入文件的含义。",
		answers: [
			"置入文件是将图片或任何Photoshop支持的文件作为智能对象添加到当前操作的文档中。"
		],
		isFAQ: true
	},
	{
		question: "Photoshop的工作界面主要包括哪几个元素？",
		answers: [
			"①菜单栏 ②工具箱 ③图像窗口 ④属性栏 ⑤面板"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator中，如何绘制八边形？",
		answers: [
			"①单击【矩形】工具，在弹出的下拉菜单中选择【多角星形】工具； ②在画板中单击，在弹出的【多边形工具选项】对话框中设置【边数】为“8”，单击【确定】按钮。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何反选选区。",
		answers: [
			"创建选区以后，执行“选择>反选”菜单命令（快捷键为Shift+Ctrl+I），可以反选选区，也就是选择图像中没有被选择的部分。"
		],
		isFAQ: true
	},
	{
		question: "简述使用【矩形】工具绘制矩形的操作方法，按下什么快捷键可以绘制正方形？",
		answers: [
			"①选择【工具】面板中的【矩形】工具，在画板上按住鼠标左键拖动，即可开始绘制矩形。 ②Shift键"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中反相的作用。",
		answers: [
			"使用“反相”命令可以将图像中的某种颜色转换为它的补色，即将原来的黑色变成白色，或将原来的白色变成黑色，从而创建出负片效果。"
		],
		isFAQ: true
	},
	{
		question: "如何使用【任意变形】工具移动对象？",
		answers: [
			"使用【任意变形】工具选中对象，在对象的四周会显示8个控制点，将光标移至对象上，按住鼠标左键进行拖动，可对对象进行移动。"
		],
		isFAQ: true
	},
	{
		question: "简述调整图层的优点。",
		answers: [
			"①编辑不会破坏图像。可以随时修改调整图层的相关参数值，并且可以修改其混合 模式与不透明度。 ②编辑具有选择性。在调整图层的蒙版上绘画，可以将调整应用于图像的一部分。 ③能够将调整应用于多个图层。调整图层不仅可以只对一个图层产生作用（创建剪贴蒙版），还可以对下面的所有图层产生作用。"
		],
		isFAQ: true
	},
	{
		question: "矢量图形和位图图像的区别是什么？",
		answers: [
			"①矢量图是在数学定义上为一系列由直线或者曲线连接的点，而计算机是根据矢量数据计算生成矢量图的。矢量图任意放大或缩小，缩放后图形的清晰度不会受到影响。矢量图由图形构成，很难表现细腻得过渡及更加丰富的色彩。 ②位图图像是由称做像素(图片元素)的单个点组成的。位图放大后会锯齿化，模糊。"
		],
		isFAQ: true
	},
	{
		question: "简述Illustrator【矩形】工具的常用属性及作用。",
		answers: [
			"①【描边颜色】:设置矩形的描边颜色，也就是矩形的边框颜色。 ②【填充颜色】:设置矩形的内部填充颜色。 ③【描边粗细】:设置矩形的描边大小。 ④【样式】:设置矩形的描边样式。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中选择多个连续的图层或选择多个非连续的图层的操作方法。",
		answers: [
			"①选择多个连续的图层，可以先选择位于顶端的图层，然后按住Shift键，单击位于底端的图层，即可选择这两个图层及其之间的连续的图层。 ②选择多个非连续的图层，可以先选择其中一个图层，然后按住Ctrl键单击其他图层的名称。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中“渐变映射”命令的概念与原理。",
		answers: [
			"“渐变映射”就是将渐变色映射到图像上。在映射过程中，先将图像转换为灰度图像，然后将相等的图像灰度范围映射到指定的渐变填充色。"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator中，用于绘制五角星的工具有哪些？",
		answers: [
			"①【星形工具】"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中使选区边缘更为柔和要执行什么操作？",
		answers: [
			"①执行选择-修改-羽化命令； ②按下 Shift+F6 快捷键。"
		],
		isFAQ: true
	},
	{
		question: "如何使用【任意变形】工具旋转对象？",
		answers: [
			"①使用【任意变形】工具选中对象，在对象的四周会显示8个控制点，将光标移至4个角上控制点的外侧，②当鼠标指针变为圆弧状时，按住鼠标左键进行拖动，可对对象进行旋转。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中色阶命令的作用。",
		answers: [
			"“色阶”命令是一个非常强大的颜色与色调调整命令，它可以对图像的阴影、中间调和高光强度级别进行调整，从而校正图像的色调范围和色彩平衡。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何以任意角度旋转画布。",
		answers: [
			"执行“图像 > 图像旋转 > 任意角度”菜单命令，可以设置以任意角度旋转画布。"
		],
		isFAQ: true
	},
	{
		question: "使用【选择】工具选择对象时，有哪几种方法？",
		answers: [
			"①单击要选中的对象即可选中。 ②按住鼠标拖动选取，可以选中区域中的所有对象。 ③按住 Shift键，单击所需选中的对象，可以选中多个对象。"
		],
		isFAQ: true
	},
	{
		question: "使用【椭圆】工具绘制正圆形的快捷键是什么？由中心向四周绘制椭圆的快捷键是什么？由中心向四周绘制正圆的快捷键是什么？",
		answers: [
			"①Shift键 ②Alt键 ③Alt+Shift键"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何为背景图层、图层组应用图层样式。",
		answers: [
			"①如果要对“背景”图层应用图层样式，可以按住 Alt 键双击图层缩览图，将其转换为普通图层以后再进行添加； ②如果要为图层组添加图层样式，需要先将图层组合并为一个图层。"
		],
		isFAQ: true
	},
	{
		question: "简述直线段工具选项”对话框中可设置的属性。",
		answers: [
			"①直线段的长度 ②角度"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中自然饱和度的作用。",
		answers: [
			"使用“自然饱和度”命令可以快速调整图像的饱和度，并且可以在提高图像饱和度的同时防止出现溢色现象。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中如何打开曲线对话框。",
		answers: [
			"①执行“图像>调整>曲线”菜单命令 ②快捷键Ctrl+M打开"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop打开文件的3种方法。",
		answers: [
			"①执行“文件>打开”菜单命令（快捷键为Ctrl+O），在弹出的“打开”对话框中选择需要的文件，单击“打开”按钮 或双击文件即可。 ②选择一个需要的文件，将其拖曳到Photoshop的快捷图标上。 ③如果已经运行了Photoshop，可以直接将需要的文件拖曳到图像窗口中"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop复制图层的四种操作方法。",
		answers: [
			"①选择一个图层，然后执行“图层>复制图层”菜单命令，单击“确定”按钮 即可复制选中的图层。 ②选择要复制的图层，然后在其名称上单击鼠标右键，接着在弹出的菜单中选择“复制图层”命令，单击“确定”按钮 ，即可复制选中的图层。 ③直接将图层拖曳到“创建新图层”按钮 上，即可复制选中的图层。 ④选择需要复制的图层，然后按快捷键Ctrl+J。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中使用“色调分离”的作用。",
		answers: [
			"使用“色调分离”命令可以指定图像中每个通道的色调级数目或亮度值，并将像素映射到最接近的匹配级别。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中取消选择图层的两种操作方法。",
		answers: [
			"①在“图层”面板中最下面的空白处单击 ②执行“选择>取消选择图层”菜单命令"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中打开“图层样式”对话框的3种方法。",
		answers: [
			"①执行“图层>图层样式”菜单中的命令； ②在“图层”面板中单击“添加图层样式”按钮 ，在弹出的菜单中选择一种样式，即可打开“图层样式”对话框； ③在“图层”面板中双击需要添加样式的图层缩览图，也可打开“图层样式”对话框。"
		],
		isFAQ: true
	},
	{
		question: "简述还原对象的方法。",
		answers: [
			"①执行【编辑】|【撤销】命令，可以撤销整个文档最近一次所做的操作，要撤销多步操作就必须多次执行该命令； ②执行【窗口】|【其他面板】|【历史记录】命令，打开【历史记录】面板。该面板中的滑块默认指向当前文档最后一次执行的步骤，拖动该滑块，即可对文档中己进行的操作进行撤销。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中复制和粘贴对象的两种方法。",
		answers: [
			"①选中要复制的对象，执行【编辑】|【拷贝】命令，然后执行【编辑】|【粘贴】命令，可以粘贴对象执行【编辑】|【粘贴到当前位置】命令，可以在保证对象的坐标没有变化的情况下，粘贴对象； ②复制快捷键： Ctrl+C，粘贴快捷键：Ctrl+V"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop删除图层的三种操作方法。",
		answers: [
			"①先选中待删除图层，然后执行“图层>删除>图层”菜单命令。 ②将待删除图层拖曳到“删除图层”按钮上 ③选中待删除图层后，按 Delete 键"
		],
		isFAQ: true
	},
	{
		question: "Illustrator的【工具】面板中提供了一些基本图形绘制工具，根据功能的不同，可以分为哪几类工具？",
		answers: [
			"①线型绘图工具 ②形状绘图工具 ③网格绘图工具"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中色相/饱和度的作用。",
		answers: [
			"使用“色相/饱和度”命令可以调整整个图像或选区内图像的色相、饱和度和明度，同时也可以对单个通道进行调整。"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator中，如何绘制五角星？",
		answers: [
			"①单击【形状绘图工具】组，在弹出的下拉菜单中选择【星形】工具； ②在画板中单击，在弹出的【星形工具选项】对话框中，然后在【边数】文本框内输入“5”，单击【确定】按钮。"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator中，【钢笔】工具组有哪些工具？",
		answers: [
			"①【钢笔】工具 ②【添加锚点】工具 ③【删除锚点】工具 ④【转换锚点】工具"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中色彩平衡的作用。",
		answers: [
			"“色彩平衡”命令通过调整阴影、中间调和高光中各个单色的比例来平衡图像的色彩，可以更改图像总体颜色的混合程度。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中垂直翻转和水平翻转对象的方法。",
		answers: [
			"①垂直翻转对象方法：选中对象，执行【编辑】|【变换】命令，在子菜单中可以选中【垂直翻转】命令，可使所选定的对象进行垂直翻转； ②水平翻转对象方法：选中对象，执行【编辑】|【变换】命令命令，在子菜单中可以选中【水平翻转】命令，可使所选定的对象进行水平翻转。"
		],
		isFAQ: true
	},
	{
		question: "【对齐】面板可以设置对象不同方向的对齐方式，包括【对齐】、【分布】、【匹配大小】、【间隔】选项区域，其中【对齐】选项区域有6个按钮，分别是什么？",
		answers: [
			"①【左对齐】 ②【水平居中】 ③【右对齐】 ④【底对齐】 ⑤【垂直居中】 ⑥【底对齐】"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中使用“阈值”命令的作用。",
		answers: [
			"使用“阈值”命令可以将彩色图像或者灰度图像转换为高对比度的黑白图像。当指定某个色阶作为阈值时，所有比阈值暗的像素都将转换为黑色，而所有比阈值亮的像素都将转换为白色。"
		],
		isFAQ: true
	},
	{
		question: "排列对象有几种命令？",
		answers: [
			"①移至顶层 ②上移一层 ③下移一层 ④移至底层"
		],
		isFAQ: true
	},
	{
		question: "使用【钢笔】工具如何绘制直线和曲线？",
		answers: [
			"①绘制直线：选择工具箱中的【钢笔】工具，当光标变为钢笔尖形状时，在舞台上单击确定起始锚点，再选择合适的位置单击确定第2个锚点，这时系统会在起点和第2个锚点之间自动连接一条直线。重复上述步骤，即可创建带有多个锚点的连续直线。 ②绘制曲线：选择工具箱中的【钢笔】工具，当光标变为钢笔尖形状时，在舞台上单击确定起始锚点，如果在创建第2个锚点时按下鼠标左键并拖动，会改变连接两锚点直线的曲率，使直线变为曲线。重复上述步骤，即可创建带有多个锚点的连续曲线。"
		],
		isFAQ: true
	},
	{
		question: "简述移动对象的两种方法。",
		answers: [
			"①使用【选择】工具:选中要移动的对象，按住鼠标拖动到目标位置即可。 ②使用键盘上的方向键:在选中对象后，按下键盘上的↑、↓、←、→方向键即可移动对象。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中合并图层包括哪些方法。",
		answers: [
			"①向下合并 ②合并可见图层 ③拼合图像"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中的套索工具组包括哪三种工具。",
		answers: [
			"①套索工具 ； ②多边形套索工具； ③磁性套索工具。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何调整画布大小。",
		answers: [
			"执行“图像>画布大小”菜单命令（快捷键为Alt+Ctrl+C），打开“画布大小”对话框。在该对话框中可以对画布的宽度、高度、定位和扩展背景颜色进行调整。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何取消选区。",
		answers: [
			"创建选区以后，执行“选择 > 取消选择”菜单命令（快捷键为Ctrl+D），可以取消选区。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中删除对象的方法。",
		answers: [
			"①使用【选择】工具选中对象按 Delete 键或 Backspace键将其删除。 ②选中要删除的对象，执行【编辑】|【清除】命令。 ③选中要删除的对象，执行【编辑】|【剪切】命令。 ④右击要删除的对象，在弹出的快捷菜单中选择【剪切】命令。"
		],
		isFAQ: true
	},
	{
		question: "简述图层常见的五种属性。",
		answers: [
			"①名称 ②显示 ③锁定 ④类型 ⑤轮廓颜色"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop关闭文件的4种方法。",
		answers: [
			"①关闭： 执行该命令（快捷键为Ctrl+W），可以关闭当前处于激活状态的文件。使用这种方法关闭文件时，其他文件将不受任何影响。 ②关闭全部：执行该命令（快捷键为Alt+Ctrl+W），可以关闭所有的文件。 ③关闭并转到Bridge：执行该命令（快捷键为Shift+Ctrl+W），可关闭当前文件，并将该文件在Bridge软件中打开。 ④退出：执行该命令或者单击Photoshop界面右上角的“关闭”按钮 ，可以关闭所有的文件并退出Photoshop。"
		],
		isFAQ: true
	},
	{
		question: "简述使用【直线段】工具绘制直线的操作方法。",
		answers: [
			"选择工具箱中的“直线段工具” ，在画板中单击以确定路径起点，按住鼠标左键并拖动鼠标指针到需要结束路径的位置，然后释放鼠标即可完成线条的绘制。"
		],
		isFAQ: true
	},
	{
		question: "使用【任意变形】工具，如何改变对象中心点的位置？",
		answers: [
			"使用【任意变形】工具选中对象，在对象的中心位置会显示1个中心点（变形点），将光标移至中心点的旁边，按住鼠标左键进行拖动，可改变中心点的位置。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何选择当前文档边界内的所有图像。",
		answers: [
			"执行“选择>全部”菜单命令（快捷键为Ctrl+A），可以选择当前文档边界内的所有图像。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何图层样式的作用。",
		answers: [
			"“图层样式”也称“图层效果”，它是制作纹理、质感和特效的灵魂，可以为图层中的图像添加投影、发光、浮雕、光泽和描边等效果，以创建出诸如金属、玻璃、水晶等特效及具有立体感的特效。"
		],
		isFAQ: true
	},
	{
		question: "如何PhotoShop的使用【任意变形】工具调整对象的宽度或高度？如何同时调整对象的宽度和高度?使用什么快捷键可以实现等比例缩放？",
		answers: [
			"①使用【任意变形】工具选中对象，在对象的四周会显示8个控制点，将光标移至4个边上的控制点处，按住鼠标左键进行拖动，可改变对象的宽度或高度。 ②使用【任意变形】工具选中对象，在对象的四周会显示8个控制点，将光标移至4个角上的控制点处，按住鼠标左键进行拖动，可同时改变对象的宽度和高度。 ③Shift键"
		],
		isFAQ: true
	},
	{
		question: "使用PhotoShop的【任意变形】工具对对象操作，主要有哪四个作用？",
		answers: [
			"①旋转与倾斜对象 ②缩放对象 ③扭曲对象 ④封套对象"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中两种基本的调整图像色彩的方法。",
		answers: [
			"在Photoshop中，有两种基本的调整图像色彩的方法。第1种：直接执行“图像>调整”菜单中的调色命令进行调整。第2种：执行“图层>新建调整图层>色相/饱和度”菜单命令。"
		],
		isFAQ: true
	},
	{
		question: "在利用Illustrator进行矢量图设计时，重做可以执行什么命令？",
		answers: [
			"①【编辑】/【重做】 ②按【Shift+Ctrl+Z】组合键撤销错误的操作"
		],
		isFAQ: true
	},
	{
		question: "PhotoShop中如何选择链接的图层？",
		answers: [
			"①先选择一个链接图层 ②然后执行“图层>选择链接图层”菜单命令即可。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何使用标尺拖出竖直参考线。",
		answers: [
			"执行“视图>标尺”菜单命令（快捷键为Ctrl+R），即可在画布中显示出标尺，将鼠标指针放置在左侧的竖直标尺上，然后按住鼠标左键向右拖曳即可拖出竖直参考线。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中合并图层的概念。",
		answers: [
			"合并图层就是将两个或两个以上的图层合并为一个图层"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中的6组图层“混合模式”。",
		answers: [
			"①组合模式组； ②加深模式组； ③减淡模式组； ④对比模式组； ⑤比较模式组； ⑥色彩模式组。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop中如何水平翻转/垂直翻转画布。",
		answers: [
			"执行“图像 > 图像旋转 >水平翻转/垂直翻转画布”。"
		],
		isFAQ: true
	},
	{
		question: "使用Illustrator的【钢笔】工具组中的【转换锚点】工具，如何进行直线和曲线互相转化？",
		answers: [
			"①在工具箱中选择【转换锚点】工具后，如果是将曲线转换为直线，将光标移动至曲线上需操作的锚点位置单击。 ②如果是将直线转换为曲线，将光标移动至直线上需操作的锚点位置按住鼠标左键拖动。"
		],
		isFAQ: true
	},
	{
		question: "简述Photoshop关闭与关闭全部文件的区别。",
		answers: [
			"①关闭： 执行该命令（快捷键为Ctrl+W），可以关闭当前处于激活状态的文件。使用这种方法关闭文件时，其他文件将不受任何影响。 ②关闭全部：执行该命令（快捷键为Alt+Ctrl+W），可以关闭所有的文件。"
		],
		isFAQ: true
	},
	{
		question: "简述PhotoShop中调整图层与调色命令的区别。",
		answers: [
			"调色命令：直接执行“图像>调整”菜单中的调色命令进行调整。这种方式属于不可修改方式，也就是说一旦调整了图像的色调，就不可以再重新修改调色命令的参数。 调整图层：执行“图层>新建调整图层>色相/饱和度”菜单命令。执行该命令后，会在“背景”图层的上方创建一个“色相/饱和度”图层，此时可以在“属性”面板中调整颜色。与调色命令不同的是调整图层将保留下来，如果对调整效果不满意，还可以重新设置其参数，并且还可以编辑“色相/饱和度”调整图层的蒙版，使调色只针对背景中的某一区域。"
		],
		isFAQ: true
	},
	{
		question: "Illustrator的形状绘图工具组包含哪些工具？",
		answers: [
			"①“矩形工具” ②“圆角矩形工具” ③“椭圆工具” ④“多边形工具” ⑤“星形工具” ⑥“光晕工具”"
		],
		isFAQ: true
	},
	{
		question: "对于已经删除的对象，选择什么命令，或按下什么键可以恢复删除对象操作？",
		answers: [
			"①执行【编辑】|【撤销】命令 ②Ctrl+Z\n填空题"
		],
		isFAQ: true
	},
	{
		question: "Photoshop创建选区后，如果要向内收缩选区，可以执行（   ）菜单命令，然后在弹出的“收缩选区”对话框中设置相应的“收缩量”数值。",
		answers: [
			"选择>修改>收缩"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制圆角矩形的是（  ）工具。",
		answers: [
			"圆角矩形"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选中多个锚点后，单击（   ）按钮被选中的多个锚点的手柄将处于显示状态。",
		answers: [
			"显示多个选定锚点的手柄"
		],
		isFAQ: true
	},
	{
		question: "（   ）也称“图层效果”，它是制作纹理、质感和特效的灵魂，可以为图层中的图像添加投影、发光、浮雕、光泽和描边等效果，以创建出诸如金属、玻璃、水晶等特效及具有立体感的特效。",
		answers: [
			"图层样式"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制六角星的是（  ）工具。",
		answers: [
			"星形"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制矩形的是（  ）工具。",
		answers: [
			"矩形"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator的（  ）工具单击锚点可以选中锚点，选中的锚点是（  ）状，未选中的锚点呈（  ）状。",
		answers: [
			"直接选择实心空心"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator在绘制直线段的过程中不释放鼠标，按住（  ）键，可绘制出水平、垂直、45°、90°和135°的直线段。",
		answers: [
			"Shift"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，选择工具箱中的“钢笔工具”，在画板中（   ）以确定起点，将鼠标指针移动到相应的位置，再次（   ）以确定直线的终点，在两个锚点之间即可显示一段直线路径。",
		answers: [
			"单击单击"
		],
		isFAQ: true
	},
	{
		question: "Photoshop创建选区以后，执行（   ）菜单命令（快捷键为Shift+Ctrl+I），可以反选选区，也就是选择图像中没有被选择的部分。",
		answers: [
			"选择>反选"
		],
		isFAQ: true
	},
	{
		question: "在绘制开放路径时，按（   ）键可结束绘制。",
		answers: [
			"Enter"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选中尖角锚点后，单击（   ）按钮可将其转换为平滑锚点。",
		answers: [
			"将所选锚点转换为平滑"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator的椭圆工具时，按住（  ）键可以绘制正圆形时。",
		answers: [
			"Shift"
		],
		isFAQ: true
	},
	{
		question: "Illustrator默认将绘制的图形边框为（  ）色。",
		answers: [
			"黑"
		],
		isFAQ: true
	},
	{
		question: "（  ）路径的起点与终点重合在一起，如矩形、圆形、多边形或星形等。",
		answers: [
			"闭合"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator的椭圆工具时，按住（  ）组合键，则以单击点为中心向外绘制圆形。",
		answers: [
			"Shift+Alt"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制星形时，选择“星形工具”，在画板中按住鼠标左键并拖动鼠标指针到需要的位置后释放鼠标，即可绘制星形。按（  ）键可减少星形的边数。",
		answers: [
			"↓"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制多边形时，选择“多边形工具”，在画板中按住鼠标左键并拖动鼠标指针到需要的位置后释放鼠标，即可绘制多边形。按（  ）键可增加多边形的边数。",
		answers: [
			"↑"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制六边形的是（  ）工具。",
		answers: [
			"多边形"
		],
		isFAQ: true
	},
	{
		question: "路径有3种类型，分别是（  ）、（  ）和（  ）。",
		answers: [
			"开放路径闭合路径复合路径"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator的椭圆工具时，按住（  ）键，可以单击点为中心向外绘制椭圆。",
		answers: [
			"Alt"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制矩形时，按住（  ）键可以绘制正方形。",
		answers: [
			"Shift"
		],
		isFAQ: true
	},
	{
		question: "Illustrator默认将绘制的图形填充为（  ）色。",
		answers: [
			"白"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，使用（   ）工具拖动手柄的端点，可以调整路径的形态，改变图形的形状。",
		answers: [
			"直接选择"
		],
		isFAQ: true
	},
	{
		question: "（   ）图层和图层组不能应用图层样式",
		answers: [
			"背景"
		],
		isFAQ: true
	},
	{
		question: "锚点两侧有两个趋于平衡的手柄，拖动任意一侧的手柄的端点，可改变路径的走向和弧度，该锚点属于（   ）锚点。",
		answers: [
			"平滑"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator利用钢笔工具绘图时，确定路径起点后进行绘图，结束时将鼠标指针放在（   ）上，单击可完成封闭路径的绘制。",
		answers: [
			"起点"
		],
		isFAQ: true
	},
	{
		question: "（   ）锚点两侧没有手柄和方向点。",
		answers: [
			"尖角"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选中平滑锚点后，单击（   ）按钮可将其转换为尖角锚点。",
		answers: [
			"将所选锚点转换为尖角"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制多边形时，选择“多边形工具”，在画板中按住鼠标左键并拖动鼠标指针到需要的位置后释放鼠标，即可绘制多边形。按（  ）键可减少多边形的边数。",
		answers: [
			"↓"
		],
		isFAQ: true
	},
	{
		question: "（   ）选区是通过建立选区和选区周围像素之间的转换边界来模糊边缘，这种模糊方式将丢失选区边缘的一些细节。",
		answers: [
			"羽化"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制星形时，选择“星形工具”，在画板中按住鼠标左键并拖动鼠标指针到需要的位置后释放鼠标，即可绘制星形。按（  ）键可增加星形的边数。",
		answers: [
			"↑"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，既可以绘制曲线又可以绘制直线的是（  ）工具。",
		answers: [
			"钢笔"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制正方形的是（  ）工具。",
		answers: [
			"矩形"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator中，选择工具箱中的“钢笔工具”，在画板中单击以确定起点，将鼠标指针移动到线段的终点位置，单击并按住鼠标左键进行（   ）可调整绘制的线段的弧度，从而完成各种曲线的绘制。",
		answers: [
			"拖动"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选择（  ）工具，按住【Shift】键在开放路径中依次选中不相连的两个端点锚点后，再单击连接所选终点按钮，将在两个端点锚点之间创建路径。",
		answers: [
			"直接选择"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制矩形时，按住（  ）键可以绘制正方形；按住（  ）键，可以以单击点为中心向外绘制矩形；按住（  ）组合键，则可以以单击点为中心向外绘制正方形。",
		answers: [
			"ShiftAltShift+Alt"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制五角星的是（  ）工具。",
		answers: [
			"星形"
		],
		isFAQ: true
	},
	{
		question: "（  ）路径的起点与终点没有重合，如直线段、弧线和螺旋线等。",
		answers: [
			"开放"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选择“直接选择工具”，按住（  ）键在开放路径中依次选中不相连的两个端点锚点后，再单击连接所选终点按钮，将在两个端点锚点之间创建路径。",
		answers: [
			"Shift"
		],
		isFAQ: true
	},
	{
		question: "Photoshop创建选区后，执行（   ）菜单命令，可以在弹出的“平滑选区”对话框中进行设置，对选区进行平滑化处理。",
		answers: [
			"选择>修改>平滑"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选择“直接选择工具”，按住Shift键在开放路径中依次选中不相连的两个端点锚点后，再单击（  ）按钮，将在两个端点锚点之间创建路径。",
		answers: [
			"连接所选终点"
		],
		isFAQ: true
	},
	{
		question: "在Illustrator 中，用来绘制圆形的是（  ）工具。",
		answers: [
			"椭圆"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator的多边形工具时，按住（  ）键可以绘制正六边形时。",
		answers: [
			"Shift"
		],
		isFAQ: true
	},
	{
		question: "两个或多个开放路径和闭合路径组合形成的路径是（   ）路径。",
		answers: [
			"复合"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator绘制路径时，选中多个锚点后，单击（   ）按钮被选中的多个锚点的手柄将处于隐藏状态。",
		answers: [
			"隐藏多个选定锚点的手柄"
		],
		isFAQ: true
	},
	{
		question: "Photoshop创建选区，然后执行（   ）菜单命令，可以在弹出的“扩展选区”对话框中进行设置，将选区向外扩展。",
		answers: [
			"选择>修改>扩展"
		],
		isFAQ: true
	},
	{
		question: "利用Illustrator的基本绘图工具绘制大量的按一定规律重复的图形时，在绘制图形的过程中按住（  ）键，拖动鼠标到合适的位置后释放鼠标即可完成绘制。",
		answers: [
			"~"
		],
		isFAQ: true
	},
	{
		question: "Photoshop创建选区以后，执行“选择 > 取消选择”菜单命令，快捷键为（  ），可以取消选区。",
		answers: [
			"Ctrl+D"
		],
		isFAQ: true
	},
	{
		question: "（   ）锚点常被用于表现线段的直角。",
		answers: [
			"尖角"
		],
		isFAQ: true
	},
	{
		question: "下列Python语句正确的是",
		answers: [
			"while True : pass"
		],
		isFAQ: false
	},
	{
		question: "下面哪个变量命名在Python中是合理的？ （ ）",
		answers: [
			"_my_vol"
		],
		isFAQ: false
	},
	{
		question: "在计算机中，信息处理和数据存储通常用（ ）来完成。",
		answers: [
			"二进制数"
		],
		isFAQ: false
	},
	{
		question: "以下关于turtle库的描述，错误的是：",
		answers: [
			"用circle()函数只能画圆，不能画一个圆弧"
		],
		isFAQ: false
	},
	{
		question: "调用以下函数返回的值（  ）。  def myfun():  pass",
		answers: [
			"None"
		],
		isFAQ: false
	},
	{
		question: "下面对count()、index()、find()方法描述错误的是",
		answers: [
			"find()方法检测字符串中是否包含子字符串str，如果包含子字符串返回开始的索引值，否则会报一个异常"
		],
		isFAQ: false
	},
	{
		question: '"ab"+"c"*2 结果是',
		answers: [
			"abcc"
		],
		isFAQ: false
	},
	{
		question: "有关异常说法正确的是",
		answers: [
			"程序中抛出异常不一定终止程序"
		],
		isFAQ: false
	},
	{
		question: "以下是正确的字符串",
		answers: [
			'"abc\\"ab"'
		],
		isFAQ: false
	},
	{
		question: "下列选项中，哪个是Python语言不能做的？",
		answers: [
			"UI设计"
		],
		isFAQ: false
	},
	{
		question: "Python语言除了能做网络爬虫开发，就不能做别的开发了。 （ ）",
		answers: [
			"x = (y = z + 1)"
		],
		isFAQ: false
	},
	{
		question: "Python语言语句块的标记是",
		answers: [
			"缩进"
		],
		isFAQ: false
	},
	{
		question: "以下属于Python标准时间库的选项是：",
		answers: [
			"time"
		],
		isFAQ: false
	},
	{
		question: "Python不支持的数据类型有",
		answers: [
			"char"
		],
		isFAQ: false
	},
	{
		question: '如下代码，打印的结果是（ ）。  str1 = "Runoob example....wow!!!" str2 = "exam"; print(str1.find(str2, 5))',
		answers: [
			"7"
		],
		isFAQ: false
	},
	{
		question: "关于Python中的复数，下列说法错误的是",
		answers: [
			"虚部必须后缀j，且必须是小写"
		],
		isFAQ: false
	},
	{
		question: "下面哪个不是Python合法的标识符",
		answers: [
			"40XL"
		],
		isFAQ: false
	},
	{
		question: "定义类如下：  class Hello():  def showInfo(self):   print(self.x) 下面描述正确的是",
		answers: [
			"在pycharm工具中会出现语法错误，说self没有定义"
		],
		isFAQ: false
	},
	{
		question: "以下程序中，会出现错误的是（ ）。",
		answers: [
			'"深圳".decode("utf-8")'
		],
		isFAQ: false
	},
	{
		question: "关于Python类说法错误的是",
		answers: [
			"类的实例方法必须创建对象前才可以调用"
		],
		isFAQ: false
	},
	{
		question: "下述_______不属于数据库设计的内容。‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬",
		answers: [
			"数据库管理系统"
		],
		isFAQ: false
	},
	{
		question: "计算机中信息处理和信息储存用",
		answers: [
			"二进制代码"
		],
		isFAQ: false
	},
	{
		question: "我们知道Python既是面向过程语言，又是面向对象语言，那么，面向对象的三大特征不包括（ ）。",
		answers: [
			"重写"
		],
		isFAQ: false
	},
	{
		question: '执行下列语句后，最终的显示结果是（ ） >>> value = "Python" >>> print("Hello"+value)',
		answers: [
			"HelloPython"
		],
		isFAQ: false
	},
	{
		question: "函数如下：  def showNnumber(numbers):  for n in numbers:   print(n) 下面那些在调用函数时会报错",
		answers: [
			"showNnumber(3.4)"
		],
		isFAQ: false
	},
	{
		question: '函数如下：  def chanageInt(number2):  number2 = number2+1  print("changeInt: number2= ",number2)  # 调用 number1 = 2 chanageInt(number1) print("number:",number1) 打印结果哪项是正确的',
		answers: [
			"changeInt: number2= 3 number: 2"
		],
		isFAQ: false
	},
	{
		question: "如果一个Python函数中，没有return语句或return语句不带任何返回值，那么该函数的返回为（ ）。",
		answers: [
			"None"
		],
		isFAQ: false
	},
	{
		question: "可用来获取网页内容的Python第三方库是：",
		answers: [
			"requests"
		],
		isFAQ: false
	},
	{
		question: "执行下述程序的输出结果是：‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬  ds = {'eng':2,'math':6,'comp':9,'PE':4} print(ds.pop(max(ds.keys()), 0))",
		answers: [
			"6"
		],
		isFAQ: false
	},
	{
		question: "以下程序的输出结果，可能的选项是：‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬  ds = {'av':2,'vr':4,'ls':9,'path':6} print(ds.popitem(), len(ds))",
		answers: [
			"('path', 6) 3"
		],
		isFAQ: false
	},
	{
		question: "设数据元素集合为{A，B，C，D，E，F}，下列关系为线性结构的是",
		answers: [
			"R={ (D,E),(E,A),(B,C),(A,B),(C,F) }"
		],
		isFAQ: false
	},
	{
		question: "导入模块的方式错误的是",
		answers: [
			"import m from mo"
		],
		isFAQ: false
	},
	{
		question: "以下程序可能的输出结果是：‬‬‬  l = [1,2,3,4,5,6,7] print(l[3:2]) print(l[-5:-3])",
		answers: [
			"[] [3, 4]"
		],
		isFAQ: false
	},
	{
		question: "",
		answers: [
			"3,4,5"
		],
		isFAQ: false
	},
	{
		question: "函数内容如下所示，若调用以下选项，则调用哪个选项时会报错？（ ）  def show_text(text): for temp in text: print(temp)",
		answers: [
			"show_text(3.14)"
		],
		isFAQ: false
	},
	{
		question: '函数如下：  def chanageList(list):  list.append("end")  print("list",list) # 调用 strs =["1","2"] chanageList(strs) print("strs",strs) 下面对 strs 和 list 的值输出正确的是',
		answers: [
			'list ["1","2","end"]'
		],
		isFAQ: false
	},
	{
		question: "以下会出现错误的是",
		answers: [
			'"北京".decode()'
		],
		isFAQ: false
	},
	{
		question: "在程序之间交换数据，常使用的第三方库是：",
		answers: [
			"json"
		],
		isFAQ: false
	},
	{
		question: "关于Python内存管理，下列说法错误的是",
		answers: [
			"变量无须先创建和赋值而直接使用"
		],
		isFAQ: false
	},
	{
		question: "以下不是Python中的关键字",
		answers: [
			"final"
		],
		isFAQ: false
	},
	{
		question: '定义类如下：  class A():  def a():   print("a") class B ():  def b():   print("b") class C():  def c():   print(c) class D(A,C):  def d():   print("d")  d = D() d.a() d.b() d.d() 以下程序能执行的结果是',
		answers: [
			"执行会报错"
		],
		isFAQ: false
	},
	{
		question: "关于组合数据类型的描述，正确的选项是",
		answers: [
			"Python中最常用的映射类型的典型代表是字典类型"
		],
		isFAQ: false
	},
	{
		question: "对以下程序描述错误的是（ ）。  try:  # 语句块1 except IndexError as i:  # 语句块2",
		answers: [
			"该程序对异常处理了，因此一定不会终止程序"
		],
		isFAQ: false
	},
	{
		question: "以下程序的输出结果是：‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬def add_Run(L=None): if L is None: L = [] L.append('Run') return L add_Run() add_Run() print(add_Run(['Lying']))",
		answers: [
			"['Lying', 'Run']"
		],
		isFAQ: false
	},
	{
		question: "定义类如下：  class Hello(object):  def __init__(self,name)   self.name=name  def showInfo(self)   print(self.name) 下面代码能正常执行的",
		answers: [
			'h = Hello("张三")  h.showInfo()'
		],
		isFAQ: false
	},
	{
		question: "下列对于读写文件操作中，不正确的是（ ）。",
		answers: [
			'file = open("D:\\src\\text.txt","r")'
		],
		isFAQ: false
	},
	{
		question: '程序如下：  try:  number = int(input("请输入数字："))  print("number:",number)  print("=======hello======") except Exception as e:  #  报错错误日志  print("打印异常详情信息： ",e) else:  print("没有异常") finally:  # 关闭资源  print("finally") print("end") 输入的是 1a 结果是：',
		answers: [
			"打印异常详情信息： invalid literal for int() with base 10: finally end"
		],
		isFAQ: false
	},
	{
		question: "解析 xml 的方式有",
		answers: [
			"方法一"
		],
		isFAQ: false
	},
	{
		question: "执行以下代码，output.txt文件中的内容是： ‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬  aaa =[8, 5, 2, 2] with open('output.txt', 'w') as f: for aa in aaa: f.write(';'.join(str(aa)))",
		answers: [
			"8522"
		],
		isFAQ: false
	},
	{
		question: "Python源程序执行的方式",
		answers: [
			"解析执行"
		],
		isFAQ: false
	},
	{
		question: "下面和队列结构有关联的是_",
		answers: [
			"先到先服务的作业调度"
		],
		isFAQ: false
	},
	{
		question: "以下关于函数参数的描述，正确的是：",
		answers: [
			"在一个函数内部定义的变量，到另一个函数中不能引用"
		],
		isFAQ: false
	},
	{
		question: "下列Python语句中，写法正确的是（ ）。",
		answers: [
			""
		],
		isFAQ: false
	},
	{
		question: "以下关于Python循环结构的描述中，错误的是（ ）",
		answers: [
			"break用来结束当前当次语句，但不跳出当前的循环体"
		],
		isFAQ: false
	},
	{
		question: "m与n变量定义如下，下列选项中哪个结果是True的？（ ）  >>> m = '125' >>> n = '125'",
		answers: [
			"m is n"
		],
		isFAQ: false
	},
	{
		question: "下列代码执行完毕后，输出结果是什么？（ ）。number = 10 def make(): number += 1 print(number)make()",
		answers: [
			"11"
		],
		isFAQ: false
	},
	{
		question: '下列代码运行结果是（ ）。  >>> a = "Hello" >>> b = 3.14>>> print(a + b)',
		answers: [
			"报错TypeError"
		],
		isFAQ: false
	},
	{
		question: ",)中打开模式的描述，正确的选项是：)中打开模式的描述，正确的选项是：",
		answers: [
			"r'表示只读模式打开文件，如果文件不存在，就会返回异常"
		],
		isFAQ: false
	},
	{
		question: "以下哪项Python能正常启动",
		answers: [
			"手动抛出异常"
		],
		isFAQ: false
	},
	{
		question: "既可以用单引号，也可以用双引号创建字符串",
		answers: [
			'dict3 = {[1,2,3]: "uestc"}'
		],
		isFAQ: false
	},
	{
		question: "以下关于模块说法错误的是",
		answers: [
			"模块文件的扩展名不一定是 .py"
		],
		isFAQ: false
	},
	{
		question: "定义类如下：  class Hello(object):  pass 下面说明错误的是",
		answers: [
			"该类没有定义任何方法，所以该实例中没有包含任何方法"
		],
		isFAQ: false
	},
	{
		question: "文件data.csv里的内容如下：  ‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬1,三轴机,17,5 2,壳体热套,10,2 3,泵体安装,19,3 关于以下程序在屏幕上输出结果的描述，正确的选择是：  ‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬ with open('data.csv', 'r') as f: print(f.readlines())",
		answers: [
			"输出一行列表，里面包括三个字符串元素"
		],
		isFAQ: false
	},
	{
		question: "以下是字符转换成字节的方法是",
		answers: [
			"encode()"
		],
		isFAQ: false
	},
	{
		question: "设a.txt的内容是：‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬ a,b,c,d 以下程序执行结果是： ‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬ with open('a.txt','r') as f: print(f.read().split(','))",
		answers: [
			"['a', 'b', 'c', 'd']"
		],
		isFAQ: false
	},
	{
		question: "将E-R图转换成关系模式时，实体与联系都可以表示成___________.‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬",
		answers: [
			"关系"
		],
		isFAQ: false
	},
	{
		question: "以下程序的输出结果是：‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬‬  L = [] x = 3 def pri_val(x): L.append(x) x = 5 pri_val(x) print('L = {}, x = {}'.format(L, x))",
		answers: [
			"L = [3], x = 3"
		],
		isFAQ: false
	},
	{
		question: "以下选项中不能用于创建一个字典的语句是（ ）。",
		answers: [
			'dictd = {[1, 2, 3]: "python"}'
		],
		isFAQ: false
	},
	{
		question: "关于以下程序输出结果的描述，正确的选项是 l = [1,2,3,4,5,6,7] print(l.pop(0), len(l))",
		answers: [
			"1 6"
		],
		isFAQ: false
	},
	{
		question: "下列哪种说法是错误的",
		answers: [
			"除字典类型外，所有标准对象均可以用于布尔测试"
		],
		isFAQ: false
	},
	{
		question: "解析 xml 的方式有",
		answers: [
			"方法一",
			"方法二",
			"方法三"
		],
		isFAQ: false
	},
	{
		question: "已知x = list(range(20))，那么语句del x[::2]可以正常执行。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python集合不支持使用下标访问其中的元素",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在Python中，变量不直接存储值，而是存储值的引用，也就是值在内存中的地址。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "字典的“键”必须是不可变的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python列表、元组、字符串都属于有序序列。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对于数字n，假如表达式 0 not in [n%d for d in range(2, n)] 的值为True则说明n是素数。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python内置的字典dict中元素是按添加的顺序依次进行存储的。 （ ）",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已知x = (1, 2, 3, 4)，那么执行x[0] = 5之后，x的值为(5, 2, 3, 4)。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "集合可以作为元组的元素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "只能通过切片访问元组中的元素，不能使用切片修改元组中的元素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "集合可以作为列表的元素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "使用列表对象的remove()方法可以删除列表中初次出现的指定元素，假如列中不存在要删除的指定元素则抛出异常。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "列表对象的pop()方法默认删除并返回最后一个元素，假如列表已空则抛出异常。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "假设x为列表对象，那么x.pop()和x.pop(-1)的作用是同样的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "已知x为非空列表，那么执行语句x[0] = 3之后，列表对象x的内存地址不变。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "列表对象的排序方法sort()只能按元素从小到大排列，不支持别的排序方式。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python字典中的“值”不允许重复。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "一个数字5也是合法的Python表达式。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "xml 是一门语言",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在Python中可以使用if作为变量名。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "在Python中元组的值是不可变的，因此，已知x = ([1], [2])，那么语句x[0].append(3)是无法正常执行的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python 2.x有部分内容，没有被Python 3.x完全兼容。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "内置函数len()返回指定序列的元素个数，合用于列表、元组、字符串、字典、集合以及range、zip等迭代对象。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "当以指定“键”为下标给字典对象赋值时，若该“键”存在则表达修改该“键”相应的“值”，若不存在则表达为字典对象添加一个新的“键-值对”。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "集合可以作为字典的键。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python字典中的“键”可以是元组。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "列表可以作为字典的“键”。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "表达式 ‘a’+1的值为’b’。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python语言除了能做网络爬虫开发，就不能做别的开发了。 （ ）",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "无法删除集合中指定位置的元素，只能删除特定值的元素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python列表中所有元素必须为相同类型的数据。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "达式(i**2 for i in range(100))的结果是个元组",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "创建只包含一个元素的元组时，必须在元素后面加一个逗号，例如(3,)。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "已知列表x = [1, 2, 3, 4]，那么表达式x.find(5)的值应为-1。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python使用缩进来体现代码之间的逻辑关系。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "删除列表中反复元素最简朴的方法是将其转换为集合后再重新转换为列表。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "假设x是具有5个元素的列表，那么切片操作x[10:]是无法执行的，会抛出异常。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "B的值一定为True。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已知x是个列表对象，那么执行语句y = x之后，对y所做的任何操作都会同样作用到x上。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "元组可以作为集合的元素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "同一个列表对象中的元素类型可以各不相同。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python变量名区分大小写，所以student和Student不是同一个变量。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "已知x = {1:1, 2:2}，那么语句x[3] =3无法正常执行。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python字典中的“键”不允许重复。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "已知x是个列表对象，那么执行语句y = x[:]之后，对y所做的任何操作都会同样作用到x上。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "表达式 {1, 3, 2} > {1, 2, 3} 的值为True。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python集合中的元素可以是列表。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "元组可以作为字典的“键”。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "表达式 {1, 2} * 2 的值为 {1, 2, 1, 2}。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已知x = list(range(20))，那么语句print(x[100:200])无法正常执行。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "同一个列表对象中所有元素必须为相同类型。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python变量名必须以字母或下划线开头，并且区分字母大小写。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "不可以在同一台计算机上安装多个Python版本。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "使用del命令或者列表对象的remove()方法删除列表中元素时会影响列表中部分元素的索引。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python列表中所有元素必须为相同类型的数据。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "只能通过切片访问列表中的元素，不能使用切片修改列表中的元素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "列表可以作为集合的元素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python集合中的元素可以是元组。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "元组是不可变的，不支持列表对象的inset()、remove()等方法，也不支持del命令删除其中的元素，但可以使用del命令删除整个元组对象。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "字典可以作为集合的元素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已知x = list(range(20))，那么语句x[::2] = []可以正常执行。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python是一种跨平台、开源、免费的高级动态编程语言。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "Python字典和集合属于无序序列。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "可以使用del删除集合中的部分元素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "不同版本的Python不能安装到同一台计算机上。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python代码的注释只有一种方式，那就是使用#符号。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已知列表 x = [1, 2, 3]，那么执行语句 x = 3 之后，变量x的地址不变。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python字典中的“键”可以是列表。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "Python集合可以包含相同的元素。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "表达式 list('[1, 2, 3]') 的值是[1, 2, 3]。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "已知x = 3，那么执行x += 6语句前后x的内存地址是不变的。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "java运行机制",
		answers: [
			"从jave、javac、jvm分析"
		],
		isFAQ: true
	},
	{
		question: "简述 Python 开发环境的建立过程。",
		answers: [
			"（1）到 Python 官网 https://www.python.org/downloads/上下载适合操作系统环境的安装包； （2）运行安装包，根据安装向导进行环境安装； （3）如果需要第三方库，可以在 CMD 环境下运行：pip install 库名，进行第三方库的安装； （4）Python 安装包自带命令行环境和 IDLE 集成开发环境，如果需要其它集成开发环境（如 Pycharm 等），请自行搜索、下载、安装。"
		],
		isFAQ: true
	},
	{
		question: "编写程序, 类 A 继承了类 B, 两个类都实现了 handle 方法, A 中的 handle 方法中调 用 B 的 handle 方法。",
		answers: [
			'class B:  """类 B"""  def __init__(self):  print("B.__init__")  pass  def handle(self):  print("B.handle") class A(B):  """类 A"""  def __init__(self):  super().__init__()  def handle(self):  super().handle() # super 依赖于继承 a = A() a.handle()'
		],
		isFAQ: true
	},
	{
		question: "利用 random 库中提供的函数，编程完成以下要求： （1）在 0~100 间随机产生 10 个奇数； （2）从字符串 “Ilovepython!” 中随机选取 4 个字符并输出； （3）从列表[„red‟, „black‟, „blue‟, „white‟, „pink‟]中随机选取 1 个字符串。",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "简单解释 Python 中以下划线开头的变量名特点。",
		answers: [
			"(1)_xxx: 以一个下划线开头的成员称为保护成员，只有类和子类对象能访问这些成员。 (2)__xxx: 以两个连续下划线开头的成员称为私有成员，只有类对象自己能访问，但在 对象外部可以通过“对象名._类名__xxx”这样的特殊方式来访问。 (3)__xxx__: 用两个连续下划线作为变量前缀和后缀来表示系统定义的特殊成员。"
		],
		isFAQ: true
	},
	{
		question: "输入一个实数，分别输出其整数部分和小数部分。",
		answers: [
			'法一： f = eval(input("请输入一个实数：")) print(f"的整数部分是"int(f)) print(f"的小数部分是"f-int(f)) 法二： import math f = eval(input("请输入一个实数：")) ls=math.modf(f) print(f"的整数部分是"int(ls[1])) print(f"的小数部分是"ls[0])'
		],
		isFAQ: true
	},
	{
		question: "编写程序, 设计一个学生类, 要求有一个计数器的属性, 用于统计实例化了学生人数。",
		answers: [
			'class Student:  """学生类"""  count = 0 # 计数  def __init__(self name age):  self.name = name  self.age = age  Student.count += 1 # 要使得变量全局有效，就定义为类的属性  def learn(self):  print("is learning") stu1 = Student("张三" 20) stu2 = Student("李四" 19) stu3 = Student("王五" 22) stu4 = Student("刘六" 21) print("实例化了%s 个学生" % Student.count)'
		],
		isFAQ: true
	},
	{
		question: "编写程序，用户输入一段英文，然后输出这段英文中所有长度为 3 个字母的单词。",
		answers: [
			"import re x = input('Please input a string:') pattern = re.compile(r'\\b[a-zA-Z]{3}\\b') print(pattern.findall(x))"
		],
		isFAQ: true
	},
	{
		question: `代码如下，若两个输入分别是 5 和 2，输出结果是什么？ try:  x = int(input("\\nFirst number: "))  y = int(input("Second number: "))  print(x/y) except ZeroDivisionError as e1: #①  print("You can't divide by 0!") except ValueError as e2: #②  print(e2) else: print('no error!')`,
		answers: [
			"no error!"
		],
		isFAQ: true
	},
	{
		question: "函数 incr 定义如下 def incr(n=1): return lambda x: x + n 下列各调用输出的结果是什么？ (1) f = incr() g= f(2) print(g) (2) f = incr g= f(2) print(g)",
		answers: [
			"（1）使用默认参数调用 incr 函数，返回一个函数赋给 f，相当于 def f(x): return x+1 故输出 g 的值为 3。 （2）id(incr)等于 id(f) ，变量 f 和 incr 是相同的函数，即 f 定义为 def f(n=1): return lambda x: x + n 而 g 的定义相当于 def g(x): return x+2 故最后输出一个函数对象"
		],
		isFAQ: true
	},
	{
		question: "键盘输入一行字符串，请编程输出每个字符对应的 Unicode 值，一行输出，逗号分隔。",
		answers: [
			's = input("请输入一个字符串：") ls = [] for c in s:  ls.append(str(ord(c))) print("".join(ls))'
		],
		isFAQ: true
	},
	{
		question: "请检索银行当前 1 年定期和 5 年定期存款利率。假定现存入 10000 元钱，存款到期后立即 将利息与本金一起再存入。请编写程序计算按每次存 1 年和按照每次存 5 年，共存 20 年两 种存款方式的得款总额。",
		answers: [
			'profit1 = 0.0195 profit5 = 0.04125 capital = 10000 for i in range(21):  capital += capital*profit1 print("方案 1：20 年后本金、利息总和为：%.2f"%(capital)) capital = 10000 for i in range(4):  capital += capital*profit5*5 print("方案 2：20 年后本金、利息总和为：%.2f"%(capital))'
		],
		isFAQ: true
	},
	{
		question: "",
		answers: [
			"for i in ls: print i"
		],
		isFAQ: true
	},
	{
		question: "若 T = (1, 2, 3)，T[2] = 4 是否能将列表的最后一个元素改为 4？如果不能改怎样实现？",
		answers: [
			"用切片、联接构建一个新的对象，T = T[:2] + (4) # T 变成了 (1 2 4)"
		],
		isFAQ: true
	},
	{
		question: "定义一个 Entry 控件，绑定字符串变量，点击回车键是输出 Entry 中的字符串，如下所示： Contents of entry is: this is a variable。",
		answers: [
			`' self.print_contents) def print_contents(self event): print("Contents of entry is: " self.contents.get()) App().mainloop()`
		],
		isFAQ: true
	},
	{
		question: "利用程序生成一个列表[11，22，…，99]，然后将其写入文件 list.txt，再读出用 print()函数 输出。",
		answers: [
			'fw=open("D:\\\\list.txt""w") ls=[] for i in range(110):  ls.append(i*10+i) print(ls) for i in range(len(ls)):  fw.write(str(ls[i])+" ") fw.close() fr=open("D:\\\\list.txt""r") str=fr.readlines() print(str) fr.close()'
		],
		isFAQ: true
	},
	{
		question: "统计一个指定字符在一个文件中出现的次数。",
		answers: [
			'fr=open("D:\\\\f.txt""r") s=fr.read() count = 0 ch = input("请输入指定字符：") for i in range(len(s)):  if s[i] == ch:  count += 1 print("count="count) fr.close()'
		],
		isFAQ: true
	},
	{
		question: "写出下列代码的输出。 >>>x = 0 >>>def func():  global x  print(x, end=‟ ‟) #1  x = 9  print(x) #2 >>>func()",
		answers: [
			"此时#1 处输出全局变量 x 的值，#2 处赋值语句定义局部变量 x，之后输出 0 9"
		],
		isFAQ: true
	},
	{
		question: '字符串 s 中保存了论语中的一句话，请编程统计 s 中汉字和标点符号的个数。 s="学而时习之,不亦说乎?有朋自远方来,不亦乐乎?人不知而不愠,不亦君子乎?"',
		answers: [
			`s="学而时习之不亦说乎?有朋自远方来不亦乐乎?人不知而不愠不亦君子乎?" m=s.count('')+s.count('?') #标点符号个数 n=len(s)-m #汉字个数 print("汉字个数为{}标点符号个数{}。".format(nm))`
		],
		isFAQ: true
	},
	{
		question: "请总结 Python 第三库的安装方法，并尝试下载并安装第三库 numpy。",
		answers: [
			'（1）在 CMD 环境下，直接用“pip install 库名”安装； （2）在如下链接里找到需要的包，下载 whl 文件，CMD 中切换到该文件目录下，pip install whl 文件； https://www.lfd.uci.edu/~gohlke/pythonlibs/#pymssql （ 3 ） 在 相 关 编 辑 器 执 行 添 加 命 令 ， 如 Pycharm 就 可 以 通 过 环 境 里 的 "file--settings--project interpreter-- +" 进行添加所需的库；'
		],
		isFAQ: true
	},
	{
		question: "求 Python 表达式的值：3.5+(8/2*round(3.5+6.7)/2)%3",
		answers: [
			"5.5"
		],
		isFAQ: true
	},
	{
		question: "假设一元钱买一瓶水，三个空瓶可以换一瓶水。初始 n 元钱最终可以喝几瓶水？请编程计 算。",
		answers: [
			'n = eval(input("请输入 n:")) s = n while n>=3:  s+= n//3  n=n//3+n%3 #空瓶数 print("s="s)'
		],
		isFAQ: true
	},
	{
		question: "编写函数，模拟 Python 内置函数 sorted()，以列表数据进行测试。",
		answers: [
			'def Sorted(v):  t = v[::]  r = []   while t:  tt = min(t)  r.append(tt)  t.remove(tt) return r if __name__ == "__main__":  s=[25314]  print(Sorted(s))'
		],
		isFAQ: true
	},
	{
		question: "已知华氏温度转换成摄氏温度的公式：C＝5/9(F-32)。请输入一个华氏温度，输出对应的 摄氏温度。",
		answers: [
			'Fah=eval(input("请输入一个华氏温度:")) Cel=5.0/9*(Fah-32) print("Fah="Fah"Cel=%.2f"%(Cel))'
		],
		isFAQ: true
	},
	{
		question: "下列代码运行时错误提示 NameError: name 'r' is not defined，请改正其中的错误。 import math class Circle:  def __init__(self, r):  self.r = r  def area(self):  return math.pi*r*r c = Circle(2) print(c.area())",
		answers: [
			"area 方法中，对类实例成员的引用应改为 return math.pi*self.r* self.r"
		],
		isFAQ: true
	},
	{
		question: "请定义函数 count(str,c)，检查字符串 str 中单个字符 c 出现的次数，返回这个次数。",
		answers: [
			'def count(stringc):  count = 0  for i in range(len(string)):  if string[i]==c:  count+=1  return count if __name__ == "__main__":  s=input("请输入一个字符串：")  c=input("请输入待查找字符：")  print("字符个数为："count(sc))'
		],
		isFAQ: true
	},
	{
		question: "简述 Python 语言的特点。",
		answers: [
			"（1）优点 ①语法简洁，易于上手，程序可读性强； ②既支持面向过程的函数编程也支持面向对象的抽象编程； ③可移植性好、可扩展性好； ④开源本质，使任何用户都有可能成为代码的改进者； ⑤Python 解释器提供了数百个内置库和函数库，； ⑥提供了安全合理的异常退出机制。 （2）缺点 ①由于是解释型语言，运行速度稍慢； ②构架选择太多，没有像 C#那样的官方.net 构架。"
		],
		isFAQ: true
	},
	{
		question: "编写一个程序将一个英文文本文件中的所有大写字母转换成小写、小写字母转换成大写， 然后再以添加的方式写入该文件。",
		answers: [
			'fr=open("D:\\\\f.txt""r+") lines=fr.readlines() fr.write("\\n") for eachline in lines:  fr.write(eachline.swapcase()) fr.close()'
		],
		isFAQ: true
	},
	{
		question: "请总结 Python 程序注释的方法。",
		answers: [
			"（1）单行注释：该注释是以“#”开始，到该行末尾结束； （2）多行注释：该注释以三个引号或双引号作为开始和结束符号，其中三个引号可以是三 个单引号或三个双引号。"
		],
		isFAQ: true
	},
	{
		question: "执行下列脚本后，L 和 M 的值各是什么？ >>> L = [1, 2, 3] >>> M = ['X', L[:], 'Y']  >>> L[1] = 0",
		answers: [
			"M 使用空列表的切片创建 L 的副本，L[1]仅仅改变了 L，但是不影响 M。 >>> L [1 0 3] >>> M ['X' [1 2 3] 'Y']"
		],
		isFAQ: true
	},
	{
		question: "编写一个函数 IsPrime()，参数为整数，判断参数是否为质数，并设计主函数测试。",
		answers: [
			'def IsPrime(x):  for i in range(2x//2):  if (x%i)==0:  return False  return True if __name__ == "__main__": a=eval(input("请输入一个整数："))  if IsPrime(a):  print(a"是质数")  else:  print(a"不是质数")\n填空题'
		],
		isFAQ: true
	},
	{
		question: "______________是目前比较常用的Python扩展库管理工具。",
		answers: [
			"pip"
		],
		isFAQ: true
	},
	{
		question: "包含_________语句的函数可以用来创建生成器对象。",
		answers: [
			"yield"
		],
		isFAQ: true
	},
	{
		question: "假设列表对象sList的值为[3, 4, 5, 6, 7, 9, 11, 13, 15, 17]，那么切片aList[3:7]得到的值是_________________。",
		answers: [
			"[6 7 9 11]"
		],
		isFAQ: true
	},
	{
		question: "查看变量类型的Python内置函数是________________。",
		answers: [
			"type()"
		],
		isFAQ: true
	},
	{
		question: '已知字符串 s = "abcDeF"，能将字符串 s 中的大写字母转换为小写的函数是',
		answers: [
			"lower()"
		],
		isFAQ: true
	},
	{
		question: "continue 用于控制单词循环是否   执行，（向下或向上）",
		answers: [
			"向下"
		],
		isFAQ: true
	},
	{
		question: "假设有一个列表a，现要求从列表a中每3个元素取1个，并且将取到的元素组成新的列表b，可以使用语句 。",
		answers: [
			"b = a[::3]"
		],
		isFAQ: true
	},
	{
		question: "文件对象的________方法用来把缓冲区的内容写入文件，但不关闭文件。",
		answers: [
			"flush（）"
		],
		isFAQ: true
	},
	{
		question: "面向对象程序设计的三要素分别为 、 和 。",
		answers: [
			"封装继承多态"
		],
		isFAQ: true
	},
	{
		question: "os.path模块中的_________方法用来测试指定的路径是否为文件。",
		answers: [
			"isfile()"
		],
		isFAQ: true
	},
	{
		question: "变量的数据类型可以通过   方法来修改",
		answers: [
			"赋值"
		],
		isFAQ: true
	},
	{
		question: "一个数字5___________（是、不是）合法的Python表达式。",
		answers: [
			"是"
		],
		isFAQ: true
	},
	{
		question: "os模块的_________方法用来返回包含指定文件夹中所有文件和子文件夹的列表。",
		answers: [
			"listdir()"
		],
		isFAQ: true
	},
	{
		question: "使用什么符号对浮点类型的数据进行格式化",
		answers: [
			"%f"
		],
		isFAQ: true
	},
	{
		question: "用于跳过当前循环的剩余语句",
		answers: [
			"continue"
		],
		isFAQ: true
	},
	{
		question: "在Python 2.x中，input()函数接收到的数据类型由_________确定，而在Python3.x中该函数则认为接收到的用户输入数据一律为________。",
		answers: [
			"界定符字符串"
		],
		isFAQ: true
	},
	{
		question: "Java程序中基本的结构单位是（）。",
		answers: [
			"类"
		],
		isFAQ: true
	},
	{
		question: "Python 语言有两种注释方式：    和    。",
		answers: [
			"单行注释多行注释"
		],
		isFAQ: true
	},
	{
		question: "是封装好的可以重复使用的，实现相应功能的代码段",
		answers: [
			"函数"
		],
		isFAQ: true
	},
	{
		question: "变量是用来存储   的",
		answers: [
			"数据"
		],
		isFAQ: true
	},
	{
		question: "表达式“[3] in [1,2,3,4]”的值为___________。",
		answers: [
			"FALSE"
		],
		isFAQ: true
	},
	{
		question: "range()函数在Python 2.x中返回一个___________，而在Python 3.x中的range()函数返回一个___________。",
		answers: [
			"列表range对象"
		],
		isFAQ: true
	},
	{
		question: "函数从键盘中获取到的数据即为该变量的值",
		answers: [
			"input()"
		],
		isFAQ: true
	},
	{
		question: "Python内置函数_________可以返回列表、元组、字典、集合、字符串以及range对象中元素个数。",
		answers: [
			"len()"
		],
		isFAQ: true
	},
	{
		question: "返回某个子串在字符串中出现次数的是什么方法",
		answers: [
			"count（）"
		],
		isFAQ: true
	},
	{
		question: "在Python中，字典和集合都是用一对 作为定界符，字典的每个元素有两部分组成，即 和 ，其中 不允许重复。",
		answers: [
			"大括号键值键"
		],
		isFAQ: true
	},
	{
		question: "是指“有序”的队列",
		answers: [
			"序列"
		],
		isFAQ: true
	},
	{
		question: '使用"   "给变量进行赋值',
		answers: [
			"="
		],
		isFAQ: true
	},
	{
		question: "___________（可以、不可以）使用del命令来删除元组中的部分元素。",
		answers: [
			"不可以"
		],
		isFAQ: true
	},
	{
		question: "是通过用自己熟悉的语言，在程序中对某些代码进行标注说明",
		answers: [
			"注释"
		],
		isFAQ: true
	},
	{
		question: "流程图的基本元素是什么",
		answers: [
			"判断框"
		],
		isFAQ: true
	},
	{
		question: "赋值是将运算符   的值赋给   的变量",
		answers: [
			"右边左边"
		],
		isFAQ: true
	},
	{
		question: "通过 input()函数输入的数字，需要将其转换为     才可以进行数值上的加减操作",
		answers: [
			"int 整型"
		],
		isFAQ: true
	},
	{
		question: "在函数内部可以通过关键字___________来定义全局变量。",
		answers: [
			"global"
		],
		isFAQ: true
	},
	{
		question: "假设a为类A的对象且包含一个私有数据成员“__value”，那么在类的外部通过对象a直接将其私有数据成员“__value”的值设置为3的语句可以写作___________。",
		answers: [
			"a._A__value = 3"
		],
		isFAQ: true
	},
	{
		question: "Python提供了两种基本的循环结构：_________________和______________。",
		answers: [
			"for循环while循环"
		],
		isFAQ: true
	},
	{
		question: "while 循环的三要素  ，   ，   。",
		answers: [
			"编写要被执行的循环代码编写修改的执行条件代码定义循环的执行条件"
		],
		isFAQ: true
	},
	{
		question: "函数用于获取子字符串出现的位置，如果存在则返回子字符串中第一个字符的索引值，如果没有找到则返回-1",
		answers: [
			"find()"
		],
		isFAQ: true
	},
	{
		question: "在代码中添加   ，能够增强程序的可读性",
		answers: [
			"注释"
		],
		isFAQ: true
	},
	{
		question: "使用列表推导式生成包含10个数字5的列表，语句可以写为_______________。",
		answers: [
			"[5 for i in range(10)]"
		],
		isFAQ: true
	},
	{
		question: "函数的参数是输入数据，而返回值是 结果，（填输入或输出）",
		answers: [
			"输出"
		],
		isFAQ: true
	},
	{
		question: "能把全部字符变成大写的方法是",
		answers: [
			"upper（）"
		],
		isFAQ: true
	},
	{
		question: "(old, new[, max])函数，用于新字符串替换旧字符串，可设置替换次数 max 的值",
		answers: [
			"replace"
		],
		isFAQ: true
	},
	{
		question: "假设有列表a = ['name','age','sex']和b = ['Dong',38,'Male']，请使用一个语句将这两个列表的内容转换为字典，并且以列表a中的元素为键，以列表b中的元素为值，这个语句可以写为 。",
		answers: [
			"c = dict(zip(ab))"
		],
		isFAQ: true
	},
	{
		question: "使用字典对象的____________方法可以返回字典的“键-值对”列表，使用字典对象的_________方法可以返回字典的“键”列表，使用字典对象的_____________方法可以返回字典的“值”列表。",
		answers: [
			"items()keys()values()"
		],
		isFAQ: true
	},
	{
		question: "与运算符“**”对应的特殊方法名为________，与运算符“//”对应的特殊方法名为____________。",
		answers: [
			"__pow__()__floordiv__()"
		],
		isFAQ: true
	},
	{
		question: "哪个函数可以实现字符串第一个字母大写，其它字母小写",
		answers: [
			"capitalize()"
		],
		isFAQ: true
	},
	{
		question: "如果函数中没有return语句或者return语句不带任何返回值，那么该函数的返回值为____________。",
		answers: [
			"None"
		],
		isFAQ: true
	},
	{
		question: "Python 中变量的赋值就是    和定义的过程",
		answers: [
			"变量声明"
		],
		isFAQ: true
	},
	{
		question: "使用pip工具升级科学计算扩展库numpy的完整命令是_________________。",
		answers: [
			"pip install numpy"
		],
		isFAQ: true
	},
	{
		question: "java是一门（）、（）、（）的语言",
		answers: [
			"跨平台健壮友好"
		],
		isFAQ: true
	},
	{
		question: "列表对象的___________方法删除首次出现的指定元素，如果列表中不存在要删除的元素，则抛出异常。",
		answers: [
			"remove"
		],
		isFAQ: true
	},
	{
		question: "缺少修改执行条件的代码会造成    。",
		answers: [
			"死循环"
		],
		isFAQ: true
	},
	{
		question: "变量名可以包含字母、数字、下划线，不能以   开头",
		answers: [
			"数字"
		],
		isFAQ: true
	},
	{
		question: "的元素无序且不能重复",
		answers: [
			"集合"
		],
		isFAQ: true
	},
	{
		question: "运算符%________（可以、不可以）对浮点数进行求余数操作。",
		answers: [
			"可以"
		],
		isFAQ: true
	},
	{
		question: "列表对象的sort()方法用来对列表元素进行原地排序，该方法的返回值为________。",
		answers: [
			"None"
		],
		isFAQ: true
	},
	{
		question: "“我总是失败,他们都是那么优秀”“没有人愿意与我交友，所有人都总跟我作对”这种想法属于什么",
		answers: [
			"两极性思维"
		],
		isFAQ: false
	},
	{
		question: "我们常常根据已有的经验或观念对某人或某一类人产生一种比较固定的看法，比如人们常常认为南方人小气，精打细算，北方人豪爽，这是一种",
		answers: [
			"刻板效应"
		],
		isFAQ: false
	},
	{
		question: "王元5岁，IQ是110，李平10岁，IQ也是110，两者的智力相比",
		answers: [
			"无法比较"
		],
		isFAQ: false
	},
	{
		question: "哪种表达不带有绝对化的不良认知",
		answers: [
			"能做到的事情我一定做到，其他的我尽力而为."
		],
		isFAQ: false
	},
	{
		question: "吃不着的葡萄是酸的，得不到的东西是不好的，这种心理防卫方法，称为",
		answers: [
			"合理化作用"
		],
		isFAQ: false
	},
	{
		question: "心理防御机制是人们适应生活的一种什么的反应，在人的心理世界占有极为重要的地位",
		answers: [
			"潜意识"
		],
		isFAQ: false
	},
	{
		question: "全国大学生心理健康日是哪一天",
		answers: [
			"5月25日"
		],
		isFAQ: false
	},
	{
		question: "学校心理辅导是学校实施心理健康教育的主渠道，下列对学校心理辅导理解正确的一项是",
		answers: [
			"心理辅导把工作的重点放在预防心理问题的出现和促进学生潜能的发展上"
		],
		isFAQ: false
	},
	{
		question: "有的同学遭遇失败后,便会认为自己“没用,什么也干不成，是个废物，窝囊废”，这种想法属于哪种不良认知",
		answers: [
			"过分概括化"
		],
		isFAQ: false
	},
	{
		question: "马斯洛的需求层次理论中最高层次的需要是",
		answers: [
			"自我实现的需要"
		],
		isFAQ: false
	},
	{
		question: "心理健康在社会交往中可表现为",
		answers: [
			"有自己喜欢与不喜欢的人"
		],
		isFAQ: false
	},
	{
		question: "正确的健康概念应指",
		answers: [
			"不但躯体健康而且心理健康"
		],
		isFAQ: false
	},
	{
		question: "关于开展心理健康教育的目的不正确的表述是",
		answers: [
			"促进素质教育的落实"
		],
		isFAQ: false
	},
	{
		question: "在心理咨询的各种形式中，最主要而且最有效的方法是",
		answers: [
			"门诊咨询"
		],
		isFAQ: false
	},
	{
		question: "心理健康表现心理的耐受力方面为",
		answers: [
			"把克服困难当成一种乐趣，而勇敢地面对生活的挫折"
		],
		isFAQ: false
	},
	{
		question: "挫折的组成成分中对挫折感起决定作用的是",
		answers: [
			"挫折认知"
		],
		isFAQ: false
	},
	{
		question: "在应激过程中始终起到关键性作用的是什么",
		answers: [
			"认知评价"
		],
		isFAQ: false
	},
	{
		question: "学校心理辅导的主要方式一般有两种，下列关于它们的叙述不正确的一项是",
		answers: [
			"经常逃学的学生、有学习障碍的学生更适合于进行团体辅导"
		],
		isFAQ: false
	},
	{
		question: "塞里认为应激的动态发展有三个阶段： 抵抗和衰竭以及",
		answers: [
			"警戒"
		],
		isFAQ: false
	},
	{
		question: "心理健康教育的对象主要组成是",
		answers: [
			"正常学生"
		],
		isFAQ: false
	},
	{
		question: "关于影响人际吸引的因素哪一个是错误的",
		answers: [
			"自尊"
		],
		isFAQ: false
	},
	{
		question: "对心理发展起主导作用的是",
		answers: [
			"学校教育"
		],
		isFAQ: false
	},
	{
		question: "心理健康的最终目标",
		answers: [
			"保持人格完整"
		],
		isFAQ: false
	},
	{
		question: "什么是人与环境的一种平衡状态，是个体的心理和行为面对环境的变化作出相应的的适应变化的能力,是心理健康的标志之一",
		answers: [
			"适应"
		],
		isFAQ: false
	},
	{
		question: "个体在觉察需求与满足需求的能力不平衡时，倾向于通过整体心理和生理反应表现出的多因素作用的适应过程，称为什么",
		answers: [
			"应激"
		],
		isFAQ: false
	},
	{
		question: "有理想、有抱负，有独立见解，反应迅速，行为果断属于哪种气质类型的心理特征",
		answers: [
			"胆汁质"
		],
		isFAQ: false
	},
	{
		question: "下列说法中错误的是",
		answers: [
			"知道自己需要怎样的爱，并且具有给予爱的能力但不一定要具有拒绝爱的能力。"
		],
		isFAQ: false
	},
	{
		question: '“月光族"“负翁”这些大学校园里的流行词汇主要说明了什么现象',
		answers: [
			"大学生不善理财而出现的“经济危机”"
		],
		isFAQ: false
	},
	{
		question: "较强的自我克制能力，他们外柔内刚，沉静多思，不愿流露内心的真情实感属于哪种气质类型的心理特征",
		answers: [
			"粘液质"
		],
		isFAQ: false
	},
	{
		question: "我国古代思想家王充所说的“施用累能”是指",
		answers: [
			"社会实践对智力的影响"
		],
		isFAQ: false
	},
	{
		question: "自我意识的内容有哪些？",
		answers: [
			"社会自我",
			"生理自我",
			"心理自我"
		],
		isFAQ: false
	},
	{
		question: "现代应激理论将应激过程分为四个部分，分别是",
		answers: [
			"输入",
			"中介",
			"反应",
			"应对"
		],
		isFAQ: false
	},
	{
		question: "影响人格形成与发展的因素主要有",
		answers: [
			"遗传因素",
			"社会文化因素",
			"家庭环境因素",
			"早期童年经验"
		],
		isFAQ: false
	},
	{
		question: "大五人格因素模型是什么？",
		answers: [
			"尽责性",
			"宜人性",
			"神经质",
			"开放性"
		],
		isFAQ: false
	},
	{
		question: "按照情绪发生的强度、速度与持续时间的长短，可将情绪分为哪几",
		answers: [
			"心境",
			"应激",
			"激情"
		],
		isFAQ: false
	},
	{
		question: "后天学习的知识和能力可以分为？",
		answers: [
			"专业知识",
			"自我管理技能",
			"可迁移能力"
		],
		isFAQ: false
	},
	{
		question: "时间管理的使用策略有哪些？",
		answers: [
			"精简任务，每次只专注一件事",
			"向其他人做出承诺",
			"化整为零"
		],
		isFAQ: false
	},
	{
		question: "自我意识的结构自我意识的结构",
		answers: [
			"自我认知",
			"自我体验",
			"自我调控"
		],
		isFAQ: false
	},
	{
		question: "大学学习的特点有哪些？",
		answers: [
			"学习的专业性",
			"学习的探索性",
			"学习的实践性"
		],
		isFAQ: false
	},
	{
		question: "关于大学生心理健康的标准，下列说法正确的是",
		answers: [
			"智力正常",
			"情绪健康",
			"意志健全",
			"人格完整"
		],
		isFAQ: false
	},
	{
		question: "影响大学生的心理健康的家庭规则是什么？",
		answers: [
			"非人性化",
			"绝对化"
		],
		isFAQ: false
	},
	{
		question: "影响大学生心理健康的主要因素有什么？",
		answers: [
			"遗传因素",
			"环境因素"
		],
		isFAQ: false
	},
	{
		question: "下列哪些陈述符合青少年的心理特点",
		answers: [
			"精力旺盛",
			"感情丰富",
			"渴望独立"
		],
		isFAQ: false
	},
	{
		question: "打败自负的方法有哪些？",
		answers: [
			"接受批评是根治自负的最佳办法",
			"与人平等相处",
			"提高自我认识",
			"以发展的眼光看待自负，既要看到自己的过去，又要看到自己的现在和自己的将来"
		],
		isFAQ: false
	},
	{
		question: "人们了解自己的三种信息来源是哪里？",
		answers: [
			"物理世界",
			"社会世界",
			"内部心理世界"
		],
		isFAQ: false
	},
	{
		question: "拖延背后的原因是什么？",
		answers: [
			"我们觉得完成任务的过程没意思",
			"问题太难了",
			"觉得完成这个任务没价值",
			"害怕别人对你做的工作给消极的评价"
		],
		isFAQ: false
	},
	{
		question: "根据世界组织最新定义，健康应包括",
		answers: [
			"身体健康",
			"心理健康"
		],
		isFAQ: false
	},
	{
		question: "人格的影响因素有哪些？",
		answers: [
			"遗传因素",
			"家庭环境因素",
			"自然环境因素"
		],
		isFAQ: false
	},
	{
		question: "提高自我效能感的方法有哪些？",
		answers: [
			"设立合适的目标",
			"找到合适的比较对象",
			"合理归因"
		],
		isFAQ: false
	},
	{
		question: "爱情与喜欢的区别主要体现在哪几个方面",
		answers: [
			"依恋",
			"利他",
			"亲密"
		],
		isFAQ: false
	},
	{
		question: "有效的学习策略有哪些？",
		answers: [
			"检索学习",
			"间隔学习",
			"联系学习",
			"优秀学习习惯清单"
		],
		isFAQ: false
	},
	{
		question: "网络空间的基本心理特征有",
		answers: [
			"局限的感官体验",
			"身份的机动性和匿名",
			"地位平等",
			"超越空间局限"
		],
		isFAQ: false
	},
	{
		question: "关于适应,下列说法正确的是",
		answers: [
			"“物竞天择，适者生存”是自然界所有生物的生存法则。",
			"当环境发生变化时，个体就会面对适应问题。",
			"适应是智慧的本质，是有机体与环境间的平衡运动。"
		],
		isFAQ: false
	},
	{
		question: "学习的分类有哪些？",
		answers: [
			"接受学习",
			"发现学习",
			"机械学习",
			"有意义学习"
		],
		isFAQ: false
	},
	{
		question: "大学生自我意识发展中又出现什么偏差？",
		answers: [
			"自卑",
			"自负",
			"自我中心"
		],
		isFAQ: false
	},
	{
		question: "良好的择业心态主要表现在哪些方面",
		answers: [
			"避免从众心理",
			"确定适当的职业目标",
			"避免理想主义",
			"克服依赖心理"
		],
		isFAQ: false
	},
	{
		question: "新生入校，独立是第一关，独立应该从哪些小事做起",
		answers: [
			"整理好自己的领地",
			"规划好自己的时间",
			"熟悉周围的环境",
			"初步建立社交圈子"
		],
		isFAQ: false
	},
	{
		question: "遇到情绪困扰时,下面哪些方法可以合理地调整或缓解情绪",
		answers: [
			"向亲人、老师或者朋友诉说",
			"寻求专业心理咨询师的帮助",
			"把一切写下来,借此整理自己的思绪"
		],
		isFAQ: false
	},
	{
		question: "产生挫折的内部因素有",
		answers: [
			"智力因素",
			"抱负水平因素",
			"挫折承受力"
		],
		isFAQ: false
	},
	{
		question: "人格的特征有哪些？",
		answers: [
			"独特性",
			"稳定性",
			"整体性",
			"功能性"
		],
		isFAQ: false
	},
	{
		question: "大学生的学习特点有",
		answers: [
			"学习内容的专业性",
			"学习途径的多样性",
			"学习过程的自主性"
		],
		isFAQ: false
	},
	{
		question: "大学生自我意识发展的特点有哪些？",
		answers: [
			"自我认识的矛盾性",
			"自我体验的情绪化",
			"自我调节的中心化",
			"自我意识发展的阶段性"
		],
		isFAQ: false
	},
	{
		question: "拉扎勒斯把心理适应下的心理应对方式分为三种类型，分别是",
		answers: [
			"积极地认知应对",
			"积极地行为应对",
			"回避应对"
		],
		isFAQ: false
	},
	{
		question: "福格特认为就业力包含哪几个部分？",
		answers: [
			"社会资本",
			"人力资本",
			"适应力",
			"职业认同"
		],
		isFAQ: false
	},
	{
		question: "家庭如何影响大学生心理健康？",
		answers: [
			"家庭亚系统和界限",
			"家庭不良互动模式",
			"家庭规则"
		],
		isFAQ: false
	},
	{
		question: "有效的学习策略有什么？",
		answers: [
			"检索学习",
			"间隔学习",
			"联系学习",
			"优秀学习习惯清单"
		],
		isFAQ: false
	},
	{
		question: "在理解与把握心理健康标准时，应考虑",
		answers: [
			"判断时应兼顾内部协调与对外良好适应两方面",
			"心理健康具有相对性",
			"心理健康是一种状态，也是一种过程",
			"心理健康是一个社会评价问题"
		],
		isFAQ: false
	},
	{
		question: "如何进行人格完善与发展？",
		answers: [
			"发展灵活的个人建构",
			"制定与自我协调一致的发展计划",
			"创造自我恢复的空间",
			"建立改变的智慧"
		],
		isFAQ: false
	},
	{
		question: "大学新生的心理适应策略有哪些",
		answers: [
			"重新进行角色定位，树立目标",
			"悦纳自我",
			"合理表达自己的感受",
			"学会交往"
		],
		isFAQ: false
	},
	{
		question: "大学生存在的主要心理问题有什么？",
		answers: [
			"人格和自我成长问题",
			"学业问题",
			"生涯与就业问题",
			"人际关系问题"
		],
		isFAQ: false
	},
	{
		question: "A型人格的人比较松弛，不急迫，B型人格的人有强烈的动机克服困难，并会竭尽全力实现目标",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "心理健康就是一个人能够充分协调自己的知、情、行，使之达到良好的社会适应能力，    并能够充分发挥自己的潜能",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "自卑是由于某种生理或心理上的缺陷或其他原因所产生的对自我认识的态度体验。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "三种基本心理需要——自主需要、胜任力需要和归属需要",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "希波克拉底的大脑皮质说将气质分为胆汁质、多血质、粘液质、抑郁质四种类型。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "自我认识的矛盾性不属于大学生自我意识发展的特点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "人格障碍是指某人的人格特征严重偏离在特定文化观念、思想、情感和人际  关系中人们普遍的模式",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "自我人格“改造”计划要想顺利实现，必须不能忽视自己的生物属性",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "乔志宏等的研究发现，我们能够不断提高的人力资本，包含我们的学业成绩、获奖、实践活动和实习经历，是决定就业成败的核心因素。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对于那些心理适应属于正常范围的人来说，不需要心理咨询",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "学习指基于经验而导致行为或行为潜能发生相对一致的变化的过程",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "投射测验间接方法揭示人们无意识或内隐的想法、愿望和需要。罗夏墨迹测验、主题统觉测验。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "情景测验法是将受测者置于某种情境，如挫折、压力、诱惑等，观察他们在这种情境下的行为反应，进而了解其人格特点。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "幻想常使人想入非非，因此应避免学生产生幻想。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "兼职或实习是我们进行职业探索，获得大量有关职业的一手资料的有效方式。也可以获得了解职场环境的机会，锻炼能力，获得报酬，增长自信。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "害羞经常是由不熟悉的人或情境因素引起的",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "专业知识又称内容性知识，多用名词描述，一般不可迁移，常常与我们的专业学习，工作分工直接相关",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "专业知识是适应性技能，指一个人如何使用自己的专业知识，以什么样的态度从事工作的技能",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "福格特认为就业力包含社会资本、人力资本、适应力和职业认同四个部分，其中社会资本、人力资本等是非心理性因素，而生涯规划能力是从心理学和个人角度出发的职业认同和适应能力。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "弗洛伊德的人格三分结构论认为人格有本我、自我、超我三部分构成",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "美感是根据一定的审美标准评价事物时所产生的情绪体验。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "失恋更多的时候是让我们避免将来更大的婚姻悲剧。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "在达成一项目标之前，将目标分解成若干个可以实现的部分，不但能增加立竿见影的效果，而且能减少付出的代价。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "做人就是要坚强，不许表现出脆弱",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "米纽庆不认为家庭的不良互动模式是造成人心理行为问题的重要原因。往往一个人出现的心理健康问题，是家庭成员之间共同“努力”的结果。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "人际关系是人与人之间通过沟通与相互影响建立起来的心理联系",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "健康自我意识的标准： 正确的自我认知+良好的自我体验+有效的自我调控。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "精神分析大师弗洛伊德的人格结构理论包括对自我，本我和超我的研 究",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "情绪A#B#C理论中的“B”才是我们的情绪及行为反应的直接原因。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "理智感是在智力活动中认识和评价事物所产生的情感体验。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "羞怯、胆小、内向、依赖性强是焦虑症患者的典型特征。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "开放的认知风格为愿意接受新观点、新的人际关系和新的环境。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "对别人要求严格，对自己无所谓是对完善型性格特征的描述。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "心理咨询的对象是指那些有某种心身疾病的人，以及有这样心理社会因素所困扰的正常人，或是残疾人员",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "大学学习的特点具有研究和探索的性质，参与研究成了大学生的必修课。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "情景测验法是通过谈话的方式来快速判断一个人的人格特点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "学习动机越强学习效率就越高。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "恋爱是两个人人格的深层接触，在此过程中对方像一面镜子时刻刻画着自我形象，并鞭策你不断完善自我。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "气质和性格都有好坏之分",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "别人如何对待我，我就如何对待别人，这是合理处理人际关系的原则。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "冬天洗冷水澡是培养大学生挫折承受力的有效方法。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "自卑过高地估计自己，对自己的肯定评价往往过当。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "家庭中有的规则是对系统的运作有益的，可以让家庭成员形成良性的互动，相处的十分融洽",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "明明不喜欢自己的手机，却偏偏说自己手机通话质量好，这是酸葡萄心理",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "机械学习指的是学习者利用原有经验来进行新的学习，理解新的信息",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "健康是指躯体的一种稳定、充满活力的一般状态",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "自我强迫与反强迫同时并存是强迫症的特点。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "革命的本钱=强健的体魄+健康的心理",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "心理健康就是一个人能够充分协调自己的知、情、行，使之达到良好的社会适应能力，并能够充分发挥自己的潜能",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "可迁移能力是功能性能力，一般用动词描述，这部分能力可以迁移到不同的工作之中，是我们最可靠的能力，能够持久地发挥作用",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "互补是指人际关系中双方在需求方面如果能够互相取长补短",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "各个亚系统都具有自身独特的任务与功能，不能彼此侵犯或混淆",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "艾里克森的人格发展八阶段理论中青少年期应培养的良好的人格品质是爱的品质。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "核心自我建构越丰富，越灵活，个性适应性也就越高。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "核心自我建构越丰富，越灵活，个性适应性也就越低。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "人格或性格决定了一个人的生活方式，进而决定一个人的命运",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "心理不健康与心理健康并非泾渭分明的对立的两极，而是一个连续的状态",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "影响大学生心理健康的唯一因素为遗传因素",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "挫折只会对人造成消极方面的影响",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "次要特质是个体一些不太重要的特质。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "人格(广义)=个性特点",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "生活中最常见的心理冲突是双趋—双避式冲突",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "系统论会从整个系统中来考察大学生的行为，认为大学生的行为与整个系统的运行是密切相关的。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "核心特质为一个人最典型、最具概括性的特质",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "大学生心理健康教育应该以预防为主",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "导致神经性厌食症的主要原因是担心过量饮食会影响身体健康。",
		answers: [
			"错误"
		],
		isFAQ: false
	},
	{
		question: "学业成绩（逻辑思维能力和语言能力）已经不是唯一标准。包括人际沟通能力、领导管理能力、艺术创作能力、动手能力等。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "奥尔波特认为人格是连续的，可以测量的，测量的单位就是特质",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "外倾性是表示人际互动的数量和密度、对刺激的需要以及获得愉悦的能力。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "抑郁易感性人格指的是使个体容易收到外显的或潜在的威胁伤害的人格特征，在遇到消极环境的刺激后，个体更容易表现出心理症状。",
		answers: [
			"正确"
		],
		isFAQ: false
	},
	{
		question: "家庭如何影响大学生心理健康？",
		answers: [
			"答:1、家庭亚系统和界限 亚系统”，各个亚系统都具有自身独特的任务与功能，不能彼此侵犯或混淆 2、家庭不良互动模式 米纽庆认为家庭的不良互动模式是造成人心理行为问题的重要原因。往往一个人出现的心理健康问题，是家庭成员之间共同“努力”的结果。 3、家庭规则 家庭中有的规则是对系统的运作有益的，可以让家庭成员形成良性的互动，相处的十分融洽；家庭中也可能存在着一些具有破坏性的规则，这些规则的存在不仅没有达到理想的效果，反而会破坏家庭关系。"
		],
		isFAQ: true
	},
	{
		question: "大学生如何培养健康的心理？",
		answers: [
			"答:（1）掌握一定的心理健康知识        （2）建立合理的生活秩序       （3）保持健康的情绪         （4）建立良好的人际关系，学会去爱        （5）树立符合实际的奋斗目标        （6）学会自娱"
		],
		isFAQ: true
	},
	{
		question: "论述大学毕业生有哪些适应问题,适用哪些策略来解决这些问题",
		answers: [
			"答:从理论到实践的转换问题；解决：积攒工作经验。从父母养活到自己养活到自己养活自己的问题 解决:用责任感证明自己是可以养活自己的，并努力处理调理人际关系，好的人际网是你成功的重要因素"
		],
		isFAQ: true
	},
	{
		question: "大学生存在的主要心理问题是什么？",
		answers: [
			"答:（1）人格和自我成长问题 （2）学业问题 （3）生涯与就业问题 （4）人际关系问题 （5）恋爱与性心理问题 （6）情绪问题 （7）压力与挫折问题 （8）生命意义与危机问题 （9）精神障碍问题 （10）其他问题"
		],
		isFAQ: true
	},
	{
		question: "大学生心理健康的标准是什么？",
		answers: [
			"答:（1）正确认识自我和接纳自我       （2）保持和谐的人际关系       （3）良好的适应能力       （4）具有顽强的意志       （5）具有良好的情绪状态       （6）具有完整和谐的健康人格"
		],
		isFAQ: true
	},
	{
		question: "打败自负的方法是什么？",
		answers: [
			"答:1、接受批评是根治自负的最佳办法 2、与人平等相处 3、提高自我认识 4、以发展的眼光看待自负，既要看到自己的过去，又要看到自己的现在和自己的将来"
		],
		isFAQ: true
	},
	{
		question: "影响大学生的心理健康的家庭规则是什么？",
		answers: [
			"答:1、非人性化——做人就是要坚强，不许表现出脆弱（脆弱是人的一部分）。2、绝对化——做人要诚实；一定要准时（过于绝对）。 3、矛盾化——做人要诚实，处事要圆滑（两个规则相互矛盾）。 4、过时化——孩子要听父母的话（当孩子已经长大成人时）。"
		],
		isFAQ: true
	},
	{
		question: "拖延背后的原因是什么？",
		answers: [
			"答:我们觉得完成任务的过程没意思 问题太难了 觉得完成这个任务没价值 害怕别人对你做的工作给消极的评价 对成功的恐惧怕遭嫉妒，还得完成更多任务 避免被控制 追求最后期限来临前的兴奋和刺激 完美主义 压力过大 社交需要"
		],
		isFAQ: true
	},
	{
		question: "大学生遇到挫折心理时应当怎样自我调适？",
		answers: [
			'答:（1）自我暗示法 (2）暗示过程中尽量运用想象. （3）选择好自我暗示的内容。 （4）努力达到松弛和“凝神"。 （5)要相信自我暗示的奇妙作用，并要在平时反复练习。'
		],
		isFAQ: true
	},
	{
		question: "大学生在人际交往中，为了提升自己的交往能力，应掌握哪些人际交往的技巧?",
		answers: [
			"答:（1）重视良好的第一印象； (2）积极主动的与人交往； （3)记住并叫出对方的名字 （4)学会赞美别人； （5)妥善运用批评； (6）给人以微笑； （7）恰当运用非言语交际的艺术技巧； （8）正确运用言语交际的艺术技巧"
		],
		isFAQ: true
	},
	{
		question: "影响大学生心理健康的主要因素是什么？",
		answers: [
			"答:1、遗传因素——决定人的潜能 2、环境因素——决定这种潜能是否能发挥出来，以及发挥到什么程度 3、家庭环境、社会环境、学校环境"
		],
		isFAQ: true
	},
	{
		question: "打败拖延的方法是什么？",
		answers: [
			"答:1、拖延的人并不是一无是处。 2、把你必须完成的任务按照重要性和紧急性排序，列一个清单，当然最紧急最重要的事情排在最前头，然后把一些很重要的事情排在后面。 3、为了避免完成清单最上方的任务，开始完成后边的任务。 4、直到下一个更紧急，更重要的任务登上最上方，于是就可以拖着新任务，完成原来的重要任务了。"
		],
		isFAQ: true
	},
	{
		question: "大学新生心理适应问题主要有哪些方面？",
		answers: [
			"答:(1）、对新的学习生活环境不适应  （2）、学习紧张和竞争压力造成心理负担过重 （3)、人际关系失调导致社交心理障碍  （4）、理想、目标落空造成内心困惑"
		],
		isFAQ: true
	},
	{
		question: "简述学校开展心理健康教育的基本途径。",
		answers: [
			"答:在学校开展心理健康教育有以下几条途径：       (1)开设心理健康教育有关课程       (2)开设心理辅导活动课       (3)在学科教学中渗透心理健康教育的内容       (4)结合班级、团队活动开展心理健康教育       (5)个别心理辅导或咨询       (6)小组辅导"
		],
		isFAQ: true
	},
	{
		question: "某位大一学生小明发现某理想中的自己和现实中的自己相差太大，他很苦恼，面对这种矛盾状况，小明应该采取什么途径来解决？",
		answers: [
			"答:可以从以下两个途径来解决： （1）坚持自己理想中的自我标准努力改善现实的自我，使之与理想自我相一致 （2）一方面修正理想的自我，另一方面改善现实的自我\n填空题"
		],
		isFAQ: true
	},
	{
		question: "（）本意是指不限性别年龄的两人之间和谐融洽的关系，现多指异性间。",
		answers: [
			"亲密关系"
		],
		isFAQ: true
	},
	{
		question: "（）是处于最外层的大脑皮层，负责高级认识的。",
		answers: [
			"理性脑"
		],
		isFAQ: true
	},
	{
		question: "一般而言，大学生的动机冲突主要是：（）、双避冲突、趋避冲突和双趋避冲突。",
		answers: [
			"双趋冲突"
		],
		isFAQ: true
	},
	{
		question: "（）指所追求的目的受到阻碍、愿望无法实现时产生的情绪体验。",
		answers: [
			"愤怒"
		],
		isFAQ: true
	},
	{
		question: "学业成绩已经不是唯一标准。包括（）、领导管理能力、艺术创作能力、动手能力等。",
		answers: [
			"人际沟通能力"
		],
		isFAQ: true
	},
	{
		question: "拒绝的能力往往与自信紧密联系，缺乏自信和（）的人常常为拒绝别人而感到不安，而且有觉得别人的需求比自己的更重要的倾向。",
		answers: [
			"自尊"
		],
		isFAQ: true
	},
	{
		question: "导向系统包括价值观、世界观和职业伦理。其中（）是关键。",
		answers: [
			"职业价值观"
		],
		isFAQ: true
	},
	{
		question: "情绪的大脑机制两半球的功能也是（）的，积极情绪和消极情绪有不同的脑区。",
		answers: [
			"不一致"
		],
		isFAQ: true
	},
	{
		question: "1948年，世界卫生组织指出，健康应包括生理的、心理的和社会适应等方面的健康，1989年，又在健康的含义中增加了   （）的健康。",
		answers: [
			"道德"
		],
		isFAQ: true
	},
	{
		question: "相信压力有（）的人，比那些认为压力有害的人，更少抑郁，对生活更满意。",
		answers: [
			"促进作用"
		],
		isFAQ: true
	},
	{
		question: "“入芝兰之室，久而不闻其香”描述的是（）",
		answers: [
			"适应现象"
		],
		isFAQ: true
	},
	{
		question: "（）是人与人之间的相互接纳和喜欢。",
		answers: [
			"人际吸引"
		],
		isFAQ: true
	},
	{
		question: "（）包括三种成分：在认知层面上的主观体验，在生理层面上的生理唤醒，在表达层面上的外部行为。",
		answers: [
			"情绪"
		],
		isFAQ: true
	},
	{
		question: "心理辅导的一般目标第一是学会调适，第二是寻求   （），前者是基本目标，后者是高级目标。",
		answers: [
			"发展"
		],
		isFAQ: true
	},
	{
		question: "创业是（）工作的延伸，创业是一个具体的行动，包含了更多的冒险和挑战。",
		answers: [
			"创新"
		],
		isFAQ: true
	},
	{
		question: "（）企图摆脱和逃避某种危险情境而又无力应付时产生的情绪体验。",
		answers: [
			"恐惧"
		],
		isFAQ: true
	},
	{
		question: "有的大学生缺乏人际交往技巧和人际交往经验，有的大学生因性格内向或对人际交往的（）等原因，导致人际关系紧张。",
		answers: [
			"认知偏差"
		],
		isFAQ: true
	},
	{
		question: "有效的学习策略：（）、间隔学习、联系学习、优秀学习习惯清单。",
		answers: [
			"检索学习"
		],
		isFAQ: true
	},
	{
		question: "我们的（）特点与自身的性格特征密不可分。有人偏外向一端，有人偏内向一端，用对自己的性格优势，做真实的自己，才能在交往中得心应手。",
		answers: [
			"人际交往"
		],
		isFAQ: true
	},
	{
		question: "（）能够依据活动的某种目标，调动、指挥情绪的能力。",
		answers: [
			"自我激励"
		],
		isFAQ: true
	},
	{
		question: "（）是在自爱、自信的基础上充分认识自己的有利因素，积极进取，努力向上,不甘落后，勇于克服困难，做生活的强者。",
		answers: [
			"自强"
		],
		isFAQ: true
	},
	{
		question: "（）是指一个人由于生理、心理或社会原因而导致的各种异常心理过程、异常人格特征的异常行为方式，是一个人表现为没有能力按照社会认可的适宜方式行动，以致其行为的后果对本人和社会都是不适应的。",
		answers: [
			"心理障碍"
		],
		isFAQ: true
	},
	{
		question: "（）的要素有:内省的情绪体验、外在的情绪表现和情绪的生理变化",
		answers: [
			"情绪"
		],
		isFAQ: true
	},
	{
		question: "（）是有目的、有计划地设计规划不同的人生阶段，在考虑个人的智力，性格，价值，以及阻力和助力的前提下，做出合理安排，并且借此调整和摆正自己人生中的位置，以期自己能适得其所，获得最佳的发展和自我实现。",
		answers: [
			"生涯规划"
		],
		isFAQ: true
	},
	{
		question: "（）可以增加在人际交往中的奖赏，便于拉近人际的距离。",
		answers: [
			"赞美"
		],
		isFAQ: true
	},
	{
		question: "任务的难易程度不同，（）的最佳水平也会变化",
		answers: [
			"动机"
		],
		isFAQ: true
	},
	{
		question: "从人际沟通分析理论的角度看，人与人之间的交往就是人们各自的“三我”之间的交往。最理想的相互作用是成人刺激—（）。一个心理健康的人就是能在恰当的时间和地点使用恰当的自我状态的人。",
		answers: [
			"成人反应"
		],
		isFAQ: true
	},
	{
		question: "（）指的是人的一种自我觉察，即大脑的一种感受状态。",
		answers: [
			"主观体验"
		],
		isFAQ: true
	},
	{
		question: "(  )是人群中常见的一种心理障碍,一般是因环境改变、职务变迁或生活中某些不愉快的事件，加上患者的不良个性，而出现的一些情绪反应、及生理功能障碍，并导致学习、工作、生活及交际能力的减退。",
		answers: [
			"适应性障碍"
		],
		isFAQ: true
	},
	{
		question: "生活中各种事件的演变方向和历程，包括人一生中的各种职业和生活角色，以及由此表现出个人独特的（）类型。",
		answers: [
			"自我发展"
		],
		isFAQ: true
	},
	{
		question: "（）是指表现在人对现实的态度和相应的行为方式中的比较稳定的、具有核心意义的个性心理特征，是一种与社会相关最密切的人格特征，在性格中包含有许多社会道德含义。",
		answers: [
			"性格"
		],
		isFAQ: true
	},
	{
		question: "调控自己的情绪，使之适时适度地表现出来，即能（）自己。",
		answers: [
			"调控"
		],
		isFAQ: true
	},
	{
		question: "在（）上，我们的家人、老师、同学、朋友那里都可以蕴藏着我们需要的资源。他们或者可以帮我们提供所需的职业信息，或者可以直接给我们提供实习和就业机会，再或者提供经济或情感支持，成为我们坚强的后盾。",
		answers: [
			"职业探索"
		],
		isFAQ: true
	},
	{
		question: "适应性障碍常见于入伍新兵、(  )、移民或灾民之中。",
		answers: [
			"大学新生"
		],
		isFAQ: true
	},
	{
		question: "（）指希望尽可能独立并成功地完成或掌握一些非常困难或极具挑战性事情的动力。",
		answers: [
			"成就动机"
		],
		isFAQ: true
	},
	{
		question: "情绪的心理机制，可以用萨提亚提出的（）来解释",
		answers: [
			"冰山理论"
		],
		isFAQ: true
	},
	{
		question: "自我探索的途径具体可以通过（）、他人评价、专业的测评与咨询、实践活动以及回顾自身成就等多种途径来实现。",
		answers: [
			"自我觉察"
		],
		isFAQ: true
	},
	{
		question: "（）产生于人际互动中，是一个动态的过程，会随着时间而变化，信任过程受到信任者本身与被信任者特点以及二者之间关系的影响和制约。人际信任水平对大学生的人际关系有着重要的影响。",
		answers: [
			"人际信任"
		],
		isFAQ: true
	},
	{
		question: "(  )，指通过研究个体和群体对自身情绪和他人情绪的认识，培养驾驭情绪的能力，并由此产生良好的管理效果。",
		answers: [
			"情绪管理"
		],
		isFAQ: true
	},
	{
		question: "兼职或实习是我们进行职业探索，获得大量有关职业的一手资料的有效方式。也可以获得了解（）的机会，锻炼能力，获得报酬，增长自信。",
		answers: [
			"职场环境"
		],
		isFAQ: true
	},
	{
		question: "人类的动机强度与活动效率之间呈（）曲线关系，中等强度的动机最有利于问题的解决。",
		answers: [
			"倒U形"
		],
		isFAQ: true
	},
	{
		question: "（）的定义是指人们对自身能否利用所拥有的技能去完成某项行为的自信程度。",
		answers: [
			"自我效能感"
		],
		isFAQ: true
	},
	{
		question: "（）是指一种缺乏明显客观原因的内心不安或无根据的恐惧,是人们遇到某些事情如挑战、困难或危险时出现的一种正常的情绪反应。",
		answers: [
			"焦虑"
		],
		isFAQ: true
	},
	{
		question: "焦虑通常情况下与精神打击以及即将来临的、可能造成的威胁或危险相联系，主观表现出感到紧张、(  ),甚至痛苦以至于难以自制，严重时会伴有植物性神经系统功能的变化或失调。",
		answers: [
			"不愉快"
		],
		isFAQ: true
	},
	{
		question: "福格特认为就业力包含社会资本、（）、适应力和职业认同四个部分，其中社会资本、人力资本等是非心理性因素，而生涯规划能力是从心理学和个人角度出发的职业认同和适应能力。",
		answers: [
			"人力资本"
		],
		isFAQ: true
	},
	{
		question: "（）指一个人盼望和追求的目的达到后产生的情绪体验。",
		answers: [
			"快乐"
		],
		isFAQ: true
	},
	{
		question: "（）指的是人类大脑的中间层是边缘系统，负责喜怒哀乐等基本情绪的产生，是人类的情感中心；",
		answers: [
			"情绪脑"
		],
		isFAQ: true
	},
	{
		question: "（）包括需要、动机、兴趣、信念和理想，其中兴趣是核心。",
		answers: [
			"动力系统"
		],
		isFAQ: true
	},
	{
		question: "大学生人际交往中常见的心理困扰是：自卑心理、孤独心理、（）、社交恐惧心理、 猜疑心理和报复心理,以及异性交往困惑。",
		answers: [
			"嫉妒心理"
		],
		isFAQ: true
	},
	{
		question: "个体的（）是由三种比重不同的心理状态构成，这就是Parent（父母）、A#Dult（成人）、Child（儿童）状态。不同的情境下，我们与人沟通会通过面部表情、说话音调、语句结构、姿态行为等表现出不同的侧面，有时候某一状态会成为控制我们人格的主体，使我们在人际交往中表现出父母、成人或儿童的人格特点。",
		answers: [
			"个性"
		],
		isFAQ: true
	},
	{
		question: "积极心理学家克里斯托弗·彼得森和马丁·塞林格曼制定了（）测试性格力量分类手册，列出了24种积极的性格和品格力量。",
		answers: [
			"人格特长"
		],
		isFAQ: true
	},
	{
		question: "人际信任是个体在人际互动过程中建立起来的对交往对象的言词、承诺以及书面或口头陈述的（）的一种心理期望。",
		answers: [
			"可靠程度"
		],
		isFAQ: true
	},
	{
		question: "（）是指人们在社会生活中，通过相互认知、情感互动和交往所形成行为而发展起来的人与人之间的相互关系，反映出人与人之间的心理距离。",
		answers: [
			"人际关系"
		],
		isFAQ: true
	},
	{
		question: "真正有害的不是压力，而是认为“（）”的想法。",
		answers: [
			"压力有害"
		],
		isFAQ: true
	},
	{
		question: "监视情绪时时刻刻的变化，能够察觉某种情绪的出现，（）和审视自己的内心体验。",
		answers: [
			"观察"
		],
		isFAQ: true
	},
	{
		question: "从生涯发展的角度可以把大学分为（）、生涯探索期和生涯决定期三个阶段，每个阶段各自有生涯规划和个人成长两部分的任务。",
		answers: [
			"生涯适应期"
		],
		isFAQ: true
	},
	{
		question: "所谓“以小人之心，度君子之腹”是采用了（）的心理防御方法",
		answers: [
			"投射"
		],
		isFAQ: true
	},
	{
		question: "在人际交往中，个体对交往对象的（）、印象、态度以及情感等，都会直接影响到他们的人际关系。对人际交往中的心理效应的把握有助于建立良好的人际关系。",
		answers: [
			"认知"
		],
		isFAQ: true
	},
	{
		question: "乔志宏等的研究发现，我们能够不断提高的（），包含我们的学业成绩、获奖、实践活动和实习经历，是决定就业成败的核心因素。",
		answers: [
			"人力资本"
		],
		isFAQ: true
	},
	{
		question: "通过调动各种资源对职业有所了解后，我们要按照可得到性和与自我探索匹配的原则，对心仪的职业进行聚焦，通过（）、参观或实习兼职等方式，对目标职业进行深入了解，详细而全面地了解相关信息。",
		answers: [
			"职业访谈"
		],
		isFAQ: true
	},
	{
		question: "生活中各种事件的演变方向和历程，包括人一生中的各种职业和生活角色，以及由此表现出个人独特的（）类型。",
		answers: [
			"自我发展"
		],
		isFAQ: true
	},
	{
		question: "萨维卡斯认为（）就是个体应对社会变化，保持与环境和谐的心理资源。他认为生涯适应力应该包含四个方面的内容：生涯关注 、生涯好奇 、生涯控制、生涯自信 。",
		answers: [
			"生涯适应力"
		],
		isFAQ: true
	},
	{
		question: "（）的作用有：目标导向作用、自我控制作用、内省作用和激励作用",
		answers: [
			"自我意识"
		],
		isFAQ: true
	},
	{
		question: "上网成瘾全称是“互联网成瘾综合症”，是一种（）",
		answers: [
			"心理障碍"
		],
		isFAQ: true
	},
	{
		question: "功能系统包括气质、性格和能力。其中（）是基础，能力是保证。",
		answers: [
			"性格"
		],
		isFAQ: true
	},
	{
		question: "（）指心爱的事物失去时，或理想和愿望破灭时产生的情绪体验。",
		answers: [
			"悲哀"
		],
		isFAQ: true
	},
	{
		question: "（），指在没有人现场监督的情况下,通过自己要求自己，变被动为主动，自觉地遵循法度，拿它来约束自己的一言一行。",
		answers: [
			"自律"
		],
		isFAQ: true
	},
	{
		question: "（）(Thinking Set），也称“惯性思维” ，是由先前的活动而造成的一种对活动的特殊的心理准备状态，或活动的倾向性。",
		answers: [
			"思维定势"
		],
		isFAQ: true
	},
	{
		question: "1948年，WHO提出：“健康不仅是没有（）或不虚弱,而是身体的、心理的和社会适应方面的完美状态”的三维健康观",
		answers: [
			"疾病"
		],
		isFAQ: true
	},
	{
		question: "创造力有不同的层次，心理学家考夫曼和贝格托对于创造力的构成进行了深入的研究，提出了创造力的（），帮助我们理解不同层次水平的创造力表现，也为培养创造力提供了依据。",
		answers: [
			"４C模型"
		],
		isFAQ: true
	},
	{
		question: "科学发展观的基本要求是（    ）。",
		answers: [
			"全面协调可持续"
		],
		isFAQ: false
	},
	{
		question: "近代中国社会各种矛盾中最主要的矛盾是（）。",
		answers: [
			"帝国主义和中华民族的矛盾"
		],
		isFAQ: false
	},
	{
		question: "1927年大革命失败后，党的工作重心开始转向农村，在农村建立革命根据地，则革命根据地能够在中国长期存在和发展的根本原因是(   )。",
		answers: [
			"中国是一个政治、经济、文化皆发展不平衡的半殖民地半封建社会"
		],
		isFAQ: false
	},
	{
		question: "（   ）标志着党探索中国社会主义建设道路的良好开端。",
		answers: [
			"《论十大关系》"
		],
		isFAQ: false
	},
	{
		question: "党的十七大通过的党章把“和谐”与“富强、民主、文明”一起作为社会主义现代化建设的目标写入社会主义初级阶段的基本路线。其原因在于社会和谐是（    ）。",
		answers: [
			"中国特色社会主义的本质属性"
		],
		isFAQ: false
	},
	{
		question: "科学发展观第一要义是（     ）。",
		answers: [
			"发展"
		],
		isFAQ: false
	},
	{
		question: "全面深化改革的总目标是（     ）。",
		answers: [
			"完善和发展中国特色社会主义制度，推进国家治理体系和治理能力现代化"
		],
		isFAQ: false
	},
	{
		question: "邓小平明确指出：“改革是中国的第二次革命”，社会主义改革的性质是（     ）。",
		answers: [
			"社会主义制度的自我完善和发展"
		],
		isFAQ: false
	},
	{
		question: "党在新时代的强军目标是（    ）。",
		answers: [
			"建设一支听党指挥、能打胜仗、作风优良的人民军队"
		],
		isFAQ: false
	},
	{
		question: "马克思主义中国化第一次历史性飞跃的理论成果是(  )。",
		answers: [
			"毛泽东思想"
		],
		isFAQ: false
	},
	{
		question: "《论十大关系》中毛泽东提出社会建设的基本方针是（     ）。",
		answers: [
			"调动一切积极因素为社会主义事业服务"
		],
		isFAQ: false
	},
	{
		question: "毛泽东提出社会主义社会基本矛盾和两类不同性质矛盾学说的著作是（ ）。",
		answers: [
			"《关于正确处理人民内部矛盾的问题》"
		],
		isFAQ: false
	},
	{
		question: "党的十九大报告提出了新时代党的建设的总要求，其中，作为新时代党的建设的主线的是（     ）。",
		answers: [
			"加强党的长期执政能力建设、先进性和纯洁性建设"
		],
		isFAQ: false
	},
	{
		question: "社会主义核心价值观中，社会层面的价值追求是（     ）。",
		answers: [
			"自由、平等、公正、法治"
		],
		isFAQ: false
	},
	{
		question: "“和平统一、一国两制”构想最早是针对（     ）提出来的。",
		answers: [
			"台湾问题"
		],
		isFAQ: false
	},
	{
		question: "中国共产党将“三个代表”重要思想作为党的指导思想写入党章是在（    ）。",
		answers: [
			"党的十六大"
		],
		isFAQ: false
	},
	{
		question: "中国共产党区别于其他一切政党的根本标志（     ）。",
		answers: [
			"把为人民服务作为自己的最高原则"
		],
		isFAQ: false
	},
	{
		question: "毛泽东思想和中国特色社会主义理论体系是马克思主义中国化的两大理论成果，贯穿这两大理论成果始终，并体现在两大理论成果各个基本观点中的世界观和方法论的基础是（）。",
		answers: [
			"实事求是"
		],
		isFAQ: false
	},
	{
		question: "把社会主义市场经济体制确定为我国经济体制改革目标是在党的（    ）。",
		answers: [
			"十四大"
		],
		isFAQ: false
	},
	{
		question: "新民主主义社会是（  ）。",
		answers: [
			"过渡性的社会"
		],
		isFAQ: false
	},
	{
		question: "中国外交政策的宗旨是（    ）。",
		answers: [
			"维护世界和平，促进共同发展"
		],
		isFAQ: false
	},
	{
		question: "人民军队建军之本、强军之魂是(  )。",
		answers: [
			"党对军队的绝对领导"
		],
		isFAQ: false
	},
	{
		question: "党在过渡时期总路线的实质是（      ）。",
		answers: [
			"改变生产资料的私有制"
		],
		isFAQ: false
	},
	{
		question: "第一次提出“马克思主义中国化”的会议是（     ）。",
		answers: [
			"六届六中全会"
		],
		isFAQ: false
	},
	{
		question: "在中国共产党的历史上，（ ）第一个明确提出了“马克思主义中国化”的  科学命题和重大任务，深刻论证了马克思主义中国化的必要性和极端重要性。",
		answers: [
			"毛泽东"
		],
		isFAQ: false
	},
	{
		question: "新民主主义社会中，处于十字路口的经济成分是（ ）。",
		answers: [
			"个体经济"
		],
		isFAQ: false
	},
	{
		question: "党政军民学，东西南北中，党是领导一切的。必须增强(   )，自觉维护党中央权威和集中统一领导，自觉在思想上政治上行动上同党中央保持高度一致。",
		answers: [
			"政治意识、大局意识、核心意识、看齐意识"
		],
		isFAQ: false
	},
	{
		question: "新民主主义革命的基本问题是（     ）。",
		answers: [
			"农民问题"
		],
		isFAQ: false
	},
	{
		question: "中国特色社会主义的总布局是（  ）。",
		answers: [
			"经济、政治、文化、社会、生态文明建设“五位一体”"
		],
		isFAQ: false
	},
	{
		question: "邓小平曾用东西南北四个字来比喻时代主题，其中（ ）是核心问题。",
		answers: [
			"南北问题"
		],
		isFAQ: false
	},
	{
		question: "过渡时期总路线可以概括为（ ）。",
		answers: [
			"一化三改"
		],
		isFAQ: false
	},
	{
		question: "我国发展的新的历史方位是（    ）。",
		answers: [
			"中国特色社会主义进入新时代"
		],
		isFAQ: false
	},
	{
		question: "社会主义初级阶段是指（  ）。",
		answers: [
			"我国在生产力落后、商品经济不发达条件下建设社会主义必然要经历的特定历史阶段"
		],
		isFAQ: false
	},
	{
		question: "社会主义核心价值观中，公民层面的价值追求是（   　）。",
		answers: [
			"爱国、敬业、诚信、友善"
		],
		isFAQ: false
	},
	{
		question: "新世纪以来，我国经济和社会发展呈现出一系列新的阶段性特征，但是，这些新的阶段性特征的出现并没有改变我国仍处于社会主义初级阶段这一基本事实。这表明，社会主义初级阶段是（  ）。",
		answers: [
			"长期性与阶段性的动态发展过程"
		],
		isFAQ: false
	},
	{
		question: "我国根本政治制度是（      ）。",
		answers: [
			"人民代表大会制度"
		],
		isFAQ: false
	},
	{
		question: "“发展才是硬道理”、“发展是党执政兴国的第一要务”、“发展是解决中国一切问题的总钥匙”，这是对社会主义建设历史经验的深刻总结。中国解决所有问题的关键是要靠自己的发展，而发展的根本目的是（ ）。",
		answers: [
			"使人民共享发展成果，实现共同富裕"
		],
		isFAQ: false
	},
	{
		question: "社会主义民主政治的本质和核心是（   ）。",
		answers: [
			"人民当家作主"
		],
		isFAQ: false
	},
	{
		question: "台湾问题性质不同于香港问题和澳门问题，台湾问题的实质是（  ）。",
		answers: [
			"中国的内政问题"
		],
		isFAQ: false
	},
	{
		question: "把毛泽东思想确立为党的指导思想是在(  )。",
		answers: [
			"中共七大"
		],
		isFAQ: false
	},
	{
		question: "近代中国的社会性质和主要矛盾，决定了中国革命的性质是（ 　）。",
		answers: [
			"资产阶级民主革命"
		],
		isFAQ: false
	},
	{
		question: "新民主主义经济纲领中极具特色的一项内容是（     ）。",
		answers: [
			"保护民族工商业"
		],
		isFAQ: false
	},
	{
		question: "邓小平在领导改革开放和现代化建设这一新的革命过程中，不断提出和反复  思考的首要的基本的理论问题是（ ）。",
		answers: [
			"什么是社会主义、怎样建设社会主义"
		],
		isFAQ: false
	},
	{
		question: "党的十九大报告指出，中国特色社会主义进入新时代，我国社会主要矛盾已经转化为（     ）。",
		answers: [
			"人民日益增长的美好生活需要同不平衡不充分的发展之间的矛盾"
		],
		isFAQ: false
	},
	{
		question: "（    ）是决定当代中国命运的关键抉择。",
		answers: [
			"改革开放"
		],
		isFAQ: false
	},
	{
		question: "邓小平提出的“三步走”发展战略的第三步是（  　）。",
		answers: [
			"到21世纪中叶，国民生产总值比20世纪末再翻两番，达到中等发达国家水平基本实现现代化"
		],
		isFAQ: false
	},
	{
		question: "1957年毛泽东在《关于正确处理人民内部矛盾的问题》中指出，人民内部矛盾如果处理不当，会变成（ ）。",
		answers: [
			"对抗性的敌我矛盾"
		],
		isFAQ: false
	},
	{
		question: "党的十九大报告指出，中国特色社会主义取得重大理论创新成果，形成了（    ）。",
		answers: [
			"习近平新时代中国特色社会主义思想"
		],
		isFAQ: false
	},
	{
		question: "邓小平首次明确指出：“把马克思主义的普遍真理同我国的具体实际结合起来， 走自己的道路，建设有中国特色的社会主义，这就是我们总结长期历史经验得出的基本结论”，是在党的（  ）。",
		answers: [
			"十二大开幕词中"
		],
		isFAQ: false
	},
	{
		question: "中国革命的中心问题是（    ）。",
		answers: [
			"无产阶级的领导权"
		],
		isFAQ: false
	},
	{
		question: "（  ）成为时代主题是邓小平理论形成的时代背景。",
		answers: [
			"和平与发展"
		],
		isFAQ: false
	},
	{
		question: "（     ）标志着中国长达数千年的阶级剥削制度的结束和社会主义基本制度的确立。",
		answers: [
			"1956年底三大改造基本完成"
		],
		isFAQ: false
	},
	{
		question: "中国特色社会主义最本质的特征是（     ）。",
		answers: [
			"中国共产党的领导"
		],
		isFAQ: false
	},
	{
		question: "我国实现对资本主义工商业进行社会主义改造采取的方式是（     ）。",
		answers: [
			"和平赎买"
		],
		isFAQ: false
	},
	{
		question: "中国特色社会主义制度的最大优势是（     ）。",
		answers: [
			"党的领导"
		],
		isFAQ: false
	},
	{
		question: "毛泽东思想的精髓是（   ）。",
		answers: [
			"实事求是"
		],
		isFAQ: false
	},
	{
		question: "社会主义市场经济理论认为，计划经济和市场经济属于（     ）。",
		answers: [
			"不同的资源配置方式"
		],
		isFAQ: false
	},
	{
		question: "确立毛泽东在党中央领导地位的是（    ）。",
		answers: [
			"遵义会议"
		],
		isFAQ: false
	},
	{
		question: "党的十九大提出第二个一百年奋斗目标是（     ）。",
		answers: [
			"到本世纪中叶建成社会主义现代化强国"
		],
		isFAQ: false
	},
	{
		question: "新民主主义社会的五种经济成分中处于领导地位的是（ ）。",
		answers: [
			"国营经济"
		],
		isFAQ: false
	},
	{
		question: "我国对资本主义工商业进行社会主义改造的经验有",
		answers: [
			"严格区别官僚资本和民族资本的界限,实行了和平赎买,和平地实现了和平关系的深刻变革",
			"创造了国家资本主义的多种形式,采取了由低级到高级逐步过渡的形势",
			"把对企业的改造和对资本家的改造结合起来,把资本家改造成自食其力的劳动者"
		],
		isFAQ: false
	},
	{
		question: "毛泽东思想的科学内涵是",
		answers: [
			"马克思列宁主义在中国的运用和发展",
			"中国共产党集体智慧的结晶",
			"被实践证明了的关于中国革命和建设的正确的理论原则和经验总结"
		],
		isFAQ: false
	},
	{
		question: "体现毛泽东思想得到多方面展开而趋于成熟的著作主要有",
		answers: [
			"《新民主主义论》",
			"《矛盾论》、《实践论》",
			"《中国革命和中国共产党》、《论联合政府》",
			""
		],
		isFAQ: false
	},
	{
		question: "习近平新时代中国特色社会主义思想的历史地位包括",
		answers: [
			"实现中华民族伟大复兴的行动指南",
			"马克思主义中国化的最新成果",
			"党和国家必须长期坚持并不断发展的指导思想",
			"新时代的精神旗帜"
		],
		isFAQ: false
	},
	{
		question: "全面推进依法治国，总目标是",
		answers: [
			"建设中国特色社会主义法治体系",
			"建设社会主义法治国家"
		],
		isFAQ: false
	},
	{
		question: "“三个代表”的相互关系是",
		answers: [
			"发展先进生产力,是发展先进文化的、实现最广大人民根本利益的基础和前提",
			"发展先进文化,是发展先进生产力和实现最广大人民根本利益的重要思想保证",
			"发展先进生产力和先进文化,归根到底都是为了实现最广大人民的根本利益",
			"三者是统一的整体,相互联系,相互促进"
		],
		isFAQ: false
	},
	{
		question: "科学发展观的集中概括为",
		answers: [
			"第一要义是发展",
			"核心立场是以人为本",
			"基本要求是全面协调可持续",
			"根本方法是统筹兼顾"
		],
		isFAQ: false
	},
	{
		question: "毛泽东认为,中国资产阶级包括",
		answers: [
			"大资产阶级(或买办资产阶级)",
			"民族资产阶级"
		],
		isFAQ: false
	},
	{
		question: "中国梦是（ ）的梦，与世界各国人民的美好梦想息息相通，中国人民愿意同各国人民在实现各自梦想的过程中相互支持、相互帮助。",
		answers: [
			"和平",
			"共赢",
			"合作",
			"发展"
		],
		isFAQ: false
	},
	{
		question: "中国革命统一战线中的两个联盟是",
		answers: [
			"工人阶级同农民、小资产阶级等其他劳动者之间的联盟",
			"工人阶级同可以合作的非劳动者之间的联盟"
		],
		isFAQ: false
	},
	{
		question: "标志着毛泽东思想初步形成的重要文章主要有",
		answers: [
			"《中国的红色政权为什么能够存在?》",
			"《井冈山的斗争》",
			"《星星之火可以燎原》",
			"《反对本本主义》"
		],
		isFAQ: false
	},
	{
		question: "邓小平对时代主题的转变作出了科学判断,指出全球性战略问题有",
		answers: [
			"和平问题,也称东西问题",
			"发展问题,也称南北问题"
		],
		isFAQ: false
	},
	{
		question: "无产阶级及其政党要实现自己对同盟者的领导,必须具备的条件是",
		answers: [
			"率领被领导者向着共同的敌人作坚决斗争并取得胜利",
			"对被领导者给以物质利益,至少不损害其利益,同时给以政治教育"
		],
		isFAQ: false
	},
	{
		question: "习近平强调坚定“四个自信”，下面正确的有",
		answers: [
			"文化自信",
			"制度自信",
			"理论自信"
		],
		isFAQ: false
	},
	{
		question: "近代中国社会的阶级结构是“两头小中间大”,“两头”是指",
		answers: [
			"无产阶级",
			"地主大资产阶级"
		],
		isFAQ: false
	},
	{
		question: "邓小平关于社会主义本质的概括",
		answers: [
			"遵循了科学社会主义的基本原则,反映了人民的利益和时代的要求,,",
			"廓清了不合乎时代进步和社会发展规律的模糊观念",
			"摆脱了长期以来拘泥于具体模式而忽略社会主义本质的错误倾向",
			"深化了对科学社会主义的认识"
		],
		isFAQ: false
	},
	{
		question: "社会主义核心价值体系的基本内容",
		answers: [
			"马克思主义指导思想",
			"中国特色社会主义共同理想",
			"以爱国主义为核心的民族精神和以改革创新为核心的时代精神",
			"社会主义荣辱观"
		],
		isFAQ: false
	},
	{
		question: "社会主义核心价值观的主要内容是",
		answers: [
			"富强、民主、文明、和谐",
			"自由、平等、公正、法治",
			"爱国、敬业、诚信、友善"
		],
		isFAQ: false
	},
	{
		question: "推进中国特色社会主义法治体系建设,要做到",
		answers: [
			"完善以宪法为核心的中国特色社会主义法律体系",
			"建立严密的法治监督体系",
			"进一步健全法治保障体系",
			"加强党内法规制度建设"
		],
		isFAQ: false
	},
	{
		question: "面对资源约束趋紧、环境污染严重、生态系统退化的严峻形势，必须树立（ ）的生态文明理念。",
		answers: [
			"尊重自然",
			"顺应自然",
			"保护自然"
		],
		isFAQ: false
	},
	{
		question: "在新民主主义社会中,主要的经济成分有哪几种",
		answers: [
			"个体经济",
			"社会主义经济",
			"资本主义经济"
		],
		isFAQ: false
	},
	{
		question: "第一次国内革命战争时期,毛泽东提出的新民主主义革命基本思想主要体现在以下著作中",
		answers: [
			"《中国社会各阶级的分析》",
			"《湖南农民运动考察报告》"
		],
		isFAQ: false
	},
	{
		question: "毛泽东思想继续得到发展是在",
		answers: [
			"解放战争时期",
			"中华人民共和国建立后"
		],
		isFAQ: false
	},
	{
		question: "毛泽东思想的活的灵魂是",
		answers: [
			"实事求是",
			"群众路线",
			"独立自主"
		],
		isFAQ: false
	},
	{
		question: "中国共产党在中国革命中战胜敌人的三个法宝是",
		answers: [
			"统一战线",
			"武装斗争",
			"党的建设"
		],
		isFAQ: false
	},
	{
		question: "中国梦是（ ）相统一的梦。",
		answers: [
			"国家情怀",
			"人民情怀",
			"民族情怀"
		],
		isFAQ: false
	},
	{
		question: "习近平强调中国特色社会主义是既坚持科学社会主义基本原则，又具有的特色包括",
		answers: [
			"民族特色",
			"实践特色",
			"理论特色"
		],
		isFAQ: false
	},
	{
		question: "通过共建“一带一路”,实现沿线各国( )发展。",
		answers: [
			"多元",
			"平衡",
			"自主",
			"可持续"
		],
		isFAQ: false
	},
	{
		question: "科学发展观同邓小平理论、“三个代表”重要思想,面对着共同的时代课题,面临着共同的历史任务,都",
		answers: [
			"贯穿了中国特色社会主义这个主题",
			"坚持辩证唯物主义和历史唯物主义的世界观方法论",
			"坚持党的最高纲领和最低纲领的统一",
			"坚持代表最广大人民根本利益"
		],
		isFAQ: false
	},
	{
		question: "邓小平南方谈话中提出“三个有利于”标准",
		answers: [
			"是否有利于发展社会主义社会的生产力",
			"是否有利于增强社会主义国家的综合国力",
			"是否有利于提高人民的生活水平"
		],
		isFAQ: false
	},
	{
		question: "简述坚持和发展中国特色社会主义的总任务。",
		answers: [
			"实现社会主义现代化和中华民族伟大复兴，在全面建成小康社会的基础上，分两步走在本世纪中叶建成富强民主文明和谐美丽的社会主义现代化强国。"
		],
		isFAQ: true
	},
	{
		question: "简述社会主义基本制度确立的意义。",
		answers: [
			"（1）社会主义基本制度的确立是中国历史上最深刻最伟大的社会变革，为当代中国一切发展奠定了制度基础，也为中国特色社会主义制度的创新和发展提供了重要条件。 （2）社会主义基本制度的确立，极大地提高了工人阶级和广大劳动人民的积极性和创造性，极大地促进了我国社会主义生产力的发展。 （3）社会主义基本制度的确立，使广大劳动人民真正成为国家的主人。 （4）社会主义基本制度的确立，使占世界人口1/4的东方大国进入了社会主义社会，这是世界社会主义发展史上又一个历史性的伟大胜利。 （5）社会主义基本制度的确立，是以毛泽东为主要代表的中国共产党人对一个脱胎于半殖民半封建的东方大国如何进行社会主义革命问题的系统回答和正确解决，是马克思主义关于社会主义革命理论在中国的正确运用和创造性发展成果。"
		],
		isFAQ: true
	},
	{
		question: "怎样科学认识毛泽东思想的历史地位？",
		answers: [
			"（1）毛泽东思想是马克思主义中国化的第一个理论成果，它实现了马克思主义中国化的第一次历史性飞跃，为中国特色社会主义理论体系的形成奠定了理论基础（2）中国革命和建设的科学指南，在毛泽东思想的指引下，党领导人民建立中华人民共和国，为社会主义现代化建设奠定了物质基础（3）中国共产党和中国人民宝贵的精神财富。"
		],
		isFAQ: true
	},
	{
		question: "简述新民主主义革命时期的基本纲领。",
		answers: [
			"新民主主义的政治纲领是推翻帝国主义和封建主义的统治，建立一个无产阶级领导的、以工农联盟为基础的、各革命阶级联合专政的新民主主义的共和国。新民主主义的经济纲领是没收封建地主阶级的土地归农民所有，没收官僚资本归新民主主义国家所有，保护民族工商业。新民主主义的文化纲领是新民主主义文化是民族的、科学的、大众的。"
		],
		isFAQ: true
	},
	{
		question: "简述“科学发展观”的科学内涵。",
		answers: [
			"科学发展观，第一要义是发展，核心立场是以人为本，基本要求是全面协调可持续，根本方法是统筹兼顾。"
		],
		isFAQ: true
	},
	{
		question: "“三个代表”重要思想的核心观点。",
		answers: [
			"中国共产党始终代表中国先进生产力的发展要求；中国共产党始终代表中国先进文化的前进方向；中国共产党始终代表中国最广大人民的根本利益。"
		],
		isFAQ: true
	},
	{
		question: "简述“新时代”的科学内涵。",
		answers: [
			"从历史脉络看，新时代是承前启后、继往开来、在新的历史条件下继续夺取中国特色社会主义伟大胜利的时代。 从实践主题看，新时代是决胜全面建成小康社会、进而全面建设社会主义现代化强国的时代。 从人民性来看，新时代是全国各族人民团结奋斗、不断创造美好生活、逐步实现全体人民共同富裕的时代。 从民族性来看，新时代是全体中华儿女勠力同心、奋力实现中华民族伟大复兴中国梦的时代。 从世界性来看，新时代是我国日益走近世界舞台中央、不断为人类作出更大贡献的时代。"
		],
		isFAQ: true
	},
	{
		question: "简述“四个全面”战略布局的内容。",
		answers: [
			"“四个全面”战略布局的内容是全面建设社会主义现代化国家、全面深化改革开放、全面依法治国、全面从严治党。"
		],
		isFAQ: true
	},
	{
		question: "简述百年未有之大变局的具体表现。",
		answers: [
			"百年未有之大变局的具体表现：一是世界经济版图发生的深刻变化前所未有，新兴经济体和发展中国家在世界经济中占据越来越大的份额，世界经济重心加快“自西向东”位移。二是新一轮科技革命和产业变革带来的新陈代谢和激烈竞争前所未有，深刻改变人类社会生产生活方式和思维方式，推动生产关系变革，给国际格局和国际体系带来广泛深远影响。三是国际力量对比发生的革性变化前所未有，发达国家内部矛盾重重、实力相对下降，一大批发展中国家群体性崛起，成为影响国际政治经济格局的重要力量。四是全球治理体系的不适应、不对称前所未有，西方发达国家主导的国际政治经济秩序越来越难以为继，发展中国家在国际事务中的代表性和发言权不断扩大，全球治理越来越向着更加公平合理的方向发展。五是人类前途命运的休戚与共前所未有，各国相互联系和彼此依存比过去任何时候都更频繁、更紧密，整个世界日益成为你中有我、我中有你的人类命运共同体。"
		],
		isFAQ: true
	},
	{
		question: "简述党在社会主义初级阶段的基本路线的基本内容。",
		answers: [
			"领导和团结全国各族人民，以经济建设为中心，坚持四项基本原则，坚持改革开放，自力更生，艰苦创业，为把我国建设成为富强、民主、文明、和谐、美丽的社会主义现代化强国而奋斗。"
		],
		isFAQ: true
	},
	{
		question: "怎样理解社会主义的本质？",
		answers: [
			"社会主义本质是解放生产力，发展生产力，消灭剥削消除两极分化，最终达到共同富裕。社会主义的本质回答了什么是社会主义，怎样建设社会主义的基本问题。"
		],
		isFAQ: true
	},
	{
		question: "简述“和平统一、一国两制”构想的基本内容。",
		answers: [
			"（1）一个中国。这是“和平统一、一国两制”的核心，是发展两岸关系和实现和平统一的基础。（2）两制并存。在祖国统一的前提下，国家的主体部分实行社会主义制度，同时在台湾、香港、澳门保持原有的社会制度和生活方式长期不变。（3）高度自治。祖国完全统一后，台湾、香港、澳门作为特别行政区，享有不同于中国其他省、市自治区的高度自治权。（4）尽最大努力争取和平统一，但不承诺放弃使用武力。（5）解决台湾问题，实现祖国的完全统一，寄希望于台湾人民。"
		],
		isFAQ: true
	},
	{
		question: "This morning Jack came to school late （）.",
		answers: [
			"as usual"
		],
		isFAQ: false
	},
	{
		question: "This washing machine factory has introduced a ( ) technological innovation making the job of housewives easier.",
		answers: [
			"unique"
		],
		isFAQ: false
	},
	{
		question: "You don’t have to sacrifice environmental protection to （） economic growth.",
		answers: [
			"promote"
		],
		isFAQ: false
	},
	{
		question: "She may not be the most interesting speaker, but what she said （） make a lot of sense.",
		answers: [
			"does"
		],
		isFAQ: false
	},
	{
		question: "Racial （）against the black people is an old problem in America which can be traced back to the colonial time.",
		answers: [
			"discrimination"
		],
		isFAQ: false
	},
	{
		question: "The company will send a representative to （） their business in that region.",
		answers: [
			"attend to"
		],
		isFAQ: false
	},
	{
		question: "We’re just trying to reach a point （）both sides will sit down together and talk.",
		answers: [
			"where"
		],
		isFAQ: false
	},
	{
		question: "In Britain the （） on a letter is now twelve pence.",
		answers: [
			"Postage"
		],
		isFAQ: false
	},
	{
		question: "No incoming freshman has applied for financial aid( ).(as yet)",
		answers: [
			"by now"
		],
		isFAQ: false
	},
	{
		question: "The boss asked her to （） of the office for a few days while he was away.",
		answers: [
			"take charge"
		],
		isFAQ: false
	},
	{
		question: "15.When you make travel plans, you’d better  （ ） that every flight can be late.",
		answers: [
			"assume"
		],
		isFAQ: false
	},
	{
		question: "Visitors were amazed （） the achievements in the car manufacture of the city during the past decade.",
		answers: [
			"at"
		],
		isFAQ: false
	},
	{
		question: "I have no idea （）will be invited to the meeting.",
		answers: [
			"who"
		],
		isFAQ: false
	},
	{
		question: "He is so sick today that he does not （） having anything to eat.",
		answers: [
			"feel like"
		],
		isFAQ: false
	},
	{
		question: "he failed, he won’t give up his ideals. （） he failed, he won’t give up his ideals.",
		answers: [
			"Even if"
		],
		isFAQ: false
	},
	{
		question: "Burning waste （）energy that can be used for electric power or heating.",
		answers: [
			"yields"
		],
		isFAQ: false
	},
	{
		question: "The newly-discovered medicine had its （） only on ordinary colds.",
		answers: [
			"effect"
		],
		isFAQ: false
	},
	{
		question: "Complete projects must be （）by March.",
		answers: [
			"submitted"
		],
		isFAQ: false
	},
	{
		question: "The population level in this area has （） during the past 12 years.",
		answers: [
			"exploded"
		],
		isFAQ: false
	},
	{
		question: "We've （） sugar. Ask Mary to lend us some.",
		answers: [
			"run out of"
		],
		isFAQ: false
	},
	{
		question: "These clauses form part of the （） between buyer and seller.",
		answers: [
			"contract"
		],
		isFAQ: false
	},
	{
		question: "He’s been talking for more than two hours, I （） wish he would stop talking.",
		answers: [
			"do"
		],
		isFAQ: false
	},
	{
		question: "The social work （） by the club is just as important as the cultural or sporting side.",
		answers: [
			"undertaken"
		],
		isFAQ: false
	},
	{
		question: "The shoes are correctly placed on the shelf （） size and colour.",
		answers: [
			"as to"
		],
		isFAQ: false
	},
	{
		question: "Talking, dancing, playing a game all of these activities allow you to（）with other people.",
		answers: [
			"interact"
		],
		isFAQ: false
	},
	{
		question: "The old man was seriously ill and he was in （） need of treatment.",
		answers: [
			"urgent"
		],
		isFAQ: false
	},
	{
		question: "“Of course I’m （）; 2-10, there’s no defense for that, particularly when expectations were so high,” the coach said.",
		answers: [
			"embarrassed"
		],
		isFAQ: false
	},
	{
		question: "There is a chance for Republicans to （） the chamber for the first time in more than 40 years.",
		answers: [
			"take control of"
		],
		isFAQ: false
	},
	{
		question: "13.There is no doubt that human activity has something to do with climate change, and climate will continue to change unless we（） our carbon emissions.",
		answers: [
			"reduce"
		],
		isFAQ: false
	},
	{
		question: "In the 1930s, millions of Ukrainians （）to death or were deported.",
		answers: [
			"starved"
		],
		isFAQ: false
	},
	{
		question: "They are proposing a （） reform of the tax system.",
		answers: [
			"radical"
		],
		isFAQ: false
	},
	{
		question: "Much to my annoyance, whenever I （）her, she always comes up with an excuse.",
		answers: [
			"criticize"
		],
		isFAQ: false
	},
	{
		question: "She is attracted by the （） features of the landscape.",
		answers: [
			"outstanding"
		],
		isFAQ: false
	},
	{
		question: "He is prone to （） his temper when people disagree with him.",
		answers: [
			"lose"
		],
		isFAQ: false
	},
	{
		question: "His mother did（）she could to help him with his study.",
		answers: [
			"all"
		],
		isFAQ: false
	},
	{
		question: "Property is defined （） the rights a person has to the use and disposition of an object.",
		answers: [
			"concerning"
		],
		isFAQ: false
	},
	{
		question: "This kind of material is （） that one.",
		answers: [
			"far superior to"
		],
		isFAQ: false
	},
	{
		question: "When you read the newspaper, you’re probably not reading it word-by-word, instead you’re （） the text.",
		answers: [
			"scanning"
		],
		isFAQ: false
	},
	{
		question: "Tom’s parents died when he was a child, so he was （） by his relatives.",
		answers: [
			"brought up"
		],
		isFAQ: false
	},
	{
		question: "Mr. Martin is too busy to spare any time （） Sunday afternoon.",
		answers: [
			"except on"
		],
		isFAQ: false
	},
	{
		question: "He was afraid he would have to （） her invitation to the party.",
		answers: [
			"decline"
		],
		isFAQ: false
	},
	{
		question: "In one of my first articles（）on LinkedIn, I wrote about the importance of public speaking to every leader.",
		answers: [
			"published"
		],
		isFAQ: false
	},
	{
		question: "There is much chance （）Bill will recover from his injury in time for the race.",
		answers: [
			"that"
		],
		isFAQ: false
	},
	{
		question: "One of the first flight training lessons taught to student pilots is how to perform a(n)（） landing in a small airplane.",
		answers: [
			"emergency"
		],
		isFAQ: false
	},
	{
		question: "Although he claims to have left his job voluntarily, he was actually （） for misconduct.",
		answers: [
			"dismissed"
		],
		isFAQ: false
	},
	{
		question: "It is a kind of （） plane.",
		answers: [
			"up-to-date"
		],
		isFAQ: false
	},
	{
		question: "The question （）we ought to call in an expert remains to be discussed.",
		answers: [
			"whether"
		],
		isFAQ: false
	},
	{
		question: "All flights have been （） due to the bad weather.",
		answers: [
			"cancelled"
		],
		isFAQ: false
	},
	{
		question: "She didn’t remember （） him before.",
		answers: [
			"having met"
		],
		isFAQ: false
	},
	{
		question: "She is due to（） a speech on genetic engineering.",
		answers: [
			"deliver"
		],
		isFAQ: false
	},
	{
		question: "From our perspective there is （） that women in government drive policy for women.",
		answers: [
			"no doubt"
		],
		isFAQ: false
	},
	{
		question: "He （） why people built ugly homes when they could have beautiful ones.",
		answers: [
			"wondered"
		],
		isFAQ: false
	},
	{
		question: "In the hot sun the surface of the road seems wet, but that is only a(n) （）.",
		answers: [
			"illusion"
		],
		isFAQ: false
	},
	{
		question: "14.If one want to （） the possibilities of Europe’s political future, one needs to examine the development of European culture.",
		answers: [
			"explore"
		],
		isFAQ: false
	},
	{
		question: "She became （） her father’s drug use as she neared high school graduation.",
		answers: [
			"aware of"
		],
		isFAQ: false
	},
	{
		question: "The （）soldiers lost their lives so that peace might reign again.",
		answers: [
			"gallant"
		],
		isFAQ: false
	},
	{
		question: "（） had the supermarket opened than people were flocking to shop there.",
		answers: [
			"No sooner"
		],
		isFAQ: false
	},
	{
		question: "“In my view, all of the （） shown in this video require independent investigation,” Melzer said in an interview.",
		answers: [
			"incidents"
		],
		isFAQ: false
	},
	{
		question: "The other day, my brother drove his car down the street at （） I thought was a dangerous speed.",
		answers: [
			"what"
		],
		isFAQ: false
	},
	{
		question: "The paintings come from his private（）.",
		answers: [
			"collection"
		],
		isFAQ: false
	},
	{
		question: "The river here is very wide but （） , so you can walk across it.",
		answers: [
			"shallow"
		],
		isFAQ: false
	},
	{
		question: "12.In a recent study, more than 20% of drivers said they cannot resist the（）to send or check messages while driving.",
		answers: [
			"urge"
		],
		isFAQ: false
	},
	{
		question: "On his retirement, his colleges （） him with a set of golf clubs.",
		answers: [
			"presented"
		],
		isFAQ: false
	},
	{
		question: "The dwarf sees farther that the （ ） when he stands on the latter’s shoulder.",
		answers: [
			"giant"
		],
		isFAQ: false
	},
	{
		question: "Students should （）their own interests, as well as do their school work.",
		answers: [
			"pursue"
		],
		isFAQ: false
	},
	{
		question: "She （） in horror when she saw me.",
		answers: [
			"exclaimed"
		],
		isFAQ: false
	},
	{
		question: "Let me know if any difficulties（）.",
		answers: [
			"arise"
		],
		isFAQ: false
	},
	{
		question: "The ceremony lasted two hours and we had to stand （）.",
		answers: [
			"throughout"
		],
		isFAQ: false
	},
	{
		question: "I didn’t know much about him but I told her （）                                I knew.",
		answers: [
			"what"
		],
		isFAQ: false
	},
	{
		question: "Information has been put forward （） more middle school graduates will be admitted into universities.",
		answers: [
			"that"
		],
		isFAQ: false
	},
	{
		question: "Because of the heavy rain, the game was put （） for a few days.",
		answers: [
			"off"
		],
		isFAQ: false
	},
	{
		question: "The ads are intended to improve the company’s （）.",
		answers: [
			"image"
		],
		isFAQ: false
	},
	{
		question: "In a typhoon, winds （） a speed greater than 120kms per hour.",
		answers: [
			"attain"
		],
		isFAQ: false
	},
	{
		question: "It was with great joy （）he received the news （）the IOC had chosen China to host the 2008 Olympic Games.",
		answers: [
			"that、 that"
		],
		isFAQ: false
	},
	{
		question: "After admitting she still loves him, she （）asks him to leave.",
		answers: [
			"nonetheless"
		],
		isFAQ: false
	},
	{
		question: "The name of the novel is on the （） of my tongue.",
		answers: [
			"tip"
		],
		isFAQ: false
	},
	{
		question: "Order all your camping（）online today, everything you need to make a camping trip easier and more enjoyable!",
		answers: [
			"stuff"
		],
		isFAQ: false
	},
	{
		question: "Betty has been on a diet for a long time, but she looks a bit heavier,().",
		answers: [
			"if anything"
		],
		isFAQ: false
	},
	{
		question: "His writing has improved but there is still （）                                for improvement.",
		answers: [
			"room"
		],
		isFAQ: false
	},
	{
		question: "I don’t think the charge for overhauling the equipment is excessive in （） to its size.",
		answers: [
			"proportion"
		],
		isFAQ: false
	},
	{
		question: "This is the only way to deal with the （）of drug dealing.",
		answers: [
			"menace"
		],
		isFAQ: false
	},
	{
		question: "The news quickly spread through the village （）                            the war had ended.",
		answers: [
			"that"
		],
		isFAQ: false
	},
	{
		question: "While Facebook remains the most popular social ()site, its growth has gradually slowed down.",
		answers: [
			"media"
		],
		isFAQ: false
	},
	{
		question: "We adhere （） the principles of equal rights and freedom of expression for all.",
		answers: [
			"to"
		],
		isFAQ: false
	},
	{
		question: "He didn’t （）successfully into the Italian way of life.",
		answers: [
			"integrate"
		],
		isFAQ: false
	},
	{
		question: "--It’s thirty years since we last met. --But I still remember the story, believe it or not, （） we got lost on a rainy night.",
		answers: [
			"that"
		],
		isFAQ: false
	},
	{
		question: "Keeping your laptop plugged（） all the time will kill its battery faster.",
		answers: [
			"in"
		],
		isFAQ: false
	},
	{
		question: "A giant panda （） twins at Toronto Zoo.",
		answers: [
			"gave birth to"
		],
		isFAQ: false
	},
	{
		question: "Of all the things my grandma used to say, I remember this best of all — everything you worry about will( ) all right.",
		answers: [
			"turn out"
		],
		isFAQ: false
	},
	{
		question: "This exercise is （） from Book V of English for Today and absolutely meets our needs.",
		answers: [
			"adapted"
		],
		isFAQ: false
	},
	{
		question: "Professor Liu （） all his students with his great knowledge of history.",
		answers: [
			"impressed"
		],
		isFAQ: false
	},
	{
		question: "Movie ticket prices have reached an all-time high（）some people choose instead to watch movies at home.",
		answers: [
			"No wonder"
		],
		isFAQ: false
	},
	{
		question: "The （）talk of marriage put tension on their relationship.",
		answers: [
			"inevitable"
		],
		isFAQ: false
	},
	{
		question: "The hijackers eventually （） themselves to the police.",
		answers: [
			"surrendered"
		],
		isFAQ: false
	},
	{
		question: "She （）a method for quicker communication between offices.",
		answers: [
			"devised"
		],
		isFAQ: false
	},
	{
		question: "There is an urgent need to （） the resources of the Irish Sea.",
		answers: [
			"exploit"
		],
		isFAQ: false
	},
	{
		question: "A warm thought suddenly came to me （） I might use the pocket money to buy some flowers for my mother’s birthday．",
		answers: [
			"that"
		],
		isFAQ: false
	},
	{
		question: "The best cooking oil are usually （）without heat and left with their natural color.",
		answers: [
			"extracted"
		],
		isFAQ: false
	},
	{
		question: "The bank will only lend me money if my parents （）the loan.",
		answers: [
			"guarantee"
		],
		isFAQ: false
	},
	{
		question: "In the（）  of anyone to spend New Year’s Eve with, I went to watch a show alone and I truly enjoyed it.",
		answers: [
			"absence"
		],
		isFAQ: false
	}
];

class Sleep {
	/** 延时睡眠等待 */
	static time( delay = 1 ) {
		return new Promise( ( resolve ) => {
			setTimeout( resolve, delay * 1e3 );
		} );
	}
	
	/** 页面加载等待 */
	static windowLoad( delay = 0 ) {
		return new Promise( ( resolve ) => {
			window.addEventListener( "load", () => {
				setTimeout( resolve, delay * 1e3 );
			} );
		} );
	}
}

function getElement( parent, selector, timeout = 0 ) {
	return new Promise( ( resolve ) => {
		let result = parent.querySelector( selector );
		if ( result ) {
			return resolve( result );
		}
		let timer;
		const mutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver;
		if ( mutationObserver ) {
			const observer = new mutationObserver( ( mutations ) => {
				for ( let mutation of mutations ) {
					for ( let addedNode of mutation.addedNodes ) {
						if ( addedNode instanceof Element ) {
							result = addedNode.matches( selector ) ? addedNode : addedNode.querySelector( selector );
							if ( result ) {
								observer.disconnect();
								timer && clearTimeout( timer );
								return resolve( result );
							}
						}
					}
				}
			} );
			observer.observe( parent, {
				childList: true,
				subtree: true
			} );
			if ( timeout > 0 ) {
				timer = setTimeout( () => {
					observer.disconnect();
					return resolve( null );
				}, timeout );
			}
		}
		else {
			const listener = ( e ) => {
				if ( e.target instanceof Element ) {
					result = e.target.matches( selector ) ? e.target : e.target.querySelector( selector );
					if ( result ) {
						parent.removeEventListener( "DOMNodeInserted", listener, true );
						timer && clearTimeout( timer );
						return resolve( result );
					}
				}
			};
			parent.addEventListener( "DOMNodeInserted", listener, true );
			if ( timeout > 0 ) {
				timer = setTimeout( () => {
					parent.removeEventListener( "DOMNodeInserted", listener, true );
					return resolve( null );
				}, timeout );
			}
		}
	} );
}

( async () => {
	await getElement( document.body, ".question-list-wrap" );
	await Sleep.time( 1 );
	let domList = {};
	domList.questionNodeList = getAllQuestion();
	domList.questionList = parseQuestionNodeListToObject();
	
	function getAllQuestion() {
		return document.querySelectorAll( ".question-list" );
	}
	
	function getQuestionContent( questionDom ) {
		return questionDom.innerText.replace( /^[(（]题目\d*分[）)]/g, "" ).trim();
	}
	
	function getQuestionOptionsDom( questionContainerDom ) {
		return questionContainerDom.querySelectorAll( "label" );
	}
	
	function parseQuestionNodeListToObject() {
		function getQuestionOptions( optionDomList ) {
			const options = [];
			optionDomList.forEach( ( option ) => {
				options.push( option.innerText.replace( "\n", "" ).replace( /^[ABCDEFG][、.．]/, "" ) );
			} );
			return options;
		}
		
		const list = [];
		domList.questionNodeList.forEach( ( questionContainerNode ) => {
			let obj;
			obj = { answers: [], question: "", options: [], optionsNode: void 0 };
			const questionDom = questionContainerNode.querySelector( ".list-top .title > div" );
			obj.question = getQuestionContent( questionDom );
			obj.optionsNode = getQuestionOptionsDom( questionContainerNode );
			obj.options = getQuestionOptions( obj.optionsNode );
			list.push( obj );
		} );
		return list;
	}
	
	function getQuestionFromLibrary( questionContent ) {
		for ( let i = 0; i < questionList.length; i++ ) {
			const { question } = questionList[i];
			if ( matchContentsWithoutSign( questionContent, question ) ) {
				console.info( "[GetQuestion]", `获取到问题: ${ questionContent }` );
				return questionList[i];
			}
		}
	}
	
	function getAnswer( localQuestion, questionOptions ) {
		let { answers } = localQuestion;
		
		function formatAnswer() {
			answers.filter( ( content ) => {
				return content.trim();
			} );
		}
		
		formatAnswer();
		let correctAnswer = [];
		const optionNumberList = [ "A", "B", "C", "D", "E", "F", "G" ];
		for ( let j = 0; j < questionOptions.length; j++ ) {
			const option = questionOptions[j].trim();
			answers = answers.filter( ( content ) => {
				if ( !content ) {
					correctAnswer.push( "" );
				}
				else if ( matchContentsWithoutLetter( content, option ) ) {
					let answerInfo = optionNumberList[j];
					correctAnswer.push( answerInfo );
				}
				return content;
			} );
		}
		if ( correctAnswer.length < 1 ) {
			correctAnswer = answers;
		}
		return correctAnswer;
	}
	
	async function clickAnswer( optionDomList, correctAnswer ) {
		var _a;
		
		function answerLetterToNumber( answerLetter ) {
			let answerNumber = 0;
			switch ( answerLetter ) {
				case "A":
					answerNumber = 0;
					break;
				case "B":
					answerNumber = 1;
					break;
				case "C":
					answerNumber = 2;
					break;
				case "D":
					answerNumber = 3;
					break;
				case "E":
					answerNumber = 4;
					break;
				case "F":
					answerNumber = 5;
					break;
				case "G":
					answerNumber = 6;
					break;
			}
			return answerNumber;
		}
		
		for ( const answerLetter of correctAnswer ) {
			let answerNumber = answerLetterToNumber( answerLetter );
			const optionDom = optionDomList[answerNumber];
			if ( ( _a = optionDom == null ? void 0 : optionDom.classList ) == null ? void 0 : _a.contains( "ant-checkbox-wrapper-checked" ) ) {
				continue;
			}
			optionDom == null ? void 0 : optionDom.click();
			await Sleep.time( 0.3 );
		}
	}
	
	for ( let i = 0; i < domList.questionList.length; i++ ) {
		const Question = domList.questionList[i];
		const localQuestion = getQuestionFromLibrary( Question.question );
		if ( localQuestion ) {
			const answer = getAnswer( localQuestion, Question.options );
			if ( answer[0] ) {
				await clickAnswer( Question.optionsNode, answer );
			}
		}
	}
} )();
