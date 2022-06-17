CC     = gcc
CFLAGS = -ansi -std=c99 -g -c

pfe: fatSupport.o pfe.o 
	${CC} fatSupport.o pfe.o -o pfe
 
fatSupport.o: fatSupport.h	
	${CC} ${CFLAGS} fatSupport.c

pfe.o: fatSupport.h
	${CC} ${CFLAGS} pfe.c

clean:
	rm -f *.o *~ pfe
