# To-do

## General
- Font size stuff for different devices? E.g. on iPhone XR it line breaks Less N Less

## Slow
- ~~The animation works in a strange way that leaves a huge pause before the sound and turn change, is it some kind of easing? Looks like it may be fixable by using the onMoveEnd, or by removing the 1.1 multiplier I seem to have on the sound effect. But really why would I not base it on the event.~~
- Trying 15 seconds on for size ~~Remember to slow it back down (10? 20? 30?)~~

## Amazon
- ~~Handle checkmate properly with validation stuff~~
- ~~Handle the case where all queens are captured leading to a Black win~~

## Knights
- This went away at some point ~~Moving a king turns them into a knight?~~

- Currently doesn't check for check etc. and I think it has to to be genuinely of interest - the king moving as a knight is especially weird for this?

## Less N Less
- I still don't know the answer, but it is apparently fixed by reloading the game from its own FEN after every change? ~~Turns out chess.js freaks out when you randomly remove pieces over time?? WHY?~~
- And a shake added too ~~Need the popping sound~~

- There's still some stuff to work out around check and checkmate because you could technically evade check/checkmate via multiple moves -- so need to be able to ignore the rules and then check for them when I want to?
- Should probably only be checkmate if you finish a turn in check(or mate)?
- Seem to be losing en passant due to fen() and reloading (may be endemic)

## Travelator
- To do with the order of effects in a for loop that was both removing and adding pieces, needed to separate ~~A piece vanished when I was testing -- seems to be if there are two on the right edge, the first one just goes away!~~

- There are presumably check and other issues in here

## Correspondence

## Match 3
- Pretty sure there are check and mate issues to investigate

## Tick Tock
- Pretty sure there are check and mate issues to investigate
- Needs a clock sound for the ticks and tocks

# 😭 Gave up on

## Personal
- Investigate modifying chessboard.js to include a DIV (or span?) around chess piece img and to animate that instead so that I could add stuff to pieces dynamically/on startup (such as the label for pieces in Personal) -- it's sort of "surface doable" but maybe be "technically hellish"?

**Gave up** 