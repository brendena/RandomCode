/*
errorlog
possible error with bool Operator++

*/
#ifndef LINKED_LIST
#define LINKED_LIST

#include <iostream>
#include <stdlib.h> //atio
#include "Node.h"
using namespace std;

template <class T>
class LinkedList
{
    private:
        Node<T> *mHead, *mTail, *iterator;
        int     mCount;
    public:
    
    //getters
    	int  getCount();  //works
    	T    getData(int index);
    	Node<T>* getHead(){ return mHead;};
  
    	
    //setters
    	void setData(int index, T data);
		void createArray(int size);
    	void setArrayData(int index, int data);
    	void setHead(Node<T>* joe);
    	
 	//utilities
    	void clear();
    	void display();
    	bool isEmpty();
    	bool dealWithAddingValuesToBeginning(Node<T>* value);
    	void appendToTheEnd(Node<T>* value);
    	bool search(T value);
    	void print(string fileName);
    	bool searchForNode(Node<T>*  bob);
		void deleteByIndex(int index);
    	
    //dealing with iterator
    	void clearIterator();
		int getIteratorSize();
		T* getIteratorValue();
		
    //operator//constructors
    	T operator[](int index);
    	bool operator++(int value); /************ added the int value and it compiled May not work *********************/
    	
    	void operatorEquals(LinkedList<T>& other);
    	
    	LinkedList();
    	~LinkedList();
    	
};

template <class T>
LinkedList<T>::LinkedList()
{
	mHead = NULL;
	mTail = NULL;
	iterator = NULL;
	mCount = 0;
}

template <class T>
LinkedList<T>::~LinkedList()
{
   clear();
}

template <class T>
int LinkedList<T>::getCount()
{
	return mCount;
}

template <class T>
T LinkedList<T>::getData(int index)
{
	Node<T>* ptrIterator = mHead;
	for (int i = 0; i < index; i++)
	{
		ptrIterator = ptrIterator->mNext;
	}
	return ptrIterator->mData;
}

template <class T>
void LinkedList<T>::setData(int index, T data)  ///doesn't work
{
	if (mCount < index)
	{ 
		cout << "this is a no no " << endl; 
	}
	else if (mHead == NULL)
	{
		mHead = new Node<T>(data);
		mTail = mHead;
		mCount++;
	}
	else{
		Node<T>* tmp = mHead;
		for (int i = 0; tmp->mNext != NULL && index == i; i++)//get the node right before the index
		{
			tmp = tmp->mNext;
		}
	}
}


template <class T>
void LinkedList<T>::clear()  
{
	if(mHead != NULL)
	{
		Node<T> *nodePtr = mHead;
		Node<T> *garbage;
		while(nodePtr != NULL)
		{
		  //garbage keeps track of node to be deleted
		  garbage = nodePtr;
		  //move on to the next node, if any
		  nodePtr = nodePtr->mNext;
		  delete garbage;
		}
	}
	mHead = mTail = NULL;
	mCount = 0;
}


template <class T>
T LinkedList<T>::operator[](int index)
{
	Node<T>* ptrIterator = mHead;
	for (int i = 0; i < index && ptrIterator->mNext != NULL; i++)
	{
		ptrIterator = ptrIterator->mNext;
	}
	return ptrIterator->mData;
}


/*
pre:
Post:
Purpose: is to keep a position
*/
template <class T>
bool LinkedList<T>::operator++(int value)
{
	
	if(isEmpty())
	{
		return 0;
	}
	else
	{
		iterator = iterator->mNext;
	}
	if(iterator == NULL)
	{
		return 0;
	}
	else
	{
		return 1;
	}
	
	//return false;  this works
}

template <class T>
bool LinkedList<T>::isEmpty()
{
	return mHead == NULL;
}

/*
pre:size of the array
Post: is to then add the items to the array
purpose:
the purpose is to make the tail ready to add the elements to.  
We want the tail to be ready because where allways going to be adding onto the tail.
*/
template <class T>
void LinkedList<T>::createArray(int size)
{
	Node<T>* newNode = new Node<T>(size);
	appendToTheEnd(newNode);
}
template <class T>
void LinkedList<T>::setArrayData(int index, int data)
{
	mTail->mData[index] = data;
}


template <class T>
void LinkedList<T>::clearIterator()
{
	iterator = mHead;
}

template <class T>
int LinkedList<T>::getIteratorSize()
{
	return iterator->mSize;	
}

template <class T>
T* LinkedList<T>::getIteratorValue()
{
	return iterator->mData;
}

/*
pre: just a value
post:  return a true if its been added else returns false
purpose:  is to create the first 2 values of the linked list

// might be a problem if the number come up twice first go////////
*/
template <class T>
bool LinkedList<T>::dealWithAddingValuesToBeginning(Node<T>* value)
{
	if(mHead == NULL)
	{
		mHead = value;
		mTail = mHead;
		mCount++;
		return true;
	}
	else if(mHead == mTail)
	{
		mHead->mNext = value;
		mTail = mHead->mNext;
		mCount++;
		return true;
	}
	return false;
}

template <class T>
void LinkedList<T>::appendToTheEnd(Node<T>* value)
{
	if(!dealWithAddingValuesToBeginning(value))
	{
		mTail->mNext = value;
		mTail = mTail->mNext;
		mCount++;
	}
}
/*
Pre: search for a item in the linkedList
Post: return true if found
Purpose: find if the items was added to the newList first go
*/
template <class T>
bool LinkedList<T>::search(T value)
{
	Node<T>* ptr = mHead;

	while(ptr != NULL)
	{
		for(int i = 0; i < ptr->mSize; i++)
		{
			if(value == ptr->mData[i])
			{
				return true;
			}
		}
		ptr = ptr->mNext;
	}
	return false;
}

template <typename T>
bool LinkedList<T>::searchForNode(Node<T>* keyNode)
{
	Node<T>* currNode = mHead;
	for(int i = 0; i < mCount; i++)
	{
		if(currNode->fantasticOperatorComparison(keyNode))
		{
			return true;
		}
		currNode = currNode->mNext;
	}
	return false;
}

template <class T>
void LinkedList<T>::display()
{
	Node<T>* ptr = mHead;
	cout << "\ndisplay\n";
	for (int i = 0; ptr != NULL; i++)
	{
		cout << "\n\n\nobjects number " << i << endl;
		for(int i = 0; i < ptr->mSize; i++)
		{
			cout << "data " << ptr->mData[i] << endl;
		}
		ptr = ptr->mNext;
	}
}
/*
pre:
post: 
purpose: to copy the linked list to another array
*/
template <class T>
void LinkedList<T>::operatorEquals(LinkedList<T>& other)
{
	clear();
	mHead = other.getHead();
	mCount = other.getCount();
}

/*
don't we want the frequency count when we print out

leave a extra \n at the end of the print output.txt
*/
template <class T>
void LinkedList<T>::print(string fileName)
{
	ofstream myfile;
	myfile.open (fileName, ios::app); //mHead.mCount + 
	Node<T>* ptr = mHead;
	while(ptr != NULL)
	{
		myfile << ptr->mData[0];
		for(int i = 1; i < ptr->mSize; i++)
		{
			myfile << "  " << ptr->mData[i];
		}
		myfile << "\n\n\n\n";
		ptr = ptr->mNext;
	}
	
}
/*
if you setHead to NULL and then clear, you set all the values to 0 or NULL
*/
template <class T>
void LinkedList<T>::setHead(Node<T>* joe)
{
	mHead = joe;
}

template <class T>
void LinkedList<T>::deleteByIndex(int index)
{
	Node<T>* ptr;
	if(index >= mCount) //index greater then count
	{
		cout << "went over bounds\n";
	}
	else if(mHead->mNext == NULL && index == 0)
	{
		delete mHead;
		mHead = NULL;
		mCount--;
	}
	else if(index == 0)
	{
		ptr = mHead->mNext;
		delete mHead;
		mHead = ptr;
		mCount--;
	}
	else
	{
		ptr = mHead;
		for(int i = 0; i < index - 1; i++) //iterate through until element before index
		{
			ptr = ptr->mNext;
		}
		Node<T>* deleteJunkNode = ptr->mNext;
		if(index == mCount -1) //is the tail
		{
			ptr->mNext = NULL;
			mTail = ptr;
		}
		else
		{
			ptr->mNext = deleteJunkNode->mNext;
		}
		delete deleteJunkNode;
		mCount--;
	}
}

#endif