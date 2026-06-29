# To-do

## General
- I tweaked it to be smaller and less beautiful? ~~Font size stuff for different devices? E.g. on iPhone XR it line breaks Less N Less~~
- I'm pretty clearly pursuing the Hard Mode of this ~~A generally big question about checking for check pre-move or not, disallowing moves into check with unconventional stuff (e.g. simulating the move and seeing if it ends in check)~~
- Yeah I don't think I give a shit. ~~I guess I never checked for insufficient material? Seems ok~~
- ~~Oh en passant, so sad~~

## Slow
- ~~The animation works in a strange way that leaves a huge pause before the sound and turn change, is it some kind of easing? Looks like it may be fixable by using the onMoveEnd, or by removing the 1.1 multiplier I seem to have on the sound effect. But really why would I not base it on the event.~~
- Trying 15 seconds on for size ~~Remember to slow it back down (10? 20? 30?)~~

## Amazon
- ~~Handle checkmate properly with validation stuff~~
- ~~Handle the case where all queens are captured leading to a Black win~~

## Knights
- This went away at some point ~~Moving a king turns them into a knight?~~
- Fairly sure I've solved this? ~~Currently doesn't check for check etc. and I think it has to to be genuinely of interest - the king moving as a knight is especially weird for this?~~

## Less N Less
- I still don't know the answer, but it is apparently fixed by reloading the game from its own FEN after every change? ~~Turns out chess.js freaks out when you randomly remove pieces over time?? WHY?~~
- And a shake added too ~~Need the popping sound~~
- Yup ~~Seem to be losing en passant due to fen() and reloading (may be endemic - looks like it)~~
- ~~Handle check and checkmate? Could you disappear a piece into checkmate? Is that... funny?~~
- No fun ~~Might need to disallow certain disappearing pieces which I think makes not much sense... though does mean you could lose in really weird ways, so maybe more thought~~
- ~~Edge case: You get checkmated but then the checkmating piece vanishes (or do we argue for the idea that you're still mated on that players turn? It seems to funny to lose the idea of your mating piece popping away...)~~

## Travelator
- To do with the order of effects in a for loop that was both removing and adding pieces, needed to separate ~~A piece vanished when I was testing -- seems to be if there are two on the right edge, the first one just goes away!~~
- I... think I got there... ~~There are presumably check and other issues in here (will need the same kind of "simulation" approach as in Knights). Need to decide whether it's legible to disallow certain moves because they yield check? I think yes.~~

## Correspondence

## Match 3
- Looks like it works (if I don't look too hard?) ~~Pretty sure there are check and mate issues to investigate. Need to simulate this? Or do you pretty much have to have captures/matching away the king here? *Are* there even captures in Match 3? If not then impossible to ever win probably. Might be able to do a simulation approach? Can't perform a match that leaves you in check? But matching their king wins of course.~~

## Tick Tock
- ~~Needs a clock sound for the ticks and tocks~~
- Way better ~~Improve sound to have subticks~~
- ~~Should probably only be checkmate if you finish a turn in check(or mate)? Increasingly think this is the only way... don't let the kind move into check in the usual way, but do just allow capture king for win~~

# 😭 Gave up on

## Personal
- Investigate modifying chessboard.js to include a DIV (or span?) around chess piece img and to animate that instead so that I could add stuff to pieces dynamically/on startup (such as the label for pieces in Personal) -- it's sort of "surface doable" but maybe be "technically hellish"?

**Gave up** 