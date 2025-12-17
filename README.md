# xWord - Crossword Solving Aid

A web-based recreation of an AppleSoft BASIC crossword puzzle solving aid, originally written by C.A. Small in April 1988 for the Apple II computer.

## How It Works

### Overview

This program is a crossword puzzle solving aid written in AppleSoft BASIC for the Apple II computer. It maintains a dictionary of words organized by length (3-16 characters) and first-letter groups, allowing users to search for partial words and find anagrams.

### Key Features

- **Dictionary Management:** Add and remove words from a persistent dictionary stored on floppy disk (or RAM disk).
- **Wildcard Search:** Find words matching a pattern where unknown letters are marked with spaces. For example, "C_T" would match CAT, COT, CUT, etc.
- **Anagram Solver:** Find all dictionary words that are anagrams of given letters.

### The Anagram Algorithm

The cleverest part of this code is the anagram detection algorithm (lines 150-190, 25080-25130). Instead of sorting letters and comparing, it uses a mathematical hash:

1. Each letter A-Z is assigned a prime number (A=2, B=3, C=5, D=7, ...)
2. The hash of a word is the sum of LOG values of each letter's prime
3. Two words are anagrams if and only if their hashes match

This is elegant because LOG(a) + LOG(b) = LOG(a×b), and prime factorization is unique. So "CAT" and "ACT" produce the same hash since 5×2×71 = 2×5×71.

### Data Organization

Words are stored in files named L{length}.{bucket} where:

- Length = 3 to 16 characters
- Bucket 1-8 based on first letter: (a-b, c-d, e-g, h-k, l-o, p-r, s, t-z)

This organization speeds up searches by limiting which files need to be scanned.

### BASIC Commands Used

- `HOME` - Clear screen
- `VTAB n / HTAB n` - Position cursor
- `PRINT` - Output text
- `INPUT` - Get user input with prompt
- `GET` - Get single keypress (no Enter needed)
- `CHR$(4)` - ProDOS disk commands prefix
- `PEEK / POKE` - Direct memory access

## Web Implementation

This Svelte-based web app recreates the Apple II experience with:

- Authentic CRT monitor styling with subtle flicker effects
- Rainbow Apple II era logo on the bezel
- Responsive design for mobile devices
- On-screen keyboard for touch devices
- The original AppleSoft BASIC code viewable in-app
