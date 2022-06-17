import tflearn 
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.estimator import regression
from tflearn.data_preprocessing import ImagePreprocessing
from tflearn.data_augmentation import ImageAugmentation
from tflearn.data_utils import image_preloader
import numpy as np
import pickle
from helperFunction import network
#https://medium.com/@husseinjaafar/my-first-cnn-in-tflearn-1019f88485f3
#load the data
dataset_file = './dataFirstAttempt.pickle'
data = pickle.load( open(dataset_file, "rb" ) )
#formate it to the proper size
#imageSize 140 610
# converting to 70 305
print(data[0][0].shape)
#didn't work for some reason
#the star in * make zip, unzip
#unzipped = zip(*data)
result = ([ a for a,b in data ], [ b for a,b in data ])
X = np.asarray(result[0])
Y = np.asarray(result[1])

#X = np.reshape(X, (-1, 70, 61))
#X = np.lib.pad(X, (0,3), 'constant', constant_values=(0, 0))
print(len(X))
X = np.resize(X, (2209,70,122,1))
X = X.astype(np.float64)
#X = empty = np.empty((2209,64,64,1), dtype=np.float64)

print(X[0].shape)
print(X[0])

#'''



myNetwork = network()
model = tflearn.DNN(myNetwork, tensorboard_verbose=3, tensorboard_dir='Logs')
model.fit(X,Y,  n_epoch=5, snapshot_step=500, show_metric=True, run_id='cells')#validation_set=0.1,
model.save('./Saved_Model/UneditedModel.model')
#'''

#print(model.predict([X[0]]))