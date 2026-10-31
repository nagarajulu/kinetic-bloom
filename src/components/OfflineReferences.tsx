import React, { useState } from 'react';
import { BookOpen, Search, GraduationCap, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import { BOOKS_DATABASE, RESEARCH_PAPERS_DATABASE } from '../data/referencesData';
import type { BookReference } from '../types';

export const OfflineReferences: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'research'>('books');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS_DATABASE.filter((book) => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.keyTakeaways.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredPapers = RESEARCH_PAPERS_DATABASE.filter((paper) => {
    return (
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.reflexFocus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.keyFinding.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" /> Authoritative Clinical Literature
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Books & Offline Reference Library
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          Gold-standard textbooks, parent guidebooks, and peer-reviewed clinical trials for families and clinicians seeking deep, evidence-based offline reading.
        </p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
        {/* Books vs Research Papers Toggle */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('books')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'books'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Recommended Books ({BOOKS_DATABASE.length})
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'research'
                ? 'bg-white text-indigo-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" /> Clinical Studies ({RESEARCH_PAPERS_DATABASE.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="search-offline-references"
            aria-label="Search offline reference cards"
            type="text"
            placeholder={activeTab === 'books' ? 'Search books, authors, topics...' : 'Search clinical studies...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-indigo-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Books View */}
      {activeTab === 'books' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pb-1">
            {[
              { id: 'all', label: 'All Books' },
              { id: 'parent_guide', label: 'Parent Guides' },
              { id: 'clinical_manual', label: 'Clinical Manuals (INPP, MNRI, RMTi)' },
              { id: 'sensory_integration', label: 'Sensory Integration Classics' },
              { id: 'neurological_research', label: 'Brain & Movement Science' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBooks.map((book: BookReference) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl p-2 bg-indigo-50 rounded-2xl shrink-0">
                      {book.coverEmoji}
                    </span>
                    <div className="text-right space-y-1">
                      <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {book.categoryLabel}
                      </span>
                      <div className="text-[10px] text-indigo-700 font-semibold">
                        Target: {book.targetAudience}
                      </div>
                    </div>
                  </div>

                  {/* Book Title & Author */}
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {book.author}
                    </p>
                    <p className="text-[11px] text-slate-500">{book.authorTitle}</p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {book.summary}
                  </p>

                  {/* Why it Matters Callout */}
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 text-xs text-amber-950 space-y-1">
                    <span className="font-bold flex items-center gap-1 text-amber-800">
                      <Bookmark className="w-3.5 h-3.5 text-amber-600" /> Why This Book Matters:
                    </span>
                    <p className="leading-relaxed opacity-95">{book.whyItMatters}</p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Core Takeaways for Parents:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {book.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Metadata & ISBN */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Year: {book.year}</span>
                  <span className="font-mono bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                    ISBN: {book.isbn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clinical Studies & Research Papers View */}
      {activeTab === 'research' && (
        <div className="space-y-4">
          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-xs sm:text-sm text-teal-900 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-teal-800">
              <GraduationCap className="w-4 h-4 text-teal-600" /> Evidence-Based Pediatric Validation:
            </span>
            <p className="leading-relaxed">
              Primitive reflex therapy is supported by randomized controlled trials and developmental neurology research demonstrating that targeted reflex replication accelerates reading acquisition, motor stability, and impulse control.
            </p>
          </div>

          <div className="space-y-3">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded-full text-xs self-start">
                    Reflex Focus: {paper.reflexFocus}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {paper.journal} ({paper.year})
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    "{paper.title}"
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{paper.authors}</p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" /> Key Clinical Finding:
                  </span>
                  <p className="leading-relaxed">{paper.keyFinding}</p>
                </div>

                {paper.doi && (
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono text-[11px]">DOI: {paper.doi}</span>
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                    >
                      View on PubMed / DOI <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
