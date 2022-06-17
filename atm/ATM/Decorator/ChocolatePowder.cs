using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATM.Decorator
{
    class ChocolatePowder : CoffeeDecorator
    {
        /// <summary>
        /// Add the HotChocolate to the decorator pattern.
        /// </summary>
        public override int brew()
        {
            int startingPosition = base.brew();
            return createImage("ChocolatePowder.png", startingPosition);
        }
    }
}