# Test Cases - Platformer Game

**Application:** L3 Platformer Game  
**Test Date:** October 2025  
**Test Method:** Manual Testing

---

## Test Summary

| Total Tests | Passed | Failed |
|-------------|--------|--------|
| 10 | 10 | 0 |

---

## Test Cases

### TC1: Start Game
**Requirement:** FR15  
**Description:** User can start the game  
**Steps:**
1. Open application in browser
2. Click "Start" button

**Input:** Click start button  
**Expected Result:** Game starts, player appears, start button disappears  
**Actual Result:** ✅ Pass

---

### TC2: Player Movement Left/Right
**Requirement:** FR1  
**Description:** Player moves with A and D keys  
**Steps:**
1. Start game
2. Press A key
3. Press D key

**Input:** A key (left), D key (right)  
**Expected Result:** Player moves left with A, right with D  
**Actual Result:** ✅ Pass

---

### TC3: Player Jump
**Requirement:** FR2  
**Description:** Player jumps with Space key  
**Steps:**
1. Start game
2. Press Space bar

**Input:** Space key  
**Expected Result:** Player jumps upward and falls back down  
**Actual Result:** ✅ Pass

---

### TC4: Coin Collection
**Requirement:** FR4, FR5  
**Description:** Collecting coins increases score  
**Steps:**
1. Start game
2. Move player to touch a coin

**Input:** Move player into coin  
**Expected Result:** Coin disappears, score increases by 10  
**Actual Result:** ✅ Pass

---

### TC5: Score Display
**Requirement:** FR6  
**Description:** Score is visible on screen  
**Steps:**
1. Start game
2. Observe top-left corner

**Input:** Visual observation  
**Expected Result:** Score displays as "score: 0" initially  
**Actual Result:** ✅ Pass

---

### TC6: Level Progression
**Requirement:** FR9  
**Description:** Reaching 20 points loads next level  
**Steps:**
1. Start game
2. Collect 2 coins (20 points)

**Input:** Collect coins until score = 20  
**Expected Result:** Level automatically changes, new platforms appear  
**Actual Result:** ✅ Pass

---

### TC7: Pause Menu
**Requirement:** FR16  
**Description:** Press M to open pause menu  
**Steps:**
1. Start game
2. Press M key

**Input:** M key  
**Expected Result:** Menu appears with "Resume" and "Reset Score" buttons  
**Actual Result:** ✅ Pass

---

### TC8: Resume Game
**Requirement:** FR16  
**Description:** Resume button closes menu  
**Steps:**
1. Open pause menu (M key)
2. Click "Resume" button

**Input:** Click Resume  
**Expected Result:** Menu closes, game continues  
**Actual Result:** ✅ Pass

---

### TC9: Background Music
**Requirement:** FR18, FR19  
**Description:** Music starts with D key and loops  
**Steps:**
1. Start game
2. Press D key
3. Wait for music to loop

**Input:** D key  
**Expected Result:** Music plays and loops continuously  
**Actual Result:** ✅ Pass

---

### TC10: Platform Collision
**Requirement:** FR3, FR11  
**Description:** Player lands on platforms  
**Steps:**
1. Start game
2. Jump onto platform
3. Observe player behavior

**Input:** Jump and land on platform  
**Expected Result:** Player stops falling and stands on platform  
**Actual Result:** ✅ Pass

---

## Test Environment

- **Browser:** Chrome 119
- **OS:** Windows 11 / macOS
- **Screen Resolution:** 1920x1080
- **Date:** October 20, 2025

---

## Conclusion

All 10 test cases passed successfully. The game meets all core functional requirements including player movement, coin collection, level progression, menu system, and audio playback.

---

## Requirements Coverage

| Requirement | Test Case | Status |
|-------------|-----------|--------|
| FR1 (Movement) | TC2 | ✅ Pass |
| FR2 (Jump) | TC3 | ✅ Pass |
| FR3 (Collision) | TC10 | ✅ Pass |
| FR4, FR5 (Coins) | TC4 | ✅ Pass |
| FR6 (Score Display) | TC5 | ✅ Pass |
| FR9 (Progression) | TC6 | ✅ Pass |
| FR15 (Start) | TC1 | ✅ Pass |
| FR16 (Menu) | TC7, TC8 | ✅ Pass |
| FR18, FR19 (Music) | TC9 | ✅ Pass |