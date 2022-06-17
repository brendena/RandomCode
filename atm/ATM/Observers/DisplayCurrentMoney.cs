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
using ATM.States;


namespace ATM.Observers
{
    class DisplayCurrentMoney : InterfaceUiElements
    {
        //there might be a section with creditCard
        //so user can input there creditcard info
        private int _spacingY;
        private string[] _listDisplayCurrentMoney = { "starting money", "money  spent", "money  left" };
        public DisplayCurrentMoney(State currentState, int x, int y) : base(currentState, x, y)
        {
            _spacingY = 25;

            for (int i = 0; i < _listDisplayCurrentMoney.Length; i++) {
                Label label = new Label();
                _currentState.UiInitHelperConstructor(label, _listDisplayCurrentMoney[i],
                        new System.Drawing.Point(x, y + (_spacingY * i)),
                        new System.Drawing.Size(100, _spacingY));
                _uiItems.Add(label);
            }
        }

        public override void Update(CurrentMoney currentMoney)
        {
            foreach (Label label in _uiItems) {
                string labelsText = System.Text.RegularExpressions.Regex.Replace(label.Text, @"[\d-]", string.Empty);
                Console.WriteLine("labelText = " + labelsText  + " " + labelsText.Length + " "+ _listDisplayCurrentMoney[0]+ " " + _listDisplayCurrentMoney[0].Length);

                if (labelsText == _listDisplayCurrentMoney[0])
                {
                    label.Text = labelsText + currentMoney.MoneyTotal;
                }
                else if (labelsText == _listDisplayCurrentMoney[1])
                {
                    label.Text = labelsText + currentMoney.MoneySpent;
                }
                else if (labelsText == _listDisplayCurrentMoney[2])
                {
                    
                    label.Text = labelsText + currentMoney.getMoneyLeft();
                }

            }
            Console.WriteLine("base Class");
        }
    }
}
