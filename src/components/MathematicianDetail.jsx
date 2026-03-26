import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, Sparkles, ChevronRight } from 'lucide-react';
import p5 from 'p5';
import { ShadowSim, HypotenuseSim, LeverSim } from './Simulators';

// ---------------------------------------------------------------
// Fully DATA-DRIVEN: All content comes from `mathematician.acts`
// To add a new character, just add their data to history.js
// NO code changes needed here.
// ---------------------------------------------------------------

// Generic p5.js background — driven by character accent color only
const useP5Background = (canvasRef, accent) => {
  useEffect(() => {
    const sketch = (p) => {
      let time = 0;
      let pts = [];

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current);
        p.frameRate(30);
        for (let i = 0; i < 50; i++) {
          pts.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.3, 0.3),
            vy: p.random(-0.3, 0.3),
            r: p.random(1, 3),
          });
        }
      };

      p.draw = () => {
        p.background(5, 5, 8, 40);
        time += 0.01;

        // Subtle grid
        p.stroke(255, 5);
        p.strokeWeight(1);
        for (let i = 0; i < p.width; i += 80) p.line(i, 0, i, p.height);
        for (let j = 0; j < p.height; j += 80) p.line(0, j, p.width, j);

        // Accent glow center
        const hex = accent || '#ffffff';
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // Breathing geometric shape (works for ANY character)
        p.push();
        p.translate(p.width / 2, p.height * 0.38);
        p.noFill();
        p.strokeWeight(1);

        for (let ring = 1; ring <= 3; ring++) {
          const alpha = 20 - ring * 5;
          p.stroke(r, g, b, alpha);
          const radius = 60 + ring * 40 + p.sin(time + ring) * 15;
          const sides = 3 + ring;
          p.beginShape();
          for (let i = 0; i < sides; i++) {
            const a = (p.TWO_PI * i / sides) - p.HALF_PI + time * 0.1;
            p.vertex(p.cos(a) * radius, p.sin(a) * radius);
          }
          p.endShape(p.CLOSE);
        }
        p.pop();

        // Particle field
        pts.forEach(pt => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0) pt.x = p.width;
          if (pt.x > p.width) pt.x = 0;
          if (pt.y < 0) pt.y = p.height;
          if (pt.y > p.height) pt.y = 0;
          p.noStroke();
          p.fill(r, g, b, 40);
          p.circle(pt.x, pt.y, pt.r * 2);
        });
      };

      p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    const instance = new p5(sketch);
    return () => instance.remove();
  }, [accent]);
};

// Simulator renderer — purely looks up simulatorId, no per-character code
const SimulatorView = ({ simulatorId }) => {
  const map = {
    'shadow-sim': <ShadowSim />,
    'hypotenuse-sim': <HypotenuseSim />,
    'lever-sim': <LeverSim />,
  };
  return map[simulatorId] || (
    <div className="p-12 text-center text-white/20 font-black uppercase tracking-widest bg-white/5 rounded-[2.5rem]">
      Simulator Coming Soon
    </div>
  );
};

const MathematicianDetail = ({ mathematician, onClose }) => {
  const [actIndex, setActIndex] = useState(0);
  const [viewMode, setViewMode] = useState('narrative');
  const canvasRef = useRef(null);

  useP5Background(canvasRef, mathematician.accent);

  const currentAct = mathematician.acts[actIndex];
  const isLastAct = actIndex === mathematician.acts.length - 1;
  const totalActs = mathematician.acts.length;

  const goNext = () => {
    if (!isLastAct) setActIndex(i => i + 1);
    else onClose();
  };

  const goBack = (e) => {
    e.stopPropagation();
    if (actIndex > 0) setActIndex(i => i - 1);
    else onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#050508] z-50 flex flex-col font-sans overflow-hidden"
    >
      {/* p5 Background */}
      <div
        ref={canvasRef}
        className="absolute inset-0 z-0 select-none"
        onClick={goNext}
      />

      {/* Top Navigation Bar */}
      <div className="relative z-10 p-6 pt-12 flex justify-between items-start pointer-events-none">
        <button
          onClick={goBack}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white/60 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-end gap-2">
          {/* Act progress dots */}
          <div className="flex gap-1.5">
            {mathematician.acts.map((_, idx) => (
              <div
                key={idx}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: idx === actIndex ? 24 : 8,
                  backgroundColor: idx <= actIndex ? mathematician.accent : 'rgba(255,255,255,0.1)',
                }}
              />
            ))}
          </div>
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] opacity-60">
            {mathematician.name}
          </h2>
          <span
            className="text-[10px] px-3 py-0.5 rounded-full font-black uppercase tracking-widest border"
            style={{ color: mathematician.accent, borderColor: mathematician.accent + '44' }}
          >
            Act {actIndex + 1} / {totalActs}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-end p-8 pb-36 pointer-events-none">
        <AnimatePresence mode="wait">
          {viewMode === 'narrative' ? (
            <motion.div
              key={actIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="max-w-md w-full"
            >
              {/* Act label */}
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} style={{ color: mathematician.accent }} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                  {currentAct.sub}
                </span>
              </div>

              {/* Act Title */}
              <h1 className="text-4xl font-black text-white mb-4 leading-none tracking-tight italic uppercase">
                {currentAct.title}
              </h1>

              {/* Description */}
              <p className="text-base font-medium text-white/60 leading-relaxed mb-6">
                {currentAct.desc}
              </p>

              {/* Historical Insight */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 flex items-start gap-3 mb-6">
                <div
                  className="p-2 rounded-xl bg-white/5 flex-shrink-0"
                  style={{ color: mathematician.accent }}
                >
                  <Lightbulb size={16} />
                </div>
                <div>
                  <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30 mb-1">
                    Historical Insight
                  </h5>
                  <p className="text-sm font-bold text-white/80 italic leading-snug">
                    "{currentAct.insight}"
                  </p>
                </div>
              </div>

              {/* Next Act CTA */}
              <button
                onClick={goNext}
                className="pointer-events-auto w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                style={{ backgroundColor: mathematician.accent, color: '#000' }}
              >
                {isLastAct ? 'Complete' : `Next: ${mathematician.acts[actIndex + 1]?.title}`}
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md w-full pointer-events-auto"
            >
              <SimulatorView simulatorId={mathematician.simulatorId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Mode Switch */}
      <div className="fixed bottom-10 left-0 right-0 px-8 z-20">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setViewMode('narrative'); }}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'narrative'
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/40 border border-white/10'
            }`}
          >
            Saga
          </button>
          {mathematician.simulatorId && (
            <button
              onClick={(e) => { e.stopPropagation(); setViewMode('simulator'); }}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === 'simulator'
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/40 border border-white/10'
              }`}
            >
              Simulate
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MathematicianDetail;
