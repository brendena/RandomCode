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
    class ReffundUI : InterfaceUiElements
    {
        /// <summary>
        /// RefundUI will draw a 
        /// refund image to the view and if click will 
        /// </summary>
        private CurrentMoney _currentMoney;
        public ReffundUI(State currentState, CurrentMoney currentMoney, int x, int y) : base(currentState, x, y)
        {
            _currentMoney = currentMoney;


            PictureBox refundPictureButton = new PictureBox();

            refundPictureButton.Image = Image.FromFile(currentState.PictureURL + "refundButton.jpg");
            currentState.UiInitHelperConstructor(refundPictureButton, "Image Refund",
                                                new System.Drawing.Point(x, y),
                                                new System.Drawing.Size(200, 200));

            refundPictureButton.SizeMode = PictureBoxSizeMode.StretchImage;
            refundPictureButton.Click += refundImageClicked;
        }

        /*      Pre:  NONE *     
         *      Post:  NONE*  
         *      Purpose: to call _currentMoney refund money to reset the amount of money
         *      that the user has.
         *      *********************************************************/
        private void refundImageClicked(object sender, EventArgs e) {
            Console.WriteLine("money was refunded");
            _currentMoney.refund();
        }
    }
}