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

namespace ATM.States
{
    class StateManager
    {    
         /// <summary>
         /// StateManger, manages the state
         /// So if you want to change the state you 
         /// need to change the state inside the stateManager
         /// </summary>
        private State _state;
        private Control _ui;
        private static StateManager instance = new StateManager();
        public StateManager() {
        }
        public static StateManager GetInstance
        {
            get
            {
                if (instance == null)
                    instance = new StateManager();

                return instance;
            }
        }
        public State state
        {
            get { return _state; }
            set { _state = value; }
        }

        public Control UI {
            get{
                return _ui;
            }
            set {
                _ui = value;
            }
        }
    }
}
