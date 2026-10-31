import { useState } from 'react';
import { Play, ShieldCheck, ExternalLink } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface PrivacyVideoPlayerProps {
  youtubeId: string;
  title: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
}

export const PrivacyVideoPlayer = ({
  youtubeId,
  title,
  youtubeUrl,
  thumbnailUrl,
}: PrivacyVideoPlayerProps) => {
  const videoKey = `${youtubeId}_${youtubeUrl || ''}`;
  const [consentedKey, setConsentedKey] = useState<string | null>(null);
  const hasConsented = consentedKey === videoKey;

  const startMatch = youtubeUrl?.match(/[?&]t=(\d+)s?/);
  const startParam = startMatch ? `&start=${startMatch[1]}` : '';
  const embedSrc = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1${startParam}`;

  if (hasConsented) {
    return (
      <div className="space-y-2">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
          <iframe
            src={embedSrc}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>External Public Educational Video (Source: Harkla® YouTube Channel — Independent Third-Party Resource)</span>
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-teal-600 hover:text-teal-700 font-semibold underline flex items-center gap-1 shrink-0 ml-2"
            >
              Open in YouTube <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-5 flex flex-col items-center justify-center text-center text-white relative border border-slate-700 shadow-md">
      {thumbnailUrl && (
        <img
          src={getAssetUrl(thumbnailUrl)}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
        />
      )}
      <div className="relative z-10 max-w-md space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/40 text-teal-300 mx-auto flex items-center justify-center shadow-inner">
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </div>
        <div>
          <h4 className="font-bold text-sm sm:text-base text-white">{title}</h4>
          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
            Playing this video connects to YouTube (Google LLC), which may process your IP address and device identifiers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setConsentedKey(videoKey)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" /> Load Video (Adult Caregiver Consent)
        </button>
        <div className="text-[10px] text-slate-400">
          Source: Harkla® Pediatric OT Channel (Independent Third-Party Public Resource)
        </div>
      </div>
    </div>
  );
};
