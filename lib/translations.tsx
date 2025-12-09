"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Messages = Record<string, any>;

const TranslationContext = createContext<{
  messages: Messages;
  locale: string;
}>({
  messages: {},
  locale: "en",
});

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Messages>({});
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    let savedLang = localStorage.getItem("language");
    
    // If no language is saved, set English as default
    if (!savedLang) {
      savedLang = "en";
      localStorage.setItem("language", "en");
    }
    
    setLocale(savedLang);
    
    import(`../messages/${savedLang}.json`)
      .then((module) => setMessages(module.default))
      .catch((error) => {
        console.error("Error loading translations:", error);
        import(`../messages/en.json`).then((module) => setMessages(module.default));
      });
  }, []);

  return (
    <TranslationContext.Provider value={{ messages, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const { messages } = useContext(TranslationContext);
  
  return (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const keys = fullKey.split(".");
    let value: any = messages;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || fullKey;
  };
}

