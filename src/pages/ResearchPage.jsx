import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Search,
  Play,
} from "lucide-react";

const featuredPost = {
  title:
    "The Future of AI Recruitment in Enterprise GTM Hiring",
  category: "AI Recruitment",
  readTime: "6 min read",
  image:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
};

const posts = [
  {
    id: 1,
    title:
      "How AI is Transforming Executive Search",
    category: "Executive Search",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title:
      "Building High-Performance GTM Teams",
    category: "GTM Strategy",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title:
      "The Rise of AI Sales Enablement",
    category: "Sales AI",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title:
      "Modern Recruitment Intelligence Platforms",
    category: "Recruitment",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center border-b border-white/10">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-business-team-meeting-1560088504707?download=1080p"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur mb-6">
            <Play className="w-4 h-4 text-gray-300" />

            <span className="text-sm text-gray-300">
              AI Recruitment Intelligence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Research &
            <span className="block text-white/70">
              Market Insights
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed mb-10">
            Deep research, enterprise GTM hiring
            intelligence, AI recruitment insights,
            and modern workforce trends shaping the
            future of executive search.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="px-7 py-4 rounded-2xl bg-white text-black font-medium hover:bg-gray-200 transition">
              Explore Research
            </button>

            <button className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
              Watch Insights
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full lg:w-[420px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search research..."
              className="w-full bg-[#111111] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-white/20"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {[
              "All",
              "AI",
              "GTM",
              "Recruitment",
              "Enterprise",
              "Sales",
            ].map((item) => (
              <button
                key={item}
                className="px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/10 transition text-sm"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-[#111111] border border-white/10 rounded-[32px] overflow-hidden">
          <div className="relative h-full min-h-[420px]">
            <img
              src={featuredPost.image}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          <div className="p-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
              <span className="text-sm text-gray-300">
                Featured Research
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              {featuredPost.title}
            </h2>

            <div className="flex items-center gap-5 text-gray-400 mb-8">
              <span>{featuredPost.category}</span>

              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4" />

                <span>{featuredPost.readTime}</span>
              </div>
            </div>

            <p className="text-gray-400 leading-relaxed mb-10">
              Explore how AI-driven recruitment
              intelligence is reshaping enterprise
              hiring strategies, GTM team building,
              and sales leadership acquisition across
              global markets.
            </p>

            <Link
              to="/research/future-of-ai-recruitment"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-black font-medium hover:bg-gray-200 transition"
            >
              Read Full Case Study

              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              Latest Research
            </h2>

            <p className="text-gray-400">
              Enterprise recruitment intelligence &
              market analysis
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/research/${post.id}`}
              className="group bg-[#111111] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-[240px] object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span>{post.category}</span>

                  <div className="flex items-center gap-1">
                    <Clock3 className="w-3 h-3" />

                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold leading-snug mb-5 group-hover:text-gray-300 transition">
                  {post.title}
                </h3>

                <div className="inline-flex items-center gap-2 text-sm text-white">
                  Read Article

                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Stay Ahead of the Market
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10">
            Weekly enterprise GTM hiring insights,
            AI recruitment trends, and market
            intelligence delivered directly to your
            inbox.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#111111] border border-white/10 rounded-2xl px-5 py-4 text-white outline-none"
            />

            <button className="px-8 py-4 rounded-2xl bg-white text-black font-medium hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}