import { type Readable, writable } from 'svelte/store';

export interface Counter {
    cash: number;
    year?: number;
    month: number;
    position?: Position;
    gamePhase: number;
 }

 export interface Position {
    ticker: string;
    shares: number;
 }
 
 export interface AuthStore extends Readable<Counter> {
    beginGame: (year: number, month: number) => void;
    deductBalance: (amount: number) => void;
    debitBalance: (amount: number) => void;
    stepMonth: () => void;
    setPosition: (position: Position) => void;
    closePosition: () => void;
    reset: () => void;
 }
 
 const initStore = (): AuthStore => {
    const initialCounter: Counter = {
       cash: 100000,
       gamePhase: 0,
       month: 0,
    };
 
    const { subscribe, set, update } =
       writable(initialCounter);
 
    return {
       subscribe,
       deductBalance: (amount: number) =>
        update(({ cash, ...rest }) => ({
          ...rest,
          cash: cash - amount,
       })),
       debitBalance: (amount: number) =>
        update(({ cash, ...rest }) => ({
             ...rest,
            cash: cash + amount,
        })),
       beginGame: (year: number, month: number) =>
          update(({ gamePhase, ...rest }) => ({
             ...rest,
             year: year,
             month: month,
             gamePhase: gamePhase + 1
          })),
        stepMonth: () => 
            update(({ month, year,...rest }) => {
            if(month == 11 ) {
                return {
                    ...rest,
                    month: 0,
                    year: year! + 1,
                }
            } else {
                return {
                    ...rest,
                    month: month + 1,
                    year: year
                };
            }
        }),
        setPosition: (position: Position) => 
            update(({ ...rest }) => ({
                ...rest,
                position: position
            })),
        closePosition: () => 
            update(({ ...rest }) => ({
                ...rest,
                position: undefined
            })),
       reset: () => set(initialCounter)
    };
 };
 
 export const counter = initStore();