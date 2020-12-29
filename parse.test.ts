import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { parse } from "./parse.ts";

Deno.test("should parse a simple name", function () {
  const nameParts = parse("John Jacob");

  // Parse results
  assertEquals(nameParts.input, "John Jacob");
  assertEquals(nameParts.foreName, "John");
  assertEquals(nameParts.surName, "Jacob");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a simple name, whose first name matches a LN Prefix", function () {
  const nameParts = parse("Ben Franklin");

  // Parse results
  assertEquals(nameParts.input, "Ben Franklin");
  assertEquals(nameParts.foreName, "Ben");
  assertEquals(nameParts.surName, "Franklin");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a simple name with a single middle name", function () {
  const nameParts = parse("Neil Patrick Harris");

  // Parse results
  assertEquals(nameParts.input, "Neil Patrick Harris");
  assertEquals(nameParts.foreName, "Neil");
  assertEquals(nameParts.middleName, "Patrick");
  assertEquals(nameParts.surName, "Harris");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a spaced surname", function () {
  const nameParts = parse("Otto Von Bismark");

  // Parse results
  assertEquals(nameParts.input, "Otto Von Bismark");
  assertEquals(nameParts.foreName, "Otto");
  assertEquals(nameParts.surName, "Von Bismark");
  assertEquals(nameParts.hasSurNamePrefix, true);

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse an apostrophe surname", function () {
  const nameParts = parse("Scarlett O'Hara");

  // Parse results
  assertEquals(nameParts.input, "Scarlett O'Hara");
  assertEquals(nameParts.foreName, "Scarlett");
  assertEquals(nameParts.surName, "O'Hara");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a generation name", function () {
  const nameParts = parse("Thurston Howell III");

  // Parse results
  assertEquals(nameParts.input, "Thurston Howell III");
  assertEquals(nameParts.foreName, "Thurston");
  assertEquals(nameParts.surName, "Howell");
  assertEquals(nameParts.generation, "III");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test('should parse a generation name designated by the word "the"', function () {
  const nameParts = parse("Thurston Howell the 3rd");

  // Parse results
  assertEquals(nameParts.input, "Thurston Howell the 3rd");
  assertEquals(nameParts.foreName, "Thurston");
  assertEquals(nameParts.surName, "Howell");
  assertEquals(nameParts.generation, "3rd");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a generation name designated by the spelled out word", function () {
  const nameParts = parse("Thurston Howell Third");

  // Parse results
  assertEquals(nameParts.input, "Thurston Howell Third");
  assertEquals(nameParts.foreName, "Thurston");
  assertEquals(nameParts.surName, "Howell");
  assertEquals(nameParts.generation, "Third");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test('should parse a generation name designated by the word "the" and the spelled out generation', function () {
  const nameParts = parse("Thurston Howell the Third");

  // Parse results
  assertEquals(nameParts.input, "Thurston Howell the Third");
  assertEquals(nameParts.foreName, "Thurston");
  assertEquals(nameParts.surName, "Howell");
  assertEquals(nameParts.generation, "Third");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a single alias name", function () {
  const nameParts = parse("Bruce Wayne a/k/a Batman");

  // Parse results
  assertEquals(nameParts.input, "Bruce Wayne a/k/a Batman");
  assertEquals(nameParts.foreName, "Bruce");
  assertEquals(nameParts.surName, "Wayne");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases[0], "Batman");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a nick name with one word", function () {
  const nameParts = parse('"Stonecold" Steve Austin');

  // Parse results
  assertEquals(nameParts.input, '"Stonecold" Steve Austin');
  assertEquals(nameParts.foreName, "Steve");
  assertEquals(nameParts.surName, "Austin");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases[0], "Stonecold");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a nick name with two word", function () {
  const nameParts = parse('Dwayne "The Rock" Johnson');

  // Parse results
  assertEquals(nameParts.input, 'Dwayne "The Rock" Johnson');
  assertEquals(nameParts.foreName, "Dwayne");
  assertEquals(nameParts.surName, "Johnson");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases[0], "The Rock");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a nick name with many spaces", function () {
  const nameParts = parse('"The Nature Boy" Ric Flair');

  // Parse results
  assertEquals(nameParts.input, '"The Nature Boy" Ric Flair');
  assertEquals(nameParts.foreName, "Ric");
  assertEquals(nameParts.surName, "Flair");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases[0], "The Nature Boy");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a multiple aliases", function () {
  const nameParts = parse(
    '"The People\'s Champion" Mohammed "Louisville Lip" Ali aka The Greatest',
  );

  // Parse results
  assertEquals(
    nameParts.input,
    '"The People\'s Champion" Mohammed "Louisville Lip" Ali aka The Greatest',
  );
  assertEquals(nameParts.foreName, "Mohammed");
  assertEquals(nameParts.surName, "Ali");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases[0], "The People's Champion");
  assertEquals(nameParts.aliases[1], "Louisville Lip");
  assertEquals(nameParts.aliases[2], "The Greatest");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse supplemental information", function () {
  const nameParts = parse('Philip Francis "The Scooter" Rizzuto, deceased');

  // Parse results
  assertEquals(
    nameParts.input,
    'Philip Francis "The Scooter" Rizzuto, deceased',
  );
  assertEquals(nameParts.foreName, "Philip");
  assertEquals(nameParts.middleName, "Francis");
  assertEquals(nameParts.surName, "Rizzuto");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases[0], "The Scooter");
  assertEquals(nameParts.hasSupplementalInfo, true);

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
});

Deno.test("should parse a name with multiple middle names", function () {
  const nameParts = parse("George Herbert Walker Bush");
  assertEquals(nameParts.foreName, "George");
  assertEquals(nameParts.middleName, "Herbert Walker");
  assertEquals(nameParts.surName, "Bush");
});

Deno.test('should parse a name with a last name prefix of "St"', function () {
  const nameParts = parse("Michael St. James III");

  // Parse results
  assertEquals(nameParts.foreName, "Michael");
  assertEquals(nameParts.surName, "St James");
  assertEquals(nameParts.generation, "III");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.middleName, null);
  assertEquals(nameParts.suffix, null);
  assertEquals(nameParts.aliases.length, 0);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasNonName, false);
  assertEquals(nameParts.hasSurNamePrefix, true);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test('should parse a name with a last name prefix of "Saint"', function () {
  // Same test, but this time with "Saint" instead of "St"
  const nameParts = parse("Michael Saint James III");
  assertEquals(nameParts.foreName, "Michael");
  assertEquals(nameParts.surName, "Saint James");
  assertEquals(nameParts.generation, "III");
});

// Deno.test('should parse a Saint\'s name', function() {
//   const nameParts = parse('St. Francis of Assisi');

//   // Parse results
//   assertEquals(nameParts.salutation, 'St');
//   assertEquals(nameParts.foreName, 'Francis');
//   assertEquals(nameParts.hasNonName, true);
//   assertEquals(nameParts.aliases[0], 'Assisi');

//   // Members not used for this result
//   assertEquals(nameParts.surName, null);
//   assertEquals(nameParts.generation, null);
//   assertEquals(nameParts.middleName, null);
//   assertEquals(nameParts.suffix, null);

//   // Flags
//   assertEquals(nameParts.hasCorporateEntity, false);
//   assertEquals(nameParts.hasSurNamePrefix, false);
//   assertEquals(nameParts.hasSupplementalInfo, false);
// });

// Deno.test('should parse a name with extraneous information', function() {
//   //John Doe fictitious husband of Jane Doe
// });

// Deno.test('should parse a name an Arabic name', function() {
//   const nameParts = parse('Saleh ibn Tariq ibn Khalid al-Fulan');
//   assertEquals(nameParts.foreName, 'Saleh');
//   // assertEquals(nameParts.childOf[0], 'Tariq'); // TODO: needs to be implemented
//   // assertEquals(nameParts.childOf[0], 'Khalid'); // TODO: needs to be implemented
//   assertEquals(nameParts.surName, 'Fulan'); // or is it "al-Fulan"?

//   // Notes
//   // ibn, bin, bint = "son of"
//   // ibnat, bint, bte. = "daughter of"
//   // abu = "father of"
//   // umm = "mother of"
// });

Deno.test("Should handle unterminated quotes in a name", function () {
  const nameParts = parse("John 'o Doe");
  assertEquals(nameParts.foreName, "John");
  assertEquals(nameParts.surName, "'o Doe");
});

Deno.test("should parse a name with a middle name then alias afterwards", function () {
  const nameParts = parse('Neil Patrick "NPH" Harris');

  // Parse results
  assertEquals(nameParts.input, 'Neil Patrick "NPH" Harris');
  assertEquals(nameParts.foreName, "Neil");
  assertEquals(nameParts.middleName, "Patrick");
  assertEquals(nameParts.surName, "Harris");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases.length, 1);
  assertEquals(nameParts.aliases[0], "NPH");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

Deno.test("should parse a name with an alias then middle name afterwards", function () {
  const nameParts = parse('Neil "NPH" Patrick Harris');

  // Parse results
  assertEquals(nameParts.input, 'Neil "NPH" Patrick Harris');
  assertEquals(nameParts.foreName, "Neil");
  assertEquals(nameParts.middleName, "Patrick");
  assertEquals(nameParts.surName, "Harris");
  assertEquals(nameParts.hasNonName, true);
  assertEquals(nameParts.aliases.length, 1);
  assertEquals(nameParts.aliases[0], "NPH");

  // Members not used for this result
  assertEquals(nameParts.salutation, null);
  assertEquals(nameParts.generation, null);
  assertEquals(nameParts.suffix, null);

  // Flags
  assertEquals(nameParts.hasCorporateEntity, false);
  assertEquals(nameParts.hasSurNamePrefix, false);
  assertEquals(nameParts.hasSupplementalInfo, false);
});

// GitHub Issue #5
Deno.test("should handle incorrect spacing with quotes", function () {
  const nameParts = parse('Quotes "And"Ã¢â‚¬â€¹ Spaces');
  assertEquals(nameParts.foreName, "Quotes");
  assertEquals(nameParts.surName, "Spaces");
  assertEquals(nameParts.aliases.length, 1);
  assertEquals(nameParts.aliases[0], "And");
});

// GitHub Issue #6
Deno.test("should handle an unterminated double quote in a name", function () {
  const nameParts = parse('John P. "Typo Doe Sr.');
  assertEquals(nameParts.foreName, "John");
  assertEquals(nameParts.middleName, "P");
  assertEquals(nameParts.aliases.length, 1);
  assertEquals(nameParts.aliases[0], "Typo");
  assertEquals(nameParts.surName, "Doe");
  assertEquals(nameParts.generation, "Sr");
});
