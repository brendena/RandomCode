//
// Created by brendena on 9/5/18.
//

#ifndef SDL2TEST_COLLISION_H
#define SDL2TEST_COLLISION_H

#include <SDL.h>
#include "./ECS/ColliderComponent.h"

class Collision {
public:
    //Axis Aligned bounding box
    static bool AABB(const SDL_Rect& recA, const SDL_Rect& recB);
    static bool AABB(const ColliderComponent& colA, const ColliderComponent& colB);
};


#endif //SDL2TEST_COLLISION_H
