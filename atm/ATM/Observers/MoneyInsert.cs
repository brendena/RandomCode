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

namespace ATM.Observers
{
    class MoneyInsertObserver : InterfaceUiElements
    {
        CurrentMoney _currentMoney;
        /// <summary>
        ///  This Class manages inserting money.
        ///  On creation it create a specific amount of buttons to 
        ///  allow insertion of money.
        /// </summary>
        public MoneyInsertObserver(State currentState, CurrentMoney currentMoney, int x, int y) : base(currentState, x, y)
        {
            _currentMoney = currentMoney;
            for (int i = 1; i < 5; i++)
            {
                
                Button button = new Button();
                button.Click += this.InsertCoinClicked;

                _currentState.UiInitHelperConstructor(button,  (i *5) + "",
                                        new System.Drawing.Point(x, y + (100 * i)),
                                        new System.Drawing.Size(100, 100));

                _uiItems.Add(button);

                Console.WriteLine("asdf");
            }
            
        }

        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose: It will disable and enable based on the amount of money
         *      you have.
         *      *********************************************************/
        public override void Update(CurrentMoney currentMoney)
        {
            Console.WriteLine("MoneyInsertObserver got updated");
            foreach (Button button in _uiItems)
            {
                if (_currentMoney.getMoneyLeft() < Int32.Parse(button.Text))
                {
                    button.Enabled = false;
                }
                else {
                    button.Enabled = true;
                }
            }
        }

        /*      Pre:  attach to UI button *     
         *      Post:  updates the rest of the ui with changes in _currentMoney*  
         *      Purpose: To change _currentMoney on the input size of button
         *      *********************************************************/
        private void InsertCoinClicked(object sender, EventArgs e)
        {
            Button btn = sender as Button;
            _currentMoney.MoneySpent += Int32.Parse(btn.Text);
            Console.WriteLine("clicked Button");
        }


    }
}
