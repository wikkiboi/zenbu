export type AnimeType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | "cm"
  | "pv"
  | "tv_special";

export type TopAnimeFilter =
  | "airing"
  | "upcoming"
  | "bypopularity"
  | "favorite";

export type AnimeStatus = "airing" | "complete" | "upcoming";

export type AnimeRating = "g" | "pg" | "pg13" | "r17" | "r" | "rx";

export type OrderBy =
  | "mal_id"
  | "title"
  | "start_date"
  | "end_date"
  | "episodes"
  | "score"
  | "scored_by"
  | "rank"
  | "popularity"
  | "members"
  | "favorites";

export type Seasons = "winter" | "spring" | "summer" | "fall";
export interface SearchParams {
  unapproved?: boolean;
  page?: number;
  limit?: number;
  q?: string;
  type?: AnimeType;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: AnimeStatus;
  rating?: AnimeRating;
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: OrderBy;
  sort?: "desc" | "asc";
  letter?: string;
  producers?: string;
  start_date?: string;
  end_date?: string;
}

export interface AnimeData {
  pagination: Pagination;
  data: Anime[];
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms: string[];
  type?: string;
  source: string;
  episodes?: number;
  status: "Not yet aired" | "Currently Airing" | "Finished Airing";
  airing: boolean;
  aired: Aired;
  duration: string;
  rating?: string;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis?: string;
  background: string;
  season?: string;
  year?: number;
  broadcast: Broadcast;
  producers: RelatedData[];
  licensors: RelatedData[];
  studios: RelatedData[];
  genres: RelatedData[];
  explicit_genres: RelatedData[];
  themes: RelatedData[];
  demographics: RelatedData[];
  relations?: Relations[];
}

export interface FullAnimeData {
  data: Anime;
}
export interface RelatedData {
  mal_id: number;
  type: string;
  name: string;
  url?: string;
}

export interface Relations {
  relation: KeyRelation | string;
  entry: RelatedData[];
}

export type KeyRelation = "Prequel" | "Sequel" | "Adaptation";

export interface Broadcast {
  day?: string;
  time?: string;
  timezone?: string;
  string?: string;
}

export interface Aired {
  from?: string;
  to?: string;
  prop: Prop;
  string: string;
}

export interface Prop {
  from: From;
  to: To;
}

export interface To {
  day?: number;
  month?: number;
  year?: number;
}

export interface From {
  day?: number;
  month?: number;
  year?: number;
}

export interface Title {
  type?: string;
  title?: string;
}

export interface Trailer {
  youtube_id?: string;
  url?: string;
  embed_url?: string;
  images: Images2;
}

export interface Images2 {
  image_url?: string;
  small_image_url?: string;
  medium_image_url?: string;
  large_image_url?: string;
  maximum_image_url?: string;
}

export interface Images {
  jpg: Jpg;
  webp: Jpg;
}

export interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}
