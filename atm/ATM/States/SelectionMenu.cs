/*
Author: "Brenden Adamczak, Ethan Konczai, Dan Havener"
Class: 340-01
Assignment: Final Project
Date Assigned: 9/05/2015
Date:  12/5/2015


Description:  
    The application is desgined to allow a user to select some type of coffee based on his 
amount of money and see what it looks like.

Certification of Authenticity: 
    I certify that this is entirely my own work, except where I have given fully-documented 
references to the work of others. I understand the definition and consequences of plagiarism and acknowledge 
that the assessor of this assignment may, for the purpose of assessing this assignment:
    - Reproduce this assignment and provide a copy to another member of
        academic staff; and/or
    - Communicate a copy of this assignment to a plagiarism checking service (which may then retain a 
        copy of this assignment on its database for the purpose of future plagiarism checking)

*/

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ATM.States;
using ATM.Observers;


namespace ATM.States
{
    class SelectionMenu : State
    {

        /// <summary>
        /// Selection Menu is all the ui to allow people to insert coins
        /// and select there item.
        /// </summary>
        private Control _ui;
        private StateManager _stateManager;
        ~SelectionMenu()
        {
            Console.WriteLine("SelectionMenu destroyed \n");
        }


        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose:  Set up all the differnt interfaces and 
         *      connects them to CurrentMoney Observer
         *      *********************************************************/
        public SelectionMenu(StateManager stateManager) :   base(stateManager)
        {
            _ui = ui;
            _stateManager = stateManager;


            CurrentMoney currentMoneyUpdater = new CurrentMoney(100, 0);
            currentMoneyUpdater.Attach(new ListOptions(this, stateManager, 100, 100));
            currentMoneyUpdater.Attach(new MoneyInsertObserver(this, currentMoneyUpdater, 500, 0));
            currentMoneyUpdater.Attach(new DisplayCurrentMoney(this, 800, 100));
            currentMoneyUpdater.Attach(new ReffundUI(this, currentMoneyUpdater, 200, 600));
            currentMoneyUpdater.Attach(new CreditCardUi(this, 800, 500));
            currentMoneyUpdater.Notify();
        }


    }
}
