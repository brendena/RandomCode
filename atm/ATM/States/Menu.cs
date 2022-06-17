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
    class MenuState : State
    {
        ~MenuState()
        {
            Console.WriteLine("MenuState destroyed \n");
        }

        public MenuState(Control ui, StateManager stateManager) : base(ui, stateManager)
        {
            UiInitHelperConstructor(new Label(), "menu State",
                                    new System.Drawing.Point(100, 100),
                                    new System.Drawing.Size(100, 100));


            Button button = new Button();
            button.Click += this.button_click;
            UiInitHelperConstructor(button, "fuck epic button",
                                    new System.Drawing.Point(200, 200),
                                    new System.Drawing.Size(200, 200));

        }


        private void button_click(object sender, EventArgs e)
        {

            this.cleanUiElements();
            this._stateManager.state = new CoinState(this.ui, this._stateManager);
            
        }
    }
}
