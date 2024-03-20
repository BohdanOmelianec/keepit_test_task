export type EntityType = 'file' | 'folder';

export interface IFile {
  name: string;
  created: number;
  type: 'file';
}
export interface IFolder {
  name: string;
  created: number;
  type: 'folder';
  children: ChildrenArray;
}

export type Entity = IFile | IFolder;
export type ChildrenArray = Entity[];
export type Collection = IFolder;
