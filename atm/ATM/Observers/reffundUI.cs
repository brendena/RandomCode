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
        private CurrentMoney _currentMoney;
        public ReffundUI(State currentState, CurrentMoney currentMoney, int x, int y) : base(currentState, x, y)
        {
            _currentMoney = currentMoney;


            PictureBox brendenSouthPark = new PictureBox();

            brendenSouthPark.Image = Image.FromFile(currentState.PictureURL + "refundButton.jpg");
            currentState.UiInitHelperConstructor(brendenSouthPark, "brenden South park",
                                                new System.Drawing.Point(x, y),
                                                new System.Drawing.Size(200, 200));

            brendenSouthPark.SizeMode = PictureBoxSizeMode.StretchImage;
            brendenSouthPark.Click += image_click;
        }

        private void image_click(object sender, EventArgs e) {
            Console.WriteLine("money was refunded");
            _currentMoney.refund();
        }
    }
}