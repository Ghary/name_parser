export type ParsedNamed = {
  input: string;

  salutation?: string | null;
  foreName?: string | null;
  middleName?: string | null;
  surName?: string | null;
  generation?: string | null;
  suffix?: string | null;
  aliases: string[];

  hasCorporateEntity: boolean;
  hasNonName: boolean;
  hasSurNamePrefix: boolean;
  hasSupplementalInfo: boolean;
};
