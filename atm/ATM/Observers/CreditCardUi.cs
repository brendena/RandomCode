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
    class CreditCardUi : InterfaceUiElements
    {
        private Button _submitButton = new Button();
        private TextBox _inputBox = new TextBox();
        public CreditCardUi(State currentState, int x, int y) : base(currentState, x, y)
        {

            currentState.UiInitHelperConstructor(new Label(), "credit card number: 15 Numbers - no spaces",
                                            new System.Drawing.Point(x, y - 100),
                                            new System.Drawing.Size(100, 100));

            currentState.UiInitHelperConstructor(_inputBox, "",
                                            new System.Drawing.Point(x, y),
                                            new System.Drawing.Size(100, 100));


            _submitButton.Click += submit;
            currentState.UiInitHelperConstructor(_submitButton, "accept credit card",
                                            new System.Drawing.Point(x +100, y),
                                            new System.Drawing.Size(100, 50));

        }

        private void submit(object sender, EventArgs e)
        {
            Console.WriteLine("submited");
            System.Text.RegularExpressions.Regex regularExpression = new System.Text.RegularExpressions.Regex("[^0-9 -]");

            String leftOverText = regularExpression.Replace(_inputBox.Text, "");
            if (leftOverText.Length != 15) {
                _inputBox.Text = "try again";
            }

        }
    }
}
