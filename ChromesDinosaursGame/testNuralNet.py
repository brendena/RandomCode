import random
import numpy as np
import tflearn
import cv2
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.estimator import regression
from statistics import median, mean
from collections import Counter        
from helperFunction import network,findImage, getScore, getImage, getRandomAction, resetGame, performAction
#load model and the neural net
import time
resetImage = cv2.imread('endGameImage.jpg',0)
def main():
    myNetwork = network()
    model = tflearn.DNN(myNetwork)
    model.load('./Saved_Model/UneditedModel.model')
    time.sleep(1)
    while(True):
        while(True):
            print("going through")
            screen = getImage()
            screenNumpy = screen.copy()
            screenNumpy.resize(1,70,122,1)
            screenNumpy = screenNumpy.astype(np.float64)
            prediction = model.predict(screenNumpy)
            action = np.argmax(prediction[0])
            print(action)
            print(model.predict(screenNumpy))
            performAction(action)
            if(findImage(resetImage, screen)["foundImage"] == True):
                print("breaking")
                break
        while(True):
            screen = getImage()
            if(findImage(resetImage, screen)["foundImage"] == False):
                print("no more reset icon")
                break
            resetGame()
            
main()