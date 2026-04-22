"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import BookingModal from "@/components/layout/BookingModal";

type BookingContextType = {
  openBooking: () => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextType>({
  openBooking: () => {},
  closeBooking: () => {},
});

/**
 * Wrap the app (inside NextIntlClientProvider so useTranslations
 * works in the modal) and any client component can call
 * `useBooking().openBooking()` to launch the GHL calendar.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = useCallback(() => setIsOpen(true), []);
  const closeBooking = useCallback(() => setIsOpen(false), []);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
