//
// Created by brendena on 8/25/18.
//

#ifndef SDL2TEST_GAME_H
#define SDL2TEST_GAME_H

#include <SDL2/SDL.h>
#include <SDL_image.h>
#include <iostream>

#include "TextureManager.h"
#include "StaticGamePropertys.h"
#include "Map.h"
#include "ECS/Components.h"
#include "Collision.h"
class Game {
public:
    Game();
    ~Game();

    void init(const char * title, int xpos, int ypos, int width, int height, bool fullscreen);

    void handleEvents();
    void update();
    void render();
    void clean();

    bool running();



private:
    bool isRunning;
    SDL_Window * window;
    Entity& player;
    Entity& wall;

    unsigned int cnt = 0;
};


#endif //SDL2TEST_GAME_H
