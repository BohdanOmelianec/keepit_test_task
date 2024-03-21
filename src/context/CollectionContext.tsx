import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { ChildrenArray, Collection, Entity, EntityType, IFolder } from '../appTypes';

interface IDefaultValue {
  collection: Collection;
  files: ChildrenArray;
  currentEntity: Entity | null;
  pathnames: string[];
  createEntity: (type: EntityType, name: string) => void;
  renameEntity: (type: EntityType, name: string) => void;
  deleteEntity: (name: string) => void;
  setCurrentEntity: React.Dispatch<React.SetStateAction<Entity | null>>;
}

const storage: Collection | null = localStorage.getItem('collection')
  ? JSON.parse(localStorage.getItem('collection') || '')
  : null;

const root: Collection = storage || {
  name: 'My files',
  created: Date.now(),
  type: 'folder',
  children: [],
};

const defaultValue: IDefaultValue = {
  collection: root,
  files: [],
  currentEntity: null,
  pathnames: [],
  createEntity: () => {},
  renameEntity: () => {},
  deleteEntity: () => {},
  setCurrentEntity: () => {},
};
const CollectionContext = createContext(defaultValue);

const getFolderFiles = (collection: Collection, paths: string[]): ChildrenArray => {
  try {
    if (paths.length <= 1 || collection.children.length === 0) return collection.children;

    const newFiles = paths.slice(1).reduce((acc: ChildrenArray, curr: string) => {
      const a = acc.find((item) => item.name === curr);
      return (a as IFolder).children;
    }, collection.children);
    return newFiles;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const CollectionProvider = ({ children }: PropsWithChildren) => {
  const [collection, setCollection] = useImmer(root);
  const [files, setFiles] = useImmer<ChildrenArray>([]);
  const [currentEntity, setCurrentEntity] = useState<Entity | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = useMemo(
    () =>
      decodeURI(location.pathname)
        .split('/')
        .filter((x) => x)
        .map((x) => x.replaceAll('-', ' ')),
    [location.pathname]
  );

  useEffect(() => {
    if (pathnames.length === 0) {
      navigate('/my-files');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const childrenArray = getFolderFiles(collection, pathnames);
    setFiles(childrenArray);

    localStorage.setItem('collection', JSON.stringify(collection));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection, pathnames]);

  const createEntity = (type: 'folder' | 'file', name: string) => {
    if (type === 'folder') {
      setCollection((prev) => {
        const children = getFolderFiles(prev, pathnames);
        children.push({
          name: name,
          created: Date.now(),
          type,
          children: [],
        });
      });
    } else {
      setCollection((prev) => {
        const children = getFolderFiles(prev, pathnames);
        children.push({
          name: name,
          created: Date.now(),
          type,
        });
      });
    }
  };

  const deleteEntity = (itemToDelete: string) => {
    setCollection((prev) => {
      const children = getFolderFiles(prev, pathnames);
      const index = children.findIndex((item) => item.name === itemToDelete);
      children.splice(index, 1);
    });
  };

  const renameEntity = (_: EntityType, newName: string) => {
    setCollection((prev) => {
      const children = getFolderFiles(prev, pathnames);
      const item = children.find((item) => item.name === currentEntity!.name);
      item!.name = newName;
    });
  };

  const value = {
    collection,
    files,
    currentEntity,
    pathnames,
    createEntity,
    renameEntity,
    deleteEntity,
    setCurrentEntity,
  };

  return (
    <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
  );
};

export default CollectionProvider;

export const useCollection = () => {
  return useContext(CollectionContext);
};
