//
// Created by brendena on 8/25/18.
//

#include "StaticGamePropertys.h"
#include "ECS/TileComponent.h"

SDL_Renderer * StaticGamePropertys::renderer = nullptr;
SDL_Event StaticGamePropertys::event;

std::vector<ColliderComponent*> StaticGamePropertys::colliders;

Manager StaticGamePropertys::manager;

void StaticGamePropertys::AddTile(int id, int x, int y){
    auto& tile(manager.addEntity());
    tile.addComponent<TileComponent>(x,y,32,32,id);
}