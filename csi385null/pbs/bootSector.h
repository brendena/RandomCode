// Team null
// Date: 01/28/2015
// bootSector.h

//STRUCT DEFINITION
struct bootSector //Rename to "BootSector" later... see typedef below
{
	int bytesPerSector;
	int sectorsPerCluster;
	int numberOfReservedSectors;
	int numberOfFats;
	int maximumNumberOfRootEntries;
	int totalSectorCount;
	int sectorsPerFat;
	int sectorsPerTrack;
	int numberOfHeads;
	int sectorCount;
	int bootSignature;
	int volumeId;

	char volumeLabel[12];   //char array of size 12
	char fileSystemType[9]; //char array of size 9
};

typedef struct bootSector BootSector; //Struct "BootSector" won't be recognized without a typedef?; renamed to bootSector and define as BootSector for now
