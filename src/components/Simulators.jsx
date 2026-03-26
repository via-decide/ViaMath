import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, ChevronRight, LayoutDashboard, BookOpen, 
  FileText, Trophy, Settings, Clock, CheckCircle2, AlertCircle,
  GraduationCap, Gamepad2, FlaskConical, ArrowLeft, Beaker,
  Pickaxe, Wind, Droplets, Atom, Zap, Activity, Timer, Database
} from 'lucide-react';

// --- Shadow Method Simulator (Thales) ---
export const ShadowSim = () => {
  const [sunAngle, setSunAngle] = useState(45);
  const [stickHeight, setStickHeight] = useState(4);
  const [targetHeight, setTargetHeight] = useState(15);
  
  const stickShadow = stickHeight / Math.tan((sunAngle * Math.PI) / 180);
  const targetShadow = targetHeight / Math.tan((sunAngle * Math.PI) / 180);

  return (
    <div className="w-full max-w-lg bg-slate-900 p-6 rounded-[2.5rem] border border-white/5 space-y-8 glass-dark">
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-3xl border border-white/5">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Sun Angle</p>
          <p className="text-xl font-mono font-black text-amber-500">{sunAngle}°</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Stick Shadow</p>
          <p className="text-xl font-mono font-black text-cyan-400">{stickShadow.toFixed(1)}m</p>
        </div>
      </div>

      <div className="relative h-48 bg-black/60 rounded-3xl border border-white/5 overflow-hidden flex items-end px-12 pb-2">
        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
        
        {/* Pyramid (Target) */}
        <div 
          className="relative bg-amber-500/10 border-2 border-amber-500/40" 
          style={{ width: '100px', height: `${targetHeight * 4}px`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
        
        {/* Stick */}
        <div className="ml-24 w-1 bg-cyan-400" style={{ height: `${stickHeight * 10}px` }} />
        
        {/* Sun (Visual Indicator) */}
        <motion.div 
            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-8 right-12 w-8 h-8 rounded-full bg-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.5)]" 
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Adjust Sun Position</label>
            <span className="text-emerald-400 font-mono font-bold text-xs">{sunAngle}°</span>
          </div>
          <input 
            type="range" 
            min="20" max="80" step="1" 
            value={sunAngle} 
            onChange={e => setSunAngle(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        <button className="w-full py-4 bg-white text-black font-black rounded-2xl text-xs uppercase tracking-[0.2em] transform active:scale-95 transition-all">
          Calculate Hₚ₁ Height
        </button>
      </div>
    </div>
  );
};

// --- Hypotenuse Simulator (Pythagoras) ---
export const HypotenuseSim = () => {
    const [a, setA] = useState(3);
    const [b, setB] = useState(4);
    const c = Math.sqrt(a*a + b*b);

    return (
        <div className="w-full max-w-lg bg-slate-900 p-6 rounded-[2.5rem] border border-white/5 space-y-8 glass-dark">
            <div className="flex justify-between items-center bg-black/40 p-4 rounded-3xl border border-white/5">
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Base (b)</p>
                    <p className="text-xl font-mono font-black text-emerald-400">{b}m</p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Height (a)</p>
                    <p className="text-xl font-mono font-black text-rose-400">{a}m</p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Hypotenuse</p>
                    <p className="text-xl font-mono font-black text-amber-500">{c.toFixed(2)}m</p>
                </div>
            </div>

            <div className="relative h-56 bg-black/60 rounded-3xl border border-white/5 flex items-center justify-center p-8">
                <svg width="100%" height="100%" viewBox="0 0 200 200" className="overflow-visible">
                    <motion.path 
                        d={`M 50,150 L ${50 + b*20},150 L 50,${150 - a*20} Z`}
                        fill="rgba(255,255,255,0.05)"
                        stroke="white"
                        strokeWidth="2"
                    />
                    <text x={50 + b*10} y="170" fill="gray" fontSize="10" textAnchor="middle">{b}m</text>
                    <text x="30" y={150 - a*10} fill="gray" fontSize="10" textAnchor="middle">{a}m</text>
                </svg>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Base (b)</label>
                    <input type="range" min="1" max="8" value={b} onChange={e => setB(parseInt(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Height (a)</label>
                    <input type="range" min="1" max="8" value={a} onChange={e => setA(parseInt(e.target.value))} className="w-full accent-rose-500" />
                </div>
            </div>
        </div>
    );
};

// --- Lever Simulator (Archimedes) ---
export const LeverSim = () => {
  const [effort, setEffort] = useState(1);
  const [length, setLength] = useState(5);
  const fulcrumPos = 1; // Fixed fulcrum
  const totalWeight = effort * (length / fulcrumPos);

  return (
    <div className="w-full max-w-lg bg-slate-900 p-6 rounded-[2.5rem] border border-white/5 space-y-8 glass-dark">
      <div className="flex justify-between items-center bg-black/40 p-4 rounded-3xl border border-white/5">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Human Force</p>
          <p className="text-xl font-mono font-black text-cyan-400">{effort}N</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Lever Length</p>
          <p className="text-xl font-mono font-black text-amber-500">{length}m</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Weight Liftable</p>
          <p className="text-xl font-mono font-black text-emerald-400">{totalWeight.toFixed(1)}N</p>
        </div>
      </div>

      <div className="relative h-48 bg-black/60 rounded-3xl border border-white/5 flex items-center justify-center pt-12">
        <div className="relative w-full px-12 h-2 flex items-center">
            {/* Fulcrum */}
            <div className="absolute left-[30%] bottom-[-10px] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-rose-500" />
            
            {/* Beam */}
            <motion.div 
               animate={{ rotate: -2 }}
               className="w-full h-2 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full origin-[30%]"
            />
            
            {/* Human at end */}
            <div className="absolute right-12 top-0 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-cyan-400" />
                <div className="w-1 h-8 bg-cyan-400" />
            </div>

            {/* Earth at short end */}
            <div className="absolute left-10 bottom-[20px] w-12 h-12 rounded-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.5)]" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Adjust Lever Length</label>
            <span className="text-amber-500 font-mono font-bold text-xs">{length}m</span>
          </div>
          <input 
            type="range" 
            min="2" max="10" step="0.5" 
            value={length} 
            onChange={e => setLength(parseFloat(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
      </div>
    </div>
  );
};
