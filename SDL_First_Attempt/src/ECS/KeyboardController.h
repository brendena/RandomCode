//
// Created by brendena on 9/4/18.
//

#ifndef SDL2TEST_KEYBOARDCONTROLLER_H
#define SDL2TEST_KEYBOARDCONTROLLER_H

#include "../StaticGamePropertys.h"
#include "ECS.h"
#include "TransformComponent.h"

class KeyboardController : public Component
{
public:
    TransformComponent *transform;

    void init() override
    {
        transform = &entity->getComponent<TransformComponent>();
    }

    void update() override
    {
        if(StaticGamePropertys::event.type == SDL_KEYDOWN){

            switch(StaticGamePropertys::event.key.keysym.sym){
                case SDLK_w:
                    transform->velocity.y = -1;
                    break;
                case SDLK_a:
                    transform->velocity.x = -1;
                    break;
                case SDLK_s:
                    transform->velocity.y = 1;
                    break;
                case SDLK_d:
                    transform->velocity.x = 1;
                    break;
                default:
                    break;
            }
        }
        if(StaticGamePropertys::event.type == SDL_KEYUP){
            switch(StaticGamePropertys::event.key.keysym.sym){
                case SDLK_w:
                    transform->velocity.y = 0;
                    break;
                case SDLK_a:
                    transform->velocity.x = 0;
                    break;
                case SDLK_s:
                    transform->velocity.y = 0;
                    break;
                case SDLK_d:
                    transform->velocity.x = 0;
                    break;
                default:
                    break;
            }
        }
    }

private:
};

#endif //SDL2TEST_KEYBOARDCONTROLLER_H
