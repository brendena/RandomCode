using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATM.Observers
{
    class CoffeeName
    {
        public string Name;
        public int Price;
        public List<string> ingredents;

        CoffeeName() {
            Name = "";
            Price = 0;
            ingredents = null;
        }
    }
}

namespace ATM.Observers
{
    class ListCoffeeOptions
    {
        public List<CoffeeName> AmericanNames;

        ListCoffeeOptions() {
            AmericanNames = null;
        }
    }
}
