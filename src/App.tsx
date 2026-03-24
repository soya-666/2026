import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown, 
  ChevronsDown, 
  Mail, 
  Phone,
  Hash,
  Instagram, 
  Youtube, 
  ChevronRight,
  Menu,
  X,
  Star,
  ShieldCheck,
  BarChart3
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '教學特色', href: '#features' },
    { name: '關於 Soya', href: '#about' },
    { name: '學員見證', href: '#testimonials' },
    { name: '課程方案', href: '#courses' },
    { name: '媒體報導', href: '#media' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://i.imgur.com/tb3gnOf.png" 
            alt="第一桶金幸福學 Soya 許舒韻" 
            className="h-10 md:h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-gold-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden border-t"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-lg font-medium text-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  // 勿用負 margin：桌面版 Hero 用 items-end，數字常落在視窗底緣，-100px 會讓 IO 永遠判定為不可見
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1] // Custom ease for a "slot machine" feel
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-20 pb-0 lg:pt-24 lg:pb-16 overflow-hidden bg-[#F5F2ED]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-50/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-end md:py-4 lg:py-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="px-6 md:px-0"
        >
          <h1 className="text-[26px] lg:text-5xl font-bold gradient-text leading-[1.1] mb-2">
            第一桶金幸福學
          </h1>
          <p className="text-[15px] md:text-lg text-slate-600 mb-4 max-w-lg leading-relaxed">
            掌握「每一天都幸福快樂」的關鍵課程<br />
            讓你完成你想達到的人生目標<br />
            重拾自由的底氣，立刻為自己建構穩健的財務藍圖！
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#testimonials" 
              className="bg-gold-600 text-white px-8 py-1.5 md:px-16 md:py-3 rounded-xl md:rounded-2xl font-bold text-[16px] md:text-xl hover:bg-gold-700 transition-all shadow-lg hover:shadow-gold-400 flex flex-col items-center justify-center leading-tight w-full sm:w-auto sm:min-w-[280px]"
            >
              <span className="flex items-center gap-2">
                <Star size={20} fill="white" className="text-white" /> 5.0/5.0
              </span>
              <span className="text-[16px] md:text-sm font-normal text-white/90 mt-1">(32則評論)</span>
            </a>
          </div>
          
          <div className="mt-6 px-4 md:px-0 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-4 md:gap-6 lg:gap-3">
            <div className="text-center lg:text-left">
              <div className="text-[20px] md:text-3xl font-bold text-slate-900 whitespace-nowrap">
                <Counter value={10} suffix="+" />
              </div>
              <div className="text-[12px] lg:text-xs text-slate-500 whitespace-nowrap">實戰經驗 (年)</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="text-center lg:text-left">
              <div className="text-[20px] md:text-3xl font-bold text-slate-900 whitespace-nowrap">
                <Counter value={3000} suffix="+" />
              </div>
              <div className="text-[12px] lg:text-xs text-slate-500 whitespace-nowrap">學員口碑見證</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="hidden sm:block text-center lg:text-left">
              <div className="text-[20px] md:text-3xl font-bold text-slate-900 whitespace-nowrap">
                <Counter value={20000} suffix="+" />
              </div>
              <div className="text-[12px] lg:text-xs text-slate-500 whitespace-nowrap">累積聽講人次</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-slate-200" />
            <div className="text-center lg:text-left">
              <div className="text-[20px] md:text-3xl font-bold text-slate-900 whitespace-nowrap">
                <span className="sm:hidden">
                  <Counter value={20000} suffix="+" />
                </span>
                <span className="hidden sm:inline">
                  <Counter value={150} suffix="+" />
                </span>
              </div>
              <div className="text-[12px] lg:text-xs text-slate-500 whitespace-nowrap sm:hidden">累積聽講人數</div>
              <div className="text-[12px] lg:text-xs text-slate-500 whitespace-nowrap hidden sm:block">實體講座</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full md:py-4 lg:py-12"
        >
          <div className="relative z-10 rounded-none md:rounded-3xl overflow-hidden shadow-none md:shadow-2xl aspect-video bg-slate-200 border-0 md:border-4 border-white">
            <img 
              src="https://i.imgur.com/ED9m5th.jpeg" 
              alt="Soya 許舒韻 - 第一桶金幸福學" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialRibbon = () => {
  return (
    <section className="pt-6 pb-8 bg-[#4E342E] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-600 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gold-600 rounded-full blur-3xl translate-y-1/2" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-12"
        >
          <h2 className="text-gold-400 font-bold text-[23px] md:text-4xl tracking-tight leading-tight md:leading-normal">超過 95% 上過課的學員都回饋</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl relative z-10">
              <p className="text-slate-800 text-[15px] md:text-xl font-medium leading-relaxed italic">
                「原來只需要學好這堂課，之前花時間去上其他課都浪費了！」
              </p>
            </div>
            <div className="absolute -bottom-4 left-12 w-8 h-8 bg-white rotate-45 shadow-2xl" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gold-600 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl relative z-10">
              <p className="text-white text-[15px] md:text-xl font-medium leading-relaxed italic">
                「如果我 30 歲前就能遇到 Soya 老師，那我人生從此就不同了！」
              </p>
            </div>
            <div className="absolute -bottom-4 right-12 w-8 h-8 bg-gold-600 rotate-45 shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gold-100 text-gold-600 font-bold text-[18px] md:text-[28px]">1</div>,
      title: "金頭腦心法",
      description: "專注觀察具備高度避險特性的「黃金」，只用固定小額部位運作。"
    },
    {
      icon: <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gold-100 text-gold-600 font-bold text-[18px] md:text-[28px]">2</div>,
      title: "點石成金手指",
      description: "每天早上七點固定半小時，就像點外送app一樣簡單。"
    },
    {
      icon: <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gold-100 text-gold-600 font-bold text-[18px] md:text-[28px]">3</div>,
      title: "威力加倍金鏟子",
      description: "更進階方式，每天2小時，換得金頭腦好幾倍的幸福，從此踏入美好人生！"
    }
  ];

  return (
    <section id="features" className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8">
            <p className="text-[23px] md:text-[32px] font-bold text-slate-900 mb-3 md:mb-6 leading-relaxed">
              <span className="bg-gold-600 text-white text-[20px] md:text-[32px] px-4 py-1 rounded-lg">第一桶金幸福學</span>
              <br className="md:hidden" />
              將會教你什麼樣的核心策略？
            </p>
          </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="p-5 md:p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-2 md:block md:mb-0">
                <div className="md:mb-6">{feature.icon}</div>
                <h3 className="text-[19px] md:text-[26px] font-bold text-slate-900 md:mb-4">{feature.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-3 md:mb-6 text-[13px] md:text-[19px]">{feature.description}</p>
              
              {index === 0 && (
                <div className="mt-auto p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <p className="text-slate-600 text-[13px] md:text-[17px] font-light italic leading-relaxed">
                    獨家模組圖像化筆記，從容應對每天盤勢變化
                  </p>
                </div>
              )}
              {index === 1 && (
                <div className="mt-auto p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <p className="text-slate-600 text-[13px] md:text-[17px] font-light italic leading-relaxed">
                    每日固定時段盤勢佈局，掌握第一手資訊
                  </p>
                </div>
              )}
              {index === 2 && (
                <div className="mt-auto p-3 md:p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <p className="text-slate-600 text-[13px] md:text-[17px] font-light italic leading-relaxed">
                    早晨、中午、下午、晚上、睡前，全天候適用
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Courses = () => {
  return (
    <section id="courses" className="py-12 bg-[#F5F2ED]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6 md:mb-16">
          <h2 className="text-[23px] md:text-[36px] font-bold text-gold-600 mb-4">
            立刻把握這個月最後機會<br />
            掌握幸福人生有底氣的開始！
          </h2>
          <p className="text-slate-600 text-[15px] md:text-[28px]">每個月僅有一次實體團體小班制課程</p>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          <div className="bg-white p-6 md:p-12 rounded-[40px] shadow-2xl max-w-2xl w-full relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-full -mr-16 -mt-16 z-0" />
            
            <div className="relative z-10">
              <div className="mb-4 md:mb-8">
                <p className="text-[20px] md:text-3xl font-black text-slate-900 mb-4 md:mb-6">上課即可解鎖</p>
                <div className="space-y-2 md:space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-center gap-4 bg-gold-50 p-2 md:p-4 rounded-2xl">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gold-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
                    <span className="text-[13px] md:text-xl font-bold text-slate-800">完整16+套模組圖像化筆記</span>
                  </div>
                  <div className="flex items-center gap-4 bg-gold-50 p-2 md:p-4 rounded-2xl">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gold-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
                    <span className="text-[13px] md:text-xl font-bold text-slate-800">掌握每日盤勢佈局</span>
                  </div>
                </div>
              </div>

              <motion.a 
                href="https://line.me/R/ti/p/@soya666" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#dd7659] hover:bg-[#dd7659] text-white rounded-3xl font-black text-[18px] md:text-2xl transition-all shadow-xl shadow-gold-600/20 flex items-center justify-center gap-3"
              >
                立即加Line報名
                <ArrowRight size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  
  const reviews = [
    {
      name: "Lu*",
      role: "學員",
      content: "原本很抗拒積極操作，一直以來都是做被動投資，但老師的課讓我有了新的想法，改變了我的視野、醍醐灌頂",
      avatar: "https://i.imgur.com/tJSGQnc.jpeg",
      date: "2026-02-23"
    },
    {
      name: "BBB",
      role: "學員",
      content: "解惑了我在許多ETF課程中沒注意到的盲點",
      avatar: "https://picsum.photos/seed/bbb/150/150",
      date: "2026-02-23"
    },
    {
      name: "欣",
      role: "學員",
      content: "Soya老師人美心善，課程明瞭易懂好上手，2026年一開始，就能遇到Soya老師真的是超級幸福٩(๑•ω•๑)۶",
      avatar: "https://picsum.photos/seed/xin/150/150",
      date: "2026-02-23"
    },
    {
      name: "Eric",
      role: "學員",
      content: "Soya老師是我看過最努力的老師🥰🥰",
      avatar: "https://picsum.photos/seed/eric/150/150",
      date: "2026-02-23"
    },
    {
      name: "Rex",
      role: "學員",
      content: "打開我的新世界",
      avatar: "https://picsum.photos/seed/rex/150/150",
      date: "2026-02-23"
    },
    {
      name: "Joanne",
      role: "學員",
      content: "身邊朋友推薦來上課的，沒想到收穫遠超預期！原來理財不是只有存錢跟買股票，觀念整個被刷新了",
      avatar: "https://picsum.photos/seed/joanne/150/150",
      date: "2026-02-22"
    },
    {
      name: "阿翰",
      role: "學員",
      content: "老師講話很直白，不會繞來繞去。重點是真的有在帶操作，不是只講理論而已",
      avatar: "https://picsum.photos/seed/ahan/150/150",
      date: "2026-02-22"
    },
    {
      name: "Mia Chen",
      role: "學員",
      content: "之前對外匯完全沒概念，上完課才發現原來門檻沒有想像中那麼高。老師的教學方式很適合初學者👍",
      avatar: "https://picsum.photos/seed/miachen/150/150",
      date: "2026-02-21"
    },
    {
      name: "Kevin L.",
      role: "學員",
      content: "裸K的概念真的很厲害，不用看一堆指標就能判斷方向。學到的東西比我花好幾萬上的其他課還實用",
      avatar: "https://picsum.photos/seed/kevinl/150/150",
      date: "2026-02-21"
    },
    {
      name: "小魚",
      role: "學員",
      content: "從完全不懂到現在每天都會看盤分析，感謝Soya老師的耐心教導！助教群也很給力，有問題隨時都能問",
      avatar: "https://picsum.photos/seed/xiaoyu/150/150",
      date: "2026-02-20"
    },
    {
      name: "Daniel",
      role: "學員",
      content: "課程設計得很有系統，從基礎到進階一步步帶。讓我這種上班族也能利用下班時間學習操作",
      avatar: "https://picsum.photos/seed/daniel/150/150",
      date: "2026-02-20"
    },
    {
      name: "Ivy Wang",
      role: "學員",
      content: "最喜歡老師分享的資金管控觀念。以前投資總是抱著賭一把的心態，現在知道風險控管才是關鍵",
      avatar: "https://picsum.photos/seed/ivywang/150/150",
      date: "2026-02-19"
    },
    {
      name: "Jason",
      role: "學員",
      content: "內容扎實，尤其是槓桿運用和時間複利的部分讓我眼睛一亮。唯一小建議是希望能多一些實戰案例分享",
      avatar: "https://picsum.photos/seed/jason/150/150",
      date: "2026-02-19"
    },
    {
      name: "Amber",
      role: "學員",
      content: "帶著寶寶來上課，老師跟團隊都超親切的❤️ 課程讓我對未來規劃更有方向，不再只是傻傻存錢",
      avatar: "https://picsum.photos/seed/amber/150/150",
      date: "2026-02-18"
    },
    {
      name: "Gilo",
      role: "學員",
      content: "推薦這門課程！",
      avatar: "https://picsum.photos/seed/gilo/150/150",
      date: "2026-02-18"
    },
    {
      name: "戴*明",
      role: "學員",
      content: "以前不知道怎麼控管風險，聽完這堂課，觀念整個被刷新了。",
      avatar: "https://picsum.photos/seed/daiming/150/150",
      date: "2026-02-18"
    },
    {
      name: "盧*婷",
      role: "學員",
      content: "原本對技術分析一竅不通，學習了老師的獨家心法，收穫真的超級多！",
      avatar: "https://picsum.photos/seed/luting/150/150",
      date: "2026-02-18"
    },
    {
      name: "Rose",
      role: "學員",
      content: "以前總是在市場當韭菜，上了Soya老師的課後，現在對投資更有信心了。",
      avatar: "https://picsum.photos/seed/rose/150/150",
      date: "2026-02-16"
    },
    {
      name: "Bob",
      role: "學員",
      content: "相見恨晚！",
      avatar: "https://picsum.photos/seed/bob/150/150",
      date: "2026-02-16"
    },
    {
      name: "江*筑",
      role: "學員",
      content: "學習了老師的獨家心法，終於有了自己的交易邏輯。",
      avatar: "https://picsum.photos/seed/jiangzhu/150/150",
      date: "2026-02-15"
    },
    {
      name: "賴*君",
      role: "學員",
      content: "上了Soya老師的課後，觀念整個被刷新了。",
      avatar: "https://picsum.photos/seed/laijun/150/150",
      date: "2026-02-15"
    },
    {
      name: "Nina",
      role: "學員",
      content: "以前對技術分析一竅不通，在團隊的帶領下，發現原來裸K這麼好用。",
      avatar: "https://picsum.photos/seed/nina/150/150",
      date: "2026-02-13"
    },
    {
      name: "Vivian",
      role: "學員",
      content: "推",
      avatar: "https://picsum.photos/seed/vivian/150/150",
      date: "2026-02-13"
    },
    {
      name: "Zoe",
      role: "學員",
      content: "一直以來覺得外匯很複雜不敢碰，上了Soya老師的課後，學會了真正的風險控管。",
      avatar: "https://picsum.photos/seed/zoe/150/150",
      date: "2026-02-13"
    },
    {
      name: "賴*軒",
      role: "學員",
      content: "經過老師的講解，終於有了自己的交易邏輯。",
      avatar: "https://picsum.photos/seed/laixuan/150/150",
      date: "2026-02-12"
    },
    {
      name: "彭*信",
      role: "學員",
      content: "之前覺得外匯很複雜不敢碰，聽完這堂課，豁然開朗！",
      avatar: "https://picsum.photos/seed/pengxin/150/150",
      date: "2026-02-12"
    },
    {
      name: "User",
      role: "學員",
      content: "過去對技術分析一竅不通，經過老師的講解，發現原來裸K這麼好用。",
      avatar: "https://picsum.photos/seed/user/150/150",
      date: "2026-02-12"
    },
    {
      name: "Eve",
      role: "學員",
      content: "過去投資常常找不到方向，聽完這堂課，收穫真的超級多！",
      avatar: "https://picsum.photos/seed/eve/150/150",
      date: "2026-02-11"
    },
    {
      name: "品妍",
      role: "學員",
      content: "經過老師的講解，觀念整個被刷新了。",
      avatar: "https://picsum.photos/seed/pinyan/150/150",
      date: "2026-02-11"
    },
    {
      name: "David",
      role: "學員",
      content: "學習了老師的獨家心法，豁然開朗！",
      avatar: "https://picsum.photos/seed/david/150/150",
      date: "2026-02-10"
    },
    {
      name: "詹*熙",
      role: "學員",
      content: "讚",
      avatar: "https://picsum.photos/seed/zhanxi/150/150",
      date: "2026-02-10"
    },
    {
      name: "Steven",
      role: "學員",
      content: "課程有料！過去上過的課程都艱深難懂\n教學內容化繁為簡\n非常容易運用！\n推推",
      avatar: "https://i.imgur.com/6siiq3q.jpeg",
      date: "2026-02-23"
    }
  ];

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section id="testimonials" className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-2 md:mb-8 gap-2 md:gap-6">
          <div className="w-full md:w-auto max-w-2xl">
            <h2 className="text-[20px] md:text-4xl font-bold text-slate-900 mb-0 md:mb-4 text-center md:text-left">學員評價</h2>
          </div>
          <div className="flex gap-2 justify-center md:justify-start">
            <div className="flex -space-x-3">
              <img src="https://picsum.photos/seed/taipei/150/150" className="w-10 h-10 rounded-full border-2 border-white" alt="" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/cat/150/150" className="w-10 h-10 rounded-full border-2 border-white" alt="" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/dog/150/150" className="w-10 h-10 rounded-full border-2 border-white" alt="" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/mountain/150/150" className="w-10 h-10 rounded-full border-2 border-white" alt="" referrerPolicy="no-referrer" />
            </div>
            <div className="ml-4 text-[15px] font-medium text-slate-600 flex items-center gap-1.5">
              <Star size={16} fill="currentColor" className="text-amber-400" />
              <span className="text-gold-600 font-bold">5.0</span>
              <span className="text-slate-400 ml-1">(32則評論)</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
          <AnimatePresence mode="popLayout">
            {visibleReviews.map((review, index) => (
              <motion.div 
                key={review.name + index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 md:p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-[12px] md:text-[15px] text-slate-400 font-mono">{review.date}</span>
                </div>
                <p className="text-[15px] text-slate-700 italic mb-4 md:mb-8 leading-relaxed whitespace-pre-line flex-grow">"{review.content}"</p>
                <div className="flex items-center gap-3 md:gap-4 mt-auto">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-[14px] md:text-[15px]">{review.name}</div>
                    <div className="text-[13px] md:text-[15px] text-slate-500">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && (
          <div className="text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md group"
            >
              查看更多評價 <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const VisualQA = () => {
  const qaData = [
    {
      q: "Soya許舒韻老師是誰？",
      a: (
        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-x-1 gap-y-6 sm:gap-8 items-center sm:items-start">
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full blur opacity-30"></div>
              <img 
                src="https://i.imgur.com/kyRjyK0.jpeg" 
                alt="Soya 老師大頭照" 
                className="relative w-24 h-24 sm:w-44 sm:h-44 rounded-full object-cover object-center border-4 border-gold-500 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Mobile Name & Title */}
          <div className="flex flex-col gap-0 sm:hidden flex-1">
            <span className="text-[18px] font-bold text-white">SOYA 許舒韻</span>
            <span className="text-gold-400 font-bold text-[13px]">FXVIC 創辦人</span>
          </div>

          <div className="w-full sm:flex-1 space-y-4 md:space-y-6 text-left">
            <div className="flex flex-col gap-0">
              <span className="hidden sm:block sm:text-[25px] font-bold text-white">SOYA 許舒韻</span>
              <span className="hidden sm:block text-gold-400 font-bold sm:text-[19px]">FXVIC 創辦人</span>
              <span className="text-gold-200/80 italic text-[15px] mt-2 leading-relaxed">
                現任： 「外匯價值投資學院」創辦人 《第一桶金幸福學》課程講師 眾曜智庫學院 合作講師
              </span>
            </div>
            <ul className="space-y-0.5 md:space-y-3 text-white/90 text-left">
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">・</span>
                <span>10年+ 金融市場實戰交易經驗</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">・</span>
                <span>20,000+ 累積聽講人次</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">・</span>
                <span>3,000+ 學員口碑見證</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-500 mt-1">・</span>
                <span>0 指標：獨創「單憑裸K」精準預測，不依賴傳統複雜指標</span>
              </li>
            </ul>
          </div>
        </div>
      ),
      images: [
        "https://i.imgur.com/dqV8Drp.jpeg",
        "https://i.imgur.com/c30ImMT.jpeg",
        "https://i.imgur.com/4pvitDy.jpeg",
        "https://i.imgur.com/itHEJRV.jpeg",
        "https://i.imgur.com/7h7gVUm.jpeg"
      ]
    },
    {
      q: "Soya老師跟坊間老師有什麼差別?",
      a: "",
      images: [
        "https://i.imgur.com/UlCO3V2.png",
        "https://i.imgur.com/fcHdWWZ.jpeg",
        "https://i.imgur.com/dj6bGKw.jpeg",
        "https://i.imgur.com/OspvhtR.jpeg",
        "https://i.imgur.com/8XgTo5I.jpeg",
        "https://i.imgur.com/Vglb1G9.jpeg",
        "https://i.imgur.com/nGQxGgS.jpeg"
      ]
    }
  ];

  return (
    <section id="about" className="pt-6 pb-0 bg-[#4E342E] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-6">
          <h2 className="text-[26px] md:text-5xl font-bold mb-2 md:mb-6 bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent italic">
            學員最常見的問題
          </h2>
          <p className="text-white text-[15px] max-w-2xl mx-auto">
            我們知道你有很多疑問，這裡有最直觀的解答與實況展示。
          </p>
        </div>

        <div className="space-y-4 md:space-y-8">
          {qaData.map((item, index) => (
            <React.Fragment key={index}>
              <div className={`flex flex-col ${index >= 1 ? 'items-start' : (index % 2 === 1 ? 'md:flex-row-reverse items-start md:items-center' : 'md:flex-row items-start md:items-center')} gap-4 md:gap-8`}>
                <div className={`${index >= 1 ? 'w-full' : 'flex-1'} space-y-4 md:space-y-8`}>
                  <motion.div
                    className={index >= 1 ? "text-left" : "text-left md:text-center"}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="mb-2 md:mb-4">
                      <div className="inline-block px-6 py-2 rounded-full bg-gold-600/20 text-gold-400 text-[11px] md:text-lg font-bold">
                        QUESTION 0{index + 1}
                      </div>
                    </div>
                    <h3 className="text-[20px] md:text-[36px] font-bold mb-4 md:mb-6 leading-tight inline-block border-b-4 border-gold-500 pb-2">{item.q}</h3>
                    <div className="text-white text-[15px] md:text-[18px] leading-relaxed whitespace-pre-line">{item.a}</div>
                  </motion.div>
                </div>

                <div className={`${index >= 1 ? 'w-full' : 'flex-1'} relative`}>
                  {index === 1 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                      {/* Large First Image */}
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3 relative overflow-hidden aspect-auto"
                      >
                        <img 
                          src={item.images[0]} 
                          alt="" 
                          className="w-full md:w-full max-w-full md:max-w-full mx-auto h-auto object-contain hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-[16px] font-bold tracking-widest uppercase text-gold-400">Main Result</span>
                        </div>
                      </motion.div>
                      
                      {/* 6 Smaller Images */}
                      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                        {item.images.slice(1).map((img, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (imgIndex + 1) * 0.1, duration: 0.5 }}
                            className="relative rounded-xl overflow-hidden shadow-lg bg-black/10 aspect-square"
                          >
                            <img 
                              src={img} 
                              alt="" 
                              className={`w-full h-full object-cover hover:scale-110 transition-transform duration-700 ${imgIndex === 0 ? 'object-right' : 'object-center'}`}
                              referrerPolicy="no-referrer"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : index === 2 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                      {item.images.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: imgIndex * 0.2, duration: 0.6 }}
                          className="relative rounded-3xl overflow-hidden shadow-2xl bg-black/10"
                        >
                          <img 
                            src={img} 
                            alt="" 
                            className="w-full h-auto hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="columns-1 md:columns-2 gap-4 space-y-4">
                      {item.images.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: imgIndex * 0.2, duration: 0.5 }}
                          className="relative rounded-2xl overflow-hidden shadow-2xl break-inside-avoid bg-black/10"
                        >
                          <img 
                            src={img} 
                            alt="" 
                            className="w-full h-auto hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-[16px] font-bold tracking-widest uppercase text-gold-400">Trading Visuals</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-600/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-600/10 rounded-full blur-3xl -z-10" />
                </div>
              </div>

              {/* Insert Video section after Q2 (index 1) */}
              {index === 1 && (
                <div className="py-4 md:py-8 border-y border-gold-200 bg-gold-100 -mx-6 px-6">
                  <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                      {[
                        { 
                          url: "https://res.cloudinary.com/dinmty6gb/video/upload/v1774115328/%E5%AD%B8%E5%93%A1%E8%A8%AA%E8%AB%87_%E5%BE%9E%E5%B0%8F%E7%99%BD%E5%88%B0%E4%B8%8A%E6%89%8B%E5%83%85%E6%AD%B7%E6%99%82%E4%B9%9D%E5%80%8B%E6%9C%88_pucawm.mp4", 
                          title: "學員訪談，從小白到上手僅歷時九個月" 
                        },
                        { 
                          url: "https://res.cloudinary.com/dinmty6gb/video/upload/v1774115327/%E4%BB%A5%E7%82%BA%E8%87%AA%E5%B7%B1%E6%98%AF%E5%A4%A9%E7%B8%B1%E8%8B%B1%E6%89%8D_%E7%9B%B4%E5%88%B0%E6%85%98%E8%B3%A0300%E8%90%AC%E6%89%8D%E5%AD%B8%E6%9C%83%E7%9A%84%E4%BA%A4%E6%98%93%E7%9C%9F%E7%9B%B8_c0l0ga.mp4", 
                          title: "以為自己是天縱英才？直到慘賠300萬才學會的交易真相" 
                        }
                      ].map((video, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.2 }}
                          className="rounded-3xl overflow-hidden shadow-xl bg-white border border-gold-200"
                        >
                          <div className="aspect-video">
                            <video
                              className="w-full h-full object-contain bg-black"
                              controls
                              preload="metadata"
                            >
                              <source src={video.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <div className="p-3 md:p-6">
                            <h3 className="text-[15px] md:text-xl font-bold text-slate-900">{video.title}</h3>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const MediaReports = () => {
  const reports = [
    {
      source: "今周專訪",
      title: "父親欠債上億，從夜市打工到翻轉人生 「第一桶金幸福學」創辦人 Soya許舒韻：自由的底氣，是月月都能幸福領出生活費",
      url: "https://www.businesstoday.com.tw/article/category/80401/post/202602130032/",
      date: "2026.02.14"
    },
    {
      source: "商周專訪",
      title: "「外匯價值投資學院」獨創單憑裸Ｋ精準預測，創辦人Soya：我的功力禁得起時間驗證！",
      url: "https://www.businessweekly.com.tw/focus/indep/1003917",
      date: "2023.11.02"
    },
    {
      source: "Yahoo新聞",
      title: "Soya 許舒韻協百名學員齊心做公益！ 力挺憨兒禮盒回饋社會",
      url: "https://tw.news.yahoo.com/soya-%E8%A8%B1%E8%88%92%E9%9F%BB%E5%8D%94%E7%99%BE%E5%90%8D%E5%AD%B8%E5%93%A1%E9%BD%8A%E5%BF%83%E5%81%9A%E5%85%AC%E7%9B%8A-%E5%8A%9B%E6%8C%BA%E6%86%A8%E5%85%92%E7%A6%AE%E7%9B%92%E5%9B%9E%E9%A5%8B%E7%A4%BE%E6%9C%83-075935459.html",
      date: "2026.03.17"
    },
    {
      source: "經濟日報",
      title: "春節不忘送暖弱勢童　Soya許舒韻攜手眾曜智庫學院實踐教育陪伴",
      url: "https://money.udn.com/money/story/5635/9337412",
      date: "2026.02.22"
    },
    {
      source: "工商時報",
      title: "眾曜智庫學院與SOYA女神合力舉辦地震公益聚餐活動",
      url: "https://www.ctee.com.tw/news/20240429700785-431208",
      date: "2024.04.29"
    }
  ];

  return (
    <section id="media" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-[20px] md:text-[36px] font-bold text-slate-900 mb-3 md:mb-6 leading-tight">
            媒體報導
          </h2>
          <div className="w-24 h-1.5 bg-gold-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {reports.map((report, index) => (
            <motion.a
              key={index}
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-50 p-4 md:p-8 rounded-3xl border border-slate-100 hover:border-gold-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3 md:mb-6">
                  <span className="px-4 py-1.5 bg-gold-100 text-gold-700 text-[14px] md:text-[15px] font-bold rounded-full uppercase tracking-wider">
                    {report.source}
                  </span>
                  <span className="text-slate-400 text-[12px] md:text-[15px] font-medium">{report.date}</span>
                </div>
                <h3 className="text-[15px] md:text-[26px] font-bold text-slate-900 mb-2 md:mb-4 group-hover:text-gold-600 transition-colors md:line-clamp-3 leading-snug">
                  {report.title}
                </h3>
              </div>
              <div className="flex items-center text-gold-600 font-bold text-[13px] md:text-[15px] mt-2 md:mt-4">
                閱讀全文 <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};



const Footer = () => {
  return (
    <footer className="bg-gold-50 text-slate-900 py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Google Map Section */}
          <div className="w-full max-w-4xl h-32 md:h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-3 md:mb-5">
            <iframe 
              src="https://maps.google.com/maps?q=新北市板橋區雙十路二段79號10樓之2&hl=zh-TW&z=16&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="眾曜智庫學院 地圖"
            ></iframe>
          </div>

          <div className="space-y-2 md:space-y-4 w-full">
            <div className="space-y-1">
              <p className="text-slate-600 text-[12px] md:text-[15px] leading-relaxed">
                本課程由【眾曜智庫學院】代理銷售，課程內容皆有申請智慧財產權，嚴禁轉錄翻拍。
              </p>
              <p className="text-slate-700 font-bold text-[11px] md:text-[15px] leading-relaxed">
                眾曜智庫股份有限公司｜新北市板橋區雙十路二段79號10樓之2
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-1 md:gap-y-3 text-slate-600 text-[13px] md:text-[15px]">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-gold-600" />
                <span>客服信箱：service@massenlighten.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-gold-600" />
                <span>客服電話：02-8275-2299</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash size={18} className="text-gold-600" />
                <span>統一編號：90699029</span>
              </div>
            </div>

            <div className="pt-4 md:pt-8 mt-3 md:mt-6 w-full border-t border-slate-200 text-slate-500 space-y-2">
              <p>
                <a 
                  href="https://www.massenlighten.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[12px] md:text-[15px] hover:text-gold-600 transition-colors underline underline-offset-4"
                >
                  隱私權政策 Privacy Policy
                </a>
              </p>
              <p className="text-[11px] md:text-[15px]">© 2026 眾曜智庫 Mass Enlighten All Rights Reserved. 眾曜智庫股份有限公司</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollVideo = ({ src, index = "1" }: { src: string, index?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { amount: 0.6 });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        if (videoRef.current.ended) {
          videoRef.current.currentTime = 0;
        }
        videoRef.current.play().catch(() => {
          console.log("Auto-play with sound was blocked. User interaction may be required.");
        });
      } else {
        videoRef.current.pause();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    }
  }, [isInView]);

  const handleEnded = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      if (videoRef.current && isInView) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
      timeoutRef.current = null;
    }, 3000);
  };

  return (
    <div className="relative group" ref={containerRef}>
      <motion.div 
        whileHover={{ scale: 1.15 }}
        className="absolute -top-4 -right-4 z-20 w-[56px] h-[56px] bg-gold-600 text-white rounded-full flex items-center justify-center font-black text-3xl shadow-2xl border-[4px] border-white cursor-default"
      >
        {index}
      </motion.div>
      <video 
        ref={videoRef}
        src={src}
        controls 
        onEnded={handleEnded}
        playsInline
        className="w-full h-auto rounded-3xl shadow-2xl border-4 border-slate-50"
        style={{ maxWidth: '100%' }}
      >
        您的瀏覽器不支援影片標籤。
      </video>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TestimonialRibbon />
      
      {/* Banner Image Section */}
      <section className="w-full bg-[#4E342E] md:bg-white">
        <div className="max-w-7xl mx-auto px-0 md:px-6 pt-12 pb-0 md:py-24">
          <img 
            src="https://i.imgur.com/8o61yM5.jpeg" 
            alt="Investment Strategy Banner" 
            className="w-full h-auto rounded-none md:rounded-3xl shadow-lg block"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Disclaimer & Inspiration Section */}
      <section className="py-8 bg-[#F5F2ED] border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-red-50 text-red-600 font-bold mb-3 md:mb-6 text-[18px] md:text-[26px]">
            重要提醒
          </div>
          <p className="text-slate-700 leading-relaxed font-medium text-[15px] md:text-[24px]">
            這裡完全沒有任何報明牌、也不會教你預判市場行情，但你必須先相信自己擁有
            <span className="text-gold-600 font-bold">『改變的能力』</span>
            好好把握這次機會，就能讓你見證
            <span className="text-slate-900 font-bold underline decoration-gold-400 underline-offset-4">「手裡握住一桶金」</span>
            的巨大威力！
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="pt-6 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-0 md:px-6">
          <div className="mb-6 text-center px-6 md:px-0">
            <h2 className="text-[23px] md:text-4xl font-bold text-slate-900 mb-2 md:mb-6 leading-relaxed">
              <span className="bg-gold-600 text-white px-4 py-1 rounded-lg text-[20px] md:text-4xl">第一桶金幸福學</span>
              <br className="md:hidden" />
              能解決什麼樣的困境？
            </h2>
            <div className="w-20 h-1.5 rounded-full mx-auto" style={{ backgroundColor: '#e8d7be' }}></div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-stretch px-6 md:px-0">
            <div className="w-full md:w-[40%]">
              <ScrollVideo src="https://res.cloudinary.com/dinmty6gb/video/upload/v1774007185/%E5%8F%B0%E7%81%A3%E4%BA%BA%E7%94%9F_iicuqu.mp4" index="1" />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl flex flex-col md:justify-center relative overflow-hidden group hover:shadow-gold-200/50 transition-shadow duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-200/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-200/30 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col md:h-full justify-between">
                <div>
                  <p className="text-slate-700 leading-relaxed font-medium text-[19px] md:text-[28px]">
                    這是大部分 <span className="text-gold-600 font-bold">80% 小資族</span> 共同的寫照
                  </p>
                  <div className="my-6 text-slate-600 text-[15px] md:text-lg lg:text-xl leading-relaxed">
                    <p className="text-[15px] md:text-lg lg:text-xl">你擁有一份看似穩定的工作，但薪水了不起就 4-5 萬，每天要出門上班就很痛苦、上班就在等著下班、下班報復性滑短影片，偶爾會想進修但實在提不起勁，買了線上課程想精進，卻根本看不完。</p>
                  </div>
                </div>
                <div className="mt-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-l-4 border-gold-500 shadow-sm">
                  <p className="text-slate-800 font-semibold italic text-[15px] md:text-xl">
                    「社會總說你不夠努力，但我們都知道，你已經非常努力了！」
                  </p>
                  <p className="mt-4 text-gold-700 font-bold text-[19px] md:text-2xl lg:text-3xl">
                    其實不是你不想，只是你努力錯了方向！
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mt-8"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center px-6 md:px-0"
            >
              <span className="text-[23px] md:text-3xl font-black text-gold-600 mb-2 tracking-[0.5em] ml-[0.5em]">破除困境</span>
              <ChevronsDown strokeWidth={4} className="text-gold-500 w-16 h-16 md:w-24 md:h-24" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 md:my-24 w-full max-w-5xl mx-auto px-0 md:px-4"
            >
              <img 
                src="https://i.imgur.com/EoMgNMU.jpeg" 
                alt="破除困境示意圖" 
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-none md:rounded-[2rem]"
              />
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Full-width Registration Image with Centered Button */}
      <section className="relative w-full overflow-hidden md:pt-0 pb-0 md:pb-24 bg-white">
        <img 
          src="https://i.imgur.com/NVQr0xN.jpeg" 
          alt="報名資訊" 
          referrerPolicy="no-referrer"
          className="w-full h-[180px] md:h-auto object-cover md:object-contain block"
        />
        <div className="absolute inset-0 flex items-center md:items-start justify-center p-6 md:pt-32">
          <div className="flex flex-col items-center gap-2 md:gap-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-900 font-light text-[15px] md:text-lg lg:text-xl text-center"
            >
              上課即可解鎖完整16+套模組圖像化筆記
            </motion.span>
            <motion.a 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              href="https://line.me/R/ti/p/@soya666" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#dd7659] hover:bg-[#dd7659] text-white font-black py-1.5 px-5 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group whitespace-nowrap"
            >
              <span className="text-[15px] md:text-[28px] text-center">加入官方Line報名，解鎖完整內容</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 hidden md:block" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="pt-6 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-0 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-stretch px-6 md:px-0">
            <div className="w-full md:w-[40%]">
              <ScrollVideo 
                src="https://res.cloudinary.com/dinmty6gb/video/upload/v1774007779/1_wtogop.mp4" 
                index="2"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl flex flex-col md:justify-center relative overflow-hidden group hover:shadow-gold-200/50 transition-shadow duration-500"
            >
              <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-gold-200/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 bg-slate-200/30 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col md:h-full justify-between min-h-[450px] md:min-h-0">
                <div className="pt-8 md:pt-0">
                  <p className="text-slate-700 leading-relaxed font-medium text-[19px] md:text-[28px]">
                    承認吧！<span className="text-gold-600 font-bold">99%的人</span>都存在的盲點
                  </p>
                  <div className="my-6 text-slate-600 text-[15px] md:text-lg lg:text-xl leading-relaxed">
                    <p className="text-[15px] md:text-lg lg:text-xl">現在的台灣人10個有9個都在投資，但為什麼只有1個人會贏？你也許認為自己天生運氣不好，看網路上一大堆神人都能輕鬆賺錢、財富自由。</p>
                  </div>
                </div>
                <div className="mt-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-l-4 border-gold-500 shadow-sm">
                  <p className="mt-4 text-gold-700 font-bold text-[19px] md:text-2xl lg:text-3xl text-center md:text-left">
                    但殊不知，真正的市場就是要讓<span className="text-gold-600 font-bold">99%的人</span>輸
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mt-8"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center px-6 md:px-0"
            >
              <span className="text-[23px] md:text-3xl font-black text-gold-600 mb-2 tracking-[0.5em] ml-[0.5em]">破除困境</span>
              <ChevronsDown strokeWidth={4} className="text-gold-500 w-16 h-16 md:w-24 md:h-24" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 md:my-24 w-full max-w-5xl mx-auto px-0 md:px-4"
            >
              <img 
                src="https://i.imgur.com/GM1gaiR.jpeg" 
                alt="破除困境示意圖" 
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-none md:rounded-[2rem]"
              />
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Full-width Registration Image with Centered Button */}
      <section className="w-full overflow-hidden md:pt-0 pb-0 md:pb-24 bg-white">
        {/* 手機：文案與按鈕在橫幅圖正上方（勿用 absolute 蓋在雙圖上） */}
        <div className="flex flex-col items-center gap-2 px-6 pt-6 pb-4 md:hidden">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-800 font-light text-[15px] text-center"
          >
            上課即可觀看每日盤勢佈局，掌握第一手資訊
          </motion.span>
          <motion.a 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            href="https://line.me/R/ti/p/@soya666" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#dd7659] hover:bg-[#dd7659] text-white font-black py-1.5 px-5 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group whitespace-nowrap"
          >
            <span className="text-[15px] text-center">加入官方Line報名，觀看每日分析佈局</span>
          </motion.a>
        </div>

        <div className="relative w-full">
          <img 
            src="https://i.imgur.com/xioWtUx.jpeg" 
            alt="報名資訊" 
            referrerPolicy="no-referrer"
            className="w-full h-[180px] md:h-auto object-cover md:object-contain block"
          />
          <div className="absolute inset-0 hidden md:flex md:items-start justify-center p-6 md:pt-32">
            <div className="flex flex-col items-center gap-2 md:gap-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white font-light text-[15px] md:text-lg lg:text-xl text-center"
              >
                上課即可觀看每日盤勢佈局，掌握第一手資訊
              </motion.span>
              <motion.a 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                href="https://line.me/R/ti/p/@soya666" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#dd7659] hover:bg-[#dd7659] text-white font-black py-1.5 px-5 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group whitespace-nowrap"
              >
                <span className="text-[15px] md:text-[28px] text-center">加入官方Line報名，觀看每日分析佈局</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 hidden md:block" />
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-6 md:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-0 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-stretch px-6 md:px-0">
            <div className="w-full md:w-[40%]">
              <ScrollVideo 
                src="https://res.cloudinary.com/dinmty6gb/video/upload/v1774001786/300%E8%90%AC_iqucxx.mp4" 
                index="3"
              />
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl flex flex-col md:justify-center relative overflow-hidden group hover:shadow-gold-200/50 transition-shadow duration-500"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-200/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-slate-200/30 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col md:h-full justify-between">
                <div>
                  <p className="text-slate-700 leading-relaxed font-medium text-[19px] md:text-[28px]">
                    有無論如何都想要達成的目標，<span className="text-gold-600 font-bold">神請給我三個願望</span>
                  </p>
                  <div className="my-6 text-slate-600 text-[15px] md:text-lg lg:text-xl leading-relaxed">
                    <p className="text-[15px] md:text-lg lg:text-xl">如果在一年後的你，戶頭裡多了300萬，你會拿去買車、買房，環遊世界？按照現在的財務規劃，你要到40歲、50歲、60歲，才能開始過你想過的人生</p>
                  </div>
                </div>
                <div className="mt-auto p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-l-4 border-gold-500 shadow-sm">
                  <p className="mt-4 text-gold-700 font-bold text-[19px] md:text-2xl lg:text-3xl text-center md:text-left">
                    錢可以完成很多願望，最重要的是<span className="text-gold-600 font-bold">「買回你的時間」</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mt-8 md:mt-8"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center px-6 md:px-0"
            >
              <span className="text-[23px] md:text-3xl font-black text-gold-600 mb-2 tracking-[0.5em] ml-[0.5em]">破除困境</span>
              <ChevronsDown strokeWidth={4} className="text-gold-500 w-16 h-16 md:w-24 md:h-24" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 md:mt-8 md:mb-12 w-full max-w-5xl mx-auto px-0 md:px-4 relative group"
            >
              <img 
                src="https://i.imgur.com/Nysc46m.jpeg" 
                alt="破除困境示意圖" 
                referrerPolicy="no-referrer"
                className="w-full h-auto rounded-none md:rounded-[2rem]"
              />
              <div className="absolute inset-0 flex items-end justify-center pb-5 md:pb-16">
                <motion.a 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                  href="https://line.me/R/ti/p/@soya666" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#dd7659] hover:bg-[#dd7659] text-white font-black py-1.5 px-5 md:py-3 md:px-8 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group whitespace-nowrap"
                >
                  <span className="text-[15px] md:text-[28px] text-center">加入官方Line報名</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 hidden md:block" />
                </motion.a>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>



      <Features />
      


      <VisualQA />

      {/* Combined Section: Text over Image */}
      <section className="relative w-full bg-[#4E342E] md:bg-white overflow-hidden">
        <div className="w-full relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <img 
              src="https://i.imgur.com/X4imZdK.jpeg" 
              alt="見證改變" 
              className="w-full h-auto block"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Overlay Text */}
          <div className="relative md:absolute md:inset-0 flex items-center pt-16 pb-4 md:py-0">
            <div className="max-w-7xl mx-auto px-10 md:px-20 w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl text-left"
              >
                <div className="mb-4">
                  <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-gold-600/30 text-gold-400 text-[11px] md:text-lg font-bold backdrop-blur-md">
                    QUESTION 03
                  </div>
                </div>
                <h3 className="text-[20px] md:text-[36px] font-bold mb-6 md:mb-8 leading-tight inline-block border-b-4 border-gold-500 pb-2 text-white drop-shadow-2xl">
                  為什麼Soya老師是市場最強的老師？
                </h3>
                <ul className="space-y-3 md:space-y-5 text-white drop-shadow-lg">
                  {[
                    "保證每日覆盤永遠保持最佳狀態",
                    "保證收穫滿意自主學習同儕互助",
                    "全台唯一退款期間內保證退費機制",
                    "保證課後指導群內師資熱心解析"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 md:gap-4">
                      <CheckCircle2 className="w-5 h-5 md:w-7 md:h-7 text-gold-400 flex-shrink-0" />
                      <span className="text-[15px] md:text-xl font-bold tracking-wide">{text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* New Brown Section with 2 Images */}
      <section className="pt-2 pb-5 md:py-5 bg-[#4E342E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://i.imgur.com/vBUy21I.jpeg" 
                alt="實戰見證 1" 
                className="w-full h-auto hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://i.imgur.com/o0NXeDF.jpeg" 
                alt="實戰見證 2" 
                className="w-full h-auto hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Courses />
      <MediaReports />

      


      <Footer />
    </div>
  );
}
