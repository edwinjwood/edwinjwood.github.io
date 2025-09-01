import React from 'react';
import { Link } from 'react-router-dom';
import headshotUrl from '../assets/Headshot.png';
import homecardData from '../data/homecard.json';

function HomeCard() {
  const renderDescription = (desc, classes = 'text-xs text-gray-500 dark:text-gray-400') => {
    if (!desc) return null;
    const parts = desc.split('·').map(p => p.trim()).filter(Boolean);
    return (
      <p className={`${classes} mt-2`}> 
        {parts.map((p, idx) => {
          const isEmail = /\S+@\S+\.\S+/.test(p);
          const isLinkedIn = /linkedin\.com/i.test(p) || /linkedin/i.test(p);
          if (isEmail) {
            return (
              <span key={idx} className="align-middle">
                <a href={`mailto:${p}`} className="hover:underline">{p}</a>
                {idx < parts.length - 1 && <span className="mx-2">•</span>}
              </span>
            );
          }
          if (isLinkedIn) {
            let url = p.startsWith('http') ? p : `https://${p.replace(/^www\./, '')}`;
            if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
            return (
              <span key={idx} className="align-middle">
                <a href={url} target="_blank" rel="noopener noreferrer" title={url} className="hover:underline">LinkedIn Profile</a>
                {idx < parts.length - 1 && <span className="mx-2">•</span>}
              </span>
            );
          }
          return (
            <span key={idx} className="align-middle">
              {p}
              {idx < parts.length - 1 && <span className="mx-2">•</span>}
            </span>
          );
        })}
      </p>
    );
  };
  return (
    <main id="content" className="w-full h-full grid place-items-center font-sans text-gray-900 dark:text-gray-100">
      <div className="w-full px-4 flex justify-center">
        <div className="relative w-full max-w-[560px] aspect-[7/4] rounded-[14px] border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/75 backdrop-blur shadow-xl overflow-hidden paper-texture paper-card">
          {/* Click-through overlay to open resume */}
          <Link to="/resume" aria-label="Open resume" className="absolute inset-0 z-0" />
          {/* Top-right actions */}
          <div className="flex absolute top-3 right-3 gap-2 z-20">
            <Link to="/resume" className="text-xs px-3 py-1.5 rounded-md bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Resume</Link>
            <Link to="/projects" className="text-xs px-3 py-1.5 rounded-md border border-brand-600 text-brand-700 dark:text-brand-300 hover:bg-brand-50/60 dark:hover:bg-gray-800">Projects</Link>
          </div>
          {/* Mobile layout: avatar top-left, text centered */}
          <div className="absolute top-3 left-3 z-20 sm:hidden">
            <div className="shrink-0 rounded-full p-[2px] ring-2 ring-brand-500/60 bg-gray-50 dark:bg-gray-900">
              <img src={headshotUrl} alt="Headshot" className="block h-16 w-16 rounded-full object-cover" />
            </div>
          </div>
          <div className="absolute inset-0 px-6 grid place-items-center text-center z-10 sm:hidden">
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight">{homecardData.title}</h1>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{homecardData.subtitle}</p>
              <div>{renderDescription(homecardData.description, 'text-[11px] text-gray-500 dark:text-gray-400')}</div>
            </div>
          </div>
          {/* Desktop/tablet layout: side-by-side, left-aligned */}
          <div className="hidden sm:absolute sm:inset-0 sm:px-6 sm:flex sm:items-center sm:justify-start">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="shrink-0 rounded-full p-[2px] ring-2 ring-brand-500/60 bg-gray-50 dark:bg-gray-900">
                <img src={headshotUrl} alt="Headshot" className="block h-24 w-24 rounded-full object-cover" />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold tracking-tight">{homecardData.title}</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{homecardData.subtitle}</p>
                <div>{renderDescription(homecardData.description, 'text-xs text-gray-500 dark:text-gray-400')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomeCard;
