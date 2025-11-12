// ACF fields for individual portfolio posts
export interface PortfolioPostACF {
  portfolio_title: string;
  portfolio_artist_brand: string;
  portfolio_year: string;
  portfolio_date: string;
  portfolio_image: {
    ID: number;
    url: string;
    alt: string;
    title: string;
    // Add other image properties as needed
  };
  // Add any other portfolio ACF fields you have
}

// Individual portfolio post from the API
export interface PortfolioPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: {
    _acf_changed: boolean;
    _monsterinsights_skip_tracking: boolean;
    _monsterinsights_sitenote_active: boolean;
    _monsterinsights_sitenote_note: string;
    _monsterinsights_sitenote_category: number;
    [key: string]: any;
  };
  categories: number[];
  tags: number[];
  class_list: string[];
  yoast_head: string;
  yoast_head_json: {
    title: string;
    robots: {
      [key: string]: any;
    };
    canonical: string;
    og_locale: string;
    og_type: string;
    [key: string]: any;
  };
  acf: PortfolioPostACF;
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    author: Array<{ href: string; embeddable: boolean }>;
    replies: Array<{ href: string; embeddable: boolean }>;
    [key: string]: any;
  };
}

// Complete portfolio section data
export interface PortfolioData {
  portfolio_heading: string;
  portfolio_headline: string;
  portfolio_text: string;
  portfolio_featured: PortfolioPost[];
}
