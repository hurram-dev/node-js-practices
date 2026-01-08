import {createHash} from 'node:crypto'

/**
 * Calculates a SHA-256 checksum for a given string.
 *
 * @param {string} str - The input string from which to generate the checksum (UTF8 encoding).
 * @returns {Promise<string>} A promise that resolves with the calculated checksum (HEX string).
 */
export const calculateDirectoryChecksum = async (str: string): Promise<string> => createHash('sha256').update(str, 'utf8').digest('hex');
