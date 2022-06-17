import numpy as np
import cv2
import time
from helperFunction import findImage, getScore, getImage, getRandomAction, jump


def mse(imageA, imageB):
	# the 'Mean Squared Error' between the two images is the
	# sum of the squared difference between the two images;
	# NOTE: the two images must have the same dimension
	err = np.sum((imageA.astype("float") - imageB.astype("float")) ** 2)
	err /= float(imageA.shape[0] * imageA.shape[1])
	
	# return the MSE, the lower the error, the more "similar"
	# the two images are
	return err

def main():
    fgbg = cv2.createBackgroundSubtractorMOG2()
    time.sleep(1)
    currentImage = getImage()
    actionLineX = 70
    jumpPoint = 230
    while (True):
        jumpYet = False
        currentImage = getImage()
        #get the 
        fgmask = fgbg.apply(currentImage)
        #remove most of the background
        fgmask = cv2.medianBlur(fgmask,5)
        
        #countours are the points that make a shape/line
        im2, contours, hierarchy = cv2.findContours(fgmask,cv2.RETR_TREE,cv2.CHAIN_APPROX_NONE)

        for cnt in contours:
            #create a hit box like in video games
            x,y,w,h = cv2.boundingRect(cnt)
            if(actionLineX < x ):
                cv2.rectangle(fgmask,(x,y),(x+w,y+h),(255,255,0),2)
                if(jumpPoint > x):
                    if(jumpYet == False and w > 5):
                        jump()
                        jumpYet = True   

        
        cv2.imshow('frame',fgmask)
        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break





main()
