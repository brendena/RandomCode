// Team null
// 01/28/2015
// Provided file fatSupport.h from archive package.tgz

int read_sector(int sector_number, char* buffer);
int write_sector(int sector_number, char* buffer);

unsigned int get_fat_entry(int fat_entry_number, char* fat);
void set_fat_entry(int fat_entry_number, int value, char* fat);

