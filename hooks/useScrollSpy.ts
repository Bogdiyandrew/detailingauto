// hooks/useScrollSpy.ts
'use client';

import { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (sectionIds: string[], options?: IntersectionObserverInit) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isInitialLoadRef = useRef(true); // Folosim un ref pentru a urmări încărcarea inițială

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Găsim ultima intrare care este vizibilă, pentru a prioritiza secțiunile de mai jos
      const intersectingEntry = entries.reverse().find(entry => entry.isIntersecting);

      if (intersectingEntry) {
        // Verificăm dacă suntem la începutul paginii. Dacă da, nu setăm nimic.
        if (window.scrollY < 100 && isInitialLoadRef.current) {
          setActiveSection(null);
        } else {
          setActiveSection(intersectingEntry.target.id);
          isInitialLoadRef.current = false; // După primul scroll, permitem actualizarea
        }
      }
    };

    // Opțiuni mai precise: detectează exact la linia de mijloc a ecranului
    const observerOptions = options || {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const currentObserver = observerRef.current;

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        currentObserver.observe(element);
      }
    });

    // Adăugăm un listener pentru a reseta starea la scroll înapoi sus
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection(null);
        isInitialLoadRef.current = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          currentObserver.unobserve(element);
        }
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, options]);
  
  // Efectul pentru actualizarea URL-ului
  useEffect(() => {
    // Verificăm să nu fim la încărcarea inițială sau la scroll 0
    if (activeSection && window.scrollY > 100) {
      const newUrl = `${window.location.pathname}#${activeSection}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    } else {
      // Curățăm hash-ul din URL dacă suntem în secțiunea Hero
      window.history.replaceState({ path: window.location.pathname }, '', window.location.pathname);
    }
  }, [activeSection]);

  return activeSection;
};