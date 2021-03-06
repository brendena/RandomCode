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
using ATM.Decorator;

namespace ATM
{
    public partial class Form1 : Form
    {
        /// <summary>
        /// once the form is init it will create a 
        /// the stateManager and change set the initial state.
        /// That initial state change the state from there.
        /// </summary>
        public Form1()
        {
            InitializeComponent();
            StateManager stateManager = StateManager.GetInstance;
            stateManager.UI = this;
            stateManager.state = new SelectionMenu(stateManager);
        }
    }
}
