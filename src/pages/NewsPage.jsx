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
  Zap,
  Rocket,
  Globe,
  Briefcase,
  BookOpen,
  Share2,
  ExternalLink,
  Clock,
  RefreshCw,
  ChevronRight,
  Newspaper,
} from "lucide-react";

const TOPICS = [
  {
    label: "Quantum & Deep Tech",
    query: "quantum computing deep tech",
    icon: Cpu,
  },
  {
    label: "Government Digital Transformation",
    query: "government digital transformation",
    icon: Landmark,
  },
  {
    label: "Startup Funding Intelligence",
    query: "startup funding venture capital",
    icon: TrendingUp,
  },
  {
    label: "Agentic AI",
    query: "agentic AI autonomous agents",
    icon: Bot,
  },
  {
    label: "Artificial Intelligence",
    query: "artificial intelligence AI",
    icon: Brain,
  },
  {
    label: "Cybersecurity",
    query: "cybersecurity data breach",
    icon: Shield,
  },
  {
    label: "AI Infrastructure & Compute",
    query: "AI infrastructure GPU compute",
    icon: Server,
  },
  {
    label: "Robotics & Physical AI",
    query: "robotics physical AI",
    icon: Zap,
  },
  {
    label: "Defense & Space Technology",
    query: "defense space technology",
    icon: Rocket,
  },
  {
    label: "Emerging Technologies",
    query: "emerging technology innovation",
    icon: Globe,
  },
  {
    label: "Business & Enterprise Technology",
    query: "enterprise technology business software",
    icon: Briefcase,
  },
  {
    label: "Research & Intelligence",
    query: "AI research intelligence",
    icon: BookOpen,
  },
  {
    label: "Social & Content Automation",
    query: "content automation social media AI",
    icon: Share2,
  },
];

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

export default function NewsPage() {
  const [activeTopic, setActiveTopic] = useState(TOPICS[4]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (topic) => {
    if (!API_KEY) {
      setError(
        "API key not configured. Add VITE_GNEWS_API_KEY=your_key to your .env file. Get a free key at gnews.io"
      );
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://gnews.io/api/v4/search", {
        params: {
          q: topic.query,
          token: API_KEY,
          lang: "en",
          max: 12,
          sortby: "publishedAt",
        },
      });
      setArticles(res.data.articles || []);
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
      {/* Page Header */}
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
              Latest{" "}
              <span className="text-white/40">Industry</span> News
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
          <aside className="hidden lg:block w-60 flex-shrink-0">
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
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all duration-200 group ${
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
                      <span className="leading-tight flex-1">{topic.label}</span>
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
            {/* Section header */}
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

            {/* Error state */}
            {error && (
              <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-6 text-center">
                <p className="text-red-400/80 text-sm">{error}</p>
              </div>
            )}

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 overflow-hidden animate-pulse"
                  >
                    <div className="h-44 bg-white/5" />
                    <div className="p-4 space-y-3">
                      <div className="h-2.5 bg-white/5 rounded w-1/3" />
                      <div className="h-4 bg-white/5 rounded w-full" />
                      <div className="h-4 bg-white/5 rounded w-4/5" />
                      <div className="h-3 bg-white/5 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Articles */}
            {!loading && !error && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTopic.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {articles.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-white/25">
                      <Newspaper size={36} className="mx-auto mb-4 opacity-40" />
                      <p className="text-sm">No articles found for this topic.</p>
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
  const timeAgo = formatTimeAgo(new Date(article.publishedAt));

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex flex-col rounded-xl border border-white/10 overflow-hidden hover:border-white/25 transition-all duration-300 hover:-translate-y-1 bg-white/[0.02] hover:bg-white/[0.04]"
    >
      {/* Thumbnail */}
      {article.image ? (
        <div className="h-44 overflow-hidden bg-white/5 flex-shrink-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.closest(".h-44").classList.add("hidden");
            }}
          />
        </div>
      ) : (
        <div className="h-44 bg-white/5 flex items-center justify-center flex-shrink-0">
          <Newspaper size={28} className="text-white/10" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Source + time */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] tracking-widest uppercase text-white/40 font-medium truncate max-w-[60%]">
            {article.source?.name}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-white/30 flex-shrink-0">
            <Clock size={9} />
            {timeAgo}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-white/85 leading-snug mb-2 group-hover:text-white transition-colors line-clamp-3">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-xs text-white/40 line-clamp-2 flex-1 mb-3 leading-relaxed">
            {article.description}
          </p>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-xs text-white/30 group-hover:text-white/60 transition-colors mt-auto pt-1">
          Read article
          <ExternalLink size={10} />
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
