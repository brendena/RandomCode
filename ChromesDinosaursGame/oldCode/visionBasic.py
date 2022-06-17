#feed the video in
import numpy as np
#like the only package to 
#grab a image the screen with
#https://stackoverflow.com/questions/43520757/imagegrab-alternative-in-linux
import pyscreenshot as ImageGrab
import cv2
import time
from getkey import getkey
import os
import pytesseract
import pyautogui
try:
    import Image
except ImportError:
    from PIL import Image

resetImage = cv2.imread('endGameImage.jpg',0)

def findImage(image):
    #Template
    global resetImage
    res = cv2.matchTemplate(image,resetImage,cv2.TM_CCOEFF_NORMED)
    threshold = 0.8
    loc = np.where(res >= threshold)
    print(loc)
    return loc

def main():
    global resetImage
    frames = 30
    frameCount = 0
    fScreenWidth =  1280
    while(True):
        print("going through")
        #screen area 
        screen = ImageGrab.grab(bbox=(fScreenWidth + 690,130,fScreenWidth + 1310, 280)) # X1,Y1,X2,Y2
        screen = np.asanyarray(screen)
        loc = findImage(screen)
        #if(len(loc) != 0):

        pyautogui.keyDown("space")

        time.sleep(.001)

        pyautogui.keyUp("space")

        #just your score
        subImage = screen[0:20, 530:-1]
        pilImage =  Image.fromarray(subImage)
        screenText = pytesseract.image_to_string(pilImage, config="-c tessedit_char_whitelist=0123456789 -psm 6") #only want to match numbers
        
        print(int(screenText))

        if frameCount > frames:
            break
        frameCount = frameCount + 1
        #keys = getkey()
        #if 'T' in keys:
        #    break

main()


    
# got to get the score
# ocr 
# template matching
# https://www.pyimagesearch.com/2017/07/17/credit-card-ocr-with-opencv-and-python/
# teseract
# https://www.pyimagesearch.com/2017/07/03/installing-tesseract-for-ocr/
# python tesseract
# https://pypi.python.org/pypi/pytesseract


#checklist
#grabing image
#grabing score
#grabing reset icon

#make sure i remember
# that the dynisore game has to be
# on my setup with a 1980 screen


#screen = cv2.resize(screen, (480,270))
#print(screen.shape)
'''
        w, h = resetImage.shape[::-1]
        loc = findImage(screen)
        for pt in zip(*loc[::-1]):
            cv2.rectangle(screen,
             pt, (pt[0] + w, pt[1] + h), (0,255,255), 2)

cv2.imshow("Gray", subImage)
        cv2.waitKey(0)
'''