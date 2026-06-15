import React, { useState } from "react";
import { Mail, Shield, Sparkles, Send, Scroll, Wrench, X } from "lucide-react";

interface HireModalProps {
  onClose: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", proposal: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.proposal) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      let resData: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await response.json();
      } else {
        const text = await response.text();
        // Limit text length to prevent flooding UI with huge HTML error dumps
        resData = { error: text.slice(0, 150) || `HTTP error: ${response.status} ${response.statusText}` };
      }

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit proposal request.");
      }

      // Trigger Success state
      setSuccess(true);

      // Play joyful success chime cadence using Web Audio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(frequency, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      playTone(523.25, audioContext.currentTime, 0.1); // C
      playTone(587.33, audioContext.currentTime + 0.08, 0.1); // D
      playTone(659.25, audioContext.currentTime + 0.16, 0.1); // E
      playTone(783.99, audioContext.currentTime + 0.24, 0.3); // G
    } catch (err: any) {
      setError(err.message || "Failed to dispatch proposal redstone signal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Crafting Console Board */}
      <div
        className="w-full max-w-lg bg-stone border-4 border-on-surface text-white voxel-block flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          backgroundColor: "#424242",
        }}
      >
        {/* Title Board */}
        <div className="flex justify-between items-center bg-[#292929] p-4 border-b-4 border-on-surface">
          <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-yellow-400 capitalize">
            <Wrench className="w-4 h-4 animate-spin" />
            <span>Interactive Crafting Grid V1.1</span>
          </div>
          <button
            id="close-hire-modal"
            onClick={onClose}
            className="voxel-button bg-red-600 hover:bg-red-500 text-white p-1"
            style={{
              boxShadow: "rgba(255, 255, 255, 0.45) 2px 2px 0px inset, rgba(0, 0, 0, 0.6) -2px -2px 0px inset",
            }}
          >
            <X className="w-5 h-5 font-bold" />
          </button>
        </div>

        {/* Content body wrapper */}
        <div className="p-6 overflow-y-auto space-y-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              {/* Advancement Banner style */}
              <div
                className="voxel-block bg-[#212121] border-4 border-primary p-4 max-w-xs animate-bounce"
                style={{
                  boxShadow: "0 0 16px rgba(165, 247, 141, 0.35)",
                }}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center border border-on-surface">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div className="text-left font-mono">
                    <p className="text-[#a5f78d] text-[10px] font-bold uppercase select-none">Advancement Made!</p>
                    <p className="text-white text-sm font-bold uppercase truncate">Hired Voxel Chief!</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <p className="text-stone-300 uppercase leading-relaxed text-sm">
                  Contract dispatched! The redstone signal is traveling to Navneet successfully.
                </p>
                <p className="text-[#a5f78d]">We will be in contact shortly.</p>
              </div>

              <button
                id="btn-success-ok"
                onClick={onClose}
                className="voxel-button bg-stone px-6 py-2 uppercase text-xs font-bold w-full"
              >
                Return to World
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <p className="text-xs text-stone-300 uppercase leading-normal text-center mb-4">
                Deploy 3 input blocks inside the crafting slot to construct a direct hire request.
              </p>

              {/* Simulated Crafting Box Visual Overlay */}
              <div className="flex justify-center items-center gap-4 py-3 bg-[#1e1e1e] border-4 border-b-[#c6c6c6] border-r-[#c6c6c6] border-t-black border-l-black p-3 mb-4">
                <div className="grid grid-cols-2 gap-1.5 bg-[#8b8b8b] border-2 border-t-zinc-800 border-l-zinc-800 p-1 rounded-none shadow-inner">
                  <div className="w-10 h-10 bg-[#c6c6c6] border-t-neutral-800 border-l-neutral-800 border-r-white border-b-white border-2 flex items-center justify-center text-xs text-black font-bold">A</div>
                  <div className="w-10 h-10 bg-[#c6c6c6] border-t-neutral-800 border-l-neutral-800 border-r-white border-b-white border-2 flex items-center justify-center text-xs text-black font-bold">B</div>
                  <div className="w-10 h-10 bg-[#c6c6c6] border-t-neutral-800 border-l-neutral-800 border-r-white border-b-white border-2 flex items-center justify-center text-xs text-black font-bold">C</div>
                  <div className="w-10 h-10 bg-[#c6c6c6] border-t-neutral-800 border-l-neutral-800 border-r-white border-b-white border-2 flex items-center justify-center text-[10px] text-green-700 font-bold">SYNC</div>
                </div>

                <span className="text-2xl text-stone-400">➔</span>

                <div className="w-14 h-14 bg-[#5c5c5c] border-2 border-[#1a1a1a] flex items-center justify-center relative">
                  <Scroll className="w-8 h-8 text-yellow-100" />
                  <span className="absolute bottom-0 right-1 text-xs text-white bg-black/85 px-1">x1</span>
                </div>
              </div>

              {/* Contractor Name */}
              <div className="space-y-1">
                <label className="text-xs text-stone-300 uppercase font-bold flex justify-between">
                  <span>Input Block A (Contractor Code / Name)</span>
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Steve or Alex"
                  className="w-full bg-zinc-950 border-4 border-on-surface p-3 text-sm text-lime-400 tracking-wider outline-none rounded-none focus:border-primary placeholder-stone-600 font-semibold"
                />
              </div>

              {/* Return e-mail */}
              <div className="space-y-1">
                <label className="text-xs text-stone-300 uppercase font-bold flex justify-between">
                  <span>Input Block B (Return Post ID / Email)</span>
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@voxelgame.org"
                  className="w-full bg-zinc-950 border-4 border-on-surface p-3 text-sm text-lime-400 tracking-wider outline-none rounded-none focus:border-primary placeholder-stone-600 font-semibold"
                />
              </div>

              {/* Proposal text area */}
              <div className="space-y-1">
                <label className="text-xs text-stone-300 uppercase font-bold flex justify-between">
                  <span>Input Block C (Quest Details / Proposal)</span>
                  <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  placeholder="Need redstone layout optimized for high-load clusters. Base scale matches infinite seeds. Reward included."
                  className="w-full bg-zinc-950 border-4 border-on-surface p-3 text-sm text-lime-400 tracking-wider outline-none rounded-none focus:border-primary placeholder-stone-600 font-semibold resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="voxel-button w-full bg-primary text-on-primary py-3 font-mono text-sm uppercase flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: "rgba(255, 255, 255, 0.4) 4px 4px 0px inset, rgba(0, 0, 0, 0.6) -4px -4px 0px inset",
                }}
              >
                <Send className="w-4 h-4" />
                {loading ? "CRAFTING PROPOSAL..." : "Craft Signed Proposal"}
              </button>

              {error && (
                <p className="text-red-500 text-xs font-mono font-bold uppercase text-center mt-2 animate-pulse">
                  ⚠ Error: {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
