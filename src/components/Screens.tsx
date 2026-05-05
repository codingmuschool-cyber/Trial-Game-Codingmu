import { motion } from 'motion/react';
import { Play, Rocket, Instagram, MessageCircle, Globe, Code2, Zap } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-lg shadow-blue-500/30 mb-4">
          <Code2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Anagata Adventure
        </h1>
        <p className="text-lg text-slate-400 font-medium max-w-xs mx-auto">
          Main sebentar, lanjut bikin game sendiri! 🚀
        </p>
      </motion.div>

      <div className="flex flex-col w-full max-w-xs space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative flex items-center justify-center w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-blue-600/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Play className="w-6 h-6 mr-2 fill-current" />
          Mulai Main
        </motion.button>

        <motion.a
          href="https://anagataacademy.com/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold text-lg transition-all border border-slate-700"
        >
          <Globe className="w-5 h-5 mr-2" />
          Gabung Kelas
        </motion.a>
      </div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center space-x-2 text-slate-500 text-sm font-medium"
      >
        <Zap className="w-4 h-4 text-orange-400" />
        <span>Belajar coding jadi seru & mudah!</span>
      </motion.div>
    </div>
  );
}

interface EndScreenProps {
  score: number;
  onRestart: () => void;
}

export function EndScreen({ score, onRestart }: EndScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-8 bg-slate-900/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-500 rounded-full shadow-2xl shadow-orange-500/40 mb-2">
          <Rocket className="w-14 h-14 text-white animate-bounce" />
        </div>
        <h2 className="text-4xl font-black text-white">Trial Selesai!</h2>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-1">Skor Kamu</p>
          <p className="text-5xl font-black text-orange-400">{score}</p>
        </div>
        <p className="text-lg text-slate-300 max-w-xs mx-auto leading-relaxed">
          Seru kan? Kamu baru coba sedikit... <br/>
          <span className="text-blue-400 font-bold">Di Anagata Academy kamu bisa bikin game seperti ini sendiri!</span>
        </p>
      </motion.div>

      <div className="flex flex-col w-full max-w-xs space-y-3">
        <motion.a
          href="https://wa.me/6285111217896?text=Halo%20Anagata%20Academy,%20saya%20tertarik%20gabung%20kelas%20coding!"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-full py-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-blue-500/50 overflow-hidden animate-glow"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">Gabung Kelas Sekarang</span>
        </motion.a>

        <button
          onClick={onRestart}
          className="w-full py-3 text-slate-400 hover:text-white font-bold transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <div className="pt-4 space-y-4">
        <div className="flex justify-center space-x-6">
          <a href="https://www.instagram.com/coding_mu/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
            <Instagram className="w-6 h-6 text-pink-500" />
          </a>
          <a href="https://wa.me/6285111217896" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
            <MessageCircle className="w-6 h-6 text-green-500" />
          </a>
          <a href="https://anagataacademy.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
            <Globe className="w-6 h-6 text-blue-400" />
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-[10px] uppercase tracking-tighter font-bold text-slate-600">
          <span className="px-2 py-1 bg-slate-800 rounded-md">Belajar dari nol</span>
          <span className="px-2 py-1 bg-slate-800 rounded-md">Bikin game sendiri</span>
          <span className="px-2 py-1 bg-slate-800 rounded-md">Ikut lomba</span>
        </div>
      </div>
    </div>
  );
}
