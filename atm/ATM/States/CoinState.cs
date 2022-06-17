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


namespace ATM.States
{
    class CoinState : State
    {
        ~CoinState() {
            Console.WriteLine("coinState destroyed \n");
        }
        public CoinState(Control ui, StateManager stateManager) : base(ui, stateManager)
        {
            UiInitHelperConstructor(new Label(), "coin State",
                                    new System.Drawing.Point(100, 100),
                                    new System.Drawing.Size(100, 100));


            Button button = new Button();
            button.Click += this.button_click;
            UiInitHelperConstructor(button, "epic fucking button",
                                    new System.Drawing.Point(200, 200),
                                    new System.Drawing.Size(200, 200));

        }


        private void button_click(object sender, EventArgs e)
        {
            
            this.cleanUiElements();
            this._stateManager.state = new MenuState(this.ui, this._stateManager);
        }

    }
}
