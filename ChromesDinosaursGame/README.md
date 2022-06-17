# extremely preliminary code

# Best Scores
- Humman - 645
- openCV - 620
- Neural Network - 128 - currently it just is always jumping

## goal

The goal is to create an ai that can play the little chrome dinosaurs game. 

## Neural Network Attempt

1. opencv to match image and get high score
2. tensorflow to create a CNN neural network

# notes
I can't upload the data because a hour of data is around 700 mbytes.



## Just OpenCV Attempt

1. grab the image
2. background subsctraction which gets the changes between two frames
3. then i use a medianBlur to get ride of all the smaller items
4. Then i get the bounding box of all the shapes left
5. Then if any of the large shapes are between these two points, then the player jumps

#### to do
- figure out the arc of the player.
- make sure the group of cactuses are grouped togther
- Then i can probably use Linear Algebra, to calculate whether or not i'm going to hit the cactus 
- the only potential problem is that the arc changes with every 100 point you gain.  So i'll have to figure that out
- for the speed i can use the pixel change in the cactuses?

