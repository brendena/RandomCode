using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Forms;
using ATM.States;


namespace ATM.States
{
    class IntroState : State
    {
        ~IntroState()
        {
            Console.WriteLine("coinState destroyed \n");
        }
        public IntroState(StateManager stateManager) : base(stateManager)
        {
            PictureBox brendenSouthPark = new PictureBox();
            brendenSouthPark.Image = Image.FromFile(this.PictureURL + "brendenSP.png");
            UiInitHelperConstructor(brendenSouthPark, "brenden South park",
                        new System.Drawing.Point(0, 0),
                        new System.Drawing.Size(500, 500));


            

            Button button = new Button();
            button.Click += this.button_click;
            UiInitHelperConstructor(button, "Enter Project",
                                    new System.Drawing.Point(width/2 , 400),
                                    new System.Drawing.Size(200, 200));

        }


        private void button_click(object sender, EventArgs e)
        {

            this.cleanUiElements();
            this._stateManager.state = new SelectionMenu(this._stateManager);
        }

    }
}
