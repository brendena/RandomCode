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

namespace ATM.Observers
{
    class LoadCoffeeOptions
    {

        private List<CoffeeName> CoffeeList;


        public List<CoffeeName> getListCoffee() {
            string path = Path.GetFullPath("../../Observers/coffeeNames.json");
            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                Console.WriteLine(json);

                ListCoffeeOptions mi = JsonConvert.DeserializeObject<ListCoffeeOptions>(json);
                return mi.AmericanNames;
                 
            }

            
        }
    }
}
