CC     = gcc
CFLAGS = -ansi -std=c99 -g -c

pbs: fatSupport.o pbs.o
	${CC} fatSupport.o pbs.o -o pbs
 
fatSupport.o: fatSupport.h	
	${CC} ${CFLAGS} fatSupport.c

pbs.o: bootSector.h 
	${CC} ${CFLAGS} pbs.c

clean:
	rm -f *.o *~ pbs
