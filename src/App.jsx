import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  Compass, 
  BookOpen, 
  Library, 
  Settings, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  Zap,
  MoreVertical,
  Trophy,
  Activity,
  User,
  Send,
  X,
  Play,
  Loader2
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MATHEMATICIANS, SPECIAL_MISSIONS } from './data/history';
import MathematicianDetail from './components/MathematicianDetail';

// --- API Helpers ---
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const getCharacterResponse = async (character, history, message) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const personality = `You are ${character.fullName}. ${character.tagline}. You are living in the year 2026 but you retain your historical knowledge and persona. ${character.description}. Speak in the first person. Be brief, bold, and slightly mysterious, fitting the GTA 6 game aesthetics of the app. Never admit to being an AI.`;
    
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: personality }] },
        { role: "model", parts: [{ text: `I am ${character.name}. I understand my legacy.` }] },
        ...history.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }))
      ],
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
};

// --- Components ---

const ChatDrawer = ({ character, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (character && isOpen) {
       setMessages([{ role: 'ai', content: `Greetings. I am ${character?.name}. My legacy is one of numbers and logic. What puzzles shall we solve today?` }]);
    }
  }, [character?.id, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
        const responseText = await getCharacterResponse(character, messages, input);
        setMessages(prev => [...prev, { role: 'ai', content: responseText }]);
    } catch (e) {
        setMessages(prev => [...prev, { role: 'ai', content: "My thoughts are clouded by the turbulence of the current age. Ask again." }]);
    } finally {
        setLoading(false);
    }
  };

  if (!character) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[80vh] bg-[#0A0A0A] border-t border-white/10 rounded-t-[3rem] z-[70] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl p-[2px]" style={{background: `linear-gradient(45deg, ${character.accent}, transparent)`}}>
                        <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center text-xl font-black">
                            {character.name[0]}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white">{character.name}</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">{character.title}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-3 bg-white/5 rounded-2xl text-white/40"><X size={20}/></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col">
                {messages.map((m, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        key={i} 
                        className={`max-w-[85%] p-5 rounded-3xl ${m.role === 'user' ? 'self-end bg-white text-black font-extrabold shadow-xl' : 'self-start bg-white/5 text-white/80 border border-white/10'}`}
                    >
                        <p className="text-sm leading-relaxed">{m.content}</p>
                    </motion.div>
                ))}
                {loading && (
                    <div className="flex gap-2 p-4 text-white/30 animate-pulse">
                        <Loader2 className="animate-spin" size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-[16px]">Thinking...</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-8 pt-0">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-2 flex items-center gap-2">
                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        type="text" 
                        placeholder={`Message ${character.name}...`}
                        className="flex-1 bg-transparent px-6 py-4 text-sm font-bold text-white outline-none placeholder:text-white/20"
                    />
                    <button onClick={handleSend} className="p-4 bg-white text-black rounded-2xl"><Send size={18} strokeWidth={3} /></button>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CharacterFeed = ({ onSelect, onChat }) => {
    const [focusedId, setFocusedId] = useState(null);

    return (
        <div className="h-[calc(100vh-72px)] overflow-y-scroll snap-y snap-mandatory bg-[#020205]">
            {MATHEMATICIANS.map((m) => (
                <div 
                    key={m.id} 
                    className="h-full w-full snap-start relative overflow-hidden flex flex-col justify-end p-8"
                    onMouseEnter={() => setFocusedId(m.id)}
                >
                    {/* Background Visual (Busy 'Work' state) */}
                    <div className="absolute inset-0 z-0">
                        <div 
                          className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-1000" 
                          style={{ 
                            background: `radial-gradient(circle at 70% 30%, ${m.accent}33, transparent 70%), linear-gradient(to bottom, #0000 0%, #000 100%)` 
                          }} 
                        />
                        {/* Giant background text representing their work */}
                        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-black text-white/[0.01] select-none pointer-events-none tracking-tighter mix-blend-overlay">
                            {m.name[0]}
                        </div>
                    </div>

                    {/* Character Card UI (Premium / Game Selection) */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative z-10 space-y-10 max-w-sm"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-[2px] rounded-full" style={{backgroundColor: m.accent}} />
                                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/30">Met In History</span>
                            </div>
                            
                            <h2 className="text-8xl font-black text-white leading-[0.8] tracking-tighter mb-6 italic uppercase mix-blend-plus-lighter">
                                {m.name}
                            </h2>
                            <p className="text-sm font-black uppercase tracking-[0.3em] mb-6 inline-block px-4 py-1 rounded-full border border-white/10 glass shadow-2xl" style={{color: m.accent}}>
                                {m.title}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Choose Action</p>
                            
                            {/* Option 1: Know about me */}
                            <motion.button 
                                whileHover={{ x: 10, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSelect(m)}
                                className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:text-black transition-all duration-500"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-black/10 transition-colors">
                                        <BookOpen size={20} />
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-widest">Know About Me</span>
                                </div>
                                <ArrowRight size={20} className="opacity-20 group-hover:opacity-100" />
                            </motion.button>

                            {/* Option 2: Talk (Call them) */}
                            <motion.button 
                                whileHover={{ x: 10, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onChat(m)}
                                className="w-full p-6 bg-white/5 border border-white/10 rounded-[2rem] flex items-center justify-between group hover:bg-white hover:text-black transition-all duration-500"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-black/10 transition-colors">
                                        <Zap size={20} />
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-widest">Talk / Call</span>
                                </div>
                                <ArrowRight size={20} className="opacity-20 group-hover:opacity-100" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

const BottomNav = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'feed', icon: Zap, label: 'Legends' },
        { id: 'lore', icon: BookOpen, label: 'Vault' },
        { id: 'settings', icon: User, label: 'Profile' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-18 bg-black/90 backdrop-blur-2xl border-t border-white/5 px-8 flex items-center justify-between z-50">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-white/20 hover:text-white/40'}`}
                    >
                        <Icon size={22} strokeWidth={isActive ? 3 : 2} />
                        <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedMathematician, setSelectedMathematician] = useState(null);
  const [chatCharacter, setChatCharacter] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <AnimatePresence mode="wait">
        {selectedMathematician ? (
          <MathematicianDetail 
            key="detail"
            mathematician={selectedMathematician}
            onClose={() => setSelectedMathematician(null)}
          />
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col"
          >
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 h-18 px-8 flex justify-between items-center z-40">
                <h1 className="text-xl font-black italic uppercase tracking-tighter">ViaMath</h1>
                <div className="flex gap-4">
                    <button className="p-3 bg-white/5 rounded-2xl"><Trophy size={18} /></button>
                    <button className="p-3 bg-white/5 rounded-2xl"><MoreVertical size={18} /></button>
                </div>
            </header>

            <main className="flex-1">
              {activeTab === 'feed' && (
                <CharacterFeed 
                    onSelect={setSelectedMathematician} 
                    onChat={setChatCharacter} 
                />
              )}
              {activeTab === 'lore' && (
                <div className="p-8 pt-24 space-y-8">
                     <h2 className="text-4xl font-black uppercase italic tracking-tighter">The Vault</h2>
                     {SPECIAL_MISSIONS.map(m => (
                         <div key={m.id} className="p-8 rounded-[3rem] bg-gradient-to-br from-amber-600 to-amber-900 border border-white/20 shadow-2xl relative overflow-hidden group">
                            <Sparkles className="text-white/60 mb-4" size={32} />
                            <h3 className="text-3xl font-black text-white mb-2 leading-none uppercase italic">{m.name}</h3>
                            <button className="mt-6 px-6 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest shadow-xl transform group-hover:translate-x-2 transition-all">Enter</button>
                         </div>
                     ))}
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="p-8 pt-24 space-y-12">
                     <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black mb-4">DD</div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter">Dharam Daxini</h3>
                        <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">Master of Logic</p>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                            <Activity size={20} className="mb-2 text-emerald-400" />
                            <div className="text-2xl font-black tracking-tighter">420</div>
                            <div className="text-[10px] uppercase font-bold text-white/30">Total Meets</div>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5">
                            <Trophy size={20} className="mb-2 text-amber-500" />
                            <div className="text-2xl font-black tracking-tighter">13</div>
                            <div className="text-[10px] uppercase font-bold text-white/30">Relics Collected</div>
                        </div>
                     </div>
                </div>
              )}
            </main>

            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </motion.div>
        )}
      </AnimatePresence>

      <ChatDrawer 
        character={chatCharacter} 
        isOpen={!!chatCharacter} 
        onClose={() => setChatCharacter(null)} 
      />
    </div>
  );
}
