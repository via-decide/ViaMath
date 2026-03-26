import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, BookOpen, Lightbulb, Play, Info, Layers } from 'lucide-react';
import p5 from 'p5';
import { ShadowSim, HypotenuseSim, LeverSim } from './Simulators';

// --- Discovery Engine Component ---
// This handles the multi-act narrative and interactive canvas

const MathematicianDetail = ({ mathematician, onClose }) => {
  const [actIndex, setActIndex] = useState(0);
  const [viewMode, setViewMode] = useState('narrative'); // 'narrative' or 'simulator' (if applicable)
  const canvasRef = useRef(null);
  const p5Instance = useRef(null);

  const currentAct = mathematician.acts[actIndex];
  const isLastAct = actIndex === mathematician.acts.length - 1;

  // --- Story Navigation ---
  const handleNext = () => {
    if (!isLastAct) {
      setActIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = (e) => {
    e.stopPropagation();
    if (actIndex > 0) {
      setActIndex(prev => prev - 1);
    } else {
      onClose();
    }
  };

  // --- p5.js Integration with Mathematician-specific Sketch ---
  useEffect(() => {
    const sketch = (p) => {
      let time = 0;
      let particles = [];

      p.setup = () => {
        const h = p.windowHeight < 600 ? p.windowHeight * 0.5 : p.windowHeight;
        const canvas = p.createCanvas(p.windowWidth, h);
        canvas.parent(canvasRef.current);
        p.frameRate(60);
        
        for (let i = 0; i < 40; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            c: p.color(mathematician.accent + '33')
          });
        }
      };

      p.draw = () => {
        p.background(5, 5, 8);
        time += 0.02;

        // Abstract Background Grid
        p.stroke(255, 6);
        p.strokeWeight(1);
        for (let i = 0; i < p.width; i += 100) p.line(i, 0, i, p.height);
        for (let j = 0; j < p.height; j += 100) p.line(0, j, p.width, j);

        // Ambience Particles
        particles.forEach(pt => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0) pt.x = p.width;
          if (pt.x > p.width) pt.x = 0;
          if (pt.y < 0) pt.y = p.height;
          if (pt.y > p.height) pt.y = 0;
          p.noStroke();
          p.fill(pt.c);
          p.circle(pt.x, pt.y, 2);
        });

        // --- Core Mathematical Visualization ---
        p.push();
        p.translate(p.width / 2, p.height / 2);
        
        // Let's use the core aesthetic from the user's p5 sketches
        if (mathematician.id === 'pythagoras') {
             drawPythagoras(p, time, actIndex);
        } else if (mathematician.id === 'thales') {
             drawThales(p, time, actIndex);
        } else {
             // Fallback geometric transition
             drawGeneric(p, time, actIndex);
        }
        p.pop();
      };

      const drawPythagoras = (p, t, act) => {
        p.stroke(mathematician.accent);
        p.strokeWeight(2);
        p.noFill();
        const r = 100 + p.sin(t) * 20;
        const sides = 3 + act;
        p.beginShape();
        for (let i = 0; i < sides; i++) {
          const a = (p.TWO_PI * i) / sides;
          p.vertex(p.cos(a) * r, p.sin(a) * r);
        }
        p.endShape(p.CLOSE);
      };

      const drawThales = (p, t, act) => {
        p.stroke(mathematician.accent);
        p.strokeWeight(2);
        p.noFill();
        p.circle(0, 0, 200);
        const angle = p.sin(t) * p.PI;
        p.line(p.cos(angle) * 100, p.sin(angle) * 100, p.cos(angle + p.PI) * 100, p.sin(angle + p.PI) * 100);
      };

      const drawGeneric = (p, t, act) => {
        p.noFill();
        p.stroke(mathematician.accent);
        p.rotate(t * 0.2);
        p.rect(-50, -50, 100, 100);
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    p5Instance.current = new p5(sketch);
    return () => p5Instance.current.remove();
  }, [mathematician.id, actIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#050508] z-50 flex flex-col font-sans overflow-hidden"
    >
      {/* Background Canvas (Interactive Layer) */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0 select-none"
        onClick={handleNext}
      />

      {/* Discovery Navigation (Overlay) */}
      <div className="relative z-10 p-6 pt-12 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto">
          <button 
            onClick={handleBack}
            className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white/60 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        
        <div className="flex flex-col items-end gap-2 text-right">
            <div className="flex gap-1 mb-2">
                {mathematician.acts.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`w-4 h-1 rounded-full transition-all duration-500 ${idx <= actIndex ? 'bg-white' : 'bg-white/10'}`}
                        style={idx <= actIndex ? { backgroundColor: mathematician.accent } : {}}
                    />
                ))}
            </div>
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] opacity-80">{mathematician.name}</h2>
          <p className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/40 font-bold uppercase tracking-wider">Act {actIndex + 1}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-end p-8 pb-32 pointer-events-none">
        <AnimatePresence mode="wait">
          {viewMode === 'narrative' ? (
            <motion.div 
              key={actIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md w-full"
            >
              <div className="bg-black/40 backdrop-blur-3xl border border-white/5 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden group pointer-events-auto">
                {/* Subtle inner glow */}
                <div 
                  className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-20 pointer-none"
                  style={{ backgroundColor: mathematician.accent }}
                />
                
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} style={{ color: mathematician.accent }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    {currentAct.sub}
                  </span>
                </div>
                
                <h1 className="text-3xl font-black text-white mb-3 leading-none tracking-tight">
                  {currentAct.title}
                </h1>
                
                <p className="text-base font-medium text-white/60 leading-relaxed mb-6">
                  {currentAct.desc}
                </p>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/5" style={{ color: mathematician.accent }}>
                    <Lightbulb size={16} />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-[0.1em] text-white/30 mb-1">Historical Insight</h5>
                    <p className="text-xs font-bold text-white/80 italic leading-tight">
                      "{currentAct.insight}"
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] animate-pulse">
                  Tap anywhere to advance
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="simulator"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md w-full pointer-events-auto"
            >
              {mathematician.simulatorId === 'shadow-sim' && <ShadowSim />}
              {mathematician.simulatorId === 'hypotenuse-sim' && <HypotenuseSim />}
              {mathematician.simulatorId === 'lever-sim' && <LeverSim />}
              {!mathematician.simulatorId && (
                <div className="p-12 text-center text-white/20 font-black uppercase tracking-widest bg-white/5 rounded-[2.5rem]">
                  Simulator Coming Soon
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Mode Switch (App-like feel) */}
      <div className="fixed bottom-10 left-0 right-0 px-8 z-20 pointer-events-none">
          <div className="flex items-center justify-center gap-2 pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setViewMode('narrative'); }}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'narrative' ? 'bg-white text-black' : 'bg-white/5 text-white/50 border border-white/10'}`}
              >
                Lore
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setViewMode('simulator'); }}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'simulator' ? 'bg-white text-black' : 'bg-white/5 text-white/50 border border-white/10'}`}
              >
                Simulate
              </button>
          </div>
      </div>
    </motion.div>
  );
};

export default MathematicianDetail;
