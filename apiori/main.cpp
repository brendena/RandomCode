#include "source/header.h"

using namespace std;
/*
Memory problem with Linked list
*/
int main()
{
    //average of transaction length: 5, 20, 25
    //number of distinct items: 100, 500, 1000
    //number of transactions: 1000, 10000, 100000
    //minimum support threshold: 0.25%, 0.5%, 1%, 10%, 25%
    
    float percentage[5] = {0.25f, 0.5f, 1.0f, 10.0f, 25.0f};
    int transactionsNum;
    bool running = true;
    
    
    cout << "program started \n\n";
    
    Apriori<int> test;
    //loops through transaction lengths
    for(transactionsNum = 1000; i <= 100000; transactionsNum *= 10)
    {
        //loops through support threshold percentages
        for(int i = 0; i < 1; i++) //!!!!turn into 5
        {
            test.setCountTransactions(transactionsNum);// probably should make a constructor for all this data.
            test.fillStartingData("testdata.txt");  
            test.setFrequencyThreshold(percentage[i]);
            test.cFirstCandList();
            test.purge();
            test.print(to_string(transactionsNum) + "_" + to_string(percentage[i]) + " outputfile.txt");
            
            ofstream ofs; //clear the file
			ofs.open(to_string(transactionsNum) + "_" + to_string(percentage[i]) + " outputfile.txt");
			ofs << "\n";
			ofs.close();
            
            if(test.getCount() > 0)
			{
                test.makeSets();
                test.purge();
			}
            while(test.getCount() > 0)
            {
                test.makeSets();
                test.prune();
                test.purge();
                test.print(to_string(transactionsNum) + "_" + to_string(percentage[i]) + " outputfile.txt"); //overright data!!!!!!!!!
            }
            //after here we can start looping throught the possibilities
            test.clearAll();
        }
    }
    cout << "\n\nprogram ended fixed \n\n";
    
    // to solve error
    // http://stackoverflow.com/questions/2902064/how-to-track-down-a-double-free-or-corruption-error-in-c-with-gdb 
    return 0;
}
