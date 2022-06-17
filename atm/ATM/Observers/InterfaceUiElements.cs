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
    abstract class InterfaceUiElements : Observer
    {
        /// <summary>
        ///  This is the interface for all Observer Iterface elements
        ///  Each specific Interface has it own deticated List view that they can change and edit
        ///  Every UI iterface need to be position by the main state
        /// </summary>
        protected List<Control> _uiItems = new List<Control>();
        protected State _currentState;
        protected int _x;
        protected int _y;

        public InterfaceUiElements(State currentState, int x, int y) {
            _currentState = currentState;
            _x = x;
            _y = y;
        }


        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose: Should never be called because its a virtual function
         *      in a abstract class but just in case, but needs to be defined
         *      because of its inheritense.
         *      *********************************************************/
        public virtual void Update(CurrentMoney currentMoney) {
            Console.WriteLine("base Class");
        }


    }
}
