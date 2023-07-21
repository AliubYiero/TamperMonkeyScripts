// ==UserScript==
// @name		gdwlxyxsAutoAnswer
// @author		Yiero
// @description		gdwlxyxsAutoAnswer自动答题
// @version		1.0.1
// @namespace		https://github.com/AliubYiero/TamperMonkeyScripts
// @icon		https://exam.beeouc.com/favicon.ico
// @match		https://exam.beeouc.com/client/*
// @require		file://D:\Code\TamperMoneyScripts-vite\dist\gdwlxyxsAutoAnswer.js
// @license		GPL
// @grant		GM_addStyle
// @updateUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/gdwlxyxsAutoAnswer.js
// @downloadUrl		https://raw.githubusercontent.com/AliubYiero/TamperMonkeyScripts/master/dist/gdwlxyxsAutoAnswer.js
// ==/UserScript==

function matchContentsWithoutSign( Content1, Content2 ) {
	const signList = /[，。！？、；：÷×「」“”《》．（）_—.\-=+`~@#$%…&*<>/;'"{}\[\]()\s]/g;
	Content1 = Content1.replace( signList, "" ).trim();
	Content2 = Content2.replace( signList, "" ).trim();
	console.log( `[MatchContent]
[${ Content1 }]
||
${ Content2 }` );
	return Content1 === Content2 || Boolean( Content1.match( new RegExp( Content2 ) ) ) || Boolean( Content2.match( new RegExp( Content1 ) ) );
}

function matchContentsWithoutLetter( answerContent, optionContent ) {
	const signList = /^[ABCDEFG][.．、]/g;
	answerContent = answerContent.replace( signList, "" ).trim();
	optionContent = optionContent.replace( signList, "" ).trim();
	console.log( `[MatchContent]
[${ answerContent }]
||
${ optionContent }` );
	return answerContent === optionContent;
}

const question1 = [
	{
		question: "商品学研究的具体容是(　　)",
		answers: [
			"与商品质量密切相关的问题"
		]
	},
	{
		question: "质量认证是指(　　)对公司质量管理体系进行评定和注册活动。",
		answers: [
			"第三方"
		]
	},
	{
		question: "商品是具有使用价值的(　　)。",
		answers: [
			"劳动产品"
		]
	},
	{
		question: "商标的本质作用是(　　)",
		answers: [
			"区别商品的不同生产者和经营者"
		]
	},
	{
		question: "白酒的酒度是指(　　)。",
		answers: [
			"酒精度"
		]
	},
	{
		question: "易发生老化的高分子材料是(　　)",
		answers: [
			"塑料"
		]
	},
	{
		question: "电冰箱必须具备保鲜性能，这是对商品质量中(　　)的基本要求。",
		answers: [
			"适用性"
		]
	},
	{
		question: "EAN是(　　)的简称。",
		answers: [
			"国际物品条形码"
		]
	},
	{
		question: "库房湿度指标用(　　)来表示。",
		answers: [
			"相对湿度"
		]
	},
	{
		question: "“小心轻放”标志是(　　)",
		answers: [
			"指示标志"
		]
	},
	{
		question: "国际标准是由(　　)制订和颁布的标准。",
		answers: [
			"国际标准化组织"
		]
	},
	{
		question: "保温瓶必须具备保温性能，这是对商品质量中(　　)的基本要求。",
		answers: [
			"适用性"
		]
	},
	{
		question: "UPC是(　　)的简称。",
		answers: [
			"通用产品条形码"
		]
	},
	{
		question: "“防潮”标志是(　　).",
		answers: [
			"指示标志"
		]
	},
	{
		question: "根据(　　)不同,可将商品分为生活资料商品和生产资料商品。",
		answers: [
			"用途"
		]
	},
	{
		question: "商品质量认证的安全认证属于(　　)",
		answers: [
			"强制性认证"
		]
	},
	{
		question: "EAN-13条形码前2位或者前3位代表(　　)。",
		answers: [
			"国家或地区代码"
		]
	},
	{
		question: "在商品的分类实践常以商品的(　　)作为分类标志",
		answers: [
			"用途",
			"原材料",
			"加工工艺",
			"化学成分"
		]
	},
	{
		question: "商品条码中的条码符号由(　　)等部分构成",
		answers: [
			"起始符",
			"终止符",
			"数据符",
			"校验符"
		]
	},
	{
		question: "在EAN-13条码中,中国物品编码的前缀码是(　　)",
		answers: [
			"690",
			"691",
			"692"
		]
	},
	{
		question: "在我国,取得商品质量认证的商品必须具备(　　)条件",
		answers: [
			"符合国家标准",
			"符合行业标准",
			"质量稳定,能正常批量生产"
		]
	},
	{
		question: "按商品标准的成熟程度可以分为强制性标准和推荐性标准。(　　)",
		answers: [
			"正确"
		]
	},
	{
		question: "企业只有在其生产的产品没有相应的国家标准、行业标准和地方标准时，才能制定企业标准。(　　)",
		answers: [
			"错误"
		]
	},
	{
		question: "完全市场经济国家里以强制性标准为主。(　　)",
		answers: [
			""
		]
	},
	{
		question: "商品包装最基本的作用是美化、宣传和介绍商品。(　　)",
		answers: [
			"错误"
		]
	},
	{
		question: "按商品包装所处领域、所起作用的不同分为运输包装和销售包装。(　　)",
		answers: [
			"正确"
		]
	},
	{
		question: "运输包装上的“禁止用手钩”图案属于运输收发货标志。(　　)",
		answers: [
			"错误"
		]
	},
	{
		question: "商品养护是商品在储运过程中所进行的保养和维护。(　　)",
		answers: [
			"正确"
		]
	},
	{
		question: "采用通风的方法调节库温湿度的关键，是选择和掌握通风时机。(　　)",
		answers: [
			"正确"
		]
	},
	{
		question: "饱和湿度是单位体积空气中能容纳的最多水汽量。(　　)",
		answers: [
			""
		]
	},
	{
		question: "凡是供他人使用或消费的产品都是商品。(　　)",
		answers: [
			"错误"
		]
	},
	{
		question: "商品学",
		answers: [
			"商品学是研究商品使用价值及其变化规律的科学。"
		]
	},
	{
		question: "商品的有形附加物",
		answers: [
			"商品的有形附加物包括商品名称、商标及其注册标记或品牌、商品条码、商品包装及其标志、专利标记、商品原产地标志或证明、质量、安全及卫生标志、环境标志、商品使用说明标签或标识、检验合格证、使用说明书、维修卡、购货发票。"
		]
	},
	{
		question: "商品的使用价值",
		answers: [
			""
		]
	},
	{
		question: "商品的交换使用价值",
		answers: [
			"商品的交换使用价值商品的生产者、经营者用其进行交换从而获得所需要的货币，成为交换价值的物质承担者。"
		]
	},
	{
		question: "商品的消费使用价值",
		answers: [
			"商品的消费使用价值商品对其消费者、用户所具有的直接的消费使用价值。由商品的有用性在实际消费中所表现出来的满足消费者需要的作用形成。"
		]
	},
	{
		question: "简述现代新产品的特点？",
		answers: [
			""
		]
	},
	{
		question: "简述市场需求可产生于哪些方面？",
		answers: [
			"市场需求可产生于以下几个方面：1、现有产品或服务的使用价值与顾客消费欲望之间的差异；2、对顾客潜在消费欲望的体现；3、从改善生活条件和环境条件及提高生活质量方面对未来产品或服务使用价值的期望与要求；4、市场结构和消费需求结构变化以及消费流向所产生的要求。"
		]
	},
	{
		question: "简述样品鉴定的内容包括哪些方面？",
		answers: [
			"样品鉴定的内容包括1、检查新产品设计的完善性，是否符合技术任务书要求，样品阶段所具备的技术文件是否完整、正确、统一，是否符合先行的有关标准要求，能否指导生产；2、检查样品的性能、质量、外观、安全性、可靠性等；3、对样品的标准化水平、结构工艺水平、技术经济性、制造成本以及安全卫生、环保、节能等技术要求是否符合标准要求做出评价；4、对样品的优缺点做出总评价，确定能否转入小批试制。"
		]
	}
];
const question2 = [
	{
		question: "会计的基本职能是(   )。",
		answers: [
			"核算与监督"
		]
	},
	{
		question: "已经完成全部生产过程并已验收入库，可供对外销售的产品即为",
		answers: [
			"库存商品"
		]
	},
	{
		question: "预付职工差旅费时应借记的科目为（     ）",
		answers: [
			""
		]
	},
	{
		question: "反映企业经营成果的会计要素一般不包括(    )。",
		answers: [
			"负债"
		]
	},
	{
		question: "不影响本期营业利润的项目是(    )。",
		answers: [
			"所得税费用"
		]
	},
	{
		question: "在结账之前，如果发现账簿记录有错误，而记账凭证没错误，应采用(    )更正。",
		answers: [
			""
		]
	},
	{
		question: "企业开出转账支票1 690元购买办公用品，编制记账凭证时，误记金额为1 960元，并已入账，应采用的更正方法是(    )。",
		answers: [
			"红字冲销270元"
		]
	},
	{
		question: "年末结转后，“利润分配”账户的贷方余额表示(    )。",
		answers: [
			""
		]
	},
	{
		question: "企业经营取得净利润将导致（     ）",
		answers: [
			"所有者权益增加；"
		]
	},
	{
		question: "对贵重物资和现金进行清查的方法是(    )。",
		answers: [
			"实地盘点法"
		]
	},
	{
		question: "在记账无误的情况下，造成银行对账单和银行存款日记账不一致的原因是存在(    )。",
		answers: [
			""
		]
	},
	{
		question: "资产负债表的下列项目中，需要根据若干个总账账户余额合计数填列的项目是(    )。",
		answers: [
			"存货"
		]
	},
	{
		question: "《企业会计准则》规定，企业的会计核算应以(    )为基础。",
		answers: [
			""
		]
	},
	{
		question: "“材料成本差异”账户用来抵减附加(    )账户。",
		answers: [
			"“原材料”账户"
		]
	},
	{
		question: "对行政管理部门用固定资产计提折旧时，应贷记的账户是（     ）",
		answers: [
			"“累计折旧”"
		]
	},
	{
		question: "“应交税费——应交增值税”明细账应采用的格式是(    )。",
		answers: [
			"借方贷方多栏式"
		]
	},
	{
		question: "下列业务应编制转账凭证的是（   ）。",
		answers: [
			"车间领用材料"
		]
	},
	{
		question: "根据账簿记录和经济业务的需要而编制的自制原始凭证是(    )。",
		answers: [
			"记账编制凭证"
		]
	},
	{
		question: "下列属于自制原始凭证的是(    )。",
		answers: [
			"销货发票"
		]
	},
	{
		question: "科目汇总表与汇总记账凭证都属于(    )。",
		answers: [
			"汇总的记账凭证"
		]
	},
	{
		question: "利润表提供的信息包括(    )。",
		answers: [
			"净利润",
			"实现的营业收入",
			"营业利润",
			"利润或亏损总额"
		]
	},
	{
		question: "财产清查按照清查的执行单位不同，可分为(    )。",
		answers: [
			"内部清查",
			"外部清查"
		]
	},
	{
		question: "下列各种方法适用于存货实物盘点的有(    )。",
		answers: [
			""
		]
	},
	{
		question: "下列情况属于企业与银行之间的未达账项的有(    )。",
		answers: [
			"企业已收银行未收",
			"银行已收企业未收",
			"企业未收银行已收",
			"银行未收企业已收"
		]
	},
	{
		question: "财产清查按照清查的时间可分为(    )。",
		answers: [
			"定期清查",
			"不定期清查"
		]
	},
	{
		question: "构成企业所有者权益的是(    )。",
		answers: [
			"实收资本",
			"资本公积",
			"盈余公积",
			"未分配利润"
		]
	},
	{
		question: "“营业税金及附加”账户借方登记的内容有(    )。",
		answers: [
			"消费税",
			"城市维护建设税",
			"营业税"
		]
	},
	{
		question: "记账凭证编制的依据可以是(    )。",
		answers: [
			"一次凭证",
			"累计凭证",
			"汇总原始凭证"
		]
	},
	{
		question: "以记账凭证为依据，按账户贷方设置，将借方账户归类汇总的凭证编制方法有(    )。",
		answers: [
			""
		]
	},
	{
		question: "账户的基本结构一般包括(    )。",
		answers: [
			"账户的名称",
			"日期和摘要",
			"增减金额",
			"凭证号数"
		]
	},
	{
		question: "在永续盘存制下，财产清查的目的是确定本期收入数。(    )",
		answers: [
			"错误"
		]
	},
	{
		question: "为了便于编制汇总转账凭证，要求转账分录保持一借一贷或一贷多借，而不宜采用一借多贷。(    )",
		answers: [
			""
		]
	},
	{
		question: "生产成本明细账应按照成本项目设置专栏。（   ）",
		answers: [
			"正确"
		]
	},
	{
		question: "某一会计人员在记账时漏记了一笔经济业务，这一错误是不可以通过试算平衡表来发现的。（    ）",
		answers: [
			"正确"
		]
	},
	{
		question: "某一账户本期借方发生额合计和贷方发生额合计一定相等。 (    )",
		answers: [
			"错误"
		]
	},
	{
		question: "复式记账由于是以相等的金额在两个或两个以上账户中登记，所以能检查账簿记录是否正确。（      ）。",
		answers: [
			""
		]
	},
	{
		question: "转账凭证登记与货币资金收付无关的业务。 (    )",
		answers: [
			"正确"
		]
	},
	{
		question: "根据一定期间的记账凭证全部汇总填制的凭证如“科目汇总表”，是一种累计凭证。(    )",
		answers: [
			"错误"
		]
	},
	{
		question: "如果账簿记录发生错误，应根据错误的具体情况，采用规定的方法予以更正，不得涂改、挖补、刮擦或用退色药水更改字迹。(    )",
		answers: [
			"正确"
		]
	},
	{
		question: "如果试算平衡表中借贷不平衡，说明记账或算账有错误；如果借贷平衡，则说明记账正确无误。(    )",
		answers: [
			"错误"
		]
	},
	{
		question: "什么是会计档案？怎样保管会计档案？（10.0）",
		answers: [
			"会计档案是指会计凭证，会计账簿和会计报表等会计核算专业材料，它是记录和反映经济业务的重要史料和证据。会计档案是国家档案的重要组成部分，也是各单位的重要档案之一。会计档案工作由各级财政机关和各级档案业务管理机构共同负责，进行业务指导，监督与检查。各单位每年形成的会计档案，都应由财务会计部门按照归档的要求，负责整理立卷或装订成册。当年会计档案，在会计年度终了后，可暂由本单位财务会计部门保管一年。期满之后，原则上应由财务会计部门编造清册移交本单位的档案部门保管。各单位按规定销毁会计档案时，应由档案机构和财会部门共同派人员监销。"
		]
	},
	{
		question: "收付实现制（10.0）",
		answers: [
			""
		]
	}
];
const question3 = [
	{
		question: "We'll try                           there on time.（2.0）",
		answers: [
			"to get"
		],
		isFAQ: false
	},
	{
		question: "The pen ______he is writing is mine. （2.0）",
		answers: [
			"with which"
		],
		isFAQ: false
	},
	{
		question: "I’m sorry I’m late again________ the  heavy rain.（2.0）",
		answers: [],
		isFAQ: false
	},
	{
		question: "I was watching TV, my sister was litening to the radio programme.（2.0）",
		answers: [
			"While"
		],
		isFAQ: false
	},
	{
		question: "They have given us a lot valuable ________.（2.0）",
		answers: [
			"information"
		],
		isFAQ: false
	},
	{
		question: "After the exam, we’ll have a long vacation.   Yes, but I haven’t planned ____ .（2.0）",
		answers: [],
		isFAQ: false
	},
	{
		question: "______ was the food in the restaurant? （2.0）",
		answers: [
			"How"
		],
		isFAQ: false
	},
	{
		question: "Some of the wheat is fromCanada, What about______?  （2.0）",
		answers: [
			"others"
		],
		isFAQ: false
	},
	{
		question: "It’s so hot today. Jane plans _________ swimming after school.（2.0）",
		answers: [
			"to go"
		],
		isFAQ: false
	},
	{
		question: "___ wonderful Yang Liping’s dance is!（2.0）",
		answers: [],
		isFAQ: false
	},
	{
		question: "_______ woman over there is _______ popular teacher in our school．（2.0）",
		answers: [
			"The;a"
		],
		isFAQ: false
	},
	{
		question: "She asked him if ___________________ .（2.0）",
		answers: [
			"he would marry her"
		],
		isFAQ: false
	},
	{
		question: "This is _____ Xinghai Park, and Mr. Chen is _____ director of ____ park.（2.0）",
		answers: [
			"x/the/the"
		],
		isFAQ: false
	},
	{
		question: "The garbage was so (  )that he nearly threw up.（2.0）",
		answers: [],
		isFAQ: false
	},
	{
		question: "We hope life can get          .  （2.0）",
		answers: [
			"better and better"
		],
		isFAQ: false
	},
	{
		question: "选出所听到句子的正确汉语意思。When will you check into the hotel?（2.0）",
		answers: [
			"你什么时候入住酒店？"
		],
		isFAQ: false
	},
	{
		question: "下面词组的汉语意思：wait for a response（2.0）",
		answers: [
			"等待回复"
		],
		isFAQ: false
	},
	{
		question: "What did the policeman say to you, Liu Ying? He told me ______ my purse in the bicycle basket. It’s too dangerous.（2.0）",
		answers: [
			"not to put"
		],
		isFAQ: false
	},
	{
		question: "A nasty person is a ____person.（2.0）",
		answers: [
			"Unkind"
		],
		isFAQ: false
	},
	{
		question: "When he is free, he often helps his parents ________ some housework.  （2.0）",
		answers: [
			"do"
		],
		isFAQ: false
	},
	{
		question: "Do you know where _________ now？ （2.0）",
		answers: [
			"he lives"
		],
		isFAQ: false
	},
	{
		question: "Great changes have taken place since then in the factory _______we are working.（2.0）",
		answers: [
			"where"
		],
		isFAQ: false
	},
	{
		question: "We must remember that _____fashion is not the most important thing in _______ life.（2.0）",
		answers: [
			"/; /"
		],
		isFAQ: false
	},
	{
		question: "Our English teacher often asks us_________ English _____in class. （2.0）",
		answers: [
			"to speak; loudly"
		],
		isFAQ: false
	},
	{
		question: "选出句子的正确意思：Can you introduce some of your tours to me?（2.0）",
		answers: [
			"你能给我推荐一些你们的旅行线路吗？"
		],
		isFAQ: false
	},
	{
		question: "The boss _______ me to accompany her to the concert this Friday.（2.0）",
		answers: [
			"asked"
		],
		isFAQ: false
	},
	{
		question: "Is there ___________  you’d like to buy?  Yes, I’d like to buy some magazines. （2.0）",
		answers: [
			"anything else"
		],
		isFAQ: false
	},
	{
		question: "There is _______ old bike． _______ old bike is Mr Zhao's．（2.0）",
		answers: [],
		isFAQ: false
	},
	{
		question: "There  _______some  _______in the river.（2.0）",
		answers: [
			"are ,fish"
		],
		isFAQ: false
	},
	{
		question: "I think _____necessary to learn English well.（2.0）",
		answers: [
			"it"
		],
		isFAQ: false
	},
	{
		question: "总体上，总体来讲（2.0）",
		answers: [
			"as a whole"
		],
		isFAQ: true
	},
	{
		question: "必须的，必要的（2.0）",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "烦恼（2.0）",
		answers: [
			"annoyance"
		],
		isFAQ: true
	},
	{
		question: "His office is in town, but his ____________ is in the suburb.（2.0）",
		answers: [
			"residence"
		],
		isFAQ: true
	},
	{
		question: "The students _______(play)  basketball energetically on the playground right now.（2.0）",
		answers: [
			"are playing"
		],
		isFAQ: true
	},
	{
		question: "汤姆对那个城镇不熟悉，以前从没去过。（2.5）",
		answers: [
			""
		],
		isFAQ: true
	},
	{
		question: "如果您能尽早通知我们是否参加，我们将非常感谢。（2.5）",
		answers: [
			"We would appreciate it if you could confirm your participation at your earliest convenience."
		],
		isFAQ: true
	},
	{
		question: "澳大利亚很希望参加亚运会，但它不是亚洲成员。 （2.5）",
		answers: [
			"Australia wants to join the Asian Games, but it is not part of Asia."
		],
		isFAQ: true
	},
	{
		question: "这座小城位于山脚下。（2.5）",
		answers: [
			"The little town lies at the foot of a mountain."
		],
		isFAQ: true
	},
	{
		question: "The 12-year-old girl from Virginia put the words “Killing. Meet me in the library Tuesday”, with three emojis ___________ .",
		answers: [],
		isFAQ: false
	},
	{
		question: "Ni Hanxiang was sent back to China ___________.",
		answers: [
			"because he broke the US law"
		],
		isFAQ: false
	},
	{
		question: "From this passage, we can infer（推断）that ___________.",
		answers: [
			"putting threatening words on QQ may bring you problem"
		],
		isFAQ: false
	},
	{
		question: "This passage mainly wants to tell us that ___________.",
		answers: [
			"we should be careful when we send words or emojis on social media"
		],
		isFAQ: false
	},
	{
		question: "Where did Mr Scott live?",
		answers: [
			"Above his shop."
		],
		isFAQ: false
	},
	{
		question: "How much money did he have that day?",
		answers: [
			"＄10,000."
		],
		isFAQ: false
	},
	{
		question: "Why did Mr Scott sleep with the money that night?",
		answers: [
			"Because he thought it was not safe to keep it in the shop."
		],
		isFAQ: false
	},
	{
		question: "Why did the policeman wake him up?",
		answers: [
			"Because he wanted to turn off the lights."
		],
		isFAQ: false
	},
	{
		question: "How did Mr Scott feel when he heard the doorbell.",
		answers: [
			"Stressed."
		],
		isFAQ: false
	}
];
const question4 = [
	{
		question: "党的十八大以来，中国共产党团结带领中国人民，（），统揽伟大斗争、伟大工程、伟大事业、伟大梦想，创造了新时代中国特色社会主义的伟大成就。",
		answers: [
			"自信自强、守正创新"
		]
	},
	{
		question: "（）适应又改造了中华传统文化，与中国人的文化心理建立了高度关联和深刻认同。",
		answers: [
			""
		]
	},
	{
		question: "2021年3月11日，第十三届全国人民代表大会第四次会议通过（），明确完善选举制度应当遵循的基本原则和核心要素，授权全国人大常委会修改香港基本法附件一和附件二。",
		answers: [
			"《全国人民代表大会关于完善香港特别行政区选举制度的决定》"
		]
	},
	{
		question: "新发展阶段的共同富裕具有阶段性特征，即在（）年基本实现社会主义现代化时实现“全体人民共同富裕迈出坚实步伐”。",
		answers: [
			"2035"
		]
	},
	{
		question: "下列各项中，不属于“五眼联盟”的国家是（）。",
		answers: [
			"日本"
		]
	},
	{
		question: "《巴黎协定》的主要目标是将本世纪全球平均气温上升幅度控制在（）℃以内。",
		answers: [
			"2"
		]
	},
	{
		question: "《生物多样性公约》及其议定书核心预算的最大捐助国和全球环境基金最大的发展中国家捐资国是（）。",
		answers: [
			""
		]
	},
	{
		question: "中国将在（）进入深度老龄社会。",
		answers: [
			"20年至25年"
		]
	},
	{
		question: "我国的全球创新指数从2015年的第29位跃升至2021年的第（）位。",
		answers: [
			"12"
		]
	},
	{
		question: "下列各项中，不属于中国实现碳达峰、碳中和所面对的挑战的是（）。",
		answers: [
			"不符合国家安全和可持续发展战略"
		]
	},
	{
		question: "关于共同富裕，下列理解中错误的是（）。",
		answers: [
			""
		]
	},
	{
		question: "当今世界，有（）的人口生活在平均收入低于每天20美元的国家。",
		answers: [
			"82%"
		]
	},
	{
		question: "发达国家应为发展中国家提供气候资金，尤其是兑现每年为发展中国家提供（）亿美元应对气候变化的承诺。",
		answers: [
			"1000"
		]
	},
	{
		question: "2021年6月10日，《中共中央国务院关于支持（）高质量发展建设共同富裕示范区的意见》公布。",
		answers: [
			"浙江"
		]
	},
	{
		question: "（）是马克思列宁主义在中国的创造性运用和发展，是被实践证明了的关于中国革命和建设的正确的理论原则和经验总结，是马克思主义中国化的第一次历史性飞跃。",
		answers: [
			"毛泽东思想"
		]
	},
	{
		question: "（），中国政府恢复对澳门行使主权，澳门特别行政区成立，开启了澳门历史新纪元。",
		answers: [
			"1999年12月20日"
		]
	},
	{
		question: "如今中国经济总量跃居世界第（），全面建成小康社会，今后将继续发展进步，经济、科技、国防等综合实力将不断迈向新台阶，将对台湾产生新的积极影响。",
		answers: [
			""
		]
	},
	{
		question: "（），中国政府恢复对香港行使主权，香港特别行政区成立，开启了香港历史新纪元。",
		answers: [
			"1997年7月1日"
		]
	},
	{
		question: "出生性别比是指每年100名活产女婴对应的活产男婴数，正常范围一般在（）之间。",
		answers: [
			"103至107"
		]
	},
	{
		question: "（）把“共同富裕”上升为社会主义的本质，提出社会主义的本质就是解放生产力，发展生产力，消灭剥削，消除两极分化，最终达到共同富裕。",
		answers: [
			"邓小平"
		]
	},
	{
		question: "着力解决好（）等问题，需要依靠科技自立自强提供更加强有力的支撑保障。",
		answers: [
			"发展动力不足",
			"发展不平衡不充分",
			"人与自然不协调不和谐"
		]
	},
	{
		question: "新形势下，我们要坚持主权平等，推动各国（）。",
		answers: [
			"权利平等",
			"机会平等",
			"规则平等"
		]
	},
	{
		question: "建设生态文明应该更加自觉地推动（），决不以牺牲环境为代价去换取一时的经济增长。",
		answers: [
			""
		]
	},
	{
		question: "党的十八大以来，我国经济发展平衡性、协调性、可持续性明显增强，我国经济迈上（）、更为安全的发展之路。",
		answers: [
			"更高质量",
			"更有效率",
			"更加公平",
			"更可持续"
		]
	},
	{
		question: "下列各项中，属于真正的多边主义的对立面的是（）。",
		answers: [
			"单边主义",
			"孤立主义",
			"帝国主义",
			"霸权主义"
		]
	},
	{
		question: "经过40多年的改革开放，中国和世界的关系发生了历史性的变化，其具体表现有（）。",
		answers: [
			"中国的贸易伙伴达220个国家和地区",
			"中国与外国建立了160多个双边经贸合作机制",
			"中国与外国签订了120多个双边投资协定",
			"中国与27个国家和地区建立了14个自由贸易区"
		]
	},
	{
		question: "（）的新趋势将对经济社会发展产生长周期、全方位和系统性的影响。",
		answers: [
			"人口数量",
			"人口结构",
			"人口素质",
			"人口分布"
		]
	},
	{
		question: "以下各项中，属于全面建成小康社会所如期完成的目标的有（）。",
		answers: [
			"经济保持中高速增长",
			"人民生活水平和质量普遍提高",
			"国民素质和社会文明程度显著提高",
			"各方面制度更加成熟更加定型"
		]
	},
	{
		question: "中国呼吁国际社会加快落实联合国2030年可持续发展议程，推动实现更加强劲、绿色、健康的全球发展，其具体呼吁有（）。",
		answers: [
			"坚持发展优先，贯彻以人民为中心理念",
			"坚持行动导向，推进务实合作",
			"坚持互利共赢，构筑伙伴关系"
		]
	},
	{
		question: "坚持创新驱动发展就要全面塑造发展新优势，其具体举措有（）。",
		answers: [
			"整合优化科技资源配置",
			"完善技术创新的市场导向机制",
			"激发人才的创新活力",
			"推进科技体制改革"
		]
	},
	{
		question: "准确把握科技自立自强的战略要求，就要遵循科学技术发展规律，树立质量和效率优先的科技发展理念。",
		answers: [
			"正确"
		]
	},
	{
		question: "20世纪90年代以来，多边主义得到越来越多和有效的发挥，多边国际合作激发出新的活力。",
		answers: [
			""
		]
	},
	{
		question: "只有加快实现科技自立自强，推动科技创新整体能力和水平实现质的跃升，才能在新一轮科技革命和产业变革中抢占制高点。",
		answers: [
			"正确"
		]
	},
	{
		question: "中国坚定不移坚持多边主义的核心价值和基本原则，立足世界格局变化、着眼应对全球性挑战，不断丰富新形势下的多边主义实践。",
		answers: [
			"正确"
		]
	},
	{
		question: "中国支持有条件的地方、行业、企业率先达峰，为全球应对气候变化、推动能源转型的努力作出积极贡献。",
		answers: [
			"正确"
		]
	},
	{
		question: "强化国家战略科技力量，是加快实现科技自立自强、推动现代化国家建设的关键途径。",
		answers: [
			"正确"
		]
	},
	{
		question: "我国面临的很多卡脖子技术问题，根子是基础理论研究跟不上，源头和底层的东西没有搞清楚。",
		answers: [
			""
		]
	},
	{
		question: "过去十年全球碳排放量已经明显降低。",
		answers: [
			"错误"
		]
	},
	{
		question: "我国人口进入劳动力市场的年龄延后而退出劳动力市场的年龄却没有任何变化，无形中损失了生命周期的生产性时段。",
		answers: [
			"正确"
		]
	},
	{
		question: "如果贫困地区长期贫困，面貌长期得不到改变，群众生活长期得不到明显提高，那就没有体现我国社会主义制度的优越性，那也不是社会主义。",
		answers: [
			"正确"
		]
	},
	{
		question: "科技自立自强的重大意义有哪些？",
		answers: [
			"（1）科技自立自强是进入新发展阶段的必然选择。经过新中国成立70余年来的不懈奋斗，我国综合国力和人民生活水平实现历史性跨越。特别是党的十八大以来，在以习近平同志为核心的党中央坚强领导下，党和国家事业取得历史性成就、发生历史性变革。进入新发展阶段，根本任务就是要乘势而上全面建设社会主义现代化国家、向第二个百年奋斗目标进军。当前，随着我国经济由高速增长阶段转向高质量发展阶段，劳动力成本逐步上升，资源环境承载能力达到瓶颈，科技创新的重要性、紧迫性日益凸显。只有加快实现科技自立自强，推动科技创新整体能力和水平实现质的跃升，才能在新一轮科技革命和产业变革中抢占制高点，有效解决事关国家全局的现实迫切需求和长远战略需求，引领和带动经济社会更多依靠创新驱动发展。把科技自立自强作为国家发展的战略支撑，是我们党在长期理论创新和实践发展基础上，主动应对国际竞争格局新变化、新挑战，准确把握我国新发展阶段的新特征、新要求，坚持和发展中国特色自主创新道路提出的重大战略，是新时代我国创新发展的战略方向和战略任务。（2）科技自立自强是贯彻新发展理念的内在要求。新发展理念系统回答了关于新时代我国发展的目的、动力、方式、路径等一系列理论和实践问题，是我们必须长期坚持和全面贯彻的基本方略。贯彻新发展理念，着力解决好发展动力不足、发展不平衡不充分、人与自然不协调不和谐等问题，实现更高质量、更有效率、更加公平、更可持续、更为安全的发展，这些都需要依靠科技自立自强提供更加强有力的支撑保障。（3）科技自立自强是构建新发展格局的本质特征。加快构建以国内大循环为主体、国内国际双循环相互促进的新发展格局，最根本的是要依靠高水平科技自立自强这个战略基点，一方面通过加快突破产业技术瓶颈，打通堵点、补齐短板，保障国内产业链、供应链全面安全可控，为畅通国内大循环提供科技支撑；另一方面，通过抢占科技创新制高点，在联通国内国际双循环和开展全球竞争合作中，塑造更多新优势，掌握更大主动权。"
		]
	},
	{
		question: "应当怎样完善养老服务体系？",
		answers: [
			""
		]
	}
];
const question5 = [
	{
		question: "通过在全社会培育、弘扬社会主义核心价值观和社会主义道德，对不同人群提出有针对性的道德要求，指的是（）。",
		answers: [
			"以德治国"
		]
	},
	{
		question: "（）第一次明确提出要建设社会主义核心价值体系。",
		answers: [
			"2006年十六届六中全会"
		]
	},
	{
		question: "“最终说服不相信社会主义的人要靠我们的发展。”是（）说的。",
		answers: [
			""
		]
	},
	{
		question: "下列各项中，不符合树立改革创新的自觉意识的是（）。",
		answers: [
			"绝对地相信权威的观点"
		]
	},
	{
		question: "“在科学上没有平坦的大道，只有不畏劳苦沿着陡峭山路攀登的人，才有希望达到光辉的顶点。”这句话说明（）。",
		answers: [
			""
		]
	},
	{
		question: "中国特色社会主义伟大实践的行动指南是（）。",
		answers: [
			"中国特色社会主义理论体系"
		]
	},
	{
		question: "只有将个人理想与（）相统一的青年，才能够在社会上大有作为。",
		answers: [
			"社会理想"
		]
	},
	{
		question: "在整个理想体系中，最根本、最重要的是（）。",
		answers: [
			"社会理想"
		]
	},
	{
		question: "下列不属于孟子“五伦”说的内容是（）。",
		answers: [
			"男女平等"
		]
	},
	{
		question: "下列信仰中哪一个属于科学的信仰（）。",
		answers: [
			""
		]
	},
	{
		question: "民族精神的核心是（）。",
		answers: [
			"爱国主义"
		]
	},
	{
		question: "下列不属于传承中华传统美德原因的是（）。",
		answers: [
			"中华传统美德是我国宝贵的精神财富，只有精华，没有糟粕"
		]
	},
	{
		question: "（）始终是推动人类社会发展的第一动力。",
		answers: [
			"创新"
		]
	},
	{
		question: "富强、民主、文明、和谐的价值追求集中回答了我们要（）的重要问题。",
		answers: [
			"建设什么样的国家"
		]
	},
	{
		question: "从“韦编三绝”“悬梁刺股”“囊萤映雪”这些传统故事中，我们能够特别体会到，遵循社会主义核心价值观，就要切实做到（）。",
		answers: [
			""
		]
	},
	{
		question: "法律运行的起始环节是（）。",
		answers: [
			"法律制定"
		]
	},
	{
		question: "我国现行宪法是哪一年颁布的？",
		answers: [
			"1982年"
		]
	},
	{
		question: "一国全部现行法律规范的总称是（）。",
		answers: [
			"法律体系"
		]
	},
	{
		question: "人们在一定的认识基础上确立的对某种思想或事物坚信不疑并身体力行的精神状态是（）。",
		answers: [
			"信念"
		]
	},
	{
		question: "一切时代精神都将随着历史的变迁逐步融入（）之中。",
		answers: [
			"民族精神"
		]
	},
	{
		question: "下列关于信念说法正确的是（）。",
		answers: [
			"信念是人类特有的精神现象",
			"信念具有执着性",
			"信念是一种复合物",
			"信念具有多样性"
		]
	},
	{
		question: "我们提倡的立志做大事中的“大事”是指（）。",
		answers: [
			""
		]
	},
	{
		question: "关于坚持一个中国原则，说法正确的有（）。",
		answers: [
			"台湾是中国领土不可分割的组成部分",
			"大陆和台湾是不可分割的整体",
			"两岸双方应本着对历史、对人民负责任的态度，以中华民族整体利益为重，把握好两岸关系和平发展大局，推动两岸关系沿着正确方向不断向前迈进",
			"两岸双方应始终坚持“九二共识”的共同立场"
		]
	},
	{
		question: "对理想和现实的关系理解正确的是（）。",
		answers: [
			"理想源于现实，受现实的规定和制约",
			"理想超越现实，是有实现可能性的未来的现实",
			"理想是与奋斗目标相联系的现实"
		]
	},
	{
		question: "下列关于树立社会新风和建立新型人际关系的说法正确的是（）。",
		answers: [
			"任何道德规范都要面向生活实践",
			"树立社会新风，建立新型人际关系，体现了中国革命道德在社会生活层面上的重要意义",
			"人们对中国革命道德的传扬，破除了等级观念和特权思想，破除了鄙视劳动和劳动人民的旧道德观念"
		]
	},
	{
		question: "在培育和弘扬的过程中，下好落细、落小、落实的功夫，对于大学生而言，就是要切实做到（），使社会主义核心价值观成为一言一行的基本遵循。",
		answers: [
			""
		]
	},
	{
		question: "爱国主义的丰富性和生命力，正是通过它的（）来表现的。",
		answers: [
			"历史性",
			"具体性"
		]
	},
	{
		question: "爱国主义是人们对自己家园以及民族和文化的（）的统一。",
		answers: [
			"归属感",
			"认同感",
			"尊严感",
			"荣誉感"
		]
	},
	{
		question: "理想和现实的关系有哪些（）。",
		answers: [
			"理想源于现实",
			"理想高于现实",
			"理想与现实是对立统一的"
		]
	},
	{
		question: "中华民族重精神的优秀传统体现在（）。",
		answers: [
			"重视人生境界和理想人格",
			"对物质生活与精神生活相互关系的独到理解上",
			"对理想的不懈追求上",
			"对道德修养和道德教化的重视上"
		]
	},
	{
		question: "冯友兰认为，“使人成为某一种人的课程”讲授的是某一类理论、知识、技能，也就是专业课程。",
		answers: [
			"正确"
		]
	},
	{
		question: "中国传统文化具有综合性。",
		answers: [
			"正确"
		]
	},
	{
		question: "共产主义远大理想既是面向未来的，又是指向现实的。",
		answers: [
			"正确"
		]
	},
	{
		question: "理想产生于现实，但不是对现状的摹写，而是对现实的超越。",
		answers: [
			""
		]
	},
	{
		question: "世界上所有民族的民族精神都完全相同，都是寻求自由独立民主的精神。",
		answers: [
			"错误"
		]
	},
	{
		question: "评价人生价值的根本尺度，是看一个人的实践活动是否符合社会发展的客观规律，是否促进了历史的进步。",
		answers: [
			"正确"
		]
	},
	{
		question: "我国宪法是党和国家的指导思想、中心工作、基本原则、重大方针、重要政策在国家法制上的最高体现。",
		answers: [
			"正确"
		]
	},
	{
		question: "创业是最大的民生，它牵涉大学生自身和千家万户的利益。",
		answers: [
			"错误"
		]
	},
	{
		question: "在今天，衡量人生价值的标准最重要的就在于看一个人是否用自己的劳动和聪明才智为自己谋取到了尽可能多的利益。",
		answers: [
			"错误"
		]
	},
	{
		question: "理想是精神上的钙，没有崇高的理想信念，就会导致精神上的“软骨病”。",
		answers: [
			"正确"
		]
	},
	{
		question: "如何在实现中国梦的过程中注入青春能量？",
		answers: [
			"(1)立志做大官(2)立志做大事(3)立志当高远(4)立志须躬行"
		]
	},
	{
		question: "正确的人生态度是什么?",
		answers: [
			""
		]
	}
];
const question6 = [
	{
		question: "“安而不忘危，存而不忘亡，治而不忘乱。”出自以下那一本书？（ ）",
		answers: [
			"《易经·系辞卦》"
		]
	},
	{
		question: "1999年，剑桥大学和英国广播公司在全球范围评选出来的“千年思想家”中的第一名是（ ）。",
		answers: [
			""
		]
	},
	{
		question: "1965年3月，（ ）在会见外国友人时说:“打仗主要是两条，你打你的，我打我的。我打我的，又是两句话，打得赢就打，打不赢就走。",
		answers: [
			"毛泽东"
		]
	},
	{
		question: "毛泽东在《中国社会各阶级的分析》一文中指出：“举起你的左手打倒帝国主义，举起你的右手打倒共产党。”这两句话，刻画出了这个阶级的矛盾惶遽状态。“这个阶级”是指（ ）。",
		answers: [
			"民族资产阶级"
		]
	},
	{
		question: "毛泽东在（ ）最先提出了“马克思主义中国化”这个命题。",
		answers: [
			""
		]
	},
	{
		question: "中国特色社会主义政治发展道路的本质特征是（ ）。",
		answers: [
			"人民当家作主"
		]
	},
	{
		question: "全面建设社会主义现代化国家的第二个阶段是（ ），在基本实现现代化的基础上，再奋斗15年，把我国建成富强民主文明和谐美丽的社会主义现代化强国。",
		answers: [
			"从2035年到本世纪中叶"
		]
	},
	{
		question: "毛泽东思想是被实践证明了的关于（ ）的正确的理论原则和经验总结。",
		answers: [
			"中国革命和建设"
		]
	},
	{
		question: "巩固和发展最广泛的爱国统一战线，最根本的是要坚持（ ）。",
		answers: [
			""
		]
	},
	{
		question: "（ ）是马克思主义的历史观、认识论在中国革命、建设中的具体运用。",
		answers: [
			"群众路线"
		]
	},
	{
		question: "社会主义社会中存在两种性质完全不同的矛盾，它们是（ ）。",
		answers: [
			"敌我之间的矛盾；人民内部的矛盾"
		]
	},
	{
		question: "“新时代中国特色社会主义思想”是习近平总书记在（ ）中首次提出。",
		answers: [
			"十九大开幕式报告"
		]
	},
	{
		question: "2018年2月28日，（ ）通过《深化党和国家机构改革方案》。",
		answers: [
			"中共十九届三中全会"
		]
	},
	{
		question: "革命的性质是由社会的性质、社会的主要矛盾和（ ）所决定的。",
		answers: [
			""
		]
	},
	{
		question: "本世纪中叶，我国将拥有高度的精神文明，其具体体现不包括（）。",
		answers: [
			"儒家思想在意识形态领域占据指导地位"
		]
	},
	{
		question: "新民主主义文化的特点有（ ）。",
		answers: [
			"民族性",
			"科学性",
			"大众性"
		]
	},
	{
		question: "科学发展观的主要内容包括（ ）。",
		answers: [
			"推进社会主义文化强国建设",
			"加快转变经济发展方式",
			"发展社会主义民主",
			"构建社会主义和谐社会"
		]
	},
	{
		question: "“三个代表”重要思想的内容包括（ ）。",
		answers: [
			""
		]
	},
	{
		question: "关于加快生态文明体制改革，下列说法正确的是（ ）。",
		answers: [
			"推进绿色发展",
			"着力解决突出环境问题",
			"加大生态保护力度",
			"改善生态环境监管体制"
		]
	},
	{
		question: "强调发展是党执政兴国的第一要务的原因包括（ ）。",
		answers: [
			"这是由中国共产党的执政地位决定的",
			"这是增强我国综合国力和国际地位的需要",
			"发展是社会主义制度优越性的最好体现"
		]
	},
	{
		question: "以下（ ）属于中国特色的马克思主义军事理论成果。",
		answers: [
			"毛泽东军事思想",
			"邓小平新时期军队建设思想",
			"江泽民国防和军队建设思想",
			"胡锦涛国防和军队建设思想"
		]
	},
	{
		question: "习近平新时代中国特色社会主义思想开辟了“四个新境界”，分别是（ ）。",
		answers: [
			""
		]
	},
	{
		question: "以下内容中，（ ）是毛泽东在《关于正确处理人民内部矛盾的问题》的重要讲话中提到的。",
		answers: [
			"规定了社会主义的基本矛盾",
			"阐述了社会主义社会基本矛盾的性质和特点",
			"提出了解决社会主义社会基本矛盾的途径和办法",
			"揭示了社会主义社会基本矛盾运动的规律"
		]
	},
	{
		question: "毛泽东军事思想经历了（ ）阶段。",
		answers: [
			""
		]
	},
	{
		question: "关于毛泽东的重要历史贡献下列说法正确的是（ ）。",
		answers: [
			"第一个明确提出了“马克思主义中国化”命题",
			"深刻论证了马克思主义中国化的必要性和极端重要性",
			"系统阐述了马克思主义中国化的科学内涵"
		]
	},
	{
		question: "强调实现中国梦要走中国道路，是因为道路决定命运。",
		answers: [
			"正确"
		]
	},
	{
		question: "土地改革提高了农民的生产积极性，主要表现在个体经济的积极性和互助合作的积极性两个方面。",
		answers: [
			"正确"
		]
	},
	{
		question: "第二次国内革命战爭时期，中国共产党创造性地把马克思主义的革命学说应用于中国实际，创建了工农红军，建立了农村革命根据地和工农政府，实行工农武装割据。",
		answers: [
			""
		]
	},
	{
		question: "中国精神主要包括民族精神和时代精神两个方面。",
		answers: [
			"正确"
		]
	},
	{
		question: "党的十九大把原来“富强民主文明和谐的社会主义现代化国家”，扩展为“富强民主文明和谐美丽的社会主义现代化强国”，与中国特色社会主义“五位一体”总体布局吻合一致，体现了伟大事业与伟大梦想的有机统一。",
		answers: [
			"正确"
		]
	},
	{
		question: "科学发展观对于我们更好的坚持发展才是硬道理的战略思想具有重大意义。",
		answers: [
			"正确"
		]
	},
	{
		question: "“五位一体”彰显出了整体与局部、近期与长远、宏观与微观的有机统一。",
		answers: [
			"正确"
		]
	},
	{
		question: "坚持以马克思主义为指导是当前中国哲学社会科学区别于其他哲学社会科学的根本标志。",
		answers: [
			"正确"
		]
	},
	{
		question: "新时代的“新”意味着我国着眼于当前社会主要矛盾，制定了新的阶段性目标。",
		answers: [
			"正确"
		]
	},
	{
		question: "土地革命、武装斗争、农村革命根据地是“工农武装割据”的三个基本要素。",
		answers: [
			""
		]
	},
	{
		question: "请简要概述，统筹推进“五位一体”总体布局必须坚持哪些正确的发展观念?",
		answers: [
			""
		]
	},
	{
		question: "请简要概括“五位一体”总体布局的形成过程主要经历了哪些阶段？",
		answers: [
			"1、第一阶段：“两个文明”的提出；2、第二阶段：从“两个文明”到“三个文明”；3、第三阶段：从“三位一体”到“四位一体”；4、第四阶段：从“四位一体”到“五位一体”。"
		]
	},
	{
		question: "我们应怎样发展适合我国国情的社会主义民主政治制度，请简要概述。",
		answers: [
			"1、坚持人民代表大会制度；2、坚持中国共产党领导的多党合作和政治协商制度；3、坚持民族区域自治制度；4、坚持基层群众自治制度。"
		]
	},
	{
		question: "请简述社会主义建设道路初步探索的经验教训。",
		answers: [
			"1.必须把马克思主义与中国实际相结合，探索符合中国特点的社会主义建设道路；2.必须正确认识社会主义社会的主要矛盾和根本任务，以经济建设为中心，集中力量发展生产力；3.社会制度、生产关系的变革必须与生产力的发展水平相适应；4.必须发展社会主义民主，健全社会主义法制；5.必须坚持党的民主集中制和集体领导制度，加强执政党建设；6.必须坚持对外开放，积极借鉴和吸收人类文明的共同成果。"
		]
	},
	{
		question: "马克思主义中国化的科学内涵是?",
		answers: [
			"1.马克思主义中国化就是把马克思主义基本原理同中国具体实际是时代特征结合起来，运用马克思主义的立场观点和方法解决中国革命、建设和改革中的实际问题。2.总结和提炼中国革命、建设、改革的实践经验和历史经验，从而认识和掌握客观规律，坚持和发展马克思主义，为马克思主义理论宝库增添新的内容。3.运用中国人民喜闻乐见的民族语言来阐述马克思主义理论，使之成为具有中国特色、中国风格、中国气派的马克思主义。"
		]
	}
];
const questionList = [
	...question1,
	...question2,
	...question3,
	...question4,
	...question5,
	...question6
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

const createElement = ( elementConfig ) => {
	const { tagName, className, id, innerHTML, innerText } = elementConfig;
	const element = document.createElement( tagName );
	if ( className && typeof className === "string" ) {
		element.classList.add( className );
	}
	else if ( className && Array.isArray( className ) ) {
		element.classList.add( ...className );
	}
	if ( id ) {
		element.id = id;
	}
	if ( innerHTML ) {
		element.innerHTML = innerHTML;
	}
	if ( innerText ) {
		element.innerText = innerText;
	}
	for ( let elementConfigKey in elementConfig ) {
		if ( [ "tagName", "className", "id", "innerHTML", "innerText" ].indexOf( elementConfigKey ) !== -1 ) {
			continue;
		}
		element.setAttribute( elementConfigKey, elementConfig[elementConfigKey] );
	}
	return element;
};
const addElementToDocument = ( element, cssString, fatherElement = document.body ) => {
	fatherElement.append( element );
	GM_addStyle( cssString );
};
( async () => {
	await getElement( document.body, ".question-option" );
	await Sleep.time( 1 );
	
	function getQuestionContent() {
		const questionDom = document.querySelector( ".question-stem" );
		return questionDom.innerText.replace( /<.*?>/, "" ).trim();
	}
	
	function getQuestionOptionsDom() {
		return document.querySelectorAll( ".question-option label" );
	}
	
	function getChildQuestionsDom() {
		return document.querySelectorAll( ".question-option .question-item" );
	}
	
	function getChildQuestionContent( childQuestionsDom ) {
		const questionDom = childQuestionsDom.querySelector( ".item-title span" );
		return questionDom.innerText.replace( /<.*?>/, "" ).trim();
	}
	
	function getChildQuestionOptionsDom( childQuestionsDom ) {
		return childQuestionsDom.querySelectorAll( "label" );
	}
	
	function getQuestionOptions( optionDomList ) {
		const options = [];
		optionDomList.forEach( ( option ) => {
			options.push( option.innerText.replace( "\n", "" ).replace( /^[ABCDEFG][、.．]/, "" ) );
		} );
		return options;
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
			console.log( "正在确定正确选项", option );
			console.log( answers, option );
			answers = answers.filter( ( content ) => {
				if ( !content ) {
					console.log( "没有答案" );
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
		
		const inputDom = document.querySelector( ".question-option textarea" ) || document.querySelector( ".question-option input" );
		inputDom.value = "";
		
		function submitValue( aimDom ) {
			aimDom.dispatchEvent( new Event( "focus" ) );
			aimDom.dispatchEvent( new Event( "input" ) );
			aimDom.dispatchEvent( new Event( "change" ) );
			aimDom.dispatchEvent( new Event( "blur" ) );
		}
		
		for ( const answerLetter of correctAnswer ) {
			if ( !answerLetter.match( /^[ABCDEFG]$/ ) ) {
				inputDom.value += answerLetter;
				await Sleep.time( 0.2 );
				submitValue( inputDom );
			}
			let answerNumber = answerLetterToNumber( answerLetter );
			const optionDom = optionDomList[answerNumber];
			if ( ( _a = optionDom == null ? void 0 : optionDom.classList ) == null ? void 0 : _a.contains( "is-checked" ) ) {
				continue;
			}
			optionDom == null ? void 0 : optionDom.click();
			await Sleep.time( 0.3 );
		}
	}
	
	function getNextQuestionBtn() {
		const nextBtn = document.querySelector( ".question-footer > button:last-of-type" );
		if ( nextBtn.innerText === "下一题" ) {
			return nextBtn;
		}
	}
	
	function nextQuestion( nextBtn ) {
		console.info( "进入下一题" );
		nextBtn.click();
	}
	
	let pageObserver;
	const addPageObserver = function () {
		const typeDom = document.querySelector( ".question-page" );
		pageObserver = new MutationObserver( () => {
			console.log( "页面更新" );
			getQuestionLoop();
		} );
		return function () {
			pageObserver.observe( typeDom, {
				subtree: true,
				childList: true
			} );
		};
	}();
	
	async function getQuestionLoop() {
		const domList = {
			nextBtn: getNextQuestionBtn()
		};
		const childQuestionsDomList = getChildQuestionsDom();
		if ( childQuestionsDomList[0] ) {
			childQuestionsDomList.forEach( async ( childQuestionsDom ) => {
				const questionContent = getChildQuestionContent( childQuestionsDom );
				const optionDomList = getChildQuestionOptionsDom( childQuestionsDom );
				const questionOptions = getQuestionOptions( optionDomList );
				const localQuestion = getQuestionFromLibrary( questionContent );
				console.log( "获取问题文本：", questionContent );
				console.log( "获取选项：", questionOptions );
				console.log( "获取当前问题题库：", localQuestion );
				if ( localQuestion ) {
					const answer = getAnswer( localQuestion, questionOptions );
					console.log( "获取当前问题的答案：", answer );
					if ( answer[0] ) {
						await clickAnswer( optionDomList, answer );
					}
				}
			} );
		}
		else {
			const questionContent = getQuestionContent();
			const optionDomList = getQuestionOptionsDom();
			const questionOptions = getQuestionOptions( optionDomList );
			const localQuestion = getQuestionFromLibrary( questionContent );
			console.log( "获取问题文本：", questionContent );
			console.log( "获取选项：", questionOptions );
			console.log( "获取当前问题题库：", localQuestion );
			if ( localQuestion ) {
				const answer = getAnswer( localQuestion, questionOptions );
				console.log( "获取当前问题的答案：", answer );
				if ( answer[0] ) {
					await clickAnswer( optionDomList, answer );
				}
			}
		}
		await Sleep.time( 1 );
		if ( domList.nextBtn ) {
			nextQuestion( domList.nextBtn );
			console.log( "切换下一题" );
		}
	}
	
	function addStopBtn() {
		const titleDom = document.querySelector( ".question-title" );
		const stopBtn = createElement( {
			tagName: "button",
			innerText: "Stop"
		} );
		stopBtn.onclick = ( e ) => {
			e.preventDefault();
			pageObserver.disconnect();
		};
		addElementToDocument( stopBtn, "", titleDom );
	}
	
	await getQuestionLoop();
	addPageObserver();
	addStopBtn();
} )();
