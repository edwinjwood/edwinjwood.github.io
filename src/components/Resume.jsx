import React from 'react';
import resumeData from '../data/resume.json';

export default function Resume() {
  const r = resumeData || {};
  const contact = r.contact || {};

  return (
    <main id="content" className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-3xl mx-auto py-12 px-4">
        {/* Header */}
        <header className="mb-8 border-b pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">{r.name}</h1>
          <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium mb-2">{r.title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-sm gap-1">
            {contact.location && <span>{contact.location}</span>}
            {contact.location && <span className="hidden sm:inline mx-2">•</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.phone && <span className="hidden sm:inline mx-2">•</span>}
            {contact.email && <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>}
            {contact.email && <span className="hidden sm:inline mx-2">•</span>}
            {contact.linkedin && (() => {
              let display = contact.linkedin;
              try {
                const u = new URL(contact.linkedin);
                display = `${u.host}${u.pathname}`;
              } catch (e) {
                // leave as-is if parsing fails
              }
              return (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">{display}</a>
              );
            })()}
          </div>
        </header>

        {/* Professional Summary */}
        {r.summary && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Professional Summary</h3>
            <p className="resume-summary text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">{r.summary}</p>
            {/* Technical skills are rendered as a competency in coreCompetencies */}
          </section>
        )}

        {/* Core Competencies & Leadership Skills */}
        {Array.isArray(r.coreCompetencies) && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Skills</h3>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {r.coreCompetencies.map((c, i) => (
                <p key={i} className="mb-1 text-sm">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{c.heading}:</span>{' '}
                  <span className="text-gray-700 dark:text-gray-300">{c.text}</span>
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience */}
        {Array.isArray(r.experience) && (
          <section className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Professional Experience</h3>
            {r.experience.map((org, orgIdx) => (
              <div key={orgIdx} className="mb-6">
                <div className="mb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="font-bold text-gray-800 dark:text-gray-100 tracking-tight">{org.company} — {org.location}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">{org.period}</span>
                  </div>
                  {org.roles && org.roles.map((role, rIdx) => (
                    <div key={rIdx} className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">{role.title} {role.period ? `| ${role.period}` : ''}</div>
                  ))}
                </div>
                {org.roles && (
                  <ul className="list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 space-y-1.5 text-[13px] sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                    {org.roles.flatMap(r => r.bullets || []).map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {r.education && (
          <section>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Education</h3>
            <div>
              <span className="font-bold text-gray-800 dark:text-gray-100">{r.education.school}</span>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{r.education.degree}</div>
              {r.education.expectedGraduation && <div className="text-gray-700 dark:text-gray-300 text-sm">Expected Graduation: {r.education.expectedGraduation}</div>}
              {r.education.notes && <div className="text-gray-700 dark:text-gray-300 text-sm mt-2">{r.education.notes}</div>}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
