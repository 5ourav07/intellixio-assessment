"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";

const CONTEXT_ERROR =
  "useUserAgentContext must be used within a UserAgentProvider";

type UserAgent = string;

type UserAgentContextType = {
  userAgent: UserAgent | undefined;
};

type UserAgentProviderProps = {
  children: ReactNode;
  initialUserAgent?: UserAgent; // Define the prop
};

const UserAgentContext = createContext<UserAgentContextType | undefined>(
  undefined
);

export const useUserAgentContext = (): UserAgentContextType => {
  const context = useContext(UserAgentContext);
  if (context === undefined) {
    throw new Error(CONTEXT_ERROR);
  }
  return context;
};

export const UserAgentProvider: React.FC<UserAgentProviderProps> = ({
  children,
  initialUserAgent,
}) => {
  const [userAgent, setUserAgent] = useState<UserAgent | undefined>(
    initialUserAgent
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(window.navigator.userAgent);
    }
  }, []);

  const value = useMemo<UserAgentContextType>(
    () => ({
      userAgent,
    }),
    [userAgent]
  );

  return (
    <UserAgentContext.Provider value={value}>
      {children}
    </UserAgentContext.Provider>
  );
};
