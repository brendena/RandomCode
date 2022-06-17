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


namespace ATM.Observers
{
    abstract class InterfaceUiElements : Observer
    {
        protected List<Control> _uiItems = new List<Control>();
        protected State _currentState;
        protected int _x;
        protected int _y;

        public InterfaceUiElements(State currentState, int x, int y) {
            _currentState = currentState;
            _x = x;
            _y = y;
        }

        public virtual void Update(CurrentMoney currentMoney) {
            Console.WriteLine("base Class");
        }


    }
}
