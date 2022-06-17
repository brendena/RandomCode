import tflearn 
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.estimator import regression
from tflearn.data_preprocessing import ImagePreprocessing
from tflearn.data_augmentation import ImageAugmentation
from tflearn.data_utils import image_preloader
import numpy as np
#https://medium.com/@husseinjaafar/my-first-cnn-in-tflearn-1019f88485f3
#load the data
dataset_file = ‘C:/Users/Lenovo/dir2/CNN/Cell_Images’
#formate it to the proper size
X, Y = image_preloader(dataset_file, image_shape=(64, 64), mode=’folder’, categorical_labels=True, normalize=True)
X = np.reshape(X, (-1, 64, 64,1))
img_prep = ImagePreprocessing()
img_prep.add_featurewise_zero_center()
img_prep.add_featurewise_stdnorm()



convnet = input_data(shape=[None,64,64,1], data_preprocessing=img_prep, name=’input’)


#convolutional layers and pooling layers
convnet = conv_2d(convnet, 32, 2, activation=’relu’)
convnet = max_pool_2d(convnet,2)
convnet = conv_2d(convnet, 64, 2, activation=’relu’)
convnet = max_pool_2d(convnet,2)
#fully connected layer and dropout
convnet = fully_connected(convnet, 512, activation=’relu’)
convnet = dropout(convnet, 0.6)
#output layer and regression layer
convnet = fully_connected(convnet,2,activation=’softmax’)