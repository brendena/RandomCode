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

namespace ATM.Decorator
{
    abstract class Coffee
    {
        /// <summary>
        /// Coffee hold the Brew Function that all things that 
        /// want to use the Coffee's decorator pattern have to use.
        /// 
        /// </summary>
        static protected string _imageLocation = "../../pictures/";
        static protected string _imageLocationTmp = "../../pictures/tmp.png";
        static protected string _imageLocationTmp2 = "../../pictures/tmp2.png";
        public abstract int brew(  );

        public string ImageLocation
        {
            get { return _imageLocation; }

        }
        public string ImageLocationTmp
        {
            get { return _imageLocationTmp; }
        }

        public string ImageLocationTmp2
        {
            get { return _imageLocationTmp2; }
        }
    }
}
