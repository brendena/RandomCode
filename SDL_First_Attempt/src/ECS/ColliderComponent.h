//
// Created by brendena on 9/5/18.
//

#ifndef SDL2TEST_COLLIDERCOMPONENT_H
#define SDL2TEST_COLLIDERCOMPONENT_H

#include <SDL.h>
#include <string>

#include "ECS.h"
#include "TransformComponent.h"
#include "../StaticGamePropertys.h"

class ColliderComponent : public Component {
public:

    SDL_Rect collider;
    std::string tag;

    TransformComponent* transform;

    ColliderComponent(std::string t){
        tag = t;
        collider.x = 0;
        collider.y = 0;
        collider.w = 0;
        collider.h = 0;
    }

    void init() override{

        if(!entity->hasComponent<TransformComponent>())
        {
            entity->addComponent<TransformComponent>();
        }
        transform = &entity->getComponent<TransformComponent>();

        StaticGamePropertys::colliders.push_back(this);
    }

    void update() override{
        collider.x = static_cast<int>(transform->position.x);
        collider.y = static_cast<int>(transform->position.y);
        collider.w = transform->width  * transform->scale;
        collider.h = transform->height * transform->scale;

    }


private:

};

#endif //SDL2TEST_COLLIDERCOMPONENT_H
