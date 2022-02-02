export interface NormalizedObjects<T> {
  entities: { [id: string]: T };
  ids: string[];
}
