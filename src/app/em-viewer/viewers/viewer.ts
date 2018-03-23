export interface Viewer {
  url: string;
  originalUrl: string;
  page: number;
  numPages: number;
  prevPage();
  nextPage();
}
