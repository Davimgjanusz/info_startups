import { isSupabaseConfigured, supabase } from '../lib/supabase';

const STORAGE_BUCKET = 'startup-assets';
const environment = import.meta.env ?? {};
export const EMPTY_CATALOG = Object.freeze({ startupsByYear: {}, years: [] });

function isAbsoluteUrl(value) {
  return /^https?:\/\//i.test(value);
}

export function getPublicAssetUrl(value) {
  if (!value || isAbsoluteUrl(value)) return value || null;
  if (!supabase) return null;
  return supabase.storage.from(STORAGE_BUCKET).getPublicUrl(value).data.publicUrl;
}

function sortMembers(members) {
  return [...(members ?? [])].sort((first, second) => first.sort_order - second.sort_order);
}

export function normalizeStartupRows(rows, assetUrl = getPublicAssetUrl) {
  const startups = (rows ?? []).map((startup) => ({
    id: startup.slug,
    name: startup.name,
    year: startup.cohort_year,
    number: startup.display_number,
    category: startup.category,
    accent: startup.accent,
    tags: startup.tags,
    description: startup.description,
    tagline: startup.tagline,
    segment: startup.segment,
    headline: startup.headline,
    paragraphs: startup.paragraphs,
    features: startup.features,
    socials: startup.socials ?? {},
    logo: assetUrl(startup.logo_url),
    teamImage: assetUrl(startup.team_image_url),
    teamMembers: sortMembers(startup.startup_members).map((member) => ({
      name: member.name,
      role: member.role,
      image: assetUrl(member.image_url),
      instagram: member.instagram,
      github: member.github,
      linkedin: member.linkedin,
      email: member.email,
    })),
  }));

  const startupsByYear = startups.reduce((catalog, startup) => {
    (catalog[startup.year] ??= []).push(startup);
    return catalog;
  }, {});
  const years = Object.keys(startupsByYear).sort((firstYear, secondYear) => secondYear.localeCompare(firstYear));
  return { startupsByYear, years };
}

async function loadDevelopmentFallback() {
  const localData = await import('../data/startups.js');
  return { startupsByYear: localData.startupsByYear, years: localData.years };
}

export async function fetchStartupCatalog({ client = supabase, allowDevelopmentFallback = environment.DEV } = {}) {
  if (!isSupabaseConfigured || !client) {
    if (allowDevelopmentFallback) return loadDevelopmentFallback();
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await client
    .from('startups')
    .select('slug, cohort_year, display_number, name, category, accent, tags, description, tagline, segment, headline, paragraphs, features, socials, logo_url, team_image_url, sort_order, startup_members(name, role, image_url, instagram, github, linkedin, email, sort_order)')
    .eq('is_published', true)
    .order('cohort_year', { ascending: false })
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return normalizeStartupRows(data);
}
