#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* findFileLocation(char * command){
    char* both = malloc(strlen(command) *2 + 2); //going to have to unallocate this
    strcpy(both, command);
    strcat(both, "/");
    strcat(both, command);
    return both;
}

void splitCommand(char** first, char** second, char* input){
    char* stream = strtok(input, " \n");
    *first = stream;
    *second = "";
    while(stream != NULL)
    {
        stream = strtok (NULL, " ");
        asprintf(second, "%s %s", *second, stream); //concantinate strings
    }
}