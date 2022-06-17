
//constructor
template <typename T>
class AssList
{
public:
   Node<T>* mHead;
   Node<T>* mTail;
   int mCount;
   
};

//adds new nodes to new list
void makeSets(linkedList oldList, linkedList newList, int minFrequ)
{
   Node<T>* temp1;
   Node<T>* temp2;
   Node<T>* newListTemp = newList.mHead;
   temp2 = oldList.mHead;
   
   while(temp2->mNext != NULL)
   {
      temp1 = temp2;
      temp2 = temp2->mNext;
      
      if(isSame(temp1, temp2))
         if(newList.mHead == NULL)
            newList.mHead = makeNewNode(temp1, temp2);
         else
         {
            newListTemp = newListTemp->mNext;
            newListTemp = makeNewNode(temp1, temp2);
         }
   }
}

//adds data to the new node
Node<T> makeNewNode(Node<T>* temp1, Node<T>* temp2)
{
   Node<T>* newNode = new Node<T>;
   newNode->mSize = size + 1;

   for(int i = 0; i < size; i++)
   {
      newNode->mData[i] = temp1->mData[i]
   }
   newNode->mData[newNode->mSize - 1] = temp2->mData[temp2->mSize - 1];
   
}

//checks to see if all elements in sets are the same except for last element
bool isSame(Node<T>* temp1, Node<T>* temp2)
{
   bool theSame = true;
   
   for(int i = 0; i < temp1->mSize; i++)
   {
      if(temp1->mData[i] != temp2->mData[i] && i < temp1->mSize - 1)
         theSame = false;
   }
   
   return theSame;
}

void Apriori::prune()
{
	Node<T>* currNode = newList.getHead();
	Node<T>* lastNode; //prevouse node
	while(currNode != NULL)
	{
   	for(int i = 0; i < oldList.mCount; i++)
   	{
   			for(int j = 0; j < currNode->mSize; j++)
   			{
   				T* subset = new T[mSize - 1];  //one less of currNode
   				for(int k = 0; k < mSize - 1; k++)
   				{
   					if(k < j)
   					{
   						subset[k] = currNode->mSet[k];
   					}				
                           if(k > j)
   					{
   						subset[k] = currNode->mSet[k + 1];
   					}
   				}
   				Node* subsetNode = new Node(subset);
   				if(!oldList.checkListForNode(subsetNode))
   				{
   					Node* tmp = currNode;
   					currNode = currNode.mNext;
   					if(i == 0) mHead = currNode;
   					else lastNode.mNext = currNode;
   					delete tmp;
   			}
   		}
   	}
   	lastNode = currNode;
   	currNode = currNode->mNext;;
	}
}