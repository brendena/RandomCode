//
// Created by brendena on 8/25/18.
//



#ifndef SDL2TEST_MAP_H
#define SDL2TEST_MAP_H


#include <SDL2/SDL.h>
#include <SDL_image.h>
#include <fstream>

#include "TextureManager.h"
#include "StaticGamePropertys.h"

class Map {
public:
    Map();
    ~Map();

    void loadMap(std::string path, int sizeX, int sizeY);

private:

};


#endif //SDL2TEST_MAP_H
