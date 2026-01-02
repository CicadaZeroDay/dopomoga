import { supabase } from './supabase';

export interface Article {
  id: string;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  title_ru?: string;
  title_en?: string;
  excerpt?: string;
  excerpt_ru?: string;
  excerpt_en?: string;
  content: string;
  content_ru?: string;
  content_en?: string;
  featured_image?: string;
  category?: string;
  tags?: string[];
  author: string;
  published: boolean;
  views: number;
}

// Get localized field
export function getLocalizedField(
  article: Article,
  field: 'title' | 'excerpt' | 'content',
  language: string
): string {
  if (language === 'ru' && article[`${field}_ru` as keyof Article]) {
    return article[`${field}_ru` as keyof Article] as string;
  }
  if (language === 'en' && article[`${field}_en` as keyof Article]) {
    return article[`${field}_en` as keyof Article] as string;
  }
  return article[field] as string;
}

// Get all published articles
export async function getArticles(limit?: number): Promise<Article[]> {
  let query = supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  console.log('Fetching article with slug:', slug);

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    console.error('Slug was:', slug);
    return null;
  }

  console.log('Article found:', data?.title);
  return data;
}

// Get related articles by category
export async function getRelatedArticles(
  category: string,
  excludeId: string,
  limit: number = 3
): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }

  return data || [];
}

// Get articles by category
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }

  return data || [];
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .eq('published', true)
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  const categories = [...new Set(data?.map((d) => d.category).filter(Boolean))];
  return categories as string[];
}

// Increment view count
export async function incrementViews(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_views', { article_id: id });

  if (error) {
    // Fallback: manual increment
    const { data: article } = await supabase
      .from('articles')
      .select('views')
      .eq('id', id)
      .single();

    if (article) {
      await supabase
        .from('articles')
        .update({ views: (article.views || 0) + 1 })
        .eq('id', id);
    }
  }
}

// Format date for display
export function formatDate(dateString: string, language: string = 'uk'): string {
  const date = new Date(dateString);
  const locales: Record<string, string> = {
    uk: 'uk-UA',
    ru: 'ru-RU',
    en: 'en-US',
  };

  return date.toLocaleDateString(locales[language] || 'uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
