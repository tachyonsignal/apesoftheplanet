import { type Readable, writable } from 'svelte/store';

export interface Counter {
    cash: number;
    year?: number;
    gamePhase: number;
 }
 
 export interface AuthStore extends Readable<Counter> {
    beginGame: (year: number) => void;
    reset: () => void;
 }
 
 const initStore = (): AuthStore => {
    const initialCounter: Counter = {
       cash: 100000,
       gamePhase: 0,
    };
 
    const { subscribe, set, update } =
       writable(initialCounter);
 
    return {
       subscribe,
       beginGame: (year: number) =>
          update(({ gamePhase, ...rest }) => ({
             ...rest,
             year: year,
             gamePhase: gamePhase + 1
          })),
       reset: () => set(initialCounter)
    };
 };
 
 export const counter = initStore();