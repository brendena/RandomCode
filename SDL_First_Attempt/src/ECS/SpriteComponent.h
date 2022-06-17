//
// Created by brendena on 9/2/18.
//

#ifndef SDL2TEST_SPRITECOMPONENT_H
#define SDL2TEST_SPRITECOMPONENT_H

#include <SDL.h>
#include "ECS.h"
#include "../TextureManager.h"
#include "TransformComponent.h"

class SpriteComponent : public Component
{
public:
    SpriteComponent() = default;
    SpriteComponent(const char* path){
        setText(path);
    }
    ~SpriteComponent(){
        SDL_DestroyTexture(texture);
    }

    void setText(const char* path){
        texture = TextureManager::loadTexture(path);
    }

    void init() override {

        transform = &entity->getComponent<TransformComponent>();

        srcRect.x = srcRect.y = 0;
        srcRect.w = transform->width;
        srcRect.h = transform->height;

    }

    void update() override {

        destRect.x = static_cast<int>(transform->position.x);
        destRect.y = static_cast<int>(transform->position.y);

        destRect.w = transform->width * transform->scale;
        destRect.h = transform->height * transform->scale;
    }

    void draw() override {
        TextureManager::Draw(texture, srcRect, destRect);
    }

private:
    TransformComponent *transform;
    SDL_Texture * texture;
    SDL_Rect srcRect, destRect;


};


#endif //SDL2TEST_SPRITECOMPONENT_H
