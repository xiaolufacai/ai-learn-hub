-- ============================================================
-- AI Learning Hub - Seed Data
-- Generated: 2026-06-05
-- ============================================================

-- ============================================================
-- 25 AI News Items
-- ============================================================

INSERT INTO ai_news (title, summary, content_mdx, source, url, category, image_url, slug, seo_title, meta_description, keywords, published_at) VALUES
('GPT-5正式发布：多模态推理能力大幅提升', 'OpenAI于今日正式发布GPT-5系列模型，在数学推理、代码生成和多模态理解方面实现了质的飞跃，多项基准测试刷新SOTA纪录。', '# GPT-5正式发布\n\nOpenAI今日正式发布GPT-5系列模型，包括GPT-5、GPT-5 Turbo和GPT-5 Mini三个版本。相比GPT-4，新模型在以下方面取得了显著突破：\n\n## 核心升级\n\n- **推理能力**: 在MATH基准测试中达到96.2%准确率，较GPT-4提升超过15个百分点\n- **代码生成**: HumanEval得分99.1%，可以独立完成复杂软件工程项目\n- **多模态理解**: 支持图像、音频、视频的深度理解和生成\n- **上下文窗口**: 默认支持100万token上下文，GPT-5 Turbo支持200万token\n\n## 应用场景\n\n新模型特别适合科学研究、软件开发、金融分析和教育辅导等专业领域。', 'OpenAI Blog', 'https://openai.com/blog/gpt-5', 'llm', 'https://images.unsplash.com/photo-1677442136019-21780ecad995', 'gpt-5-official-release', 'GPT-5正式发布：OpenAI新一代多模态大模型全面解读', 'OpenAI正式发布GPT-5系列模型，在推理、代码和多模态理解方面实现质的飞跃。了解GPT-5的核心升级、性能基准及应用场景。', ARRAY['GPT-5', 'OpenAI', '大语言模型', '多模态', '人工智能'], '2026-06-05 09:00:00+08'),

('Claude 4.5 Sonnet发布：编程能力再创新高', 'Anthropic发布Claude 4.5 Sonnet，在SWE-bench和代码生成任务上表现出色，同时增强了Agent能力和工具调用。', '# Claude 4.5 Sonnet发布\n\nAnthropic今日发布了Claude 4.5 Sonnet模型，这是Claude系列的最新版本，在编程能力和Agent行为方面达到了新的高度。\n\n## 主要亮点\n\n- **SWE-bench得分**：在SWE-bench Verified上达到78.5%，创下新纪录\n- **Agent能力**：增强了多步推理、工具调用和自主决策能力\n- **代码生成**：支持更复杂的代码重构和架构设计\n- **安全性**：持续改进RLHF训练，降低有害输出\n\n该模型已在Anthropic API和Claude Code中可用。', 'Anthropic Blog', 'https://www.anthropic.com/blog/claude-4-5-sonnet', 'llm', 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba', 'claude-4-5-sonnet', 'Claude 4.5 Sonnet发布：Anthropic最强编程模型深度评测', 'Anthropic发布Claude 4.5 Sonnet，SWE-bench达到78.5%，编程和Agent能力创下新纪录。了解Claude 4.5 Sonnet的核心升级。', ARRAY['Claude', 'Anthropic', '编程助手', 'Agent', '大语言模型'], '2026-06-04 14:30:00+08'),

('Google Gemini 2.5 Ultra正式上线：原生多模态能力惊艳', 'Google DeepMind推出Gemini 2.5 Ultra，原生支持文本、图像、音频和视频的多模态理解，在MMLU-Pro上达到92.3%的历史新高。', '# Gemini 2.5 Ultra正式上线\n\nGoogle DeepMind今日宣布Gemini 2.5 Ultra正式上线，这是目前最强大的原生多模态模型。\n\n## 技术突破\n\n- **原生多模态**: 从训练开始就整合文本、图像、音频、视频四种模态\n- **MMLU-Pro成绩**: 92.3%，超越所有现有模型\n- **视频理解**: 可处理长达2小时的视频内容并进行深度分析\n- **搜索整合**: 与Google搜索深度集成，实时信息获取\n\n## 开发者生态\n\n通过Google AI Studio和Vertex AI提供API访问，支持多种编程语言SDK。', 'Google AI', 'https://blog.google/technology/ai/gemini-2-5-ultra', 'llm', 'https://images.unsplash.com/photo-1676277791608-ac54966ceac1', 'gemini-2-5-ultra', 'Gemini 2.5 Ultra：Google最强多模态模型深度解读', 'Google DeepMind发布Gemini 2.5 Ultra，原生多模态支持，MMLU-Pro达92.3%。了解Gemini 2.5 Ultra的技术突破和开发者生态。', ARRAY['Gemini', 'Google', '多模态', 'DeepMind', '大语言模型'], '2026-06-04 08:00:00+08'),

('Meta发布Llama 4：开源大模型的里程碑', 'Meta正式开源Llama 4系列模型，包括7B、33B和70B三个规模，在多个基准测试中接近闭源顶级模型水平。', '# Llama 4开源发布\n\nMeta AI今日正式开源Llama 4系列模型，这标志着开源AI社区的重要里程碑。\n\n## 模型规格\n\n- **Llama 4 7B**: 适合边缘设备和移动端部署\n- **Llama 4 33B**: 在性能和效率之间取得最佳平衡\n- **Llama 4 70B**: 旗舰级开源模型，性能接近GPT-5\n\n## 技术特色\n\n- 采用MoE（混合专家）架构，推理效率大幅提升\n- 支持128K上下文窗口\n- 多语言能力超过100种语言\n- 完全开源，包括训练细节和技术报告\n\nLlama 4的发布将进一步推动AI民主化进程。', 'Meta AI', 'https://ai.meta.com/blog/llama-4', 'open-source', 'https://images.unsplash.com/photo-1682603927222-e040ce3f7b2c', 'meta-llama-4-open-source', 'Llama 4正式开源：Meta最强开源大模型全面解析', 'Meta发布Llama 4系列开源模型，7B/33B/70B三种规模，MoE架构，128K上下文。了解Llama 4的技术特色和应用前景。', ARRAY['Llama', 'Meta', '开源', '大语言模型', 'MoE'], '2026-06-03 16:00:00+08'),

('OpenAI发布新一代AI Agent框架：Operator全面开放', 'OpenAI宣布AI Agent框架Operator向所有Plus用户开放，支持浏览器自动化、文件操作和API调用的智能体功能。', '# Operator AI Agent框架全面开放\n\nOpenAI宣布其AI Agent框架Operator正式向所有Plus和Team用户开放，标志着AI Agent时代的到来。\n\n## 核心能力\n\n- **浏览器自动化**: 自动完成网页表单填写、信息提取、在线购物等操作\n- **文件系统操作**: 读写文件、组织文件夹、处理文档\n- **API集成**: 与超过2000个第三方服务集成\n- **多步骤规划**: 自动分解复杂任务为可执行步骤\n\n## 安全机制\n\n- 敏感操作需用户确认\n- 操作全程记录可审计\n- 沙箱环境执行不可信代码\n\nOperator的全面开放将极大提升AI的工作效率。', 'OpenAI Blog', 'https://openai.com/blog/operator-general-availability', 'agents', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e', 'openai-operator-agent-framework', 'OpenAI Operator全面开放：AI Agent框架深度体验', 'OpenAI Operator AI Agent框架向所有用户开放，支持浏览器自动化、文件操作和API集成。了解Operator的核心能力和安全机制。', ARRAY['AI Agent', 'OpenAI', 'Operator', '自动化', '智能体'], '2026-06-03 10:00:00+08'),

('Anthropic推出Claude Code 2.0：终端中的AI开发革命', 'Claude Code 2.0正式发布，支持多文件重构、自动化测试生成和完整的项目理解能力，开发者效率提升300%。', '# Claude Code 2.0：终端中的AI开发革命\n\nAnthropic发布了Claude Code 2.0，这是其命令行开发工具的里程碑式更新。\n\n## 重磅新功能\n\n- **多文件重构**: 一次性重构整个项目代码库\n- **自动化测试**: 根据代码变更自动生成单元测试和集成测试\n- **项目理解**: 深度理解项目架构，提供精准建议\n- **Git集成**: 自动生成commit信息、创建PR描述\n\n## 性能提升\n\n- 响应速度提升50%\n- 支持200K token上下文\n- 新增项目级记忆功能\n\nClaude Code 2.0正在改变开发者的日常工作方式。', 'Anthropic Blog', 'https://www.anthropic.com/blog/claude-code-2', 'tools', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', 'claude-code-2-0', 'Claude Code 2.0发布：终端AI开发工具全面升级', 'Anthropic发布Claude Code 2.0，支持多文件重构、自动化测试和项目理解。了解Claude Code 2.0的新功能和性能提升。', ARRAY['Claude Code', 'Anthropic', '开发工具', 'CLI', '编程助手'], '2026-06-02 15:30:00+08'),

('微软开源GraphRAG 2.0：知识图谱增强检索全面升级', '微软发布GraphRAG 2.0，引入动态知识图谱更新、多跳推理和可视化分析，在企业知识管理领域取得突破。', '# GraphRAG 2.0开源发布\n\n微软研究院发布了GraphRAG 2.0，这是知识图谱增强检索系统的重大升级版本。\n\n## 核心升级\n\n- **动态图谱更新**: 支持增量更新，无需全量重建\n- **多跳推理**: 支持跨文档、跨实体的复杂推理查询\n- **可视化分析**: 内置图谱可视化工具，直观展示知识关联\n- **性能优化**: 索引速度提升10倍，查询延迟降低80%\n\n## 应用场景\n\n- 企业知识管理\n- 科研文献分析\n- 法律文书检索\n- 医疗知识发现\n\nGraphRAG 2.0已在GitHub开源，获得广泛关注。', 'Microsoft Research', 'https://www.microsoft.com/en-us/research/blog/graphrag-2', 'research', 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d', 'microsoft-graphrag-2-0', 'GraphRAG 2.0：微软知识图谱增强检索技术深度解析', '微软发布GraphRAG 2.0，支持动态知识图谱、多跳推理和可视化分析。了解GraphRAG在企业知识管理中的应用。', ARRAY['GraphRAG', '微软', '知识图谱', 'RAG', '开源'], '2026-06-02 09:00:00+08'),

('清华团队开源MiniCPM-3：手机端运行的高性能模型', '清华大学联合面壁智能发布MiniCPM-3，仅2.4B参数却在多项任务中超越7B模型，适合移动端和边缘设备部署。', '# MiniCPM-3：小模型的大突破\n\n清华大学NLP实验室与面壁智能联合发布了MiniCPM-3模型，以2.4B参数量在多项基准测试中超越主流7B模型。\n\n## 技术亮点\n\n- **参数效率**: 2.4B参数达到7B模型水平\n- **端侧部署**: 可在高端手机上实时运行\n- **多语言支持**: 中英文能力均衡，支持50+语言\n- **开源协议**: Apache 2.0许可证，商业可用\n\n## 性能对比\n\n- MMLU: 68.5%\n- HumanEval: 72.3%\n- C-Eval: 82.1%\n\n小模型正在改变AI应用的分发方式。', '机器之心', 'https://www.jiqizhixin.com/articles/2026-06-02-3', 'open-source', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c', 'minicpm-3-edge-ai', 'MiniCPM-3：清华大学2.4B小模型超越7B大模型的秘密', '清华发布MiniCPM-3，2.4B参数超越主流7B模型，支持手机端运行。了解MiniCPM-3的技术创新和性能表现。', ARRAY['MiniCPM', '清华大学', '端侧AI', '开源模型', '小模型'], '2026-06-02 11:00:00+08'),

('Stability AI发布Stable Diffusion 4：AI绘画进入4K时代', 'Stable Diffusion 4正式发布，支持原生4K分辨率图像生成，引入3D场景理解和精确的文字渲染能力。', '# Stable Diffusion 4发布\n\nStability AI今日发布了Stable Diffusion 4，这是图像生成领域的重要里程碑。\n\n## 关键升级\n\n- **4K原生生成**: 支持4096x4096分辨率直接输出\n- **文字渲染**: 精确渲染图像中的文字，无需后期处理\n- **3D理解**: 支持多视角一致的人物和场景生成\n- **速度提升**: 4K图像生成仅需5秒（H100 GPU）\n\n## 模型架构\n\n采用改进的DiT（Diffusion Transformer）架构，结合3D VAE编码器，实现了更高质量和更快的生成速度。\n\nSD4的开源将再次推动AI创意工具的普及。', 'Stability AI Blog', 'https://stability.ai/news/stable-diffusion-4', 'multimodal', 'https://images.unsplash.com/photo-1547954575-855750c57bd3', 'stable-diffusion-4', 'Stable Diffusion 4发布：4K AI绘画新时代到来', 'Stability AI发布Stable Diffusion 4，支持4K原生生成、精确文字渲染和3D场景理解。了解SD4的技术架构和创作能力。', ARRAY['Stable Diffusion', 'Stability AI', '图像生成', 'AI绘画', '多模态'], '2026-06-01 20:00:00+08'),

('Google发布Veo 3：AI视频生成突破120秒', 'Google DeepMind推出Veo 3视频生成模型，支持120秒连贯视频生成，引入物理世界理解和镜头语言控制。', '# Veo 3：AI视频生成新纪元\n\nGoogle DeepMind发布了Veo 3视频生成模型，将AI视频生成的时长和质量推向新高度。\n\n## 核心能力\n\n- **120秒视频**: 生成长达2分钟的连贯视频\n- **物理理解**: 准确模拟重力、碰撞、流体等物理效果\n- **镜头控制**: 支持推拉摇移等专业摄像语言\n- **音频同步**: 视频与音频的自动匹配生成\n\n## 应用场景\n\n- 短视频创作\n- 广告制作\n- 电影预可视化\n- 教育培训内容\n\nVeo 3通过Google AI Studio提供API访问。', 'Google AI', 'https://blog.google/technology/ai/veo-3', 'multimodal', 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb', 'google-veo-3', 'Google Veo 3发布：120秒AI视频生成技术深度解读', 'Google DeepMind发布Veo 3，支持120秒连贯视频生成，物理世界理解和镜头控制。了解Veo 3的应用场景。', ARRAY['Veo', 'Google', '视频生成', 'AI视频', 'DeepMind'], '2026-06-01 13:00:00+08'),

('AI Agent创业公司CrewAI获1.5亿美元B轮融资', '多Agent协作平台CrewAI宣布完成1.5亿美元B轮融资，估值达到12亿美元，AI Agent赛道持续升温。', '# CrewAI获1.5亿美元B轮融资\n\nAI Agent平台CrewAI宣布完成1.5亿美元B轮融资，由Andreessen Horowitz领投，红杉资本和Index Ventures参投。\n\n## 公司背景\n\nCrewAI专注于多Agent协作框架，允许开发者快速构建由多个AI Agent组成的自动化工作流。其开源项目在GitHub获得超过30K星标。\n\n## 融资用途\n\n- 企业级产品开发\n- 团队扩张至200人\n- 国际市场拓展\n- 研究投入\n\nAI Agent已成为2026年最热门的AI投资赛道之一。', 'TechCrunch', 'https://techcrunch.com/2026/06/01/crewai-raises-150m', 'agents', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd', 'crewai-150m-funding', 'CrewAI完成1.5亿美元B轮融资：AI Agent赛道持续升温', 'CrewAI宣布完成1.5亿美元B轮融资，估值12亿美元。了解AI Agent领域的最新投资动态和CrewAI的发展规划。', ARRAY['CrewAI', 'AI Agent', '融资', '创业', '多Agent'], '2026-06-01 07:00:00+08'),

('苹果发布Apple Intelligence 2.0：设备端AI全面升级', '苹果在WWDC 2026上发布Apple Intelligence 2.0，大幅增强Siri能力、系统级AI功能和隐私保护机制。', '# Apple Intelligence 2.0发布\n\n苹果在WWDC 2026上发布了Apple Intelligence 2.0，这是其设备端AI战略的重要升级。\n\n## 主要更新\n\n- **Siri大升级**: 支持复杂多轮对话和跨应用操作\n- **设备端模型**: 3B参数模型在A18芯片上本地运行\n- **隐私保护**: 差分隐私和端侧处理确保数据安全\n- **开发者工具**: 全新Core ML API和AI开发套件\n\n## 生态整合\n\n- Xcode AI助手增强\n- 照片App智能编辑\n- 备忘录AI总结\n- 邮件智能回复\n\nApple Intelligence 2.0将在iOS 20和macOS 16中正式推出。', 'The Verge', 'https://www.theverge.com/2026/6/1/apple-intelligence-2-wwdc', 'tools', 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1', 'apple-intelligence-2-0', 'Apple Intelligence 2.0：WWDC 2026设备端AI全面解读', '苹果WWDC 2026发布Apple Intelligence 2.0，Siri大幅升级，设备端3B模型本地运行。了解苹果AI生态的最新进展。', ARRAY['Apple', 'AI', 'Siri', '端侧AI', 'WWDC'], '2026-06-01 10:00:00+08'),

('DeepSeek发布DeepSeek-V4：开源推理模型新标杆', 'DeepSeek发布V4系列模型，在数学和编程推理方面达到国际顶尖水平，且完全开源，引发全球AI社区关注。', '# DeepSeek-V4发布\n\nDeepSeek发布了V4系列模型，包括DeepSeek-V4和DeepSeek-V4-Coder两个版本，在推理能力方面达到了国际顶尖水平。\n\n## 性能表现\n\n- **MATH基准**: 95.8%准确率\n- **Codeforces评分**: 相当于2400+分的竞赛选手\n- **SWE-bench**: 69.2%解决率\n- **开源协议**: MIT许可证\n\n## 技术创新\n\n- 改进的MoE架构\n- 强化学习驱动的推理训练\n- 高效的推理时计算优化\n\nDeepSeek-V4证明了开源模型可以在推理能力上与闭源模型竞争。', 'DeepSeek Blog', 'https://deepseek.com/blog/deepseek-v4', 'open-source', 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28', 'deepseek-v4-reasoning', 'DeepSeek-V4发布：开源推理模型达到国际顶尖水平', 'DeepSeek发布V4系列模型，MATH 95.8%，Codeforces 2400+。了解DeepSeek-V4的技术创新和开源生态。', ARRAY['DeepSeek', '推理模型', '开源', '数学', '编程'], '2026-05-31 18:00:00+08'),

('Anthropic发布MCP协议2.0：Agent与工具的通用连接标准', 'Model Context Protocol 2.0发布，新增流式传输、双向通信和动态工具发现，被OpenAI和Google宣布支持。', '# MCP 2.0协议发布\n\nAnthropic发布了Model Context Protocol (MCP) 2.0，这是一个连接AI Agent与外部工具的开放标准协议。\n\n## 2.0新特性\n\n- **流式传输**: 支持实时数据流，适合长时间运行的工具\n- **双向通信**: Agent和工具之间可以相互调用和通知\n- **动态发现**: 运行时自动发现可用工具和更新\n- **安全增强**: OAuth 2.0集成和细粒度权限控制\n\n## 行业支持\n\nOpenAI、Google、微软和Meta已宣布将在各自平台中支持MCP 2.0标准。这标志着MCP正在成为AI Agent生态的通用协议。', 'Anthropic Blog', 'https://www.anthropic.com/blog/mcp-2-0', 'tools', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', 'mcp-2-0-protocol', 'MCP 2.0协议发布：AI Agent工具连接的通用标准', 'Anthropic发布MCP 2.0，支持流式传输、双向通信和动态工具发现，获OpenAI/Google/微软支持。了解MCP 2.0协议的技术细节。', ARRAY['MCP', 'Anthropic', '协议', 'Agent', '工具'], '2026-05-31 12:00:00+08'),

('Runway发布Gen-4：AI视频编辑进入实时时代', 'Runway发布Gen-4视频编辑模型，支持实时视频风格转换、人物替换和场景编辑，彻底改变视频后期制作流程。', '# Runway Gen-4发布\n\nRunway发布了Gen-4视频编辑模型，将AI视频编辑带入实时时代。\n\n## 革命性功能\n\n- **实时风格转换**: 视频风格实时转换，无需渲染等待\n- **人物替换**: 视频中的人物可被AI角色替换\n- **场景编辑**: 修改视频中的任何元素\n- **口型同步**: AI配音自动匹配口型\n\n## 性能指标\n\n- 1080p视频编辑延迟<50ms\n- 支持60fps实时处理\n- 兼容主流剪辑软件\n\nGen-4正在改变视频制作的工作流程。', 'TechCrunch', 'https://techcrunch.com/2026/05/31/runway-gen-4', 'multimodal', 'https://images.unsplash.com/photo-1574717024653-3946b9c05243', 'runway-gen-4', 'Runway Gen-4：实时AI视频编辑技术全面解析', 'Runway发布Gen-4，支持实时视频风格转换、人物替换和场景编辑。了解Gen-4如何改变视频后期制作。', ARRAY['Runway', '视频编辑', 'AI', 'Gen-4', '实时渲染'], '2026-05-31 09:00:00+08'),

('HuggingFace推出企业级模型托管平台HF Enterprise', 'HuggingFace发布企业级模型托管解决方案HF Enterprise，支持私有部署、合规审计和SLA保障，瞄准大型企业市场。', '# HF Enterprise发布\n\nHuggingFace今日推出了HF Enterprise，面向大型企业的模型托管和部署平台。\n\n## 企业级特性\n\n- **私有部署**: 支持VPC内部署，数据不出企业网络\n- **合规审计**: SOC 2 Type II、GDPR、HIPAA合规\n- **SLA保障**: 99.95%可用性承诺\n- **专属支持**: 24/7技术支持团队\n\n## 定价模式\n\n- Starter: $5,000/月起\n- Business: $25,000/月起\n- Enterprise: 定制报价\n\nHuggingFace从开源社区平台向商业化迈出了重要一步。', 'Ars Technica', 'https://arstechnica.com/ai/2026/05/huggingface-enterprise', 'tools', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'huggingface-enterprise', 'HuggingFace企业级平台发布：开源AI商业化的里程碑', 'HuggingFace发布HF Enterprise企业级模型托管平台，支持私有部署和合规审计。了解HF Enterprise的特性和定价。', ARRAY['HuggingFace', '企业级', '模型托管', 'MLOps', '平台'], '2026-05-30 16:00:00+08'),

('全球AI安全峰会达成《京都AI安全协议》', '在京都举行的全球AI安全峰会上，30多个国家签署了《京都AI安全协议》，建立了AI安全评估和风险管理的国际合作框架。', '# 《京都AI安全协议》签署\n\n在京都举行的全球AI安全峰会上，包括美国、中国、欧盟、日本在内的30多个国家和地区签署了《京都AI安全协议》。\n\n## 协议要点\n\n- **安全评估**: 建立统一的AI模型安全评估标准\n- **风险管理**: 对高风险AI系统实施强制性风险评估\n- **国际合作**: 建立AI安全信息共享机制\n- **人才培养**: 共同培养AI安全专业人才\n\n## 争议\n\n部分AI公司认为协议中的评估标准过于严格，可能影响创新速度。但支持者认为在AI能力快速增长的背景下，安全监管势在必行。', 'The Verge', 'https://www.theverge.com/2026/5/30/kyoto-ai-safety-agreement', 'research', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', 'kyoto-ai-safety-agreement', '《京都AI安全协议》签署：全球AI治理迈出关键一步', '30多个国家签署《京都AI安全协议》，建立AI安全评估和风险管理国际框架。了解协议要点和行业反应。', ARRAY['AI安全', '京都协议', '治理', '监管', '国际合作'], '2026-05-30 14:00:00+08'),

('OpenAI开源Codex CLI：终端中的AI编程助手', 'OpenAI开源了Codex CLI工具，在终端中提供代码生成、解释和调试功能，支持多种编程语言和框架。', '# Codex CLI开源\n\nOpenAI将其Codex CLI工具正式开源，为开发者提供终端中的AI编程体验。\n\n## 功能介绍\n\n- **代码生成**: 自然语言描述转代码\n- **代码解释**: 解释复杂代码逻辑\n- **调试助手**: 自动定位和修复Bug\n- **多语言**: 支持Python、JavaScript、Rust等50+语言\n\n## 技术架构\n\nCodex CLI基于OpenAI API，采用流式响应，支持本地模型和云端模型切换。\n\n开源后社区可以自由定制和扩展功能。', 'OpenAI Blog', 'https://openai.com/blog/codex-cli-open-source', 'tools', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479', 'openai-codex-cli', 'OpenAI开源Codex CLI：终端AI编程工具完全指南', 'OpenAI开源Codex CLI，终端中实现代码生成、解释和调试。了解Codex CLI的功能和技术架构。', ARRAY['Codex', 'OpenAI', 'CLI', '编程工具', '开源'], '2026-05-30 08:00:00+08'),

('百度发布文心一言5.0：中文理解能力再升级', '百度发布文心一言5.0，在中文理解、古诗词创作和专业领域知识方面表现突出，多项中文基准测试刷新纪录。', '# 文心一言5.0发布\n\n百度正式发布了文心一言5.0大语言模型，在中文理解和生成方面实现了显著提升。\n\n## 核心升级\n\n- **中文理解**: CLUE基准测试达到92.1%，创历史新高\n- **文学创作**: 古诗词、对联、文言文创作能力大幅提升\n- **专业领域**: 法律、医疗、金融领域知识更准确\n- **多模态**: 支持图像理解和生成\n\n## 应用生态\n\n- 百度搜索智能问答\n- 文心智能体平台\n- 百度文库AI写作\n- 百度网盘AI整理\n\n文心一言5.0通过百度智能云提供API服务。', '百度AI', 'https://ai.baidu.com/blog/ernie-5', 'llm', 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387', 'baidu-ernie-5', '文心一言5.0发布：百度中文大模型全面升级', '百度发布文心一言5.0，中文理解CLUE 92.1%，古诗词创作能力大幅提升。了解文心一言5.0的核心升级和应用生态。', ARRAY['文心一言', '百度', '中文NLP', '大语言模型', 'ERNIE'], '2026-05-29 19:00:00+08'),

('Anthropic研究揭示：AI模型可以自我改进训练数据', 'Anthropic发表研究论文，展示AI模型如何通过自我批评机制识别和改进训练数据中的错误，提升后续训练效果。', '# AI自我改进训练数据\n\nAnthropic发表了一篇重要研究论文，展示了AI模型自我改进训练数据的能力。\n\n## 研究方法\n\n- **自我批评**: 模型识别自身训练数据中的错误和偏见\n- **数据修正**: 自动生成更高质量的训练样本\n- **迭代提升**: 多轮自我改进后模型性能持续提升\n\n## 实验结果\n\n经过3轮自我改进，模型在HellaSwag、MMLU等基准上的表现提升了4-7个百分点。这一发现可能改变未来AI训练的数据准备流程。\n\n## 潜在风险\n\n研究者也警告，如果不加约束，自我改进可能导致模型偏离原始目标。', 'Anthropic Research', 'https://www.anthropic.com/research/self-improving-training-data', 'research', 'https://images.unsplash.com/photo-1507668077129-56e32842fceb', 'ai-self-improving-data', 'Anthropic研究：AI模型自我改进训练数据的突破性发现', 'Anthropic发表论文展示AI模型通过自我批评机制改进训练数据，3轮迭代后性能提升7个百分点。了解研究方法和实验结果。', ARRAY['Anthropic', '研究', '训练数据', '自我改进', '机器学习'], '2026-05-29 11:00:00+08'),

('阿里巴巴开源Qwen-3：多模态大模型的新选择', '阿里云开源Qwen-3系列模型，包括纯文本和多模态版本，在多项评测中表现优异，成为开源社区的重要力量。', '# Qwen-3开源发布\n\n阿里巴巴通义实验室开源了Qwen-3系列模型，涵盖从1.8B到72B的多个规模。\n\n## 模型家族\n\n- **Qwen-3 1.8B**: 超轻量，适合移动端\n- **Qwen-3 7B**: 主流开源模型\n- **Qwen-3 14B**: 性能与效率平衡\n- **Qwen-3 72B**: 旗舰模型\n- **Qwen-3-VL**: 多模态版本\n\n## 性能亮点\n\n- MMLU: 81.5% (72B)\n- HumanEval: 88.2% (72B)\n- 中文能力: C-Eval 91.3%\n- 支持128K上下文\n\n全部模型采用Apache 2.0开源协议。', '阿里云', 'https://tongyi.aliyun.com/blog/qwen-3', 'open-source', 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a', 'alibaba-qwen-3', 'Qwen-3开源：阿里巴巴多模态大模型全面解读', '阿里开源Qwen-3系列模型，1.8B到72B全系列，多模态支持。了解Qwen-3的性能表现和开源生态。', ARRAY['Qwen', '阿里巴巴', '开源', '多模态', '大语言模型'], '2026-05-29 08:00:00+08'),

('LangChain发布LangSmith 2.0：LLM应用可观测性平台升级', 'LangChain发布LangSmith 2.0，引入自动化评估、A/B测试和成本优化功能，帮助团队构建更可靠的LLM应用。', '# LangSmith 2.0发布\n\nLangChain发布了LangSmith 2.0，这是LLM应用可观测性和测试平台的重大升级。\n\n## 新功能\n\n- **自动化评估**: 基于LLM的自动评分和回归测试\n- **A/B测试**: 对比不同模型和Prompt的效果\n- **成本追踪**: 实时监控和优化API调用成本\n- **协作功能**: 团队共享测试用例和评估结果\n\n## 性能提升\n\n- 追踪延迟降低60%\n- 仪表板加载速度提升3倍\n- 新增50+集成\n\nLangSmith 2.0已支持超过300家企业的LLM生产应用。', 'LangChain Blog', 'https://blog.langchain.dev/langsmith-2', 'tools', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'langchain-langsmith-2', 'LangSmith 2.0发布：LLM应用可观测性平台全面升级', 'LangChain发布LangSmith 2.0，自动化评估、A/B测试和成本优化。了解LangSmith 2.0如何提升LLM应用可靠性。', ARRAY['LangChain', 'LangSmith', 'LLM', '可观测性', '测试'], '2026-05-28 14:00:00+08'),

('Perplexity推出企业搜索方案：AI驱动的知识管理', 'Perplexity发布Enterprise Search产品，将AI搜索能力与企业内部知识库结合，支持私有文档搜索和权限管理。', '# Perplexity企业搜索\n\nPerplexity推出了Enterprise Search产品，将AI驱动的搜索能力引入企业内部。\n\n## 产品特性\n\n- **私有文档搜索**: 搜索企业内部文档、Wiki、邮件\n- **权限管理**: 基于角色的访问控制\n- **引用溯源**: 所有答案附带来源引用\n- **数据安全**: 数据加密和隔离\n\n## 定价\n\n- Team: $40/用户/月\n- Business: $75/用户/月\n- Enterprise: 定制报价\n\nPerplexity从消费者搜索向企业市场扩展。', 'TechCrunch', 'https://techcrunch.com/2026/05/28/perplexity-enterprise', 'tools', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 'perplexity-enterprise-search', 'Perplexity企业搜索发布：AI知识管理新方案', 'Perplexity推出Enterprise Search，AI搜索结合企业知识库。了解Perplexity企业方案的特性和定价。', ARRAY['Perplexity', '企业搜索', 'AI搜索', '知识管理', 'SaaS'], '2026-05-28 10:00:00+08'),

('NVIDIA发布Blackwell Ultra GPU：AI训练的超级引擎', 'NVIDIA发布Blackwell Ultra GPU，相比H100训练性能提升4倍，推理性能提升8倍，将加速下一代AI模型的训练。', '# Blackwell Ultra发布\n\nNVIDIA在Computex 2026上发布了Blackwell Ultra GPU，这是AI计算硬件的又一次飞跃。\n\n## 性能指标\n\n- **训练性能**: 相比H100提升4倍（FP8）\n- **推理性能**: 相比H100提升8倍（INT4）\n- **显存**: 288GB HBM4\n- **功耗**: 1200W\n\n## 架构创新\n\n- 第二代Transformer Engine\n- NVLink 6.0: 1.8TB/s互联\n- 改进的张量核心\n\nBlackwell Ultra将为下一代AI模型的训练提供算力基础。', 'Ars Technica', 'https://arstechnica.com/gadgets/2026/05/nvidia-blackwell-ultra', 'research', 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb', 'nvidia-blackwell-ultra', 'NVIDIA Blackwell Ultra发布：AI计算性能飞跃', 'NVIDIA发布Blackwell Ultra GPU，训练性能4倍提升，推理8倍提升，288GB HBM4。了解Blackwell Ultra的架构创新。', ARRAY['NVIDIA', 'GPU', 'Blackwell', 'AI训练', '硬件'], '2026-05-28 17:00:00+08'),

('AI编程助手Cursor用户突破5000万', 'AI编程IDE Cursor宣布全球用户突破5000万，年收入超过5亿美元，成为增长最快的开发者工具之一。', '# Cursor用户突破5000万\n\nAI编程IDE Cursor宣布其全球注册用户突破5000万大关，成为AI开发者工具赛道的标杆企业。\n\n## 增长数据\n\n- **注册用户**: 5000万+\n- **付费用户**: 300万+\n- **年收入**: 超过5亿美元\n- **企业客户**: 超过10,000家\n\n## 成功因素\n\n- 深度集成的AI编程体验\n- 支持多种主流模型\n- 优秀的用户体验设计\n- 强大的社区和生态\n\nCursor正在改变软件开发的工作方式。', 'The Verge', 'https://www.theverge.com/2026/5/27/cursor-50m-users', 'tools', 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2', 'cursor-50m-users', 'Cursor用户突破5000万：AI编程工具的增长奇迹', 'Cursor宣布注册用户突破5000万，年收入超5亿美元。分析Cursor成功的因素和AI编程工具的未来。', ARRAY['Cursor', 'AI编程', 'IDE', '开发者工具', '增长'], '2026-05-27 09:30:00+08');

-- ============================================================
-- 20 GitHub Trending Projects
-- ============================================================

INSERT INTO github_projects (repo_name, description, stars, growth, category, language, url, slug, seo_title, meta_description, keywords) VALUES
('langchain-ai/langgraph', 'Build resilient language agents as graphs. LangGraph is a library for building stateful, multi-actor applications with LLMs.', 38500, 3200, 'agents', 'Python', 'https://github.com/langchain-ai/langgraph', 'langchain-ai-langgraph', 'LangGraph：构建有状态的多Agent LLM应用框架', 'LangGraph是LangChain推出的LLM Agent框架，支持构建有状态、多角色协作的智能体应用。GitHub 38.5K星标。', ARRAY['LangGraph', 'LangChain', 'Agent', 'LLM', 'Python']),
('crewAIInc/crewAI', 'Framework for orchestrating role-playing, autonomous AI agents. By fostering collaborative intelligence, CrewAI empowers agents to work together seamlessly.', 30500, 2800, 'agents', 'Python', 'https://github.com/crewAIInc/crewAI', 'crewaiinc-crewai', 'CrewAI：多Agent协作编排框架', 'CrewAI是一个多AI Agent协作框架，支持角色扮演和自主协作。GitHub 30.5K星标，AI Agent领域最受欢迎的项目之一。', ARRAY['CrewAI', 'Multi-Agent', '协作', 'AI Agent', 'Python']),
('microsoft/graphrag', 'A modular graph-based Retrieval-Augmented Generation (RAG) system for complex data discovery.', 28500, 4500, 'rag', 'Python', 'https://github.com/microsoft/graphrag', 'microsoft-graphrag', 'GraphRAG：微软知识图谱增强检索系统', '微软GraphRAG，基于知识图谱的RAG系统，支持复杂数据发现和多跳推理。GitHub 28.5K星标。', ARRAY['GraphRAG', 'Microsoft', '知识图谱', 'RAG', 'Python']),
('anthropics/anthropic-sdk-python', 'The official Python library for the Anthropic API. Provides convenient access to Claude models.', 22000, 1800, 'sdk', 'Python', 'https://github.com/anthropics/anthropic-sdk-python', 'anthropics-anthropic-sdk-python', 'Anthropic Python SDK：Claude API官方开发库', 'Anthropic官方Python SDK，提供对Claude系列模型的便捷访问。支持流式响应、工具调用和多模态输入。', ARRAY['Anthropic', 'SDK', 'Claude', 'Python', 'API']),
('vercel/ai', 'Build AI-powered applications with React and Svelte. The AI SDK by Vercel provides tools for building AI apps.', 20000, 2200, 'sdk', 'TypeScript', 'https://github.com/vercel/ai', 'vercel-ai-sdk', 'Vercel AI SDK：构建AI驱动的Web应用', 'Vercel AI SDK提供React和Svelte的AI应用构建工具，支持流式UI和多模型切换。GitHub 20K星标。', ARRAY['Vercel', 'AI SDK', 'React', 'Svelte', 'Web开发']),
('meta-llama/llama', 'Official Llama model code and inference tools from Meta AI. Includes Llama 4 model weights and recipes.', 75000, 5600, 'llm', 'Python', 'https://github.com/meta-llama/llama', 'meta-llama-llama', 'Llama：Meta官方开源大语言模型', 'Meta Llama系列模型官方仓库，包含Llama 4模型代码、权重和推理工具。GitHub 75K星标。', ARRAY['Llama', 'Meta', '开源', '大语言模型', 'Python']),
('ollama/ollama', 'Get up and running with Llama, Mistral, Gemma, and other large language models locally.', 95000, 8500, 'llm', 'Go', 'https://github.com/ollama/ollama', 'ollama-ollama', 'Ollama：本地运行大语言模型的最简单方式', 'Ollama让你在本地轻松运行Llama、Mistral等大语言模型。支持模型管理和API接口。GitHub 95K星标。', ARRAY['Ollama', '本地部署', 'LLM', 'Go', '模型管理']),
('openai/openai-cookbook', 'Examples and guides for using the OpenAI API. Official collection of code examples and best practices.', 62000, 3500, 'sdk', 'Jupyter Notebook', 'https://github.com/openai/openai-cookbook', 'openai-openai-cookbook', 'OpenAI Cookbook：OpenAI API最佳实践指南', 'OpenAI官方代码示例和最佳实践集合，涵盖GPT-5、Assistant API、Fine-tuning等。GitHub 62K星标。', ARRAY['OpenAI', 'Cookbook', 'API', '教程', 'Jupyter']),
('microsoft/autogen', 'A programming framework for agentic AI. AutoGen enables building next-gen AI applications using multi-agent conversations.', 38000, 2100, 'agents', 'Python', 'https://github.com/microsoft/autogen', 'microsoft-autogen', 'AutoGen：微软多Agent对话编程框架', '微软AutoGen，多Agent对话编程框架，支持构建下一代AI应用。GitHub 38K星标。', ARRAY['AutoGen', 'Microsoft', 'Multi-Agent', '对话', 'Python']),
('run-llama/llama_index', 'LlamaIndex is a data framework for LLM applications. Connect custom data sources to large language models.', 42000, 2600, 'rag', 'Python', 'https://github.com/run-llama/llama_index', 'run-llama-llama-index', 'LlamaIndex：LLM数据框架，连接数据与模型', 'LlamaIndex是LLM应用的数据框架，将自定义数据源连接到大语言模型。GitHub 42K星标，RAG领域标杆项目。', ARRAY['LlamaIndex', 'RAG', '数据框架', 'LLM', 'Python']),
('deepseek-ai/DeepSeek-V4', 'DeepSeek-V4: A strong open-source Mixture-of-Experts language model with advanced reasoning capabilities.', 35000, 9200, 'llm', 'Python', 'https://github.com/deepseek-ai/DeepSeek-V4', 'deepseek-ai-deepseek-v4', 'DeepSeek-V4：强大的开源MoE推理模型', 'DeepSeek-V4开源推理模型，MoE架构，数学和编程能力达到国际顶尖水平。GitHub 35K星标。', ARRAY['DeepSeek', 'MoE', '推理', '开源', 'Python']),
('XingangPan/DragGAN', 'Official Code for DragGAN -- Interactive Point-based Manipulation on the Generative Image Manifold.', 36000, 600, 'multimodal', 'Python', 'https://github.com/XingangPan/DragGAN', 'xingangpan-draggan', 'DragGAN：交互式图像操控的革命性工具', 'DragGAN实现基于拖拽点的交互式图像编辑，让图像操控像拖拽一样简单。GitHub 36K星标。', ARRAY['DragGAN', '图像编辑', 'GAN', '交互式', 'Python']),
('AIGC-Audio/AudioGPT', 'AudioGPT: Understanding and Generating Speech, Music, Sound, and Talking Head.', 15000, 1200, 'multimodal', 'Python', 'https://github.com/AIGC-Audio/AudioGPT', 'aigc-audio-audiogpt', 'AudioGPT：音频理解与生成的统一框架', 'AudioGPT统一音频理解和生成，支持语音、音乐、音效和人脸动画。GitHub 15K星标。', ARRAY['AudioGPT', '音频', '语音', '音乐', '多模态']),
('BerriAI/litellm', 'Call all LLM APIs using the OpenAI format. Use GPT, Claude, Gemini, Llama and more with a unified interface.', 18000, 1900, 'tools', 'Python', 'https://github.com/BerriAI/litellm', 'berriai-litellm', 'LiteLLM：统一LLM API调用的Python库', 'LiteLLM使用OpenAI格式调用所有LLM API，统一的接口支持GPT、Claude、Gemini等。GitHub 18K星标。', ARRAY['LiteLLM', 'API', '统一接口', 'LLM', 'Python']),
('CopilotKit/CopilotKit', 'The open-source Copilot framework. Build in-app AI chatbots and AI-powered textareas.', 11000, 1500, 'tools', 'TypeScript', 'https://github.com/CopilotKit/CopilotKit', 'copilotkit-copilotkit', 'CopilotKit：开源AI Copilot构建框架', 'CopilotKit开源框架，快速构建应用内AI聊天机器人和AI文本区域。GitHub 11K星标。', ARRAY['CopilotKit', 'Copilot', 'React', 'AI组件', '开源']),
('huggingface/transformers', 'Transformers: State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX.', 140000, 5000, 'llm', 'Python', 'https://github.com/huggingface/transformers', 'huggingface-transformers', 'Transformers：HuggingFace最先进的机器学习库', 'HuggingFace Transformers，最流行的预训练模型库，支持PyTorch/TensorFlow/JAX。GitHub 140K星标。', ARRAY['Transformers', 'HuggingFace', 'NLP', '预训练', 'Python']),
('THUDM/ChatGLM-6B', 'ChatGLM3-6B: An Open Bilingual Dialogue Language Model by Tsinghua University.', 41000, 1800, 'llm', 'Python', 'https://github.com/THUDM/ChatGLM-6B', 'thudm-chatglm-6b', 'ChatGLM：清华大学开源双语对话模型', '清华大学ChatGLM系列开源双语对话模型，中英文双语支持。GitHub 41K星标。', ARRAY['ChatGLM', '清华大学', '对话模型', '中英双语', 'Python']),
('shadcn-ui/ui', 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.', 85000, 7200, 'tools', 'TypeScript', 'https://github.com/shadcn-ui/ui', 'shadcn-ui-ui', 'shadcn/ui：可复制粘贴的精美React组件库', 'shadcn/ui，可复制粘贴到应用中的精美设计组件。开源、可访问、可定制。GitHub 85K星标，前端开发必备。', ARRAY['shadcn/ui', 'React', '组件库', 'Tailwind', '前端']),
('ChatGPTNextWeb/ChatGPT-Next-Web', 'A cross-platform ChatGPT/Gemini UI. One-Click to deploy your own web UI for LLMs.', 82000, 3800, 'tools', 'TypeScript', 'https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web', 'chatgptnextweb-chatgpt-next-web', 'ChatGPT Next Web：一键部署跨平台LLM UI', 'ChatGPT Next Web，跨平台ChatGPT/Gemini UI，一键部署私有LLM Web界面。GitHub 82K星标。', ARRAY['ChatGPT', 'Web UI', '跨平台', '一键部署', 'Next.js']),
('jlowin/fastmcp', 'A TypeScript framework for building MCP servers capable of handling client sessions.', 8500, 2100, 'mcp', 'TypeScript', 'https://github.com/jlowin/fastmcp', 'jlowin-fastmcp', 'FastMCP：构建MCP服务器的TypeScript框架', 'FastMCP是TypeScript的MCP服务器构建框架，支持客户端会话管理。GitHub 8.5K星标，MCP生态重要工具。', ARRAY['FastMCP', 'MCP', 'TypeScript', '服务器', '框架']);

-- ============================================================
-- 20 AI Tools
-- ============================================================

INSERT INTO ai_tools (name, description, category, pricing, url, features, logo_url, slug, seo_title, meta_description, keywords) VALUES
('Cursor', 'AI-first code editor built on VS Code. Features tab completion, inline editing, chat, and agent mode for complex refactoring.', 'code-assistant', '$20/mo', 'https://cursor.sh', ARRAY['AI代码补全', '内联编辑', 'Chat对话', 'Agent模式', '多文件重构', '支持GPT-5/Claude'], 'https://cursor.sh/favicon.ico', 'cursor', 'Cursor：AI优先的代码编辑器 | 智能编程助手', 'Cursor是基于VS Code的AI代码编辑器，支持Tab补全、内联编辑、Chat和Agent模式。支持GPT-5和Claude模型。定价$20/月。', ARRAY['Cursor', 'AI编辑器', '代码助手', 'IDE', '编程']),
('GitHub Copilot', 'AI pair programmer by GitHub. Provides code suggestions, chat, and agent capabilities directly in your IDE.', 'code-assistant', '$10/mo', 'https://github.com/features/copilot', ARRAY['实时代码建议', 'Copilot Chat', 'Agent模式', '代码审查', '多IDE支持', '企业版可用'], 'https://github.githubassets.com/favicons/favicon.svg', 'github-copilot', 'GitHub Copilot：AI结对编程助手 | 代码智能补全', 'GitHub Copilot是GitHub推出的AI编程助手，提供实时代码建议、Chat和Agent功能。支持VS Code/JetBrains等主流IDE。', ARRAY['GitHub Copilot', '微软', '代码补全', 'AI编程', 'IDE插件']),
('Claude Code', 'Anthropic''s official terminal-based AI coding tool. Deep project understanding, multi-file refactoring, and automated testing.', 'code-assistant', '$20/mo', 'https://claude.ai', ARRAY['终端编程助手', '项目理解', '多文件重构', '自动化测试', 'Git集成', '自定义命令'], 'https://claude.ai/favicon.ico', 'claude-code', 'Claude Code：终端AI编程工具 | Anthropic官方', 'Claude Code是Anthropic官方终端AI编程工具，深度项目理解、多文件重构和自动化测试。定价$20/月起。', ARRAY['Claude Code', 'Anthropic', '终端', 'CLI', '编程']),
('Windsurf', 'Agentic IDE by Codeium. AI flow state with cascade, command, and supercomplete features.', 'ide', '$15/mo', 'https://codeium.com/windsurf', ARRAY['Cascade流式编程', 'Supercomplete智能补全', '多文件编辑', 'AI命令面板', '终端集成', '团队协作'], 'https://codeium.com/favicon.ico', 'windsurf', 'Windsurf：AI流式编程IDE | Codeium出品', 'Windsurf是Codeium推出的AI IDE，Cascade流式编程、Supercomplete智能补全、多文件编辑。定价$15/月。', ARRAY['Windsurf', 'Codeium', 'AI IDE', '流式编程', '智能补全']),
('v0 by Vercel', 'Generative UI tool by Vercel. Create production-ready React components and pages from text descriptions.', 'design', 'Freemium', 'https://v0.dev', ARRAY['文本生成UI', 'React组件生成', 'Tailwind CSS', '响应式设计', '预览导出', 'Figma导入'], 'https://v0.dev/favicon.ico', 'v0-by-vercel', 'v0 by Vercel：文本生成UI的AI设计工具', 'v0是Vercel推出的生成式UI工具，从文本描述生成React组件和页面。支持Tailwind CSS和响应式设计。Freemium模式。', ARRAY['v0', 'Vercel', 'UI生成', 'React', '设计工具']),
('Bolt.new', 'AI-powered full-stack app builder by StackBlitz. Prompt, edit, and deploy web apps instantly in the browser.', 'code-assistant', 'Freemium', 'https://bolt.new', ARRAY['全栈应用生成', '浏览器即时部署', 'WebContainers技术', '即时预览', 'GitHub集成', 'NPM包支持'], 'https://bolt.new/favicon.ico', 'bolt-new', 'Bolt.new：AI全栈应用构建器 | 浏览器即时开发', 'Bolt.new是StackBlitz推出的AI全栈应用构建器，在浏览器中即时生成、编辑和部署Web应用。基于WebContainers技术。', ARRAY['Bolt', 'StackBlitz', '全栈', 'WebContainers', '即时部署']),
('Replit Agent', 'AI agent that builds and deploys full applications on Replit. From natural language to working app in minutes.', 'code-assistant', '$25/mo', 'https://replit.com', ARRAY['自然语言转应用', '全栈应用构建', '一键部署', '数据库集成', '协作开发', '移动端预览'], 'https://replit.com/favicon.ico', 'replit-agent', 'Replit Agent：AI全栈应用构建与部署平台', 'Replit Agent可以从自然语言描述构建完整应用并一键部署。支持数据库集成和协作开发。定价$25/月。', ARRAY['Replit', 'AI Agent', '应用构建', '部署', '全栈']),
('Perplexity AI', 'AI-powered answer engine. Real-time web search with cited sources and deep research capabilities.', 'research', '$20/mo', 'https://perplexity.ai', ARRAY['实时网络搜索', '来源引用', '深度研究', '文件上传分析', '多轮对话', 'Pro Search'], 'https://perplexity.ai/favicon.ico', 'perplexity-ai', 'Perplexity AI：AI驱动的答案引擎 | 实时搜索', 'Perplexity AI是AI答案引擎，实时网络搜索并附带引用来源。支持深度研究和文件分析。定价$20/月。', ARRAY['Perplexity', 'AI搜索', '答案引擎', '研究工具', '实时搜索']),
('ChatGPT', 'OpenAI''s conversational AI. The most popular AI chat platform with GPT-5, DALL-E, browsing, and data analysis.', 'productivity', '$20/mo', 'https://chatgpt.com', ARRAY['GPT-5对话', 'DALL-E图像生成', '网页浏览', '数据分析', '文件上传', 'GPTs自定义'], 'https://chatgpt.com/favicon.ico', 'chatgpt', 'ChatGPT：OpenAI最强AI聊天平台 | GPT-5驱动', 'ChatGPT是OpenAI的AI对话平台，搭载GPT-5模型，支持图像生成、网页浏览和数据分析。定价$20/月。', ARRAY['ChatGPT', 'OpenAI', 'AI聊天', 'GPT-5', '多模态']),
('Claude.ai', 'Anthropic''s AI assistant. Advanced reasoning, 200K context, and computer use capabilities.', 'productivity', '$20/mo', 'https://claude.ai', ARRAY['200K上下文', '计算机使用', '文件分析', '代码执行', 'Artifacts', '项目知识库'], 'https://claude.ai/favicon.ico', 'claude-ai', 'Claude.ai：Anthropic AI助手 | 200K上下文', 'Claude.ai是Anthropic的AI助手，200K上下文窗口，支持计算机使用、文件分析和代码执行。定价$20/月。', ARRAY['Claude', 'Anthropic', 'AI助手', '长上下文', 'Computer Use']),
('Gemini', 'Google''s most capable AI model. Native multimodal understanding and deep integration with Google ecosystem.', 'productivity', '$19.99/mo', 'https://gemini.google.com', ARRAY['原生多模态', 'Google生态集成', 'Gmail/Drive分析', '2M上下文窗口', 'Gemini Live语音', 'Deep Research'], 'https://gemini.google.com/favicon.ico', 'gemini-advanced', 'Gemini Advanced：Google最强AI助手 | 2M上下文', 'Gemini Advanced是Google最强AI，原生多模态理解，2M上下文窗口，深度集成Google生态系统。定价$19.99/月。', ARRAY['Gemini', 'Google', '多模态', 'AI助手', 'Google生态']),
('Notion AI', 'AI-powered workspace. Write, edit, summarize, and generate content within Notion.', 'productivity', '$10/mo', 'https://notion.so/product/ai', ARRAY['AI写作助手', '内容摘要', '自动翻译', '数据库AI分析', 'AI模板', '问答搜索'], 'https://notion.so/favicon.ico', 'notion-ai', 'Notion AI：AI增强的工作空间 | 智能协作', 'Notion AI集成到Notion工作空间，提供AI写作、摘要、翻译和数据库分析功能。附加$10/月。', ARRAY['Notion', 'AI写作', '工作空间', '协作', '知识管理']),
('Midjourney', 'Leading AI image generation platform. Create stunning artwork from text descriptions with unprecedented artistic quality.', 'design', '$30/mo', 'https://midjourney.com', ARRAY['文本生成图像', '风格参考', '角色一致性', '图像变体', '高分辨率导出', '社区画廊'], 'https://midjourney.com/favicon.ico', 'midjourney', 'Midjourney：顶级AI图像生成平台 | 艺术创作', 'Midjourney是领先的AI图像生成平台，从文本描述创作惊艳的艺术作品。支持风格参考和角色一致性。定价$30/月。', ARRAY['Midjourney', 'AI绘画', '图像生成', '艺术创作', '设计']),
('Gamma', 'AI-powered presentation and document creator. Generate beautiful presentations, documents, and websites in seconds.', 'productivity', 'Freemium', 'https://gamma.app', ARRAY['AI演示文稿生成', '文档创作', '网页生成', '模板库', '实时协作', '导出PPT/PDF'], 'https://gamma.app/favicon.ico', 'gamma-ai', 'Gamma：AI演示文稿和文档创作工具', 'Gamma是AI驱动的演示文稿和文档创作工具，秒速生成精美的演示文稿、文档和网页。Freemium模式。', ARRAY['Gamma', '演示文稿', '文档', 'AI生成', 'PPT']),
('Suno', 'AI music generation platform. Create full songs with vocals and instruments from text prompts.', 'design', 'Freemium', 'https://suno.ai', ARRAY['文本生成音乐', '人声合成', '多种音乐风格', '歌词生成', '歌曲编辑', '商业使用权'], 'https://suno.ai/favicon.ico', 'suno-ai', 'Suno：AI音乐生成平台 | 文本转歌曲', 'Suno是AI音乐生成平台，从文本提示创建完整歌曲。支持人声合成和多种音乐风格。Freemium模式。', ARRAY['Suno', 'AI音乐', '音乐生成', '歌曲创作', '音频']),
('Descript', 'AI-powered video and audio editor. Edit media by editing text, with AI voice cloning and screen recording.', 'design', '$24/mo', 'https://descript.com', ARRAY['文本编辑视频', 'AI配音克隆', '屏幕录制', '自动字幕', '降噪处理', '团队协作'], 'https://descript.com/favicon.ico', 'descript', 'Descript：AI视频音频编辑器 | 文本编辑视频', 'Descript是AI驱动的视频音频编辑器，像编辑文本一样编辑视频，支持AI配音克隆和屏幕录制。定价$24/月。', ARRAY['Descript', '视频编辑', '音频编辑', 'AI配音', '字幕']),
('Jasper', 'AI content creation platform for enterprise marketing teams. Generate blog posts, social media, and ad copy.', 'productivity', '$49/mo', 'https://jasper.ai', ARRAY['博客文章生成', '社交媒体内容', '广告文案', '品牌声音定制', 'SEO优化', '团队协作'], 'https://jasper.ai/favicon.ico', 'jasper-ai', 'Jasper：企业级AI内容创作平台 | 营销文案', 'Jasper是企业级AI内容创作平台，生成博客、社交媒体和广告文案。支持品牌声音定制。定价$49/月。', ARRAY['Jasper', '内容创作', '营销', '文案', '企业级']),
('Anthropic Console', 'Anthropic''s developer platform for prompt engineering and Claude API management. Test, iterate, and deploy prompts.', 'research', 'Freemium', 'https://console.anthropic.com', ARRAY['Prompt工程工作台', 'Claude API管理', 'A/B测试', 'Workbench调试', '用量监控', '团队协作'], 'https://console.anthropic.com/favicon.ico', 'anthropic-console', 'Anthropic Console：Claude API开发平台 | Prompt工程', 'Anthropic Console是Claude API开发平台，提供Prompt工程工作台、A/B测试和用量监控。Freemium模式。', ARRAY['Anthropic Console', 'Prompt工程', 'Claude API', '开发平台', '调试']),
('LangFuse', 'Open-source LLM observability platform. Traces, evaluations, prompt management, and metrics for LLM applications.', 'research', 'Freemium', 'https://langfuse.com', ARRAY['LLM调用追踪', '自动化评估', 'Prompt管理', '成本分析', '质量监控', '开源自托管'], 'https://langfuse.com/favicon.ico', 'langfuse', 'LangFuse：开源LLM可观测性平台 | 追踪与评估', 'LangFuse是开源LLM可观测性平台，提供调用追踪、自动化评估、Prompt管理和成本分析。支持自托管。', ARRAY['LangFuse', 'LLM', '可观测性', '追踪', '开源']),
('CodeRabbit', 'AI-powered code reviewer. Automated pull request reviews with context-aware suggestions and bug detection.', 'code-assistant', '$12/mo', 'https://coderabbit.ai', ARRAY['自动PR审查', '上下文感知建议', 'Bug检测', '安全漏洞扫描', '代码风格检查', '多语言支持'], 'https://coderabbit.ai/favicon.ico', 'coderabbit', 'CodeRabbit：AI代码审查工具 | PR自动审查', 'CodeRabbit是AI驱动的代码审查工具，自动PR审查，上下文感知建议和Bug检测。支持主流编程语言。定价$12/月。', ARRAY['CodeRabbit', '代码审查', 'PR', 'AI审查', 'Bug检测']);

-- ============================================================
-- 15 MCP Servers
-- ============================================================

INSERT INTO mcp_servers (name, description, github_url, category, install_cmd, slug, seo_title, meta_description, keywords) VALUES
('@anthropic/mcp-server-brave-search', 'MCP server for Brave Search API integration. Enables AI assistants to perform web searches and retrieve real-time information.', 'https://github.com/anthropics/mcp-server-brave-search', 'search', 'npx @anthropic/mcp-server-brave-search', 'anthropic-mcp-server-brave-search', 'Brave Search MCP Server：AI网络搜索集成', 'Anthropic官方MCP服务器，集成Brave Search API，让AI助手具备网络搜索和实时信息检索能力。', ARRAY['Brave Search', 'MCP', '搜索', 'Anthropic', 'API']),
('@anthropic/mcp-server-filesystem', 'MCP server for secure file system operations. Read, write, and manage files with configurable access controls.', 'https://github.com/anthropics/mcp-server-filesystem', 'tools', 'npx @anthropic/mcp-server-filesystem', 'anthropic-mcp-server-filesystem', 'Filesystem MCP Server：AI文件系统操作', 'Anthropic官方MCP服务器，提供安全的文件系统操作，支持可配置的访问控制。', ARRAY['文件系统', 'MCP', '安全', 'Anthropic', '工具']),
('@anthropic/mcp-server-github', 'MCP server for GitHub API. Manage repositories, issues, PRs, and workflows through AI assistants.', 'https://github.com/anthropics/mcp-server-github', 'tools', 'npx @anthropic/mcp-server-github', 'anthropic-mcp-server-github', 'GitHub MCP Server：AI GitHub操作集成', 'Anthropic官方MCP服务器，集成GitHub API，管理仓库、Issues、PR和工作流。', ARRAY['GitHub', 'MCP', '版本控制', 'Anthropic', 'API']),
('@anthropic/mcp-server-postgres', 'MCP server for PostgreSQL database. Query and manage PostgreSQL databases through AI assistants.', 'https://github.com/anthropics/mcp-server-postgres', 'database', 'npx @anthropic/mcp-server-postgres', 'anthropic-mcp-server-postgres', 'Postgres MCP Server：AI数据库查询管理', 'Anthropic官方MCP服务器，连接PostgreSQL数据库，通过AI助手查询和管理数据库。', ARRAY['PostgreSQL', 'MCP', '数据库', 'Anthropic', 'SQL']),
('@anthropic/mcp-server-puppeteer', 'MCP server for browser automation with Puppeteer. Navigate web pages, take screenshots, and extract data.', 'https://github.com/anthropics/mcp-server-puppeteer', 'tools', 'npx @anthropic/mcp-server-puppeteer', 'anthropic-mcp-server-puppeteer', 'Puppeteer MCP Server：AI浏览器自动化', 'Anthropic官方MCP服务器，提供Puppeteer浏览器自动化能力，导航网页、截图和数据提取。', ARRAY['Puppeteer', 'MCP', '浏览器', '自动化', 'Anthropic']),
('@anthropic/mcp-server-slack', 'MCP server for Slack integration. Send and read messages, manage channels through AI assistants.', 'https://github.com/anthropics/mcp-server-slack', 'communication', 'npx @anthropic/mcp-server-slack', 'anthropic-mcp-server-slack', 'Slack MCP Server：AI Slack集成', 'Anthropic官方MCP服务器，集成Slack，通过AI助手发送和阅读消息、管理频道。', ARRAY['Slack', 'MCP', '通讯', 'Anthropic', '集成']),
('@modelcontextprotocol/server-everything', 'A reference MCP server with examples of every MCP feature: resources, tools, prompts, and sampling.', 'https://github.com/modelcontextprotocol/server-everything', 'reference', 'npx @modelcontextprotocol/server-everything', 'modelcontextprotocol-server-everything', 'Everything MCP Server：MCP功能参考实现', 'MCP官方参考服务器，展示所有MCP功能：资源、工具、提示和采样。适合学习MCP开发。', ARRAY['MCP', '参考', '示例', '教程', '官方']),
('@zueai/mcp-server-docker', 'MCP server for Docker container management. Pull, run, and manage Docker containers through AI.', 'https://github.com/zueai/mcp-server-docker', 'devops', 'npx @zueai/mcp-server-docker', 'zueai-mcp-server-docker', 'Docker MCP Server：AI容器管理', '社区MCP服务器，Docker容器管理，通过AI拉取、运行和管理Docker容器。', ARRAY['Docker', 'MCP', '容器', 'DevOps', '社区']),
('@nickclyde/mcp-server-supabase', 'MCP server for Supabase. Manage database, auth, and storage through AI assistants.', 'https://github.com/nickclyde/mcp-server-supabase', 'database', 'npx @nickclyde/mcp-server-supabase', 'nickclyde-mcp-server-supabase', 'Supabase MCP Server：AI Supabase管理', '社区MCP服务器，Supabase集成，通过AI管理数据库、认证和存储。', ARRAY['Supabase', 'MCP', '数据库', 'BaaS', '社区']),
('@mcp-get/mcp-server-fetch', 'MCP server for HTTP requests. Make web requests from AI assistants with full HTTP method support.', 'https://github.com/mcp-get/mcp-server-fetch', 'tools', 'npx @mcp-get/mcp-server-fetch', 'mcp-get-mcp-server-fetch', 'Fetch MCP Server：AI HTTP请求工具', '社区MCP服务器，提供HTTP请求能力，支持完整的HTTP方法和自定义Header。', ARRAY['HTTP', 'MCP', '请求', 'Fetch', '社区']),
('@smithery-ai/mcp-server-tavily', 'MCP server for Tavily Search API. AI-optimized web search designed for LLMs and RAG applications.', 'https://github.com/smithery-ai/mcp-server-tavily', 'search', 'npx @smithery-ai/mcp-server-tavily', 'smithery-ai-mcp-server-tavily', 'Tavily MCP Server：AI优化搜索引擎', '社区MCP服务器，集成Tavily Search API，专为LLM和RAG应用优化的AI搜索引擎。', ARRAY['Tavily', 'MCP', '搜索', 'RAG', '社区']),
('@kagisearch/mcp-server-kagi', 'MCP server for Kagi Search API. Premium search results with no ads and privacy focus.', 'https://github.com/kagisearch/mcp-server-kagi', 'search', 'npx @kagisearch/mcp-server-kagi', 'kagisearch-mcp-server-kagi', 'Kagi MCP Server：隐私优先的AI搜索', '社区MCP服务器，集成Kagi Search API，无广告隐私优先的搜索引擎。', ARRAY['Kagi', 'MCP', '搜索', '隐私', '社区']),
('@jlowin/fastmcp-server', 'FastMCP reference server demonstrating the FastMCP framework for building production MCP servers.', 'https://github.com/jlowin/fastmcp', 'reference', 'npx fastmcp-server', 'jlowin-fastmcp-server', 'FastMCP Server：TypeScript MCP框架参考', 'FastMCP参考服务器，展示TypeScript MCP框架的最佳实践，适合快速构建MCP服务器。', ARRAY['FastMCP', 'MCP', 'TypeScript', '框架', '参考']),
('@qdrant/mcp-server-qdrant', 'MCP server for Qdrant vector database. Vector search and RAG capabilities through AI assistants.', 'https://github.com/qdrant/mcp-server-qdrant', 'database', 'npx @qdrant/mcp-server-qdrant', 'qdrant-mcp-server-qdrant', 'Qdrant MCP Server：AI向量数据库集成', '社区MCP服务器，Qdrant向量数据库集成，提供向量搜索和RAG能力。', ARRAY['Qdrant', 'MCP', '向量数据库', 'RAG', '社区']),
('@block/mcp-server-square', 'MCP server for Square API. Payment processing and commerce operations through AI assistants.', 'https://github.com/block/mcp-server-square', 'commerce', 'npx @block/mcp-server-square', 'block-mcp-server-square', 'Square MCP Server：AI商业支付集成', '社区MCP服务器，集成Square支付API，通过AI处理商业支付和电商运营。', ARRAY['Square', 'MCP', '支付', '电商', '社区']);

-- ============================================================
-- 15 AI Books
-- ============================================================

INSERT INTO ai_books (title, author, description, category, url, rating, cover_url, slug, seo_title, meta_description, keywords) VALUES
('深度学习', 'Ian Goodfellow / Yoshua Bengio / Aaron Courville', '深度学习领域的经典之作，被誉为AI圣经。系统讲解深度学习的基础理论、核心算法和应用实践，涵盖前馈网络、卷积网络、序列模型等核心主题。', 'deep-learning', 'https://www.deeplearningbook.org/', 4.8, 'https://www.deeplearningbook.org/images/cover.jpg', 'deep-learning-ian-goodfellow', '《深度学习》Goodfellow：AI圣经级经典教材', 'Ian Goodfellow等著《深度学习》，AI领域圣经级教材。系统讲解深度学习理论、算法与实践。豆瓣评分4.8。', ARRAY['深度学习', 'Goodfellow', '神经网络', '教材', 'AI圣经']),
('动手学深度学习', 'Aston Zhang / Zachary C. Lipton / 李沐 / Alex J. Smola', '以动手实践为导向的深度学习教材，配套Jupyter Notebook代码示例。涵盖从线性回归到Transformer、扩散模型的完整知识体系。', 'deep-learning', 'https://d2l.ai/', 4.7, 'https://d2l.ai/_images/front.jpg', 'dive-into-deep-learning', '《动手学深度学习》：李沐出品，代码驱动的AI教材', '李沐等著《动手学深度学习》，代码驱动的AI实践教材。配套Jupyter Notebook，覆盖Transformer和扩散模型。评分4.7。', ARRAY['动手学深度学习', '李沐', 'D2L', '实践', '教材']),
('统计学习方法', '李航', '统计学习理论的系统介绍，深入浅出讲解支持向量机、决策树、最大熵模型等经典机器学习算法。被广泛用作国内AI专业教材。', 'machine-learning', 'https://book.douban.com/subject/33437111/', 4.6, NULL, 'statistical-learning-methods', '《统计学习方法》李航：机器学习经典中文教材', '李航著《统计学习方法》，系统讲解SVM、决策树等经典ML算法。国内AI专业首选教材。评分4.6。', ARRAY['统计学习', '李航', '机器学习', 'SVM', '教材']),
('Pattern Recognition and Machine Learning', 'Christopher M. Bishop', '机器学习领域最具影响力的著作之一。从概率论视角系统讲解模式识别和机器学习，深入覆盖贝叶斯方法、图模型和核方法。', 'machine-learning', 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/', 4.7, NULL, 'pattern-recognition-and-machine-learning', '《PRML》Bishop：机器学习概率视角经典', 'Bishop著《Pattern Recognition and Machine Learning》，以概率论视角讲解ML。贝叶斯方法、图模型和核方法的权威参考。评分4.7。', ARRAY['PRML', 'Bishop', '模式识别', '贝叶斯', '机器学习']),
('Attention Is All You Need', 'Ashish Vaswani / Noam Shazeer / Niki Parmar', 'Transformer架构原始论文的扩展著作，全面讲解自注意力机制、多头注意力和位置编码，是现代大语言模型的理论基础。', 'nlp', NULL, 4.9, NULL, 'attention-is-all-you-need', '《Attention Is All You Need》：Transformer架构奠基之作', 'Vaswani等著，Transformer架构奠基之作。全面讲解自注意力机制，现代LLM的理论基础。评分4.9。', ARRAY['Transformer', '注意力机制', 'NLP', '论文', '基础']),
('大规模语言模型：从理论到实践', '张奇 / 桂志鹏 / 郑锐 / 黄萱菁', '国内首部系统讲解LLM的专著，覆盖预训练、SFT、RLHF、推理优化和部署的全流程技术。结合中国AI产业实践。', 'nlp', 'https://book.douban.com/subject/36357600/', 4.5, NULL, 'large-language-models-theory-practice', '《大规模语言模型》：从理论到实践的中文LLM专著', '张奇等著《大规模语言模型》，国内首部系统LLM专著。覆盖预训练、SFT、RLHF全流程。评分4.5。', ARRAY['LLM', '大语言模型', '预训练', 'RLHF', '中文']),
('Reinforcement Learning: An Introduction', 'Richard S. Sutton / Andrew G. Barto', '强化学习领域的权威教材，被誉为强化学习圣经。系统讲解MDP、动态规划、蒙特卡洛方法、TD学习和策略梯度等核心算法。', 'reinforcement-learning', 'http://incompleteideas.net/book/the-book.html', 4.8, NULL, 'reinforcement-learning-introduction', '《强化学习》Sutton & Barto：RL领域权威圣经', 'Sutton & Barto著《Reinforcement Learning》，RL领域权威教材。系统讲解MDP、TD学习和策略梯度。评分4.8。', ARRAY['强化学习', 'Sutton', 'RL', 'MDP', '教材']),
('机器学习', '周志华', '国内最知名的机器学习教材，以通俗易懂的方式讲解机器学习基本理论和算法。被誉为西瓜书，是每个AI学习者的入门必读。', 'machine-learning', 'https://book.douban.com/subject/26708119/', 4.6, NULL, 'machine-learning-zhou-zhihua', '《机器学习》周志华：西瓜书，AI入门必读经典', '周志华著《机器学习》，通俗易懂的ML教材。被称为西瓜书，每个AI学习者的入门必读。评分4.6。', ARRAY['机器学习', '周志华', '西瓜书', '入门', '教材']),
('Deep Learning with Python', 'Francois Chollet', 'Keras框架作者撰写的深度学习实践指南。通过Python代码示例讲解计算机视觉、NLP和生成模型等应用。', 'deep-learning', 'https://www.manning.com/books/deep-learning-with-python', 4.5, NULL, 'deep-learning-with-python', '《Deep Learning with Python》：Keras之父教你深度学习', 'Francois Chollet著《Deep Learning with Python》，Keras之父的DL实践指南。涵盖CV、NLP和生成模型。评分4.5。', ARRAY['深度学习', 'Keras', 'Python', '实践', 'Chollet']),
('Designing Machine Learning Systems', 'Chip Huyen', 'ML系统设计的实用指南，覆盖从数据工程到模型部署和监控的完整MLOps流程。适合从原型到生产的ML工程师。', 'mlops', 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', 4.6, NULL, 'designing-machine-learning-systems', '《Designing ML Systems》Chip Huyen：MLOps实践指南', 'Chip Huyen著《Designing ML Systems》，MLOps权威指南。覆盖数据工程、模型部署和监控全流程。评分4.6。', ARRAY['MLOps', '系统设计', 'Chip Huyen', '部署', '工程']),
('The Alignment Problem', 'Brian Christian', '深入探讨AI对齐问题，从技术哲学和伦理视角分析如何让AI系统的行为与人类价值观一致。引人深思的AI安全读物。', 'ai-safety', 'https://brianchristian.org/the-alignment-problem/', 4.4, NULL, 'the-alignment-problem', '《The Alignment Problem》：AI对齐问题的深度思考', 'Brian Christian著《The Alignment Problem》，从哲学和伦理视角探讨AI对齐。AI安全领域的必读之作。评分4.4。', ARRAY['AI对齐', 'AI安全', '伦理', '哲学', 'Brian Christian']),
('Interpretable Machine Learning', 'Christoph Molnar', '讲解机器学习模型可解释性的权威指南。涵盖特征重要性、SHAP、LIME、部分依赖图和累积局部效应等方法。', 'machine-learning', 'https://christophm.github.io/interpretable-ml-book/', 4.3, NULL, 'interpretable-machine-learning', '《可解释机器学习》：SHAP和LIME方法权威指南', 'Christoph Molnar著《Interpretable ML》，模型可解释性权威指南。涵盖SHAP、LIME和特征重要性。评分4.3。', ARRAY['可解释性', 'SHAP', 'LIME', 'XAI', 'Molnar']),
('扩散模型：从原理到实践', '杨植麟 / 周健', '国内首部系统讲解扩散模型的专著。从DDPM到Stable Diffusion，完整覆盖扩散模型的理论和实现。', 'generative-ai', 'https://book.douban.com/subject/36578901/', 4.5, NULL, 'diffusion-models-principles-practice', '《扩散模型》：从DDPM到Stable Diffusion中文专著', '杨植麟等著《扩散模型》，国内首部扩散模型专著。从DDPM到Stable Diffusion完整覆盖。评分4.5。', ARRAY['扩散模型', 'DDPM', 'Stable Diffusion', '生成模型', '中文']),
('Natural Language Processing with Transformers', 'Lewis Tunstall / Leandro von Werra / Thomas Wolf', 'HuggingFace团队出品，全面讲解Transformer在NLP中的应用。从文本分类到文本生成，使用HuggingFace生态实战。', 'nlp', 'https://www.oreilly.com/library/view/natural-language-processing/9781098136786/', 4.6, NULL, 'nlp-with-transformers', '《NLP with Transformers》：HuggingFace团队实战指南', 'HuggingFace团队著《NLP with Transformers》，Transformer在NLP中的全面应用指南。评分4.6。', ARRAY['NLP', 'Transformers', 'HuggingFace', '实战', 'OReilly']),
('Artificial Intelligence: A Modern Approach', 'Stuart Russell / Peter Norvig', 'AI领域的百科全书和标准教材。覆盖搜索、推理、知识表示、机器学习、NLP、计算机视觉和机器人学等AI核心主题。', 'ai-fundamentals', 'http://aima.cs.berkeley.edu/', 4.7, NULL, 'ai-a-modern-approach', '《AI：现代方法》Russell & Norvig：AI百科全书', 'Russell & Norvig著《AI：现代方法》，AI领域百科全书。覆盖搜索、推理、ML、NLP、CV和机器人学。评分4.7。', ARRAY['人工智能', 'Russell', 'Norvig', 'AIMA', '教材']);

-- ============================================================
-- 15 Knowledge Base Articles
-- ============================================================

INSERT INTO knowledge_base (title, content_mdx, category, tags, summary, slug, seo_title, meta_description, keywords) VALUES
('Claude Code 安装与配置完整指南', '# Claude Code 安装与配置完整指南

## 前置要求

在开始使用 Claude Code 之前，您需要确保系统满足以下要求：

- Node.js 18 或更高版本
- npm 或 yarn 包管理器
- Anthropic API 密钥
- Git（用于版本控制集成）

## 安装步骤

### 方式一：全局安装

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后，您可以通过 `claude` 命令在终端中启动 Claude Code。

### 方式二：项目级安装

```bash
npm install --save-dev @anthropic-ai/claude-code
```

然后在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "claude": "claude-code"
  }
}
```

## 配置 API 密钥

通过环境变量配置您的 Anthropic API 密钥：

```bash
export ANTHROPIC_API_KEY=sk-ant-xxxxx
```

建议将 API 密钥添加到 `.env` 文件中，并确保 `.env` 已加入 `.gitignore`。

## 验证安装

运行以下命令验证安装：

```bash
claude --version
```

如果显示版本号，说明安装成功。现在您可以在任何项目目录中启动 Claude Code。

## 项目级配置

在项目根目录创建 `CLAUDE.md` 文件，编写项目指引。Claude Code 会自动读取此文件来理解项目上下文。这包括技术栈、代码规范、架构说明等。', 'claude-code', ARRAY['Claude Code', '安装', '配置', '入门'], '详细介绍 Claude Code 的安装方法、API 密钥配置和项目初始化步骤。', 'claude-code-installation-guide', 'Claude Code 安装配置完整指南 | AI编程工具入门', 'Claude Code 安装与配置的完整指南。包括 Node.js 要求、npm 安装、API 密钥配置和项目级设置。', ARRAY['Claude Code', '安装', '配置', '入门教程']),

('Claude Code 高效使用技巧与最佳实践', '# Claude Code 高效使用技巧与最佳实践

## 编写有效的 CLAUDE.md

CLAUDE.md 是 Claude Code 最重要的配置文件。一个好的 CLAUDE.md 应该包含：

- **项目概述**：简要说明项目目标和功能
- **技术栈**：列出使用的框架、库和工具
- **代码规范**：命名约定、文件组织、测试策略
- **常用命令**：构建、测试、部署命令

## 善用自定义斜杠命令

Claude Code 支持自定义斜杠命令。在 `CLAUDE.md` 中定义常用操作：

```
/lint — 运行 ESLint 和 Prettier 检查代码质量
/test — 运行所有测试套件并报告结果
/deploy — 构建并部署到生产环境
```

## 多文件重构技巧

当需要进行大规模重构时，使用以下策略：

1. **先分析、后执行**：先让 Claude 理解代码库结构，再执行重构
2. **增量变更**：将大重构分解为可验证的小步骤
3. **版本控制**：每个重构步骤后提交，方便回滚

## 与 Git 工作流集成

Claude Code 可以自动生成高质量的 commit 信息。使用以下模式：

```
/fix bug in auth middleware — Claude Code 会分析变更并生成合适的commit信息
```

## 常见陷阱和解决方案

- **避免过长对话**：每个对话保持在 50 轮以内，新建对话处理不同任务
- **明确上下文**：使用 @file 引用特定文件
- **验证输出**：始终让 Claude 解释其变更理由', 'claude-code', ARRAY['Claude Code', '最佳实践', '技巧', '效率'], '分享 Claude Code 的高效使用技巧，包括 CLAUDE.md 编写、自定义命令和多文件重构策略。', 'claude-code-best-practices', 'Claude Code 高效使用技巧 | 最佳实践与进阶指南', 'Claude Code 高效使用技巧与最佳实践。CLAUDE.md 编写、自定义命令、多文件重构和 Git 工作流集成。', ARRAY['Claude Code', '最佳实践', '技巧', '进阶']),

('Claude Code 自定义斜杠命令完全指南', '# Claude Code 自定义斜杠命令完全指南

## 什么是自定义斜杠命令

自定义斜杠命令允许您定义以 `/` 开头的快捷操作。这些命令可以在 Claude Code 中快速执行预定义的任务流程。

## 基本语法

在 CLAUDE.md 中使用以下格式定义命令：

```
/lint: 运行 ESLint 和 Prettier
1. 执行 `npx eslint . --fix`
2. 执行 `npx prettier --write .`
3. 报告修复结果
```

## 命令类型

### 简单命令

执行单一操作的快捷命令：

```
/build: 构建项目
运行 npm run build 并报告构建结果
```

### 多步骤工作流

包含多个顺序步骤的复杂命令：

```
/release: 发布新版本
1. 运行测试套件
2. 更新 CHANGELOG.md
3. 使用 npm version 升级版本号
4. 创建 git tag 并推送
```

### 带参数的命令

支持动态参数的命令：

```
/review <file>: 代码审查指定文件
分析 <file> 中的代码质量和潜在问题
```

## 常用命令模板

以下是一些推荐的预定义命令：

- `/fix-lint` — 自动修复 lint 问题
- `/gen-types` — 从 API 响应生成类型定义
- `/update-deps` — 更新依赖并检查兼容性
- `/doc` — 为函数生成 JSDoc 注释

## 命令命名规范

- 使用小写字母和连字符
- 名称简洁明了
- 避免与内置命令冲突
- 按功能分组命名', 'claude-code', ARRAY['Claude Code', '自定义命令', '斜杠命令', '配置'], '深入讲解 Claude Code 自定义斜杠命令的语法、类型和最佳命名规范。', 'claude-code-custom-slash-commands', 'Claude Code 自定义斜杠命令完全指南 | 配置与模板', 'Claude Code 自定义斜杠命令完全指南。基本语法、命令类型、带参数命令和常用模板详解。', ARRAY['Claude Code', '命令', '配置', '自动化']),

('Codex CLI 入门教程：OpenAI 终端编程助手', '# Codex CLI 入门教程

## 什么是 Codex CLI

Codex CLI 是 OpenAI 推出的终端编程助手工具。它基于 GPT-5 模型，在命令行中提供代码生成、解释、调试和重构等功能。

## 安装

```bash
npm install -g @openai/codex-cli
```

或者通过 pip（Python 版本）：

```bash
pip install openai-codex
```

## 基本用法

### 代码生成

在终端中直接描述需求，Codex 会生成相应的代码：

```bash
codex "创建一个 Python Flask API 端点，返回当前时间的 JSON"
```

### 代码解释

理解不熟悉的代码：

```bash
codex explain app.js
```

### 调试助手

自动定位和修复错误：

```bash
codex debug --file app.js --error "TypeError: cannot read property map of undefined"
```

## 与 Claude Code 的对比

| 特性 | Codex CLI | Claude Code |
|------|-----------|-------------|
| 基础模型 | GPT-5 | Claude |
| 上下文窗口 | 128K | 200K |
| 多文件重构 | 有限 | 强大 |
| Git 集成 | 基础 | 深度集成 |
| 自定义命令 | 有限 | 丰富 |

## 适用场景

- 快速代码原型
- 学习新编程语言或框架
- 小型脚本和工具开发
- 代码审查辅助', 'codex', ARRAY['Codex CLI', 'OpenAI', '终端', '编程'], 'OpenAI Codex CLI 入门教程，涵盖安装、代码生成、解释和调试的基本用法。', 'codex-cli-getting-started', 'Codex CLI 入门教程 | OpenAI 终端编程助手', 'OpenAI Codex CLI 入门教程。安装方法、代码生成、解释、调试功能及与 Claude Code 的对比分析。', ARRAY['Codex CLI', 'OpenAI', '入门', '终端']),

('Codex CLI 高级用法：自定义工作流与集成', '# Codex CLI 高级用法

## 自定义工作流

Codex CLI 支持通过 YAML 文件定义自定义工作流：

```yaml
name: full-stack-feature
steps:
  - run: codex "create a React component for user profile"
  - run: codex "add API endpoint for user profile data"
  - run: codex "write integration tests"
  - run: codex "update documentation"
```

## 与 CI/CD 集成

### GitHub Actions

```yaml
- name: Codex Code Review
  uses: openai/codex-action@v1
  with:
    api-key: ${{ secrets.OPENAI_API_KEY }}
    command: review
```

### Git Hooks

在 `.git/hooks/pre-commit` 中：

```bash
#!/bin/bash
codex lint --staged || exit 1
```

## 批量操作

处理多个文件：

```bash
codex refactor --pattern "src/**/*.ts" --transform "add error handling"
```

## API 模式

在无交互模式下运行：

```bash
codex --api "Generate TypeScript types from this JSON schema" < schema.json > types.ts
```

## 配置优化

在 `~/.codex/config.yaml` 中：

```yaml
model: gpt-5-turbo
temperature: 0.3
max_tokens: 4000
context_files:
  - "*.ts"
  - "*.tsx"
```

## 安全最佳实践

- 不在生产服务器上使用自动执行模式
- 审查所有 AI 生成的代码
- 使用只读 API 模式进行敏感操作', 'codex', ARRAY['Codex CLI', '高级', 'CI/CD', '工作流'], 'Codex CLI 高级用法详解，包括自定义工作流、CI/CD 集成、批量操作和安全实践。', 'codex-cli-advanced', 'Codex CLI 高级用法 | 自定义工作流与 CI/CD 集成', 'Codex CLI 高级用法。YAML 工作流定义、GitHub Actions 集成、Git Hooks、批量操作和安全最佳实践。', ARRAY['Codex CLI', '高级', 'CI/CD', '自动化']),

('AI 编程工具对比：Cursor vs Copilot vs Claude Code', '# AI 编程工具全面对比

## 工具概览

在 2026 年的 AI 编程工具市场中，三大主流产品各有千秋：

- **Cursor**：AI 优先的 IDE，基于 VS Code 深度定制
- **GitHub Copilot**：GitHub 出品，最大的 IDE 插件生态
- **Claude Code**：Anthropic 出品，终端优先的编程体验

## 功能对比

### 代码补全

- Cursor：Tab 补全、多行预测、智能跳转
- Copilot：实时代码建议、Ghost Text、多文件上下文
- Claude Code：自然语言补全、整函数生成

### Chat 对话

- Cursor：内联 Chat、侧边栏、@file 引用
- Copilot：Copilot Chat、Agent 模式、Slash Commands
- Claude Code：全终端对话、多轮上下文、项目理解

### Agent 能力

- Cursor：Agent 模式支持多文件编辑
- Copilot：Copilot Agent 支持 PR 描述和工作流
- Claude Code：强大的自主编程 Agent，支持完整功能开发

## 定价对比

| 工具 | 免费层 | 个人版 | 企业版 |
|------|--------|--------|--------|
| Cursor | 有限 Hobby | $20/月 | $40/用户/月 |
| Copilot | 有限 Free | $10/月 | $39/用户/月 |
| Claude Code | API 按量 | $20/月 | 定制 |

## 如何选择

- **如果你是 VS Code 用户**：Cursor 或 Copilot
- **如果你偏好终端**：Claude Code
- **如果你需要企业功能**：Copilot Enterprise
- **如果你追求 AI Agent 能力**：Claude Code 或 Cursor

## 总结

没有绝对最好的工具，选择最适合你工作流程的那一个。推荐都试用一段时间再做决定。', 'claude-code', ARRAY['AI编程工具', '对比', 'Cursor', 'Copilot', 'Claude Code'], 'Cursor、GitHub Copilot 和 Claude Code 的全方位对比分析，帮助你选择最适合的 AI 编程工具。', 'ai-coding-tools-comparison', 'AI 编程工具对比：Cursor vs Copilot vs Claude Code', 'Cursor、Copilot 和 Claude Code 全方位对比。功能、定价、Agent 能力分析和选择建议。', ARRAY['AI编程', '对比', 'Cursor', 'Copilot', 'Claude Code']),

('如何用 Claude Code 构建 Next.js 全栈应用', '# 用 Claude Code 构建 Next.js 全栈应用

## 项目初始化

使用 Claude Code 从零开始构建 Next.js 应用：

```
/create-next-app: 使用 App Router 创建 Next.js 项目
1. npx create-next-app@latest my-app --typescript --tailwind --app
2. 配置项目结构和基础组件
```

## 数据库集成

Claude Code 可以帮助你集成 Supabase：

1. 安装 Supabase 客户端
2. 创建数据库表
3. 实现认证系统
4. 编写 Row Level Security 策略

## API 路由开发

Claude Code 可以生成完整的 API 路由：

- RESTful API 端点
- Server Actions 处理表单
- 中间件和认证检查
- 错误处理和验证

## 前端组件构建

从描述生成 React 组件：

- 数据表格组件
- 表单组件（带验证）
- 导航和布局组件
- 仪表板和数据可视化

## 部署配置

Claude Code 协助配置 Vercel 部署：

- 环境变量管理
- 构建优化
- 自定义域名
- 性能监控

## 最佳实践总结

1. 遵循 Next.js App Router 约定
2. 使用 Server Components 提升性能
3. 实施适当的错误边界
4. 编写类型安全的代码
5. 利用增量静态生成', 'claude-code', ARRAY['Claude Code', 'Next.js', '全栈', 'Supabase'], '从零开始使用 Claude Code 构建 Next.js 全栈应用的完整指南，包括数据库集成和部署。', 'build-nextjs-app-with-claude-code', '用 Claude Code 构建 Next.js 全栈应用完整指南', '使用 Claude Code 从零构建 Next.js 全栈应用。数据库集成、API 路由、前端组件和部署配置全流程。', ARRAY['Claude Code', 'Next.js', '全栈', '教程']),

('B站优质AI学习UP主推荐（2026版）', '# B站优质AI学习UP主推荐

## 基础理论类

### 李沐
- **频道**：动手学深度学习
- **特色**：深入浅出讲解深度学习论文，配套D2L课程
- **推荐**：论文精读系列、动手学深度学习课程

### 3Blue1Brown中文站
- **特色**：数学可视化解说，线性代数和神经网络系列
- **推荐**：神经网络系列、线性代数的本质

## 工程实践类

### 技术胖
- **特色**：全栈开发实战，AI应用开发教程
- **推荐**：LangChain实战系列、Next.js全栈开发

### 峰华前端工程师
- **特色**：前端与AI结合，实用项目教程
- **推荐**：Vercel AI SDK教程、AI Chat应用开发

## 前沿资讯类

### 量子位
- **特色**：AI科技前沿资讯，行业深度分析
- **推荐**：每周AI动态、论文速递

### 机器之心
- **特色**：专业AI技术媒体，深度技术报道
- **推荐**：Synced Review系列、技术深度解析

## 编程开发类

### 程序员鱼皮
- **特色**：程序员职业发展，AI编程工具使用
- **推荐**：AI编程工具教程、程序员成长系列

### 大猫的代码花园
- **特色**：Python与数据科学，AI应用开发
- **推荐**：Python AI开发实战、数据分析系列

## 学习路线建议

1. 先看李沐的论文精读打好理论基础
2. 跟着技术胖做实战项目
3. 关注量子位了解行业动态
4. 用程序员鱼皮的教程学习AI编程工具', 'bilibili', ARRAY['B站', 'UP主', 'AI学习', '推荐'], '2026年B站优质AI学习UP主推荐，涵盖理论、工程、资讯和编程四大类。', 'bilibili-ai-up-recommendations-2026', 'B站优质AI学习UP主推荐（2026版）| 学习资源', '2026年B站优质AI学习UP主推荐。李沐、技术胖、量子位等UP主的频道特色和学习路线建议。', ARRAY['B站', 'UP主', 'AI学习', '推荐']),

('2026年热门AI书籍推荐：从入门到精通', '# 2026年热门AI书籍推荐

## 入门级

适合AI初学者和技术转型人员：

1. **《机器学习》周志华** — 西瓜书，通俗易懂的入门经典
2. **《动手学深度学习》李沐等** — 代码驱动，理论与实践结合
3. **《深度学习入门》斋藤康毅** — Python实现，从零理解神经网络

## 中级进阶

适合有一定基础的学习者：

4. **《深度学习》Goodfellow等** — AI圣经，全面深入的理论讲解
5. **《PRML》Bishop** — 概率视角的机器学习经典
6. **《统计学习方法》李航** — 严谨的数学推导和算法讲解

## 高级专题

适合深度研究方向的学习者：

7. **《大规模语言模型》张奇等** — LLM全流程技术详解
8. **《扩散模型》杨植麟等** — 生成式AI核心技术
9. **《RL: An Introduction》Sutton & Barto** — 强化学习权威教材

## 工程实践

适合ML工程师和工程化方向：

10. **《Designing ML Systems》Chip Huyen** — MLOps权威指南
11. **《NLP with Transformers》HuggingFace团队** — NLP实战宝典
12. **《The Alignment Problem》Brian Christian** — AI安全与伦理

## 阅读建议

1. 初学者：周志华 -> 李沐 -> Goodfellow
2. NLP方向：周志华 -> 张奇 -> HuggingFace
3. CV方向：周志华 -> 杨植麟 -> Goodfellow
4. 工程方向：李沐 -> Chip Huyen -> HuggingFace', 'books', ARRAY['AI书籍', '推荐', '书单', '学习路径'], '2026年热门AI书籍精选推荐，从入门到精通的完整阅读路径。', 'ai-books-recommendations-2026', '2026年热门AI书籍推荐 | 从入门到精通阅读路径', '2026年AI书籍推荐。入门、进阶、高级和工程实践四阶段阅读路径。周志华、李沐、Goodfellow等经典著作。', ARRAY['AI书籍', '书单', '推荐', '学习路径']),

('Claude Code项目级配置：CLAUDE.md最佳实践', '# Claude Code项目级配置最佳实践

## CLAUDE.md 的重要性

CLAUDE.md 是 Claude Code 的运行时配置文件和项目上下文文档。每一次对话，Claude 都会首先读取 CLAUDE.md，因此这个文件的质量直接影响编程体验。

## 文件结构模板

```markdown
# CLAUDE.md

## 项目概述
[简要描述项目目标、核心功能和用户群体]

## 技术栈
- 前端: Next.js 14, React 18, Tailwind CSS
- 后端: Supabase, Prisma
- AI: Claude API, LangChain

## 项目结构
src/
  app/          # Next.js App Router 页面
  components/   # 可复用组件
  lib/          # 工具函数和类型
  hooks/        # 自定义 Hooks

## 代码规范
- 使用 TypeScript 严格模式
- 函数组件使用箭头函数
- 服务端操作使用 Server Actions

## 常用命令
- npm run dev — 启动开发服务器
- npm run build — 生产构建
- npm run test — 运行测试
```

## 动态内容技巧

使用占位符让 CLAUDE.md 保持最新：

- 使用 git hooks 自动更新最近提交的变更
- 在 CI/CD 中生成测试覆盖率报告
- 链接到项目 Wiki 获取详细文档

## 团队协作

- 将 CLAUDE.md 纳入版本控制
- 制定团队级别的 CLAUDE.md 模板
- 定期评审和更新配置

## 常见错误

1. CLAUDE.md 过长导致上下文浪费
2. 包含过时信息误导 Claude
3. 缺少具体的代码规范指引
4. 没有列出常用命令', 'claude-code', ARRAY['CLAUDE.md', '配置', '项目', '最佳实践'], 'Claude Code 项目级 CLAUDE.md 配置最佳实践，包括文件结构模板和团队协作建议。', 'claude-code-claude-md-best-practices', 'Claude Code CLAUDE.md 项目配置最佳实践', 'Claude Code 项目级 CLAUDE.md 配置最佳实践。文件结构模板、动态内容技巧、团队协作和常见错误。', ARRAY['CLAUDE.md', '配置', '最佳实践', '团队协作']),

('使用 Supabase 构建 AI 应用后端', '# 使用 Supabase 构建 AI 应用后端

## Supabase 简介

Supabase 是开源的 Firebase 替代品，提供 PostgreSQL 数据库、认证、存储和 Edge Functions 等完整的后端服务。

## 数据库设计

### 用户与认证

```sql
-- 用户表由 Supabase Auth 自动管理
-- 扩展用户资料
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  plan TEXT DEFAULT ''free''
);
```

### AI 对话记录

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users,
  title TEXT,
  model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Row Level Security

确保数据安全的关键策略：

```sql
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = user_id);
```

## 向量搜索

Supabase 支持 pgvector 扩展：

```sql
CREATE EXTENSION vector;

CREATE TABLE documents (
  id UUID PRIMARY KEY,
  content TEXT,
  embedding vector(1536)
);
```

## Edge Functions

使用 Deno Edge Functions 处理 AI API 调用：

```typescript
Deno.serve(async (req) => {
  const { prompt } = await req.json()
  // 调用 AI API
  return new Response(JSON.stringify({ result }))
})
```

## 实时功能

利用 Supabase 实时订阅：

```typescript
const subscription = supabase
  .channel('conversations')
  .on('INSERT', (payload) => {
    console.log('New message:', payload.new)
  })
  .subscribe()
```', 'claude-code', ARRAY['Supabase', '后端', '数据库', 'AI应用'], '使用 Supabase 构建 AI 应用后端的完整指南，涵盖数据库设计、RLS 和 Edge Functions。', 'building-ai-backend-with-supabase', '使用 Supabase 构建 AI 应用后端 | 完整指南', 'Supabase 构建 AI 应用后端指南。PostgreSQL 数据库设计、Row Level Security、向量搜索和 Edge Functions。', ARRAY['Supabase', '后端', 'AI', 'PostgreSQL']),

('开源大模型部署完全指南：从 Llama 到 DeepSeek', '# 开源大模型部署完全指南

## Ollama 部署

Ollama 是最简单的本地模型部署工具：

```bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 下载并运行 Llama 4
ollama run llama4:33b

# 下载并运行 DeepSeek-V4
ollama run deepseek-v4:7b
```

## vLLM 高性能推理

适合生产环境的高性能推理：

```bash
pip install vllm

vllm serve meta-llama/Llama-4-33B-Instruct \
  --tensor-parallel-size 4 \
  --max-model-len 131072
```

## Text Generation Inference

HuggingFace 的推理方案：

```bash
docker run -p 8080:80 \
  -e HF_TOKEN=$HF_TOKEN \
  ghcr.io/huggingface/text-generation-inference:latest \
  --model-id meta-llama/Llama-4-33B-Instruct
```

## 硬件要求参考

| 模型 | 量化 | 最低显存 | 推荐显存 |
|------|------|----------|----------|
| Llama 4 7B | Q4 | 6GB | 8GB |
| Llama 4 33B | Q4 | 20GB | 24GB |
| Llama 4 70B | Q4 | 40GB | 48GB |
| DeepSeek-V4 7B | Q4 | 6GB | 8GB |

## API 服务封装

使用 FastAPI 封装为 API 服务：

```python
from fastapi import FastAPI
from vllm import LLM

app = FastAPI()
llm = LLM(model="meta-llama/Llama-4-33B")

@app.post("/generate")
async def generate(prompt: str):
    outputs = llm.generate([prompt])
    return {"text": outputs[0].outputs[0].text}
```

## 生产化建议

- 使用 GPU 云服务（Lambda Labs, RunPod）
- 配置自动扩缩容
- 设置 rate limiting
- 实施监控和日志', 'claude-code', ARRAY['开源模型', '部署', 'Ollama', 'vLLM'], '开源大模型本地部署和生产的完整指南，覆盖 Ollama、vLLM、TGI 等多种方案。', 'open-source-llm-deployment-guide', '开源大模型部署完全指南 | Llama到DeepSeek', '开源大模型部署指南。Ollama、vLLM、TGI 方案对比，硬件要求参考和 API 服务封装。', ARRAY['开源模型', '部署', 'Ollama', 'vLLM', 'Llama']),

('MCP 协议深入理解：从零构建 MCP Server', '# MCP 协议深入理解

## MCP 协议概述

Model Context Protocol (MCP) 是 Anthropic 提出的开放标准，用于连接 AI 模型与外部工具和数据源。

## 核心概念

### Client
发起连接的 AI 应用，如 Claude Desktop、Claude Code。

### Server
提供工具和资源的服务端进程。

### Transport
通信层，支持 stdio（标准输入输出）和 HTTP/SSE。

## 构建第一个 MCP Server

### 使用 TypeScript

```typescript
import { Server } from "@anthropic/mcp-sdk";

const server = new Server({
  name: "my-first-mcp",
  version: "1.0.0"
});

server.tool("get_weather", {
  description: "获取指定城市的天气信息",
  parameters: {
    city: { type: "string", description: "城市名称" }
  }
}, async ({ city }) => {
  // 实现天气查询逻辑
  return {
    content: [{ type: "text", text: `${city}当前天气：晴，25°C` }]
  };
});

server.listen();
```

### 使用 Python

```python
from mcp.server import Server

server = Server("my-first-mcp")

@server.tool()
async def get_weather(city: str) -> str:
    """获取指定城市的天气信息"""
    return f"{city}当前天气：晴，25°C"

server.run()
```

## 配置 Claude Desktop

在 `claude_desktop_config.json` 中：

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["path/to/server.js"]
    }
  }
}
```

## 测试与调试

使用 MCP Inspector 调试：

```bash
npx @anthropic/mcp-inspector node server.js
```

## 发布到 npm

```bash
npm publish --access public
```

MCP 生态正在快速发展，现在是学习和参与的最佳时机。', 'claude-code', ARRAY['MCP', 'Server', '协议', '开发'], '从零开始构建 MCP Server 的完整指南，涵盖 TypeScript/Python 实现、配置和调试。', 'mcp-protocol-build-server', 'MCP 协议深入理解 | 从零构建 MCP Server', 'MCP 协议深入理解与实战。TypeScript/Python 构建 MCP Server、Claude Desktop 配置和 MCP Inspector 调试。', ARRAY['MCP', 'Server', '协议', '开发', 'TypeScript']),

('AI Agent 架构设计：从单Agent到多Agent协作', '# AI Agent 架构设计

## 什么是 AI Agent

AI Agent 是能够自主感知环境、制定计划、执行操作并根据反馈调整行为的智能系统。

## 单 Agent 架构

### 核心组件

- **感知模块**：接收用户输入和环境信息
- **规划模块**：任务分解和步骤规划
- **执行模块**：调用工具和执行操作
- **记忆模块**：短期和长期记忆管理

### 设计模式

1. **ReAct** — 推理与行动交替进行
2. **Plan-and-Execute** — 先制定完整计划再执行
3. **Reflection** — 执行后反思和改进

## 多 Agent 架构

### 协作模式

- **顺序协作**：Agent 按流程依次处理
- **并行协作**：多个 Agent 同时处理不同子任务
- **层级协作**：管理 Agent 分配和监督执行 Agent

### 框架选择

- **LangGraph**：基于图的 Agent 编排
- **CrewAI**：角色扮演式多 Agent 协作
- **AutoGen**：微软的多 Agent 对话框架

## 工具集成

### 工具设计原则

1. 单一职责：每个工具只做一件事
2. 清晰接口：参数和返回值明确
3. 错误处理：优雅处理工具执行失败
4. 安全边界：限制工具的权限范围

### 通过 MCP 集成

MCP 提供了标准化的工具集成方式，让 Agent 可以无缝连接各种外部服务。

## 评估与优化

- 设置明确的成功指标
- 记录 Agent 决策过程
- A/B 测试不同的 Prompt 和策略
- 持续监控和改进', 'claude-code', ARRAY['AI Agent', '架构', '多Agent', '设计模式'], 'AI Agent 架构设计指南，从单 Agent 到多 Agent 协作的设计模式和框架选择。', 'ai-agent-architecture-design', 'AI Agent 架构设计 | 单Agent到多Agent协作模式', 'AI Agent 架构设计指南。单Agent核心组件、多Agent协作模式、工具集成和MCP标准。LangGraph/CrewAI/AutoGen框架对比。', ARRAY['AI Agent', '架构', '多Agent', 'MCP']),

('GPT-5 API 最佳实践：Prompt 工程与性能优化', '# GPT-5 API 最佳实践

## Prompt 工程技巧

### 结构化 Prompt

使用清晰的层次结构：

```
## 角色 ##
你是一个资深的前端架构师

## 任务 ##
审查以下 React 组件代码的性能问题

## 约束 ##
- 只关注性能相关的问题
- 提供具体的优化建议
- 按严重程度排序

## 代码 ##
[粘贴代码]
```

### Few-shot 示例

提供 2-3 个示例引导模型输出格式：

```
生成产品描述：

输入: 智能手表
输出: 【智能手表】搭载AI健康监测系统...

输入: 蓝牙耳机
输出: 【蓝牙耳机】高品质降噪...
```

## 性能优化

### 缓存策略

- 使用 Prompt Caching 减少重复请求成本
- 将静态指令放在 Prompt 前面
- Cache 命中可将成本降低 90%

### Streaming 流式响应

```python
from openai import OpenAI

client = OpenAI()
stream = client.chat.completions.create(
    model="gpt-5-turbo",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
```

### 批量处理

使用 Batch API 处理非实时任务，成本降低 50%。

```python
batch = client.batches.create(
    input_file_id="file-xxx",
    endpoint="/v1/chat/completions",
    completion_window="24h"
)
```

## 安全最佳实践

- 输入验证和净化
- 设置 max_tokens 限制
- 使用 moderation API 过滤
- 实施 rate limiting

## 成本控制

| 策略 | 成本节省 |
|------|----------|
| Prompt Caching | 90% |
| Batch API | 50% |
| 选择合适的模型 | 30-50% |
| 优化上下文长度 | 按比例 |', 'codex', ARRAY['GPT-5', 'API', 'Prompt工程', '优化'], 'GPT-5 API 最佳实践，包括 Prompt 工程、性能优化和成本控制策略。', 'gpt-5-api-best-practices', 'GPT-5 API 最佳实践 | Prompt工程与性能优化', 'GPT-5 API 最佳实践指南。结构化Prompt、缓存策略、Streaming、Batch API和成本控制。', ARRAY['GPT-5', 'API', 'Prompt', '优化', 'OpenAI']);
