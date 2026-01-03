import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';
import { ArticleSchema, BreadcrumbSchema } from '../components/SEO/JsonLd';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useLanguage } from '../contexts/LanguageContext';
import {
  getArticleBySlug,
  getRelatedArticles,
  formatDate,
  getLocalizedField,
  incrementViews,
  Article,
} from '../lib/articles';

const MotionDiv = motion.div as any;

// Table of Contents generator
function generateTOC(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    headings.push({ id, text, level });
  }

  return headings;
}

// Reading time calculator
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Enhanced markdown to HTML with beautiful styling
function markdownToHtml(content: string): string {
  // SVG icons as inline strings
  const quoteIcon = `<svg class="w-8 h-8 text-primary/30 mb-2" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>`;
  const bibleIcon = `<svg class="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M12 6v8"/><path d="M8 10h8"/></svg>`;
  const fishDivider = `<div class="flex items-center justify-center my-10 gap-4"><div class="h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/30 flex-1"></div><svg width="32" height="16" viewBox="0 0 32 16" class="text-primary/40"><path d="M4 8 Q12 2 20 8 Q12 14 4 8" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M20 8 L26 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M20 8 L26 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><div class="h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/30 flex-1"></div></div>`;
  const checkIcon = `<svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  return content
    // Horizontal rules → Decorative fish divider
    .replace(/^---$/gm, fishDivider)

    // Blockquotes → Styled quote blocks
    .replace(/^>\s*[«"](.+?)[»"](.*)$/gm, `<blockquote class="relative bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary rounded-r-xl p-6 my-8">${quoteIcon}<p class="text-lg text-textDark italic leading-relaxed">«$1»</p><cite class="block mt-2 text-sm text-textMuted not-italic">$2</cite></blockquote>`)
    .replace(/^>\s*(.+)$/gm, `<blockquote class="relative bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary rounded-r-xl p-6 my-8"><p class="text-textDark italic leading-relaxed">$1</p></blockquote>`)

    // Headers with accent styling
    .replace(/^### (.+)$/gm, '<h3 class="flex items-center gap-3 text-xl font-bold mt-8 mb-4 text-textDark"><span class="w-2 h-2 rounded-full bg-secondary"></span>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="relative text-2xl font-bold mt-12 mb-6 text-textDark pl-4 border-l-4 border-primary">$1</h2>')

    // Numbered lists (1. 2. 3.)
    .replace(/^(\d+)\.\s+\*\*(.+?)\*\*\n(.+)$/gm, `<div class="flex gap-4 my-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100"><span class="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">$1</span><div><strong class="text-textDark block mb-1">$2</strong><span class="text-textMuted">$3</span></div></div>`)
    .replace(/^(\d+)\.\s+(.+)$/gm, `<div class="flex gap-3 items-start my-3"><span class="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">$1</span><span class="text-textMuted leading-relaxed">$2</span></div>`)

    // Bold text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-textDark font-semibold">$1</strong>')

    // Italic text
    .replace(/\*(.+?)\*/g, '<em class="text-primary/80">$1</em>')

    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:text-primary/70 underline underline-offset-2 transition-colors">$1</a>')

    // Bullet lists with check icons
    .replace(/^- (.+)$/gm, `<li class="flex gap-3 items-start my-2">${checkIcon}<span class="text-textMuted leading-relaxed">$1</span></li>`)

    // Wrap consecutive list items
    .replace(/(<li class="flex.*?<\/li>\n?)+/g, '<ul class="my-6 space-y-1">$&</ul>')

    // Paragraphs (must be last)
    .replace(/^(?!<[hbdlu])(.+)$/gm, '<p class="mb-4 text-textMuted leading-relaxed text-lg">$1</p>')

    // Clean up empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, '');
}

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;

      setLoading(true);
      const articleData = await getArticleBySlug(slug);

      if (!articleData) {
        navigate('/404', { replace: true });
        return;
      }

      setArticle(articleData);

      // Increment views
      incrementViews(articleData.id);

      // Load related articles
      if (articleData.category) {
        const related = await getRelatedArticles(articleData.category, articleData.id);
        setRelatedArticles(related);
      }

      setLoading(false);
    }

    loadArticle();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return null;
  }

  const title = getLocalizedField(article, 'title', language);
  const excerpt = getLocalizedField(article, 'excerpt', language);
  const content = getLocalizedField(article, 'content', language);
  const toc = generateTOC(content);
  const readingTime = calculateReadingTime(content);
  const articleUrl = `https://dopomoga.me/blog/${article.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: excerpt,
        url: articleUrl,
      });
    } else {
      navigator.clipboard.writeText(articleUrl);
      alert(t('article.linkCopied'));
    }
  };

  return (
    <>
      <SEOHead
        title={title}
        description={excerpt || ''}
        image={article.featured_image}
        url={articleUrl}
        type="article"
        article={{
          publishedTime: article.created_at,
          modifiedTime: article.updated_at,
          author: article.author,
          tags: article.tags,
        }}
      />
      <ArticleSchema
        title={title}
        description={excerpt || ''}
        image={article.featured_image}
        datePublished={article.created_at}
        dateModified={article.updated_at}
        author={article.author}
        url={articleUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Головна', url: 'https://dopomoga.me/' },
          { name: 'Блог', url: 'https://dopomoga.me/blog' },
          { name: title, url: articleUrl },
        ]}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo size={32} variant="icon" className="text-primary" />
            <span className="font-display font-semibold text-textDark text-lg hidden sm:block">
              dopomoga
            </span>
          </Link>

          <Link
            to="/blog"
            className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('nav.blog')}
          </Link>
        </div>
      </nav>

      {/* Article */}
      <main className="min-h-screen bg-light pt-24 pb-16">
        <article className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-textMuted mb-6">
              <Link to="/" className="hover:text-primary">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-primary">
                {t('nav.blog')}
              </Link>
              <span>/</span>
              <span className="text-textDark">{title}</span>
            </div>

            {/* Category */}
            {article.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-4">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-textDark mb-6 leading-tight">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-textMuted text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.created_at, language)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readingTime} {t('article.readTime')}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-primary transition-colors ml-auto"
              >
                <Share2 className="w-4 h-4" />
                {t('article.share')}
              </button>
            </div>
          </MotionDiv>

          {/* Featured Image */}
          {article.featured_image && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10"
            >
              <img
                src={article.featured_image}
                alt={title}
                className="w-full rounded-2xl shadow-lg"
              />
            </MotionDiv>
          )}

          {/* Table of Contents */}
          {toc.length > 2 && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 mb-10 shadow-sm"
            >
              <h2 className="font-display font-bold text-textDark mb-4">{t('article.toc')}</h2>
              <nav className="space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-textMuted hover:text-primary transition-colors ${
                      item.level === 3 ? 'pl-4 text-sm' : ''
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </MotionDiv>
          )}

          {/* Content */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-textMuted text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold text-textDark mb-8">
                {t('article.related')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    {related.featured_image && (
                      <img
                        src={related.featured_image}
                        alt={getLocalizedField(related, 'title', language)}
                        className="w-full aspect-video object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-display font-bold text-textDark group-hover:text-primary transition-colors line-clamp-2">
                      {getLocalizedField(related, 'title', language)}
                    </h3>
                    <p className="text-textMuted text-sm mt-2">
                      {formatDate(related.created_at, language)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
};

export default ArticlePage;
