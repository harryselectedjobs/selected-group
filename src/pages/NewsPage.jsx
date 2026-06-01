import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Cpu,
  Landmark,
  TrendingUp,
  Bot,
  Brain,
  Shield,
  Server,
  Globe,
  Briefcase,
  BookOpen,
  Share2,
  ExternalLink,
  Clock,
  RefreshCw,
  ChevronRight,
  Newspaper,
  Rocket,
  Layers,
  BarChart2,
  Zap,
} from "lucide-react";

const TOPICS = [
  { label: "Quantum Computing & Quantum Technology", icon: Cpu },
  { label: "Government Digital Transformation Projects", icon: Landmark },
  { label: "Startup Funding & Venture Capital", icon: TrendingUp },
  { label: "Agentic AI & Autonomous AI Systems", icon: Bot },
  { label: "Cybersecurity & Cyber World", icon: Shield },
  { label: "Artificial Intelligence & Machine Learning", icon: Brain },
  { label: "Emerging Technology Research", icon: Zap },
  { label: "Enterprise Technology & Cloud", icon: Server },
  { label: "Global Technology News & Trends", icon: Globe },
  { label: "Social Media Automation & AI Content Generation", icon: Share2 },
  { label: "Autonomous Content Intelligence Platform", icon: Layers },
  { label: "Technology Investment Intelligence", icon: BarChart2 },
  { label: "Future of Work & Automation", icon: Briefcase },
  { label: "Defense, Space & Strategic Technology", icon: Rocket },
  { label: "Technology Research & Thought Leadership", icon: BookOpen },
];

const API_BASE = "http://13.61.16.106:1802/api/news";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function NewsPage() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[5]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (topic) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE, {
        params: { topic: topic.label, date: getTodayDate() },
      });
      setArticles(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(activeTopic);
  }, [activeTopic, fetchNews]);

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Newspaper size={16} className="text-white/40" />
              <span className="text-xs tracking-widest uppercase text-white/40">
                Intelligence Feed
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight">
              Latest <span className="text-white/40">Industry</span> News
            </h1>
            <p className="mt-3 text-white/50 text-sm max-w-xl">
              Curated intelligence across the most critical sectors shaping the
              future of technology and business.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar – desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-xs tracking-widest uppercase text-white/30 mb-4 px-1">
                Topics
              </p>
              <nav className="space-y-0.5">
                {TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const isActive = activeTopic.label === topic.label;
                  return (
                    <button
                      key={topic.label}
                      onClick={() => setActiveTopic(topic)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon
                        size={14}
                        className={
                          isActive
                            ? "text-white flex-shrink-0"
                            : "text-white/35 flex-shrink-0 group-hover:text-white/60"
                        }
                      />
                      <span className="leading-tight flex-1 text-xs">
                        {topic.label}
                      </span>
                      {isActive && (
                        <ChevronRight
                          size={12}
                          className="text-white/40 flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Topic chips – mobile */}
          <div className="lg:hidden -mx-6 px-6 overflow-x-auto">
            <div className="flex gap-2 w-max pb-2">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isActive = activeTopic.label === topic.label;
                return (
                  <button
                    key={topic.label}
                    onClick={() => setActiveTopic(topic)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all ${
                      isActive
                        ? "bg-white text-black border-white"
                        : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <Icon size={11} />
                    {topic.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-light">{activeTopic.label}</h2>
                <p className="text-xs text-white/35 mt-0.5">Latest updates</p>
              </div>
              <button
                onClick={() => fetchNews(activeTopic)}
                disabled={loading}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors px-3 py-2 rounded-lg border border-white/10 hover:border-white/25"
              >
                <RefreshCw
                  size={11}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            {error && (
              <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-6 text-center">
                <p className="text-red-400/80 text-sm">{error}</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col gap-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex rounded-2xl border border-white/10 overflow-hidden animate-pulse h-44"
                  >
                    <div className="flex-1 p-6 space-y-3">
                      <div className="h-2.5 bg-white/5 rounded w-1/5" />
                      <div className="h-4 bg-white/5 rounded w-full" />
                      <div className="h-4 bg-white/5 rounded w-4/5" />
                      <div className="h-3 bg-white/5 rounded w-2/3 mt-4" />
                    </div>
                    <div className="w-2/5 md:w-64 bg-white/5 flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  {articles.length === 0 ? (
                    <div className="text-center py-20 text-white/25">
                      <Newspaper
                        size={36}
                        className="mx-auto mb-4 opacity-40"
                      />
                      <p className="text-sm">
                        No articles found for this topic.
                      </p>
                    </div>
                  ) : (
                    articles.map((article, i) => (
                      <ArticleCard key={i} article={article} index={i} />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, index }) {
  const timeAgo = formatTimeAgo(new Date(article.published_at));
  const isReversed = index % 2 !== 0;
  const description = article.description
    ? article.description
        .replace(/<[^>]+>/g, "")
        .replace(/&#8230;/g, "…")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#[0-9]+;/g, "")
        .trim()
    : null;

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      className={`group flex ${isReversed ? "flex-row-reverse" : "flex-row"} rounded-2xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-0.5 bg-white/[0.02] hover:bg-white/[0.04]`}
    >
      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-7">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Clock size={10} className="text-white/25 flex-shrink-0" />
          <span className="text-[10px] text-white/30">{timeAgo}</span>
          {article.author && (
            <>
              <span className="text-white/15 text-[10px]">·</span>
              <span className="text-[10px] text-white/25 truncate max-w-[180px]">
                {article.author}
              </span>
            </>
          )}
        </div>

        <h3 className="text-sm md:text-base font-medium text-white/85 leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
          {article.title}
        </h3>

        {description && (
          <p className="text-xs text-white/40 flex-1 mb-4 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-xs text-white/30 group-hover:text-white/60 transition-colors mt-auto">
          Read article
          <ExternalLink size={10} />
        </div>
      </div>

      {/* Image – extends slightly above and below the card */}
      <div
        className={`relative w-[38%] md:w-[260px] flex-shrink-0 -my-4 overflow-hidden border border-white/[0.08] ${
          isReversed
            ? "rounded-r-2xl rounded-l-xl"
            : "rounded-l-2xl rounded-r-xl"
        }`}
      >
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center min-h-[176px]">
            <Newspaper size={28} className="text-white/10" />
          </div>
        )}
        {/* Source label overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10 pb-3 px-3">
          <span className="text-[9px] tracking-[0.15em] uppercase text-white/55 font-medium">
            {article.source || "News Portal"}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function formatTimeAgo(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
