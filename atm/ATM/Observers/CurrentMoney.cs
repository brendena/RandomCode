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
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATM.Observers
{
    class CurrentMoney
    {
        private int _moneyTotal; //totall Amount of money
        private int _moneySpent;

        private List<Observer> _uiItems = new List<Observer>();

        public CurrentMoney(int moneyTotal, int moneySpent) {
            this._moneyTotal = moneyTotal;
            this._moneySpent = moneySpent;
        }

        public void Attach(Observer ui) {
            _uiItems.Add(ui);
        }
        public void Detach(Observer ui) {
            _uiItems.Remove(ui);
        }
        public void Notify()
        {
            foreach (Observer ui in _uiItems)
            {
                //this is weird
                ui.Update(this);
            }

            Console.WriteLine("updated the UI");
            Console.WriteLine("" + _moneyTotal + "   ms " + _moneySpent);
        }

        public int MoneyTotal
        {
            get { return _moneyTotal; }
            set
            {
                if (_moneyTotal != value)
                {
                    _moneyTotal = value;
                    Notify();
                }
            }
        }
        public int MoneySpent
        {
            get { return _moneySpent; }
            set
            {
                if (_moneySpent != value)
                {
                    Console.WriteLine(_moneySpent + "this is moneySpent");
                    _moneySpent = value;
                    Notify();
                }
            }
        }
        public int getMoneyLeft()
        {
            return _moneyTotal - _moneySpent;
        }

        public void refund() {
            MoneySpent = 0;
        }

    }
}
