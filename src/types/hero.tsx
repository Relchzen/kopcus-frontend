// types/hero.ts
export interface HeroImage {
  id: number;
  title: string;
  caption?: string;
  full_image_url: string;
  thumbnail_image_url: string;
  alt?: string;
}

export interface HeroData {
  hero_headline_firstline?: string;
  hero_subheadline?: string;
  hero_cta_text?: string;
  hero_cta_link?: string;
  hero_images?: HeroImage[];
}
