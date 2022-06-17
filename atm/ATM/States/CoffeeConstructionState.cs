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

using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using ATM.Decorator;


namespace ATM.States
{

    class CoffeeConstructionState : State
    {    
        /// <summary>
         /// CoffeeConstructionState is the state that create a image 
         /// based on the type of Coffee you selected previously.  
         /// 
         /// CoffeeConsturctionState leeds into end state.
         /// </summary>
        ~CoffeeConstructionState()
        {
            Console.WriteLine("CoffeeConstructionState destroyed \n");
        }

        /*      Pre:   going to be coming from SelectionMenu*     
         *      Post:  NONE*  
         *      Purpose: On construction it will create the objects needed to 
         *      display the coffee cup on the screen. 
         *      *********************************************************/
        public CoffeeConstructionState(StateManager stateManager, string typeOfCoffee) : base(stateManager)
        {

            /*
            Coffee cup = new CoffeeCup();
            CoffeeDecorator milkFoam = new MilkFoam();
            CoffeeDecorator steamedMilk = new SteamedMilk();

            
            milkFoam.addIngredents(cup);
            steamedMilk.addIngredents(milkFoam);
            steamedMilk.brew();
            */
            Console.WriteLine("coffee type " + typeOfCoffee);
            CoffeeBrewer a = new CoffeeBrewer(typeOfCoffee);
            Console.WriteLine("got through");

            
            PictureBox CoffeeImage = new PictureBox();
            CoffeeImage.SizeMode = PictureBoxSizeMode.StretchImage;
            CoffeeImage.Image = Image.FromFile(this.PictureURL + "tmp2.png");
            UiInitHelperConstructor(CoffeeImage, "coin State",
                                    new System.Drawing.Point(100, 100),
                                    new System.Drawing.Size(600, 500));
            


        }


        private void button_click(object sender, EventArgs e)
        {

        }
    }
}
