# Requirements Specification

## Vision

A browser-based 2D platformer game where players navigate through 5 levels by collecting coins, avoiding obstacles.
## Functional Requirements

### Player Controls
- **FR1:** Player can move left (A key) and right (D key)
- **FR2:** Player can jump (Space key)
- **FR3:** Player affected by gravity and collision detection

### Coin Collection & Scoring
- **FR4:** Coins can be collected by touching them
- **FR5:** Each coin gives 10 points
- **FR6:** Score displayed on screen at all times
- **FR7:** Score persists across levels

### Level Progression
- **FR8:** Game has 5 distinct levels
- **FR9:** Reaching 20 points advances to next level
- **FR10:** Each level has unique layout and challenges

### Platform Types
- **FR11:** Static platforms for standing
- **FR12:** Moving platforms (horizontal and vertical)
- **FR13:** Vanishing platforms that disappear on contact
- **FR14:** Deadly obstacles that reset the game

### User Interface
- **FR15:** Start button to begin game
- **FR16:** Pause menu (M key) with Resume and Reset Score options
- **FR17:** Controls instructions visible to user

### Audio
- **FR18:** Background music can be started (D key)
- **FR19:** Music loops continuously

## Non-Functional Requirements

### Performance
- **NFR1:** Works on modern browsers (Chrome, Firefox, Safari, Edge)
- **NFR2:** Page loads within 2 seconds

### Code Quality
- **NFR3:** Object-oriented design with classes
- **NFR4:** Small functions (average under 15 lines)
- **NFR5:** No TobbeTrollkar numbers - all constants named
- **NFR6:** Private fields for encapsulation

