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
using System.Diagnostics;
using ATM.Decorator;
using System.IO;

namespace ATM.Decorator
{
    class CoffeeDecorator : Coffee
    {
        /// <summary>
        /// CoffeeDecorator - is the interface for all of 
        /// Coffee's decorators.  It provides the  basic funcitons that 
        /// all the coffee classes need to create the coffee image.
        /// </summary>
        protected Coffee _coffee;

        public void addIngredents(Coffee coffee) {
            this._coffee = coffee;
        }

        public override int brew()
        {
            int startingPosition = 0;
            if (_coffee != null) {
                startingPosition =_coffee.brew();
            }
            return startingPosition;
        }

        /*      Pre:   It needs the overlayImage to be the Coffee cup and the baseImage to be the type of added coffee*     
         *      Post:  will need to be copied over to tmp2.png*   
         *      Description: This takes the tmp image that you've been editing and transposes it over the image of the next liquid.
         *      Then save it into tmp2.png
         *       *      *********************************************************/
        protected int createTmpNewImage(string url, int startingPosition) {
            Bitmap baseImage = (Bitmap)Image.FromFile(this.ImageLocation + url );

            Bitmap overlayImage = (Bitmap)Image.FromFile(this.ImageLocationTmp);

            int baseHeight = baseImage.Height;

            Console.WriteLine("baseImage height: " + baseHeight);

            var finalImage = new Bitmap(overlayImage.Width, overlayImage.Height, PixelFormat.Format32bppArgb);
            var graphics = Graphics.FromImage(finalImage);
            graphics.CompositingMode = CompositingMode.SourceOver;

            graphics.DrawImage(baseImage, overlayImage.Width/2 - baseImage.Width/2 + 10, 
                               overlayImage.Height/2 - baseImage.Height + 40 - startingPosition);
            graphics.DrawImage(overlayImage, 0, 0);

            finalImage.Save(this.ImageLocationTmp2, ImageFormat.Png);

            
            baseImage.Dispose();
            overlayImage.Dispose();
            finalImage.Dispose();
            graphics.Dispose();

            
            return baseHeight;
        }

        /*      Pre:   NONE* 
         *      Post:  NONE*   
         *      Description: Copy's tmp image 2 to tmp image 1.  This was going to be used to do a transition effect between the two images.
         *      But never got implemented. 
         *       *      *********************************************************/
        protected void copyTmp() {
            File.Copy(this.ImageLocationTmp2, this.ImageLocationTmp, true);
        }

        protected int createImage(string url, int startingPosition) {
            Console.WriteLine("starting position: " + startingPosition);
            int nextStartingPosition = createTmpNewImage(url, startingPosition);
            Console.WriteLine("Next position: " + nextStartingPosition);
            this.copyTmp();
            return startingPosition + nextStartingPosition;
        }


    }
}
