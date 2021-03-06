import { ParsedNamed } from "./types.ts";
import {
  CORP_ENTITY,
  GENERATIONS,
  NON_NAME,
  SALUTATIONS,
  SUFFIXES,
  SUPPLEMENTAL_INFO,
  SURNAME_PREFIXES,
} from "./constants.ts";

const reUnwantedChars = /[\.,\/\\]/gi;
const reConsecutiveSpaces = /\s{2,}/;

/**
 * Parse a human name
 * @param name Name to parse
 * @returns Object containing the individual parts of the name
 */
export const parse = (name: string): ParsedNamed => {
  let modifiedName = name;
  const output: ParsedNamed = {
    input: name,

    salutation: null,
    foreName: null,
    middleName: null,
    surName: null,
    generation: null,
    suffix: null,
    aliases: [],

    hasCorporateEntity: false,
    hasNonName: false,
    hasSurNamePrefix: false,
    hasSupplementalInfo: false,
  };

  // Remove unwanted characters
  modifiedName = modifiedName.replace(reUnwantedChars, "");

  // Remove any consecutive spaces
  modifiedName = modifiedName.replace(reConsecutiveSpaces, " ");

  // Split the name into parts
  const namePieces = modifiedName.split(" ");

  // Test each name piece
  let namePiecesIndex = 0;
  while (namePiecesIndex < namePieces.length) {
    let namePiece = namePieces[namePiecesIndex];
    const namePieceUpperCase = namePiece.toUpperCase();

    // Ignore these words
    if (namePiece.toLowerCase() === "the") {
      namePieces.splice(namePiecesIndex, 1);
      continue;
    }

    // Salutation?
    if (output.salutation === null && SALUTATIONS.has(namePieceUpperCase)) {
      output.salutation = namePiece;
      namePieces.splice(namePiecesIndex, 1);
    }

    // Generation?
    if (output.generation === null && GENERATIONS.has(namePieceUpperCase)) {
      output.generation = namePiece;
      namePieces.splice(namePiecesIndex, 1);
    }

    // Suffix?
    if (output.suffix === null && SUFFIXES.has(namePieceUpperCase)) {
      output.suffix = namePiece;
      namePieces.splice(namePiecesIndex, 1);
    }

    // Has LN Prefix?
    if (output.hasSurNamePrefix !== true) {
      output.hasSurNamePrefix = SURNAME_PREFIXES.has(namePieceUpperCase) &&
        namePiecesIndex !== 0;
      if (output.hasSurNamePrefix === true) {
        namePieces[namePiecesIndex] += " " + namePieces[namePiecesIndex + 1];
        namePieces.splice(namePiecesIndex + 1, 1);
        namePiecesIndex++;
        continue;
      }
    }

    // Is a non-name piece?
    let namePieceIsNonName = false;
    // TODO: This doesn't handle the situation where the quote may not be the first or last character
    if (namePiece.indexOf("'") === 0 || namePiece.indexOf('"') === 0) {
      const quote = namePiece[0];

      // Look for the closing quote before we go and mutate the array
      // NOTE: This hurts performance, this will need fixing
      let foundClosingQuotes = false;
      for (
        let forwardIndex = namePiecesIndex;
        forwardIndex < namePieces.length;
        forwardIndex++
      ) {
        foundClosingQuotes = namePieces[forwardIndex].lastIndexOf(quote) > 0;
        if (foundClosingQuotes) {
          break;
        }
      }

      if (foundClosingQuotes) {
        while (namePiece[namePiece.length - 1] !== quote) {
          namePieces[namePiecesIndex] += " " + namePieces[namePiecesIndex + 1];
          namePieces.splice(namePiecesIndex + 1, 1);

          // Is there a terminating quote else in `namePiece`?
          const lastIndexOfQuote = namePiece.lastIndexOf(quote);
          if (lastIndexOfQuote > 0) {
            const pieceToExtract = namePieces[namePiecesIndex].substring(
              lastIndexOfQuote + 1,
            );
            namePieces.splice(
              namePiecesIndex + 1,
              0,
              ...pieceToExtract.split(" "),
            );
            namePieces[namePiecesIndex] = namePiece.substring(
              0,
              lastIndexOfQuote + 1,
            );
          }

          namePiece = namePieces[namePiecesIndex];
        }
      } else {
        // Put a quote at the end since it'll get removed in few lines anyway
        namePiece += quote;
      }

      output.hasNonName = true;
      namePieceIsNonName = true;
      namePiece = namePiece.substring(1, namePiece.length - 1);
    } else if (NON_NAME.has(namePieceUpperCase)) {
      output.hasNonName = true;
      namePieceIsNonName = true;
      namePiece = namePieces[namePiecesIndex + 1];
      namePieces.splice(namePiecesIndex, 1);

      if (namePiece.toLowerCase() === "the") {
        namePieces[namePiecesIndex] += " " + namePieces[namePiecesIndex + 1];
        namePieces.splice(namePiecesIndex + 1, 1);
        namePiece = namePieces[namePiecesIndex];
      }
    } else if (output.hasNonName === null) {
      output.hasNonName = false;
    }

    if (namePieceIsNonName === true) {
      output.aliases!.push(namePiece);
      namePieces.splice(namePiecesIndex, 1);
    }

    // Has corporate entity?
    if (output.hasCorporateEntity !== true) {
      output.hasCorporateEntity = CORP_ENTITY.has(namePieceUpperCase);
    }

    // Has supplemental info?
    if (output.hasSupplementalInfo !== true) {
      output.hasSupplementalInfo = SUPPLEMENTAL_INFO.has(namePieceUpperCase);

      if (output.hasSupplementalInfo === true) {
        namePieces.splice(namePiecesIndex, 1);
      }
    }

    // Increment index
    namePiecesIndex++;
  }

  // First Name
  output.foreName = namePieces[0]; // TODO - What if the array is empty?
  namePieces.splice(0, 1);

  // The rest
  if (namePieces.length > 1) {
    output.middleName = namePieces.splice(0, namePieces.length - 1).join(" ");
  }

  // Last Name
  output.surName = namePieces[0];

  // Return parsed information
  return output;
};
