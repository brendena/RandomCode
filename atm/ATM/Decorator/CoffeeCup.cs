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
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace ATM.Decorator
{
    class CoffeeCup : Coffee
    {
        
         
        /// <summary>
        /// Purpose:  Its the base unit that all coffee or tee or liquid needs.
        /// They all need a cup to hold the liquid.The Class CoffeeCup
        /// is the base for further decorators to make it into  different types of coffee
        /// </summary>





        /*      Pre:   NONE*     
         *      Post:  NONE*   
         *      Description:  takes the image cup and save it into the temp location which will be used
         *      to create other types of coffee.
         *       *      *********************************************************/
        public override int brew() {
            
            File.Copy(this.ImageLocation + "cup.png", this.ImageLocationTmp,true);
            return 0;
        }
    }
}
