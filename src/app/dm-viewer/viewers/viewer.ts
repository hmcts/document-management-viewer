export interface Viewer {
  url: string;
  page: number;
  numPages: number;
  prevPage();
  nextPage();
}
