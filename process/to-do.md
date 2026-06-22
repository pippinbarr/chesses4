# To-do

## Slow
- ~~The animation works in a strange way that leaves a huge pause before the sound and turn change, is it some kind of easing? Looks like it may be fixable by using the onMoveEnd, or by removing the 1.1 multiplier I seem to have on the sound effect. But really why would I not base it on the event.~~

## Amazon
- Handle the case where all queens are captured leading to a Black win

## Personal
- Investigate modifying chessboard.js to include a DIV (or span?) around chess piece img and to animate that instead so that I could add stuff to pieces dynamically/on startup (such as the label for pieces in Personal) -- it's sort of "surface doable" but maybe be "technically hellish"?