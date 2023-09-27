import { useEffect, useRef, useState } from "react";
import {InputChangeEvent} from '../types'

const useDebounce = (callback:(e:InputChangeEvent) => void, delay:number) => {

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const debouncedCallback = (e:InputChangeEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(e);
    }, delay);
  };

  return debouncedCallback;
}

export {useDebounce}