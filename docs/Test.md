# Test Cases - Platformer Game

**Application:** L3 Platformer Game  
**Test Method:** Manual Testing

---

## Test Summary

| Total Tests | Passed | Failed |
|-------------|--------|--------|
| 5 | 5 | 0 |

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

### TC2: Player Movement and Jump
**Requirement:** FR1, FR2  
**Description:** Player moves with A/D keys and jumps with Space  
**Steps:**
1. Start game
2. Press A key (move left)
3. Press D key (move right)
4. Press Space (jump)

**Input:** A, D, Space keys  
**Expected Result:** Player moves left, right, and jumps correctly  
**Actual Result:** ✅ Pass

---

### TC3: Coin Collection and Score
**Requirement:** FR4, FR5, FR6  
**Description:** Collecting coins increases score displayed on screen  
**Steps:**
1. Start game
2. Move player to touch a coin
3. Observe score display

**Input:** Move player into coin  
**Expected Result:** Coin disappears, score increases by 10, displays on screen  
**Actual Result:** ✅ Pass

---

### TC4: Level Progression
**Requirement:** FR9, FR10  
**Description:** Reaching 20 points advances to next level  
**Steps:**
1. Start game
2. Collect 2 coins (20 points)
3. Observe level change

**Input:** Collect coins until score = 20  
**Expected Result:** Level 2 loads with new layout  
**Actual Result:** ✅ Pass

---

### TC5: Pause Menu and Background Music
**Requirement:** FR16, FR18  
**Description:** Menu opens with M, music starts with D  
**Steps:**
1. Start game
2. Press D key for music
3. Press M key for menu
4. Click "Resume"

**Input:** D key, M key, click Resume  
**Expected Result:** Music plays, menu opens and closes correctly  
**Actual Result:** ✅ Pass

---

## Test Environment

- **Browser:** Chrome
- **OS:** Windows 11 
- **Date:** October 20, 2025

---

## Conclusion

All 5 test cases passed successfully. The game meets core functional requirements including player controls, coin collection, level progression, menu system, and audio playback.

---

## Requirements Coverage

| Requirement | Test Case | Status |
|-------------|-----------|--------|
| FR1, FR2 (Movement, Jump) | TC2 | ✅ Pass |
| FR4, FR5, FR6 (Coins, Score) | TC3 | ✅ Pass |
| FR9, FR10 (Progression) | TC4 | ✅ Pass |
| FR15 (Start) | TC1 | ✅ Pass |
| FR16, FR18 (Menu, Music) | TC5 | ✅ Pass |