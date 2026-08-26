import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audioSynth';
import { PROJECTS, DESIGNER_INFO } from '../data/portfolioData';

interface AIRobotAssistantProps {
  onNavigate: (sectionId: string) => void;
}

export const AIRobotAssistant: React.FC<AIRobotAssistantProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user'; text: string; actionId?: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const robotWrapRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 进入首页后立即让机器人入场，并在短暂延迟后主动打招呼。
  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setShowBubble(true);
      audio.playHoverTone(580);
    }, 650);

    const hideTimer = setTimeout(() => {
      setShowBubble(false);
    }, 3800);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // 发光 X 眼在面罩内跟随鼠标移动。
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!robotWrapRef.current) return;
      const rect = robotWrapRef.current.getBoundingClientRect();
      const robotCenterX = rect.left + rect.width / 2;
      const robotCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - robotCenterX;
      const deltaY = e.clientY - robotCenterY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxOffset = 3.5;

      if (distance === 0) return;
      const moveX = (deltaX / distance) * Math.min(maxOffset, distance / 40);
      const moveY = (deltaY / distance) * Math.min(maxOffset, distance / 40);

      setPupilPos({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);
  
  const handleToggle = () => {
    audio.playClick(600);
    setShowBubble(false);
    setIsOpen(prev => !prev);
  };

  const handleClose = () => {
    audio.playClick(400);
    setIsOpen(false);
  };

  // 点击快速操作按钮：触发音效、导航至对应版块并自动关闭 AI 面板
  const handleQuickAction = (action: string) => {
    audio.playClick(750);
    if (action === '认识我') {
      onNavigate('about');
      handleClose();
    } else if (action === '看看作品') {
      onNavigate('projects');
      handleClose();
    } else if (action === '推荐项目') {
      onNavigate('projects');
      handleClose();
    } else if (action === '随便逛逛') {
      onNavigate('beyond');
      handleClose();
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    audio.playClick(650);

    let reply = '感谢提问！你可以点击下方的快速选项，或直接浏览作品集各个版块。';
    let targetSection = '';

    const lower = userText.toLowerCase();
    if (lower.includes('经历') || lower.includes('工作') || lower.includes('背景') || lower.includes('简历')) {
      reply = '巴涵笑曾参与多个大型产品体验升级与重构，具备丰富的中后台及移动端落地经验。';
      targetSection = 'experience';
    } else if (lower.includes('项目') || lower.includes('作品') || lower.includes('案例')) {
      reply = '作品集包含多个完整设计案例，支持分类筛选和深度查看设计过程。';
      targetSection = 'projects';
    } else if (lower.includes('联系') || lower.includes('合作') || lower.includes('邮箱') || lower.includes('微信')) {
      reply = '随时欢迎探讨交流与设计合作！可在页面底部获取联系方式与社交主页。';
      targetSection = 'contact';
    } else if (lower.includes('你好') || lower.includes('hi') || lower.includes('hello')) {
      reply = '你好呀！欢迎来到巴涵笑的作品集，随时可以向我提问~';
    }

    setChatHistory(prev => [
      ...prev,
      { role: 'user', text: userText },
      { role: 'ai', text: reply, actionId: targetSection || undefined },
    ]);
  };

  return (
    <div className="ai-assistant" id="aiAssistant">
      {/* 机器人触发按钮 */}
      <button
        className={`robot-wrap ${showBubble ? 'show-auto-bubble' : ''}`}
        id="robotBtn"
        ref={robotWrapRef}
        onClick={handleToggle}
        aria-label="打开 AI 助手"
      >
        <div className="robot" id="robotBody">
          <div className="robot-antenna" />

          <div className="robot-head">
            <div className="robot-visor">
              <div className={`eye eye-left ${isTyping ? 'eye-focused' : ''}`}>
                <div
                  className="pupil"
                  style={{
                    transform: isTyping
                      ? `translate(${pupilPos.x * 0.5}px, ${pupilPos.y * 0.5}px) scale(1.12)`
                      : `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                  }}
                />
              </div>

              <div className={`eye eye-right ${isTyping ? 'eye-focused' : ''}`}>
                <div
                  className="pupil"
                  style={{
                    transform: isTyping
                      ? `translate(${pupilPos.x * 0.5}px, ${pupilPos.y * 0.5}px) scale(1.12)`
                      : `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="robot-arm robot-arm-left" />
          <div className="robot-arm robot-arm-right" />

          <div className="robot-chest">
            <span className="panel-screw screw-tl" />
            <span className="panel-screw screw-tr" />
            <span className="panel-screw screw-bl" />
            <span className="panel-screw screw-br" />
            <div className="speaker-grille" />
          </div>

          <div className="robot-stem" />
          <div className="robot-base" />
        </div>

        {/* 首页进入后自动唤起一次，同时支持 hover 再次显示 */}
        <div
          className="hello-bubble"
          style={showBubble ? { opacity: 1, transform: 'translateY(0) scale(1)', pointerEvents: 'auto' } : {}}
        >
          嗨，需要我带路吗？
        </div>
      </button>

      {/* AI 聊天窗口面板 */}
      <div
        className={`ai-panel ${isOpen ? 'active' : ''}`}
        id="aiPanel"
      >
        <div className="ai-header">
          <div id="aiHeaderInfo">
            <div className="ai-title">AI GUIDE</div>
            <div className="ai-status">
              <span />
              Online
            </div>
          </div>
          <button className="close-btn" id="closeBtn" onClick={handleClose} aria-label="关闭">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="ai-content">
          <div>
            <div className="robot-small">
              <div className="small-eye" />
              <div className="small-eye" />
            </div>

            <h2 id="aiWelcomeTitle">Hi 👀</h2>

            <p>
              我是这个作品集里的 AI 小助手。<br />
              要我带你快速逛一圈吗？
            </p>

            <div className="quick-actions">
              <button id="btnQuickAbout" onClick={() => handleQuickAction('认识我')}>
                认识我
              </button>
              <button id="btnQuickProjects" onClick={() => handleQuickAction('看看作品')}>
                看看作品
              </button>
              <button id="btnQuickRecommend" onClick={() => handleQuickAction('推荐项目')}>
                推荐项目
              </button>
              <button id="btnQuickExplore" onClick={() => handleQuickAction('随便逛逛')}>
                随便逛逛
              </button>
            </div>
          </div>

          {/* 问答对话列表呈现 */}
          {chatHistory.length > 0 && (
            <div className="mt-4 pt-3 border-t border-black/5 space-y-3">
              {chatHistory.map((item, idx) => (
                <div
                  key={`msg-${idx}`}
                  className={`text-xs leading-relaxed p-2.5 rounded-xl ${
                    item.role === 'user'
                      ? 'bg-[#0061F2] text-white ml-6'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 mr-6'
                  }`}
                >
                  <p>{item.text}</p>
                  {item.actionId && (
                    <button
                      onClick={() => {
                        audio.playClick(750);
                        onNavigate(item.actionId!);
                        handleClose();
                      }}
                      className="mt-2 text-[11px] font-bold text-[#0061F2] underline hover:opacity-80 block cursor-pointer"
                    >
                      👉 点击跳转前往查看
                    </button>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="ai-input" id="aiInputForm">
          <input
            id="aiTextInput"
            type="text"
            value={inputMessage}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onChange={(e) => {
              setInputMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            placeholder="Ask me anything..."
            className="flex-1 h-[46px] border-none px-4 rounded-full bg-[#f4f4f4] text-neutral-800 outline-none text-sm focus:ring-2 focus:ring-[#0061F2]/20"
          />
          <button
            type="submit"
            id="aiSendBtn"
            aria-label="发送"
            className="w-[46px] h-[46px] shrink-0 border-none rounded-full bg-[#0061F2] text-white flex items-center justify-center text-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};
