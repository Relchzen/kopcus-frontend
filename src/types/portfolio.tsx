export interface PortfolioImage {
  ext: string;
  mime: string;
  name: string;
  url: string;
  height?: number;
  width?: number;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail: PortfolioImage;
  };
}

export interface Portfolio {
  artistBrand: string;
  portfolioTitle: string;
  featuredImage: PortfolioImage;
  date: Date;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContent?: any[];
}

// Complete portfolio section data
export interface PortfolioData {
  portfolio_heading: string;
  portfolio_headline: string;
  portfolio_text: string;
  portfolios: Portfolio[];
}
