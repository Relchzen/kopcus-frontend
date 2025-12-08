// types/hero.ts
export interface HeroImage {
  id: number;
  mime: string;
  width?: number;
  height?: number;
  name: string;
  caption?: string;
  url: string;
  alternativeText?: string;
}

export interface HeroData {
  hero_headline?: string;
  hero_subheadline?: string;
  hero_cta_text?: string;
  hero_cta_link?: string;
  hero_images?: HeroImage[];
}
