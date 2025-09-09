import type { Certification } from "@/types/domain";

import { z } from "zod";

const certificationSchema = z.object({
  id: z.number(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  slug: z.string(),
  certificateUrl: z.string().optional(),
});

const certificationsSchema = z.array(certificationSchema);

export interface ICertificationsRepository {
  getAll(): Promise<Certification[]>;
}

export class CertificationsRepository implements ICertificationsRepository {
  async getAll(): Promise<Certification[]> {
    const data = (await import("@/app/certifications/certifications.json"))
      .default as unknown;

    const parsed = certificationsSchema.safeParse(data);

    if (!parsed.success) {
      const message = parsed.error.issues
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join("; ");

      throw new Error(`Invalid certifications.json: ${message}`);
    }

    return parsed.data as Certification[];
  }
}

export const certificationsRepository = new CertificationsRepository();
