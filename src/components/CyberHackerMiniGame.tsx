import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy, Zap, Terminal, ShieldAlert, Sparkles, Check, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface CyberHackerMiniGameProps {
  onClose: () => void;
  onApplyPromoCode: (code: string) => void;
}

export const CyberHackerMiniGame: React.FC<CyberHackerMiniGameProps> = ({
  onClose,
  onApplyPromoCode
}) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won' | 'lost'>('intro');
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Level 1: Timing Bar (Stop the slider in the golden zone)
  const [sliderPos, setSliderPos] = useState(0);
  const [sliderDir, setSliderDir] = useState<1 | -1>(1);
  const [targetZone, setTargetZone] = useState({ start: 40, end: 60 });
  const [targetHits, setTargetHits] = useState(0);

  // Level 2: Memory Cyber Key Sequence
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activePad, setActivePad] = useState<number | null>(null);

  // Level 3: Frequency Decryption (Match target number using + / - cyber dials)
  const [currentFreq, setCurrentFreq] = useState(50);
  const [targetFreq, setTargetFreq] = useState(77);
  const [decryptTimeLeft, setDecryptTimeLeft] = useState(15);

  const [rewardCode, setRewardCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Web Audio Synthesizer for retro cyber sound effects
  const playCyberSound = (type: 'beep' | 'success' | 'win' | 'fail' | 'hit') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'beep') {
        osc.frequency.setValueAtTime(580, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'hit') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1040, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'win') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      }
    } catch {
      // AudioContext not available or blocked
    }
  };

  // Start game
  const handleStartGame = () => {
    setLevel(1);
    setScore(0);
    setTargetHits(0);
    setGameState('playing');
    setTargetZone({ start: 35, end: 65 });
    playCyberSound('beep');
  };

  // Level 1 Animation Loop
  useEffect(() => {
    if (gameState !== 'playing' || level !== 1) return;
    const interval = setInterval(() => {
      setSliderPos(pos => {
        let next = pos + sliderDir * 2.5;
        if (next >= 100) {
          setSliderDir(-1);
          return 100;
        }
        if (next <= 0) {
          setSliderDir(1);
          return 0;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [gameState, level, sliderDir]);

  // Click handler for Level 1 (Timing Hit)
  const handleTimingClick = () => {
    if (sliderPos >= targetZone.start && sliderPos <= targetZone.end) {
      playCyberSound('hit');
      const newHits = targetHits + 1;
      setTargetHits(newHits);
      setScore(s => s + 250);

      if (newHits >= 3) {
        // Proceed to Level 2
        playCyberSound('success');
        setLevel(2);
        startLevel2();
      } else {
        // Narrow the zone slightly
        setTargetZone({
          start: Math.min(45, targetZone.start + 5),
          end: Math.max(55, targetZone.end - 5)
        });
      }
    } else {
      playCyberSound('fail');
      setScore(s => Math.max(0, s - 50));
    }
  };

  // Level 2: Start sequence memory
  const startLevel2 = () => {
    const newSeq = [
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4),
      Math.floor(Math.random() * 4)
    ];
    setSequence(newSeq);
    setPlayerSequence([]);
    setIsShowingSequence(true);

    // Playback sequence
    newSeq.forEach((padIdx, i) => {
      setTimeout(() => {
        setActivePad(padIdx);
        playCyberSound('beep');
        setTimeout(() => setActivePad(null), 300);
      }, (i + 1) * 600);
    });

    setTimeout(() => {
      setIsShowingSequence(false);
    }, (newSeq.length + 1) * 600);
  };

  const handlePadClick = (padIdx: number) => {
    if (isShowingSequence) return;
    playCyberSound('beep');
    setActivePad(padIdx);
    setTimeout(() => setActivePad(null), 150);

    const nextPlayerSeq = [...playerSequence, padIdx];
    setPlayerSequence(nextPlayerSeq);

    const step = nextPlayerSeq.length - 1;
    if (nextPlayerSeq[step] !== sequence[step]) {
      // Mistake, restart level 2
      playCyberSound('fail');
      setTimeout(() => startLevel2(), 600);
      return;
    }

    if (nextPlayerSeq.length === sequence.length) {
      // Level 2 passed! Proceed to Level 3
      playCyberSound('success');
      setScore(s => s + 500);
      setLevel(3);
      startLevel3();
    }
  };

  // Level 3: Frequency Dial Alignment
  const startLevel3 = () => {
    const target = Math.floor(60 + Math.random() * 30);
    setTargetFreq(target);
    setCurrentFreq(30);
    setDecryptTimeLeft(15);
  };

  useEffect(() => {
    if (gameState !== 'playing' || level !== 3) return;
    const timer = setInterval(() => {
      setDecryptTimeLeft(t => {
        if (t <= 1) {
          playCyberSound('fail');
          setGameState('lost');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, level]);

  const adjustFreq = (delta: number) => {
    playCyberSound('beep');
    const next = Math.max(0, Math.min(100, currentFreq + delta));
    setCurrentFreq(next);

    if (next === targetFreq) {
      // VICTORY!
      playCyberSound('win');
      setScore(s => s + 750);
      const code = 'HACKER15';
      setRewardCode(code);
      setGameState('won');
    }
  };

  const handleApplyReward = () => {
    if (rewardCode) {
      onApplyPromoCode(rewardCode);
      setCopiedCode(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-xl bg-neutral-950 border-2 border-amber-500/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.25)] text-neutral-100 flex flex-col font-mono"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Cyber Bar */}
        <div className="px-5 py-3.5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Terminal: DENUVO BYPASS V2.6
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1 rounded text-neutral-400 hover:text-white"
              title={soundEnabled ? 'Выключить звук' : 'Включить звук'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-neutral-600" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6">
          
          {/* INTRO SCREEN */}
          {gameState === 'intro' && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Terminal className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">
                  Взлом Denuvo: Кибер-Хакер
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed max-w-sm mx-auto font-sans">
                  Пройдите 3 этапа взлома защиты офлайн-лицензии и выиграйте <strong className="text-amber-400">секретный промокод на скидку 15%</strong> на любую игру!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-300 space-y-1 text-left max-w-sm mx-auto font-sans">
                <div>⚡ <strong>Этап 1:</strong> Синхронизация импульса (Поймайте бегунок в зоне)</div>
                <div>⚡ <strong>Этап 2:</strong> Запоминание кода защиты Steam Guard</div>
                <div>⚡ <strong>Этап 3:</strong> Калибровка частоты обхода Denuvo</div>
              </div>

              <button
                onClick={handleStartGame}
                className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-sm shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all flex items-center gap-2 mx-auto cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-neutral-950" />
                <span>НАЧАТЬ ВЗЛОМ</span>
              </button>
            </div>
          )}

          {/* PLAYING SCREEN */}
          {gameState === 'playing' && (
            <div className="space-y-6">
              {/* Header metrics */}
              <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-3">
                <span className="text-amber-400 font-bold">ЭТАП {level} ИЗ 3</span>
                <span className="text-neutral-400">СЧЕТ: <strong className="text-white tabular-nums">{score} PTS</strong></span>
              </div>

              {/* LEVEL 1: Timing slider */}
              {level === 1 && (
                <div className="space-y-6 py-2 text-center">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase">
                      Этап 1: Синхронизация импульса ({targetHits}/3)
                    </h4>
                    <p className="text-xs text-neutral-400 font-sans">
                      Нажмите кнопку «ПЕРЕХВАТ», когда бегунок находится в зеленой зоне!
                    </p>
                  </div>

                  {/* Timing track */}
                  <div className="relative h-12 rounded-xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-inner flex items-center">
                    {/* Target zone */}
                    <div
                      className="absolute top-0 bottom-0 bg-emerald-500/30 border-x border-emerald-400"
                      style={{
                        left: `${targetZone.start}%`,
                        width: `${targetZone.end - targetZone.start}%`
                      }}
                    />

                    {/* Scanning needle */}
                    <div
                      className="absolute top-0 bottom-0 w-2 bg-amber-400 shadow-[0_0_12px_#fbbf24]"
                      style={{ left: `${sliderPos}%` }}
                    />
                  </div>

                  <button
                    onClick={handleTimingClick}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black rounded-xl text-base shadow-[0_0_25px_rgba(245,158,11,0.35)] active:scale-98 transition-all cursor-pointer"
                  >
                    ⚡ ПЕРЕХВАТИТЬ СИГНАЛ
                  </button>
                </div>
              )}

              {/* LEVEL 2: Sequence memory */}
              {level === 2 && (
                <div className="space-y-5 py-2 text-center">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase">
                      Этап 2: Дешифровка ключа Steam Guard
                    </h4>
                    <p className="text-xs text-neutral-400 font-sans">
                      {isShowingSequence ? 'Запоминайте подсвеченные узлы...' : 'Повторите последовательность узлов!'}
                    </p>
                  </div>

                  {/* 4 Cyber Nodes */}
                  <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                    {[0, 1, 2, 3].map(padIdx => {
                      const isActive = activePad === padIdx;
                      return (
                        <button
                          key={padIdx}
                          disabled={isShowingSequence}
                          onClick={() => handlePadClick(padIdx)}
                          className={`h-24 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center font-black text-xl ${
                            isActive
                              ? 'bg-amber-400 border-amber-300 text-neutral-950 shadow-[0_0_30px_#fbbf24] scale-95'
                              : 'bg-neutral-900/90 border-neutral-800 text-neutral-400 hover:border-amber-400/50'
                          }`}
                        >
                          NODE #{padIdx + 1}
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-[11px] text-neutral-500">
                    Введено: {playerSequence.length} из {sequence.length}
                  </div>
                </div>
              )}

              {/* LEVEL 3: Frequency Tuning */}
              {level === 3 && (
                <div className="space-y-5 py-2 text-center">
                  <div className="flex items-center justify-between text-xs px-2">
                    <span className="text-rose-400 font-bold">ТАЙМЕР: {decryptTimeLeft} СЕК</span>
                    <span className="text-amber-400 font-bold">ЦЕЛЬ: {targetFreq} MHz</span>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Текущая частота обхода</span>
                    <div className="text-4xl font-black text-white tabular-nums">
                      {currentFreq} <span className="text-sm text-neutral-500 font-normal">MHz</span>
                    </div>
                  </div>

                  {/* Frequency Dials */}
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => adjustFreq(-10)}
                      className="py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-amber-400 font-bold text-sm cursor-pointer"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => adjustFreq(-1)}
                      className="py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-amber-400 font-bold text-sm cursor-pointer"
                    >
                      -1
                    </button>
                    <button
                      onClick={() => adjustFreq(+1)}
                      className="py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-amber-400 font-bold text-sm cursor-pointer"
                    >
                      +1
                    </button>
                    <button
                      onClick={() => adjustFreq(+10)}
                      className="py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-400 text-amber-400 font-bold text-sm cursor-pointer"
                    >
                      +10
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WON SCREEN */}
          {gameState === 'won' && (
            <div className="text-center space-y-5 py-3">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white uppercase tracking-wider">
                  ЗАЩИТА УСПЕШНО ВЗЛОМАНА!
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Вы набрали <strong className="text-emerald-400">{score} очков</strong>. Ваш эксклюзивный промокод:
                </p>
              </div>

              {/* Promo code box */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-amber-400/50 shadow-inner flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase block">Промокод на скидку 15%</span>
                  <span className="text-2xl font-black text-amber-400 tracking-widest">{rewardCode}</span>
                </div>
                <button
                  onClick={handleApplyReward}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-950" /> : <Sparkles className="w-4 h-4" />}
                  <span>{copiedCode ? 'Применен!' : 'Применить к покупке'}</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-white underline cursor-pointer"
              >
                Вернуться к выбору игр
              </button>
            </div>
          )}

          {/* LOST SCREEN */}
          {gameState === 'lost' && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mx-auto text-rose-400">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">
                СИСТЕМА БЕЗОПАСНОСТИ ЗАБЛОКИРОВАЛА СЕССИЮ
              </h3>
              <p className="text-xs text-neutral-400 font-sans max-w-xs mx-auto">
                Время вышло или сигнал был прерван. Попробуйте снова, чтобы заработать промокод!
              </p>
              <button
                onClick={handleStartGame}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ПОПРОБОВАТЬ СНОВА</span>
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
