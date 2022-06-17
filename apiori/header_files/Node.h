#ifndef NODE_H
#define NODE_H

#include <iostream>
using namespace std;


template <typename T>
struct Node
{
//data
   T*  mData;
   int mSize;
   Node<T> *mNext;
//functions
   bool fantasticOperatorComparison(Node<T>* right);
//constructors and destructors
   Node();
   Node(int size);
   Node(int size, T data);
   Node(int size, T* data, int ass);
   ~Node();
};

template <typename T>
Node<T>::~Node()
{
    delete [] mData;
}

template <typename T>
Node<T>::Node()
{
    mData = NULL;
	mNext = NULL;
}

template <typename T>
Node<T>::Node(int size)
{
	mSize = size;
	mData = new T[size+1];
	mNext = NULL;	
}

template <typename T>
Node<T>::Node(int size, T value)
{
    mSize = size;
    mData = new T[size + 1];
    mData[0] = value;
    mNext = NULL;
}
template <typename T>
Node<T>::Node(int size, T* value, int ass)
{
    mData = value;
    mSize = size;
}

template <typename T>
bool Node<T>::fantasticOperatorComparison(Node<T>* right)
{
    for(int i = 0; i < mSize; i++)
    {
        if(mData[i] != right->mData[i])
        {
            return false;
        }
    }
    return true;
}


#endif

