#include <iostream>
#include <SDL2/SDL.h>

#include "src/Game.h"

int main(){
    const int FPS = 60;
    const int frameDelay = 1000 /FPS;

    Uint32 frameStart = 0;
    int frameTime;

    Game game;

    game.init("Testing Out", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 800, 600, false);

    while(game.running()){
        frameStart = SDL_GetTicks();

        game.handleEvents();
        game.update();
        game.render();
        frameTime = SDL_GetTicks() - frameStart;

        if(frameDelay > frameTime){
            SDL_Delay(frameDelay - frameTime);
        }
    }
    game.clean();

    return 0;
}