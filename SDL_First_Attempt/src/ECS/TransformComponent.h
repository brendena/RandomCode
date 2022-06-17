//
// Created by brendena on 9/2/18.
//

#ifndef SDL2TEST_POSITIONCOMPONENT_H
#define SDL2TEST_POSITIONCOMPONENT_H

#include "ECS.h"
#include "../Vector2D.h"
#include "../StaticGamePropertys.h"

class TransformComponent : public Component{
public:
    TransformComponent(){
        position.Zero();
    }
    TransformComponent(float x, float y){
        position.x = x;
        position.y = y;
    }

    TransformComponent(int sc){
        position.Zero();
        scale = sc;
    }

    TransformComponent(float x, float y, int h, int w, int scale ){
        position.x = x;
        position.y = y;
        height = h;
        width = w;
        scale = scale;
    }

    void update() override
    {
        position.x += velocity.x * speed;
        position.y += velocity.y * speed;
    }
    void init() override
    {
        velocity.Zero();
    }
    Vector2D position;
    Vector2D velocity;

    int height = 32;
    int width = 32;
    int scale = 1;

    int speed = 3;
private:

};

#endif //SDL2TEST_POSITIONCOMPONENT_H
