#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
/*don't know the best way to find the file location*/\
/*
Needs to be done
shared memory
directorys
*/

//on pg 4 and 5 they talk about how directorys are made


#include "shell.h"

typedef struct{
    char * currentWorkingDirectory; //so this is going to be a pointer to the cwd inside the floppy drive
    char * locationOfFloppyDrive;  //location of the actual floppy drive
} sharedMemoryItems;


int main(int argc, char** argv){
    puts("inside shell");
    char* input;
    printf("\n\tEnter a string : ");
    char* command;
    char* arguments;
    char* location;
    pid_t pid;
    while(1){
        input=malloc((50)*sizeof(char));
        fgets(input,50,stdin);
        printf("your ouput %s", input);
        splitCommand(&command, &arguments, input);
        location = findFileLocation(command);
        
        printf("first %s second %s", command, arguments);
        
        pid = fork();
        if(pid > 0) //parent
        {
            wait(); //wait for all child process  //wait for specfic pid pg 154
            puts("parents out\n");
        }
        else if (pid < 0) //error
        {
            exit(-1);
        }
        else{
            int ret;
            if(arguments = ""){
                ret = execl(location,NULL);
            }
            else{
                ret = execl(location,arguments,NULL); //so it works when you put shell in pbs file but it doesn't work otherwise
            }
            if(ret == -1)//bad execl
            {
                perror("bad execl");
            }
            
        }
        
        break;
    }
    puts("exited shell");
    free(input);
    return 0;
}