import numpy as np
import pyscreenshot as ImageGrab
import cv2
import time
import pytesseract
import pyautogui
import random
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.estimator import regression
from tflearn.data_preprocessing import ImagePreprocessing
from tflearn.data_augmentation import ImageAugmentation
from tflearn.data_utils import image_preloader
try:
    import Image
except ImportError:
    from PIL import Image

def findImage(imageToFind, image):
    res = cv2.matchTemplate(image,imageToFind,cv2.TM_CCOEFF_NORMED)
    threshold = 0.9
    loc = np.where(res >= threshold)
    #print(loc)
    returnObject = {"foundImage": False,"loc": loc}
    if(len(loc[0]) > 0):
        returnObject["foundImage"] = True
    return returnObject

def getScore(image):
    try :
        subImage = image[0:20, 530:-1]
        pilImage =  Image.fromarray(subImage)
        screenText = pytesseract.image_to_string(pilImage, config="-c tessedit_char_whitelist=0123456789 -psm 6") #only want to match numbers
        return int(screenText)
    except:
        return 0
                                          
def getImage():
    fScreenWidth =  1280
    screen = ImageGrab.grab(bbox=(fScreenWidth + 690,130,fScreenWidth + 1300, 270)) # X1,Y1,X2,Y2
    screen = np.asanyarray(screen)
    return screen

def getRandomAction():
    num = random.randrange(0,2)
    if num == 0:
        pyautogui.keyDown("space")
        return [0,1]
    else:
        pyautogui.keyUp("space")
        return [1,0]
    
def resetGame():
    pyautogui.keyUp("space")
    pyautogui.keyDown("space")
    time.sleep(0.01)
    pyautogui.keyUp("space")
    pyautogui.keyDown("space")
    time.sleep(0.01)

def jump():
    pyautogui.keyDown("space")
    pyautogui.keyUp("space")


def network():
    img_prep = ImagePreprocessing()
    img_prep.add_featurewise_zero_center()
    img_prep.add_featurewise_stdnorm()
    convnet = input_data(shape=[None,70,122,1], name='input') #, data_preprocessing=img_prep
    #where are these 32 and 2 things coming from
    convnet = conv_2d(convnet, 32, 2, activation='relu',padding="same")
    convnet = max_pool_2d(convnet,2)
    convnet = conv_2d(convnet, 64, 2, activation='relu',padding="same")
    convnet = max_pool_2d(convnet,2)
    #fully connected layer and dropout
    convnet = fully_connected(convnet, 512, activation='relu')
    convnet = dropout(convnet, 0.6)
    #output layer and regression layer
    convnet = fully_connected(convnet,2,activation='softmax')

    convnet = regression(convnet, optimizer='adam', learning_rate=0.001, loss='categorical_crossentropy', name='targets')
    return convnet

def performAction(action):
    if(action == 0):
        pyautogui.keyDown("space")
    else:
        pyautogui.keyUp("space")