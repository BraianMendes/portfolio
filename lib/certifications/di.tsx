"use client";

import type { ReactNode } from "react";
import type { CertificationsFilterFacade } from "@/lib/certifications/configurator";

import React, { createContext, useContext, useMemo } from "react";

import { createCertificationsFilterFacade } from "@/lib/certifications/configurator";

export type CertificationsFilterFactory = () => CertificationsFilterFacade;

const CertificationsFilterFactoryContext =
  createContext<CertificationsFilterFactory | null>(null);

export function useCertificationsFilterFactory(): CertificationsFilterFactory {
  const ctx = useContext(CertificationsFilterFactoryContext);

  return ctx ?? createCertificationsFilterFacade;
}

export function CertificationsDIProvider({
  children,
  filterFactory,
}: {
  children: ReactNode;
  filterFactory?: CertificationsFilterFactory;
}) {
  const factory = useMemo(
    () => filterFactory ?? createCertificationsFilterFacade,
    [filterFactory],
  );

  return (
    <CertificationsFilterFactoryContext.Provider value={factory}>
      {children}
    </CertificationsFilterFactoryContext.Provider>
  );
}

export default CertificationsDIProvider;
