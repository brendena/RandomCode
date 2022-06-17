//Team null
//pbs.c

//PREPROCESSOR DIRECTIVES

//Include C-libraries first
#include <stdio.h>
#include <stdlib.h>
#include <strings.h>

//Include local .c/.h files next
#include "bootSector.h"

/******************************************************************************
 * You must set these global variables:
 *    FILE_SYSTEM_ID -- the file id for the file system (here, the floppy disk
 *                      filesystem)
 *    BYTES_PER_SECTOR -- the number of bytes in each sector of the filesystem
 *
 * You may use these support functions (defined in FatSupport.c)
 *    read_sector
 *    write_sector
 *    get_fat_entry
 *    set_fat_entry
 *****************************************************************************/

//We will define these variables for use in here (pbs.c) for now...
//extern FILE *FILE_SYSTEM_ID;
//extern int  BYTES_PER_SECTOR;

//VARIABLES
int    BYTES_PER_SECTOR = 512; //512 bytes per FAT12 sector
FILE   *FILE_SYSTEM_ID; //File pointer, define which floppy image to use for file IO

BootSector bootSector;

//PROTOTYPES
extern int read_sector(int sector_number, char* buffer);
extern int write_sector(int sector_number, char* buffer);

extern int  get_fat_entry(int fat_entry_number, char* fat);
extern void set_fat_entry(int fat_entry_number, int value, char* fat);

void readBootSector();
void printBootSector();
int convertLittle(unsigned char* data, int ArrayPosition,int byteSize);
int getBytePosition(int position);
main()
{
    unsigned char* boot; //Buffer, basically

    FILE_SYSTEM_ID = fopen("floppy1", "r+"); //Hard-coded to flopp1 for now for testing... in r+ mode

    int mostSignificantBits;
    int leastSignificantBits;
    int bytesPerSector;

    if (FILE_SYSTEM_ID == NULL)
    {
        printf("Could not open the floppy drive or image.\n");
         exit(1);
    }

    // Then reset it per the value in the boot sector
    boot = (unsigned char*) malloc(BYTES_PER_SECTOR * sizeof(unsigned char));

    if (read_sector(0, boot) == -1) {
         printf("Something has gone wrong -- could not read the boot sector\n"); ///???
    }

    // 12 (not 11) because little endian
    //int bytesPerSector -- [ - ]
    bootSector.bytesPerSector = convertLittle(boot,12,2);

    BYTES_PER_SECTOR = bootSector.bytesPerSector;

    readBootSector(boot);
    printBootSector();

}

void readBootSector()
{
    unsigned char* boot;

    int sectorNumber = 0, i = 0, bytesRead = 0, mostSignificantBit = 0, leastSignificantBit = 0;

    boot = (unsigned char*) malloc (BYTES_PER_SECTOR * sizeof(unsigned char));

    bytesRead = read_sector(sectorNumber, boot); //so this read everthing to boot

    //int sectorsPerCluster -- [ - ]
    bootSector.sectorsPerCluster = ((int) boot[13]);

    //int numberOfReservedSectors -- [14 - 15]
    bootSector.numberOfReservedSectors = convertLittle(boot,15,2); 

    //int numberOfFats -- [ - ]
    bootSector.numberOfFats = ((int) boot[16]);

    //int maximumNumberOfRootEntries -- [17 - 18]
    bootSector.maximumNumberOfRootEntries = convertLittle(boot,18,2);

    //int totalSectorCount -- [19 - 20]
    bootSector.totalSectorCount = convertLittle(boot,20,2);

    //int sectorsPerFat -- [22 - 23]
    bootSector.sectorsPerFat = convertLittle(boot,23,2);

    //int sectorsPerTrack -- [24 - 25]
    bootSector.sectorsPerTrack = convertLittle(boot,25,2);

    //int numberOfHeads -- [26 - 27]
    bootSector.numberOfHeads = convertLittle(boot,27,2);

    //int sectorCount -- [32 - 35]
    bootSector.sectorCount = convertLittle(boot,35,4);

    //int bootSignature -- [ - ] 
    bootSector.bootSignature = ((int) boot[38]);

    //int volumeId -- [39 - 42]
    bootSector.volumeId = convertLittle(boot,42,4);;

    //char volumeLabel[12] -- [43 - 53]
    //use "i"
    for (i = 0; i < 11; i ++) { // 0 < 11 (10)
        bootSector.volumeLabel[i] = boot[43 + i];
    }
    bootSector.volumeLabel[11] = '\0'; //Don't forget the null terminator

    //char fileSystemType[9] -- [54 - 61]
    //use "i"
    for (i = 0; i < 8; i ++) { // 0 < 8 (7)
        bootSector.fileSystemType[i] = boot[54 + i];
    }
    bootSector.fileSystemType[8] = '\0'; //Don't forget the null terminator
}

/*
purpose: convert little endian into big endian

*/
int convertLittle(unsigned char* data, int arrayPosition,int byteSize)
{
	int i = byteSize-1;
  int leastSignificantBit;
	int mostSignificantBit = (((int) data[arrayPosition]) << 8 * i) & getBytePosition(i);

	for(i = byteSize-2;i > -1;i--)
	{
		leastSignificantBit = (((int) data[--arrayPosition]) << 8 * i) & getBytePosition(i); //interate arrayPosition here
		mostSignificantBit = mostSignificantBit | leastSignificantBit;
	}
	return mostSignificantBit;
}

int getBytePosition(int position) { 
		int checkbit;
		if(position == 0 )
			checkbit = 0x000000ff;
		else if(position == 1)
			checkbit = 0x0000ff00;
		else if(position == 2)
			checkbit = 0x00ff0000;
		else if(position == 3)
			checkbit = 0xff000000;
		else{
			printf("bad call");
			checkbit =0;
		}
		return checkbit;
}
void printBootSector() //pbs()
{ 
	printf("Bytes per sector:            %i\n", bootSector.bytesPerSector);
  	printf("Sectors per cluster:         %i\n", bootSector.sectorsPerCluster);
  	printf("Number of FATs:              %i\n", bootSector.numberOfFats);
  	printf("Number of reserved sectors:  %i\n", bootSector.numberOfReservedSectors);
  	printf("Number of root entries:      %i\n", bootSector.maximumNumberOfRootEntries);
  	printf("Total sector count:          %i\n", bootSector.totalSectorCount);
  	printf("Sectors per FAT:             %i\n", bootSector.sectorsPerFat);
  	printf("Sectors per track:           %i\n", bootSector.sectorsPerTrack);
  	printf("Number of heads:             %i\n", bootSector.numberOfHeads);
  	printf("Boot signature:              %p\n", bootSector.bootSignature); //h; use p
  	printf("Volume ID:                   %p\n", bootSector.volumeId); //h; use p
  	printf("Volume label:                %s\n", bootSector.volumeLabel); //char array
  	printf("File system type:            %s\n", bootSector.fileSystemType); //char array
}


