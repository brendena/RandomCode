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
using System.IO;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Newtonsoft.Json;
using ATM.States;


namespace ATM.Observers
{
    class ListOptions : InterfaceUiElements
    {
        private List<CoffeeName> _currentCoffeOffers;
        private StateManager _stateManager;

        /// <summary>
        ///  This class outputs the list of options that the client can buy.
        ///  
        /// </summary>
        public ListOptions(State currentState, StateManager stateManager, int x, int y) : base(currentState, x, y)
        {
            _stateManager = stateManager;
            _currentCoffeOffers = new LoadCoffeeOptions().getListCoffee();
            int i = 0;
            foreach (CoffeeName coffee in _currentCoffeOffers) {


                Button button = new Button();
                button.Click += this.selectedCoffeeClicked;
                button.Tag = coffee.Name;
                _currentState.UiInitHelperConstructor(button,coffee.Name + " Price " + coffee.Price,
                                        new System.Drawing.Point(x, y + (100 * i)),
                                        new System.Drawing.Size(100, 100));

                _uiItems.Add(button);
                i++;
            }

        }
        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose: Enables the button if the price is to low.
         *      *********************************************************/
        public override void Update(CurrentMoney currentMoney) {
            int i = 0;
            foreach (Button button in _uiItems) {
                if (_currentCoffeOffers[i].Price > currentMoney.MoneySpent)
                {
                    button.Enabled = false;
                }
                else
                {
                    button.Enabled = true;
                }
                Console.WriteLine("price " + currentMoney.MoneySpent);
                i++;
            }
            Console.WriteLine("ListOptions got updated");
        }

        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose: Get the value of the button and will send it the next state.
         *      *********************************************************/

        public void selectedCoffeeClicked(object sender, EventArgs e) {
            string s = (string)(sender as Button).Tag;
            _currentState.cleanUiElements();
            _stateManager.state = new CoffeeConstructionState(_stateManager, s);
        }



    }
}
