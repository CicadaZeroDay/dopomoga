import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEO/SEOHead';
import { BreadcrumbSchema } from '../components/SEO/JsonLd';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useLanguage } from '../contexts/LanguageContext';
import { getArticles, getCategories, formatDate, getLocalizedField, Article } from '../lib/articles';

const MotionDiv = motion.div as any;

const BlogPage: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [articlesData, categoriesData] = await Promise.all([
        getArticles(),
        getCategories(),
      ]);
      setArticles(articlesData);
      setCategories(categoriesData);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredArticles = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;

  const titles: Record<string, string> = {
    uk: 'Блог',
    ru: 'Блог',
    en: 'Blog',
  };

  const descriptions: Record<string, string> = {
    uk: 'Статті про подолання залежностей, духовний розвиток та підтримку',
    ru: 'Статьи о преодолении зависимостей, духовном развитии и поддержке',
    en: 'Articles about overcoming addictions, spiritual growth and support',
  };

  return (
    <>
      <SEOHead
        title={titles[language]}
        description={descriptions[language]}
        url="https://dopomoga.me/blog"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Головна', url: 'https://dopomoga.me/' },
          { name: titles[language], url: 'https://dopomoga.me/blog' },
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
            to="/"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            ← На головну
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="min-h-screen bg-light pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-textDark mb-4">
              {titles[language]}
            </h1>
            <p className="text-textMuted text-lg max-w-2xl mx-auto">
              {descriptions[language]}
            </p>
          </MotionDiv>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-primary text-white'
                    : 'bg-white text-textMuted hover:bg-gray-50'
                }`}
              >
                Всі
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-white text-textMuted hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <MotionDiv
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/blog/${article.slug}`} className="block group">
                    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      {article.featured_image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.featured_image}
                            alt={getLocalizedField(article, 'title', language)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category & Date */}
                        <div className="flex items-center gap-3 text-sm text-textMuted mb-3">
                          {article.category && (
                            <span className="flex items-center gap-1">
                              <Tag className="w-3 h-3" />
                              {article.category}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(article.created_at, language)}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-display font-bold text-textDark mb-3 group-hover:text-primary transition-colors">
                          {getLocalizedField(article, 'title', language)}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-textMuted text-sm flex-1 line-clamp-3">
                          {getLocalizedField(article, 'excerpt', language)}
                        </p>

                        {/* Read more */}
                        <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                          Читати далі
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </MotionDiv>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-textMuted text-lg">
                {language === 'uk'
                  ? 'Поки що немає статей. Скоро тут з\'являться корисні матеріали!'
                  : language === 'ru'
                  ? 'Пока нет статей. Скоро здесь появятся полезные материалы!'
                  : 'No articles yet. Useful content coming soon!'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
