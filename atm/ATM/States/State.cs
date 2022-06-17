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
    abstract class State
    {       
        /// <summary>
        /// The state is the primary way to get this onto the screen
        /// The state is holds all the objects references
        /// to all the objects.  Allowing for a easy cleanup of the ui.
        /// It also has a reference to the stateManager the stateManager can change the state.
        /// </summary>
        protected List<Control> uiElements;
        protected Control ui;
        protected StateManager _stateManager;
        static public string _topURLDomain = "../../";
        static private string pictureURL = _topURLDomain + "pictures/";
        static public int width = Screen.PrimaryScreen.Bounds.Width;
        static public int height = Screen.PrimaryScreen.Bounds.Height;

        public State(StateManager stateManager) {
            this.ui = stateManager.UI;
            this.uiElements = new List<Control>();
            _stateManager = stateManager;
        }

        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose:  Its a helper function to make adding elements easier to the form
         *      *********************************************************/
        public void UiInitHelperConstructor(Control UiElement, string text, 
                                                System.Drawing.Point location, System.Drawing.Size size) {
            UiElement.Parent = this.ui;
            UiElement.Text = text;
            UiElement.Location = location;
            UiElement.Size = size;
            this.uiElements.Add(UiElement);
        }




        /*      Pre:  getting ready for a State Change*     
         *      Post:  NONE*  
         *      Purpose:  Will remove all ui controls from the interface.
         *      This is important because if you don't remove everthing from the 
         *      interface and change states, you will lose all the ui references
         *      that where in the past ui.  Making it hard to remove them.
         *      *********************************************************/
        public void cleanUiElements() {
            foreach (var uiE in uiElements) {
                this.ui.Controls.Remove(uiE);
            }
        }
        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose:  Defining where all the code sits
         *      *********************************************************/
        public string TopURLDomain
        {
            get { return _topURLDomain; }
        }
        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose:  Defining where all the pictures sit.
         *      *********************************************************/
        public string PictureURL
        {
            get { return pictureURL; }
        }
    }
}
