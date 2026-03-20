"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultCollectionId } from "@/lib/constants";
import { Collection } from "@/lib/types";
import { readCollections, writeCollections } from "@/lib/storage";

type CollectionsContextType = {
  collections: Collection[];
  createCollection: (name: string) => string;
  toggleFavorite: (slideId: string, collectionId?: string) => void;
  moveSlide: (slideId: string, targetCollectionId: string) => void;
  removeSlide: (slideId: string, collectionId: string) => void;
  isFavorited: (slideId: string) => boolean;
  getCollectionForSlide: (slideId: string) => string | null;
};

const CollectionsContext = createContext<CollectionsContextType | null>(null);

export function CollectionsProvider({ children }: { children: ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(readCollections());
  }, []);

  useEffect(() => {
    if (collections.length > 0) {
      writeCollections(collections);
    }
  }, [collections]);

  const value = useMemo<CollectionsContextType>(() => {
    function createCollection(name: string) {
      const id = `collection-${Date.now()}`;
      const nextCollection: Collection = {
        id,
        name,
        slideIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCollections((current) => [...current, nextCollection]);
      return id;
    }

    function toggleFavorite(slideId: string, collectionId = defaultCollectionId) {
      setCollections((current) => {
        const hasSlide = current.some((collection) => collection.slideIds.includes(slideId));
        if (hasSlide) {
          return current.map((collection) =>
            collection.slideIds.includes(slideId)
              ? {
                  ...collection,
                  slideIds: collection.slideIds.filter((id) => id !== slideId),
                  updatedAt: new Date().toISOString(),
                }
              : collection,
          );
        }

        const exists = current.some((collection) => collection.id === collectionId);
        if (!exists) return current;

        return current.map((collection) =>
          collection.id === collectionId
            ? {
                ...collection,
                slideIds: [...collection.slideIds, slideId],
                updatedAt: new Date().toISOString(),
              }
            : collection,
        );
      });
    }

    function moveSlide(slideId: string, targetCollectionId: string) {
      setCollections((current) =>
        current.map((collection) => {
          const cleanedIds = collection.slideIds.filter((id) => id !== slideId);
          if (collection.id === targetCollectionId) {
            return {
              ...collection,
              slideIds: cleanedIds.includes(slideId) ? cleanedIds : [...cleanedIds, slideId],
              updatedAt: new Date().toISOString(),
            };
          }
          return {
            ...collection,
            slideIds: cleanedIds,
            updatedAt: collection.slideIds.length !== cleanedIds.length ? new Date().toISOString() : collection.updatedAt,
          };
        }),
      );
    }

    function removeSlide(slideId: string, collectionId: string) {
      setCollections((current) =>
        current.map((collection) =>
          collection.id === collectionId
            ? {
                ...collection,
                slideIds: collection.slideIds.filter((id) => id !== slideId),
                updatedAt: new Date().toISOString(),
              }
            : collection,
        ),
      );
    }

    function isFavorited(slideId: string) {
      return collections.some((collection) => collection.slideIds.includes(slideId));
    }

    function getCollectionForSlide(slideId: string) {
      return collections.find((collection) => collection.slideIds.includes(slideId))?.id ?? null;
    }

    return {
      collections,
      createCollection,
      toggleFavorite,
      moveSlide,
      removeSlide,
      isFavorited,
      getCollectionForSlide,
    };
  }, [collections]);

  return <CollectionsContext.Provider value={value}>{children}</CollectionsContext.Provider>;
}

export function useCollections() {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error("useCollections must be used within CollectionsProvider");
  }
  return context;
}
