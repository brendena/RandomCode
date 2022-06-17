//
// Created by brendena on 9/4/18.
//

#ifndef SDL2TEST_VECTOR2D_H
#define SDL2TEST_VECTOR2D_H

#include <iostream>

class Vector2D {
public:
    Vector2D();
    Vector2D(float x, float);

    Vector2D& Add(const Vector2D& vec);
    Vector2D& Subtract(const Vector2D& vec);
    Vector2D& Multiply(const Vector2D& vec);
    Vector2D& Divide(const Vector2D& vec);

    friend Vector2D& operator+(Vector2D& v1,const Vector2D& v2);
    friend Vector2D& operator-(Vector2D& v1,const Vector2D& v2);
    friend Vector2D& operator*(Vector2D& v1,const Vector2D& v2);
    friend Vector2D& operator/(Vector2D& v1,const Vector2D& v2);

    Vector2D& operator+=(const Vector2D& vec);
    Vector2D& operator-=(const Vector2D& vec);
    Vector2D& operator*=(const Vector2D& vec);
    Vector2D& operator/=(const Vector2D& vec);

    Vector2D& operator*=(const int& i);
    Vector2D& Zero();


    float x;
    float y;

    //overloading << so you can std::cout << InstanceVector2D
    friend std::ostream& operator <<(std::ostream& stream, const Vector2D& vec);
private:
};

#endif //SDL2TEST_VECTOR2D_H
