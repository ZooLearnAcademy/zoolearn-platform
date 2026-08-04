import { atom } from "jotai";
import { Organism } from "../components/deep-dive";
import deepDiveData from "../data/deep-dive-organisms.json";

// Atom to store the list of organisms
// Initialized with the placeholder JSON data. When backend is connected, this will be updated via setOrganisms.
export const organismsAtom = atom<Organism[]>(deepDiveData as Organism[]);

// Atom to manage the loading state when fetching from backend
export const isOrganismsLoadingAtom = atom<boolean>(false);
