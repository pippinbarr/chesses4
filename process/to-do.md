# To-do

## Slow
- ~~The animation works in a strange way that leaves a huge pause before the sound and turn change, is it some kind of easing? Looks like it may be fixable by using the onMoveEnd, or by removing the 1.1 multiplier I seem to have on the sound effect. But really why would I not base it on the event.~~

## Amazon
- Handle the case where all queens are captured leading to a Black win

## Personal
- Investigate modifying chessboard.js to include a DIV (or span?) around chess piece img and to animate that instead so that I could add stuff to pieces dynamically/on startup (such as the label for pieces in Personal) -- it's sort of "surface doable" but maybe be "technically hellish"?

## Knights
- Moving a king turns them into a knight?
- Currently doesn't check for check etc. and I think it has to to be genuinely of interest - the king moving as a knight is especially weird for this?

## Less and less
- I still don't know the answer, but it is apparently fixed by reloading the game from its own FEN after every change? ~~Turns out chess.js freaks out when you randomly remove pieces over time?? WHY?~~
- There's still some stuff to work out around check and checkmate because you could technically evade check/checkmate via multiple moves -- so need to be able to ignore the rules and then check for them when I want to?
- Should probably only be checkmate if you finish a turn in check(or mate)?