using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ATM.Observers;

namespace ATM.Decorator
{
    class CoffeeBrewer
    {

        public CoffeeBrewer(string coffeeName) {
            List<CoffeeName> coffeeInfoList = new LoadCoffeeOptions().getListCoffee();

            foreach (CoffeeName coffee in coffeeInfoList) {
                if (coffee.Name == coffeeName) {
                    Console.WriteLine("found coffee " + coffee.ingredents.Count);
                    CoffeeDecorator finishedCoffee = recursivelyBrew(coffee.ingredents, 0);
                    finishedCoffee.brew();
                }
            }   

        }
        
        /*
        get next i need to get that to work. 
        */
        private CoffeeDecorator recursivelyBrew(List<string> stringList, int number) {
            Console.WriteLine(" count: " + stringList.Count + "Number: " + number);
            if (stringList.Count -1 <= number) {
                
                CoffeeDecorator coffeeD = helperCoffeeDecorator(stringList[number]);
                coffeeD.addIngredents(new CoffeeCup());

                Console.WriteLine(stringList[number]);

                return coffeeD;
            }
            CoffeeDecorator previouseDecorator = recursivelyBrew(stringList, number + 1);

            CoffeeDecorator coffeeDecorator = helperCoffeeDecorator(stringList[number]);
            coffeeDecorator.addIngredents(previouseDecorator);

            Console.WriteLine(stringList[number]);
            return coffeeDecorator;
        }

        private CoffeeDecorator  helperCoffeeDecorator(string typeOfIngredient) {
            CoffeeDecorator coffeeDecorator = null;

            if (typeOfIngredient == "Espresso")
            {
                coffeeDecorator = new Espresso();
            }
            else if (typeOfIngredient == "Milk Foam")
            {
                coffeeDecorator = new MilkFoam();
            }
            else if (typeOfIngredient == "Steamed Milk")
            {
                coffeeDecorator = new SteamedMilk();
            }
            else if (typeOfIngredient == "Hot Chocolate")
            {
                coffeeDecorator = new HotChocolate();
            }
            else if (typeOfIngredient == "Water")
            {
                coffeeDecorator = new Water();
            }
            else if (typeOfIngredient == "Chocolate Powder") {
                coffeeDecorator = new ChocolatePowder();
            }
            if (coffeeDecorator == null) {
                Console.WriteLine("there was no object created");
            }
            return coffeeDecorator;
        }


    }
}
